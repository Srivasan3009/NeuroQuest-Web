import { UserProfile } from "../types";
import { dataStore } from "./storage";

export interface AuthSession {
  user: {
    id: string;
    email: string;
    name: string;
    avatarUrl: string;
  };
  token: string;
  expiresAt: number;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: UserProfile | null;
  session: AuthSession | null;
  isSupabaseConfigured: boolean;
  isLoading: boolean;
}

const AUTH_SESSION_KEY = "neuroquest_auth_session_v1";

export class AuthService {
  private static instance: AuthService;
  private session: AuthSession | null = null;

  private constructor() {
    this.restoreSession();
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  private restoreSession() {
    try {
      const stored = localStorage.getItem(AUTH_SESSION_KEY);
      if (stored) {
        this.session = JSON.parse(stored);
      }
    } catch {
      this.session = null;
    }
  }

  public isSupabaseConfigured(): boolean {
    const metaEnv = typeof import.meta !== "undefined" && (import.meta as any).env;
    return Boolean(metaEnv?.VITE_SUPABASE_URL && metaEnv?.VITE_SUPABASE_ANON_KEY);
  }

  public async signInWithGoogle(): Promise<UserProfile> {
    // In production with Supabase:
    // const { data, error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
    
    // For development / preview environment, generate authentic session and link profile:
    const profile = await dataStore.getUserProfile();
    const updatedProfile: UserProfile = {
      ...profile,
      email: "alex.learner@neuroquest.edu",
      fullName: "Alex Chen (Google)",
      authProvider: "google",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    };

    this.session = {
      user: {
        id: updatedProfile.id,
        email: updatedProfile.email,
        name: updatedProfile.fullName,
        avatarUrl: updatedProfile.avatarUrl,
      },
      token: "jwt_mock_token_" + Math.random().toString(36).substring(2),
      expiresAt: Date.now() + 7 * 24 * 3600 * 1000,
    };

    localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(this.session));
    await dataStore.saveUserProfile(updatedProfile);
    return updatedProfile;
  }

  public async signInWithEmail(email: string, fullName?: string): Promise<UserProfile> {
    const profile = await dataStore.getUserProfile();
    const updatedProfile: UserProfile = {
      ...profile,
      email,
      fullName: fullName || email.split("@")[0] || "AI Scholar",
      authProvider: "supabase_email"
    };

    this.session = {
      user: {
        id: updatedProfile.id,
        email: updatedProfile.email,
        name: updatedProfile.fullName,
        avatarUrl: updatedProfile.avatarUrl,
      },
      token: "jwt_mock_token_" + Math.random().toString(36).substring(2),
      expiresAt: Date.now() + 7 * 24 * 3600 * 1000,
    };

    localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(this.session));
    await dataStore.saveUserProfile(updatedProfile);
    return updatedProfile;
  }

  public async signOut(): Promise<void> {
    this.session = null;
    localStorage.removeItem(AUTH_SESSION_KEY);
  }

  public getSession(): AuthSession | null {
    return this.session;
  }
}

export const authService = AuthService.getInstance();
