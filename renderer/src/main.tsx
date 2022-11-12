import ReactDOM from "react-dom/client";
import Root from "./routes/Root";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./routes/ErrorPage";
import Home from "./routes/Home";
import Add from "./routes/Add";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "add", element: <Add /> },
    ],
  },
]);

const rootEl = document.getElementById("root");

if (rootEl) {
  ReactDOM.createRoot(rootEl).render(
    // <React.StrictMode>
    <RouterProvider router={router} />
    // </React.StrictMode>
  );
}
