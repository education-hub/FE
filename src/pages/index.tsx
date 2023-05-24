import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonCancelDelete, ButtonSubmit } from "../components/Button";
import { NavbarIndex } from "../components/Navbar";
import { VideoBackground } from "../components/videoBackground";
import { Footer } from "../components/Footer";
import { useCookies } from "react-cookie";

const Home: FC = () => {
  const [cookie] = useCookies(["tkn", "role"]);
  const checkToken = cookie.tkn;
  const checkRole = cookie.role;
  const navigate = useNavigate();
  return (
    <>
      <NavbarIndex />
      <VideoBackground videoSrc="/video.mp4">
        <div className="relative z-30 md:p-20 text-white  flex flex-col gap-5">
          <h1 className="text-3xl md:text-5xl font-bold">EducationHub</h1>
          <p className="text-xl font-medium">
            Web platform for school review and education community
          </p>
          <div className="h-1 bg-@dark animate-pulse"></div>
          <div className="mt-16 gap-10 flex flex-col md:flex-row">
            <ButtonSubmit
              label="Let's find your dreams school"
              onClick={() => navigate("/student")}
            />
            {checkToken ? (
              checkRole === "administrator" ? (
                <ButtonCancelDelete
                  label="I'm School Admin"
                  onClick={() => navigate("/admin")}
                />
              ) : (
                <></>
              )
            ) : (
              <></>
            )}
          </div>
        </div>
      </VideoBackground>
      <Footer />
    </>
  );
};

export default Home;
