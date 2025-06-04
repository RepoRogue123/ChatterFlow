import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import AuthImagePattern from "../components/AuthImagePattern";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react";

const BG_IMAGE_RIGHT = "/image.jpg";
const BG_IMAGE_LEFT = "/left_image.jpg";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="h-screen grid lg:grid-cols-2">
      {/* Left Side - Background Image with Overlay and Form */}
      <div className="relative flex flex-col justify-center items-center p-6 sm:p-12 min-h-full">
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            background: `url('${BG_IMAGE_LEFT}') center center no-repeat`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            filter: 'brightness(1.25)',
          }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div
                className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors"
              >
                <MessageSquare className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2 text-white drop-shadow-lg">Welcome Back</h1>
              <p className="text-base-content/60 text-white/80">Sign in to your account</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-white">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-white/60" />
                </div>
                <input
                  type="email"
                  className={`input input-bordered w-full pl-10 bg-base-200/80 backdrop-blur-md text-white placeholder-white/70`}
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-white">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-white/60" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`input input-bordered w-full pl-10 bg-base-200/80 backdrop-blur-md text-white placeholder-white/70`}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-white/60" />
                  ) : (
                    <Eye className="h-5 w-5 text-white/60" />
                  )}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-full" disabled={isLoggingIn}>
              {isLoggingIn ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-white/80">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="link link-primary">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Background Image with Overlay and Welcome Text */}
      <div className="relative flex flex-col items-center justify-center min-h-full">
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            background: `url('${BG_IMAGE_RIGHT}') center center / cover no-repeat`,
            backgroundSize: 'cover',
            filter: 'brightness(1.25)',
          }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
          <h2 className="text-2xl font-bold mb-2 text-white drop-shadow-lg">Welcome back!</h2>
          <p className="text-base text-white/80 max-w-md drop-shadow">Sign in to continue your conversations and catch up with your messages.</p>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
