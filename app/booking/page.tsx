import BookingForm from "@/components/BookingForm/BookingForm";
import React from "react";

async function getArtistData() {
  return await fetch(`${process.env.NEXT_PUBLIC_FORM_ENDPOINT}`, {
    method: "POST",
    body: JSON.stringify({
      type: "get",
      username: process.env.NEXT_PUBLIC_ARTIST_USERNAME,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
}

const Booking = async () => {
  const artistData = await getArtistData();
  console.log(artistData);
  return (
    <>
      <div className='page-title'>
        <h1>Booking</h1>
      </div>
      <div className='page-content'>
        <BookingForm artist={artistData} />
      </div>
    </>
  );
};

export default Booking;
