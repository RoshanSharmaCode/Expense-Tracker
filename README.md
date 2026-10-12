# 💰 Expense Tracker & Finance Dashboard

A full-stack **Expense Tracker and Finance Dashboard** built using the MERN stack (MongoDB, Express.js, React.js, and Node.js). The application helps users manage income and expenses, monitor their financial activity, analyze spending patterns, and export financial reports.

## 🚀 Live Demo

**Try the application:** [Expense Tracker & Finance Dashboard](https://expense-tracker-fqu8.vercel.app/)

## ✨ Features

### 🔐 Authentication & Security
- User registration and login.
- JWT-based authentication.
- Protected routes for authenticated users.
- Persistent authentication using local storage or session storage.
- Password change functionality.
- Authenticated API requests using Bearer tokens.

### 📊 Dashboard & Analytics
- Overview of total balance, income, and expenses.
- Financial statistics for recent transactions.
- Savings rate calculation.
- Expense comparisons across time periods.
- Recent transaction history.
- Spending breakdown by category.
- Daily, weekly, and monthly transaction filters.

### 💸 Income & Expense Management
- Add new income and expense transactions.
- Edit existing transactions.
- Delete transactions.
- Organize transactions by category.
- View transaction descriptions, amounts, and dates.
- Refresh transaction data from the backend.

### 👤 Profile Management
- View personal account information.
- Update name and email address.
- Reflect profile changes immediately in the navbar and sidebar.
- Change account password.
- Log out securely.

### 📈 Financial Reporting
- Visualize financial information through dashboard charts and category summaries.
- Export financial reports to Excel for offline analysis.

### 🎨 User Interface
- Responsive interface built with React and Tailwind CSS.
- Reusable components and shared layout.
- Navigation through a navbar and sidebar.
- Interactive forms, dropdown menus, modals, and notifications.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React.js | Frontend UI |
| Tailwind CSS | Styling and responsive design |
| Node.js | Backend runtime |
| Express.js | REST API and server |
| MongoDB | Database |
| Mongoose | MongoDB object modeling |
| JWT | Authentication |
| Axios | HTTP requests |
| React Router | Client-side routing |
| Lucide React | Icons |
| React Toastify | Success and error notifications |
| React Modal | Modal dialogs |
| Excel export library | Financial report generation |

## 🏗️ Architecture

The application follows a client-server architecture.

1. **Frontend:** React components render the interface, manage UI state, and send API requests.
2. **Backend:** Express routes and controllers process requests and apply authentication.
3. **Database:** MongoDB stores user and financial transaction records.
4. **Authentication:** JWTs allow protected API endpoints to identify authenticated users.
5. **Integration:** Axios connects the frontend to the backend API.

## 📁 Project Structure

```text
Expense-Tracker/
├── backend/
│   ├── config/                 # Database and application configuration
│   ├── controllers/            # Request handlers and business logic
│   ├── middleware/             # Authentication and request middleware
│   ├── models/                 # MongoDB/Mongoose models
│   ├── routes/                 # API route definitions
│   ├── utils/                  # Backend utility functions
│   ├── .env                    # Backend environment variables (not committed)
│   ├── .gitignore
│   ├── notes.md
│   ├── package.json
│   ├── package-lock.json
│   └── server.js               # Backend entry point
│
├── frontend/
│   ├── public/                 # Static public assets
│   ├── src/
│   │   ├── assets/             # Images and shared styles
│   │   ├── components/
│   │   │   ├── Add.jsx
│   │   │   ├── FinancialCard.jsx
│   │   │   ├── GaugeCard.jsx
│   │   │   ├── Helper.jsx
│   │   │   ├── Layout.jsx
│   │   │   ├── login.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── TimeFrame.jsx
│   │   │   └── TransactionItem.jsx
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Expense.jsx
│   │   │   ├── Income.jsx
│   │   │   └── Profile.jsx
│   │   ├── utils/
│   │   │   └── exportUtils.js  # Financial report export utilities
│   │   ├── App.css
│   │   ├── App.jsx             # Application routes and authentication state
│   │   ├── index.css
│   │   └── main.jsx            # Frontend entry point
│   ├── .env                    # Frontend environment variables (not committed)
│   ├── .gitignore
│   ├── .oxlintrc.json
│   └── package.json
│
└── README.md
```

## ⚙️ Getting Started

### Prerequisites

Install the following before running the project:

- Node.js and npm
- MongoDB Atlas account or a local MongoDB instance
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/RoshanSharmaCode/Expense-Tracker.git
cd expense-tracker
```

### 2. Configure the Backend

Navigate to the backend directory:

```bash
cd server
npm install
```

Create a `.env` file in the backend directory:

```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret
```

Replace the example values with your actual configuration.

**Environment variable notes:**
- `PORT` specifies the backend server port.
- `MONGO_URI` contains your MongoDB connection string.
- `JWT_SECRET` is used to sign and verify authentication tokens.

Do not commit your `.env` file or expose your database credentials or JWT secret.

Start the backend using the script defined in your `server/package.json`. For example, if your project has a `dev` script:

```bash
npm start
```

### 3. Configure the Frontend

Open a second terminal and navigate to the frontend directory:

```bash
cd client
npm install
```

Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:4000
```

The frontend uses this variable as the backend origin and appends API paths such as `/api/user/me`.

**Important:** Do not append `/api` to `VITE_API_URL` unless you also update the API URL construction in the frontend.

Start the frontend:

```bash
npm run dev
```

Open the local URL printed by Vite in your terminal, usually `http://localhost:5173`.

## 🔑 Authentication Flow

1. A user signs up or logs in.
2. The backend validates the credentials and returns authentication data.
3. The frontend stores the user information and JWT according to the selected session-persistence option.
4. Protected routes check authentication before rendering private pages.
5. Authenticated requests include the JWT in the `Authorization` header.

Example:

```javascript
const token =
  localStorage.getItem("token") ||
  sessionStorage.getItem("token");

const response = await axios.get(
  `${import.meta.env.VITE_API_URL}/api/user/me`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  },
);
```

Expired or invalid tokens should be handled by redirecting the user to log in again.

## 🔌 API Overview

The following endpoints reflect the API paths used by the frontend. Request methods and any additional routes should be verified against the backend implementation.

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/user/me` | Retrieve the authenticated user's profile |
| PUT | `/api/user/profile` | Update profile information |
| PUT | `/api/user/password` | Change account password |
| GET | `/api/income/get` | Retrieve income records |
| GET | `/api/expense/get` | Retrieve expense records |
| POST | `/api/income/add` | Add an income transaction |
| POST | `/api/expense/add` | Add an expense transaction |
| PUT | `/api/income/update/:id` | Update an income transaction |
| PUT | `/api/expense/update/:id` | Update an expense transaction |
| DELETE | `/api/income/delete/:id` | Delete an income transaction |
| DELETE | `/api/expense/delete/:id` | Delete an expense transaction |

The authentication, signup, login, dashboard, and Excel-export endpoints depend on the routes configured in the backend.

## 🧩 Challenges & Solutions

Developing this project involved connecting the frontend and backend, handling authentication, synchronizing application state, and debugging data-related issues.

### 1. API Configuration and Network Errors
**Problem:** Frontend requests failed when the API base URL was configured incorrectly.

**Solution:** Configured `VITE_API_URL` through Vite environment variables and used it consistently when constructing API requests.

### 2. JWT Authentication and Expired Tokens
**Problem:** Protected requests returned errors when a JWT expired.

**Solution:** Investigated the authentication middleware and token expiration, verified that the token-signing helper returned the generated JWT, and identified the need to handle unauthorized responses appropriately.

### 3. Authorization Header
**Problem:** An incorrectly spelled authorization header prevented authenticated requests from being processed as expected.

**Solution:** Standardized authenticated requests to use:

```javascript
headers: {
  Authorization: `Bearer ${token}`,
}
```

### 4. MongoDB Connection Configuration
**Problem:** MongoDB Atlas connections encountered DNS SRV resolution errors, including `querySrv ECONNREFUSED`, and configuration issues such as an undefined `MONGO_URI`.

**Solution:** Checked environment variable loading, verified the connection string, and investigated DNS resolution. The connection configuration must be valid for the environment where the backend runs.

### 5. Dashboard Date Filtering
**Problem:** Dashboard totals appeared as zero when the queried records were outside the current reporting period.

**Solution:** Inspected the transaction dates and the monthly date boundaries used by the backend. Records from earlier months were correctly excluded from the current month's calculations.

### 6. Excel Export
**Problem:** An Excel file could not be saved using browser-oriented download methods on the server.

**Solution:** Recognized the difference between browser downloads and server-side file generation. Server-side exports can return an XLSX buffer with the appropriate response headers, while browser-side exports can use a client-side download utility.

### 7. React State Management
**Problem:** UI elements did not always update when state was declared or updated incorrectly.

**Solution:** Corrected state declarations and ensured state setters were used for the intended values. For example:

```javascript
const [overview, setOverview] = useState({});
```

### 8. Profile Updates Across Components
**Problem:** Updated profile details appeared on the profile page but did not immediately update the navbar.

**Solution:** Used shared user state in the parent component and an `onUpdateProfile` callback to propagate changes. Updated user information is also persisted in the appropriate browser storage.

### 9. Protected Routes and Session Persistence
**Problem:** Authentication needed to work with both persistent and session-based login.

**Solution:** Accounted for tokens stored in both `localStorage` and `sessionStorage` and used the matching storage when making authenticated requests.

### 10. Frontend and Backend Integration
**Problem:** API responses and transaction data needed consistent handling across the dashboard and transaction pages.

**Solution:** Normalized income and expense records before combining them, refreshed transaction data after create, update, and delete operations, and used shared layout context to provide transaction operations to nested pages.

## 🔒 Security Considerations

- Keep secrets and database credentials in environment variables.
- Never commit `.env` files or API credentials.
- Protect private API endpoints with authentication middleware.
- Validate incoming data on the backend.
- Verify ownership before allowing users to modify or delete financial records.
- Use HTTPS in production.
- Configure CORS for the frontend's permitted origin.
- Configure token expiration and handle expired sessions appropriately.

## 🚀 Future Improvements

Potential enhancements include:

- Add unit and integration tests.
- Improve financial charts and reporting filters.
- Support recurring transactions and budget limits.
- Add transaction search and pagination.
- Introduce category-wise budget alerts.
- Add more detailed monthly and yearly reports.
- Improve accessibility and form validation.
- Add automated deployment and continuous integration.

## 🎯 What I Learned

Through this project, I gained practical experience with:

- Building a full-stack MERN application.
- Designing and integrating REST APIs.
- Implementing JWT-based authentication.
- Managing application state in React.
- Connecting MongoDB models to backend controllers.
- Implementing protected routes and session persistence.
- Debugging API requests and database queries.
- Working with dates, financial calculations, and transaction filtering.
- Handling file exports and responsive UI components.
- Synchronizing user profile changes across multiple components.

If you find this project useful, consider giving the repository a ⭐ on GitHub.
