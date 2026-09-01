import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { ShieldCheck, User, Stethoscope, Mail, Lock, UserPlus, LogIn, KeyRound } from 'lucide-react';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeRoleDemo, setActiveRoleDemo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleDemoFill = (role: 'patient' | 'doctor' | 'admin') => {
    setActiveRoleDemo(role);
    setIsLogin(true); // Demo accounts are always logins
    if (role === 'patient') {
      setEmail('patient@demo.com');
      setPassword('password123');
    } else if (role === 'doctor') {
      setEmail('doctor@demo.com');
      setPassword('password123');
    } else if (role === 'admin') {
      setEmail('admin@demo.com');
      setPassword('password123');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      if (isLogin) {
        // Log in
        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
        if (signInError) throw signInError;

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("No user found.");

        const { data: userData } = await supabase.from('users').select('role').eq('id', user.id).single();
        const userRole = userData?.role || 'patient';
        
        if (userRole === 'admin') navigate('/admin');
        else if (userRole === 'doctor') navigate('/doctor');
        else navigate('/dashboard');

      } else {
        // Sign up (Always defaults to 'patient' for external signups)
        const role = 'patient';
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: email.split('@')[0],
              role: role
            }
          }
        });
        
        if (signUpError) throw signUpError;

        // Auto sign in if session was not established automatically
        let currentUser = data.user;
        if (!data.session) {
          const { data: signInData, error: autoSignInError } = await supabase.auth.signInWithPassword({ email, password });
          if (!autoSignInError && signInData.user) {
            currentUser = signInData.user;
          }
        }
        
        if (currentUser) {
          // Insert role & name into public.users
          const { error: profileError } = await supabase.from('users').upsert({
            id: currentUser.id,
            role: role,
            full_name: email.split('@')[0]
          });
          
          if (profileError) {
            console.warn('Profile creation notice:', profileError.message);
          }
        }

        navigate('/dashboard'); // External signups are always patients
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 font-sans text-slate-900 p-4 sm:p-6 overflow-y-auto">
      <div className="w-full max-w-[450px] bg-white p-8 rounded-3xl shadow-xl border border-slate-100 my-8">
        
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center">
            <ShieldCheck className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-center mb-2">
          {isLogin ? 'Welcome Back' : 'Create an Account'}
        </h2>
        <p className="text-slate-500 mt-2 text-center text-sm">
          {isLogin ? 'Enter your credentials to access your portal' : 'Join CareTaker AI to start tracking your health'}
        </p>

        {/* Toggle Login / Signup */}
        <div className="flex p-1 bg-slate-100 rounded-xl mt-6 mb-8">
          <button
            type="button"
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${isLogin ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setIsLogin(false);
              setActiveRoleDemo(null);
              setEmail('');
              setPassword('');
            }}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${!isLogin ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Sign Up
          </button>
        </div>

        {errorMsg && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-medium flex items-start gap-2">
            <ShieldCheck className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="email" 
                required
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none text-sm"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="password" 
                required
                minLength={6}
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none text-sm"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full mt-2 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/30 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : isLogin ? (
              <><LogIn className="w-5 h-5" /> Sign In</>
            ) : (
              <><UserPlus className="w-5 h-5" /> Create Patient Account</>
            )}
          </button>
        </form>

        {/* Role Selection Logins (Internal Staff & Demo) */}
        <div className="mt-10 pt-8 border-t border-slate-100 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-xs font-bold text-slate-300 uppercase tracking-widest flex items-center gap-1.5">
            <KeyRound className="w-3.5 h-3.5" /> 
            Internal Staff & Demo
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <button
              type="button"
              onClick={() => handleDemoFill('patient')}
              className={`flex-1 py-3 px-3 text-xs font-bold rounded-xl border transition-all flex items-center justify-center gap-2 ${activeRoleDemo === 'patient' ? 'bg-blue-50 text-blue-700 border-blue-200 shadow-sm' : 'bg-white hover:bg-slate-50 text-slate-600 border-slate-200'}`}
            >
              <User className="w-4 h-4" /> Patient
            </button>
            <button
              type="button"
              onClick={() => handleDemoFill('doctor')}
              className={`flex-1 py-3 px-3 text-xs font-bold rounded-xl border transition-all flex items-center justify-center gap-2 ${activeRoleDemo === 'doctor' ? 'bg-indigo-50 text-indigo-700 border-indigo-200 shadow-sm' : 'bg-white hover:bg-slate-50 text-slate-600 border-slate-200'}`}
            >
              <Stethoscope className="w-4 h-4" /> Doctor
            </button>
            <button
              type="button"
              onClick={() => handleDemoFill('admin')}
              className={`flex-1 py-3 px-3 text-xs font-bold rounded-xl border transition-all flex items-center justify-center gap-2 ${activeRoleDemo === 'admin' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 shadow-sm' : 'bg-white hover:bg-slate-50 text-slate-600 border-slate-200'}`}
            >
              <ShieldCheck className="w-4 h-4" /> Admin
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
