import BookingForm from "@/components/BookingForm/BookingForm";
import React from "react";

const Booking = () => {
  return (
    <>
      <div className='page-title'>
        <h1>Booking</h1>
      </div>
      <div className='page-content'>
        <BookingForm />
      </div>
    </>
  );
};

export default Booking;
