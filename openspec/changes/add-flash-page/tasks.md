## 1. Setup and Architecture

- [ ] 1.1 Create types for flash designs (FlashDesign interface with id, price, src properties)
- [ ] 1.2 Create types for flash context (FlashContext interface)
- [ ] 1.3 Create Flash page route at `/flash`
- [ ] 1.4 Create FlashContext provider/hook for passing flash state through form
- [ ] 1.5 Verify NEXT_PUBLIC_ARTIST_USERNAME environment variable is accessible

## 2. Flash Page Implementation

- [ ] 2.1 Create Flash page component at `pages/flash.tsx` (or appropriate app directory location)
- [ ] 2.2 Implement flash design fetching from public form endpoint using `{ type: "flash", username }`
- [ ] 2.3 Create FlashDesignCard component to display individual flash designs with image and price
- [ ] 2.4 Implement flash design grid/list layout on the Flash page
- [ ] 2.5 Create FlashDetailsModal component to display design details (image URL, description, price, booking CTA)
- [ ] 2.6 Add click handler to FlashDesignCard to open the modal with selected design
- [ ] 2.7 Implement modal booking button to navigate to `/booking` with flash context
- [ ] 2.8 Ensure image URL (src) is preferred over base64 when displaying designs
- [ ] 2.9 Implement loading state for flash design fetching
- [ ] 2.10 Implement error state and retry functionality for failed fetches
- [ ] 2.11 Implement empty state message when no flash designs are available
- [ ] 2.12 Add proper alt text to flash design images

## 3. Form Integration and Flash Context

- [ ] 3.1 Create FlashContext and useFlash hook for managing flash booking state
- [ ] 3.2 Wrap form component with FlashContextProvider
- [ ] 3.3 Implement query parameter parsing on form page to initialize flash context (flash, referenceUrl, price)
- [ ] 3.4 Add flash design image URL as primary reference image when flash context is present
- [ ] 3.5 Mark flash reference image with protection metadata to prevent removal

## 4. Locked Fields Implementation

- [ ] 4.1 Create LockedField component wrapper for form inputs that need to be disabled during flash booking
- [ ] 4.1 Update description field to be locked/disabled when flash context is active
- [ ] 4.2 Set description field value to flash description + price format when flash context is active
- [ ] 4.3 Add optional questions field that appears only during flash bookings
- [ ] 4.4 Append user questions to idea field with "=== User Questions ===" separator
- [ ] 4.5 Update budget field to use LockedField when flash context is active
- [ ] 4.6 Set budget field value to flash price when flash context is active
- [ ] 4.7 Ensure locked fields are submitted with correct values regardless of user interaction
- [ ] 4.8 Add visual indicator (styling/text) explaining why description field is locked during flash booking

## 5. Reference Image Protection

- [ ] 5.1 Modify reference image list component to accept a protection flag for specific images
- [ ] 5.2 Implement disable logic for remove button on protected reference images
- [ ] 5.3 Add tooltip/help text explaining why flash reference image cannot be removed
- [ ] 5.4 Update form validation to ensure protected reference images are present on submission
- [ ] 5.5 Ensure supplementary reference images added during flash booking have working remove buttons

## 6. Form Submission and Data Flow

- [ ] 6.1 Update form submission to include flash context data (flash design ID) when present
- [ ] 6.2 Test that locked field values are correctly submitted (description, budget, flash ID)
- [ ] 6.3 Verify flash reference image is included in form submission
- [ ] 6.4 Ensure custom bookings (non-flash) have no locked fields and behave as before

## 7. Testing and Validation

- [ ] 7.1 Test flash page loads and displays designs correctly
- [ ] 7.2 Test clicking flash design card opens the modal with correct details
- [ ] 7.3 Test modal displays image, description (if available), and price correctly
- [ ] 7.4 Test modal cancel button closes the modal without navigation
- [ ] 7.5 Test modal booking button navigates to booking page with correct flash context
- [ ] 7.6 Test form initializes with flash context and locked fields when booking from modal
- [ ] 7.7 Test description field contains flash description + price format
- [ ] 7.8 Test questions field appears only when booking flash pieces
- [ ] 7.9 Test user questions are appended to description field with "=== User Questions ===" separator
- [ ] 7.10 Test questions field updates are reflected in the description field in real-time
- [ ] 7.11 Test budget field is locked to flash price
- [ ] 7.12 Test users cannot edit locked fields (description, budget)
- [ ] 7.13 Test flash reference image cannot be removed
- [ ] 7.14 Test supplementary reference images can be added and removed
- [ ] 7.15 Test form submission includes all flash data with questions appended to description
- [ ] 7.16 Test custom booking flow works without flash context (all fields editable)
- [ ] 7.17 Test error handling for failed flash design fetch
- [ ] 7.18 Test empty state when no flash designs available
