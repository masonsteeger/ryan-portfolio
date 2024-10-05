import React, { useEffect, useRef, useState } from "react";

const useScrollPosition = () => {
  const [show, setShow] = useState(true);
  const lastScrollTop = useRef(0);

  useEffect(() => {
    const updatePosition = () => {
      const container = document.getElementById("site-container");
      if (!container) return;
      const previous = lastScrollTop.current;
      lastScrollTop.current = container.scrollTop;
      if (container.scrollTop < 96) {
        setShow(true);
      } else if (container.scrollTop > previous) {
        setShow(false);
      } else {
        setShow(true);
      }
    };

    document
      .getElementById("site-container")
      ?.addEventListener("scroll", updatePosition);

    return () =>
      document
        .getElementById("site-container")
        ?.removeEventListener("scroll", updatePosition);
  }, []);

  return { show };
};

export default useScrollPosition;
