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
import { SiDesignernews } from "react-icons/si";
import { IoReloadOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";

const sidebar_content = [
  {
    name: "Designer Profile",
    type: "button",
    icon: <CgProfile />,
    link: "/designer_profile",
    role: "designer",
  },
  {
    name: "Designer Consultation",
    type: "button",
    icon: <CgProfile />,
    link: "/consultion_list",
    role: "designer",
  },
  {
    name: "Designer",
    type: "group",
    icon: <SiDesignernews />,
    role: "admin",
    children: [
      {
        name: "Designer List",
        icon: <AiOutlineProduct />,
        link: "/designer_list",
      },
      {
        name: "Unapproved Designer",
        icon: <IoReloadOutline />,
        link: "/pending_approved_designer",
      },
    ],
  },
  {
    name: "Gallery",
    type: "group",
    icon: <IoChatbox />,
    role: "admin",
    children: [
      {
        name: "Add Gallery",
        icon: <CiViewList />,
        link: "/add_gallery",
      },
      {
        name: "List Gallery",
        icon: <IoMdAdd />,
        link: "/list_gallery",
      },
    ],
  },
  {
    name: "Order",
    type: "button",
    icon: <IoChatbox />,
    link: "/list_order",
    role: "admin",
  },
  {
    name: "Product",
    type: "group",
    icon: <TbCategory2 />,
    role: "admin",
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
