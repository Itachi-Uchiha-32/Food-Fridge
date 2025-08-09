import {
  createBrowserRouter,
} from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Log in/Login";
import Register from "../pages/Register/Register";
import Home from "../pages/Home/Home";
import AddFood from "../pages/AddFood/AddFood";
import MyItems from "../pages/My Items/MyItems";
import Loading from "../components/Loading";
import FridgePage from "../pages/FridgePage/FridgePage";
import FoodDetails from "../pages/FoodDetails/FoodDetails";
import PrivateRoutes from "../privateRoutes/PrivateRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayout,
    hydrateFallbackElement: <Loading/>,
    children: [
      {
        index: true,
        path: '/',
        Component: Home
      },
      {
        path: '/addFood',
        element: <PrivateRoutes>
          <AddFood/>
        </PrivateRoutes>
      },
      {
        path: '/my-items',
        element: <PrivateRoutes>
          <MyItems/>
        </PrivateRoutes>
      },
      {
        path: '/fridge',
        Component: FridgePage,
      },
      {
        path: '/food/:id',
        Component: FoodDetails,
      }
    ]
  },
  {
    path: '/auth',
    Component: AuthLayout,
    children: [
      {
        path: '/auth/login',
        Component: Login
      },
      {
        path: '/auth/register',
        Component: Register,
      }
    ]
  }
]);

export default router;