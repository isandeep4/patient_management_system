# patient_management_system

**Installation and Setup**:

- Please make sure that you have Node.js installed otherwise, install it from here https://nodejs.org/
- Clone the Repo to your local machine
- Navigate to the apps/frontend folder to run the front-end app
- Run npm install/ yarn install to install all dependencies listed in package.json file
- Create a .env.local file in the app/frontend folder and add this variable NEXT_PUBLIC_API_BASE_URL=http://eb-rds-nest-backend-server-env.eba-ku7j8aa9.us-east-1.elasticbeanstalk.com
- Run "npm run dev" to start the Next.js development
- This will launch the app in development mode at http://localhost:3000, where you should see the login screen.
- Click the sign-up button to create a new user. Remember the email ID and password for logging in.
- You will be navigated to the dashboard page after successful login/signup.

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
- **[BE] Feature Added:** Implemented JWT based authentication and authorization
- **Details:**
  - implemented users service to store and read users from prisma db
  - Developed an Auth service with a signin method that uses jwt and a secret key to issue bearer tokena after authenticating users
  - Applied global AuthGuard on protected routes that validate JWT tokens extracted from subsequent request headers.
  - declared public (unauthenticated) routes using a custom decorator with SetMetadata and checked via Reflector
  - Assigned Admin and User roles the route handlers to access specific resources using @Roles() decorator
  - Developed Roles guard to compare current user roles to the actual roles required by the current route handler
- **[FE] Feature Added:** Implemented signup and login page
- **Details:**:
  - Developed signup and login page with form validation
  - Integrated backend API on submit form to create user or verifying user credentials
  - saved JWT token in an HTTP-only cookie upon successful login
  - Automatically sent this cookie with subsequent requests to autheticate user resources
- **[FE] Feature Added:** Implemented user dashboard page
- **Details:**:

  - Authenticated User and admin lands on the dashboard page
  - Authenticated Admin can add, edit, delete, and view patients on this dashboard page
  - Used tailwind css to desing the login, signup, dashboard page and profile page giving a nice user experience
  - Allow access to edit, delete, and add action based on roles

- **[BE] Feature Added:** Docker and AWS deployment
- **Details:**:
  Docker Integration:
  - Set up a Dockerfile to build and push the backend container image (isandeep4/patient-service-nest-prisma).
  - Included steps to install dependencies and run Prisma migrations during build.
    Elastic Beanstalk Deployment:
    - Added Dockerrun.aws.json to deploy the Docker image to AWS Elastic Beanstalk.
    - Created an Elastic Beanstalk environment to run the Docker container.
    - Configured required environment variables:
      DATABASE_URL (RDS PostgreSQL endpoint)
      PORT (set to 8080)
      Authentication Update:
    - Switched JWT token storage from HttpOnly cookies to localStorage for frontend integration.
      Frontend Integration:
    - connected the Elastic Beanstalk API endpoint with the frontend application.
