import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonCancelDelete, ButtonSubmit } from "../components/Button";
import { NavbarIndexStudent } from "../components/Navbar";
import { VideoBackground } from "../components/videoBackground";
import { Footer } from "../components/Footer";

const Home: FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <NavbarIndexStudent />
      <VideoBackground videoSrc="/video.mp4">
        <div className="relative z-30 p-20 text-white  flex flex-col gap-5">
          <h1 className="text-5xl font-bold">EducationHub</h1>
          <p className="text-xl font-medium">
            Web platform for school review and education community
          </p>
          <div className="h-1 bg-@dark animate-pulse"></div>
          <div className="mt-16 gap-10 flex">
            <ButtonSubmit
              label="Let's find your dreams school"
              onClick={() => navigate("/student")}
            />
            <ButtonCancelDelete
              label="I'm School Admin"
              onClick={() => navigate("/admin")}
            />
          </div>
        </div>
      </VideoBackground>
      <Footer />
    </>
  );
};

export default Home;
