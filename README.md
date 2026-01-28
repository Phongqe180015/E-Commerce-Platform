# E-Commerce Platform - CRUD REST API + UI

A full-stack e-commerce web application for selling clothing products with complete CRUD functionality.

## 🚀 Live Demo

- **Frontend (Vercel)**: 
- **Backend API (Render)**: 
- **API Documentation (Swagger)**: 

## 📋 Features

### Backend API
- ✅ RESTful API with ASP.NET Core
- ✅ Full CRUD operations for products
- ✅ PostgreSQL database with Entity Framework Core
- ✅ Image upload support
- ✅ CORS enabled

### Frontend UI
- ✅ Next.js 14 with TypeScript
- ✅ Responsive design with Tailwind CSS
- ✅ Product listing with grid layout
- ✅ Product detail page
- ✅ Create/Edit product forms
- ✅ Delete product functionality
- ✅ Search and filter products
- ✅ Pagination (8 items per page)
- ✅ Image upload with preview

## 🛠️ Tech Stack

### Backend
- ASP.NET Core 8.0
- PostgreSQL
- Entity Framework Core
- Npgsql

### Frontend
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Axios

## 📦 Installation & Local Development

### Prerequisites
- .NET 8.0 SDK
- Node.js 18+
- PostgreSQL

### Backend Setup
```bash
cd e-commerce-platform-BE/e-commerce-platform-BE
dotnet restore
dotnet ef database update
dotnet run
```

Backend runs at: `http://localhost:5057`

### Frontend Setup
```bash
cd e-commerce-frontend
npm install
npm run dev
```

Frontend runs at: `http://localhost:3000`

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| GET | `/api/products/{id}` | Get single product |
| POST | `/api/products` | Create new product |
| PUT | `/api/products/{id}` | Update product |
| DELETE | `/api/products/{id}` | Delete product |

## 👤 Author

- **Student ID**: QE180015  
- **Name**: Hồ Văn Phong
- **Class**: PRN232