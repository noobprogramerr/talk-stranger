import React  from 'react';
// import logoLinkedIn from '../Image/Logo-LinkedIn.png'
import { CiSearch } from 'react-icons/ci';
import { IoIosNotifications } from 'react-icons/io';
import { MdMessage,MdOutlinePersonAddAlt  } from 'react-icons/md';
import { Link } from 'react-router-dom';
// import Home from './Home';
// import Profile from './Profile';
// import Connections from './Connections';
// import Interest from './Interest';
// import Trypremium from './Trypremium';

const Header = () => {
  return (
    <>
      <div className="bg-[#ffffff] font-[GIlroy] text-sm-[20] border-b border-solid border-[#e7e7e7]   items-center  flex flex-wrap w-full h-100 pr-6 pl-6 relative">
        <div className=" w-20 h-20 border-r border-solid border-[#e7e7e7]  object-cover object-center flex justify-center items-center">
          {/* <img src={logoLinkedIn} alt="" /> */}
        </div>
        <div className="w-64 h-20 pr-6 pl-6 border-r border-solid border-[#e7e7e7]   flex justify-center items-center">
          <div className="w-64 h-10 overflow-hidden pr-2 border border-[#e7e7e7]  rounded-3xl  flex">
            <input
              className="w-full h-full pl-3 bg-transparent outline-none text-opacity-90 "
              type="text"
              name=""
              placeholder="Search"
              id=""
            />
            <div className="mt-1 ">
              <CiSearch size={28} />
            </div>
          </div>
        </div>
        <div className="flex px-24 h-20 font-medium justify-center items-center gap-10 border-r border-solid border-[#e7e7e7] ">
          <Link to="/Home">Home</Link>
          <Link to="/Profile">Profile</Link>
          <Link to="/signin">Log in</Link>
          <Link to="/signup">Sign up</Link>
          {/* <Link to="/Connections">Connections</Link> */}
          {/* <Link to="/Interest">Interest</Link> */}
          {/* <Link to="/Trypremium">Try Premium</Link> */}
        </div>
        <div className="h-20 p-6 flex justify-center items-center gap-6 border-r border-solid border-[#e7e7e7] ">
          <MdMessage size={26} color="green" />
          <IoIosNotifications size={26} color="#fbab4a" />
          <MdOutlinePersonAddAlt size={26} color="#cd7fe2" />
        </div>
        <div className="m-auto  flex justify-center items-center">
          <div className="w-16 h-16  overflow-hidden object-cover object-center rounded-full bg-red-500">
            <img
              className="w-16 h-16 object-cover object-center  "
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Header