import { Home, FileText } from "lucide-react"
import { Link, useLocation } from "react-router-dom"

const MobileNav = () => {
  const location = useLocation()

  const isActive = (path: string) => location.pathname.startsWith(path)

  return (
    <div className="fixed bottom-0 left-0 w-full bg-zinc-900 border-t border-gray-700 flex justify-around items-center py-2 z-50 md:hidden">
      <Link 
            to="/search" 
            className={`flex flex-col items-center text-xs transition-colors ${
            isActive("/search") || isActive("/results")
              ? "text-white font-bold"
              : "text-gray-400 hover:text-white"
          }`}
        >
        <Home size={24} />
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
      </Link>
    </div>
  )
}

export default MobileNav
