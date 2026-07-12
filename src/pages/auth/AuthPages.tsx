import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Sparkles, GraduationCap, ShieldCheck, UserCircle2, ArrowLeft, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { useAppState, UserRole } from '../../context/AppStateContext';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';

// ==========================================
// 1. LOGIN PAGE (With Quick Demo Role Autofill)
// ==========================================
export const LoginPage: React.FC = () => {
  const { setCurrentPage, setCurrentRole, setCurrentTab, setAuthSubPage, addToast } = useAppState();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('teacher');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Demo Credentials Map
  const demoCredentials: Record<Exclude<UserRole, 'marketing'>, { email: string; pass: string }> = {
    'super-admin': { email: 'super.admin@dominova.io', pass: 'platformsecret' },
    'school-admin': { email: 'arthur.p@dominova.io', pass: 'schoolsecret' },
    teacher: { email: 'sarah.j@dominova.io', pass: 'teachersecret' }
  };

  const handleAutofill = (role: Exclude<UserRole, 'marketing'>) => {
    setSelectedRole(role);
    setEmail(demoCredentials[role].email);
    setPassword(demoCredentials[role].pass);
    addToast('info', `Autofilled demo credentials for ${role === 'super-admin' ? 'Super Admin' : role === 'school-admin' ? 'School Admin' : 'Teacher'}`);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      // Log in
      setCurrentRole(selectedRole);
      setCurrentPage('dashboard');
      setCurrentTab('overview');
      addToast('success', `Welcome back, ${selectedRole === 'teacher' ? 'Mrs. Sarah Jenkins' : selectedRole === 'school-admin' ? 'Dr. Arthur Pendelton' : 'Dominova Admin'}!`);
    }, 1000);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[#F8FAFC] dark:bg-[#0F172A] transition-colors duration-300">
      
      {/* --- LEFT COLUMN: BEAUTIFUL BRAND PREVIEW --- */}
      <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-primary via-primary-dark to-purpleAccent text-white relative overflow-hidden">
        
        {/* Glowing background blurs */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-80 h-80 rounded-full bg-white/10 blur-3xl" 
        />
        <motion.div 
          animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }}
          transition={{ repeat: Infinity, duration: 25, ease: "easeInOut" }}
          className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-black/20 blur-3xl" 
        />

        {/* Brand Header */}
        <div className="flex items-center gap-2 relative z-10 select-none">
          <div className="p-2 rounded-xl bg-white/15 border border-white/20">
            <Sparkles className="w-5 h-5 fill-current" />
          </div>
          <span className="text-xl font-black tracking-tight">Dominova</span>
        </div>

        {/* Mid illustration: Floating Mockup cards */}
        <div className="flex flex-col gap-6 items-center relative z-10 my-auto">
          <div className="relative w-full max-w-sm">
            {/* Top Card: Live Progress Ring */}
            <Card variant="glass" className="p-4 bg-white/10 border-white/20 text-white shadow-xl animate-float">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center font-bold text-lg select-none">
                  📊
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-black">Live Roll-Call Completion</div>
                  <div className="flex justify-between items-center text-[9px] font-bold text-white/70 mt-1">
                    <span>Active Sessions</span>
                    <span>94% Completed</span>
                  </div>
                  <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mt-1">
                    <div className="bg-white h-full w-11/12" />
                  </div>
                </div>
              </div>
            </Card>

            {/* Behind Card: Parental notifications dispatch */}
            <Card variant="glass" className="absolute -top-12 -right-8 p-3 bg-white/5 border-white/10 text-white/90 shadow-lg scale-90 -rotate-3 select-none pointer-events-none">
              <div className="flex items-center gap-2.5">
                <span className="text-xs">💬</span>
                <span className="text-[9px] font-bold">SMS Parent Alert: Delivered (std-7)</span>
              </div>
            </Card>

            {/* Front Card: Stats Counter */}
            <Card variant="glass" className="absolute -bottom-10 -left-6 p-4 bg-white/15 border-white/25 text-white shadow-2xl scale-95 rotate-2 select-none pointer-events-none">
              <div className="text-right">
                <span className="text-[10px] font-bold text-white/70 uppercase tracking-wider">Uptime Reliability</span>
                <div className="text-2xl font-black mt-0.5">99.99%</div>
              </div>
            </Card>
          </div>

          <div className="text-center flex flex-col gap-2 mt-12 max-w-sm">
            <h2 className="text-2xl font-black">Administer Campuses Instantly</h2>
            <p className="text-xs font-semibold text-white/75 leading-relaxed">
              Connect teachers, alert parents, and review district analytics in a unified high-speed environment.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-[10px] font-bold text-white/50 relative z-10 select-none">
          © {new Date().getFullYear()} Dominova Attendance Platform. Enterprise virtualized.
        </div>
      </div>

      {/* --- RIGHT COLUMN: GLASSMORPHIC LOGIN FORM --- */}
      <div className="flex items-center justify-center p-6 sm:p-12 relative">
        <button
          onClick={() => setCurrentPage('marketing')}
          className="absolute top-6 left-6 inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to website
        </button>

        <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 12, delay: 0.1 }}
          className="w-full max-w-md"
        >
          <Card variant="glass" className="w-full p-8 shadow-2xl border border-white/40 dark:border-slate-800">
          <form onSubmit={handleLogin} className="flex flex-col gap-6">
            
            {/* Header */}
            <div className="flex flex-col gap-1.5 text-center">
              <h1 className="text-2xl font-black text-slate-800 dark:text-white">Welcome back</h1>
              <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold">Sign in to your administrative dashboard.</p>
            </div>

            {/* Role Switcher Selection */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                Choose Access Role
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['teacher', 'school-admin', 'super-admin'] as const).map(roleKey => {
                  const isActive = selectedRole === roleKey;
                  const icons = {
                    teacher: <GraduationCap className="w-4 h-4" />,
                    'school-admin': <UserCircle2 className="w-4 h-4" />,
                    'super-admin': <ShieldCheck className="w-4 h-4" />
                  };
                  const labels = {
                    teacher: 'Teacher',
                    'school-admin': 'Admin',
                    'super-admin': 'Super'
                  };
                  return (
                    <button
                      key={roleKey}
                      type="button"
                      onClick={() => setSelectedRole(roleKey)}
                      className={`flex flex-col items-center justify-center gap-1.5 py-2.5 rounded-[12px] border transition-all duration-250 focus:outline-none ${
                        isActive 
                          ? 'border-primary bg-primary/5 text-primary dark:text-primary-light font-bold shadow-sm' 
                          : 'border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-600 hover:border-slate-300 hover:bg-slate-50/50'
                      }`}
                    >
                      {icons[roleKey]}
                      <span className="text-[10px] font-semibold">{labels[roleKey]}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Email Input */}
            <Input
              label="Administrative Email"
              type="email"
              placeholder="e.g., principal@dominova.io"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail className="w-4 h-4" />}
            />

            {/* Password Input */}
            <div className="relative">
              <Input
                label="Secure Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={<Lock className="w-4 h-4" />}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[34px] p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Keep me / Forgot Link */}
            <div className="flex items-center justify-between text-xs font-semibold">
              <label className="flex items-center gap-2 cursor-pointer select-none text-slate-550 dark:text-slate-400">
                <input type="checkbox" className="rounded text-primary focus:ring-primary/20 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800" />
                Remember credentials
              </label>
              <button
                type="button"
                onClick={() => setAuthSubPage('forgot')}
                className="text-primary hover:text-primary-dark transition-colors"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <Button variant="primary" type="submit" isLoading={isLoading} className="w-full">
              Login to workspace
            </Button>

            {/* Quick Demo Assist Block */}
            <div className="flex flex-col gap-2 mt-2 pt-4 border-t border-slate-100 dark:border-slate-800">
              <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest text-center">
                Investor/Demo Quick Autofills
              </span>
              <div className="grid grid-cols-3 gap-1.5">
                <button
                  type="button"
                  onClick={() => handleAutofill('teacher')}
                  className="px-2 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-850 hover:bg-slate-200/60 text-[9px] font-bold text-slate-600 dark:text-slate-300 select-none"
                >
                  Fill Teacher
                </button>
                <button
                  type="button"
                  onClick={() => handleAutofill('school-admin')}
                  className="px-2 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-855 hover:bg-slate-200/60 text-[9px] font-bold text-slate-600 dark:text-slate-300 select-none"
                >
                  Fill Admin
                </button>
                <button
                  type="button"
                  onClick={() => handleAutofill('super-admin')}
                  className="px-2 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-855 hover:bg-slate-200/60 text-[9px] font-bold text-slate-600 dark:text-slate-300 select-none"
                >
                  Fill Super
                </button>
              </div>
            </div>

          </form>
          </Card>
        </motion.div>
      </div>

    </div>
  );
};


// ==========================================
// 2. FORGOT PASSWORD PAGE
// ==========================================
export const ForgotPassword: React.FC = () => {
  const { setAuthSubPage, addToast } = useAppState();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
      addToast('success', 'Verification code sent to ' + email);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#F8FAFC] dark:bg-[#0F172A] transition-colors duration-300">
      <Card variant="glass" className="w-full max-w-md p-8 shadow-2xl border border-white/40 dark:border-slate-800">
        {submitted ? (
          <div className="text-center flex flex-col items-center gap-5 animate-scale-in">
            <div className="w-16 h-16 rounded-full bg-success/15 border border-success/30 text-success flex items-center justify-center font-bold text-2xl select-none">
              ✓
            </div>
            <h2 className="text-2xl font-black text-slate-800 dark:text-white">Check Your Inbox</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-xs">
              We have dispatched password recovery credentials and a dynamic verification link to **{email}**. Please check your spam folder if it doesn't arrive within 1 minute.
            </p>
            <Button variant="primary" className="w-full mt-4" onClick={() => setAuthSubPage('reset')}>
              Enter reset code
            </Button>
            <button
              onClick={() => setAuthSubPage('login')}
              className="text-xs font-semibold text-slate-400 hover:text-slate-700 transition-colors"
            >
              Back to Login
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-1.5 text-center">
              <h1 className="text-2xl font-black text-slate-800 dark:text-white">Forgot password</h1>
              <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold">Enter your email and we'll send a password recovery code.</p>
            </div>

            <Input
              label="Registered Work Email"
              type="email"
              required
              placeholder="principal@dominova.io"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail className="w-4 h-4" />}
            />

            <Button variant="primary" type="submit" isLoading={isLoading} className="w-full">
              Send Recovery Credentials
            </Button>

            <button
              type="button"
              onClick={() => setAuthSubPage('login')}
              className="text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors inline-flex items-center gap-1 self-center"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Login
            </button>
          </form>
        )}
      </Card>
    </div>
  );
};


// ==========================================
// 3. RESET PASSWORD PAGE
// ==========================================
export const ResetPassword: React.FC = () => {
  const { setAuthSubPage, addToast } = useAppState();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      addToast('error', 'Passwords do not match');
      return;
    }
    
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      addToast('success', 'Your password has been successfully updated');
      setAuthSubPage('login');
    }, 1200);
  };

  // Basic strength check
  const getPasswordStrength = () => {
    if (!password) return { label: 'Empty', color: 'bg-slate-200' };
    if (password.length < 6) return { label: 'Weak', color: 'bg-danger' };
    if (password.length < 10) return { label: 'Medium', color: 'bg-warning' };
    return { label: 'Strong', color: 'bg-success' };
  };

  const strength = getPasswordStrength();

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#F8FAFC] dark:bg-[#0F172A] transition-colors duration-300">
      <Card variant="glass" className="w-full max-w-md p-8 shadow-2xl border border-white/40 dark:border-slate-800">
        <form onSubmit={handleReset} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5 text-center">
            <h1 className="text-2xl font-black text-slate-800 dark:text-white">Reset password</h1>
            <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold">Enter your verification code and choose a secure password.</p>
          </div>

          <Input
            label="Verification Code (Received in Email)"
            type="text"
            required
            placeholder="e.g., 982-143"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />

          <Input
            label="New Secure Password"
            type="password"
            required
            placeholder="Min. 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={<Lock className="w-4 h-4" />}
          />

          {/* Password Strength Indicator bar */}
          {password && (
            <div className="flex flex-col gap-1">
              <div className="flex justify-between text-[9px] font-bold text-slate-400 uppercase">
                <span>Strength Meter</span>
                <span className="font-extrabold">{strength.label}</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className={`h-full ${strength.color} transition-all`} style={{ width: password.length < 6 ? '33%' : password.length < 10 ? '66%' : '100%' }} />
              </div>
            </div>
          )}

          <Input
            label="Confirm New Password"
            type="password"
            required
            placeholder="Re-enter password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            icon={<Lock className="w-4 h-4" />}
          />

          <Button variant="primary" type="submit" isLoading={isLoading} className="w-full mt-2">
            Reset Password & Login
          </Button>

          <button
            type="button"
            onClick={() => setAuthSubPage('login')}
            className="text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors inline-flex items-center gap-1 self-center"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Login
          </button>
        </form>
      </Card>
    </div>
  );
};
