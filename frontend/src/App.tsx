import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import PatientDashboard from './pages/PatientDashboard';
import SymptomChecker from './pages/SymptomChecker';
import TriageResult from './pages/TriageResult';
import AppointmentBooking from './pages/AppointmentBooking';
import MedicalRecords from './pages/MedicalRecords';
import DoctorDashboard from './pages/DoctorDashboard';
import PatientReport from './pages/PatientReport';
import AgentMonitoring from './pages/AgentMonitoring';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<PatientDashboard />} />
          <Route path="/chat" element={<SymptomChecker />} />
          <Route path="/result" element={<TriageResult />} />
          <Route path="/book" element={<AppointmentBooking />} />
          <Route path="/records" element={<MedicalRecords />} />
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          <Route path="/patient-report" element={<PatientReport />} />
          <Route path="/admin" element={<AgentMonitoring />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
