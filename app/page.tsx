import TextContainer from "@/components/Containers/TextContainer";
import Image from "next/image";

export default function Home() {
  return (
    <div className='page-container'>
      <h1 className='page-title'>InkBySilverEye</h1>
      <TextContainer>
        <div style={{ marginRight: "auto", padding: "12px" }}>
          <h1>Hi, I&#39;m Ryan Leach</h1>
          <p>
            I&#39;m a tattoo artist at Midgard Tattoo in Dallas, Texas. I enjoy
            doing mandalas, geometric patterns, and other styles! Other stuff
            can go here for filling out a bio lol.
          </p>
        </div>
        <Image
          src={"/static/images/head-shot.jpg"}
          alt='Ryan Leach Tattoo'
          width={500}
          height={500}
          style={{
            width: "auto",
            height: "100%",
            maxWidth: "40%",
            marginLeft: "12px",
          }}
        />
      </TextContainer>
    </div>
  );
}
