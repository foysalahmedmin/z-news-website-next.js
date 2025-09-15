"use client";

import { Play } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface VideoThumbnailPlayerProps {
  url: string; // YouTube video link
  thumbnail: string; // Thumbnail image
  alt?: string; // Alt text
  width?: number;
  height?: number;
  className?: string;
}

export default function VideoThumbnailPlayer({
  url,
  thumbnail,
  alt = "Video thumbnail",
  width = 800,
  height = 450,
  className = "",
}: VideoThumbnailPlayerProps) {
  const [playVideo, setPlayVideo] = useState(false);

  if (playVideo) {
    return (
      <iframe
        width="100%"
        height={height}
        src={url}
        title={alt}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    );
  }

  return (
    <div
      className={`relative cursor-pointer ${className}`}
      style={{ width: "100%", maxWidth: width }}
      onClick={() => setPlayVideo(true)}
    >
      <Image
        src={thumbnail}
        alt={alt}
        width={width}
        height={height}
        className="aspect-video h-auto w-full rounded-md object-cover shadow"
      />
      <div className="absolute inset-0 m-auto flex aspect-square h-1/3 items-center justify-center rounded-full border bg-black/25 text-white backdrop-blur-xs">
        <Play className="size-1/2" strokeWidth={2} />
      </div>
    </div>
  );
}
