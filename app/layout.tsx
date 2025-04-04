import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navigation from "@/components/Navigation/Navigation";
import ClientThemeProvider from "./ClientThemeProvider";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import ScrollToTop from "./ScrollToTop";

const quicksand = localFont({
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
const josefinSans = localFont({
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

export const metadata: Metadata = {
  title: "Ryan Leach Tattoo",
  description: "@inkbysilvereye",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <ClientThemeProvider>
        <body className={`${josefinSans.variable} ${quicksand.variable}`}>
          <div id={"site-container"}>
            <ScrollToTop />
            <Navigation />
            <div id={"page"}>{children}</div>
            <LoadingScreen />
          </div>
        </body>
      </ClientThemeProvider>
    </html>
  );
}
