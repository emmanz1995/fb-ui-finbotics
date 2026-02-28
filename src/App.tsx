import { Routes, Route } from 'react-router-dom';
import { GlobalStyles } from './styles/GlobalStyles';
import AccountsDashboard from './pages/AccountsDashboard';
import Institutions from './pages/Institutions';
import CallbackPage from './pages/Callback';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import CreatePayment from './pages/CreatePayment';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <>
      <GlobalStyles />
      <Routes>
        <Route path="/onboard-institution" element={<Institutions />} />
        <Route path="/callback/ingestion" element={<CallbackPage />} />
        <Route path="/accounts-dashboard" element={<AccountsDashboard />} />
        <Route path="/" element={<Login />} />
        <Route path="/create-account" element={<Register />} />
        <Route path="/dashboard/:accountId" element={<Dashboard />} />
        <Route path="/profile" element={<h1>Your Profile</h1>} />
        <Route
          path="/view-transactions/:accountId"
          element={<Transactions />}
        />
        <Route path="/make-payments" element={<CreatePayment />} />
      </Routes>
    </>
  );
}

export default App;
