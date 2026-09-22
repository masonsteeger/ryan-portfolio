"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  CircularProgress,
  Stack,
  Typography,
  Button,
  Chip,
  Tooltip,
} from "@mui/material";
import Image from "next/image";
import { FlashDesign } from "@/types/Flash";
import { useFlash } from "@/contexts/FlashContext";
import FlashDetailsModal from "@/components/FlashDetailsModal/FlashDetailsModal";
import classes from "./FlashPage.module.scss";

async function getFlashDesigns() {
  try {
    return await fetch(`${process.env.NEXT_PUBLIC_FORM_ENDPOINT}`, {
      method: "POST",
      body: JSON.stringify({
        type: "flash",
        username: process.env.NEXT_PUBLIC_ARTIST_USERNAME,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        return data;
      });
  } catch (err) {
    console.log(err);
    throw err;
  }
}

function Loading() {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <CircularProgress color='secondary' size={60} />
    </Box>
  );
}

// Helper to convert string "true"/"false" to boolean
function parseBoolean(value: any): boolean | undefined {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") return value.toLowerCase() === "true";
  return undefined;
}

interface FlashDesignCardProps {
  design: FlashDesign;
  onOpenModal: (design: FlashDesign) => void;
}

function FlashDesignCard({ design, onOpenModal }: FlashDesignCardProps) {
  // Validate design data
  if (!design || !design.id || design.price === undefined) {
    return null;
  }

  // Use src (URL) only
  const imageData = design.src;
  if (!imageData) {
    return null;
  }

  const handleClick = () => {
    onOpenModal(design);
  };

  return (
    <Box
      className={classes.card}
      onClick={handleClick}
      sx={{
        cursor: "pointer",
        transition: "transform 0.2s",
        "&:hover": {
          transform: "scale(1.05)",
        },
      }}>
      <Box className={classes.imageContainer}>
        {imageData && (
          <Image
            src={imageData}
            alt={`Flash design ${design.id}`}
            width={300}
            height={300}
            className={classes.image}
          />
        )}
      </Box>
      <Box className={classes.info}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
          <Typography variant='h6' className={classes.price}>
            {design.price}
          </Typography>
          {parseBoolean(design.repeatable) !== undefined && (
            <Tooltip
              title={
                parseBoolean(design.repeatable)
                  ? "This design can be repeated several times"
                  : "This design is only available for one person"
              }
              placement='top'
              arrow
              slotProps={{
                tooltip: {
                  sx: {
                    fontSize: "0.95rem",
                    backgroundColor: "rgba(0, 0, 0, 0.87)",
                    padding: "8px 12px",
                  },
                },
              }}>
              <Chip
                label={
                  parseBoolean(design.repeatable) ? "✓ Repeatable" : "⚠ Limited"
                }
                size='small'
                variant={parseBoolean(design.repeatable) ? "filled" : "filled"}
                color={parseBoolean(design.repeatable) ? "success" : "warning"}
                sx={{ fontWeight: 500 }}
              />
            </Tooltip>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default function FlashPage() {
  const router = useRouter();
  const flashContext = useFlash();
  const [designs, setDesigns] = useState<FlashDesign[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isRetrying, setIsRetrying] = useState(false);
  const [selectedDesign, setSelectedDesign] = useState<FlashDesign | null>(
    null,
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [reserveLoading, setReserveLoading] = useState(false);
  const [reserveError, setReserveError] = useState<string | null>(null);

  const fetchDesigns = async () => {
    try {
      setIsRetrying(true);
      setError(null);
      const data = await getFlashDesigns();
      console.log("Flash designs response:", data);
      console.log("Response type:", typeof data);
      console.log("Is array:", Array.isArray(data));
      if (data) {
        console.log("Response keys:", Object.keys(data));
        console.log("First item:", Array.isArray(data) ? data[0] : data);
      }

      // Normalize the data to ensure it's in the right format
      let flashDesigns: FlashDesign[] = [];

      if (Array.isArray(data)) {
        flashDesigns = data.filter((item: any) => {
          // Only use src (URL)
          const hasImage = item.src;
          const isValid =
            item && item.id && item.price !== undefined && hasImage;
          if (!isValid) {
            console.log("Filtered out item:", item);
          }
          return isValid;
        });
      } else if (data && typeof data === "object") {
        // If it's a single object, check if it has the right properties
        const hasImage = data.src;
        if (data.id && data.price !== undefined && hasImage) {
          flashDesigns = [data];
        } else {
          // Maybe it's wrapped in an array property
          const arrayProp = Object.values(data).find((val) =>
            Array.isArray(val),
          );
          if (arrayProp) {
            flashDesigns = (arrayProp as any[]).filter((item: any) => {
              // Only use src (URL)
              const itemHasImage = item.src;
              return (
                item && item.id && item.price !== undefined && itemHasImage
              );
            });
          }
        }
      }

      console.log("Processed flash designs:", flashDesigns);
      setDesigns(flashDesigns);
    } catch (err) {
      console.error("Failed to fetch flash designs:", err);
      setError("Failed to load flash designs. Please try again.");
      setDesigns(null);
    } finally {
      setIsRetrying(false);
    }
  };

  useEffect(() => {
    fetchDesigns();
  }, []);

  const handleOpenModal = (design: FlashDesign) => {
    setSelectedDesign(design);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedDesign(null);
  };

  const handleBooking = async () => {
    if (!selectedDesign) return;

    setReserveLoading(true);
    setReserveError(null);

    try {
      // Skip reservation for repeatable designs - they can be booked multiple times
      const isRepeatable = parseBoolean(selectedDesign.repeatable);
      if (!isRepeatable) {
        // Only reserve limited flash designs
        console.log(selectedDesign.id);
        const reserveResponse = await fetch(
        `${process.env.NEXT_PUBLIC_FORM_ENDPOINT}`,
        {
          method: "POST",
          body: JSON.stringify({
            type: "reserve",
            flashId: selectedDesign.id,
            username: process.env.NEXT_PUBLIC_ARTIST_USERNAME,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

        let reserveRes = await reserveResponse.json();

        // Handle backend error wrapped in body property
        if (reserveRes.body && typeof reserveRes.body === "string") {
          reserveRes = JSON.parse(reserveRes.body);
        }

        // Check if reserve failed
        if (reserveRes.error) {
          setReserveError(
            reserveRes.message ||
              "This flash design is no longer available. Please choose another.",
          );
          setReserveLoading(false);
          return;
        }

        // Check if reserve succeeded
        if (reserveRes.success) {
          console.log("Flash reserved:", reserveRes.message);
          // Flash is now reserved for 15 minutes - proceed to booking
        } else if (!reserveRes.success && !reserveRes.error) {
          // Unexpected response format - likely another user has claimed this flash
          setReserveError(
            "Someone else has claimed this flash design. Please choose another design.",
          );
          setReserveLoading(false);
          return;
        }
      }

      // Success - store the selected flash design in context and navigate
      // (skipped reserve for repeatable, or reserve succeeded for limited)
      if (flashContext) {
        flashContext.setSelectedFlash(selectedDesign);
      }
      setReserveLoading(false);
      router.push(`/booking`);
    } catch (err) {
      console.error("Error reserving flash:", err);
      setReserveError("Failed to reserve flash. Please try again.");
      setReserveLoading(false);
    }
  };

  if (designs === null && !error) {
    return <Loading />;
  }

  return (
    <Stack
      direction='column'
      alignItems='center'
      sx={{
        width: "100%",
        minHeight: "100vh",
        padding: "24px",
      }}>
      <Typography
        variant='h3'
        sx={{ marginBottom: "32px", fontWeight: "bold" }}>
        Flash Designs
      </Typography>

      {error && (
        <Box
          sx={{
            backgroundColor: "#ffebee",
            color: "#d32f2f",
            padding: "16px",
            borderRadius: "4px",
            marginBottom: "24px",
            textAlign: "center",
            width: "100%",
            maxWidth: "600px",
          }}>
          <Typography>{error}</Typography>
          <Button
            variant='contained'
            onClick={fetchDesigns}
            sx={{ marginTop: "12px" }}
            disabled={isRetrying}>
            {isRetrying ? "Retrying..." : "Retry"}
          </Button>
        </Box>
      )}

      {designs && designs.length === 0 && !error && (
        <Box
          sx={{
            textAlign: "center",
            padding: "48px 24px",
            width: "100%",
            maxWidth: "600px",
          }}>
          <Typography variant='h6'>
            No flash designs available at the moment.
          </Typography>
          <Typography sx={{ marginTop: "12px", color: "gray" }}>
            Please check back later or contact the artist for custom designs.
          </Typography>
        </Box>
      )}

      {designs && designs.length > 0 && (
        <Box
          className={classes.grid}
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
            gap: "24px",
            width: "100%",
            maxWidth: "1200px",
          }}>
          {designs.map((design) => (
            <FlashDesignCard
              key={design.id}
              design={design}
              onOpenModal={handleOpenModal}
            />
          ))}
        </Box>
      )}

      <FlashDetailsModal
        open={modalOpen}
        design={selectedDesign}
        onClose={handleCloseModal}
        onBook={handleBooking}
        isLoading={reserveLoading}
        error={reserveError}
      />
    </Stack>
  );
}
