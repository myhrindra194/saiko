// src/App.jsx
import { createBrowserRouter, RouterProvider } from "react-router";
import { ThemeProvider } from "./hooks/useTheme";
import ProtectedRoute from "./layout/ProtectedRoute";
import Root from "./layout/Root";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Service from "./pages/Service";
import { AuthProvider } from "./provider/AuthProvider";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/service",
          element: <Service />,
        },
        {
          path: "/blog",
          element: <Blog />,
        },
        {
          path: "/dashboard",
          element: (
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);

  return (
    <AuthProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
