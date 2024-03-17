"use client";
import { Box } from "@radix-ui/themes";
import Image from "next/image";
import React, { useState } from "react";

interface Props {
  src: string;
  width: number;
  height: number;
  alt: string;
}
const Avatar = ({ src, width, height, alt }: Props) => {
  //const [hideImage, setHideImage] = useState(false);
  const source =
    src === null || src.trim() === ""
      ? `https://ui-avatars.com/api/?name=${alt}`
      : src;
  return (
    // !hideImage && (
    <Box style={{ borderRadius: "50%", overflow: "hidden" }}>
      <Image
        src={source}
        width={width}
        height={height}
        alt={alt}
        // onError={() => {
        //   //setHideImage(true);
        // }}
      />
    </Box>
  );
  // );
};

export default Avatar;
