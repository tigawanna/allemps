import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { TheIcon } from "../../shared/extra/TheIcon";
import { User } from "../../utils/types";
import { ReactModalWrapper } from './../../shared/extra/ReactModalWrapper';
import { makeUrl } from "../../pb/config";
import { ProfileMenu } from './../auth/ProfileMenu';


interface ToolbarProps {
  user: User
}

export const Toolbar: React.FC<ToolbarProps> = ({
  user,
}) => {

  const [isOpen, setIsOpen] = React.useState(false);

  
// console.log("profile ===",avatar)
  return (
    <div className="w-full h-10 flex justify-between items-center">

      <div className=" h-full flex justify-start items-center">
        <div className="m-1 w-fit h-full p-1 flex justify-center items-center ">
          <Link to="/">
            <div className="w-fit p-1 mx-5 flex justify-center items-centertext-white  ">
              <TheIcon
                Icon={AiOutlineHome}
                size={"25"}
                color={""}
                iconstyle={""}
              />
            </div>
          </Link>
        </div>
      </div>


      <div className="min-w-[10%] md:px-2 h-full flex justify-center items-center gap-1 md:gap-2
         md:border-2 rounded-xl  font-bold dark:font-normal ">

        {/* <div className="w-full  h-full flex justify-center items-center
         hover:text-blue-700">
        <Link to="/main">main</Link>
       </div>


      <div className="w-full px-1 h-full flex justify-center items-center 
      hover:text-rose-700">
          <Link to="/test">test</Link>
        </div> */}


      </div>
      
      <div className="w-fit h-full flex justify-end items-center">
        <ReactModalWrapper
          isOpen={isOpen}
          closeModal={() => setIsOpen(false)}
          child={<ProfileMenu  setOpen={setIsOpen} user={user} />}
          styles={{ content_top: "0%",content_right:"0%",content_left:"70%" }}
        />
      <div className="  rounded-md  flex justify-center items-center 
              w-16  h-full  aspect-square">
       
              <TheIcon
               Icon={FaUserCircle}
                size={"25"}
                color={""}
                iconAction={() => setIsOpen(true)}
              />
         

        </div>
      </div>

    </div>
  );
};
