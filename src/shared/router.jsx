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
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
