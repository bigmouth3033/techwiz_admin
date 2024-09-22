import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "./layout/AdminLayout";
import Dashboard from "@/features/dashboard/Dashboard";
import Login from "@/features/login/Login";
import CustomAdmin from "@/features/custom_admin/CustomAdmin";
import EmployeeList from "@/features/employee_list/EmployeeList";
import EmployeeUpdate from "@/features/employee_update/EmployeeUpdate";
import Chat from "@/features/chat/Chat";
import NewRank from "@/features/new_rank/NewRank";
import UpdateRank from "@/features/update_rank/UpdateRank";
import RankList from "@/features/ranks/RankList";
import NewRankVoucher from "@/features/new_rank_voucher/NewRankVoucher";
import Product from "@/features/product/Product";
import DesignerRegister from "@/features/designer_register/DesignerRegister";
import PendingApprovedDesigner from "@/features/pending_approved_designer/PendingApprovedDesigner";
import DesignerList from "@/features/designer_list/DesignerList";
import DesignerProfile from "@/features/designer_profile/DesignerProfile";
import DesignerConsultation from "@/features/designer_consultation/DesignerConsultation";
import ProductList from "@/features/product_list/ProductList";
import ForgotPassword from "@/features/forgot_password/ForgotPassword";
import Forgot from "@/features/forgot/Forgot";

import Gallery from "@/features/gallery/gallery";
import GalleryList from "@/features/gallery_list/GalleryList";
import Order from "@/features/Order/Order";
import UpdateGallery from "@/features/UpdateGallery/UpdateGallery";
import OrderDetail from "@/features/OrderDetail/OrderDetail";

import Blogs from "@/features/blog/Blogs";
import CreateBlog from "@/features/blog/components/CreateBlog";
import Blog from "@/features/blog/components/Blog";

import AdminConsultationList from "@/features/admin_consultation_list/AdminConsultationList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AdminLayout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/custom_admin",
        element: <CustomAdmin />,
      },
      {
        path: "/employee_list",
        element: <EmployeeList />,
      },
      {
        path: "/employee_update",
        element: <EmployeeUpdate />,
      },
      {
        path: "/chat",
        element: <Chat />,
      },
      {
        path: "/new_rank",
        element: <NewRank />,
      },
      {
        path: "/update_rank",
        element: <UpdateRank />,
      },
      {
        path: "/rank_list",
        element: <RankList />,
      },
      {
        path: "/new_rank_voucher",
        element: <NewRankVoucher />,
      },
      {
        path: "/new_product",
        element: <Product />,
      },
      {
        path: "/product_list",
        element: <ProductList />,
      },
      {
        path: "/pending_approved_designer",
        element: <PendingApprovedDesigner />,
      },
      {
        path: "/designer_list",
        element: <DesignerList />,
      },
      {
        path: "/designer_profile",
        element: <DesignerProfile />,
      },
      {
        path: "/consultion_list",
        element: <DesignerConsultation />,
      },
      {
        path: "/add_gallery",
        element: <Gallery />,
      },
      {
        path: "/list_gallery",
        element: <GalleryList />,
      },
      {
        path: "/list_order",
        element: <Order />,
      },
      {
        path: "/update_gallery",
        element: <UpdateGallery />,
      },
      {
        path: "/order_detail",
        element: <OrderDetail />,
      },
      {
        path: "/blog",
        element: <Blogs />,
      },
      {
        path: "/getblogbyid",
        element: <Blog />,
      },
      {
        path: "/create_blog",
        element: <CreateBlog />,
      },
      {
        path: "/admin_consultion_list",
        element: <AdminConsultationList />,
      },
    ],
  },
  {
    path: "/forgotPassword",
    element: <ForgotPassword />,
  },
  {
    path: "/forgot",
    element: <Forgot />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/designer_register",
    element: <DesignerRegister />,
  },
]);

export default router;
