import React from "react";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import { Box } from "@mui/material";

interface LockedFieldProps {
  label: string;
  value: string | number;
  helperText?: string;
}

export default function LockedField({
  label,
  value,
  helperText,
}: LockedFieldProps) {
  return (
    <Box sx={{ width: "100%" }}>
      <TextField
        label={label}
        value={value}
        fullWidth
        disabled
        slotProps={{
          input: {
            readOnly: true,
          },
        }}
      />
      {helperText && (
        <FormHelperText sx={{ marginTop: "4px" }}>
          {helperText}
        </FormHelperText>
      )}
    </Box>
  );
}
