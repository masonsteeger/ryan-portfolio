"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Stack,
  Chip,
  Tooltip,
} from "@mui/material";
import Image from "next/image";
import { FlashDesign } from "@/types/Flash";
import classes from "./FlashDetailsModal.module.scss";

// Helper to convert string "true"/"false" to boolean
function parseBoolean(value: any): boolean | undefined {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') return value.toLowerCase() === 'true';
  return undefined;
}

interface FlashDetailsModalProps {
  open: boolean;
  design: FlashDesign | null;
  onClose: () => void;
  onBook: () => Promise<void>;
  isLoading?: boolean;
  error?: string | null;
}

export default function FlashDetailsModal({
  open,
  design,
  onClose,
  onBook,
  isLoading = false,
  error = null,
}: FlashDetailsModalProps) {
  if (!design) return null;

  const imageData = design.src;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "8px",
        },
      }}>
      <DialogContent
        sx={{
          padding: "32px 24px",
        }}>
        <Stack spacing={3}>
          {imageData && (
            <Box
              className={classes.imageContainer}
              sx={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}>
              <Image
                src={imageData}
                alt={`Flash design ${design.id}`}
                width={300}
                height={300}
                className={classes.image}
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  borderRadius: "8px",
                }}
              />
            </Box>
          )}

          <Box>
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                marginBottom: "8px",
              }}>
              Flash Design Details
            </Typography>
            {design.description && (
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{
                  marginBottom: "16px",
                  lineHeight: 1.6,
                }}>
                {design.description}
              </Typography>
            )}
            <Box sx={{ marginBottom: "16px" }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
                <Typography
                  variant="h6"
                  sx={{
                    color: "#181e96",
                    fontWeight: "bold",
                  }}>
                  {design.price}
                </Typography>
                {parseBoolean(design.repeatable) !== undefined && (
                  <Tooltip
                    title={parseBoolean(design.repeatable) ? 'This tattoo design can be repeated as many times as desired' : 'This flash image is only available for one booking'}
                    placement='top'
                    arrow
                    slotProps={{
                      tooltip: {
                        sx: {
                          fontSize: '0.95rem',
                          backgroundColor: 'rgba(0, 0, 0, 0.87)',
                          padding: '8px 12px',
                        },
                      },
                    }}>
                    <Chip
                      label={parseBoolean(design.repeatable) ? '✓ Repeatable' : '⚠ Limited'}
                      size='small'
                      variant={parseBoolean(design.repeatable) ? 'filled' : 'filled'}
                      color={parseBoolean(design.repeatable) ? 'success' : 'warning'}
                      sx={{ fontWeight: 500 }}
                    />
                  </Tooltip>
                )}
              </Box>
            </Box>
          </Box>
        </Stack>
      </DialogContent>

      {error && (
        <Box
          sx={{
            padding: "12px 24px",
            backgroundColor: "#ffebee",
            color: "#d32f2f",
            borderTop: "1px solid #ef5350",
          }}>
          <Typography variant="body2">{error}</Typography>
        </Box>
      )}

      <DialogActions
        sx={{
          padding: "16px 24px",
          gap: "12px",
        }}>
        <Button onClick={onClose} variant="outlined" disabled={isLoading}>
          Cancel
        </Button>
        <Button
          onClick={onBook}
          variant="contained"
          color="primary"
          disabled={isLoading}>
          {isLoading ? "Reserving..." : "Proceed to Booking"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
