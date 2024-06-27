import { Navigate, Outlet } from "react-router-dom";

const Private = () => {
  const user = JSON.parse(localStorage.getItem("user") ?? "null")
  return user ? (
    <Outlet/>
  ) : (
    <Navigate to={"/signIn"} />
  );
};

export default Private;
