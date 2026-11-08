import { UserProfile, UserAccountData, DayPlans, UserRole } from '../types';
import { INITIAL_RECIPES, INITIAL_INGREDIENTS } from '../constants';

const USERS_STORAGE_KEY = 'kt_users_v1';
const CURRENT_USER_KEY = 'kt_current_user_v1';
const USERDATA_KEY_PREFIX = 'kt_userdata_v1_';

export interface StoredUser extends UserProfile {
  passwordHash: string;
}

export const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const;

export function getEmptyWeeklyPlan(): DayPlans {
  return {
    Monday: { preBreakfast: [], breakfast: [], lunch: [], snack: [], dinner: [] },
    Tuesday: { preBreakfast: [], breakfast: [], lunch: [], snack: [], dinner: [] },
    Wednesday: { preBreakfast: [], breakfast: [], lunch: [], snack: [], dinner: [] },
    Thursday: { preBreakfast: [], breakfast: [], lunch: [], snack: [], dinner: [] },
    Friday: { preBreakfast: [], breakfast: [], lunch: [], snack: [], dinner: [] },
    Saturday: { preBreakfast: [], breakfast: [], lunch: [], snack: [], dinner: [] },
    Sunday: { preBreakfast: [], breakfast: [], lunch: [], snack: [], dinner: [] },
  };
}

export function getCanonicalStarterWeeklyPlan(): DayPlans {
  return {
    Monday: {
      preBreakfast: ['54'],
      breakfast: ['80'],
      lunch: ['24'],
      snack: [],
      dinner: ['205', '206'],
    },
    Tuesday: {
      preBreakfast: ['54'],
      breakfast: ['202'],
      lunch: ['16'],
      snack: [],
      dinner: ['67'],
    },
    Wednesday: {
      preBreakfast: ['54'],
      breakfast: ['3'],
      lunch: ['65', '97'],
      snack: [],
      dinner: ['74'],
    },
    Thursday: {
      preBreakfast: ['54'],
      breakfast: ['3'],
      lunch: ['208', '206'],
      snack: [],
      dinner: ['85'],
    },
    Friday: {
      preBreakfast: ['54'],
      breakfast: ['49'],
      lunch: [],
      snack: [],
      dinner: ['14'],
    },
    Saturday: {
      preBreakfast: ['54'],
      breakfast: [],
      lunch: [],
      snack: [],
      dinner: ['68'],
    },
    Sunday: {
      preBreakfast: [],
      breakfast: [],
      lunch: [],
      snack: [],
      dinner: [],
    },
  };
}

export const DEMO_USERS: StoredUser[] = [
  {
    id: 'user_maya_patel',
    name: 'Maya Patel',
    email: 'maya@kitchentable.app',
    role: 'nutritionist',
    avatarUrl: 'https://images.unsplash.com/photo-1594824813584-5a7bb93b2a0e?auto=format&fit=crop&q=80&w=200',
    createdAt: '2026-01-15T08:00:00Z',
    passwordHash: 'demo123',
  },
  {
    id: 'user_alex_rivera',
    name: 'Alex Rivera',
    email: 'alex@kitchentable.app',
    role: 'chef',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    createdAt: '2026-02-01T10:30:00Z',
    passwordHash: 'demo123',
  },
];

class AuthStore {
  private users: StoredUser[] = [];
  private currentUserId: string | null = null;

  constructor() {
    this.init();
  }

  private init() {
    try {
      const storedUsersJson = localStorage.getItem(USERS_STORAGE_KEY);
      if (storedUsersJson) {
        this.users = JSON.parse(storedUsersJson);
      } else {
        // Bootstrap initial demo users
        this.users = [...DEMO_USERS];
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(this.users));

        // Bootstrap demo accounts data
        DEMO_USERS.forEach((demoUser) => {
          const userKey = `${USERDATA_KEY_PREFIX}${demoUser.id}`;
          if (!localStorage.getItem(userKey)) {
            const initialData: UserAccountData = {
              userId: demoUser.id,
              recipes: JSON.parse(JSON.stringify(INITIAL_RECIPES)),
              ingredients: JSON.parse(JSON.stringify(INITIAL_INGREDIENTS)),
              // Alex starts with empty plan, Maya with starter plan to showcase both states!
              weeklyPlan: demoUser.id === 'user_maya_patel' ? getCanonicalStarterWeeklyPlan() : getEmptyWeeklyPlan(),
              hasPopulatedStarterWeek: demoUser.id === 'user_maya_patel',
            };
            localStorage.setItem(userKey, JSON.stringify(initialData));
          }
        });
      }

      const activeUserId = localStorage.getItem(CURRENT_USER_KEY);
      if (activeUserId && this.users.some(u => u.id === activeUserId)) {
        this.currentUserId = activeUserId;
      } else if (this.users.length > 0) {
        // Default to the first demo account so the app is immediately usable
        this.currentUserId = this.users[0].id;
        localStorage.setItem(CURRENT_USER_KEY, this.currentUserId);
      }
    } catch (e) {
      console.error('Failed to initialize AuthStore from localStorage', e);
      this.users = [...DEMO_USERS];
      this.currentUserId = this.users[0]?.id || null;
    }
  }

  public getAllUsers(): UserProfile[] {
    return this.users.map(({ passwordHash: _, ...profile }) => profile);
  }

  public getCurrentUser(): UserProfile | null {
    if (!this.currentUserId) return null;
    const user = this.users.find(u => u.id === this.currentUserId);
    if (!user) return null;
    const { passwordHash: _, ...profile } = user;
    return profile;
  }

  public signIn(email: string, password: string): { success: boolean; error?: string; user?: UserProfile } {
    const cleanEmail = email.trim().toLowerCase();
    const user = this.users.find(u => u.email.toLowerCase() === cleanEmail);
    if (!user) {
      return { success: false, error: 'No account found with this email address.' };
    }

    if (user.passwordHash !== password) {
      return { success: false, error: 'Incorrect password. Try again or use a demo account.' };
    }

    this.currentUserId = user.id;
    try {
      localStorage.setItem(CURRENT_USER_KEY, user.id);
    } catch (e) {
      console.error('Error saving session', e);
    }

    const { passwordHash: _, ...profile } = user;
    return { success: true, user: profile };
  }

  public signUp(name: string, email: string, password: string, role: UserRole = 'home_cook'): { success: boolean; error?: string; user?: UserProfile } {
    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim();

    if (!cleanName) {
      return { success: false, error: 'Please enter your full name.' };
    }
    if (!cleanEmail || !cleanEmail.includes('@')) {
      return { success: false, error: 'Please enter a valid email address.' };
    }
    if (!password || password.length < 4) {
      return { success: false, error: 'Password must be at least 4 characters long.' };
    }

    if (this.users.some(u => u.email.toLowerCase() === cleanEmail)) {
      return { success: false, error: 'An account with this email already exists. Please sign in instead.' };
    }

    const newId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
    const newUser: StoredUser = {
      id: newId,
      name: cleanName,
      email: cleanEmail,
      role,
      avatarUrl: `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(cleanName)}`,
      createdAt: new Date().toISOString(),
      passwordHash: password,
    };

    // User data starts with full cloned base catalog of recipes & ingredients, but an EMPTY weekly plan!
    const newUserData: UserAccountData = {
      userId: newId,
      recipes: JSON.parse(JSON.stringify(INITIAL_RECIPES)),
      ingredients: JSON.parse(JSON.stringify(INITIAL_INGREDIENTS)),
      weeklyPlan: getEmptyWeeklyPlan(),
      hasPopulatedStarterWeek: false,
    };

    this.users.push(newUser);
    this.currentUserId = newId;

    try {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(this.users));
      localStorage.setItem(CURRENT_USER_KEY, newId);
      localStorage.setItem(`${USERDATA_KEY_PREFIX}${newId}`, JSON.stringify(newUserData));
    } catch (e) {
      console.error('Failed to save new user to localStorage', e);
    }

    const { passwordHash: _, ...profile } = newUser;
    return { success: true, user: profile };
  }

  public switchUser(userId: string): UserProfile | null {
    const user = this.users.find(u => u.id === userId);
    if (!user) return null;

    this.currentUserId = userId;
    try {
      localStorage.setItem(CURRENT_USER_KEY, userId);
    } catch (e) {
      console.error('Failed to switch user', e);
    }

    const { passwordHash: _, ...profile } = user;
    return profile;
  }

  public signOut(): void {
    this.currentUserId = null;
    try {
      localStorage.removeItem(CURRENT_USER_KEY);
    } catch (e) {
      console.error('Failed to sign out', e);
    }
  }

  public getUserData(userId: string): UserAccountData {
    const key = `${USERDATA_KEY_PREFIX}${userId}`;
    try {
      const dataJson = localStorage.getItem(key);
      if (dataJson) {
        return JSON.parse(dataJson);
      }
    } catch (e) {
      console.error('Failed to read user data', e);
    }

    // Default fallback if not found
    const fallbackData: UserAccountData = {
      userId,
      recipes: JSON.parse(JSON.stringify(INITIAL_RECIPES)),
      ingredients: JSON.parse(JSON.stringify(INITIAL_INGREDIENTS)),
      weeklyPlan: getEmptyWeeklyPlan(),
      hasPopulatedStarterWeek: false,
    };
    try {
      localStorage.setItem(key, JSON.stringify(fallbackData));
    } catch (e) {
      console.error('Failed to write default user data', e);
    }
    return fallbackData;
  }

  public saveUserData(userId: string, update: Partial<UserAccountData>): UserAccountData {
    const current = this.getUserData(userId);
    const updated: UserAccountData = {
      ...current,
      ...update,
    };
    const key = `${USERDATA_KEY_PREFIX}${userId}`;
    try {
      localStorage.setItem(key, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save user data', e);
    }
    return updated;
  }

  public populateStarterWeek(userId: string): UserAccountData {
    return this.saveUserData(userId, {
      weeklyPlan: getCanonicalStarterWeeklyPlan(),
      hasPopulatedStarterWeek: true,
    });
  }

  public clearWeeklyPlan(userId: string): UserAccountData {
    return this.saveUserData(userId, {
      weeklyPlan: getEmptyWeeklyPlan(),
      hasPopulatedStarterWeek: false,
    });
  }
}

export const authStore = new AuthStore();
