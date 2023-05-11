import { FC } from "react";
import { Link } from "react-router-dom";
import { Layout } from "../components/Layout";

const Home: FC = () => {
  return (
    <Layout>
      <div>
        <h1>Home Page</h1>
        <Link to="/login">
          <h1>Go to Login page</h1>
        </Link>
        <Link to="/login">
          <h1>Go to Register page</h1>
        </Link>
      </div>
    </Layout>
  );
};

export default Home;
