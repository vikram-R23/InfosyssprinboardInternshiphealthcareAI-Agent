import { 
  Stethoscope, 
  Plus, 
  LayoutDashboard, 
  CalendarDays, 
  ClipboardList, 
  Mail, 
  FlaskConical, 
  HelpCircle, 
  LogOut, 
  Menu, 
  ShieldCheck, 
  Calendar, 
  IdCard, 
  User, 
  HeartPulse, 
  Activity, 
  TrendingUp, 
  Wind, 
  Thermometer, 
  Brain, 
  Sparkles, 
  AlertTriangle, 
  History, 
  Pill, 
  Syringe, 
  Clock 
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PatientReport() {
  return (
    <div className="bg-slate-50 text-slate-900 font-sans antialiased min-h-screen flex">
      
      {/* SideNavBar (Desktop) */}
      <nav className="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 bg-white py-8 px-4 shadow-sm z-50 border-r border-slate-200">
        
        {/* Header */}
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
            <Stethoscope className="text-blue-600 w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-blue-600 tracking-tight">HealthPulse</h1>
            <p className="text-xs font-medium text-slate-500">Clinical Portal</p>
          </div>
        </div>
        
        {/* CTA */}
        <button className="w-full bg-blue-600 text-white font-medium text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2 mb-8 shadow-sm hover:bg-blue-700 transition-colors">
          <Plus className="w-5 h-5" />
          New Consultation
        </button>
        
        {/* Navigation Links */}
        <div className="flex-1 space-y-1">
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-colors">
            <LayoutDashboard className="w-5 h-5" />
            Overview
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-colors">
            <CalendarDays className="w-5 h-5" />
            Appointments
          </a>
          <a href="#" aria-current="page" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold bg-blue-50 text-blue-700 shadow-sm transition-colors">
            <ClipboardList className="w-5 h-5" />
            Patient Records
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-colors">
            <Mail className="w-5 h-5" />
            Messages
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-colors">
            <FlaskConical className="w-5 h-5" />
            Laboratory
          </a>
        </div>
        
        {/* Footer Links */}
        <div className="mt-auto space-y-1 pt-6 border-t border-slate-200">
          <a href="#" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-colors">
            <HelpCircle className="w-5 h-5" />
            Help Center
          </a>
          <Link to="/" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-colors">
            <LogOut className="w-5 h-5" />
            Logout
          </Link>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 bg-slate-50 min-h-screen pb-10">
        
        {/* Mobile Header (Hidden on Desktop) */}
        <header className="md:hidden flex items-center justify-between p-4 bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-slate-200 shadow-sm">
          <div className="flex items-center gap-2">
            <Stethoscope className="text-blue-600 w-6 h-6" />
            <span className="text-xl font-bold text-blue-600 tracking-tight">HealthPulse</span>
          </div>
          <button className="text-slate-500 p-2 hover:bg-slate-100 rounded-full">
            <Menu className="w-6 h-6" />
          </button>
        </header>

        <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8">
          
          {/* Top Header: Patient Profile & Vitals */}
          <section className="bg-white rounded-2xl shadow-sm p-6 md:p-8 flex flex-col xl:flex-row gap-8 items-start xl:items-center justify-between border border-slate-200 relative overflow-hidden">
            {/* Decorative Accent */}
            <div className="absolute top-0 left-0 w-2 h-full bg-blue-600"></div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 w-full xl:w-auto">
              <img 
                alt="Robert Chen" 
                className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover shadow-sm border-2 border-slate-100 shrink-0" 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" 
              />
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight m-0">Robert Chen</h2>
                  <span className="bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full font-bold text-[11px] uppercase tracking-wider border border-emerald-200 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Verified
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500 mt-2 font-medium">
                  <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> 68 yrs (DOB: 10/12/1955)</span>
                  <span className="hidden md:inline text-slate-300">•</span>
                  <span className="flex items-center gap-1.5"><IdCard className="w-4 h-4" /> ID: PT-882419</span>
                  <span className="hidden md:inline text-slate-300">•</span>
                  <span className="flex items-center gap-1.5"><User className="w-4 h-4" /> Male</span>
                </div>
              </div>
            </div>

            {/* Vitals Strip */}
            <div className="w-full xl:w-auto grid grid-cols-2 md:grid-cols-4 gap-4 xl:gap-6 bg-slate-50 p-5 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <HeartPulse className="w-4 h-4 text-red-500" /> Heart Rate
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-slate-900">82</span>
                  <span className="text-sm font-medium text-slate-500">bpm</span>
                </div>
              </div>
              
              <div className="flex flex-col border-l-0 md:border-l border-slate-200 pl-0 md:pl-4 xl:pl-6">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-blue-600" /> Blood Pressure
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-red-600">145/90</span>
                  <span className="text-sm font-medium text-slate-500">mmHg</span>
                </div>
                <span className="text-[11px] text-red-600 mt-1 font-bold flex items-center gap-1 uppercase tracking-wider">
                  <TrendingUp className="w-3 h-3" /> Elevated
                </span>
              </div>
              
              <div className="flex flex-col border-l-0 md:border-l border-slate-200 pl-0 md:pl-4 xl:pl-6 mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Wind className="w-4 h-4 text-emerald-500" /> SpO2
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-slate-900">98</span>
                  <span className="text-sm font-medium text-slate-500">%</span>
                </div>
              </div>
              
              <div className="flex flex-col border-l-0 md:border-l border-slate-200 pl-0 md:pl-4 xl:pl-6 mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Thermometer className="w-4 h-4 text-orange-500" /> Temp
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-slate-900">98.6</span>
                  <span className="text-sm font-medium text-slate-500">°F</span>
                </div>
              </div>
            </div>
          </section>

          {/* Main Bento Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            
            {/* AI Pre-Consultation Summary (Spans 2 columns on lg) */}
            <div className="lg:col-span-2 flex flex-col space-y-6 lg:space-y-8">
              
              <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-slate-200 relative overflow-hidden group hover:shadow-md transition-shadow duration-300">
                {/* AI Glow Effect Background */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 pb-4 border-b border-slate-100 relative z-10 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center border border-blue-100">
                      <Brain className="text-blue-600 w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 m-0 tracking-tight">AI Pre-Consultation Triage</h3>
                  </div>
                  <span className="bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-indigo-100 flex items-center gap-1.5 w-fit">
                    <Sparkles className="w-4 h-4 animate-pulse" /> Synthesized
                  </span>
                </div>
                
                <div className="space-y-8 relative z-10">
                  {/* Key Findings Grid */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 mb-4 uppercase tracking-wider">Primary Indicators</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      
                      <div className="bg-red-50 border border-red-100 rounded-xl p-5 flex gap-3.5">
                        <AlertTriangle className="text-red-500 w-5 h-5 shrink-0 mt-0.5" />
                        <div>
                          <h5 className="text-sm font-bold text-red-700 m-0">Potential ACS Risk</h5>
                          <p className="text-sm text-slate-600 mt-1.5 leading-snug">Combination of radiating chest pain and elevated BP warrants immediate cardiac evaluation.</p>
                        </div>
                      </div>
                      
                      <div className="bg-slate-50 rounded-xl p-5 flex gap-3.5 border border-slate-200">
                        <History className="text-blue-600 w-5 h-5 shrink-0 mt-0.5" />
                        <div>
                          <h5 className="text-sm font-bold text-slate-900 m-0">History of Hypertension</h5>
                          <p className="text-sm text-slate-600 mt-1.5 leading-snug">Documented non-compliance with Lisinopril 20mg over the last 3 months.</p>
                        </div>
                      </div>
                      
                    </div>
                  </div>
                  
                  {/* Clinical Reasoning */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 mb-3 uppercase tracking-wider">AI Clinical Reasoning</h4>
                    <div className="bg-slate-50 rounded-xl p-5 border-l-4 border-blue-600 text-sm text-slate-700 leading-relaxed font-medium shadow-sm">
                      Patient presents with acute onset chest pain described as "tightness" radiating to the left shoulder, beginning approximately 2 hours prior to arrival. Concurrent shortness of breath noted. Given the patient's age (68), documented history of hypertension, and current elevated blood pressure (145/90), the presentation is highly suggestive of Acute Coronary Syndrome (ACS). Current vitals show stable oxygen saturation (98%) and normal temperature. <strong>Recommendation:</strong> Stat ECG and Troponin levels.
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button className="bg-blue-600 text-white font-semibold text-sm px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors shadow-sm">
                      Acknowledge & Order ECG
                    </button>
                    <button className="bg-white text-blue-600 border border-slate-200 font-semibold text-sm px-6 py-3 rounded-xl hover:bg-slate-50 transition-colors shadow-sm">
                      View Full AI Transcript
                    </button>
                  </div>
                </div>
              </div>

              {/* Past Medical History Snippet (Bento block) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                
                <div className="bg-white rounded-2xl shadow-sm p-6 border border-slate-200">
                  <div className="flex items-center gap-2 mb-5 text-slate-500">
                    <Pill className="w-5 h-5" />
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Current Medications</h4>
                  </div>
                  <ul className="space-y-4 text-sm text-slate-700 font-medium">
                    <li className="flex justify-between items-center pb-3 border-b border-slate-100">
                      <span>Lisinopril 20mg</span>
                      <span className="text-slate-400 text-xs font-bold uppercase">Daily</span>
                    </li>
                    <li className="flex justify-between items-center pb-3 border-b border-slate-100">
                      <span>Atorvastatin 40mg</span>
                      <span className="text-slate-400 text-xs font-bold uppercase">Nightly</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>Aspirin 81mg</span>
                      <span className="text-slate-400 text-xs font-bold uppercase">Daily</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white rounded-2xl shadow-sm p-6 border border-slate-200">
                  <div className="flex items-center gap-2 mb-5 text-slate-500">
                    <Syringe className="w-5 h-5" />
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Allergies</h4>
                  </div>
                  <div className="bg-red-50 border border-red-100 rounded-xl p-4 flex items-start gap-3">
                    <AlertTriangle className="text-red-500 w-5 h-5 shrink-0" />
                    <div>
                      <span className="font-bold text-red-700 block text-sm">Penicillin</span>
                      <span className="text-xs text-slate-600 mt-1 block">Anaphylaxis (Recorded 2015)</span>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>

            {/* Symptom Timeline (Side Column) */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm p-6 border border-slate-200 h-full">
                <div className="flex items-center gap-2.5 mb-8 pb-4 border-b border-slate-100">
                  <Clock className="text-slate-400 w-5 h-5" />
                  <h3 className="text-xl font-bold text-slate-900 m-0 tracking-tight">Symptom Timeline</h3>
                </div>
                
                <div className="relative border-l-2 border-slate-100 ml-3 space-y-8 mt-4">
                  
                  {/* Timeline Item 1 */}
                  <div className="relative pl-6">
                    <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-red-500 border-4 border-white shadow-sm ring-1 ring-slate-200"></div>
                    <div className="mb-2">
                      <span className="text-[11px] text-red-500 font-bold uppercase tracking-wider">Right Now</span>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 shadow-sm">
                      <h5 className="text-sm font-bold text-slate-900 m-0">Patient Arrival in Triage</h5>
                      <p className="text-xs text-slate-600 mt-1.5 leading-snug font-medium">Vitals recorded. Patient appears anxious and diaphoretic.</p>
                    </div>
                  </div>
                  
                  {/* Timeline Item 2 */}
                  <div className="relative pl-6">
                    <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-blue-500 border-4 border-white shadow-sm ring-1 ring-slate-200"></div>
                    <div className="mb-2">
                      <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">2 Hours Ago (08:30 AM)</span>
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-slate-900 m-0">Onset of Chest Pain</h5>
                      <p className="text-xs text-slate-600 mt-1.5 leading-snug font-medium">Described as "heavy pressure" in the center of the chest. Did not resolve with rest.</p>
                    </div>
                  </div>
                  
                  {/* Timeline Item 3 */}
                  <div className="relative pl-6">
                    <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-slate-300 border-4 border-white shadow-sm ring-1 ring-slate-200"></div>
                    <div className="mb-2">
                      <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">4 Hours Ago (06:30 AM)</span>
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-slate-900 m-0">Mild Shortness of Breath</h5>
                      <p className="text-xs text-slate-600 mt-1.5 leading-snug font-medium">Noticed upon waking up. Initially attributed to indigestion.</p>
                    </div>
                  </div>
                  
                  {/* Timeline Item 4 */}
                  <div className="relative pl-6">
                    <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-slate-300 border-4 border-white shadow-sm ring-1 ring-slate-200"></div>
                    <div className="mb-2">
                      <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Yesterday Evening</span>
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-slate-900 m-0">General Fatigue</h5>
                      <p className="text-xs text-slate-600 mt-1.5 leading-snug font-medium">Reported feeling unusually tired after minimal exertion (walking up stairs).</p>
                    </div>
                  </div>
                  
                </div>
                
                <div className="mt-10 pt-6 border-t border-slate-100 text-center">
                  <button className="text-blue-600 font-bold text-xs hover:underline flex items-center justify-center gap-1.5 w-full uppercase tracking-wider">
                    <History className="w-4 h-4" /> Load Older History
                  </button>
                </div>
                
              </div>
            </div>
            
          </div>
        </div>
      </main>
      
    </div>
  );
}
