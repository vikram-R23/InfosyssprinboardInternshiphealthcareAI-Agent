import { 
  Shield, 
  LayoutDashboard, 
  Cpu, 
  ClipboardList, 
  Mail, 
  FlaskConical, 
  HelpCircle, 
  LogOut, 
  FileText, 
  Search, 
  Activity, 
  Network, 
  CalendarDays, 
  Terminal, 
  Filter, 
  Download, 
  CheckCircle2 
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AgentMonitoring() {
  return (
    <div className="bg-slate-50 text-slate-900 font-sans min-h-screen flex antialiased">
      
      {/* SideNavBar */}
      <nav className="bg-white text-blue-600 h-screen w-64 fixed left-0 top-0 shadow-sm flex flex-col py-8 px-4 z-50 border-r border-slate-200">
        
        <div className="flex items-center gap-3 mb-8 px-2">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-blue-600 leading-tight tracking-tight">HealthPulse</h1>
            <span className="text-xs text-slate-500 font-medium">Clinical Portal</span>
          </div>
        </div>
        
        <button className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-xl font-bold mb-8 hover:bg-blue-700 transition-colors shadow-sm text-sm">
          New Consultation
        </button>
        
        <ul className="flex-1 space-y-1">
          <li>
            <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-colors text-sm font-medium">
              <LayoutDashboard className="w-5 h-5" />
              <span>Overview</span>
            </a>
          </li>
          <li>
            <a href="#" aria-current="page" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-50 text-blue-700 font-bold shadow-sm text-sm transition-colors">
              <Cpu className="w-5 h-5" />
              <span>Agent Monitoring</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-colors text-sm font-medium">
              <ClipboardList className="w-5 h-5" />
              <span>Patient Records</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-colors text-sm font-medium">
              <Mail className="w-5 h-5" />
              <span>Messages</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-colors text-sm font-medium">
              <FlaskConical className="w-5 h-5" />
              <span>Laboratory</span>
            </a>
          </li>
        </ul>
        
        <div className="mt-auto border-t border-slate-200 pt-4">
          <ul className="space-y-1">
            <li>
              <a href="#" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-colors text-sm font-medium">
                <HelpCircle className="w-5 h-5" />
                <span>Help Center</span>
              </a>
            </li>
            <li>
              <Link to="/" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-colors text-sm font-medium">
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <main className="ml-64 flex-1 p-8 lg:p-10 flex flex-col gap-10 min-h-screen">
        
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-1.5 tracking-tight">CareTriage AI</h2>
            <p className="text-slate-500 text-sm md:text-base font-medium">Real-time Agent Execution Pipeline</p>
          </div>
          <div className="flex gap-4">
            <span className="px-3.5 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 border border-emerald-100 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              System Operational
            </span>
          </div>
        </header>

        {/* Pipeline Visualization */}
        <section className="bg-white rounded-2xl p-8 lg:p-10 shadow-sm border border-slate-200 relative overflow-hidden">
          {/* Animated Connecting Line */}
          <div className="absolute top-1/2 left-10 right-10 h-1.5 bg-slate-100 -translate-y-1/2 z-0 rounded-full overflow-hidden">
            <div 
              className="h-full w-1/2 bg-gradient-to-r from-emerald-400 via-blue-500 to-emerald-400 opacity-80" 
              style={{ backgroundSize: '200% 100%', animation: 'flow 2s linear infinite' }}
            ></div>
          </div>
          
          <div className="relative z-10 flex justify-between items-center">
            
            {/* Node 1: Intake */}
            <div className="flex flex-col items-center gap-3 group">
              <div className="w-14 h-14 rounded-full bg-white border-2 border-emerald-500 flex items-center justify-center shadow-sm">
                <FileText className="text-emerald-500 w-6 h-6" />
              </div>
              <span className="text-sm font-bold text-slate-900">Intake</span>
              <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider">Success</span>
            </div>
            
            {/* Node 2: Research */}
            <div className="flex flex-col items-center gap-3 group">
              <div className="w-14 h-14 rounded-full bg-white border-2 border-emerald-500 flex items-center justify-center shadow-sm">
                <Search className="text-emerald-500 w-6 h-6" />
              </div>
              <span className="text-sm font-bold text-slate-900">Research</span>
              <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider">Success</span>
            </div>
            
            {/* Node 3: Analysis */}
            <div className="flex flex-col items-center gap-3 group relative">
              <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md relative z-10">
                <Activity className="w-6 h-6" />
              </div>
              {/* Pulse Ring effect */}
              <div className="absolute top-0 left-0 w-14 h-14 rounded-full bg-blue-400/50 animate-ping opacity-75"></div>
              <span className="text-sm font-bold text-slate-900 mt-3">Analysis</span>
              <span className="text-[10px] text-blue-600 font-bold uppercase tracking-wider">Processing</span>
            </div>
            
            {/* Node 4: Triage */}
            <div className="flex flex-col items-center gap-3 opacity-50 grayscale group">
              <div className="w-14 h-14 rounded-full bg-white border-2 border-slate-300 flex items-center justify-center shadow-sm">
                <Network className="text-slate-400 w-6 h-6" />
              </div>
              <span className="text-sm font-bold text-slate-400">Triage</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Pending</span>
            </div>
            
            {/* Node 5: Appointment */}
            <div className="flex flex-col items-center gap-3 opacity-50 grayscale group">
              <div className="w-14 h-14 rounded-full bg-white border-2 border-slate-300 flex items-center justify-center shadow-sm">
                <CalendarDays className="text-slate-400 w-6 h-6" />
              </div>
              <span className="text-sm font-bold text-slate-400">Appointment</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Pending</span>
            </div>
            
            {/* Node 6: Report */}
            <div className="flex flex-col items-center gap-3 opacity-50 grayscale group">
              <div className="w-14 h-14 rounded-full bg-white border-2 border-slate-300 flex items-center justify-center shadow-sm">
                <FileText className="text-slate-400 w-6 h-6" />
              </div>
              <span className="text-sm font-bold text-slate-400">Report</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Pending</span>
            </div>
            
          </div>
        </section>

        {/* Live Execution Log */}
        <section className="bg-slate-900 rounded-2xl overflow-hidden shadow-lg flex-1 flex flex-col border border-slate-800">
          
          <div className="px-6 py-4 bg-slate-800/50 border-b border-slate-800 flex justify-between items-center">
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2 uppercase tracking-wider">
              <Terminal className="text-slate-400 w-4 h-4" />
              Live Execution Log
            </h3>
            <div className="flex gap-3">
              <button className="text-slate-400 hover:text-slate-100 transition-colors">
                <Filter className="w-4 h-4" />
              </button>
              <button className="text-slate-400 hover:text-slate-100 transition-colors">
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto flex-1 p-2">
            <table className="w-full text-left text-slate-300 border-collapse">
              <thead>
                <tr className="text-xs font-bold text-slate-500 border-b border-slate-800/50 uppercase tracking-wider">
                  <th className="py-3 px-4 font-bold">Timestamp</th>
                  <th className="py-3 px-4 font-bold">Agent</th>
                  <th className="py-3 px-4 font-bold">Action</th>
                  <th className="py-3 px-4 font-bold">Status</th>
                  <th className="py-3 px-4 font-bold text-right">Latency</th>
                </tr>
              </thead>
              <tbody className="font-mono text-xs leading-relaxed tracking-tight divide-y divide-slate-800/50">
                
                {/* Row 1: Processing (Highlight) */}
                <tr className="bg-blue-900/20 hover:bg-blue-900/30 transition-colors">
                  <td className="py-3.5 px-4 text-blue-400 whitespace-nowrap">[10:04:22]</td>
                  <td className="py-3.5 px-4 font-semibold text-slate-100">Analysis Agent</td>
                  <td className="py-3.5 px-4 text-slate-300">
                    <span className="text-blue-400 font-semibold mr-2">Thinking:</span>'Analyzing patient vitals vs history...'
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-blue-300 bg-blue-900/50 font-semibold border border-blue-800/50">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
                      Processing
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right text-blue-400">450ms</td>
                </tr>
                
                {/* Row 2: Success */}
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">[10:04:18]</td>
                  <td className="py-3.5 px-4 font-semibold text-slate-300">Research Agent</td>
                  <td className="py-3.5 px-4 text-slate-300">
                    <span className="text-emerald-400 font-semibold mr-2">Tool Call:</span>'fetch_medical_records'
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold">
                      <CheckCircle2 className="w-4 h-4" /> Success
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right text-slate-500">1.2s</td>
                </tr>
                
                {/* Row 3: Success */}
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">[10:04:15]</td>
                  <td className="py-3.5 px-4 font-semibold text-slate-300">Intake Agent</td>
                  <td className="py-3.5 px-4 text-slate-300">
                    <span className="text-slate-400 font-semibold mr-2">Action:</span>'Parsing user symptom report'
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold">
                      <CheckCircle2 className="w-4 h-4" /> Success
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right text-slate-500">200ms</td>
                </tr>
                
                {/* Row 4: Previous Request */}
                <tr className="hover:bg-slate-800/30 transition-colors opacity-60">
                  <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">[10:03:01]</td>
                  <td className="py-3.5 px-4 font-semibold text-slate-300">Report Agent</td>
                  <td className="py-3.5 px-4 text-slate-300">
                    <span className="text-slate-400 font-semibold mr-2">Action:</span>'Compiled clinical summary'
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold">
                      <CheckCircle2 className="w-4 h-4" /> Success
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right text-slate-500">890ms</td>
                </tr>
                
              </tbody>
            </table>
          </div>
          
          <div className="px-6 py-3.5 bg-slate-800/80 border-t border-slate-800 text-right">
            <span className="text-xs font-bold text-slate-400 flex items-center justify-end gap-2 uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Connected to TriageNode-A1
            </span>
          </div>
          
        </section>
        
        {/* CSS for custom animation */}
        <style>{`
          @keyframes flow {
            0% { background-position: 100% 0; }
            100% { background-position: -100% 0; }
          }
        `}</style>
        
      </main>
    </div>
  );
}
