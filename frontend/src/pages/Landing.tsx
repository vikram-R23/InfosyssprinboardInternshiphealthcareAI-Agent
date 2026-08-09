import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Search, 
  Brain, 
  CalendarDays,
  Menu 
} from 'lucide-react';

export default function Landing() {
  return (
    <div className="bg-slate-50 text-slate-900 font-sans antialiased flex flex-col min-h-screen">
      
      {/* TopNavBar Component */}
      <header className="bg-white/80 backdrop-blur-xl shadow-sm w-full sticky top-0 z-50 transition-all duration-300 border-b border-slate-200">
        <div className="flex justify-between items-center w-full px-6 md:px-12 py-4 max-w-7xl mx-auto">
          <Link to="/" className="text-2xl font-bold text-blue-600 tracking-tight flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-emerald-500" />
            CareTriage AI
          </Link>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8 items-center">
            <ul className="flex gap-8">
              <li>
                <a href="#how-it-works" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="text-sm font-medium text-blue-600 border-b-2 border-blue-600 pb-1">
                  How it Works
                </a>
              </li>
              <li>
                <a href="#" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
                  About
                </a>
              </li>
            </ul>
          </nav>

          <div className="hidden md:flex gap-4 items-center">
            <Link to="/auth" className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors px-4 py-2">
              Sign In
            </Link>
            <Link to="/auth" className="bg-blue-600 text-white text-sm font-medium px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-all shadow-sm hover:shadow hover:-translate-y-0.5">
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-slate-600 p-2">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 px-6 md:px-12 overflow-hidden flex items-center min-h-[80vh]">
          {/* Subtle Background Accents */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-100 rounded-full blur-3xl opacity-40 translate-y-1/3 -translate-x-1/4 pointer-events-none"></div>
          
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-12 relative z-10 items-center">
            <div className="md:col-span-6 flex flex-col gap-8">
              <span className="inline-flex items-center gap-2 bg-emerald-100/50 text-emerald-800 text-sm font-medium px-4 py-1.5 rounded-full w-fit border border-emerald-200">
                <ShieldCheck className="w-4 h-4" />
                AI Verified Clinical Accuracy
              </span>
              <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
                AI-Powered Healthcare Triage at Your Fingertips.
              </h1>
              <p className="text-lg md:text-xl text-slate-600 max-w-lg leading-relaxed">
                Check your symptoms and get professional care recommendations in minutes. Experience clinical clarity designed to reduce anxiety and streamline your healthcare journey.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to="/auth" className="bg-blue-600 text-white font-medium px-8 py-4 rounded-xl hover:bg-blue-700 transition-all shadow-sm hover:shadow-md flex justify-center items-center gap-2">
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <button className="bg-white border border-slate-200 text-slate-700 font-medium px-8 py-4 rounded-xl hover:bg-slate-50 transition-colors flex justify-center items-center shadow-sm">
                  Learn More
                </button>
              </div>
            </div>

            <div className="md:col-span-6 relative mt-12 md:mt-0">
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-xl bg-white border border-slate-200">
                <img 
                  src="https://images.unsplash.com/photo-1576091160550-2173ff9e5eb2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                  alt="Medical dashboard interface" 
                  className="w-full h-full object-cover opacity-90"
                />
                
                {/* Floating UI Elements to simulate app usage */}
                <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-lg border border-slate-100 flex items-center gap-4 animate-[bounce_4s_infinite]">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Analysis Complete</p>
                    <p className="text-xs text-slate-500">Low risk detected</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How it works Section */}
        <section id="how-it-works" className="py-24 px-6 md:px-12 bg-white border-t border-slate-100 relative">
          <div className="max-w-7xl mx-auto flex flex-col gap-16">
            <div className="text-center max-w-2xl mx-auto flex flex-col gap-4">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">How it works</h2>
              <p className="text-lg text-slate-600">
                Our intelligent system guides you from symptom entry to professional care in three simple steps.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1 */}
              <div className="bg-slate-50 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col gap-4 border border-slate-100 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-slate-200 group-hover:bg-blue-600 transition-colors duration-300"></div>
                <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-slate-100 flex items-center justify-center text-blue-600 mb-2">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900">Check Symptoms</h3>
                <p className="text-slate-600 leading-relaxed">
                  Input your symptoms into our intuitive, medically-trained AI interface. It understands natural language.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-slate-50 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col gap-4 border border-slate-100 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-slate-200 group-hover:bg-blue-600 transition-colors duration-300"></div>
                <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-slate-100 flex items-center justify-center text-blue-600 mb-2">
                  <Brain className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900">Get AI Triage</h3>
                <p className="text-slate-600 leading-relaxed">
                  Our clinical-grade algorithm analyzes your inputs against vast medical databases to provide an immediate assessment.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-slate-50 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col gap-4 border border-slate-100 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-slate-200 group-hover:bg-blue-600 transition-colors duration-300"></div>
                <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-slate-100 flex items-center justify-center text-blue-600 mb-2">
                  <CalendarDays className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900">Book Appointment</h3>
                <p className="text-slate-600 leading-relaxed">
                  If necessary, seamlessly connect with specialized healthcare providers based on your triage results.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Component */}
      <footer className="bg-slate-50 py-12 border-t border-slate-200">
        <div className="flex flex-col md:flex-row justify-between items-center w-full px-6 md:px-12 max-w-7xl mx-auto gap-8">
          <div className="flex flex-col gap-2 items-center md:items-start">
            <span className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
              CareTriage AI
            </span>
            <p className="text-sm text-slate-500">
              © 2026 CareTriage AI. Clinical Clarity in Healthcare.
            </p>
          </div>
          <nav>
            <ul className="flex flex-wrap justify-center gap-8">
              <li>
                <a href="#" className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </footer>
    </div>
  );
}
