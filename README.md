# patient_management_system

- **[BE] Feature Added:** Create and fetch patient records
- **Details:**
  - Created `patients` module directory containing controllers, services, and DTOs
  - Patient Controller handles incoming requests on the `/patients` route, managing the Patient entity
  - Implemented Patient Service with methods:
    - `create` — Adds a new patient to the temporary patients array
    - `fetchAll` — Retrieves all patients
  - Added `CreatePatientDto` for input validation
- **[BE] Feature Added:** Prisma DB integration
- **Details:**
  - setup prisma data source and defined Patient model in schema.prisma file
  - configured DATABASE_URL in the .env file to point to the postgres db server
  - created configModule to load the database url for use in the prisma datasource cpnfig
  - created PrismaService that instantiate Prisma client and manages database connection
  - Implemented Patient services to perform database operations on the Patient model using PrismaSrvice
