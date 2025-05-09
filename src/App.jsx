// src/App.jsx
import { createBrowserRouter, RouterProvider } from "react-router";
import { ThemeProvider } from "./hooks/useTheme";
import ProtectedRoute from "./layout/ProtectedRoute";
import Root from "./layout/Root";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Chatbot from "./pages/Chatbot";
import Community from "./pages/Community";
import Home from "./pages/Home";
import Psy from "./pages/Psy";
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
          path: "/community",
          element: (
            <ProtectedRoute>
              <Community />
            </ProtectedRoute>
          ),
        },
        {
          path: "/psy",
          element: (
            <ProtectedRoute>
              <Psy />
            </ProtectedRoute>
          ),
        },
        {
          path: "/chatbot",
          element: (
            <ProtectedRoute>
              <Chatbot />
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
