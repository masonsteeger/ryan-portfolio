"use client";
import React from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import { NextFont } from "next/dist/compiled/@next/font";
import localFont from "next/font/local";

const quicksand: NextFont = localFont({
  src: [
    { path: "./fonts/Quicksand-Bold.ttf", weight: "700", style: "normal" },
    { path: "./fonts/Quicksand-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "./fonts/Quicksand-Medium.ttf", weight: "500", style: "normal" },
    { path: "./fonts/Quicksand-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/Quicksand-Light.ttf", weight: "300", style: "normal" },
  ],
  variable: "--font-quicksand",
  weight: "300 700",
});
const josefinSans: NextFont = localFont({
  src: [
    { path: "./fonts/JosefinSans-Bold.ttf", weight: "700", style: "normal" },
    {
      path: "./fonts/JosefinSans-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    { path: "./fonts/JosefinSans-Medium.ttf", weight: "500", style: "normal" },
    {
      path: "./fonts/JosefinSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    { path: "./fonts/JosefinSans-Light.ttf", weight: "300", style: "normal" },
    {
      path: "./fonts/JosefinSans-ExtraLight.ttf",
      weight: "200",
      style: "normal",
    },
    { path: "./fonts/JosefinSans-Thin.ttf", weight: "100", style: "normal" },
    {
      path: "./fonts/JosefinSans-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "./fonts/JosefinSans-SemiBoldItalic.ttf",
      weight: "600",
      style: "italic",
    },
    {
      path: "./fonts/JosefinSans-MediumItalic.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "./fonts/JosefinSans-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/JosefinSans-LightItalic.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "./fonts/JosefinSans-ExtraLightItalic.ttf",
      weight: "200",
      style: "italic",
    },
    {
      path: "./fonts/JosefinSans-ThinItalic.ttf",
      weight: "100",
      style: "italic",
    },
  ],
  variable: "--font-josefinsans",
  weight: "100 900",
});

const ClientThemeProvider = ({ children }: React.PropsWithChildren) => {
  const theme = createTheme({
    typography: {
      fontFamily: `${josefinSans.style.fontFamily} ${quicksand.style.fontFamily} `,
    },
    palette: {
      primary: {
        main: "#857fff",
      },
      secondary: {
        main: "#f4cc3a",
      },
    },
  });
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default ClientThemeProvider;
