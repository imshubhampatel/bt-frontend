import React from "react";
import styles from "./Sidebar.module.css";
import logo from "../../../assets/images/BT LOGO.jpg";
import { NavLink } from "react-router-dom";
import AvTimerIcon from "@mui/icons-material/AvTimer";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import BusinessIcon from "@mui/icons-material/Business";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import PeopleIcon from "@mui/icons-material/People";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import EventIcon from "@mui/icons-material/Event";

const Pages = [
  {
    name: "Dashboard",
    path: "/super-admin/dashboard",
    icon: <AvTimerIcon />,
  },
  {
    name: "News",
    path: "/super-admin/news",
    icon: <EventIcon />,
  },
  {
    name: "Institutions",
    path: "/super-admin/institutions",
    icon: <BusinessIcon />,
  },

  {
    name: "Sports",
    path: "/super-admin/sports",
    icon: <SportsBasketballIcon />,
  },
  {
    name: "Coach",
    path: "/super-admin/coaches",
    icon: <PermIdentityIcon />,
  },
  {
    name: "Teams",
    path: "/super-admin/teams",
    icon: <PeopleIcon />,
  },
  {
    name: "Players",
    path: "/super-admin/players",
    icon: <PeopleIcon />,
  },
  {
    name: "Users",
    path: "/super-admin/users",
    icon: <GroupAddIcon />,
  },
  {
    name: "Videos",
    path: "/super-admin/videos",
    icon: <AvTimerIcon />,
  },
  {
    name: "Video Analytics",
    path: "/super-admin/video/analytics",
    icon: <AvTimerIcon />,
  },

  {
    name: "E-Commerce",
    path: "/super-admin/ecommerce",
    icon: <AvTimerIcon />,
  },

  {
    name: "Subscription",
    path: "/super-admin/subscription",
    icon: <AvTimerIcon />,
  },
];

const Sidebar = (props) => {
  let current = new Date();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];
  let currentDay = days[current.getDay()];

  let currentTime = current.toLocaleString("en-US", {
    hour: "numeric",
    hour12: true,
  });

  return (
    <>
      <div className={`${styles.sidebar_hemburger} ${styles.hemburger}`}>
        <div className={`${styles.admin_image} ${styles.image_admin}`}>
          <div className={styles.logo}></div>
          <div className={`${styles.sidetext} ${styles.admin_text}`}>admin</div>
          <div className={`${styles.sidetext} ${styles.date_text}`}>
            Wed 11:00 AM
          </div>
        </div>
        <div className={styles.nav_items}>
          {Pages &&
            Pages.map((page, index) => {
              const { name, path, icon } = page;
              return (
                <NavLink
                  key={index}
                  to={path}
                  className={({ isActive }) => {
                    console.log(isActive, path);
                    return isActive ? styles.active : undefined;
                  }}
                >
                  {icon}
                  {name}
                </NavLink>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
