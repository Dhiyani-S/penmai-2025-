# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.
FD Calculator Project Description
This project outlines the development of a Fixed Deposit (FD) calculator, designed to help users estimate the maturity value of their investments. The application will be built as a Single Page Application (SPA) using a modern web development stack, following the design principles evident in the provided screenshot.
Technology Stack
 * Frontend:
   * React: The core library for building the user interface. Its component-based architecture will be used to create a modular and reusable UI.
   * TypeScript: To ensure code quality and maintainability by adding static typing to the JavaScript codebase.
   * Vite: A fast and modern build tool that will be used for setting up the development environment and bundling the application for production.
   * CSS-in-JS (e.g., Styled Components or Emotion): For styling components in a modular and encapsulated manner, preventing style conflicts and improving maintainability.
   * Chart.js or Recharts: A charting library to visualize the investment breakdown (principal vs. interest) using a doughnut chart, similar to the one in the reference image.
   * React Hook Form: For handling form state, validation, and submission efficiently.
 * Backend:
   * Node.js with Express: A simple backend will be created to handle API requests for a more robust application, although the calculator logic can be fully implemented on the frontend for this specific project.
   * MongoDB: A NoSQL database can be used to store user data (if user accounts are implemented in a future iteration).
Key Features
 * Input Form:
   * A clean and intuitive form for users to input the following details:
     * Principal Amount: The initial investment amount.
     * Interest Rate: The annual interest rate of the FD.
     * Tenure: The duration of the FD (e.g., in years and/or months).
     * Compounding Frequency: (e.g., annually, semi-annually, quarterly, monthly).
 * Real-Time Calculation:
   * The application will calculate the estimated return and total maturity value as the user inputs the details. The calculation will follow the standard compound interest formula:
     * A = P(1 + r/n)^{nt}
     * Where:
       * A = Maturity Value
       * P = Principal Amount
       * r = Annual Interest Rate
       * n = Compounding Frequency per year
       * t = Tenure in years
 * Dynamic Visualization:
   * A responsive doughnut chart will visually represent the breakdown of the total maturity value into "Total Investment" (Principal) and "Total Interest" (Est. return).
   * The chart will update dynamically with each change in the input parameters.
 * User Interface (UI) Design:
   * The UI will be designed to be clean, minimalist, and mobile-friendly, mimicking the aesthetic of the provided "Groww" screenshot.
   * It will feature clear labels, input fields, and a prominent display area for the calculated values.
   * The use of a consistent color palette will enhance the user experience.
Project Milestones
 * Setup and Planning:
   * Initialize a new React project using Vite with TypeScript.
   * Set up a basic project structure and install necessary dependencies (e.g., React Hook Form, Chart.js).
 * UI Development:
   * Create reusable React components for the input form, display panel, and the doughnut chart.
   * Implement the styling using a CSS-in-JS library to match the reference design.
   * Ensure the layout is responsive across different devices.
 * Calculator Logic:
   * Develop the core JavaScript/TypeScript functions to perform the FD calculations.
   * Integrate these functions with the form state managed by React Hook Form to trigger real-time updates.
 * Data Visualization:
   * Implement the doughnut chart using the chosen charting library.
   * Connect the chart's data to the calculated values (Principal and Interest) so it updates dynamically.
 * Refinement and Deployment:
   * Conduct thorough testing to ensure the accuracy of calculations and the responsiveness of the UI.
   * Add error handling and user feedback mechanisms.
   * Optimize the application for performance.
   * Deploy the application to a hosting service like Vercel or Netlify.
This project will serve as an excellent demonstration of proficiency in modern frontend development, including state management with React, data visualization, and building a user-friendly and functional web application.
