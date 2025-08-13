import { Home, FileText } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

type SidebarProps = {
  className?: string;
};

const Sidebar: React.FC<SidebarProps>=({ className = "" }) => {
  const location = useLocation();

  const isActive = (path: string): boolean => {
    return location.pathname.startsWith(path);
  };

  return (
    <div className={`w-24 bg-gray-950 text-white flex flex-col items-center py-6 ${className}`}>
      <div className="text-xl font-bold mb-10 text-orange-400 uppercase text-center w-full">
        Logo
      </div>
      <nav className="flex flex-col space-y-6 items-center">
        <Link
          to="/search"
          className={`flex flex-col items-center text-xs transition-colors ${
            isActive("/search") || isActive("/results")
              ? "text-white font-bold"
              : "text-gray-400 hover:text-white"
          }`}
        >
          <Home size={24} />
          <span>Home</span>
        </Link>

        <Link
          to="/search/tags"
          className={`flex flex-col items-center text-xs transition-colors ${
            isActive("/tags")
              ? "text-white font-bold"
              : "text-gray-400 hover:text-white"
          }`}
        >
          <FileText size={24} />
          <span>Tags</span>
        </Link>
      </nav>
    </div>
  );
}

export default Sidebar;
