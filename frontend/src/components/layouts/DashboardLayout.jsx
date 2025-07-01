import React from "react";
import { useContext } from 'react';
import {UserContext} from '../../context/UserContext';
import NavBar from './NavBar';
import SideMenu from './SideMenu';

const DashboardLayout = ({children,activeMenu}) => {
    const {user} = useContext(UserContext);
    console.log("USER CONTEXT VALUE:", user);
  return (
    <div className="">
        <NavBar activeMenu={activeMenu}/>
{user && (
  <div className="flex">
    <div className="hidden md:block">
      <SideMenu activeMenu={activeMenu} />
    </div>
    <div className="grow mx-5">{children}</div>
  </div>
)}
    </div>
  )
}

export default DashboardLayout;