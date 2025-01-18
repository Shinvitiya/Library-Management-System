"use client";

import { IKVideo, ImageKitProvider } from "imagekitio-next";
import config from "@/lib/config";
import { url } from "inspector";

const BookVideo = ({ videoUrl }: { videoUrl: string }) => {
  const { publicKey, urlEndpoint } = config.env.imagekit;
  return (
    <ImageKitProvider publicKey={publicKey} urlEndpoint={urlEndpoint}>
      <IKVideo path={videoUrl} controls={true} className="w-full rounded-xl" />
    </ImageKitProvider>
  );
};

export default BookVideo;
