import React, { useState } from 'react';
import { X, Lock, Mail, User, ShieldCheck, ArrowRight, Sparkles, ChefHat } from 'lucide-react';
import { authStore, DEMO_USERS } from '../services/authStore';
import { UserProfile, UserRole } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: UserProfile) => void;
  initialTab?: 'signin' | 'signup' | 'demo';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  initialTab = 'signin',
}) => {
  const [activeTab, setActiveTab] = useState<'signin' | 'signup' | 'demo'>(initialTab);
  
  // Sign In state
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  
  // Sign Up state
  const [signUpName, setSignUpName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpRole, setSignUpRole] = useState<UserRole>('home_cook');

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    const result = authStore.signIn(signInEmail, signInPassword);
    if (result.success && result.user) {
      onSuccess(result.user);
      onClose();
    } else {
      setErrorMessage(result.error || 'Failed to sign in');
    }
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    const result = authStore.signUp(signUpName, signUpEmail, signUpPassword, signUpRole);
    if (result.success && result.user) {
      onSuccess(result.user);
      onClose();
    } else {
      setErrorMessage(result.error || 'Failed to create account');
    }
  };

  const handleQuickDemoLogin = (email: string, password: string) => {
    setErrorMessage(null);
    const result = authStore.signIn(email, password);
    if (result.success && result.user) {
      onSuccess(result.user);
      onClose();
    } else {
      setErrorMessage(result.error || 'Failed to sign in demo user');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div 
        className="relative w-full max-w-md bg-surface-lowest rounded-2xl border border-surface-container shadow-xl overflow-hidden transition-all"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-surface-container bg-surface-low/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
              <ChefHat className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-on-surface tracking-tight">
                Kitchen Table Accounts
              </h2>
              <p className="text-[11px] text-on-surface-variant">
                Private meal plans & custom recipe forks
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-1 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-low transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex p-2 bg-surface-low/70 border-b border-surface-container gap-1">
          <button
            onClick={() => { setActiveTab('signin'); setErrorMessage(null); }}
            className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold transition-all text-center ${
              activeTab === 'signin'
                ? 'bg-surface-lowest text-primary shadow-2xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => { setActiveTab('signup'); setErrorMessage(null); }}
            className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold transition-all text-center ${
              activeTab === 'signup'
                ? 'bg-surface-lowest text-primary shadow-2xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Create Account
          </button>
          <button
            onClick={() => { setActiveTab('demo'); setErrorMessage(null); }}
            className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold transition-all text-center ${
              activeTab === 'demo'
                ? 'bg-surface-lowest text-primary shadow-2xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Demo Profiles
          </button>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mx-6 mt-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs font-medium">
            {errorMessage}
          </div>
        )}

        {/* Body Content */}
        <div className="p-6">
          {activeTab === 'signin' && (
            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
                  <input
                    type="email"
                    required
                    value={signInEmail}
                    onChange={(e) => setSignInEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-9 pr-3 py-2 bg-surface-low border border-surface-container rounded-xl text-xs text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
                  <input
                    type="password"
                    required
                    value={signInPassword}
                    onChange={(e) => setSignInPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2 bg-surface-low border border-surface-container rounded-xl text-xs text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-primary hover:bg-primary-hover text-white rounded-xl text-xs font-bold transition-all shadow-2xs active:scale-[0.98] cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Sign In to Your Kitchen</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <div className="pt-2 text-center">
                <span className="text-xs text-on-surface-variant">
                  Want to try without typing?{' '}
                  <button
                    type="button"
                    onClick={() => setActiveTab('demo')}
                    className="text-primary font-bold hover:underline cursor-pointer"
                  >
                    Use a Demo Account
                  </button>
                </span>
              </div>
            </form>
          )}

          {activeTab === 'signup' && (
            <form onSubmit={handleSignUp} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
                  <input
                    type="text"
                    required
                    value={signUpName}
                    onChange={(e) => setSignUpName(e.target.value)}
                    placeholder="e.g. Jordan Lee"
                    className="w-full pl-9 pr-3 py-2 bg-surface-low border border-surface-container rounded-xl text-xs text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
                  <input
                    type="email"
                    required
                    value={signUpEmail}
                    onChange={(e) => setSignUpEmail(e.target.value)}
                    placeholder="jordan@example.com"
                    className="w-full pl-9 pr-3 py-2 bg-surface-low border border-surface-container rounded-xl text-xs text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
                  <input
                    type="password"
                    required
                    value={signUpPassword}
                    onChange={(e) => setSignUpPassword(e.target.value)}
                    placeholder="Create a password"
                    className="w-full pl-9 pr-3 py-2 bg-surface-low border border-surface-container rounded-xl text-xs text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">
                  Culinary Profile Focus
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'home_cook', label: 'Home Cook' },
                    { id: 'nutritionist', label: 'Nutritionist' },
                    { id: 'chef', label: 'Chef' },
                  ].map((roleOpt) => (
                    <button
                      key={roleOpt.id}
                      type="button"
                      onClick={() => setSignUpRole(roleOpt.id as UserRole)}
                      className={`py-1.5 px-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        signUpRole === roleOpt.id
                          ? 'bg-primary text-white border-primary shadow-2xs'
                          : 'bg-surface-low text-on-surface-variant border-surface-container hover:bg-surface-container'
                      }`}
                    >
                      {roleOpt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-surface-low rounded-xl border border-surface-container text-[11px] text-on-surface-variant leading-relaxed">
                <span className="font-bold text-on-surface block mb-0.5">Base Catalog Seeding</span>
                Your account is automatically provisioned with the full library of recipes and pantry items. Your weekly meal plan starts completely empty.
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-primary hover:bg-primary-hover text-white rounded-xl text-xs font-bold transition-all shadow-2xs active:scale-[0.98] cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Create Account</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}

          {activeTab === 'demo' && (
            <div className="space-y-3">
              <p className="text-xs text-on-surface-variant mb-2">
                Select a pre-configured profile to test multi-user isolation immediately:
              </p>
              
              {DEMO_USERS.map((demo) => (
                <div
                  key={demo.id}
                  className="flex items-center justify-between p-3.5 rounded-xl border border-surface-container bg-surface-low hover:bg-surface-container-high transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={demo.avatarUrl}
                      alt={demo.name}
                      className="w-10 h-10 rounded-full object-cover border border-surface-container"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-xs text-on-surface">
                          {demo.name}
                        </span>
                        <span className="text-[10px] text-primary uppercase font-bold tracking-wider bg-primary/10 px-1.5 py-0.5 rounded">
                          {demo.role}
                        </span>
                      </div>
                      <span className="text-[11px] text-on-surface-variant font-mono">
                        {demo.email}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleQuickDemoLogin(demo.email, demo.passwordHash)}
                    className="px-3 py-1.5 rounded-lg bg-surface-lowest group-hover:bg-primary group-hover:text-white text-on-surface text-xs font-bold border border-surface-container group-hover:border-primary transition-colors cursor-pointer"
                  >
                    Select
                  </button>
                </div>
              ))}

              <div className="p-3 bg-surface-low rounded-xl border border-surface-container text-[11px] text-on-surface-variant">
                <span className="font-bold text-on-surface block mb-0.5">Pre-configured Demo Details:</span>
                • <strong>Maya Patel</strong>: Nutritionist with a pre-filled sample week.
                <br />
                • <strong>Alex Rivera</strong>: Home Chef with a fresh, empty weekly plan.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
