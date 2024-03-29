/*!

=========================================================
* Paper Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import Form1 from "views/form1";
import Form2 from "views/form2";

import Icons from "views/Icons.js";

import Week1 from "views/Week1";
import Week2 from "views/Week2";


var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-shop",
    component: Dashboard,
    layout: "/admin",
  },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "nc-icon nc-diamond",
  //   component: Icons,
  //   layout: "/admin",
  // },
  {
    path: "/Week1",
    name: "Part1",
    icon: "nc-icon nc-paper",
    component: Week1,
    layout: "/admin",
  },
  {
    path: "/Week2",
    name: "Part2",
    icon: "nc-icon nc-paper",
    component: Week2,
    layout: "/admin",
  },
  {
    path: "/Form1",
    name: "Assessment1",
    icon: "nc-icon nc-hat-3",
    component: Form1,
    layout: "/admin",
  },
  {
    path: "/Form2",
    name: "Assessment2",
    icon: "nc-icon nc-hat-3",
    component: Form2,
    layout: "/admin",
  },
  
];
export default routes;
