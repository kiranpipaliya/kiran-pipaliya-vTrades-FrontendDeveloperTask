# V-Trades Frontend

A modern **Next.js (App Router)** frontend application implementing a complete authentication flow and dashboard structure. This project was built as part of a frontend assessment and focuses on clean architecture, reusable components, and mock API handling using Next.js Route Handlers.

🌐 **Live Application**  
https://kiran-pipaliya-v-trades-frontend-de.vercel.app/login

---

## 🚀 Tech Stack

- Next.js 14+ (App Router)
- React
- TypeScript
- Tailwind CSS
- NextAuth
- REST APIs (Mocked using Route Handlers)
- Vercel (Deployment)

---

## 📁 Project Structure

```txt
app/
 ├─ (auth)/
 │   ├─ login/
 │   ├─ signup/
 │   ├─ otp/
 │   ├─ forgot-password/
 │   ├─ create-new-password/
 │   └─ layout.tsx
 │
 ├─ api/
 │   ├─ auth/
 │   │   ├─ login/route.ts
 │   │   ├─ signup/route.ts
 │   │   ├─ verify-otp/route.ts
 │   │   ├─ resend-otp/route.ts
 │   │   ├─ forgot-password/route.ts
 │   │   └─ reset-password/route.ts
 │   └─ trades/route.ts
 │
 ├─ dashboard/
 │   └─ page.tsx
 │
 ├─ layout.tsx
 └─ page.tsx

components/
 ├─ auth/
 │   ├─ LoginForm.tsx
 │   ├─ SignupForm.tsx
 │   ├─ OtpForm.tsx
 │   ├─ ForgotPasswordForm.tsx
 │   ├─ CreateNewPasswordForm.tsx
 │   └─ TextInput.tsx
 │
 └─ ui/
     ├─ PrimaryButton.tsx
     ├─ ErrorState.tsx
     ├─ SuccessModal.tsx
     └─ Navbar.tsx

lib/
 ├─ api.ts
 └─ cn.ts

types/
 └─ trade.ts
```

## 🔐 Features

- Google Authentication  
- User Signup  
- User Login  
- OTP Verification  
- Resend OTP  
- Forgot Password  
- Reset / Create New Password  
- Protected Dashboard Route  
- Mock APIs using Next.js Route Handlers  
- Reusable and scalable UI components  
- Fully responsive layout  

---

## 🛠️ Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd v-trades-frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```

## 🔌 API Handling

All backend interactions are handled using **Next.js Route Handlers** under the `app/api` directory.  
Currently, mock APIs are implemented to simulate authentication and trade data, making it easy to plug in real backend services later.

---

## 📦 Deployment

The application is deployed on **Vercel**.

🔗 **Live URL**  
https://kiran-pipaliya-v-trades-frontend-de.vercel.app/login

---

## 👤 Author

**Kiran Pipaliya**  
Frontend Developer (React / Next.js)
