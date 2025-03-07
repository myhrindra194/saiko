import { createBrowserRouter, RouterProvider } from "react-router";
import Root from "./components/Root.jsx";
import { AuthProvider } from "./hooks/useAuth.jsx";
import About from "./pages/About.jsx";
import Home from "./pages/Home.jsx";

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
      ],
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
