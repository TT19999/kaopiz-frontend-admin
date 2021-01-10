import React from "react";
import Assessment from "@material-ui/icons/Assessment";
import PermIdentity from "@material-ui/icons/PermIdentity";
import Web from "@material-ui/icons/Web";

import BorderOuter from "@material-ui/icons/BorderOuter";

const data = {
  menus: [
    { text: "DashBoard", icon: <Assessment />, link: "/admin/home/dashboard" },
    {
      text: "User",
      icon: <PermIdentity />,
      link: "/admin/home/ListUser"
    },
    {
      text: "posts",
      icon: <BorderOuter />,
      link: "/admin/home/posts"
    },
    { text: "Category", icon: <PermIdentity />, link: "/admin/home/category" }
  ],


  dashBoardPage: {

    newOrders: [
      { pv: 2400 },
      { pv: 1398 },
      { pv: 9800 },
      { pv: 3908 },
      { pv: 4800 },
      { pv: 3490 },
      { pv: 4300 }
    ],
  }
};

export default data;
