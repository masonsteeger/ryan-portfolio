"use client";
import Link from "next/link";
import classes from "./Navigation.module.scss";
import { useMemo, useState } from "react";
import { useWindowSize } from "@/hooks/useScreenSize";
import useScrollPosition from "@/hooks/useScrollPosition";

export default function MainNavigation() {
  const { show } = useScrollPosition();
  const screenSize = useWindowSize();

  const [menuOpen, setMenuOpen] = useState(false);

  const links = useMemo(
    () => (
      <nav>
        <ul>
          <Link href='/gallery'>
            <li onClick={() => setMenuOpen(false)}>Gallery</li>
          </Link>
          <Link href='/contact'>
            <li onClick={() => setMenuOpen(false)}>Contact</li>
          </Link>
          <Link
            href='https://silvereyeworkshop.bigcartel.com/'
            target='__blank'>
            <li onClick={() => setMenuOpen(false)}>Shop</li>
          </Link>
        </ul>
      </nav>
    ),
    []
  );

  return (
    <>
      <header
        className={`${classes.header} ${
          show ? classes.headerAnimationShow : classes.headerAnimationHide
        }`}>
        <Link href='/'>Home</Link>
        {screenSize.width > 768 ? (
          links
        ) : (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={[
              classes["hamburger"],
              classes["hamburger--squeeze"],
              menuOpen ? classes["is-active"] : "",
            ].join(" ")}
            type='button'>
            <span className={classes["hamburger-box"]}>
              <span className={classes["hamburger-inner"]}></span>
            </span>
          </button>
        )}
      </header>
      {screenSize.width <= 768 && (
        <div
          className={[
            classes.mobileMenu,
            menuOpen ? classes.mobileMenuOpen : "",
          ].join(" ")}>
          {links}
        </div>
      )}
    </>
  );
}
