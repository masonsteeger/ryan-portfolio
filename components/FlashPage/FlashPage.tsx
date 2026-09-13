"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Box, CircularProgress, Stack, Typography, Button } from "@mui/material";
import Image from "next/image";
import { FlashDesign } from "@/types/Flash";
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

  // Validate design data
  if (!design || !design.id || design.price === undefined || !design.src) {
    return null;
  }

  const handleClick = () => {
    const params = new URLSearchParams({
      flash: design.id,
      referenceUrl: design.src,
      price: design.price.toString(),
    });
    router.push(`/booking?${params.toString()}`);
  };

  const price = typeof design.price === 'number' ? design.price : parseFloat(design.price as any);

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
        <Image
          src={design.src}
          alt={`Flash design ${design.id}`}
          width={300}
          height={300}
          className={classes.image}
        />
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

      // Normalize the data to ensure it's in the right format
      let flashDesigns: FlashDesign[] = [];

      if (Array.isArray(data)) {
        flashDesigns = data.filter(item => item && item.id && item.price !== undefined && item.src);
      } else if (data && typeof data === "object" && data.id && data.price !== undefined && data.src) {
        flashDesigns = [data];
      }

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
