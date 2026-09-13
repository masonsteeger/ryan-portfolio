## Why

Offering flash designs is a key revenue opportunity in the tattoo booking flow. Users need a dedicated page to browse available flash pieces, select one, and proceed to book it with pre-filled, locked form values. This streamlines the flash booking experience and reduces friction compared to freeform custom designs.

## What Changes

- Add a new Flash page that fetches and displays available flash designs from the public form endpoint
- Create a dedicated UI for browsing flash pieces with price and preview images
- Integrate flash booking with the existing form by pre-populating reference images, description, and budget fields
- Lock specific form fields (description and budget) to prevent user modification when booking flash
- Allow users to add supplementary reference images while protecting the primary flash image from removal

## Capabilities

### New Capabilities
- `flash-page`: Display a catalog of available flash designs with pricing and preview images
- `flash-booking-form`: Specialized booking form state for flash pieces with locked fields (description, budget) and protected primary reference image

### Modified Capabilities
- `booking-form`: Extend existing booking form to support pre-populated locked fields and reference image protection based on flash booking context

## Impact

- New page route: `/flash`
- Modified pages: Booking form component to support locked fields and flash-specific behavior
- Modified endpoint usage: Utilize existing public form endpoint with `{ type: "flash", username }` parameter
- UI components: New Flash grid/list display component, form field locking mechanism
- Environment variables: Utilize existing `NEXT_PUBLIC_ARTIST_USERNAME`
