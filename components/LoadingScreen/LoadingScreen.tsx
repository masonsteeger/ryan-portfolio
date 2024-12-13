"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./LoadingScreen.module.scss";
import { Box, CircularProgress, circularProgressClasses } from "@mui/material";

export default function LoadingScreen() {
  const [shouldBeNull, setShouldBeNull] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldBeNull(true);
    }, 2300);
    setProgress(100);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (shouldBeNull) {
    return null;
  }

  return (
    <div className={styles.container}>
      <Box
        sx={{
          position: "relative",
          display: "inline-flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
        }}>
        <CircularProgress
          variant='determinate'
          value={progress}
          color='secondary'
          sx={{
            width: "77% !important",
            height: "unset !important",
            maxWidth: "780px",
            aspectRatio: "1/1",
            [`& .${circularProgressClasses.circle}`]: {
              transitionDuration: "1500ms",
            },
          }}
        />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <Image
            src='/static/images/logo-icon.jpg'
            alt='artist logo'
            width='600'
            height='600'
            priority={true}
            style={{
              width: "45%",
              maxWidth: "450px",
              height: "auto",
              opacity: 0,
              animation: "fadeIn 4s",
              animationFillMode: "forwards",
            }}
          />
        </Box>
      </Box>
    </div>
  );
}
