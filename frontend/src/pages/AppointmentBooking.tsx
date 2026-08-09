import { 
  Menu, 
  LayoutDashboard, 
  Stethoscope, 
  CalendarDays, 
  ClipboardList, 
  Settings, 
  AlertCircle, 
  Star, 
  User, 
  Calendar, 
  CreditCard, 
  ArrowRight 
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AppointmentBooking() {
  return (
    <div className="text-slate-900 antialiased bg-slate-50 h-screen overflow-hidden flex flex-col md:flex-row font-sans">
      
      {/* Mobile Top Bar */}
      <div className="md:hidden bg-white/80 backdrop-blur-md fixed top-0 w-full z-50 flex justify-between items-center h-16 px-4 border-b border-slate-200 shadow-sm">
        <Link to="/" className="text-lg font-bold text-blue-600 tracking-tight">CareTriage AI</Link>
        <button className="text-blue-600 hover:bg-slate-100 p-2 rounded-full transition-colors">
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* SideNavBar (Desktop) */}
      <nav className="hidden md:flex flex-col p-4 space-y-2 bg-white shadow-sm h-screen w-64 fixed left-0 top-0 z-40 border-r border-slate-200">
        <div className="mb-8 mt-2 px-3">
          <h1 className="text-xl font-bold text-blue-600 tracking-tight">CareTriage AI</h1>
          <p className="text-xs font-medium text-slate-500 mt-1">Clinical Portal</p>
        </div>
        
        <div className="flex-1 space-y-1">
          <Link to="/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors font-medium text-sm">
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </Link>
          <Link to="/chat" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors font-medium text-sm">
            <Stethoscope className="w-5 h-5" />
            Symptom Checker
          </Link>
          
          {/* Active State */}
          <Link to="/book" className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-blue-50 text-blue-700 font-bold transition-colors text-sm">
            <CalendarDays className="w-5 h-5" />
            Appointments
          </Link>
          
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors font-medium text-sm">
            <ClipboardList className="w-5 h-5" />
            Medical Records
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors font-medium text-sm">
            <Settings className="w-5 h-5" />
            Settings
          </a>
        </div>
        
        <div className="mt-auto">
          <button className="w-full bg-red-500 text-white font-medium text-sm py-2.5 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2 shadow-sm">
            <AlertCircle className="w-4 h-4" />
            Emergency Help
          </button>
        </div>
      </nav>

      {/* Main Content Canvas */}
      <main className="flex-1 ml-0 md:ml-64 mt-16 md:mt-0 overflow-y-auto bg-slate-50 p-4 md:p-8 relative pb-24 md:pb-8">
        <div className="max-w-6xl mx-auto">
          <header className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-1.5 tracking-tight">Book an Appointment</h2>
            <p className="text-slate-500 text-sm md:text-base">Complete the steps below to schedule your consultation.</p>
          </header>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Column: Steps */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Step 1: Select Specialist */}
              <section className="bg-white rounded-2xl shadow-sm p-6 border border-slate-200">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">1</div>
                  <h3 className="text-xl font-bold text-slate-900">Select Specialist</h3>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Card 1 (Recommended) */}
                  <div className="border-2 border-blue-500 rounded-xl p-4 relative cursor-pointer hover:shadow-md transition-all bg-blue-50/30">
                    <div className="absolute -top-3 -right-3 bg-emerald-100 text-emerald-700 text-xs px-3 py-1 rounded-full font-bold shadow-sm border border-emerald-200">
                      AI Recommended
                    </div>
                    <div className="flex items-start gap-3">
                      <img 
                        className="w-14 h-14 rounded-full object-cover shadow-sm border border-slate-200" 
                        src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" 
                        alt="Dr. Sarah Jenkins"
                      />
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">Dr. Sarah Jenkins</h4>
                        <p className="text-xs text-slate-500 mt-0.5">Internal Medicine</p>
                        <div className="flex items-center gap-1 mt-1.5 text-blue-600">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <span className="text-xs font-bold">4.9</span>
                          <span className="text-slate-400 text-xs ml-1">(124 reviews)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Card 2 */}
                  <div className="border border-slate-200 rounded-xl p-4 cursor-pointer hover:border-blue-400 hover:shadow-sm transition-all bg-white opacity-80 hover:opacity-100">
                    <div className="flex items-start gap-3">
                      <img 
                        className="w-14 h-14 rounded-full object-cover shadow-sm border border-slate-200" 
                        src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" 
                        alt="Dr. Michael Chen"
                      />
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">Dr. Michael Chen</h4>
                        <p className="text-xs text-slate-500 mt-0.5">Cardiology</p>
                        <div className="flex items-center gap-1 mt-1.5 text-slate-500">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <span className="text-xs font-bold">4.8</span>
                          <span className="text-slate-400 text-xs ml-1">(89 reviews)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Step 2: Choose Date */}
              <section className="bg-white rounded-2xl shadow-sm p-6 border border-slate-200">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center font-bold text-sm">2</div>
                  <h3 className="text-xl font-bold text-slate-900">Choose Date</h3>
                </div>
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                  <div className="flex-shrink-0 w-20 p-3 rounded-xl border border-slate-200 text-center cursor-pointer hover:border-blue-500 transition-colors opacity-50">
                    <p className="text-xs text-slate-500 uppercase font-medium">Mon</p>
                    <p className="text-xl font-bold mt-1 text-slate-900">14</p>
                  </div>
                  <div className="flex-shrink-0 w-20 p-3 rounded-xl bg-blue-50 border-2 border-blue-500 text-center cursor-pointer shadow-sm">
                    <p className="text-xs text-blue-600 uppercase font-bold">Tue</p>
                    <p className="text-xl font-bold mt-1 text-blue-600">15</p>
                  </div>
                  <div className="flex-shrink-0 w-20 p-3 rounded-xl border border-slate-200 text-center cursor-pointer hover:border-blue-500 transition-colors">
                    <p className="text-xs text-slate-500 uppercase font-medium">Wed</p>
                    <p className="text-xl font-bold mt-1 text-slate-900">16</p>
                  </div>
                  <div className="flex-shrink-0 w-20 p-3 rounded-xl border border-slate-200 text-center cursor-pointer hover:border-blue-500 transition-colors">
                    <p className="text-xs text-slate-500 uppercase font-medium">Thu</p>
                    <p className="text-xl font-bold mt-1 text-slate-900">17</p>
                  </div>
                  <div className="flex-shrink-0 w-20 p-3 rounded-xl border border-slate-200 text-center cursor-pointer hover:border-blue-500 transition-colors">
                    <p className="text-xs text-slate-500 uppercase font-medium">Fri</p>
                    <p className="text-xl font-bold mt-1 text-slate-900">18</p>
                  </div>
                </div>
              </section>

              {/* Step 3: Pick Time Slot */}
              <section className="bg-white rounded-2xl shadow-sm p-6 border border-slate-200">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center font-bold text-sm">3</div>
                  <h3 className="text-xl font-bold text-slate-900">Pick Time Slot</h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 rounded-lg border border-slate-200 text-center cursor-not-allowed text-sm font-medium opacity-40 line-through text-slate-500">09:00 AM</div>
                  <div className="p-3 rounded-lg bg-blue-50 border-2 border-blue-500 text-blue-700 text-center cursor-pointer shadow-sm text-sm font-bold">10:30 AM</div>
                  <div className="p-3 rounded-lg border border-slate-200 text-center cursor-pointer hover:border-blue-500 hover:text-blue-600 transition-colors text-sm font-medium text-slate-700">11:00 AM</div>
                  <div className="p-3 rounded-lg border border-slate-200 text-center cursor-pointer hover:border-blue-500 hover:text-blue-600 transition-colors text-sm font-medium text-slate-700">01:00 PM</div>
                  <div className="p-3 rounded-lg border border-slate-200 text-center cursor-pointer hover:border-blue-500 hover:text-blue-600 transition-colors text-sm font-medium text-slate-700">02:30 PM</div>
                  <div className="p-3 rounded-lg border border-slate-200 text-center cursor-pointer hover:border-blue-500 hover:text-blue-600 transition-colors text-sm font-medium text-slate-700">04:00 PM</div>
                </div>
              </section>
            </div>
            
            {/* Right Column: Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-6 bg-white rounded-2xl shadow-sm p-6 border border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">Booking Summary</h3>
                
                <div className="space-y-6 mb-8">
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Specialist</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">Dr. Sarah Jenkins</p>
                        <p className="text-xs text-slate-500 mt-0.5">Internal Medicine</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Date & Time</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100">
                        <Calendar className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">Tuesday, Oct 15</p>
                        <p className="text-xs text-slate-500 mt-0.5">10:30 AM</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Consultation Fee</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100">
                        <CreditCard className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">Covered by Insurance</p>
                        <p className="text-xs text-slate-500 mt-0.5">Copay: $20.00</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <button className="w-full bg-blue-600 text-white font-semibold py-3.5 rounded-xl hover:bg-blue-700 transition-colors shadow-sm flex items-center justify-center gap-2">
                  Confirm Booking
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-[11px] text-center text-slate-400 mt-4 font-medium">You can reschedule or cancel up to 24 hours before.</p>
              </div>
            </div>
            
          </div>
        </div>
      </main>

      {/* BottomNavBar (Mobile) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-md shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-50 flex justify-around items-center h-16 px-4 border-t border-slate-200">
        <Link to="/dashboard" className="flex flex-col items-center justify-center text-slate-500 hover:text-slate-900">
          <LayoutDashboard className="w-5 h-5" />
          <span className="text-[10px] mt-1 font-medium">Home</span>
        </Link>
        <Link to="/book" className="flex flex-col items-center justify-center text-blue-600">
          <CalendarDays className="w-5 h-5" />
          <span className="text-[10px] mt-1 font-bold">Book</span>
        </Link>
        <a href="#" className="flex flex-col items-center justify-center text-slate-500 hover:text-slate-900">
          <User className="w-5 h-5" />
          <span className="text-[10px] mt-1 font-medium">Profile</span>
        </a>
      </nav>
      
    </div>
  );
}
