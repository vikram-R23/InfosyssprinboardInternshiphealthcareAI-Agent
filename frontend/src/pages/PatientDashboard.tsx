import { useEffect, useState } from 'react';
import { 
  LayoutDashboard, 
  CalendarDays, 
  FolderOpen, 
  User, 
  HeartPulse, 
  Settings, 
  LogOut, 
  Bell, 
  HelpCircle, 
  Stethoscope, 
  ArrowRight, 
  Activity, 
  Clock, 
  MapPin, 
  Video, 
  Laptop, 
  CheckCircle2, 
  Bot, 
  Pill 
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

export default function PatientDashboard() {
  const [reports, setReports] = useState<TriageReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("Patient");

  useEffect(() => {
    async function fetchData() {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserName(user.user_metadata?.full_name || "Patient");
        
        // Fetch recent triage reports for this user
        const { data, error } = await supabase
          .from('triage_reports')
          .select('*')
          .eq('patient_id', user.id)
          .order('created_at', { ascending: false })
          .limit(3);

        if (data && data.length > 0) {
          setReports(data);
        }
      }
      setLoading(false);
    }
    fetchData();
  }, []);
  return (
    <div className="bg-slate-50 text-slate-900 font-sans min-h-screen flex">
      {/* SideNavBar */}
      <nav className="hidden md:flex fixed left-0 top-0 h-screen w-64 bg-white border-r border-slate-200 flex-col p-4 z-40 transition-all duration-200 ease-in-out">
        <div className="mb-8 flex items-center gap-3 px-2">
          <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
            <HeartPulse className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">CareTriage AI</h1>
          </div>
        </div>

        <div className="mb-8 bg-slate-50 rounded-xl p-4 flex items-center gap-4 border border-slate-100">
          <img 
            alt="Patient Avatar" 
            className="w-10 h-10 rounded-full object-cover shadow-sm" 
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" 
          />
          <div>
            <p className="text-xs font-medium text-slate-500">Welcome back</p>
            <p className="text-sm font-semibold text-slate-900">{userName}</p>
          </div>
        </div>

        <ul className="flex-1 space-y-1.5">
          <li>
            <a href="#" className="flex items-center gap-3 px-3 py-2.5 bg-blue-50 text-blue-700 rounded-lg font-medium text-sm transition-all duration-200">
              <LayoutDashboard className="w-5 h-5" />
              Dashboard
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg font-medium text-sm transition-all duration-200">
              <CalendarDays className="w-5 h-5" />
              Appointments
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg font-medium text-sm transition-all duration-200">
              <FolderOpen className="w-5 h-5" />
              Records
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg font-medium text-sm transition-all duration-200">
              <User className="w-5 h-5" />
              Profile
            </a>
          </li>
        </ul>

        <div className="mt-auto pt-6 space-y-2 border-t border-slate-100">
          <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-emerald-500 text-white rounded-xl font-medium text-sm hover:bg-emerald-600 transition-colors shadow-sm">
            <HeartPulse className="w-4 h-4" />
            Start Symptom Check
          </button>
          
          <ul className="space-y-1 mt-4">
            <li>
              <a href="#" className="flex items-center gap-3 px-3 py-2 text-slate-500 hover:text-slate-900 rounded-lg font-medium text-sm transition-all">
                <Settings className="w-5 h-5" />
                Settings
              </a>
            </li>
            <li>
              <Link to="/" className="flex items-center gap-3 px-3 py-2 text-slate-500 hover:text-slate-900 rounded-lg font-medium text-sm transition-all">
                <LogOut className="w-5 h-5" />
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 p-6 md:p-10 max-w-7xl mx-auto w-full">
        
        {/* Header */}
        <header className="mb-10 flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Overview</h2>
            <p className="text-slate-500 mt-2">Manage your health appointments and triage records.</p>
          </div>
          <div className="hidden md:flex gap-3">
            <button className="p-2.5 bg-white border border-slate-200 rounded-full text-slate-600 hover:bg-slate-50 transition-colors shadow-sm">
              <Bell className="w-5 h-5" />
            </button>
            <button className="p-2.5 bg-white border border-slate-200 rounded-full text-slate-600 hover:bg-slate-50 transition-colors shadow-sm">
              <HelpCircle className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Hero CTA Card */}
          <section className="col-span-1 md:col-span-12 mb-2">
            <div className="bg-blue-600 rounded-3xl p-8 md:p-12 shadow-md relative overflow-hidden flex flex-col md:flex-row items-center justify-between border border-blue-500">
              {/* Decorative background shapes */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
              
              <div className="z-10 max-w-2xl text-white">
                <h3 className="text-3xl font-bold mb-4">AI-Assisted Triage</h3>
                <p className="text-blue-100 text-lg mb-8 leading-relaxed max-w-xl">
                  Experience rapid, intelligent preliminary assessments before your visit. Our clinical AI helps route you to the right care, faster.
                </p>
                <button className="bg-white text-blue-600 px-6 py-3.5 rounded-xl font-semibold shadow-sm hover:shadow-md hover:bg-slate-50 transition-all flex items-center gap-2">
                  <Stethoscope className="w-5 h-5" />
                  Start New Symptom Check
                </button>
              </div>
              
              <div className="z-10 hidden md:flex w-56 h-56 relative rounded-full bg-blue-500/20 border-4 border-white/10 items-center justify-center">
                <Bot className="w-24 h-24 text-white opacity-90" />
              </div>
            </div>
          </section>

          {/* Upcoming Appointments */}
          <section className="col-span-1 md:col-span-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-slate-900">Upcoming Appointments</h3>
              <button className="text-blue-600 text-sm font-medium hover:underline flex items-center gap-1">
                View Calendar <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Appointment Card 1 */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 hover:border-blue-300 transition-colors group relative overflow-hidden flex flex-col">
                <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 group-hover:w-1.5 transition-all"></div>
                
                <div className="flex justify-between items-start mb-4 pl-3">
                  <div>
                    <h4 className="font-bold text-slate-900">Dr. Sarah Jenkins</h4>
                    <p className="text-sm text-slate-500">Cardiology</p>
                  </div>
                  <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
                    <Activity className="w-5 h-5" />
                  </div>
                </div>
                
                <div className="bg-slate-50 rounded-xl p-3 flex gap-4 pl-3 mt-auto border border-slate-100">
                  <div className="flex flex-col items-center justify-center px-3 py-1 bg-white rounded-lg shadow-sm border border-slate-100">
                    <span className="text-xs font-bold text-red-500 uppercase">Oct</span>
                    <span className="text-xl font-bold text-slate-900">12</span>
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="flex items-center gap-2 text-slate-900 mb-1">
                      <Clock className="w-4 h-4 text-slate-400" />
                      <span className="text-sm font-medium">10:30 AM - 11:00 AM</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      <span className="text-xs font-medium">West Wing, Room 402</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Appointment Card 2 */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 hover:border-emerald-300 transition-colors group relative overflow-hidden flex flex-col">
                <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500 group-hover:w-1.5 transition-all"></div>
                
                <div className="flex justify-between items-start mb-4 pl-3">
                  <div>
                    <h4 className="font-bold text-slate-900">Dr. Marcus Webb</h4>
                    <p className="text-sm text-slate-500">General Practice</p>
                  </div>
                  <div className="bg-emerald-50 p-2 rounded-lg text-emerald-600">
                    <Stethoscope className="w-5 h-5" />
                  </div>
                </div>
                
                <div className="bg-slate-50 rounded-xl p-3 flex gap-4 pl-3 mt-auto border border-slate-100">
                  <div className="flex flex-col items-center justify-center px-3 py-1 bg-white rounded-lg shadow-sm border border-slate-100">
                    <span className="text-xs font-bold text-blue-600 uppercase">Nov</span>
                    <span className="text-xl font-bold text-slate-900">05</span>
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="flex items-center gap-2 text-slate-900 mb-1">
                      <Video className="w-4 h-4 text-slate-400" />
                      <span className="text-sm font-medium">02:15 PM - 02:45 PM</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500">
                      <Laptop className="w-4 h-4 text-slate-400" />
                      <span className="text-xs font-medium">Telehealth Consult</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Recent Visits / Triage History */}
          <section className="col-span-1 md:col-span-4 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-slate-900">Recent Visits</h3>
            </div>
            
            <div className="bg-white rounded-2xl p-2 shadow-sm border border-slate-200 flex-1 flex flex-col gap-1">
              
              {loading ? (
                <div className="p-8 text-center text-slate-500 text-sm">Loading recent visits...</div>
              ) : reports.length > 0 ? (
                reports.map((report) => (
                  <div key={report.id} className="p-3 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer flex gap-3 items-center border border-transparent hover:border-slate-100">
                    <div className="bg-blue-50 p-2.5 rounded-full text-blue-600 flex-shrink-0">
                      <Bot className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-0.5">
                        <h4 className="text-sm font-semibold text-slate-900 truncate">AI Triage</h4>
                        <span className="text-xs font-medium text-slate-400 flex-shrink-0">
                          {new Date(report.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          report.urgency_level === 'High' ? 'bg-red-100 text-red-700' :
                          report.urgency_level === 'Medium' ? 'bg-amber-100 text-amber-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {report.urgency_level} Risk
                        </span>
                        <span className="text-xs text-slate-500 truncate">{report.symptoms}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <>
                  {/* Fallback Hardcoded Demo Data */}
                  <div className="p-3 bg-slate-50/50 rounded-xl flex gap-3 items-center mb-2 border border-slate-100 border-dashed">
                    <div className="flex-1 text-center py-2">
                      <p className="text-xs font-medium text-slate-400 mb-1">Your Supabase Database is empty.</p>
                      <p className="text-[10px] text-slate-400">Showing demo placeholders below.</p>
                    </div>
                  </div>
                  {/* History Item 1 */}
                  <div className="p-3 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer flex gap-3 items-center border border-transparent hover:border-slate-100">
                    <div className="bg-emerald-50 p-2.5 rounded-full text-emerald-600 flex-shrink-0">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-0.5">
                        <h4 className="text-sm font-semibold text-slate-900 truncate">Annual Checkup</h4>
                        <span className="text-xs font-medium text-slate-400 flex-shrink-0">Sep 14</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-700 rounded text-[10px] font-bold uppercase tracking-wider">Completed</span>
                        <span className="text-xs text-slate-500 truncate">All vitals normal</span>
                      </div>
                    </div>
                  </div>

                  {/* History Item 2 */}
                  <div className="p-3 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer flex gap-3 items-center border border-transparent hover:border-slate-100">
                    <div className="bg-blue-50 p-2.5 rounded-full text-blue-600 flex-shrink-0">
                      <Bot className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-0.5">
                        <h4 className="text-sm font-semibold text-slate-900 truncate">AI Triage: Headache</h4>
                        <span className="text-xs font-medium text-slate-400 flex-shrink-0">Aug 02</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded text-[10px] font-bold uppercase tracking-wider">Low Risk</span>
                        <span className="text-xs text-slate-500 truncate">Advised rest & hydration</span>
                      </div>
                    </div>
                  </div>

                  {/* History Item 3 */}
                  <div className="p-3 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer flex gap-3 items-center border border-transparent hover:border-slate-100">
                    <div className="bg-slate-100 p-2.5 rounded-full text-slate-500 flex-shrink-0">
                      <Pill className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-0.5">
                        <h4 className="text-sm font-semibold text-slate-900 truncate">Prescription Refill</h4>
                        <span className="text-xs font-medium text-slate-400 flex-shrink-0">Jul 28</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-bold uppercase tracking-wider">Processed</span>
                        <span className="text-xs text-slate-500 truncate">Sent to Main Pharmacy</span>
                      </div>
                    </div>
                  </div>
                </>
              )}

              <button className="mt-auto w-full py-2.5 text-center text-blue-600 text-sm font-semibold hover:bg-slate-50 rounded-xl transition-colors">
                View Full History
              </button>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
