import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [isVideoEnded, setIsVideoEnded] = useState(false);

  useEffect(() => {
    const video = document.getElementById("loading-video") as HTMLVideoElement;
    
    if (video) {
      video.play().catch(error => {
        console.error("Erro ao reproduzir vídeo:", error);
        // Se o vídeo falhar, pula após 3 segundos
        setTimeout(() => {
          onComplete();
        }, 3000);
      });

      const handleVideoEnd = () => {
        setIsVideoEnded(true);
        setTimeout(() => {
          onComplete();
        }, 500);
      };

      video.addEventListener("ended", handleVideoEnd);

      return () => {
        video.removeEventListener("ended", handleVideoEnd);
      };
    }
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center bg-background transition-opacity duration-500 ${
        isVideoEnded ? "opacity-0" : "opacity-100"
      }`}
    >
      <video
        id="loading-video"
        className="w-full h-full object-contain"
        muted
        playsInline
      >
        <source src="/loading.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

export default LoadingScreen;
