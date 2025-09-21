import React from 'react'
import { useNavigate } from 'react-router-dom';

import icon from "../assets/TESDA-emblem-blue.png";
import { MdHomeFilled, MdGroupAdd, MdSummarize, MdAccountCircle, MdLogout } from "react-icons/md";

const NavBarIcon =({textLabel, route, icon }) =>{
  const navigate = useNavigate();

  const navBarPressed = async (route) => {
    if(!route)
      return;

    navigate(route);
  };


    return (
        <button className="sidebar-icon w-full h-auto flex flex-col items-center text-white hover:text-orange-500 text-center text-xs md:text-sm justify-center my-3 px-auto py-1 hover:bg-gray-900 active:bg-black" id={textLabel} onClick={()=>navBarPressed(route)}>
            {icon}
            <span>{textLabel}</span>
        </button>
    );
}

const NavBar = ({logoutEventHandler}) => {
  return (
    <div className="min-w-20 h-fit bg-[#030826] gap-5 px-1 py-1 shadow z-5">
        <div className="flex flex-col items-center px-auto py-2">
            <img src={icon} width={50} height={50}/>
        </div>
        <NavBarIcon textLabel="Home" icon={<MdHomeFilled size="28"/>} route="/home"/>
        <NavBarIcon textLabel="Add Acct" icon={<MdGroupAdd size="28"/>} route="/add-account"/>
        <NavBarIcon textLabel="Logs" icon={<MdSummarize size="28"/>} route="/logs"/>
        <NavBarIcon textLabel="My Acct" icon={<MdAccountCircle size="28"/>} route="/my-account"/>
        <br /><br />
        <button className="sidebar-icon w-full h-auto flex flex-col items-center text-white hover:text-orange-500 text-center text-sm md:text-sm justify-center my-3 px-auto py-1 hover:bg-gray-900 active:bg-black" id="logout" onClick={(e)=>{ e.preventDefault(); logoutEventHandler();}}>
            <MdLogout size="28"/>
            <span>Logout</span>
        </button>
    </div>
  )
}

export default NavBar
