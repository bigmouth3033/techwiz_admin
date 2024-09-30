import { IoMdAdd } from "react-icons/io";
import { CiViewList } from "react-icons/ci";
import { IoChatbox } from "react-icons/io5";
import { AiOutlineProduct } from "react-icons/ai";
import { TbCategory2 } from "react-icons/tb";
import { SiDesignernews } from "react-icons/si";
import { CgProfile } from "react-icons/cg";
import { LuLoader } from "react-icons/lu";
import { ImBlog } from "react-icons/im";
import { FaImages } from "react-icons/fa";

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
    name: "Consultation List",
    type: "button",
    icon: <CgProfile />,
    link: "/admin_consultion_list",
    role: "admin",
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
        icon: <LuLoader />,
        link: "/pending_approved_designer",
      },
    ],
  },
  {
    name: "Gallery",
    type: "group",
    icon: <FaImages />,
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
    name: "Blog",
    type: "group",
    icon: <ImBlog />,
    role: "admin",
    children: [
      {
        name: "Add Blog",
        icon: <CiViewList />,
        link: "/create_blog",
      },
      {
        name: "Blog List",
        icon: <IoMdAdd />,
        link: "/blog",
      },
    ],
  },

  {
    name: "Blog",
    type: "group",
    icon: <ImBlog />,
    role: "designer",
    children: [
      {
        name: "Add Blog",
        icon: <CiViewList />,
        link: "/create_blog",
      },
      {
        name: "Blog List",
        icon: <IoMdAdd />,
        link: "/designer_blogs",
      },
    ],
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
