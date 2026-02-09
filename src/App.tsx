import { Routes, Route } from 'react-router-dom';
import { GlobalStyles } from './styles/GlobalStyles';
import AccountsDashboard from './pages/AccountsDashboard';
import Institutions from './pages/Institutions';
import CallbackPage from './pages/Callback';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import CreatePayment from './pages/CreatePayment';

function App() {
  return (
    <>
      <GlobalStyles />
      <Routes>
        <Route path="/onboard-institution" element={<Institutions />} />
        <Route path="/callback/ingestion" element={<CallbackPage />} />
        <Route path="/" element={<AccountsDashboard />} />
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
