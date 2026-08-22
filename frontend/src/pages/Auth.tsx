import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { ShieldCheck, User, Stethoscope } from 'lucide-react';

export default function Auth() {
  const [isLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeRoleDemo, setActiveRoleDemo] = useState<string | null>(null);
  const [role] = useState<'patient' | 'doctor'>('patient');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

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
        // Sign up
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

        if (role === 'doctor') navigate('/doctor');
        else navigate('/dashboard');
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 font-sans text-slate-900 p-6 overflow-hidden">
      <div className="w-full max-w-[450px] bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
        
        <div className="flex justify-center mb-6">
          <ShieldCheck className="w-12 h-12 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-center mb-2">
          {isLogin ? 'Welcome Back' : 'Create an Account'}
        </h2>
        <p className="text-slate-500 mt-2">
          {isLogin ? 'Enter your credentials to access your account' : 'Join CareTaker AI today'}
        </p>

        {errorMsg && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm font-medium">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input 
              type="email" 
              required
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <input 
              type="password" 
              required
              minLength={6}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full mt-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium shadow-md shadow-blue-500/20 transition-all disabled:opacity-50"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>



      </div>
    </div>
  );
}
