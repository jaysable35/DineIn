import React, { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Admin from "../../../User/src/Components/Admininterface";

function App() {
  const router = createBrowserRouter([
    {
      path: "/ambika-admin/dashboard",
      element: <Admin />,
    },
  ]);

  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}

export default App
