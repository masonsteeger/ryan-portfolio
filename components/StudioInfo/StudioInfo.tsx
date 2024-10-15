"use client";
import React from "react";
import { osName } from "react-device-detect";
import { Map, Marker, Overlay } from "pigeon-maps";
import Container from "../Containers/Container";
import classes from "./StudioInfo.module.scss";
import ContactInfo from "../ContactInfo/ContactInfo";

const StudioInfo = () => {
  return (
    <div className={classes["outer-container"]}>
      <Container>
        <Map
          mouseEvents={false}
          touchEvents={false}
          height={335}
          defaultCenter={[32.9345446314365, -96.83831406623952]}
          defaultZoom={16}>
          <Overlay
            anchor={[32.9345446314365, -96.83831406623952]}
            offset={[0, 160]}>
            <div className={classes["link-container"]}>
              <a
                href={
                  osName === "iOS"
                    ? `https://maps.apple.com/maps?q=${process.env.NEXT_PUBLIC_ARTIST_SHOP_ADDRESS}`
                    : `https://maps.google.com/?q=${process.env.NEXT_PUBLIC_ARTIST_SHOP_ADDRESS}`
                }
                target='__blank'
                className={classes.link}>
                {" "}
                {process.env.NEXT_PUBLIC_ARTIST_SHOP_NAME}
                <br />
                {process.env.NEXT_PUBLIC_ARTIST_SHOP_ADDRESS}
              </a>
            </div>
          </Overlay>
          <Marker
            onClick={() => {
              window.open(
                osName === "iOS"
                  ? `https://maps.apple.com/maps?q=${process.env.NEXT_PUBLIC_ARTIST_SHOP_ADDRESS}`
                  : `https://maps.google.com/?q=${process.env.NEXT_PUBLIC_ARTIST_SHOP_ADDRESS}`,
                "_blank"
              );
            }}
            color={"#1fbbea"}
            width={50}
            anchor={[32.9345446314365, -96.83831406623952]}
          />
        </Map>
      </Container>
      <ContactInfo />
    </div>
  );
};

export default StudioInfo;
