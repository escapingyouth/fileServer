# File Server Project

## Overview

File server is a platform for distributing documents such as wedding cards, admission forms, and more. It includes features like user signup/login, password reset, file feed page, file search, and the ability to send files via email. Admins can upload files with title/description, update files, delete files, and a lot more. Also available are various file and user statistics.

## Features

- User signup and login
- Password reset functionality
- File feed page
- File search
- Send files via email
- Admin features: file upload with title/description, update files, delete files, update users, delete users etc

## Technology Stack

- Backend: Node.js, Express, MongoDB, Mongoose
- Frontend: React, Vite, Material-UI (MUI)
- File Storage: AWS S3
- Email Service: Nodemailer

## Prerequisites

- Node.js
- MongoDB

## Installation

1. **Clone the repository**:

   - Clone the project repository from GitHub to your local machine.

2. **Install backend dependencies**:

   - Navigate to the project directory and install the required Node.js dependencies for the backend.

3. **Install frontend dependencies**:

   - Navigate to the client directory and install the required dependencies for the frontend.

4. **Set up environment variables**:

   - Create a `.env` file in the root directory with the necessary environment variables such as MongoDB URI, JWT secret, email credentials, and AWS credentials.

5. **Run the backend server**:

   - Start the backend server using Node.js.

   - ```js
     node server.js
     ```

6. **Run the frontend development server**:

   - Start the frontend development server using Vite.

   - ```js
     npm run dev
     ```

## API Documentation

### User Routes

- **POST /api/users/signup**: Register a new user
- **POST /api/users/login**: Log in a user
- **POST /api/users/forgotPassword**: Initiate the password reset process
- **PATCH /api/users/resetPassword/:token**: Reset the user's password using a token
- **GET /api/users/logout**: Log out the user
- **PATCH /api/users/updateMyPassword**: Update the user's password
- **GET /api/users/me**: Get logged-in user's information
- **PATCH /api/users/updateMe**: Update logged-in user's information
- **DELETE /api/users/deleteMe**: Delete logged-in user's account

- **GET /api/users/stats**: Retrieve statistics about users

### File Routes

- **GET /api/files**: Retrieve all files
- **GET /api/files/:id**: Retrieve a specific file by its ID
- **POST /api/files/upload**: Upload a file to the server

- **GET /api/files/download/:id**: Download a file from the server
- **POST /api/files/email**: Send a file via email
- **PATCH /api/files/:id**: Update a file
- **PATCH /api/files/trash/:id**: Move a file to the trash
- **PATCH /api/files/restore/:id**: Restore a file from the trash
- **DELETE /api/files/:id**: Permanently delete a file
- **GET /api/files/stats**: Retrieve statistics about files

## Deployment

The fully deployed application can be found at:

- https://file-server-client.vercel.app

## Admin Login Details

To log in as an admin, use the following credentials:

- **Email**: `amalitech@gmail.com`
- **Password**: `amalitech`

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Make your changes and commit them.
4. Push to your branch.
5. Open a pull request for review.

## License

This project is licensed under the MIT License.
