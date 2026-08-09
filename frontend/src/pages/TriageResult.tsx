import { 
  Info, 
  UserCircle, 
  CheckCircle2, 
  AlertTriangle, 
  Stethoscope, 
  Brain, 
  ShieldCheck, 
  CalendarDays, 
  Download, 
  BookmarkPlus 
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TriageResult() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-50 text-slate-900">
      
      {/* TopNavBar */}
      <nav className="sticky top-0 w-full bg-white/80 backdrop-blur-xl shadow-sm z-50 border-b border-slate-200 transition-all duration-300">
        <div className="flex justify-between items-center w-full px-6 md:px-10 py-4 max-w-7xl mx-auto">
          <Link to="/" className="text-xl font-bold text-blue-600 tracking-tight flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-emerald-500" />
            CareTriage AI
          </Link>
          <div className="flex items-center gap-6 text-slate-500">
            <button aria-label="Information" className="cursor-pointer hover:text-blue-600 transition-colors duration-200">
              <Info className="w-6 h-6" />
            </button>
            <button aria-label="User Profile" className="cursor-pointer hover:text-blue-600 transition-colors duration-200">
              <UserCircle className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Canvas */}
      <main className="flex-grow w-full max-w-5xl mx-auto px-6 md:px-10 py-12 md:py-20">
        
        {/* Header Area */}
        <header className="mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <p className="text-sm font-medium text-blue-600 uppercase tracking-widest mb-2 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            Assessment Complete
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">Your Triage Results</h1>
        </header>

        {/* Primary Result Card */}
        <div className="bg-white rounded-3xl shadow-sm p-8 md:p-12 flex flex-col gap-10 md:gap-14 border border-slate-200 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150 fill-mode-both">
          
          {/* Top Section: Urgency & Department */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-b border-slate-200 pb-10">
            <div className="flex flex-col gap-4">
              {/* Urgency Badge */}
              <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full w-fit">
                <AlertTriangle className="w-5 h-5" />
                <span className="text-sm font-bold tracking-wide">Medium Urgency</span>
              </div>
              <h2 className="text-3xl font-bold text-slate-900">General Practice Evaluation</h2>
            </div>
            
            <div className="flex items-center gap-4 bg-slate-50 p-4 md:p-5 rounded-2xl border border-slate-100 shadow-sm w-full md:w-auto">
              <div className="bg-blue-100 p-3.5 rounded-full text-blue-600 flex-shrink-0">
                <Stethoscope className="w-8 h-8" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Recommended Department</p>
                <p className="text-xl font-bold text-slate-900 mt-0.5">Internal Medicine</p>
              </div>
            </div>
          </div>

          {/* Middle Section: AI Reasoning (Asymmetric Bento layout) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Main Reasoning Block */}
            <div className="md:col-span-2 bg-slate-50 rounded-2xl p-8 border border-slate-100 relative overflow-hidden group hover:shadow-md transition-all duration-300">
              {/* Decorative subtle background shape */}
              <div className="absolute -top-10 -right-10 w-48 h-48 bg-slate-200/50 rounded-full blur-3xl -z-0 pointer-events-none group-hover:bg-blue-100/50 transition-colors duration-500"></div>
              
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-3 mb-4 relative z-10">
                <Brain className="w-7 h-7 text-blue-600" />
                AI Analysis Reasoning
              </h3>
              <p className="text-slate-600 leading-relaxed relative z-10 max-w-prose">
                Based on your reported symptoms of persistent headache and mild vision changes, a professional evaluation is recommended to rule out underlying causes. While these symptoms can often be benign, their combination warrants a comprehensive check-up by a general practitioner to ensure your continued well-being.
              </p>
            </div>

            {/* Supporting Metric Block */}
            <div className="bg-white rounded-2xl p-8 flex flex-col justify-center items-center text-center gap-3 border border-slate-200 shadow-sm">
              <div className="relative mb-2">
                <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
                  <path className="text-slate-100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3"></path>
                  <path className="text-emerald-500" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="85, 100" strokeLinecap="round" strokeWidth="3"></path>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <ShieldCheck className="w-8 h-8 text-emerald-500" />
                </div>
              </div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Confidence Match</h4>
              <p className="text-xl font-bold text-slate-900">High Reliability</p>
            </div>
            
          </div>

          {/* Bottom Section: Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
            <button className="w-full sm:w-auto bg-blue-600 text-white font-semibold px-8 py-4 rounded-xl shadow-sm hover:shadow-md hover:bg-blue-700 transition-all duration-200 flex justify-center items-center gap-2">
              <CalendarDays className="w-5 h-5" />
              Book Appointment
            </button>
            <button className="w-full sm:w-auto bg-white border border-slate-200 text-blue-600 font-semibold px-8 py-4 rounded-xl hover:bg-slate-50 transition-all duration-200 flex justify-center items-center gap-2">
              <Download className="w-5 h-5" />
              Download Summary
            </button>
            <div className="flex-grow hidden sm:block"></div>
            <button className="w-full sm:w-auto bg-transparent text-slate-500 font-medium px-8 py-4 rounded-xl hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 flex justify-center items-center gap-2">
              <BookmarkPlus className="w-5 h-5" />
              Save to Records
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}
