import { useEffect } from "react";
import Banner from "../components/Banner";

const Home = () => {
  useEffect(() => {
    document.body.style.overflowY = "hidden";
    const timer = setTimeout(() => {
      document.body.style.overflowY = "auto";
    }, 2000);
    return () => {
      clearTimeout(timer);
      document.body.style.overflowY = "auto";
    };
  }, []);

  return <Banner />;
};

export default Home;
