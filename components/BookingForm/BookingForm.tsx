/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useFlash } from "@/contexts/FlashContext";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Checkbox from "@mui/material/Checkbox";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormGroup from "@mui/material/FormGroup";
import FormHelperText from "@mui/material/FormHelperText";
import ListSubheader from "@mui/material/ListSubheader";
import Slider from "@mui/material/Slider";
import Modal from "@mui/material/Modal";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { PatternFormat } from "react-number-format";
import Image from "next/image";
import classes from "./BookingForm.module.scss";
import { getBlobObj } from "@/utils";
import { b64FileList, Day, Form } from "@/types";
import { CircularProgress, Typography } from "@mui/material";
import update from "immutability-helper";
import Container from "../Containers/Container";

interface ImageUploadReturnType {
  $metadata: {
    httpStatusCode: number;
  };
}

interface Artist {
  sub: string;
  workingDays: Day[];
}

function Loading() {
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        backgroundColor: "rgba(0,0,0,0.3)",
        position: "absolute",
        top: "0",
        left: "0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        pointerEvents: "all",
        zIndex: "1000000",
      }}>
      <CircularProgress color={"secondary"} size={300} />
    </Box>
  );
}

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
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
}

export default function BookingForm() {
  const router = useRouter();
  const flashContext = useFlash();
  const [artist, setArtist] = React.useState<Artist | null>(null);
  const [flashUnavailable, setFlashUnavailable] = useState<boolean>(false);
  const [flashId, setFlashId] = useState<string | null>(null);
  const [flashPrice, setFlashPrice] = useState<number | string | null>(null);
  const [flashImageUrl, setFlashImageUrl] = useState<string | null>(null);
  const [flashDescription, setFlashDescription] = useState<string | null>(null);

  useEffect(() => {
    getArtistData().then((data) => setArtist(data));
  }, []);

  useEffect(() => {
    // Initialize flash context from FlashContext
    const selectedFlash = flashContext?.selectedFlash;

    if (selectedFlash) {
      console.log("Flash design selected:", selectedFlash.id);
      const imageData = selectedFlash.src;

      setFlashId(selectedFlash.id);
      setFlashImageUrl(imageData || null);
      setFlashPrice(selectedFlash.price);
      setFlashDescription(selectedFlash.description || null);
    } else {
      console.log("No flash design selected");
    }
  }, [flashContext?.selectedFlash]);

  const [form, setForm] = useState<Form>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    overEighteen: true,
    color: "",
    placement: [],
    size: "",
    idea: "",
    preferredDay: [],
    preferredDates: "",
    isConsultation: false,
  });
  const [flashQuestions, setFlashQuestions] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [netErr, setNetErr] = useState<boolean>(false);
  const [filesToUp, setFilesToUp] = useState<b64FileList[]>([]);
  const [showErrors, setShowErrors] = useState<boolean>(false);
  const [refErrorMsg, setRefErrorMsg] = useState<string | null>(null);

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [emailConfirm, setEmailConfirm] = useState<string>("");
  const [priceVal, setPriceVal] = useState([600, 800]);

  interface FieldError {
    [key: string]: string;
  }
  const [fieldErrors, setFieldErrors] = useState<FieldError>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const emailFieldRef = React.useRef<HTMLDivElement>(null);

  const minDistance = 50;

  const minFiles = 1;

  // Add flash image as reference when flash context is initialized
  useEffect(() => {
    if (flashImageUrl && flashPrice !== null) {
      console.log("Adding flash image, URL length:", flashImageUrl?.length);

      // Add flash image as a reference image with isFlash flag
      // Handle both URLs and base64 strings
      let imageDataUrl = flashImageUrl;

      // If it's a base64 string without data URL prefix, add it
      if (
        flashImageUrl &&
        !flashImageUrl.startsWith("data:") &&
        !flashImageUrl.startsWith("http")
      ) {
        // Assume it's base64, add data URL prefix
        imageDataUrl = `data:image/png;base64,${flashImageUrl}`;
        console.log(
          "Converting base64 to data URL, length:",
          imageDataUrl.length,
        );
      } else if (flashImageUrl?.startsWith("http")) {
        console.log("Using object image URL directly");
      }

      // Add to filesToUp immediately with a default size, then update when loaded
      setFilesToUp((prev) => {
        const flashImageExists = prev.some((item) => item.isFlash);
        if (flashImageExists) {
          console.log("Flash image already in filesToUp, skipping");
          return prev;
        }
        console.log("Adding flash image to filesToUp with default dimensions");
        return [
          {
            url: imageDataUrl,
            b64: imageDataUrl, // Store the full base64 data URL
            w: 800, // Default width
            h: 800, // Default height
            isFlash: true,
          },
          ...prev,
        ];
      });

      // Load the image to get actual dimensions
      const img = new window.Image();
      img.onload = () => {
        console.log(
          "Flash image loaded, dimensions:",
          img.width,
          "x",
          img.height,
        );
        // Update filesToUp with actual dimensions
        setFilesToUp((prev) =>
          prev.map((item) =>
            item.isFlash ? { ...item, w: img.width, h: img.height } : item,
          ),
        );
      };
      img.onerror = () => {
        console.error("Failed to load flash image");
      };
      // Allow cross-origin images
      img.crossOrigin = "anonymous";
      img.src = imageDataUrl;
    }
  }, [flashImageUrl, flashPrice]);

  // Update idea field when flash description or questions change
  useEffect(() => {
    if (flashPrice !== null && flashId) {
      let ideaText = `Flash piece: $${flashPrice}`;
      if (flashDescription) {
        ideaText = `${flashDescription}\n\nFlash price: ${flashPrice}`;
      }
      if (flashQuestions) {
        ideaText += `\n\n=== Client Questions ===\n${flashQuestions}`;
      }

      setForm((prev) => ({
        ...prev,
        idea: ideaText,
      }));
    }
  }, [flashPrice, flashDescription, flashQuestions, flashId]);

  const handleBudgetChange = (
    newValue: number | number[],
    activeThumb: number,
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 1200 - minDistance);
        setPriceVal([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], 200 + minDistance);
        setPriceVal([clamped - minDistance, clamped]);
      }
    } else {
      setPriceVal(newValue);
    }
  };

  const handlePreferredDay = (i: number) => {
    setForm((p) => {
      if (p.preferredDay.includes(i)) {
        const idx = p.preferredDay.findIndex((val) => val === i);
        return update(p, { preferredDay: { $splice: [[idx, 1]] } });
      } else {
        return update(p, { preferredDay: { $push: [i] } });
      }
    });
  };

  const submitForm = async () => {
    setLoading(true);
    setServerError(null);
    setFieldErrors({});

    // Validate flash image is still present if booking flash
    if (flashId && !filesToUp.some((file) => file.isFlash)) {
      setShowErrors(true);
      setLoading(false);
      return setRefErrorMsg("Flash design image must be included");
    }

    if (filesToUp.length < minFiles) {
      setShowErrors(true);
      setLoading(false);
      return setRefErrorMsg(
        `Please upload ${minFiles} or more reference images`,
      );
    } else if (
      !artist ||
      !form.firstName ||
      !form.lastName ||
      !form.email ||
      form.email !== emailConfirm ||
      !form.phone ||
      !form.color ||
      !form.size ||
      !form.idea ||
      form.placement.length === 0 ||
      form.preferredDay.length === 0
    ) {
      setLoading(false);
      return setShowErrors(true);
    } else {
      const budget = flashPrice !== null ? [0, 0] : priceVal;

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_FORM_ENDPOINT}`,
          {
            method: "POST",
            body: JSON.stringify({
              type: "post",
              form: { ...form, budget },
              flashId: flashId || undefined,
              artistId: artist.sub,
              username: process.env.NEXT_PUBLIC_ARTIST_USERNAME,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        let res = await response.json();

        // Handle backend error wrapped in body property
        if (res.body && typeof res.body === "string") {
          res = JSON.parse(res.body);
        }

        console.log("Booking response:", { statusCode: response.status, res });

        // Backend returns HTTP 200 for all responses, check res.error to detect errors
        if (res.error) {
          setLoading(false);

          // Map backend errors to user-friendly messages with field targeting
          if (res.error === "Invalid email") {
            setFieldErrors({ email: res.message });
            setTimeout(() => {
              emailFieldRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "center",
              });
            }, 0);
            return;
          }
          if (res.error === "Unreachable email") {
            setFieldErrors({ email: res.message });
            setTimeout(() => {
              emailFieldRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "center",
              });
            }, 0);
            return;
          }
          if (res.error === "Flash design unavailable") {
            setLoading(false);
            setFlashUnavailable(true);
            setServerError(res.message);
            // Reset flash selection since it's no longer available
            setFlashId(null);
            setFlashPrice(null);
            setFlashImageUrl(null);
            // Redirect to flash book after short delay to show error
            setTimeout(() => {
              router.push("/flash");
            }, 2000);
            return;
          }
          if (res.error === "Image processing failed") {
            setServerError(res.message);
            return;
          }
          if (res.error === "Booking creation failed") {
            setServerError(res.message);
            return;
          }
          if (res.error === "Email delivery failed") {
            // Still show success but inform user about email issue
            setServerError(res.message);
            setIsSubmitted(true);
            return;
          }
          if (res.error === "Booking cleanup failed") {
            setServerError(res.message);
            return;
          }
          // Handles "Unexpected error" and any other unhandled backend errors
          setServerError(
            res.message ||
              "An error occurred while processing your booking. Please try again.",
          );
          return;
        }

        // Booking creation succeeded, now upload images
        if (!res.customerId) {
          console.error("Missing customerId in response:", res);
          setServerError(
            "Unexpected response from server. Please try again or contact support.",
          );
          setLoading(false);
          return;
        }

        await Promise.all(
          filesToUp.map((obj, i) => {
            if (obj.isFlash) {
              return Promise.resolve({ skipped: true });
            }

            return new Promise(async (resolve, reject) => {
              return await fetch(`${process.env.NEXT_PUBLIC_FORM_ENDPOINT}`, {
                method: "POST",
                body: JSON.stringify({
                  type: "img",
                  image: obj.b64.split(",")[1],
                  i: i,
                  customerId: res.customerId,
                  artistId: artist.sub,
                }),
                headers: {
                  "Content-Type": "application/json",
                },
              })
                .then((json) => json.json())
                .then((res) => {
                  resolve(res);
                })
                .catch((err) => {
                  reject(err);
                });
            });
          }),
        )
          .then((imageResults: any) => {
            let hasError = false;
            imageResults.forEach((obj: ImageUploadReturnType) => {
              if (obj.skipped) return;
              if (obj.$metadata?.httpStatusCode !== 200) {
                hasError = true;
              }
            });

            setLoading(false);
            if (hasError) {
              setServerError(
                "Some reference images failed to upload, but your booking was created.",
              );
            }
            setIsSubmitted(true);
          })
          .catch((err) => {
            setLoading(false);
            setServerError(
              "Failed to upload reference images, but your booking was created.",
            );
            setIsSubmitted(true);
          });
      } catch (err) {
        setLoading(false);
        setServerError(
          "Network error. Please check your connection and try again.",
        );
      }
    }
  };

  const handleFileInput = async (
    e: React.ChangeEvent<HTMLInputElement>,
    isFlash: boolean | undefined,
  ) => {
    if (e.target.files !== null) {
      Promise.all(
        Object.keys(e.target.files).map((key: string) => {
          if (e.target.files !== null) {
            return getBlobObj(
              e.target.files[parseInt(key, 10)],
              isFlash ?? false,
            );
          }
        }),
      ).then(async (r) => {
        setFilesToUp((p) => {
          p = p.concat(r as b64FileList[]);
          return [...p];
        });
        e.target.value = "";
      });
    }
  };

  if (!artist) {
    return <Loading />;
  }

  if (!isSubmitted) {
    return (
      <Stack
        direction='column'
        alignItems={"center"}
        sx={{
          width: "100%",
          color: "black",
          marginBottom: "24px",
        }}>
        {loading ? <Loading /> : null}
        <Container
          style={{
            backgroundColor: "white",
            flexDirection: "column",
            padding: "12px",
            justifyContent: "center",
            width: "95%",
            alignItems: "center",
          }}>
          <Modal
            open={(netErr || Boolean(serverError)) && !loading}
            onClose={() => {
              setNetErr(false);
              setServerError(null);
            }}>
            <Box
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "50%",
                backgroundColor: "#ffffff",
                border: "2px solid #000",
                padding: "40px",
              }}>
              <h2
                style={{
                  textAlign: "center",
                  color: "black",
                  lineHeight: "35px",
                }}>
                {flashUnavailable
                  ? "Flash Design Unavailable"
                  : "Something went wrong!"}
              </h2>
              <h3
                style={{
                  textAlign: "center",
                  color: "black",
                  lineHeight: "30px",
                }}>
                {serverError ? (
                  <>
                    {serverError}
                    {flashUnavailable && (
                      <p
                        style={{
                          fontSize: "14px",
                          marginTop: "20px",
                          color: "#666",
                        }}>
                        Redirecting you back to the flash book...
                      </p>
                    )}
                    {!serverError.includes("Network error") &&
                      !flashUnavailable && (
                        <>
                          <p
                            style={{
                              fontSize: "14px",
                              marginTop: "20px",
                              color: "#666",
                            }}>
                            If you continue to have issues, please call the shop
                            at
                          </p>
                          <a
                            style={{ color: "#181e96" }}
                            href={`tel:${process.env.NEXT_PUBLIC_ARTIST_SHOP_PHONE}`}>
                            {process.env.NEXT_PUBLIC_ARTIST_SHOP_PHONE}
                          </a>
                        </>
                      )}
                  </>
                ) : (
                  <>
                    Please try to submit the form again, if there are continued
                    issues please call the shop at{" "}
                    <a
                      style={{ color: "#181e96" }}
                      href={`tel:${process.env.NEXT_PUBLIC_ARTIST_SHOP_PHONE}`}>
                      {process.env.NEXT_PUBLIC_ARTIST_SHOP_PHONE}
                    </a>
                  </>
                )}
              </h3>
            </Box>
          </Modal>
          <Box sx={{ width: "90%" }}>
            <ButtonGroup
              size='large'
              fullWidth
              variant='outlined'
              aria-label='Disabled elevation buttons'>
              <Button
                onClick={() =>
                  setForm(() => ({ ...form, isConsultation: false }))
                }
                variant={!form.isConsultation ? "contained" : "outlined"}>
                <Typography sx={{ fontWeight: "600" }}>Appointment</Typography>
              </Button>
              <Button
                onClick={() =>
                  setForm(() => ({ ...form, isConsultation: true }))
                }
                variant={form.isConsultation ? "contained" : "outlined"}>
                <Typography sx={{ fontWeight: "600" }}>Consultation</Typography>
              </Button>
            </ButtonGroup>
          </Box>
          <div className={classes.logoContainer}>
            <Image
              src='/static/images/logo-icon.jpg'
              alt='artist logo'
              width='1000'
              height='1000'
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "50%",
                backgroundColor: "white",
              }}
            />
          </div>
          <h1>{!form.isConsultation ? "Booking Form" : "Consultation Form"}</h1>
          <Stack
            direction='column'
            alignItems={"center"}
            spacing={2}
            sx={{ width: "90%" }}>
            <Stack
              direction='row'
              justifyContent={"center"}
              alignItems={"center"}
              spacing={0}
              sx={{ width: "100%" }}>
              <hr style={{ borderColor: "#000000", width: "40%" }} />
              <h3 style={{ margin: "10px", textAlign: "center" }}>
                Disclaimer
              </h3>
              <hr style={{ borderColor: "#000000", width: "40%" }} />
            </Stack>
            {form.isConsultation ? (
              <ul className={classes["list-container"]}>
                <li>
                  <b>
                    This form is not for booking a tattoo but to discuss the
                    idea and set a later date for the actual tattoo appointment.
                  </b>
                </li>
                <li>
                  Bring photo references or just have a general idea of the
                  imagery your wanting to get tattooed and where.
                </li>
                <li>For General questions please DM me on Instagram.</li>
              </ul>
            ) : (
              <ul className={classes["list-container"]}>
                <li>
                  A 50$ deposit is required to schedule your appointment. This
                  will be deducted from the price of the tattoo.
                </li>
                <li>
                  Deposits are non refundable but can be re used to reschedule
                  if given a minimum of a 48-hour notice.
                </li>
                <li>
                  If you have questions about placement, design or anything else
                  please message me on{" "}
                  <a
                    style={{ textDecoration: "underline" }}
                    href='https://www.instagram.com/inkbysilvereye/'
                    target='__blank'>
                    Instagram
                  </a>{" "}
                  or setup a consultation.
                </li>
              </ul>
            )}
            <Stack
              direction='row'
              justifyContent={"center"}
              alignItems={"center"}
              spacing={0}
              sx={{ width: "100%" }}>
              <hr style={{ borderColor: "#000000", width: "40%" }} />
              <h3 style={{ margin: "10px", textAlign: "center" }}>Personal</h3>
              <hr style={{ borderColor: "#000000", width: "40%" }} />
            </Stack>
            <Stack
              direction='row'
              justifyContent={"space-between"}
              alignItems={"center"}
              spacing={2}
              sx={{ width: "100%" }}>
              <TextField
                required
                error={!form.firstName && showErrors}
                value={form.firstName}
                onChange={(e) => {
                  setForm((p) => {
                    p.firstName = e.target.value;
                    return { ...p };
                  });
                }}
                fullWidth
                label='First Name'
                variant='outlined'
              />
              <TextField
                required
                error={!form.lastName && showErrors}
                value={form.lastName}
                onChange={(e) => {
                  setForm((p) => {
                    p.lastName = e.target.value;
                    return { ...p };
                  });
                }}
                fullWidth
                label='Last Name'
                variant='outlined'
              />
            </Stack>
            <Stack
              ref={emailFieldRef}
              direction='row'
              justifyContent={"space-between"}
              alignItems={"center"}
              spacing={2}
              sx={{ width: "100%" }}>
              <TextField
                required
                error={
                  (!form.email && showErrors) || Boolean(fieldErrors.email)
                }
                helperText={fieldErrors.email}
                value={form.email}
                onChange={(e) => {
                  setForm((p) => {
                    p.email = e.target.value;
                    return { ...p };
                  });
                  // Clear error when user starts correcting
                  if (fieldErrors.email) {
                    setFieldErrors((prev) => {
                      const updated = { ...prev };
                      delete updated.email;
                      return updated;
                    });
                  }
                }}
                fullWidth
                type='email'
                label='Email'
                variant='outlined'
              />
            </Stack>
            <Stack
              direction='row'
              justifyContent={"space-between"}
              alignItems={"center"}
              spacing={2}
              sx={{ width: "100%" }}>
              <TextField
                required
                error={Boolean(form.email && form.email !== emailConfirm)}
                value={emailConfirm}
                onChange={(e) => {
                  setEmailConfirm(e.target.value);
                }}
                fullWidth
                type='email'
                label='Confirm Email'
                variant='outlined'
              />
            </Stack>
            <Stack
              direction='row'
              justifyContent={"space-between"}
              alignItems={"center"}
              spacing={2}
              sx={{ width: "100%" }}>
              <PatternFormat
                required
                format='(###) ###-####'
                customInput={TextField}
                error={!form.phone && showErrors}
                value={form.phone}
                onChange={(e) => {
                  setForm((p) => {
                    p.phone = e.target.value;
                    return { ...p };
                  });
                }}
                fullWidth
                type='tel'
                label='Phone Number'
                variant='outlined'
              />
            </Stack>
            <Stack
              direction='row'
              justifyContent={"flex-start"}
              alignItems={"center"}
              spacing={2}
              sx={{ width: "100%" }}>
              <FormLabel
                error={!form.overEighteen && showErrors}
                required
                sx={{ margin: "0" }}>
                Are you 18 years or older?
              </FormLabel>
              <RadioGroup
                value={form.overEighteen}
                onChange={(e) => {
                  setForm((p) => {
                    p.overEighteen = e.target.value === "true" ? true : false;
                    return { ...p };
                  });
                }}
                name='radio-buttons-group'
                row>
                <FormControlLabel
                  value={"true"}
                  control={<Radio />}
                  label='Yes'
                />
                <FormControlLabel
                  value={"false"}
                  control={<Radio />}
                  label='No'
                />
              </RadioGroup>
            </Stack>
            <Stack
              direction='row'
              justifyContent={"center"}
              alignItems={"center"}
              spacing={0}
              sx={{ width: "100%" }}>
              <hr style={{ borderColor: "#000000", width: "40%" }} />
              <h3 style={{ margin: "10px", textAlign: "center" }}>Tattoo</h3>
              <hr style={{ borderColor: "#000000", width: "40%" }} />
            </Stack>
            <Stack
              direction='row'
              justifyContent={"space-between"}
              alignItems={"center"}
              spacing={2}
              sx={{ width: "100%" }}>
              <FormControl
                fullWidth
                required
                error={Boolean(showErrors && form.placement.length === 0)}>
                <InputLabel id='demo-simple-select-label'>Placement</InputLabel>
                <Select
                  multiple
                  value={form.placement}
                  onChange={(e: SelectChangeEvent<string[]>) => {
                    setForm((p) => {
                      if (Array.isArray(e.target.value)) {
                        p.placement = e.target.value;
                      }
                      return { ...p };
                    });
                  }}
                  MenuProps={{ style: { maxHeight: "300px" } }}
                  labelId='demo-simple-select-label'
                  label='Placement'>
                  <ListSubheader>Head</ListSubheader>
                  <MenuItem value={"Cheek"}>Cheek</MenuItem>
                  <MenuItem value={"Forehead"}>Forehead</MenuItem>
                  <MenuItem value={"Neck"}>Neck</MenuItem>
                  <MenuItem value={"Side of Head"}>Side of Head</MenuItem>
                  <MenuItem value={"Top of Head"}>Top of Head</MenuItem>
                  <ListSubheader>Arm</ListSubheader>
                  <MenuItem value={"Elbow"}>Elbow</MenuItem>
                  <MenuItem value={"Elbow Ditch"}>Elbow Ditch</MenuItem>
                  <MenuItem value={"Forearm"}>Forearm</MenuItem>
                  <MenuItem value={"Hand"}>Hand</MenuItem>
                  <MenuItem value={"Inner Arm"}>Inner Arm</MenuItem>
                  <MenuItem value={"Palm"}>Palm</MenuItem>
                  <MenuItem value={"Shoulder"}>Shoulder</MenuItem>
                  <MenuItem value={"Upper Arm"}>Upper Arm</MenuItem>
                  <MenuItem value={"Wrist"}>Wrist</MenuItem>
                  <ListSubheader>Torso</ListSubheader>
                  <MenuItem value={"Butt"}>Butt</MenuItem>
                  <MenuItem value={"Hip"}>Hip</MenuItem>
                  <MenuItem value={"Shoulder Blade"}>Shoulder Blade</MenuItem>
                  <MenuItem value={"Pectoral"}>Pectoral</MenuItem>
                  <MenuItem value={"Ribs"}>Ribs</MenuItem>
                  <MenuItem value={"Spine"}>Spine</MenuItem>
                  <MenuItem value={"Sternum"}>Sternum</MenuItem>
                  <MenuItem value={"Stomach"}>Stomach</MenuItem>
                  <ListSubheader>Leg</ListSubheader>
                  <MenuItem value={"Ankle"}>Ankle</MenuItem>
                  <MenuItem value={"Calf"}>Calf</MenuItem>
                  <MenuItem value={"Foot"}>Foot</MenuItem>
                  <MenuItem value={"Knee"}>Knee</MenuItem>
                  <MenuItem value={"Knee Ditch"}>Knee Ditch</MenuItem>
                  <MenuItem value={"Shin"}>Shin</MenuItem>
                  <MenuItem value={"Thigh"}>Thigh</MenuItem>
                </Select>
              </FormControl>
            </Stack>
            <Stack
              direction='row'
              justifyContent={"space-between"}
              alignItems={"center"}
              spacing={2}
              sx={{ width: "100%" }}>
              <FormControl fullWidth required error={showErrors && !form.size}>
                <InputLabel id='demo-simple-select-label'>Size</InputLabel>
                <Select
                  value={form.size}
                  onChange={(e) => {
                    setForm((p) => {
                      p.size = e.target.value;
                      return { ...p };
                    });
                  }}
                  labelId='demo-simple-select-label'
                  label='Size'>
                  <MenuItem value={"Small"}>Small (2-4 inches)</MenuItem>
                  <MenuItem value={"Medium"}>Medium (4-6 inches)</MenuItem>
                  <MenuItem value={"Large"}>Large (6+ inches)</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth required error={showErrors && !form.color}>
                <InputLabel id='demo-simple-select-label'>
                  Color Option
                </InputLabel>
                <Select
                  value={form.color}
                  onChange={(e) => {
                    setForm((p) => {
                      p.color = e.target.value;
                      return { ...p };
                    });
                  }}
                  labelId='demo-simple-select-label'
                  label='Color Option'>
                  <MenuItem value={"Full Color"}>Full Color</MenuItem>
                  <MenuItem value={"Black + Grey"}>Black + Grey</MenuItem>
                  <MenuItem value={"Both"}>Both</MenuItem>
                </Select>
              </FormControl>
            </Stack>

            <Stack
              direction='row'
              justifyContent={"space-between"}
              alignItems={"center"}
              spacing={2}
              sx={{ width: "100%" }}>
              {flashId ? (
                <Box sx={{ width: "100%" }}>
                  <TextField
                    disabled
                    multiline
                    fullWidth
                    rows={4}
                    value={form.idea}
                    label='Description of tattoo'
                    variant='outlined'
                  />
                  <FormHelperText sx={{ marginTop: "4px" }}>
                    This booking is for a flash design - description is set
                  </FormHelperText>
                </Box>
              ) : (
                <TextField
                  error={showErrors && !form.idea}
                  required
                  placeholder='Please include as much detail as possible!'
                  value={form.idea}
                  onChange={(e) => {
                    setForm((p) => {
                      p.idea = e.target.value;
                      return { ...p };
                    });
                  }}
                  multiline
                  fullWidth
                  rows={4}
                  label='Description of tattoo'
                  variant='outlined'
                />
              )}
            </Stack>

            {flashId && (
              <Stack
                sx={{
                  width: "100%",
                }}>
                <TextField
                  placeholder='Ask any questions about the design, placement, size, etc.'
                  value={flashQuestions}
                  onChange={(e) => {
                    setFlashQuestions(e.target.value);
                  }}
                  multiline
                  fullWidth
                  rows={4}
                  label='Questions for the artist'
                  variant='outlined'
                  helperText='(Optional) Ask any questions about your flash tattoo'
                />
              </Stack>
            )}

            <Stack
              justifyContent={"center"}
              alignItems={"center"}
              sx={{
                width: "100%",
                border: "1px solid rgba(0, 0, 0, 0.25)",
                padding: "10%",
                borderRadius: "4px",
                position: "relative",
              }}>
              <FormLabel
                sx={{
                  alignSelf: "flex-start",
                  position: "absolute",
                  left: "10px",
                  top: "10px",
                }}
                required>
                What is your budget for this tattoo
              </FormLabel>
              {flashId ? (
                <Box sx={{ marginTop: "20px", textAlign: "center" }}>
                  <h3 style={{ marginBottom: "0px", marginTop: "0px" }}>
                    {flashPrice}
                  </h3>
                  <FormHelperText sx={{ marginTop: "8px" }}>
                    This booking is for a flash design - price is set
                  </FormHelperText>
                </Box>
              ) : (
                <>
                  <Slider
                    getAriaLabel={() => "Minimum distance shift"}
                    value={priceVal}
                    step={50}
                    min={200}
                    max={1200}
                    onChange={(event, newValue, activeThumb) =>
                      handleBudgetChange(newValue, activeThumb)
                    }
                    valueLabelDisplay='auto'
                    valueLabelFormat={(value) => "$" + value}
                    disableSwap
                    sx={{ marginTop: "20px" }}
                  />
                  <h3 style={{ marginBottom: "0px" }}>
                    ${priceVal[0]} - ${priceVal[1]}
                  </h3>
                </>
              )}
            </Stack>
            <Stack
              direction='row'
              justifyContent={"flex-start"}
              alignItems={"center"}
              spacing={2}
              sx={{ width: "100%" }}>
              <label style={{ width: "100%" }} htmlFor='contained-button-file'>
                <input
                  style={{ display: "none" }}
                  accept='image/*'
                  id='contained-button-file'
                  multiple
                  type='file'
                  onChange={(e) => handleFileInput(e, false)}
                />
                <Button
                  variant='contained'
                  fullWidth
                  sx={{ height: "70px", width: "100%" }}
                  component='span'>
                  Upload Reference Images
                </Button>
              </label>
            </Stack>
            <Stack
              direction='row'
              justifyContent={"space-around"}
              alignItems={"space-around"}
              spacing={2}
              sx={
                filesToUp.length === 0
                  ? {
                      width: "100%",
                      minHeight: "100px",
                      border: "2px dashed #000000",
                      flexWrap: "wrap",
                      padding: "5%",
                    }
                  : filesToUp.length >= minFiles
                    ? {
                        width: "100%",
                        minHeight: "100px",
                        flexWrap: "wrap",
                        padding: "5%",
                        border: "2px dashed #5bb450",
                      }
                    : {
                        width: "100%",
                        minHeight: "100px",
                        flexWrap: "wrap",
                        padding: "5%",
                        border: "2px dashed #d32f2f",
                      }
              }>
              {filesToUp && filesToUp.length > 0 ? (
                <>
                  {filesToUp.length < minFiles && (
                    <h2
                      style={{
                        textAlign: "center",
                        fontWeight: "bold",
                        width: "100%",
                        color: "#d32f2f",
                      }}>
                      Please upload {minFiles - filesToUp.length} more image
                      {minFiles - filesToUp.length === 1 ? "" : "s"}
                    </h2>
                  )}
                  {filesToUp.map((obj, i) => {
                    return (
                      <Box
                        key={`img-ref-container-${obj.url}`}
                        className={classes.imageContainer}>
                        {!obj.isFlash && (
                          <IconButton
                            onClick={() => {
                              setFilesToUp((p) => {
                                p.splice(i, 1);
                                return [...p];
                              });
                            }}
                            sx={{
                              position: "absolute",
                              right: "-20px",
                              top: "-20px",
                              zIndex: 10,
                            }}>
                            <div
                              style={{
                                backgroundColor: "#d32f2f",
                                width: "30px",
                                height: "30px",
                                borderRadius: "50%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}>
                              <CloseRoundedIcon
                                sx={{ color: "#ffffff", padding: "0px" }}
                              />
                            </div>
                          </IconButton>
                        )}
                        <Image
                          alt={`ref-img-${obj.url}`}
                          src={obj.url}
                          width={obj.w / 2}
                          height={obj.h / 2}
                          className={classes.image}
                        />
                      </Box>
                    );
                  })}
                </>
              ) : (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <p style={{ textAlign: "center", fontWeight: "500" }}>
                    Please upload {minFiles} or more reference images
                  </p>
                </div>
              )}
            </Stack>
            {showErrors && refErrorMsg && filesToUp.length < minFiles ? (
              <FormHelperText style={{ textAlign: "left" }} error>
                {refErrorMsg}
              </FormHelperText>
            ) : null}
            <Stack
              direction='row'
              justifyContent={"center"}
              alignItems={"center"}
              spacing={0}
              sx={{ width: "100%" }}>
              <hr style={{ borderColor: "#000000", width: "40%" }} />
              <h3 style={{ margin: "10px", textAlign: "center" }}>
                Scheduling
              </h3>
              <hr style={{ borderColor: "#000000", width: "40%" }} />
            </Stack>
            <Stack
              direction='row'
              justifyContent={"space-between"}
              alignItems={"center"}
              spacing={2}
              sx={{ width: "100%" }}>
              <TextField
                error={showErrors && !form.preferredDates}
                required
                placeholder='Please include at least two dates you would prefer to get this tattoo!'
                value={form.preferredDates}
                onChange={(e) => {
                  console.log(e.target.value);
                  setForm((p) => {
                    const updated = update(p, {
                      preferredDates: { $set: e.target.value },
                    });
                    console.log(updated);
                    return updated;
                  });
                }}
                multiline
                fullWidth
                rows={4}
                label='Preferred Dates'
                variant='outlined'
              />
            </Stack>
            <Stack
              direction='row'
              justifyContent={"flex-start"}
              alignItems={"center"}
              spacing={2}
              sx={{ width: "100%" }}>
              <FormControl
                sx={{ m: 3 }}
                component='fieldset'
                variant='standard'>
                <FormLabel
                  required
                  error={showErrors && form.preferredDay.length === 0}>
                  What day(s) of the week work best for you?
                </FormLabel>
                <FormGroup>
                  {artist?.workingDays?.map((obj: Day, i: number) => {
                    if (obj?.opening) {
                      return (
                        <FormControlLabel
                          key={i}
                          control={
                            <Checkbox
                              checked={form.preferredDay.includes(i)}
                              value={form.preferredDay.includes(i)}
                              onChange={() => {
                                handlePreferredDay(i);
                              }}
                              name={obj.day}
                            />
                          }
                          label={obj.day}
                        />
                      );
                    }
                  })}
                </FormGroup>
                <FormHelperText
                  error={showErrors && form.preferredDay.length === 0}>
                  Select one or more
                </FormHelperText>
              </FormControl>
            </Stack>
            <Button
              disabled={
                flashUnavailable ||
                filesToUp.length < minFiles ||
                !form.firstName ||
                !form.lastName ||
                !form.email ||
                form.email !== emailConfirm ||
                !form.phone ||
                !form.color ||
                !form.size ||
                !form.idea ||
                form.placement.length === 0 ||
                form.preferredDay.length === 0
              }
              onClick={() => {
                setLoading(true);
                submitForm();
              }}
              variant='contained'
              sx={{ height: "100px" }}
              fullWidth>
              Submit Request
            </Button>
            <Stack
              direction={"column"}
              justifyContent={"center"}
              alignItems={"center"}>
              <p style={{ margin: "8px 0" }}>Powered by</p>
              <Image
                src='/static/images/inkme-logo.png'
                alt='artist logo'
                width='1000'
                height='1000'
                style={{
                  width: "auto",
                  height: "28px",
                  backgroundColor: "white",
                  marginBottom: "12px",
                }}
              />
            </Stack>
          </Stack>
        </Container>
      </Stack>
    );
  } else {
    return (
      <Stack
        direction='column'
        justifyContent={"center"}
        alignItems={"center"}
        sx={{
          width: "100%",
          height: "100dvh",
          backgroundImage: "url(./form-bg.jpeg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}>
        <h2
          style={{
            textAlign: "center",
            color: "white",
          }}>
          Your request has been submitted!
        </h2>
      </Stack>
    );
  }
}
