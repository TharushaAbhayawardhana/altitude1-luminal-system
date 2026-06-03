# 🚀 Luminal Systems

A modern full-stack **React + PHP + MySQL** e-commerce & SaaS platform with Firebase authentication and PayHere payment integration (Sri Lanka Sandbox).

---

## 📌 Project Overview

Luminal Systems is a professional training + real-world simulation project designed to demonstrate full-stack development skills including:

- Modern UI/UX design using React + Tailwind
- Backend API development using PHP
- MySQL database design and integration
- Firebase Authentication (Email + Google Sign-In)
- PayHere payment gateway integration (Sandbox mode)
- Order management system with payment tracking
- Production-ready project structure for internship-level evaluation

---

## 🧱 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- React Router DOM
- Firebase Authentication
- Framer Motion (UI animations)

### Backend
- PHP (REST APIs)
- MySQL Database

### Integrations
- Firebase Authentication
- Google OAuth Login
- PayHere Sandbox Payment Gateway

---

## 🔐 Authentication System

Firebase Authentication handles secure login and registration.

**Connected Firebase Account**
- Email: `tharusharandima1@gmail.com`

**Features**
- Email/Password authentication
- Google Sign-In integration
- Automatic user creation during checkout (optional)
- Firebase UID stored in backend for linking orders to users

---

## 💳 Payment Gateway (PayHere Sandbox)

PayHere Sandbox is used for testing the complete payment workflow without real transactions.

**Environment**
- Sandbox mode enabled
- No real money transactions

**Test Cards**
Use official PayHere sandbox test cards:
https://support.payhere.lk/sandbox-and-testing

**Features**
- Secure payment popup
- Order creation before payment
- Payment status tracking (pending / completed / failed)
- Backend verification with hash validation
- MySQL order storage

---

## 🗄️ Database Structure

### Users Table
| Column | Type |
|---|---|
| id | INT (PK) |
| firebase_uid | VARCHAR |
| name | VARCHAR |
| email | VARCHAR |
| created_at | TIMESTAMP |
| updated_at | TIMESTAMP |

### Orders Table
| Column | Type |
|---|---|
| id | INT (PK) |
| order_id | VARCHAR |
| plan_id | VARCHAR |
| plan_name | VARCHAR |
| amount | DECIMAL |
| currency | VARCHAR |
| first_name | VARCHAR |
| last_name | VARCHAR |
| email | VARCHAR |
| phone | VARCHAR |
| address | TEXT |
| city | VARCHAR |
| status | ENUM |
| payment_data | JSON |
| firebase_uid | VARCHAR |
| created_at | TIMESTAMP |
| updated_at | TIMESTAMP |

### Contact Submissions Table
| Column | Type |
|---|---|
| id | INT (PK) |
| name | VARCHAR |
| email | VARCHAR |
| subject | VARCHAR |
| message | TEXT |
| created_at | TIMESTAMP |

---

## ⚙️ Features

### Frontend Features
- Fully responsive modern UI
- Pricing plans (Basic / Pro / Enterprise)
- Checkout system with PayHere integration
- Google Sign-In support
- Form validation handling
- Order summary page

### Backend Features
- PHP REST API structure
- Order creation and storage
- Contact form submission handling
- PayHere hash generation API
- Payment notification handling

---

## 🔄 Payment Flow

1. User selects a pricing plan
2. Checkout form is displayed
3. User logs in (Google or Email/Password)
4. Order is created in backend (status = `pending`)
5. PayHere payment popup opens
6. User enters sandbox card details
7. Payment is processed in sandbox environment
8. PayHere sends callback to backend
9. Order status is updated in MySQL (`completed` / `failed`)

---

## 🌍 Environment Variables

### Frontend (`.env`)

```env
VITE_PAYHERE_MERCHANT_ID=1236021
VITE_API_BASE=http://localhost:8000/api
```

### Backend (`.env` reference)

```env
PAYHERE_MERCHANT_SECRET=your_secret_here
```

---

## 🚀 Local Setup Instructions

### Frontend Setup

```bash
npm install
npm run dev
```

### Backend Setup (PHP Server)

```bash
php -S localhost:8000 -t backend
```

---

## 📦 Deployment

| Layer | Platform |
|---|---|
| Frontend | Vercel / Netlify |
| Backend | PHP hosting (cPanel / VPS / Render) |
| Database | MySQL (Local or Cloud) |

---

## 📊 Key Highlights

- ✅ Firebase Authentication fully integrated
- ✅ Google Sign-In working smoothly
- ✅ PayHere sandbox payment flow tested successfully
- ✅ MySQL order tracking system implemented
- ✅ Firebase UID linked user system implemented
- ✅ Secure hash-based payment validation
- ✅ Clean and modern UI design
- ✅ Internship-level full-stack architecture

---

## 🧪 Testing Notes

- PayHere tested using sandbox environment
- Firebase tested with Google + Email login
- Orders successfully stored in MySQL
- Contact form integrated with backend APIs
- Payment flow verified end-to-end

---

## 📌 Future Improvements

- [ ] User dashboard (order history)
- [ ] Admin dashboard (users & orders management)
- [ ] Email notifications after payment success
- [ ] Product inventory system
- [ ] Analytics dashboard
- [ ] Invoice generation system

---

## 👨‍💻 Author

**Tharusha Abhayawardhana**
Final Year Computer Science Undergraduate - University of Jaffna

---

## 📄 License

This project is developed for educational and internship training purposes.
