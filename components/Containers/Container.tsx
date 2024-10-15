import React, { CSSProperties } from "react";
import classes from "./Container.module.scss";

const Container = ({
  children,
  ...props
}: React.PropsWithChildren<{ style?: CSSProperties }>) => {
  return (
    <div className={classes.container} style={props.style}>
      {children}
    </div>
  );
};

export default Container;
