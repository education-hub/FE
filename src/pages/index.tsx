import { FC } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Home: FC = () => {
  return (
    <div>
      <Navbar />
      <h1>Home Page</h1>
      <Link to="/login">
        <h1>Go to Login page</h1>
      </Link>
      <Link to="/login">
        <h1>Go to Register page</h1>
      </Link>
    </div>
  );
};

export default Home;
