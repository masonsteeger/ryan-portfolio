"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./LoadingScreen.module.scss";

export default function LoadingScreen() {
  const [shouldBeNull, setShouldBeNull] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldBeNull(true);
    }, 2300);
    return () => clearTimeout(timer);
  }, []);

  if (shouldBeNull) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <div className={styles["chart-circle"]} />
        <Image
          src='/static/images/logo-icon.jpg'
          alt='artist logo'
          width='600'
          height='600'
          style={{
            width: "45%",
            maxWidth: "450px",
            height: "auto",
            opacity: 0,
            animation: "fadeIn 2s",
            animationFillMode: "forwards",
          }}
        />
      </div>
    </div>
  );
}
