import React from "react";
import { NavLink } from "react-router-dom";

const Navlinks = [
  {
    key: "dashboard",
    title: "Dashboard",
    path: "/dashboard",
  },
  {
    key: "services",
    title: "Services",
    path: "/dashboard/services",
  },
  {
    key: "payments",
    title: "Payments",
    path: "/dashboard/payments",
  },
  {
    key: "userSupport",
    title: "User Support",
    path: "/dashboard/user-support",
  },
  {
    key: "settings",
    title: "Settings",
    path: "/dashboard/settings",
  },
];

const DashBoardTabSwitcher = ({ className }) => {
  const activeClasses =
    "border-b-2 border-primary-500 bg-[#fdce00]/10 text-neutral-900 font-medium";
  const inActiveClasses = "border-b-2 border-transparent bg-transparent font-normal";
  const commonClasses = "h-full text-nowrap text-center text-slate-600 text-sm flex items-center justify-center px-3"; // Common classes

  return (
    <div className={`w-full flex ${className}`}>
      {Navlinks.map((data) => (
        <NavLink
          key={data.key} // Ensure to add the `key` for each map element
          className={({ isActive }) =>
            isActive
              ? `${activeClasses} ${commonClasses}`
              : `${inActiveClasses} ${commonClasses}`
          }
          to={data.path}
          end={data.key === "dashboard"}
        >
          {data.title}
        </NavLink>
      ))}
    </div>
  );
};

export default DashBoardTabSwitcher;
