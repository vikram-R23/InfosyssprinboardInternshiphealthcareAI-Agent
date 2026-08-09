import { 
  LayoutDashboard, 
  CalendarDays, 
  ClipboardList, 
  User, 
  Settings, 
  LogOut, 
  Search, 
  Calendar, 
  Filter, 
  Stethoscope, 
  Bone, 
  ShieldCheck,
  HeartPulse
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function MedicalRecords() {
  return (
    <div className="bg-slate-50 text-slate-900 font-sans antialiased overflow-x-hidden">
      <div className="flex h-screen overflow-hidden">
        
        {/* SideNavBar Component (Desktop) */}
        <nav className="fixed left-0 top-0 h-screen w-64 bg-white shadow-sm flex-col p-4 border-r border-slate-200 transition-all duration-200 ease-in-out z-40 hidden md:flex">
          
          {/* Header */}
          <div className="mb-8 mt-2 px-2 flex items-center gap-3">
            <img 
              alt="Patient Avatar" 
              className="w-10 h-10 rounded-full object-cover border border-slate-200 shadow-sm" 
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" 
            />
            <div>
              <h2 className="text-sm font-bold text-blue-600">Welcome back</h2>
              <p className="text-xs font-medium text-slate-500">Health ID: #8821</p>
            </div>
          </div>
          
          {/* Main Tabs */}
          <ul className="flex flex-col gap-1 flex-grow">
            <li>
              <Link to="/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all font-medium text-sm">
                <LayoutDashboard className="w-5 h-5" />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/book" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all font-medium text-sm">
                <CalendarDays className="w-5 h-5" />
                <span>Appointments</span>
              </Link>
            </li>
            <li>
              {/* Active Tab */}
              <Link to="/records" className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-blue-50 text-blue-700 font-bold shadow-sm text-sm">
                <ClipboardList className="w-5 h-5 fill-blue-100" />
                <span>Records</span>
              </Link>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all font-medium text-sm">
                <User className="w-5 h-5" />
                <span>Profile</span>
              </a>
            </li>
          </ul>
          
          {/* CTA */}
          <div className="mt-auto mb-6">
            <Link to="/chat" className="w-full bg-blue-600 text-white py-2.5 rounded-xl font-medium text-sm hover:bg-blue-700 transition-colors shadow-sm flex items-center justify-center gap-2">
              <HeartPulse className="w-4 h-4" />
              Start Symptom Check
            </Link>
          </div>
          
          {/* Footer Tabs */}
          <ul className="flex flex-col gap-1 pt-4 border-t border-slate-100">
            <li>
              <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-500 hover:text-slate-900 transition-all font-medium text-sm">
                <Settings className="w-5 h-5" />
                <span>Settings</span>
              </a>
            </li>
            <li>
              <Link to="/" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-500 hover:text-slate-900 transition-all font-medium text-sm">
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Main Content Area */}
        <main className="flex-1 md:ml-64 p-4 md:p-8 overflow-y-auto h-screen relative w-full max-w-6xl mx-auto pb-24 md:pb-8">
          
          <header className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-1.5 tracking-tight">Medical History</h1>
            <p className="text-slate-500 text-sm md:text-base">Review your past visits, reported symptoms, and clinical reports.</p>
          </header>

          {/* Tools / Filters */}
          <section className="mb-10 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-white p-4 md:p-5 rounded-2xl shadow-sm border border-slate-200">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                type="text"
                placeholder="Search records by symptom or department..." 
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-slate-900 placeholder:text-slate-400"
              />
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-200 rounded-xl bg-white text-slate-600 font-medium text-sm hover:border-blue-500 hover:text-blue-600 transition-colors shadow-sm">
                <Calendar className="w-4 h-4" />
                Date
              </button>
              <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-200 rounded-xl bg-white text-slate-600 font-medium text-sm hover:border-blue-500 hover:text-blue-600 transition-colors shadow-sm">
                <Filter className="w-4 h-4" />
                Filters
              </button>
            </div>
          </section>

          {/* Timeline List */}
          <section className="space-y-6 relative before:absolute before:inset-y-0 before:left-[23px] before:w-0.5 before:bg-slate-200 hidden md:block">
            
            {/* Visit 1 */}
            <div className="relative flex items-start gap-6 group">
              <div className="relative z-10 w-12 h-12 rounded-full bg-white border-2 border-blue-500 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform duration-300">
                <Stethoscope className="text-blue-600 w-5 h-5" />
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm flex-1 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border border-slate-200 hover:shadow-md transition-all">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">Oct 12, 2023</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                    <span className="text-sm font-bold text-blue-600">Internal Medicine</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">General Consultation</h3>
                  <p className="text-slate-500 text-sm">Symptoms: Persistent headache, mild vision changes</p>
                </div>
                <button className="px-5 py-2.5 border border-blue-200 text-blue-600 rounded-xl font-medium text-sm hover:bg-blue-50 transition-colors whitespace-nowrap shadow-sm">
                  View Full Report
                </button>
              </div>
            </div>

            {/* Visit 2 */}
            <div className="relative flex items-start gap-6 group">
              <div className="relative z-10 w-12 h-12 rounded-full bg-slate-50 border-2 border-slate-200 flex items-center justify-center shrink-0 group-hover:border-emerald-500 transition-colors duration-300">
                <Bone className="text-slate-400 group-hover:text-emerald-500 transition-colors duration-300 w-5 h-5" />
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm flex-1 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border border-slate-200 hover:shadow-md transition-all">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">Aug 05, 2023</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                    <span className="text-sm font-bold text-blue-600">Orthopedics</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">Joint Pain Evaluation</h3>
                  <p className="text-slate-500 text-sm">Symptoms: Right knee pain during exercise, slight swelling</p>
                  <div className="mt-3 inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider">
                    <ShieldCheck className="w-3.5 h-3.5" /> AI Verified Summary
                  </div>
                </div>
                <button className="px-5 py-2.5 border border-blue-200 text-blue-600 rounded-xl font-medium text-sm hover:bg-blue-50 transition-colors whitespace-nowrap shadow-sm">
                  View Full Report
                </button>
              </div>
            </div>

          </section>

          {/* Mobile Fallback for Timeline (Since timeline vertical line was hidden on mobile in the original HTML) */}
          <section className="space-y-4 md:hidden">
            {/* Visit 1 */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 flex flex-col gap-4">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Stethoscope className="text-blue-600 w-4 h-4" />
                  <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">Oct 12, 2023</span>
                  <span className="text-xs font-bold text-blue-600 ml-auto">Internal Med</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1">General Consultation</h3>
                <p className="text-slate-500 text-xs">Persistent headache, mild vision changes</p>
              </div>
              <button className="w-full px-4 py-2 border border-slate-200 text-blue-600 rounded-lg font-medium text-sm hover:bg-blue-50 transition-colors">
                View Report
              </button>
            </div>

            {/* Visit 2 */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 flex flex-col gap-4">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Bone className="text-slate-400 w-4 h-4" />
                  <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">Aug 05, 2023</span>
                  <span className="text-xs font-bold text-blue-600 ml-auto">Orthopedics</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1">Joint Pain Evaluation</h3>
                <p className="text-slate-500 text-xs">Right knee pain during exercise, slight swelling</p>
                <div className="mt-2 inline-flex items-center gap-1 bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider w-fit">
                  <ShieldCheck className="w-3 h-3" /> AI Verified
                </div>
              </div>
              <button className="w-full px-4 py-2 border border-slate-200 text-blue-600 rounded-lg font-medium text-sm hover:bg-blue-50 transition-colors">
                View Report
              </button>
            </div>
          </section>

        </main>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-md shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-50 flex justify-around items-center h-16 px-4 border-t border-slate-200">
        <Link to="/dashboard" className="flex flex-col items-center justify-center text-slate-500 hover:text-slate-900">
          <LayoutDashboard className="w-5 h-5" />
          <span className="text-[10px] mt-1 font-medium">Home</span>
        </Link>
        <Link to="/book" className="flex flex-col items-center justify-center text-slate-500 hover:text-slate-900">
          <CalendarDays className="w-5 h-5" />
          <span className="text-[10px] mt-1 font-medium">Book</span>
        </Link>
        <Link to="/records" className="flex flex-col items-center justify-center text-blue-600">
          <ClipboardList className="w-5 h-5 fill-blue-100" />
          <span className="text-[10px] mt-1 font-bold">Records</span>
        </Link>
        <a href="#" className="flex flex-col items-center justify-center text-slate-500 hover:text-slate-900">
          <User className="w-5 h-5" />
          <span className="text-[10px] mt-1 font-medium">Profile</span>
        </a>
      </nav>
      
    </div>
  );
}
