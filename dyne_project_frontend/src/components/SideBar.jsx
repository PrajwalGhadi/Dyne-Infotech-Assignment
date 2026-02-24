import React from "react";
import { MdAnalytics } from "react-icons/md";
import { MdDashboard } from "react-icons/md";
import { FaBoxArchive } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import clsx from 'clsx'

const SideBar = () => {
  const sideBarItems = [
    {
      label: "Dashboard",
      path: "/dashboard",
      logo: <MdDashboard className="text-blue-400 text-2xl" />,
    },
    {
      label: "Products",
      path: "/products",
      logo: <FaBoxArchive className="text-blue-400 text-2xl" />,
    },
  ];
  return (
    <aside className={clsx(`absolute py-4 px-6 space-y-4 lg:w-[16%] lg:h-screen border-r border-gray-600 bg-[#0F172A]`, `w-full flex  flex-col z-9`)}>
      <div className="flex gap-2 items-center">
        <MdAnalytics className="text-blue-400 lg:text-4xl text-[10vw]" />
        <h1 className="text-md flex flex-col">
          <span>Product Insights</span>
          <span className="ext-gray-400">
            Amazon Seller Center{" "}
            <small className="text-green-400 animate-pulse font-bold">
              .Online
            </small>
          </span>
        </h1>
      </div>

      <div className="lg:py-4 lg:px-2">
        <ul className="gap-6 flex flex-row lg:flex-col justify-start">
          {sideBarItems.map((items, index) => {
            return (
              <NavLink
                to={`${items.path}`}
                key={index}
                className={({ isActive }) =>
                  `text-md lg:text-lg flex items-center gap-4 delay-200 ease-in-out ${
                    isActive
                      ? "text-blue-500 font-bold bg-[#01ccff50] p-2 rounded-sm"
                      : "text-gray-500 hover:text-blue-400 p-2"
                  }`
                }
              >
                {items.logo} {items.label}
              </NavLink>
            );
          })}
        </ul>
      </div>

      <div className="mt-auto">
        <h1>Developed By Prajwal Ghadigaonkar</h1>
      </div>
    </aside>
  );
};

export default SideBar;
