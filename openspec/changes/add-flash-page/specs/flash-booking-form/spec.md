## ADDED Requirements

### Requirement: Locked Description Field for Flash
When booking a flash design, the description field SHALL be pre-populated with "Set flash piece: $XXX.XX" where XXX.XX is the flash price, and this field SHALL NOT be editable by the user.

#### Scenario: Display locked description for flash booking
- **WHEN** user arrives at the form with flash query parameters
- **THEN** the description field SHALL be populated with "Set flash piece: $XXX.XX"
- **AND** the field SHALL appear as disabled/read-only to the user

#### Scenario: User cannot modify flash description
- **WHEN** user attempts to edit the description field during flash booking
- **THEN** the system SHALL prevent any modifications
- **AND** the field SHALL retain its locked value

#### Scenario: Description field is editable for non-flash bookings
- **WHEN** user accesses the form without flash parameters
- **THEN** the description field SHALL be fully editable

### Requirement: Locked Budget Field for Flash
When booking a flash design, the budget field SHALL be pre-populated with the flash price and SHALL NOT be editable by the user.

#### Scenario: Display locked budget for flash booking
- **WHEN** user arrives at the form with flash query parameters
- **THEN** the budget field SHALL be populated with the flash price (format: $XXX.XX)
- **AND** the field SHALL appear as disabled/read-only to the user

#### Scenario: User cannot modify flash budget
- **WHEN** user attempts to edit the budget field during flash booking
- **THEN** the system SHALL prevent any modifications
- **AND** the field SHALL retain the locked price value

#### Scenario: Budget field is editable for non-flash bookings
- **WHEN** user accesses the form without flash parameters
- **THEN** the budget field SHALL be fully editable

### Requirement: Protected Flash Reference Image
The flash design image added as a reference SHALL NOT be removable by the user, but additional reference images MAY be added and removed.

#### Scenario: User cannot remove flash reference image
- **WHEN** user views the reference images section during flash booking
- **THEN** the remove button for the flash design image SHALL be disabled/hidden
- **AND** the system SHALL display a visual indicator explaining why this image cannot be removed

#### Scenario: User can add supplementary reference images
- **WHEN** user clicks "Add Reference Image" during flash booking
- **THEN** the system SHALL allow uploading or selecting additional images
- **AND** these supplementary images SHALL have fully functional remove buttons

#### Scenario: User can remove supplementary reference images
- **WHEN** user clicks the remove button on a supplementary reference image
- **THEN** the system SHALL remove that image from the reference images list
- **AND** the flash design image SHALL remain protected

#### Scenario: Flash image remains in submission
- **WHEN** user submits the form during flash booking
- **THEN** the flash design image SHALL be included in the form submission
- **AND** the system SHALL validate that the flash image is present

### Requirement: Flash Context Persistence
The system SHALL maintain flash booking context throughout the form interaction, preventing accidental loss of flash parameters.

#### Scenario: Flash context survives form interactions
- **WHEN** user interacts with form fields during flash booking
- **THEN** the flash context (design ID, image URL, price) SHALL remain intact
- **AND** locked fields SHALL maintain their preset values

#### Scenario: Flash context is cleared when returning to custom booking
- **WHEN** user navigates away from flash booking to a custom booking flow
- **THEN** the flash context SHALL be cleared
- **AND** all fields SHALL return to their editable state
