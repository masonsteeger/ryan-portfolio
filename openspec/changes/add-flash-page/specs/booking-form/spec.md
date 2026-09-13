## MODIFIED Requirements

### Requirement: Form Field Locking Support
The booking form SHALL support field locking based on booking context, allowing specific fields to be disabled and protected from user modification. This is a new requirement added to support flash booking workflows.

#### Scenario: Form initializes with locked fields for flash booking
- **WHEN** the form component receives flash context via query parameters
- **THEN** the system SHALL identify which fields should be locked (description, budget)
- **AND** locked fields SHALL render as disabled/read-only to the user

#### Scenario: Locked fields maintain their values
- **WHEN** a form field is locked and the user interacts with other form elements
- **THEN** the locked field's value SHALL not change
- **AND** the form validation SHALL not allow this field to be modified

#### Scenario: Custom bookings have no locked fields
- **WHEN** the form is used for custom tattoo bookings (without flash context)
- **THEN** all fields SHALL remain fully editable
- **AND** no locking behavior SHALL be applied

### Requirement: Reference Image Protection
The form's reference image section SHALL support marking specific images as non-removable while allowing other images to be added and removed. This enables protecting the primary flash design image while allowing supplementary reference images.

#### Scenario: Reference images can be marked as protected
- **WHEN** an image is added as the primary flash design reference
- **THEN** the system SHALL mark this image with a protection flag
- **AND** the remove button for this image SHALL be disabled

#### Scenario: Non-protected reference images are removable
- **WHEN** supplementary reference images are added to the form
- **THEN** these images SHALL NOT have protection flags
- **AND** users SHALL be able to remove them normally

#### Scenario: Form validation ensures protected image presence
- **WHEN** user attempts to submit the form
- **THEN** the system SHALL validate that any protected reference images are still present
- **AND** form submission SHALL fail if protected images are missing

### Requirement: Form Context Awareness
The form component SHALL be aware of flash booking context and adapt its behavior accordingly without requiring changes to core validation or submission logic.

#### Scenario: Form accepts flash context parameter
- **WHEN** the form component mounts and receives flash query parameters
- **THEN** the system SHALL initialize the flash context
- **AND** apply flash-specific field constraints and protections

#### Scenario: Form submission includes flash context data
- **WHEN** user submits the form during flash booking
- **THEN** the form submission SHALL include the flash design ID
- **AND** locked field values SHALL be included in the submission as provided
