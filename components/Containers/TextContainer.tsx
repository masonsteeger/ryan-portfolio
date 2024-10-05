import React from "react";
import classes from "./TextContainer.module.scss";

const TextContainer = ({ children }: React.PropsWithChildren) => {
  return <div className={classes.container}>{children}</div>;
};

export default TextContainer;
