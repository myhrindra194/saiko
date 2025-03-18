import { createBrowserRouter, RouterProvider } from "react-router";
import { ThemeProvider } from "./hooks/useTheme.jsx";
import Root from "./layout/Root.jsx";
import About from "./pages/About.jsx";
import Blog from "./pages/Blog.jsx";
import Home from "./pages/Home.jsx";
import Service from "./pages/Service.jsx";

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
      ],
    },
  ]);

  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
