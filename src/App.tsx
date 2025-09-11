import { Routes, Route } from 'react-router-dom';
import { GlobalStyles } from './styles/GlobalStyles';
import AccountsDashboard from './pages/AccountsDashboard';
import Institutions from './pages/Institutions';
import CallbackPage from './pages/Callback';

function App() {
  return (
    <>
      <GlobalStyles />
      <Routes>
        <Route path="/onboard-institution" element={<Institutions />} />
        <Route path="/callback/ingestion" element={<CallbackPage />} />
        <Route path="/" element={<AccountsDashboard />} />
        <Route
          path="/dashboard/:accountId"
          element={<h1>Account Details</h1>}
        />
        <Route path="/profile" element={<h1>Your Profile</h1>} />
      </Routes>
    </>
  );
}

export default App;
