import ImageContainer from "@/components/Containers/ImageContainer";

import classes from "./Gallery.module.scss";

export default function Gallery() {
  return (
    <>
      <h1>Gallery</h1>
      <div className={classes["gallery-container"]}>
        <ImageContainer
          src='/static/images/portfolio-1.jpg'
          alt='portfolio-image'
        />

        <ImageContainer
          src='/static/images/portfolio-2.jpg'
          alt='portfolio-image'
        />

        <ImageContainer
          src='/static/images/portfolio-3.jpg'
          alt='portfolio-image'
        />

        <ImageContainer
          src='/static/images/portfolio-4.jpg'
          alt='portfolio-image'
        />

        <ImageContainer
          src='/static/images/portfolio-5.jpg'
          alt='portfolio-image'
        />

        <ImageContainer
          src='/static/images/portfolio-6.jpg'
          alt='portfolio-image'
        />

        <ImageContainer
          src='/static/images/portfolio-7.jpg'
          alt='portfolio-image'
        />
      </div>
    </>
  );
}
