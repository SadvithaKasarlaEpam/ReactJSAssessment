import React from "react";
import { Outlet } from "react-router";
import { NavLink } from "react-router";

const Students = () => {
  return (
    <>
      <div>Welcome to List of Students</div>;
      <Outlet />;
    </>
  );
};

export default Students;
