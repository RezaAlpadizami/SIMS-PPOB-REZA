import Lottie from "lottie-react";
import spinner from "../../assets/lotties/spinner2.json";

const LoadingLottie = () => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-gray-200 bg-opacity-50 z-50">
      <Lottie
        loop={true}
        autoPlay={true}
        animationData={spinner}
        className="w-60"
      />
    </div>
  );
};

export default LoadingLottie;
