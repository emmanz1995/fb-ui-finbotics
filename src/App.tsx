import { Routes, Route } from 'react-router-dom';
import { GlobalStyles } from './styles/GlobalStyles';
import AccountsDashboard from './pages/AccountsDashboard';
import Institutions from './pages/Institutions';
import CallbackPage from './pages/Callback';
import Dashboard from './pages/Dashboard';

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
      </Routes>
    </>
  );
}

export default App;
