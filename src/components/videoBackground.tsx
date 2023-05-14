import { FC, ReactNode } from "react";

interface Props {
  videoSrc: string;
  children: ReactNode;
}

export const VideoBackground: FC<Props> = (props) => {
  const { videoSrc, children } = props;
  return (
    <div className="relative w-full overflow-hidden  flex items-center p-20 py-56">
      <video
        className="w-full h-full object-cover absolute top-0 left-0 z-0"
        src={videoSrc}
        autoPlay
        loop
        muted
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};
