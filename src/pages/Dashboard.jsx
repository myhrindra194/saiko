import useAuth from "../hooks/useAuth";

const Dashboard = () => {
  const { token } = useAuth();
  return <div className="h-full w-full mt-40">{token} Hello from here</div>;
};

export default Dashboard;
