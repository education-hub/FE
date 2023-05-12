import { FC } from "react";
import { Link } from "react-router-dom";
import { Layout } from "../components/Layout";
import {
  ButtonCancelDelete,
  ButtonCheckout,
  ButtonSubmit,
} from "../components/Button";

const Home: FC = () => {
  return (
    <Layout>
      <div>
        <h1>Home Page</h1>
        <ButtonSubmit label="Go to Register" />
        <ButtonCancelDelete label="Delete" />
        <ButtonCheckout label="Checkout" />
        <Link to="/login">
          <h1>Go to Register page</h1>
        </Link>
      </div>
    </Layout>
  );
};

export default Home;
