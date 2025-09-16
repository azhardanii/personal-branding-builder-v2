"use client";

import { useState } from "react";
import Image from "next/image";

type LazyYoutubeProps = {
  videoId: string;
  title: string;
  ratio?: "16:9" | "9:16"; // default ke 9:16
};

export default function LazyYoutube({
  videoId,
  title,
  ratio = "9:16",
}: LazyYoutubeProps) {
  const [isClicked, setIsClicked] = useState(false);
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  // Konversi rasio jadi padding bottom (aspect ratio hack)
  const aspectPadding = ratio === "16:9" ? "56.25%" : "177.77%";

  return (
    <div
      className="relative w-full h-0 overflow-hidden rounded-xl cursor-pointer"
      style={{ paddingBottom: aspectPadding }}
      onClick={() => setIsClicked(true)}
    >
      {/* Saat sudah diklik, tunggu iframe */}
      {isClicked ? (
        <>
          {!isIframeLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-black">
              <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0`}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onLoad={() => setIsIframeLoaded(true)}
          />
        </>
      ) : (
        // Thumbnail + tombol play
        <div className="absolute top-0 left-0 w-full h-full bg-black">
          <Image
            src={thumbnailUrl}
            width={300}
            height={100}
            alt={`Thumbnail ${title}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="80"
              height="80"
              viewBox="0 0 100 100"
              className="transition-transform duration-200 ease-in-out hover:scale-110"
            >
              <rect
                x="18"
                y="25"
                width="70"
                height="50"
                rx="12"
                ry="12"
                fill="#FF0000"
              />
              <polygon points="45,38 65,50 45,62" fill="white" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}