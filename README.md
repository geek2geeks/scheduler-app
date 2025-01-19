# Presentation Booking System

A web application for MBA7060 - Financial Management and Decision Making course that allows students to schedule their project presentation time slots.

## Features

- Student booking interface with available time slot selection
- Admin panel for tutors to manage bookings
- Light/dark theme support
- Responsive design for mobile and desktop
- Simple JSON-based data storage
- 20-minute presentation slots with 5-minute breaks
- 4-digit booking reference code system

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

## Usage

### For Students
- Browse available presentation slots
- Book a slot by providing name and student number
- Receive a 4-digit code for booking management
- Cancel or modify bookings using the reference code

### For Tutors
- Access admin panel with secure login
- View all bookings in a comprehensive dashboard
- Manage slots with drag-and-drop functionality
- Add, edit, or remove bookings manually

## Time Slots

- Morning sessions: 9:00 AM - 1:00 PM
- Afternoon sessions: 2:00 PM - 5:00 PM
- Each slot: 20 minutes with 5-minute breaks

## Technology Stack

- React
- Material UI (MUI)
- React Router
- JSON for data storage 