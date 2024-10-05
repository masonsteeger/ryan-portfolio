import React from "react";

const ContactInfo = () => {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        width: "100%",
        margin: "0px auto 20px",
      }}>
      <Tooltip placement='bottom' title='Instagram'>
        <a
          href={process.env.NEXT_PUBLIC_ARTIST_INSTA_LINK}
          target='__blank'
          style={{ textDecoration: "underline" }}>
          <IconButton size={"large"} className={styles.iconButton}>
            <InstagramIcon sx={{ height: "60px", width: "60px" }} />
          </IconButton>
        </a>
      </Tooltip>
      <Tooltip placement='bottom' title='Email'>
        <a
          href={`mailto:${process.env.NEXT_PUBLIC_ARTIST_EMAIL}`}
          target='__blank'
          style={{ textDecoration: "underline" }}>
          <IconButton size={"large"} className={styles.iconButton}>
            <EmailIcon sx={{ height: "60px", width: "60px" }} />
          </IconButton>
        </a>
      </Tooltip>
      <Tooltip placement='bottom' title='Shop Phone'>
        <a
          href={`tel:${process.env.NEXT_PUBLIC_ARTIST_SHOP_PHONE}`}
          style={{ textDecoration: "underline" }}>
          <IconButton size={"large"} className={styles.iconButton}>
            <PhoneInTalkIcon sx={{ height: "60px", width: "60px" }} />
          </IconButton>
        </a>
      </Tooltip>
      <Tooltip placement='bottom' title='Shop Website'>
        <a
          href={process.env.NEXT_PUBLIC_ARTIST_SHOP_WEBSITE}
          target='__blank'
          style={{ textDecoration: "underline" }}>
          <IconButton size={"large"} className={styles.iconButton}>
            <LanguageIcon sx={{ height: "60px", width: "60px" }} />
          </IconButton>
        </a>
      </Tooltip>
    </div>
  );
};

export default ContactInfo;
