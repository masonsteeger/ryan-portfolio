"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Box, CircularProgress, Stack, Typography, Button } from "@mui/material";
import Image from "next/image";
import { FlashDesign } from "@/types/Flash";
import { useFlash } from "@/contexts/FlashContext";
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
      <CircularProgress color="secondary" size={60} />
    </Box>
  );
}

function FlashDesignCard({ design }: { design: FlashDesign }) {
  const router = useRouter();
  const flashContext = useFlash();

  // Validate design data
  if (!design || !design.id || design.price === undefined) {
    return null;
  }

  // Use base64 if available, fall back to src
  const imageData = design.b64 || design.base64 || design.src;
  if (!imageData) {
    return null;
  }

  const handleClick = () => {
    // Store the selected flash design in context
    if (flashContext) {
      flashContext.setSelectedFlash(design);
    }
    // Navigate to booking form
    router.push(`/booking`);
  };

  const price = typeof design.price === 'number' ? design.price : parseFloat(design.price as any);

  // Use base64 for display if available
  const displayImage = design.b64 || design.base64 || design.src;

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
        {displayImage && (
          <Image
            src={displayImage}
            alt={`Flash design ${design.id}`}
            width={300}
            height={300}
            className={classes.image}
          />
        )}
      </Box>
      <Box className={classes.info}>
        <Typography variant="h6" className={classes.price}>
          ${isNaN(price) ? "N/A" : price.toFixed(2)}
        </Typography>
      </Box>
    </Box>
  );
}

export default function FlashPage() {
  const [designs, setDesigns] = useState<FlashDesign[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isRetrying, setIsRetrying] = useState(false);

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
          const hasImage = item.src || item.b64 || item.base64;
          const isValid = item && item.id && item.price !== undefined && hasImage;
          if (!isValid) {
            console.log("Filtered out item:", item);
          }
          return isValid;
        });
      } else if (data && typeof data === "object") {
        // If it's a single object, check if it has the right properties
        const hasImage = data.src || data.b64 || data.base64;
        if (data.id && data.price !== undefined && hasImage) {
          flashDesigns = [data];
        } else {
          // Maybe it's wrapped in an array property
          const arrayProp = Object.values(data).find(val => Array.isArray(val));
          if (arrayProp) {
            flashDesigns = (arrayProp as any[]).filter((item: any) => {
              const itemHasImage = item.src || item.b64 || item.base64;
              return item && item.id && item.price !== undefined && itemHasImage;
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

  if (designs === null && !error) {
    return <Loading />;
  }

  return (
    <Stack
      direction="column"
      alignItems="center"
      sx={{
        width: "100%",
        minHeight: "100vh",
        padding: "24px",
      }}>
      <Typography variant="h3" sx={{ marginBottom: "32px", fontWeight: "bold" }}>
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
            variant="contained"
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
          <Typography variant="h6">
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
            <FlashDesignCard key={design.id} design={design} />
          ))}
        </Box>
      )}
    </Stack>
  );
}
