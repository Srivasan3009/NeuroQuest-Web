import React, { useState, useEffect } from "react";
import {
  Sparkles,
  Zap,
  Eye,
  EyeOff,
  ArrowRight,
  Lock,
  Mail,
  User,
  KeyRound,
  Check,
  Sun,
  Moon,
  ChevronRight,
  FileSpreadsheet,
  ShieldCheck,
  Send,
  Timer,
  RefreshCw,
  Copy,
  ExternalLink,
  Info
} from "lucide-react";
import { AppTheme, UserProfile } from "../../types";
import { soundFx } from "../../utils/sound";
import { dataStore } from "../../services/storage";
import { authService } from "../../services/auth";
import { INITIAL_PROFILE } from "../../data/gamification";
import { GOOGLE_SHEET_NAME, googleSheetsService } from "../../services/googleSheets";

interface AuthStarterViewProps {
  onLoginSuccess: (profile: UserProfile) => void;
  activeTheme: AppTheme;
  onToggleTheme: () => void;
}

export const AuthStarterView: React.FC<AuthStarterViewProps> = ({
  onLoginSuccess,
  activeTheme,
  onToggleTheme,
}) => {
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");

  // Sign In fields
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [signInCode, setSignInCode] = useState("");
  const [signInCodeSent, setSignInCodeSent] = useState(false);
  const [signInActiveCode, setSignInActiveCode] = useState<string | null>(null);

  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successNotice, setSuccessNotice] = useState("");

  // Sign Up fields
  const [signupName, setSignupName] = useState("");
  const [signupUsername, setSignupUsername] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupAge, setSignupAge] = useState<string>("20");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupCode, setSignupCode] = useState("");
  const [signupCodeSent, setSignupCodeSent] = useState(false);
  const [signupActiveCode, setSignupActiveCode] = useState<string | null>(null);

  // Live countdown timer for codes
  const [codeCountdown, setCodeCountdown] = useState<number>(0);
  const [copiedCode, setCopiedCode] = useState(false);

  // Forgot password modal state
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotStep, setForgotStep] = useState<"email" | "code" | "success">("email");
  const [forgotCode, setForgotCode] = useState("7749");
  const [newPassword, setNewPassword] = useState("");

  const isDark =
    activeTheme === "obsidian-noir" ||
    activeTheme === "obsidian-gold" ||
    activeTheme === "neon-matrix" ||
    activeTheme === "cyber-dark";
  const isNeumorphic = activeTheme === "neumorphic";

  // Countdown effect
  useEffect(() => {
    if (codeCountdown <= 0) return;
    const interval = setInterval(() => {
      setCodeCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [codeCountdown]);

  // Password strength calculation
  const getPasswordStrength = (pass: string) => {
    if (!pass) return 0;
    let score = 0;
    if (pass.length >= 6) score += 1;
    if (pass.length >= 8) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;
    return score; // 0 to 4
  };

  const passwordStrength = getPasswordStrength(signupPassword);

  // Send live verification code for Sign In
  const handleSendSignInCode = () => {
    const trimmedEmail = signInEmail.trim();
    if (!trimmedEmail) {
      soundFx.playWrong();
      setErrorMessage("Please enter your email address first.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      soundFx.playWrong();
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    soundFx.playTap();
    setErrorMessage("");
    const result = authService.generateVerificationCode(trimmedEmail, "signin");
    setSignInActiveCode(result.code);
    setSignInCodeSent(true);
    setCodeCountdown(60);
    setSuccessNotice(`Live 6-digit verification code generated for ${trimmedEmail}!`);
    setTimeout(() => setSuccessNotice(""), 6000);
  };

  // Send live verification code for Sign Up
  const handleSendSignUpCode = () => {
    const trimmedEmail = signupEmail.trim();
    if (!trimmedEmail) {
      soundFx.playWrong();
      setErrorMessage("Please enter your email address first.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      soundFx.playWrong();
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    soundFx.playTap();
    setErrorMessage("");
    const result = authService.generateVerificationCode(trimmedEmail, "signup");
    setSignupActiveCode(result.code);
    setSignupCodeSent(true);
    setCodeCountdown(60);
    setSuccessNotice(`Live 6-digit verification code generated for ${trimmedEmail}!`);
    setTimeout(() => setSuccessNotice(""), 6000);
  };

  // Submit Sign In with Email & Live 6-digit code
  const handleSignInSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedEmail = signInEmail.trim();
    if (!trimmedEmail) {
      soundFx.playWrong();
      setErrorMessage("Please enter your email address.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      soundFx.playWrong();
      setErrorMessage("Please enter a valid email address (e.g. name@domain.com).");
      return;
    }
    if (!signInPassword) {
      soundFx.playWrong();
      setErrorMessage("Please enter your password.");
      return;
    }
    if (!signInCode.trim()) {
      soundFx.playWrong();
      setErrorMessage("Please enter the 6-digit email verification code.");
      return;
    }

    setErrorMessage("");
    setIsLoading(true);
    soundFx.playTap();

    try {
      const updated = await authService.signInWithEmailAndCode(
        trimmedEmail,
        signInPassword,
        signInCode.trim()
      );
      soundFx.playMissionComplete();
      onLoginSuccess(updated);
    } catch (err: any) {
      soundFx.playWrong();
      setErrorMessage(err.message || "Failed to sign in. Please verify your credentials & code.");
    } finally {
      setIsLoading(false);
    }
  };

  // Submit Sign Up with Name, Username, Email, Age, Password, and Live Code
  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = signupName.trim();
    const cleanUsername = signupUsername.trim().replace(/^@/, "");
    const trimmedEmail = signupEmail.trim();
    const ageNum = parseInt(signupAge, 10);

    if (!trimmedName) {
      soundFx.playWrong();
      setErrorMessage("Please enter your full name.");
      return;
    }
    if (!cleanUsername || cleanUsername.length < 3) {
      soundFx.playWrong();
      setErrorMessage("Please choose a username (at least 3 characters).");
      return;
    }
    if (!trimmedEmail) {
      soundFx.playWrong();
      setErrorMessage("Please enter your email address.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      soundFx.playWrong();
      setErrorMessage("Please enter a valid email address (e.g. name@domain.com).");
      return;
    }
    if (isNaN(ageNum) || ageNum < 5 || ageNum > 120) {
      soundFx.playWrong();
      setErrorMessage("Please enter a valid age between 5 and 120.");
      return;
    }
    if (signupPassword.length < 6) {
      soundFx.playWrong();
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }
    if (!signupCode.trim()) {
      soundFx.playWrong();
      setErrorMessage("Please enter the 6-digit verification code sent to your email.");
      return;
    }

    setErrorMessage("");
    setIsLoading(true);
    soundFx.playTap();

    try {
      const newProfile = await authService.signUpWithDetails({
        fullName: trimmedName,
        username: cleanUsername,
        email: trimmedEmail,
        age: ageNum,
        password: signupPassword,
        verificationCode: signupCode.trim(),
      });
      soundFx.playMissionComplete();
      onLoginSuccess(newProfile);
    } catch (err: any) {
      soundFx.playWrong();
      setErrorMessage(err.message || "Failed to create account. Please check verification code.");
    } finally {
      setIsLoading(false);
    }
  };

  // Google Sign In
  const handleGoogleSignIn = async () => {
    setErrorMessage("");
    setIsLoading(true);
    soundFx.playTap();
    try {
      const updated = await authService.signInWithGoogle();
      soundFx.playMissionComplete();
      onLoginSuccess(updated);
    } catch (err: any) {
      soundFx.playWrong();
      setErrorMessage(err.message || "Google sign-in was cancelled or unavailable.");
    } finally {
      setIsLoading(false);
    }
  };

  // Copy code helper
  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    soundFx.playTap();
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div
      id="auth-starter-view"
      className="min-h-screen flex flex-col justify-between p-4 sm:p-6 transition-colors duration-200"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between max-w-md w-full mx-auto pt-2 pb-4">
        <div className="flex items-center gap-2">
          <div
            className={`w-9 h-9 rounded-2xl flex items-center justify-center font-black text-base shadow-sm ${
              isNeumorphic
                ? "neu-btn text-indigo-600"
                : isDark
                ? "bg-amber-400 text-zinc-950 border border-amber-400"
                : "bg-[#4F46E5] text-white border-2 border-[#1E1B18] shadow-[2px_2px_0px_#1E1B18]"
            }`}
          >
            N
          </div>
          <div>
            <div className="text-xs font-black uppercase tracking-wider">NEUROQUEST</div>
            <div className="text-[10px] font-mono text-slate-400">AI ACADEMY</div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            soundFx.playTap();
            onToggleTheme();
          }}
          className={`p-2 rounded-xl text-xs flex items-center gap-1.5 transition-all ${
            isNeumorphic
              ? "neu-btn text-slate-700"
              : isDark
              ? "bg-[#27272A] border border-[#3F3F46] text-amber-400"
              : "bg-[#FFFDF9] border-2 border-[#1E1B18] text-[#1E1B18] shadow-[2px_2px_0px_#1E1B18]"
          }`}
        >
          {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          <span className="font-mono font-bold text-[11px] uppercase">
            {activeTheme.replace("-", " ")}
          </span>
        </button>
      </div>

      {/* Main Card */}
      <div className="max-w-md w-full mx-auto my-auto py-4">
        <div
          className={`p-6 sm:p-8 rounded-3xl transition-all shadow-xl ${
            isNeumorphic
              ? "neu-raised text-slate-800"
              : isDark
              ? "bg-[#27272A] border border-[#3F3F46] text-[#F4F4F5]"
              : "bg-[#FFFDF9] border-2 border-[#1E1B18] text-[#1E1B18] shadow-[5px_5px_0px_#1E1B18]"
          }`}
        >
          {/* Header Title */}
          <div className="text-center space-y-1.5 mb-6">
            <h1 className="text-2xl font-black uppercase tracking-tight">
              {authMode === "signin" ? "WELCOME BACK" : "CREATE CADET ID"}
            </h1>
            <p className={`text-xs ${isDark ? "text-zinc-400" : "text-slate-500"}`}>
              {authMode === "signin"
                ? "Enter your credentials and 6-digit email code"
                : "Register your real details & verify live code"}
            </p>
          </div>

          {/* Tab Selector */}
          <div
            className={`p-1 rounded-2xl flex items-center mb-5 ${
              isNeumorphic
                ? "neu-inset"
                : isDark
                ? "bg-[#18181B] border border-[#3F3F46]"
                : "bg-zinc-100 border-2 border-[#1E1B18]"
            }`}
          >
            <button
              type="button"
              id="tab-signin"
              onClick={() => {
                soundFx.playTap();
                setAuthMode("signin");
                setErrorMessage("");
                setSuccessNotice("");
              }}
              className={`flex-1 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                authMode === "signin"
                  ? isNeumorphic
                    ? "neu-btn text-indigo-600"
                    : isDark
                    ? "bg-[#27272A] text-amber-400 shadow-sm"
                    : "bg-[#4F46E5] text-white shadow-[2px_2px_0px_#1E1B18]"
                  : isDark
                  ? "text-zinc-400 hover:text-zinc-200"
                  : "text-zinc-600 hover:text-zinc-900"
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>

            <button
              type="button"
              id="tab-signup"
              onClick={() => {
                soundFx.playTap();
                setAuthMode("signup");
                setErrorMessage("");
                setSuccessNotice("");
              }}
              className={`flex-1 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                authMode === "signup"
                  ? isNeumorphic
                    ? "neu-btn text-indigo-600"
                    : isDark
                    ? "bg-[#27272A] text-amber-400 shadow-sm"
                    : "bg-[#4F46E5] text-white shadow-[2px_2px_0px_#1E1B18]"
                  : isDark
                  ? "text-zinc-400 hover:text-zinc-200"
                  : "text-zinc-600 hover:text-zinc-900"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Create Account</span>
            </button>
          </div>

          {/* Google Quick Sign-In */}
          <div className="mb-4">
            <button
              type="button"
              id="btn-google-signin"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2.5 transition-all active:scale-[0.99] ${
                isNeumorphic
                  ? "neu-btn text-slate-800"
                  : isDark
                  ? "bg-[#18181B] border border-[#3F3F46] text-zinc-100 hover:bg-[#27272A] hover:border-amber-400/50"
                  : "bg-[#FFFDF9] border-2 border-[#1E1B18] text-[#1E1B18] hover:bg-zinc-50 shadow-[2px_2px_0px_#1E1B18]"
              }`}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google (Auto Sheets Sync)</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative my-4 flex items-center justify-center">
            <div className="border-t border-slate-200 dark:border-zinc-700 w-full" />
            <span className="bg-transparent px-3 text-[10px] font-mono uppercase tracking-widest text-slate-400 shrink-0">
              OR WITH EMAIL & 6-DIGIT CODE
            </span>
          </div>

          {/* Google Sheets Ledger Info Banner */}
          <div
            className={`mb-4 p-2.5 rounded-xl flex items-center gap-2.5 text-[11px] font-mono ${
              isDark
                ? "bg-amber-500/10 border border-amber-500/20 text-amber-300"
                : "bg-indigo-50 border border-indigo-200 text-indigo-700"
            }`}
          >
            <FileSpreadsheet className="w-4 h-4 shrink-0 text-emerald-500" />
            <div className="truncate">
              Auto-syncs user details to: <span className="font-bold">"{GOOGLE_SHEET_NAME}"</span> on your Drive
            </div>
          </div>

          {/* Success Notice */}
          {successNotice && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-medium flex items-center gap-2 animate-in fade-in">
              <Check className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>{successNotice}</span>
            </div>
          )}

          {/* Error Message Toast */}
          {errorMessage && (
            <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs font-medium flex items-center gap-2 animate-shake">
              <div className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* ========================================================================= */}
          {/* MODE 1: SIGN IN WITH EMAIL & 6-DIGIT CODE                                */}
          {/* ========================================================================= */}
          {authMode === "signin" && (
            <form onSubmit={handleSignInSubmit} className="space-y-4">
              {/* Email field */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold font-mono uppercase tracking-wider">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    id="input-signin-email"
                    type="email"
                    value={signInEmail}
                    onChange={(e) => setSignInEmail(e.target.value)}
                    placeholder="alex.learner@neuroquest.edu"
                    required
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-sm font-medium outline-none transition-all ${
                      isNeumorphic
                        ? "neu-inset text-slate-800 focus:ring-2 focus:ring-indigo-500"
                        : isDark
                        ? "bg-[#18181B] border border-[#3F3F46] text-[#F4F4F5] focus:border-amber-400"
                        : "bg-[#FFFDF9] border-2 border-[#1E1B18] text-[#1E1B18] focus:border-[#4F46E5]"
                    }`}
                  />
                </div>
              </div>

              {/* Password field */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold font-mono uppercase tracking-wider">
                    Password
                  </label>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    id="input-signin-password"
                    type={showPassword ? "text" : "password"}
                    value={signInPassword}
                    onChange={(e) => setSignInPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className={`w-full pl-10 pr-10 py-2.5 rounded-xl text-sm font-medium outline-none transition-all ${
                      isNeumorphic
                        ? "neu-inset text-slate-800 focus:ring-2 focus:ring-indigo-500"
                        : isDark
                        ? "bg-[#18181B] border border-[#3F3F46] text-[#F4F4F5] focus:border-amber-400"
                        : "bg-[#FFFDF9] border-2 border-[#1E1B18] text-[#1E1B18] focus:border-[#4F46E5]"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Email Verification Code Section for Sign-In */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold font-mono uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Email Verification Code (6 Digits)</span>
                  </label>
                  <button
                    type="button"
                    id="btn-send-signin-code"
                    onClick={handleSendSignInCode}
                    disabled={codeCountdown > 0}
                    className={`text-[11px] font-mono font-bold flex items-center gap-1 px-2 py-0.5 rounded-md transition-all ${
                      codeCountdown > 0
                        ? "text-slate-400 opacity-60"
                        : "text-indigo-500 hover:text-indigo-600 hover:underline"
                    }`}
                  >
                    {codeCountdown > 0 ? (
                      <>
                        <Timer className="w-3 h-3 animate-spin" />
                        <span>Resend in {codeCountdown}s</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3 h-3" />
                        <span>{signInCodeSent ? "Resend Code" : "Send 6-Digit Code"}</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="relative">
                  <KeyRound className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    id="input-signin-code"
                    type="text"
                    maxLength={6}
                    value={signInCode}
                    onChange={(e) => setSignInCode(e.target.value.replace(/\D/g, ""))}
                    placeholder="Enter 6-digit code"
                    required
                    className={`w-full pl-10 pr-20 py-2.5 rounded-xl text-sm font-mono tracking-widest font-bold outline-none transition-all ${
                      isNeumorphic
                        ? "neu-inset text-slate-800 focus:ring-2 focus:ring-indigo-500"
                        : isDark
                        ? "bg-[#18181B] border border-[#3F3F46] text-[#F4F4F5] focus:border-amber-400"
                        : "bg-[#FFFDF9] border-2 border-[#1E1B18] text-[#1E1B18] focus:border-[#4F46E5]"
                    }`}
                  />
                  {signInActiveCode && (
                    <button
                      type="button"
                      onClick={() => setSignInCode(signInActiveCode)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-mono font-bold px-2 py-1 rounded bg-indigo-500/10 text-indigo-500 hover:bg-indigo-500/20"
                    >
                      Auto-Fill
                    </button>
                  )}
                </div>

                {/* Live Code Notification simulation card */}
                {signInActiveCode && (
                  <div
                    className={`p-3 rounded-xl border flex items-center justify-between text-xs animate-in fade-in ${
                      isDark
                        ? "bg-zinc-900 border-zinc-700 text-zinc-200"
                        : "bg-slate-50 border-slate-200 text-slate-800"
                    }`}
                  >
                    <div className="space-y-0.5">
                      <div className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                        <Mail className="w-3 h-3 text-indigo-500" />
                        <span>Live Verification Code Generated:</span>
                      </div>
                      <div className="text-base font-black font-mono tracking-widest text-indigo-600 dark:text-indigo-400">
                        {signInActiveCode.slice(0, 3)} {signInActiveCode.slice(3)}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopyCode(signInActiveCode)}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold border flex items-center gap-1 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    >
                      {copiedCode ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedCode ? "Copied" : "Copy"}</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                id="btn-submit-signin"
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 px-4 rounded-xl font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:translate-y-0.5 ${
                  isNeumorphic
                    ? "neu-btn-primary shadow-lg"
                    : isDark
                    ? "bg-amber-400 text-zinc-950 hover:bg-amber-300 font-black shadow-lg"
                    : "bg-[#4F46E5] text-white hover:bg-[#4338CA] border-2 border-[#1E1B18] shadow-[3px_3px_0px_#1E1B18]"
                }`}
              >
                {isLoading ? (
                  <span className="inline-block animate-spin">✦</span>
                ) : (
                  <>
                    <span>VERIFY & ENTER CAMPUS</span>
                    <ArrowRight className="w-4 h-4 stroke-[3]" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* ========================================================================= */}
          {/* MODE 2: SIGN UP (FIRST TIME CREATE ACCOUNT - NAME, USERNAME, EMAIL, AGE)  */}
          {/* ========================================================================= */}
          {authMode === "signup" && (
            <form onSubmit={handleSignUpSubmit} className="space-y-3.5">
              {/* Full Name & Username */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-bold font-mono uppercase tracking-wider">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      id="input-signup-name"
                      type="text"
                      value={signupName}
                      onChange={(e) => {
                        setSignupName(e.target.value);
                        if (!signupUsername) {
                          setSignupUsername(
                            e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, "")
                          );
                        }
                      }}
                      placeholder="e.g. Shanthi Kumar"
                      required
                      className={`w-full pl-9 pr-3 py-2 rounded-xl text-xs font-medium outline-none transition-all ${
                        isNeumorphic
                          ? "neu-inset text-slate-800 focus:ring-2 focus:ring-indigo-500"
                          : isDark
                          ? "bg-[#18181B] border border-[#3F3F46] text-[#F4F4F5] focus:border-amber-400"
                          : "bg-[#FFFDF9] border-2 border-[#1E1B18] text-[#1E1B18] focus:border-[#4F46E5]"
                      }`}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold font-mono uppercase tracking-wider">
                    Username
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-indigo-500">
                      @
                    </span>
                    <input
                      id="input-signup-username"
                      type="text"
                      value={signupUsername}
                      onChange={(e) =>
                        setSignupUsername(
                          e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, "")
                        )
                      }
                      placeholder="shanthi_ai"
                      required
                      className={`w-full pl-8 pr-3 py-2 rounded-xl text-xs font-mono font-bold outline-none transition-all ${
                        isNeumorphic
                          ? "neu-inset text-slate-800 focus:ring-2 focus:ring-indigo-500"
                          : isDark
                          ? "bg-[#18181B] border border-[#3F3F46] text-[#F4F4F5] focus:border-amber-400"
                          : "bg-[#FFFDF9] border-2 border-[#1E1B18] text-[#1E1B18] focus:border-[#4F46E5]"
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Email Address & Age */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2 space-y-1">
                  <label className="block text-xs font-bold font-mono uppercase tracking-wider">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      id="input-signup-email"
                      type="email"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      placeholder="shanthe2021@gmail.com"
                      required
                      className={`w-full pl-9 pr-3 py-2 rounded-xl text-xs font-medium outline-none transition-all ${
                        isNeumorphic
                          ? "neu-inset text-slate-800 focus:ring-2 focus:ring-indigo-500"
                          : isDark
                          ? "bg-[#18181B] border border-[#3F3F46] text-[#F4F4F5] focus:border-amber-400"
                          : "bg-[#FFFDF9] border-2 border-[#1E1B18] text-[#1E1B18] focus:border-[#4F46E5]"
                      }`}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold font-mono uppercase tracking-wider">
                    Age
                  </label>
                  <input
                    id="input-signup-age"
                    type="number"
                    min="5"
                    max="120"
                    value={signupAge}
                    onChange={(e) => setSignupAge(e.target.value)}
                    placeholder="22"
                    required
                    className={`w-full px-3 py-2 rounded-xl text-xs font-mono font-bold outline-none transition-all text-center ${
                      isNeumorphic
                        ? "neu-inset text-slate-800 focus:ring-2 focus:ring-indigo-500"
                        : isDark
                        ? "bg-[#18181B] border border-[#3F3F46] text-[#F4F4F5] focus:border-amber-400"
                        : "bg-[#FFFDF9] border-2 border-[#1E1B18] text-[#1E1B18] focus:border-[#4F46E5]"
                    }`}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1">
                <label className="block text-xs font-bold font-mono uppercase tracking-wider">
                  Create Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    id="input-signup-password"
                    type={showPassword ? "text" : "password"}
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    placeholder="Minimum 6 characters"
                    required
                    className={`w-full pl-9 pr-9 py-2 rounded-xl text-xs font-medium outline-none transition-all ${
                      isNeumorphic
                        ? "neu-inset text-slate-800 focus:ring-2 focus:ring-indigo-500"
                        : isDark
                        ? "bg-[#18181B] border border-[#3F3F46] text-[#F4F4F5] focus:border-amber-400"
                        : "bg-[#FFFDF9] border-2 border-[#1E1B18] text-[#1E1B18] focus:border-[#4F46E5]"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Email Verification Code Section for Sign-Up */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold font-mono uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Email Verification Code</span>
                  </label>
                  <button
                    type="button"
                    id="btn-send-signup-code"
                    onClick={handleSendSignUpCode}
                    disabled={codeCountdown > 0}
                    className={`text-[11px] font-mono font-bold flex items-center gap-1 px-2 py-0.5 rounded-md transition-all ${
                      codeCountdown > 0
                        ? "text-slate-400 opacity-60"
                        : "text-indigo-500 hover:text-indigo-600 hover:underline"
                    }`}
                  >
                    {codeCountdown > 0 ? (
                      <>
                        <Timer className="w-3 h-3 animate-spin" />
                        <span>Resend in {codeCountdown}s</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3 h-3" />
                        <span>{signupCodeSent ? "Resend Code" : "Send 6-Digit Code"}</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="relative">
                  <KeyRound className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    id="input-signup-code"
                    type="text"
                    maxLength={6}
                    value={signupCode}
                    onChange={(e) => setSignupCode(e.target.value.replace(/\D/g, ""))}
                    placeholder="Enter 6-digit verification code"
                    required
                    className={`w-full pl-9 pr-20 py-2 rounded-xl text-xs font-mono tracking-widest font-bold outline-none transition-all ${
                      isNeumorphic
                        ? "neu-inset text-slate-800 focus:ring-2 focus:ring-indigo-500"
                        : isDark
                        ? "bg-[#18181B] border border-[#3F3F46] text-[#F4F4F5] focus:border-amber-400"
                        : "bg-[#FFFDF9] border-2 border-[#1E1B18] text-[#1E1B18] focus:border-[#4F46E5]"
                    }`}
                  />
                  {signupActiveCode && (
                    <button
                      type="button"
                      onClick={() => setSignupCode(signupActiveCode)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-mono font-bold px-2 py-1 rounded bg-indigo-500/10 text-indigo-500 hover:bg-indigo-500/20"
                    >
                      Auto-Fill
                    </button>
                  )}
                </div>

                {/* Live Code Notification simulation card */}
                {signupActiveCode && (
                  <div
                    className={`p-3 rounded-xl border flex items-center justify-between text-xs animate-in fade-in ${
                      isDark
                        ? "bg-zinc-900 border-zinc-700 text-zinc-200"
                        : "bg-slate-50 border-slate-200 text-slate-800"
                    }`}
                  >
                    <div className="space-y-0.5">
                      <div className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                        <Mail className="w-3 h-3 text-indigo-500" />
                        <span>Live Verification Code for {signupEmail || "Email"}:</span>
                      </div>
                      <div className="text-base font-black font-mono tracking-widest text-indigo-600 dark:text-indigo-400">
                        {signupActiveCode.slice(0, 3)} {signupActiveCode.slice(3)}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopyCode(signupActiveCode)}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold border flex items-center gap-1 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    >
                      {copiedCode ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedCode ? "Copied" : "Copy"}</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Submit button */}
              <button
                id="btn-submit-signup"
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 px-4 rounded-xl font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:translate-y-0.5 mt-2 ${
                  isNeumorphic
                    ? "neu-btn-primary shadow-lg"
                    : isDark
                    ? "bg-amber-400 text-zinc-950 hover:bg-amber-300 font-black shadow-lg"
                    : "bg-[#4F46E5] text-white hover:bg-[#4338CA] border-2 border-[#1E1B18] shadow-[3px_3px_0px_#1E1B18]"
                }`}
              >
                {isLoading ? (
                  <span className="inline-block animate-spin">✦</span>
                ) : (
                  <>
                    <span>CREATE CADET & SYNC TO DRIVE</span>
                    <ArrowRight className="w-4 h-4 stroke-[3]" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-[11px] font-mono text-slate-400 pb-2">
        <span>NeuroQuest AI Learning OS • Protected with Code Verification & Drive Sheets Sync</span>
      </div>
    </div>
  );
};
