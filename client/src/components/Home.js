import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import Dashboard from "./Dashboard";
import Login from "./Login";

const Home = () => {
  const { loggedIn } = useContext(AuthContext);
  console.log(loggedIn);
  if (loggedIn === true) return <Dashboard />;

  if (loggedIn === false) return <Login />;
  return <>Home</>;
};

export default Home;
