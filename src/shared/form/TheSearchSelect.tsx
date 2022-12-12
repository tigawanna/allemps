import React from 'react'
import { FormOptions,SetInput } from './types';



type FilterFnProps = { list: any[],field_key:string}
interface SearchSelectProps {
setInput: (props: SetInput) => void
form_options: FormOptions
}

export const TheSearchSelect: React.FC<SearchSelectProps> = ({setInput,form_options}) => {
const [keyword, setKeyword] = React.useState({ word:"" })

const handleChange = (e:any) => {
  const { value } = e.target;
  setKeyword({ ...keyword, [e.target.id]: value});
};

const finishSearch=(item:any)=>{
  setKeyword({ word: item[form_options?.fetch_select_options?.keyword_field as string] })
  setInput({
    item_key: form_options.fetch_select_options?.form_field as string,
    item: item[form_options?.fetch_select_options?.field_to_save as string],
  })
}

const filterArray =({list,field_key}:FilterFnProps)=>{
  return list.filter((item:any)=>{
    return item[field_key].toLowerCase().includes(keyword.word.toLowerCase())}
 )
}
  const data = filterArray({ field_key: form_options?.fetch_select_options?.form_field as string, 
    list: form_options?.filter_list as any[]})

return (
 <div className='w-full h-full cursor-pointer flex flex-col items-center justify-center'>
    <label className="font-bold text-white text-md  w-[90%] flex items-start">
      {form_options.required && form_options.editing ? <div className='text-red-300 mr-1'>*</div> : null}
      {form_options.fetch_select_options?.form_field}
    </label>
    <input
      className='w-[90%] p-1 border border-black 
      dark:border-white h-10 text-base rounded-sm   dark:bg-slate-700
        focus:border-2 dark:focus:border-4 focus:border-purple-700 dark:focus:border-purple-600 '
    id="word"
    autoComplete='off'
    value={keyword.word}
    onChange={handleChange}

    />
  {data?.length < 1 ?
  <div className="w-[70%] h-full cursor-pointer flex flex-col items-center justify-center
    text-sm text-red-400 break-inside-auto
    ">0 results found </div>:null
  }
    <div className='w-[90%]  rounded-lg flex flex-wrap items-center justify-center'>
    {data?.slice(0,10).map((item:any,idx)=>{
    return (
      <div key={item[form_options?.fetch_select_options?.keyword_field as string] + idx}
        onClick={() => finishSearch(item)}
        className="m-1 py-1 px-2 text-[12px] border-2 text-center max-w-[30%] truncate rounded-lg 
             hover:bg-slate-400 dark:hover:bg-slate-600
         
            ">
        {/* {item[form_options?.filter_key as string]['common']} */}
        <div className='w-full text-bold '>
          {item[form_options?.fetch_select_options?.keyword_field as string]}
        </div>
        <div className='w-full text-[10px]'>
          {item[form_options?.fetch_select_options?.field_to_save as string]}
        </div>
      </div>
      )
    })}
    </div>
 </div>
);
}



