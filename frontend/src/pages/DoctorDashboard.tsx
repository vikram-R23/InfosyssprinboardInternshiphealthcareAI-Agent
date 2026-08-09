import { useEffect, useState } from 'react';
import { 
  Stethoscope, 
  LayoutDashboard, 
  CalendarDays, 
  ClipboardList, 
  Mail, 
  FlaskConical, 
  HelpCircle, 
  LogOut, 
  Search, 
  Bell, 
  Hourglass, 
  UserCheck, 
  CheckCircle2, 
  Brain, 
  AlertTriangle, 
  Lightbulb 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

interface TriageReport {
  id: string;
  symptoms: string;
  urgency_level: string;
  recommended_department: string;
  ai_explanation: string;
  created_at: string;
}

export default function DoctorDashboard() {
  const [reports, setReports] = useState<TriageReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState<TriageReport | null>(null);

  useEffect(() => {
    async function fetchData() {
      // Fetch recent triage reports for the doctor to review
      const { data, error } = await supabase
        .from('triage_reports')
        .select('*')
        .order('created_at', { ascending: false });

      if (data && data.length > 0) {
        setReports(data);
        setSelectedReport(data[0]); // Auto-select the first report
      }
      setLoading(false);
    }
    fetchData();
  }, []);
  return (
    <div className="text-slate-900 flex h-screen overflow-hidden bg-slate-50 font-sans antialiased">
      
      {/* Side Navigation */}
      <nav className="hidden md:flex bg-white h-screen w-64 fixed left-0 top-0 shadow-sm flex-col py-8 px-4 z-20 border-r border-slate-200">
        <div className="mb-8 flex items-center gap-3 px-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
            <Stethoscope className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-blue-600 tracking-tight">HealthPulse</h1>
            <p className="text-xs font-medium text-slate-500">Clinical Portal</p>
          </div>
        </div>
        
        <button className="mb-8 w-full bg-blue-600 text-white rounded-xl py-3 text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm">
          New Consultation
        </button>
        
        <div className="flex-1 flex flex-col gap-1">
          <a href="#" className="flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-700 rounded-lg font-bold transition-all duration-200 text-sm">
            <LayoutDashboard className="w-5 h-5" />
            <span>Overview</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 hover:text-slate-900 rounded-lg transition-all duration-200 text-sm font-medium">
            <CalendarDays className="w-5 h-5" />
            <span>Appointments</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 hover:text-slate-900 rounded-lg transition-all duration-200 text-sm font-medium">
            <ClipboardList className="w-5 h-5" />
            <span>Patient Records</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 hover:text-slate-900 rounded-lg transition-all duration-200 text-sm font-medium">
            <Mail className="w-5 h-5" />
            <span>Messages</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 hover:text-slate-900 rounded-lg transition-all duration-200 text-sm font-medium">
            <FlaskConical className="w-5 h-5" />
            <span>Laboratory</span>
          </a>
        </div>
        
        <div className="mt-auto flex flex-col gap-1 pt-4 border-t border-slate-200">
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 hover:text-slate-900 rounded-lg transition-all duration-200 text-sm font-medium">
            <HelpCircle className="w-5 h-5" />
            <span>Help Center</span>
          </a>
          <Link to="/" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 hover:text-slate-900 rounded-lg transition-all duration-200 text-sm font-medium">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </Link>
        </div>
      </nav>

      {/* Main Content Wrapper */}
      <div className="flex-1 md:ml-64 flex flex-col h-screen overflow-hidden">
        
        {/* Desktop Top Bar (Search & Profile) */}
        <div className="h-20 px-6 flex items-center justify-between border-b border-slate-200 bg-white/50 backdrop-blur-sm z-10 sticky top-0 hidden md:flex">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text"
              placeholder="Search patients, records..." 
              className="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all shadow-sm text-slate-900 placeholder:text-slate-400"
            />
          </div>
          <div className="flex items-center gap-6">
            <button className="text-slate-400 hover:text-blue-600 transition-colors relative">
              <Bell className="w-6 h-6" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-900">Dr. Julianne Smith</p>
                <p className="text-xs text-slate-500">Senior Cardiologist</p>
              </div>
              <img 
                alt="Dr. Julianne Smith" 
                className="w-10 h-10 rounded-full object-cover shadow-sm border border-slate-100" 
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" 
              />
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 flex flex-col lg:flex-row gap-6 lg:gap-8">
          
          {/* Left Area: Schedule Table */}
          <div className="flex-1 flex flex-col gap-4 md:gap-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">Today's Schedule</h2>
              <div className="flex gap-2">
                <button className="px-4 py-2 text-sm font-bold text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">All</button>
                <button className="px-4 py-2 text-sm font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-900 rounded-lg transition-colors">Waiting</button>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-xs text-slate-500 uppercase tracking-wider">
                    <th className="p-4 font-bold">Time</th>
                    <th className="p-4 font-bold">Patient</th>
                    <th className="p-4 font-bold">Symptoms</th>
                    <th className="p-4 font-bold">Triage Level</th>
                    <th className="p-4 font-bold">Status</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-slate-100">
                  
                  {loading ? (
                    <tr><td colSpan={5} className="p-8 text-center text-slate-500">Loading schedule...</td></tr>
                  ) : reports.length > 0 ? (
                    reports.map((report) => (
                      <tr key={report.id} onClick={() => setSelectedReport(report)} className={`hover:bg-slate-50 transition-colors cursor-pointer ${selectedReport?.id === report.id ? 'bg-blue-50/30' : ''}`}>
                        <td className="p-4 whitespace-nowrap text-slate-500 font-medium">
                          {new Date(report.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </td>
                        <td className="p-4 flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xs border border-slate-200">PT</div>
                          <span className="font-bold text-slate-900">Patient</span>
                        </td>
                        <td className="p-4 text-slate-600 truncate max-w-[150px]">{report.symptoms}</td>
                        <td className="p-4">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider ${
                            report.urgency_level === 'High' ? 'bg-red-50 text-red-600 border border-red-100' :
                            report.urgency_level === 'Medium' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                            'bg-blue-50 text-blue-600 border border-blue-100'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                              report.urgency_level === 'High' ? 'bg-red-600' :
                              report.urgency_level === 'Medium' ? 'bg-amber-500' :
                              'bg-blue-600'
                            }`}></span> {report.urgency_level}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="text-sm text-amber-600 font-bold flex items-center gap-1.5">
                            <Hourglass className="w-4 h-4" /> Waiting
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <>
                      {/* Row 1 (Selected) - Fallback */}
                      <tr className="hover:bg-slate-50 transition-colors cursor-pointer bg-blue-50/30">
                        <td className="p-4 whitespace-nowrap text-slate-500 font-medium">09:00 AM</td>
                        <td className="p-4 flex items-center gap-3">
                          <img 
                            alt="Patient Avatar" 
                            className="w-9 h-9 rounded-full object-cover border border-slate-200" 
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" 
                          />
                          <span className="font-bold text-slate-900">Robert Chen</span>
                        </td>
                        <td className="p-4 text-slate-600">Chest pain, Shortness of breath</td>
                        <td className="p-4">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-red-50 text-red-600 border border-red-100">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-600 mr-1.5"></span> High Risk
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="text-sm text-blue-600 font-bold flex items-center gap-1.5">
                            <Hourglass className="w-4 h-4" /> In Progress
                          </span>
                        </td>
                      </tr>
                      
                      {/* Row 2 - Fallback */}
                      <tr className="hover:bg-slate-50 transition-colors cursor-pointer">
                        <td className="p-4 whitespace-nowrap text-slate-500 font-medium">09:45 AM</td>
                        <td className="p-4 flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xs border border-slate-200">SJ</div>
                          <span className="font-bold text-slate-900">Sarah Jenkins</span>
                        </td>
                        <td className="p-4 text-slate-600">Persistent Migraine</td>
                        <td className="p-4">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-amber-50 text-amber-600 border border-amber-100">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1.5"></span> Medium
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="text-sm text-amber-600 font-bold flex items-center gap-1.5">
                            <UserCheck className="w-4 h-4" /> Waiting
                          </span>
                        </td>
                      </tr>
                    </>
                  )}
                  
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Right Panel: AI Triage Summary */}
          <div className="w-full lg:w-[400px] flex flex-col gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-6 flex flex-col h-full sticky top-0">
              
              <div className="flex items-center gap-2.5 mb-5">
                <Brain className="text-blue-600 w-6 h-6" />
                <h3 className="text-lg font-bold text-blue-600 tracking-tight">AI Triage Summary</h3>
              </div>
              
              {selectedReport ? (
                <>
                  <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
                    <div className="w-14 h-14 rounded-full bg-slate-100 border border-slate-200 shadow-sm flex items-center justify-center text-xl font-bold text-slate-400">
                      PT
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-lg">Patient Data</p>
                      <p className="text-xs font-medium text-slate-500">Department: {selectedReport.recommended_department}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-6 flex-1">
                    <div>
                      <p className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">Reported Symptoms</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1.5 bg-slate-50 text-slate-600 rounded-lg text-xs font-medium border border-slate-200 shadow-sm">{selectedReport.symptoms}</span>
                      </div>
                    </div>
                    
                    <div className="bg-blue-50/50 rounded-xl p-5 border border-blue-100 mt-auto shadow-sm">
                      <p className="text-xs font-bold text-blue-700 mb-2 flex items-center gap-1.5 uppercase tracking-wider">
                        <Lightbulb className="w-4 h-4" /> Clinical Recommendation
                      </p>
                      <p className="text-sm text-slate-700 leading-relaxed font-medium">
                        {selectedReport.ai_explanation || "No explanation provided by AI."}
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Fallback Summary Panel */}
                  <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
                    <img 
                      alt="Robert Chen" 
                      className="w-14 h-14 rounded-full object-cover border border-slate-200 shadow-sm" 
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" 
                    />
                    <div>
                      <p className="font-bold text-slate-900 text-lg">Robert Chen</p>
                      <p className="text-xs font-medium text-slate-500">Male, 68 yrs • ID: #88392A</p>
                    </div>
                  </div>
                  
                  <div className="space-y-6 flex-1">
                    <div>
                      <p className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">Reported Symptoms</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1.5 bg-slate-50 text-slate-600 rounded-lg text-xs font-medium border border-slate-200 shadow-sm">Chest pain (Substernal)</span>
                        <span className="px-3 py-1.5 bg-slate-50 text-slate-600 rounded-lg text-xs font-medium border border-slate-200 shadow-sm">Dyspnea</span>
                        <span className="px-3 py-1.5 bg-slate-50 text-slate-600 rounded-lg text-xs font-medium border border-slate-200 shadow-sm">Diaphoresis</span>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-xs font-bold text-slate-400 mb-3 uppercase tracking-wider">AI Risk Factors Detected</p>
                      <ul className="space-y-3 text-sm text-slate-600">
                        <li className="flex items-start gap-2.5">
                          <AlertTriangle className="text-red-500 w-5 h-5 shrink-0" />
                          <span className="leading-snug font-medium">History of Hypertension (BP typically 145/90)</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <AlertTriangle className="text-amber-500 w-5 h-5 shrink-0" />
                          <span className="leading-snug font-medium">Family history of coronary artery disease</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-blue-50/50 rounded-xl p-5 border border-blue-100 mt-auto shadow-sm">
                      <p className="text-xs font-bold text-blue-700 mb-2 flex items-center gap-1.5 uppercase tracking-wider">
                        <Lightbulb className="w-4 h-4" /> Clinical Recommendation
                      </p>
                      <p className="text-sm text-slate-700 leading-relaxed font-medium">
                        High probability of Acute Coronary Syndrome (ACS). Immediate ECG and Troponin test recommended. Prepare for potential cardiology consult.
                      </p>
                    </div>
                  </div>
                </>
              )}
              
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button className="flex-1 bg-white text-blue-600 font-bold py-3 rounded-xl hover:bg-slate-50 transition-colors border border-blue-200 shadow-sm text-sm">
                  View History
                </button>
                <button className="flex-1 bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-colors shadow-sm text-sm">
                  Start Exam
                </button>
              </div>
              
            </div>
          </div>
          
        </main>
      </div>
      
    </div>
  );
}
