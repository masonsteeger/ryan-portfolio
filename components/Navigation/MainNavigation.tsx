import Link from "next/link";
import Logo from "./Logo";
import classes from "./MainNavigation.module.scss";
import { useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import useScrollPosition from "@@/hooks/useScrollPosition";
import { useWindowSize } from "@@/hooks/useScreenSize";

export default function MainNavigation() {
  const { status } = useSession();
  const { show } = useScrollPosition();
  const screenSize = useWindowSize();

  const [menuOpen, setMenuOpen] = useState(false);

  const links = useMemo(
    () => (
      <nav>
        <ul>
          <Link href='/projects'>
            <li onClick={() => setMenuOpen(false)}>Projects</li>
          </Link>
          <Link href='/blogs'>
            <li onClick={() => setMenuOpen(false)}>Blogs</li>
          </Link>
          {status === "authenticated" && (
            <Link href='/editor'>
              <li onClick={() => setMenuOpen(false)}>Editor</li>
            </Link>
          )}

          <Link href='/contact'>
            <li onClick={() => setMenuOpen(false)}>Contact </li>
          </Link>
        </ul>
      </nav>
    ),
    [status]
  );

  return (
    <>
      <header
        className={`${classes.header} ${
          show ? classes.headerAnimationShow : classes.headerAnimationHide
        }`}>
        <Link href='/'>
          <Logo />
        </Link>
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
