# Booking Form Error Handling Guide

## Backend Response Format

Update your Lambda handler to return consistent error responses (not wrapped in `body`):

### For Validation Errors (email, etc)

```javascript
if (!validateEmailFormat(event.form.email)) {
  return {
    statusCode: 400,
    error: "Invalid email",
    message: "Please provide a valid email address. Example: name@domain.com",
    customerId: null,
  };
}

const isValidDomain = await validateEmailDomain(event.form.email);
if (!isValidDomain) {
  return {
    statusCode: 400,
    error: "Unreachable email",
    message: "The email domain is not reachable. Please double-check the email address.",
    customerId: null,
  };
}
```

### For Flash Errors

```javascript
if (error) {
  return {
    statusCode: 400,
    error: "Flash design unavailable",
    message: "The selected flash design is no longer available. Please choose another design.",
    customerId: null,
  };
}
```

### For Processing Errors

```javascript
if (error) {
  return {
    statusCode: 500,
    error: "Image processing failed",
    message: "Failed to process the selected flash design. Please try again.",
    customerId: null,
  };
}
```

### For Email Delivery (Non-blocking)

```javascript
if (emailError) {
  return {
    statusCode: 502,
    error: "Email delivery failed",
    message: "Your booking was created but we couldn't send the confirmation email. Please verify your email address is correct.",
    customerId: customerId,
  };
}
```

### Success Response

```javascript
return {
  customerId: customerId,
  statusCode: 200,
  statusText: "Form Submitted",
};
```

## Frontend Handling

The BookingForm component now:

1. **Tracks field-specific errors** with `fieldErrors` state
2. **Displays server errors** in a modal that preserves form state
3. **Maps backend errors to form fields** for inline error messages
4. **Clears field errors** when user starts correcting input
5. **Handles partial success** (e.g., booking created but email failed)

### Error Types Handled

| Backend Error | Frontend Behavior |
|---|---|
| Invalid email | Shows inline error on email field |
| Unreachable email | Shows inline error on email field |
| Flash design unavailable | Shows modal, clears flash selection |
| Image processing failed | Shows modal, form stays open |
| Email delivery failed | Shows success page with warning |
| Booking cleanup failed | Shows success page with warning |
| Network error | Shows modal with retry option |

### User Flow

1. User fills form and submits
2. If validation error occurs, form stays open with field-level errors
3. User can see exactly which field needs fixing and why
4. User corrects the field and submits again
5. Form state is preserved throughout the process
6. On success, form shows completion page

## Reserve Endpoint

The flash reserve endpoint is called from FlashPage when a user selects a flash design to book. It reserves the flash for 15 minutes.

### Reserve Request
```javascript
{
  type: "reserve",
  flash_id: "${artistId}/flashbook/${flashId}"
}
```

### Reserve Success Response
```javascript
{
  statusCode: 200,
  body: JSON.stringify({
    success: "Flash design reserved",
    message: "The selected flash design has been reserved for 15 minutes, please complete the form in the allotted time.",
  }),
}
```

### Reserve Failure Response
```javascript
{
  statusCode: 500,
  body: JSON.stringify({
    error: "Flash design unavailable",
    message: "The selected flash design has been reserved for form submission, please select another design.",
  }),
}
```

### Backend Issues to Fix
1. Don't `throw new Error()` - just return the response
2. Consider returning different field names for success vs error (e.g., `success: true` instead of `error: "Flash design reserved"`)
3. Use appropriate HTTP status codes (409 for conflict, 500 for server error, 200 for success)

## Testing Error Scenarios

Test these cases to verify error handling:

```bash
# Test invalid email
email: "notanemail"

# Test unreachable domain
email: "test@invalid-domain-12345.com"

# Test flash unavailable (manually set reservation timestamp to future date on S3)
# Test image processing (upload large file)
# Test network error (disconnect during submission)
# Test flash reserve failure (try booking same flash twice rapidly)
```
