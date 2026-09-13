import { Suspense } from "react";
import BookingForm from "@/components/BookingForm/BookingForm";
import { CircularProgress, Box } from "@mui/material";

function BookingLoadingFallback() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "400px",
      }}>
      <CircularProgress />
    </Box>
  );
}

const Booking = () => {
  return (
    <div className='page-content'>
      <h1 className='page-title'>Booking</h1>
      <Suspense fallback={<BookingLoadingFallback />}>
        <BookingForm />
      </Suspense>
    </div>
  );
};

export default Booking;
