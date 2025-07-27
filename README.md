# patient_management_system
- **[BE] Feature Added:** Create and fetch patient records
- **Details:**
  - Created `patients` module directory containing controllers, services, and DTOs
  - Patient Controller handles incoming requests on the `/patients` route, managing the Patient entity
  - Implemented Patient Service with methods:
    - `create` — Adds a new patient to the temporary patients array
    - `fetchAll` — Retrieves all patients
  - Added `CreatePatientDto` for input validation
