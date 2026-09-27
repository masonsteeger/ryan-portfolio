## Context

The application currently supports custom tattoo bookings through a form with freeform fields. Flash designs are a limited catalog of pre-designed tattoo options that should have simplified, locked booking experiences. This requires extending the existing form infrastructure to support constraints (locked fields, protected reference images) without breaking the custom booking flow.

The public form endpoint already supports fetching flash designs via the `type: "flash"` parameter, but there's no UI page to browse or interact with them.

## Goals / Non-Goals

**Goals:**
- Create a Flash page (`/flash`) that displays available flash designs with pricing
- Pre-populate booking form with flash design as primary reference image
- Lock description and budget fields during flash booking
- Protect the flash reference image from removal while allowing supplementary images
- Integrate seamlessly with existing booking form component

**Non-Goals:**
- Flash management/admin panel (e.g., uploading new flash designs)
- Flash analytics or reporting
- Multiple flash design selection in one booking
- Modifying core form component behavior for non-flash bookings

## Decisions

**1. Flash Data Fetching**
- Fetch flash designs at page load time using the public form endpoint with `{ type: "flash", username: process.env.NEXT_PUBLIC_ARTIST_USERNAME }`
- Response includes: `id`, `price`, `src` for each design
- Rationale: Leverages existing endpoint; no new backend required. Endpoint is already public and performance-tested.
- Alternative considered: Creating a dedicated `/api/flash` endpoint (would require backend changes and versioning)

**2. Form Integration Strategy**
- Create a `FlashContext` to track flash state (selected flash ID, price, original image URL)
- Pass flash context through to the booking form component
- Rationale: Keeps flash state separate from general form state; allows form to remain reusable for custom bookings
- Alternative considered: Store flash state in form reducer (would tightly couple custom + flash logic)

**3. Locked Fields Implementation**
- Use conditional rendering and disabled form inputs when flash context is active
- Store locked values (description: "Set flash piece: $XXX.XX", budget: price) in component state
- Prevent form submission if locked fields are modified through any means
- Rationale: Simple, explicit approach; clear visual feedback to user. No changes to form validation schema.
- Alternative considered: Form-level constraints schema (more flexible but adds complexity)

**4. Reference Image Protection**
- Mark the flash image reference with a metadata flag (`isFlashOriginal: true`)
- Disable remove button for images marked with this flag
- On form submission, ensure flash image remains in the submission payload
- Rationale: Minimal changes to reference image component; image protection is explicit and testable
- Alternative considered: Array-level immutability (harder to debug; more prone to bugs)

**5. Navigation Flow**
- From Flash page, clicking a design navigates to `/form?flash=<flash-id>&referenceUrl=<src>&price=<price>`
- Form component reads query parameters and initializes flash context
- Rationale: Stateless; easy to bookmark/share; aligns with existing query-param patterns in the app
- Alternative considered: Using hash/state (less debuggable; harder to share links)

## Risks / Trade-offs

**[Risk] Form field locking could be confusing if users interact with disabled inputs**
- Mitigation: Add clear explanatory text ("This booking is for a flash design - some details are set")

**[Risk] Query parameter coupling - if parameters are modified in URL bar, flash context may become inconsistent**
- Mitigation: Validate that query params match selected flash design; show warning if mismatch detected

**[Risk] Flash image removal attempt - users might still try to remove the flash image**
- Mitigation: Disable remove button entirely for flash original image; optionally add tooltip explaining why

**[Risk] Performance - fetching flash designs on every page load could add latency**
- Mitigation: Endpoint is public and lightweight; consider adding browser caching headers if latency becomes an issue

**[Trade-off] Hard-coded description format "Set flash piece: $XXX.XX"**
- Rationale: Keeps designs consistent and professional; reduces user confusion. Could be made configurable later if needed.

## Open Questions

- Should the Flash page show flash designs in a grid or list layout? (Design decision deferred to UI/specs)
- Should the flash price be editable by the user before booking? (Current proposal: no, locked)
- Should we support flash quantity/scaling options? (Current proposal: out of scope)
