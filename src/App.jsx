// src/App.jsx
import { createBrowserRouter, RouterProvider } from "react-router";
import { ThemeProvider } from "./hooks/useTheme";
import Chatbot from "./layout/Chatbot";
import ProtectedRoute from "./layout/ProtectedRoute";
import Root from "./layout/Root";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Community from "./pages/Community";
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
          path: "/community",
          element: (
            <ProtectedRoute>
              <Community />
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
