# IS 413 – Mission 12: Online Bookstore

This is a full-stack web application built with ASP.NET Core and React.  
It allows users to view books, filter and sort them, and manage a shopping cart.

## Features

- View books from a database  
- Pagination (5, 10, or 15 books per page)  
- Sort books by title (A–Z / Z–A)  
- Filter books by category  
- Add books to a shopping cart  
- Cart shows quantity, subtotal, and total  
- Cart persists during the session  
- Separate cart page  
- Cart summary on home page  

## Bootstrap

- Grid system (row / col) used for layout  
- Alert used for cart messages  
- Badge used for category labels  

## Technologies

- ASP.NET Core Web API  
- SQLite (Entity Framework)  
- React (TypeScript + Vite)  
- Axios  
- Bootstrap  

## How to Run

### Backend
cd backend  
dotnet run  

### Frontend
cd frontend  
npm install  
npm run dev  
