import { useMutation, useQueryClient } from "@tanstack/react-query"
import React from "react"
import { createRecords } from "../../api/pb"
import TheForm from "../../shared/form/TheForm"
import { FormOptions } from "../../shared/form/types"
import { User } from "../../utils/types"
import { concatErrors } from "../../utils/utils"



interface AddPostProps {
    closeModal?: () => void
    ch_id:string
    user?:User
}
interface FormInput {
    title: string;
    body: string
    media: string,
    emp: string,
    channel: string
}
interface Validate {
    input: FormInput;
    setError: (error: { name: string; message: string }) => void;
}



export const AddPost: React.FC<AddPostProps> = ({closeModal,ch_id,user}) => {
    const editing = true
  const queryClient = useQueryClient()
    const validate = ({ input, setError }: Validate) => {

        const assertNotNull = () => {
            const exclude = [""]
            for (const item in input) {
                if (input[item as keyof typeof input] === "" && !exclude.includes(item)) {
                    if (item === "emp" || item === "channel") {
                        setError({ name: "main", message: item + " can't be null " })
                    }
                    setError({ name: item, message: item + " can't be null " })
                    return false
                }
            }
            return true

        }
        if (assertNotNull()) {
            setError({ name: "", message: "" })
            return false
        }


        return true
    }

    const form_input: FormOptions[] = [
        { field_name: "title", field_type: "text", default_value: "", editing },
        { field_name: "body", field_type: "textarea", default_value: "", editing },
        { field_name: "media", field_type: "file", default_value: "", editing },
        { field_name: "emp", field_type: "text", default_value:user?.email, editing, hidden: true },
        { field_name: "channel", field_type: "text", default_value:ch_id, editing, hidden: true },

    ]


    const [error, setError] = React.useState({ name: "", message: "" })
    const create_url = "https://emps.tigawanna.tech/api/collections/posts/records"

    const mutation = useMutation(
        async (vars: {
            coll_name: string;
            payload: FormData;
        }) => {
            try {
                return await createRecords(
                    vars.payload,
                    create_url
                );
            } catch (e) {
                throw e;
            }
        },
        {
            onSettled: () => {
                queryClient.invalidateQueries(['posts',ch_id]);
                closeModal && closeModal()
            },
            onError: (err: any) => {
                console.log(
                    "errror logging in ",
                    err.data
                );
                setError({
                    name: "main",
                    message: concatErrors(err),
                });
            },
        }
    );

    const handleSubmit = async (data: FormData) => {
        await mutation.mutate({ coll_name: 'posts', payload: data })
    };
    return (
        <div className='w-full  border p-2 flex
    dark:text-white rounded-lg'>
            <TheForm
                form_title='New Post'
                fields={form_input}
                validate={validate}
                submitFn={handleSubmit}
                is_submitting={mutation.isLoading}
                error={error}
                editing={editing}

            />

        </div>
    );
}
