import React, { useEffect, useRef, useState } from "react";

const useScrollPosition = () => {
  const [show, setShow] = useState(true);
  const lastScrollTop = useRef(0);

  useEffect(() => {
    const updatePosition = () => {
      const previous = lastScrollTop.current;
      lastScrollTop.current = window.scrollY;
      if (window.scrollY < 96) {
        setShow(true);
      } else {
        if (window.scrollY > previous) {
          setShow(false);
        } else {
          setShow(true);
        }
      }
    };

    window.addEventListener("scroll", updatePosition);

    return () => window.removeEventListener("scroll", updatePosition);
  }, []);

  return { show };
};

export default useScrollPosition;
