import React, { useState, useRef, useEffect } from 'react';
import { User, LogOut, UserPlus, Check, ChevronDown, Sparkles } from 'lucide-react';
import { UserProfile } from '../types';

interface UserMenuProps {
  currentUser: UserProfile | null;
  allUsers: UserProfile[];
  onSwitchUser: (userId: string) => void;
  onOpenAuth: (tab?: 'signin' | 'signup' | 'demo') => void;
  onSignOut: () => void;
}

export const UserMenu: React.FC<UserMenuProps> = ({
  currentUser,
  allUsers,
  onSwitchUser,
  onOpenAuth,
  onSignOut,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!currentUser) {
    return (
      <div className="flex items-center gap-2">
        <button
          onClick={() => onOpenAuth('signin')}
          className="px-3.5 py-1.5 rounded-xl bg-surface-low hover:bg-surface-container text-on-surface text-xs font-bold transition-all border border-surface-container shadow-2xs active:scale-95 cursor-pointer"
        >
          Sign In
        </button>
        <button
          onClick={() => onOpenAuth('signup')}
          className="px-3.5 py-1.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold transition-all shadow-2xs active:scale-95 cursor-pointer"
        >
          Register
        </button>
      </div>
    );
  }

  // Generate initials for avatar fallback
  const initials = currentUser.name
    .split(' ')
    .map(p => p[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1 pl-1.5 sm:pr-2.5 rounded-xl bg-surface-low hover:bg-surface-container border border-surface-container transition-all active:scale-95 cursor-pointer"
        aria-label="User Account Menu"
        aria-expanded={isOpen}
      >
        {currentUser.avatarUrl ? (
          <img
            src={currentUser.avatarUrl}
            alt={currentUser.name}
            className="w-7 h-7 rounded-lg object-cover border border-surface-container"
          />
        ) : (
          <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary font-black flex items-center justify-center text-xs">
            {initials}
          </div>
        )}
        <div className="hidden sm:flex flex-col text-left">
          <span className="text-xs font-bold text-on-surface leading-tight truncate max-w-[100px]">
            {currentUser.name}
          </span>
          <span className="text-[10px] text-on-surface-variant capitalize">
            {currentUser.role.replace('_', ' ')}
          </span>
        </div>
        <ChevronDown className={`w-3.5 h-3.5 text-on-surface-variant transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-surface-lowest rounded-2xl border border-surface-container shadow-lg p-2 z-50 text-xs">
          {/* Active Profile Header */}
          <div className="p-3 bg-surface-low/80 rounded-xl mb-2">
            <div className="flex items-center gap-2.5">
              {currentUser.avatarUrl ? (
                <img
                  src={currentUser.avatarUrl}
                  alt={currentUser.name}
                  className="w-9 h-9 rounded-xl object-cover border border-surface-container"
                />
              ) : (
                <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary font-black flex items-center justify-center text-xs">
                  {initials}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="font-extrabold text-sm text-on-surface truncate">
                  {currentUser.name}
                </div>
                <div className="text-[11px] text-on-surface-variant truncate font-mono">
                  {currentUser.email}
                </div>
                <div className="text-[10px] text-primary uppercase font-bold tracking-wider mt-0.5">
                  {currentUser.role.replace('_', ' ')}
                </div>
              </div>
            </div>
          </div>

          {/* Switch Profile Section */}
          <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
            Switch Account
          </div>
          <div className="space-y-1 mb-2">
            {allUsers.map((user) => {
              const isSelected = user.id === currentUser.id;
              return (
                <button
                  key={user.id}
                  onClick={() => {
                    onSwitchUser(user.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-2 rounded-xl text-left transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-primary-light/50 text-primary font-bold'
                      : 'hover:bg-surface-low text-on-surface'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className="w-6 h-6 rounded-md bg-surface-container flex items-center justify-center text-[10px] font-bold text-on-surface-variant shrink-0">
                      {user.name.charAt(0)}
                    </span>
                    <div className="truncate">
                      <span className="text-xs truncate block">{user.name}</span>
                      <span className="text-[10px] text-on-surface-variant truncate block font-mono">
                        {user.email}
                      </span>
                    </div>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-primary shrink-0" />}
                </button>
              );
            })}
          </div>

          <div className="h-px bg-surface-container my-1" />

          {/* Add Account / Demo Profiles */}
          <button
            onClick={() => {
              onOpenAuth('signup');
              setIsOpen(false);
            }}
            className="w-full flex items-center gap-2 p-2 rounded-xl hover:bg-surface-low text-on-surface text-xs font-semibold transition-colors cursor-pointer"
          >
            <UserPlus className="w-4 h-4 text-primary" />
            <span>Add New Account</span>
          </button>

          <button
            onClick={() => {
              onOpenAuth('demo');
              setIsOpen(false);
            }}
            className="w-full flex items-center gap-2 p-2 rounded-xl hover:bg-surface-low text-on-surface text-xs font-semibold transition-colors cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Browse Demo Profiles</span>
          </button>

          <div className="h-px bg-surface-container my-1" />

          {/* Sign Out */}
          <button
            onClick={() => {
              onSignOut();
              setIsOpen(false);
            }}
            className="w-full flex items-center gap-2 p-2 rounded-xl hover:bg-rose-50 text-rose-600 text-xs font-semibold transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      )}
    </div>
  );
};
