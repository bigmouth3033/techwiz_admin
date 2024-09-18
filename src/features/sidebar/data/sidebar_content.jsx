import { Children } from "react";
import { MdDashboard } from "react-icons/md";
import { FaArrowAltCircleDown } from "react-icons/fa";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { MdArrowLeft } from "react-icons/md";
import { FaArrowsToEye } from "react-icons/fa6";
import { MdArrowOutward } from "react-icons/md";
import { RiAdminLine } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import { CiViewList } from "react-icons/ci";
import { IoChatbox } from "react-icons/io5";
import { FaRankingStar } from "react-icons/fa6";
import { PiRanking } from "react-icons/pi";
import { PiTicketBold } from "react-icons/pi";
import { AiOutlineProduct } from "react-icons/ai";
import { TbCategory2 } from "react-icons/tb";
import { MdCategory } from "react-icons/md";

const sidebar_content = [
  {
    name: "Dash Board",
    type: "button",
    icon: <MdDashboard />,
    link: "/",
  },
  {
    name: "Admin",
    type: "group",
    icon: <RiAdminLine />,
    children: [
      {
        name: "List Admin",
        icon: <CiViewList />,
        link: "/employee_list",
      },
      {
        name: "Add Admin",
        icon: <IoMdAdd />,
        link: "/custom_admin",
      },
    ],
  },
  {
    name: "Customer Chat",
    type: "button",
    icon: <IoChatbox />,
    link: "/chat",
  },
  {
    name: "Ranking",
    type: "group",
    icon: <FaRankingStar />,
    children: [
      {
        name: "Rank List",
        icon: <PiRanking />,
        link: "/rank_list",
      },
      {
        name: "Add New Rank",
        icon: <IoMdAdd />,
        link: "/new_rank",
      },
      {
        name: "Voucher",
        icon: <PiTicketBold />,
        link: "/rank_voucher",
      },
    ],
  },
  {
    name: "Product",
    type: "group",
    icon: <TbCategory2 />,
    children: [
      {
        name: "Product List",
        icon: <AiOutlineProduct />,
        link: "/product_list",
      },
      {
        name: "New Product",
        icon: <IoMdAdd />,
        link: "/new_product",
      },
    ],
  },
];

export default sidebar_content;
