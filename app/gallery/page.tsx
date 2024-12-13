import ImageContainer from "@/components/Containers/ImageContainer";

import classes from "./Gallery.module.scss";

const images: string[] = [
  "/static/images/portfolio-1.jpg",
  "/static/images/portfolio-2.jpg",
  "/static/images/portfolio-3.jpg",
  "/static/images/portfolio-4.jpg",
  "/static/images/portfolio-5.jpg",
  "/static/images/portfolio-6.jpg",
  "/static/images/portfolio-7.jpg",
];

export default function Gallery() {
  return (
    <>
      <div className='page-title'>
        <h1>Gallery</h1>
      </div>
      <div className={classes["gallery-container"]}>
        {images.map((image: string, i: number) => {
          return (
            <ImageContainer
              key={image}
              src={image}
              alt={`portfolio-image-${i}`}
              style={{
                opacity: 0,
                animation: "fadeIn .3s ease-in-out forwards",
                animationDelay: `${i * 0.25 + 0.5}s`,
              }}
            />
          );
        })}
      </div>
    </>
  );
}
