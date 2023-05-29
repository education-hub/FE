import { Navbar, NavbarAdmin } from "./Navbar";
import { FC, ReactNode } from "react";
import { Footer } from "./Footer";

interface Props {
  children: ReactNode;
}

export const Layout: FC<Props> = (props) => {
  const { children } = props;
  return (
    <div className="h-screen">
      <Navbar />
      <div className="z-10">{children}</div>
      <Footer />
    </div>
  );
};

export const LayoutAdmin: FC<Props> = (props) => {
  const { children } = props;
  return (
    <div className="h-screen">
      <NavbarAdmin />
      <div className="z-10">{children}</div>
      <Footer />
    </div>
  );
};
