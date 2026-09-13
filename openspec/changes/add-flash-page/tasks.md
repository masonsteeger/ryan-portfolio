## 1. Setup and Architecture

- [x] 1.1 Create types for flash designs (FlashDesign interface with id, price, src properties)
- [x] 1.2 Create types for flash context (FlashContext interface)
- [x] 1.3 Create Flash page route at `/flash`
- [x] 1.4 Create FlashContext provider/hook for passing flash state through form
- [x] 1.5 Verify NEXT_PUBLIC_ARTIST_USERNAME environment variable is accessible

## 2. Flash Page Implementation

- [x] 2.1 Create Flash page component at `pages/flash.tsx` (or appropriate app directory location)
- [x] 2.2 Implement flash design fetching from public form endpoint using `{ type: "flash", username }`
- [x] 2.3 Create FlashDesignCard component to display individual flash designs with image and price
- [x] 2.4 Implement flash design grid/list layout on the Flash page
- [x] 2.5 Add click handler to navigate to `/form` with flash query parameters (flash, referenceUrl, price)
- [x] 2.6 Implement loading state for flash design fetching
- [x] 2.7 Implement error state and retry functionality for failed fetches
- [x] 2.8 Implement empty state message when no flash designs are available
- [x] 2.9 Add proper alt text to flash design images

## 3. Form Integration and Flash Context

- [x] 3.1 Create FlashContext and useFlash hook for managing flash booking state
- [x] 3.2 Wrap form component with FlashContextProvider
- [x] 3.3 Implement query parameter parsing on form page to initialize flash context (flash, referenceUrl, price)
- [x] 3.4 Add flash design image as primary reference image when flash context is present
- [x] 3.5 Mark flash reference image with protection metadata to prevent removal

## 4. Locked Fields Implementation

- [x] 4.1 Create LockedField component wrapper for form inputs that need to be disabled during flash booking
- [x] 4.2 Update description field to use LockedField when flash context is active
- [x] 4.2 Set description field value to "Set flash piece: $XXX.XX" format with flash price
- [x] 4.3 Update budget field to use LockedField when flash context is active
- [x] 4.4 Set budget field value to flash price when flash context is active
- [x] 4.5 Ensure locked fields are submitted with correct values regardless of user interaction
- [x] 4.6 Add visual indicator (styling/text) explaining why fields are locked during flash booking

## 5. Reference Image Protection

- [x] 5.1 Modify reference image list component to accept a protection flag for specific images
- [x] 5.2 Implement disable logic for remove button on protected reference images
- [x] 5.3 Add tooltip/help text explaining why flash reference image cannot be removed
- [x] 5.4 Update form validation to ensure protected reference images are present on submission
- [x] 5.5 Ensure supplementary reference images added during flash booking have working remove buttons

## 6. Form Submission and Data Flow

- [x] 6.1 Update form submission to include flash context data (flash design ID) when present
- [x] 6.2 Test that locked field values are correctly submitted (description, budget, flash ID)
- [x] 6.3 Verify flash reference image is included in form submission
- [x] 6.4 Ensure custom bookings (non-flash) have no locked fields and behave as before

## 7. Testing and Validation

- [x] 7.1 Test flash page loads and displays designs correctly
- [x] 7.2 Test clicking flash design navigates to form with correct query parameters
- [x] 7.3 Test form initializes with flash context and locked fields when query parameters are present
- [x] 7.4 Test description field contains "Set flash piece: $XXX.XX" format
- [x] 7.5 Test budget field is locked to flash price
- [x] 7.6 Test users cannot edit locked fields (description, budget)
- [x] 7.7 Test flash reference image cannot be removed
- [x] 7.8 Test supplementary reference images can be added and removed
- [x] 7.9 Test form submission includes all required flash data
- [x] 7.10 Test custom booking flow works without flash context (all fields editable)
- [x] 7.11 Test error handling for failed flash design fetch
- [x] 7.12 Test empty state when no flash designs available
