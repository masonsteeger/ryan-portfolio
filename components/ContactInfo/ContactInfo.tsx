"use client";
import IconButton from "@mui/material/IconButton/IconButton";
import Tooltip from "@mui/material/Tooltip/Tooltip";
import InstagramIcon from "@mui/icons-material/Instagram";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import EmailIcon from "@mui/icons-material/Email";
import LanguageIcon from "@mui/icons-material/Language";
import React from "react";
import classes from "./ContactInfo.module.scss";

const ContactInfo = () => {
  return (
    <div className={classes.iconRow}>
      <Tooltip placement='bottom' title='Instagram'>
        <a
          href={process.env.NEXT_PUBLIC_ARTIST_INSTA_LINK}
          target='__blank'
          style={{ textDecoration: "underline" }}>
          <IconButton size={"large"} className={classes.iconButton}>
            <InstagramIcon sx={{ height: "60px", width: "60px" }} />
          </IconButton>
        </a>
      </Tooltip>
      <Tooltip placement='bottom' title='Email'>
        <a
          href={`mailto:${process.env.NEXT_PUBLIC_ARTIST_EMAIL}`}
          target='__blank'
          style={{ textDecoration: "underline" }}>
          <IconButton size={"large"} className={classes.iconButton}>
            <EmailIcon sx={{ height: "60px", width: "60px" }} />
          </IconButton>
        </a>
      </Tooltip>
      <Tooltip placement='bottom' title='Studio Phone'>
        <a
          href={`tel:${process.env.NEXT_PUBLIC_ARTIST_SHOP_PHONE}`}
          style={{ textDecoration: "underline" }}>
          <IconButton size={"large"} className={classes.iconButton}>
            <PhoneInTalkIcon sx={{ height: "60px", width: "60px" }} />
          </IconButton>
        </a>
      </Tooltip>
      <Tooltip placement='bottom' title='Studio Website'>
        <a
          href={process.env.NEXT_PUBLIC_ARTIST_SHOP_WEBSITE}
          target='__blank'
          style={{ textDecoration: "underline" }}>
          <IconButton size={"large"} className={classes.iconButton}>
            <LanguageIcon sx={{ height: "60px", width: "60px" }} />
          </IconButton>
        </a>
      </Tooltip>
    </div>
  );
};

export default ContactInfo;
