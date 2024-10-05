import React from "react";
import classes from "./ImageContainer.module.scss";
import Image from "next/image";

type ImageContainerProps = {
  src: string;
  alt: string;
};

const ImageContainer = (props: ImageContainerProps) => {
  return (
    <div className={classes.container}>
      <Image
        src={props.src}
        alt={props.alt}
        width={1000}
        height={1000}
        className={classes.image}
      />
    </div>
  );
};

export default ImageContainer;
