import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header
      className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 
      backdrop-blur-lg bg-base-100/80 animate-fade-in shadow-sm"
    >
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link 
              to="/" 
              className="flex items-center gap-2.5 hover:opacity-80 transition-all duration-300 hover:scale-105"
            >
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors duration-300">
                <MessageSquare className="w-5 h-5 text-primary animate-pulse-slow" />
              </div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-accent to-primary-400 bg-clip-text text-transparent drop-shadow-md">
                ChatterFlow
              </h1>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to={"/settings"}
              className="btn btn-sm gap-2 transition-all duration-300 hover:scale-105 hover:shadow-md hover:bg-accent/20 focus-visible:ring-2 focus-visible:ring-accent"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>

            {authUser && (
              <>
                <Link 
                  to={"/profile"} 
                  className="btn btn-sm gap-2 transition-all duration-300 hover:scale-105 hover:shadow-md hover:bg-accent/20 focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <User className="size-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button 
                  onClick={logout}
                  className="btn btn-sm gap-2 transition-all duration-300 hover:scale-105 hover:shadow-md hover:bg-error hover:text-error-content focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
