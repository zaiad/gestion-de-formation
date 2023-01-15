import React from "react";
import { useState } from "react";
import axios from "axios";
import { MdOutlineDeliveryDining, MdOutlineNoMeals, MdOutlineCategory, MdOutlinePayment } from "react-icons/md";
import {TfiStatsUp} from "react-icons/tfi"
import { BiUserCircle, BiHomeAlt, BiLogOut } from "react-icons/bi";
import { HiMenuAlt3 } from "react-icons/hi";
import { Link } from "react-router-dom";


function Sidebar() {
    const menus = [
        { name: "Home", link: "/", icon: BiHomeAlt },
        { name: "Statistique", link: "/statistique", icon: TfiStatsUp },
        { name: "Employees", link: "/Employe", icon: BiUserCircle },
        { name: "Organismes", link: "/Organisme", icon: MdOutlineNoMeals },
        { name: "Formations", link: "/Formation", icon: MdOutlineCategory },
    ]
    
    const [open, setOpen] = useState(true);
    

    const logout = async () => {
        
    }

return (
    <div className={`${open ? "w-72" : "w-16"} duration-500 bg-gray-50 min-h-screen text-amber-500 relative px-3`}>
        <div className="flex justify-end py-3" style={{ height: '8vh' }}>
            <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
            />
        </div>

        <div className="relative flex flex-col gap-4 mt-4" style={{ height: '85vh' }}>
            {menus?.map((menu, i) => (
            <Link
                to={menu?.link}
                key={i}
                className={`${menu?.margin && "mt-5 absolute inset-x-0 bottom-0"} flex items-center text-sm gap-4 font-medium p-2 rounded-md hover:bg-amber-500 hover:text-white`}>
                <div>{React.createElement(menu?.icon, { size: "25" })}</div>
                <h2 className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"}`}>{menu?.name}
                </h2>
            </Link>
            ))}

            <button
            type="button"
            onClick={logout}
            className="absolute inset-x-0 bottom-0 flex items-center text-sm gap-4 font-medium p-2 rounded-md hover:bg-amber-500 hover:text-white">
            <div>{React.createElement(BiLogOut, { size: "25" })}</div>
            <h2 className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"}`}>
                logout
            </h2>
            </button>
        </div>
    </div>
);
}

export default Sidebar;
