# IS 413 – Mission 11: Online Bookstore

This project is a full-stack web application built using ASP.NET Core Web API and React.

## Features

- Displays a list of books from a SQLite database
- Pagination (5 books per page by default)
- User can change number of results per page
- Sort books by title (A–Z / Z–A)
- Styled using Bootstrap

## Technologies Used

- ASP.NET Core Web API
- Entity Framework Core (SQLite)
- React (Vite + TypeScript)
- Axios
- Bootstrap

## Project Structure

- `/backend` – ASP.NET Core API connected to SQLite database
- `/frontend` – React application that consumes the API

## How to Run

### Backend

cd backend
dotnet run


### Frontend

cd frontend
npm install
npm run dev


---

## Notes

- The database was provided and pre-populated with sample books
- `node_modules` is excluded from the repository for performance
