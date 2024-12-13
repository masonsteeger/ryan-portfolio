"use client";
import Container from "@/components/Containers/Container";
import Image from "next/image";
import classes from "./Home.module.scss";
import StudioInfo from "@/components/StudioInfo/StudioInfo";
import ImageContainer from "@/components/Containers/ImageContainer";

export default function Home() {
  return (
    <>
      <h1 className='page-title'>InkBySilverEye</h1>
      <div className='page-content'>
        <Container>
          <div style={{ marginRight: "auto", padding: "12px" }}>
            <h2>Hi, I&#39;m Ryan Leach</h2>
            <p>
              I am a passionate tattoo artist with 5 years of experience. From a
              young age, art inspired me, and I always knew it would shape my
              career. I found tattooing during a pivotal moment in my life,
              serving as an escape and a way to transform people&#39;s ideas
              into unique self expressive art. I specialize in geometric designs
              but also enjoy floral, ornamental, and black and grey realism
              tattoos. Tattooing has profoundly changed my life, and the
              friendships and artist knowledge I&#39;ve made and learned are
              among my most cherished achievements. <br />I am happily married
              to my best friend and biggest supporter. We are parents to the
              most beautiful two-year-old daughter, and happy furry family of 2
              cats and a mini Aussie. In addition to tattooing, I pursue glass
              engraving, painting, home décor refinishing and creating digital
              art for clothing. I spend most of my time enjoying it with family
              and attending music festivals.
            </p>
          </div>
          <div
            className={classes["image-container"]}
            style={{ margin: "0 auto" }}>
            <Image
              src={"/static/images/head-shot.jpg"}
              priority={true}
              alt='Ryan Leach Headshot'
              width={0}
              height={0}
              sizes='100vw'
              style={{
                width: "auto",
                height: "100%",
                minWidth: "220px",
                maxHeight: "500px",
              }}
            />
          </div>
        </Container>
        <br />
        <a
          href='/booking'
          style={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          <h3>Schedule an Appointment</h3>
          <ImageContainer
            src='/static/images/action-shot.jpg'
            alt='Action Shot'
            priority={true}
          />
        </a>
        <br />
        <h2 style={{ textAlign: "center" }}>Contact/Studio Information</h2>
        <StudioInfo />
      </div>
    </>
  );
}
