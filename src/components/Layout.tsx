import { FC, ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface ChildrenType {
  children: ReactNode;
}

const Layout: FC<ChildrenType> = (props) => {
  const { children } = props;
  return (
    <div className="h-screen">
      <Navbar />
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
