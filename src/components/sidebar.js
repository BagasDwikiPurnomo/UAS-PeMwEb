import React, { useState } from "react";
import { Typography } from "@material-tailwind/react";
import {
  // HomeIcon,
  // ShoppingCartIcon,
  InboxIcon,
  ArrowRightEndOnRectangleIcon,
  // UserIcon,
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  // CogIcon,
  Cog6ToothIcon,
  /*PowerIcon as LogoutIcon,*/
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/solid";

const Sidebar = ({ onLogout }) => {
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const handleLogout = () => {
    // Panggil fungsi onLogout yang diterima dari props
    onLogout();
  };

  const toggleDashboardContent = () => {
    setIsDashboardOpen(!isDashboardOpen);
  };

  return (
    <div className="h-full w-64 bg-white shadow-md fixed left-0 top-0 flex flex-col items-center justify-between p-4">
      <div className="py-6">
        <Typography variant="h5" font="poppins" color="blue-gray" className="mb-4">
          Inventory BI Rotan
        </Typography>
        <ul className="space-y-2">
          <li className="flex items-center">
            <PresentationChartBarIcon className="h-6 w-6 mr-2" />
            {/* eslint-disable-next-line */}
            <a href="#" className="text-blue-gray-600 hover:text-blue-gray-700">
              <Typography font="poppins" color="blue-gray" onClick={toggleDashboardContent}>Dashboard</Typography>
            </a>
            {isDashboardOpen ? (
              <ChevronUpIcon
                className="h-5 w-5 ml-auto cursor-pointer"
                onClick={toggleDashboardContent}
              />
            ) : (
              <ChevronDownIcon
                className="h-5 w-5 ml-auto cursor-pointer"
                onClick={toggleDashboardContent}
              />
            )}
          </li>
          {isDashboardOpen && (
            <div className="ml-8 mt-2">
              <ul className="space-y-2">
                <li>
                  {/* eslint-disable-next-line */}
                  <a href="#" className="text-blue-gray-600 hover:text-blue-gray-700">
                    <Typography font="poppins" color="blue-gray">Subitem 1</Typography>
                  </a>
                </li>
                <li>
                  {/* eslint-disable-next-line */}
                  <a href="#" className="text-blue-gray-600 hover:text-blue-gray-700">
                    <Typography font="poppins" color="blue-gray">Subitem 2</Typography>
                  </a>
                </li>
              </ul>
            </div>
          )}
          <li className="flex items-center">
            <ShoppingBagIcon className="h-6 w-6 mr-2" />
            {/* eslint-disable-next-line */}
            <a href="#" className="text-blue-gray-600 hover:text-blue-gray-700">
              <Typography font="poppins" color="blue-gray">E-Commerce</Typography>
            </a>
          </li>
          <li className="flex items-center">
            <InboxIcon className="h-6 w-6 mr-2" />
            {/* eslint-disable-next-line */}
            <a href="#" className="text-blue-gray-600 hover:text-blue-gray-700">
              <Typography font="poppins" color="blue-gray">Inbox</Typography>
            </a>
          </li>
          <li className="flex items-center">
            <UserCircleIcon className="h-6 w-6 mr-2" />
            {/* eslint-disable-next-line */}
            <a href="#" className="text-blue-gray-600 hover:text-blue-gray-700">
              <Typography font="poppins" color="blue-gray">Profile</Typography>
            </a>
          </li>
          <li className="flex items-center">
            <Cog6ToothIcon className="h-6 w-6 mr-2" />
            {/* eslint-disable-next-line */}
            <a href="#" className="text-blue-gray-600 hover:text-blue-gray-700">
              <Typography font="poppins" color="blue-gray">Settings</Typography>
            </a>
          </li>
        </ul>
      </div>
      <div className="pb-6">
        <ul>
          <li className="flex items-center">
            <ArrowRightEndOnRectangleIcon className="h-6 w-6 mr-2" />
            {/* eslint-disable-next-line */}
            <a href="#" className="text-blue-gray-600 hover:text-blue-gray-700" onClick={handleLogout}>
              <Typography font="poppins" color="blue-gray">Logout</Typography>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
