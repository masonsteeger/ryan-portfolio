## ADDED Requirements

### Requirement: Display Flash Designs Catalog
The system SHALL fetch and display a catalog of available flash designs on the Flash page at `/flash`. The catalog SHALL fetch designs from the public form endpoint using the parameters `{ type: "flash", username: process.env.NEXT_PUBLIC_ARTIST_USERNAME }`.

#### Scenario: Load flash page with designs
- **WHEN** user navigates to `/flash`
- **THEN** system fetches flash designs from the public form endpoint
- **AND** displays a grid/list of available designs showing image, price, and ID

#### Scenario: Handle empty flash catalog
- **WHEN** user navigates to `/flash` and no designs are available
- **THEN** system displays a message indicating no flash designs are currently available

#### Scenario: Handle fetch error
- **WHEN** user navigates to `/flash` and the endpoint returns an error
- **THEN** system displays an error message and provides an option to retry

### Requirement: Flash Design Selection
When a user clicks on a flash design in the catalog, the system SHALL navigate to the booking form with the flash design pre-populated in the form state.

#### Scenario: Click flash design to book
- **WHEN** user clicks on a flash design in the catalog
- **THEN** system navigates to `/form` with query parameters: `flash=<id>`, `referenceUrl=<src>`, `price=<price>`

#### Scenario: Pre-populate form with flash design
- **WHEN** user arrives at the form page with flash query parameters
- **THEN** system initializes the flash context with the provided design ID, image URL, and price
- **AND** adds the flash design image as the primary reference image in the form

### Requirement: Flash Design Image Display
The system SHALL display flash design preview images with clear pricing information.

#### Scenario: Display flash design with price
- **WHEN** flash catalog is loaded
- **THEN** each design SHALL display its preview image and price in the format `$XXX.XX`

#### Scenario: Display alternative text for images
- **WHEN** flash design is displayed
- **THEN** the image SHALL have appropriate alt text describing the flash design
