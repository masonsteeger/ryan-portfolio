import BookingForm from "@/components/BookingForm/BookingForm";

const Booking = async () => {
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
