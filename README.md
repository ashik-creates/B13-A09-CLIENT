Name: StudyNook

Description:

StudyNook is a modern study room booking platform built with Next.js where users can explore available study spaces, book rooms based on time slots, manage their bookings, and add their own study room listings. The application focuses on providing a smooth and responsive booking experience with modern UI and real-time room availability management.

Purpose:

StudyNook is a full-stack room booking application created to demonstrate how a real-world collaborative study space platform works using modern web technologies. It utilizes Next.js App Router, protected authentication system, MongoDB database integration, dynamic filtering, and responsive UI design. The goal is to provide users with an organized and user-friendly environment where they can discover and reserve study spaces efficiently.

Key Features:
1. Authentication System:

Email and password authentication is implemented using Better Auth. Users can securely register, login, maintain sessions with cookies, and logout with toast notifications. Protected routes ensure only authenticated users can access booking-related pages and room management features.

2. Study Room Booking System:

Users can browse study rooms and reserve available slots by selecting booking date, start time, and end time. Booking cost is automatically calculated based on selected hours and hourly room rates. Booking conflicts are prevented through backend time validation.

3. Room Listings Management:

Authenticated users can add their own study room listings with room details such as room name, image, floor, hourly rate, capacity, and amenities. Users can also manage their created listings separately.

4. Search and Filtering:

The Rooms page includes dynamic search functionality by room name along with filtering by amenities and hourly rate range. Users can quickly find rooms matching their preferences.

5. Booking Management:

Users can view all their bookings in a responsive booking dashboard. Upcoming confirmed bookings can be cancelled through a confirmation modal which updates the booking status instantly.

6. Responsive Modern UI:

The application is fully responsive across mobile, tablet, and desktop devices. Flexible layouts, responsive grids, dropdown menus, and optimized cards ensure a smooth user experience on all screen sizes.

7. Performance Optimization:

Next.js Server Components are used wherever possible to improve loading performance and reduce unnecessary client-side rendering. Images are optimized using the Next.js Image component for faster loading and layout stability.

8. User Experience Enhancements:

Toast notifications are implemented for actions like login, logout, booking success, and booking cancellation. Clean layouts and intuitive navigation improve the overall user experience.

Tech and NPM Packages Used:
1. Next.js (App Router):

Used for routing, server-side rendering, dynamic routes, loading states, and modern React architecture with Server and Client Components.

2. Tailwind CSS:

Provides utility-first responsive styling for building modern layouts and custom UI design efficiently.

3. HeroUI:

Used for accessible and reusable UI components such as Buttons, Modals, Dropdowns, Inputs, Alerts, Cards, DatePickers, and Forms.

4. Better Auth:

Handles authentication, session management, secure login system, and cookie-based user sessions.

5. MongoDB:

Stores application data including rooms, bookings, and user-related information.

6. Express.js:

Used as the backend server to handle REST APIs, booking logic, room management, and database operations.

7. React Hot Toast:

Provides toast notifications for booking actions, login/logout feedback, and user interactions.

8. React Icons:

Used for modern icons throughout the UI to improve visual appearance and usability.

Live URL:
https://b13-a09-client-five.vercel.app/