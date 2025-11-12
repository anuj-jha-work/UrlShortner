import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logoutUser } from '../../store/slices/authSlice';
import Container from '../Container/Container';
import Logo from '../Logo';
import Button from '../Button';

interface HeaderProps {}

const Header = ({}: HeaderProps) => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logoutUser());
    setIsDropdownOpen(false);
  };

  return (
    <header className="py-4 shadow-lg bg-white border-b border-gray-200 sticky top-0 z-50 transition-all duration-300">
      <Container>
        <nav className="flex items-center justify-between">
          <div className="mr-4">
            <Link to="/">
              <Logo variant="text" size={28} />
            </Link>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <Link
              to="/"
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors px-3 md:px-4 py-2 rounded-lg hover:bg-gray-100 text-sm md:text-base"
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors px-3 md:px-4 py-2 rounded-lg hover:bg-gray-100 text-sm md:text-base"
            >
              Dashboard
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to="/my-urls"
                  className="text-gray-700 hover:text-gray-900 font-medium transition-colors px-3 md:px-4 py-2 rounded-lg hover:bg-gray-100 text-sm md:text-base"
                >
                  My URLs
                </Link>
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 text-white hover:bg-gray-900 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                    aria-label="User menu"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </button>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50 animate-fadeIn">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-semibold text-gray-900">
                          {user?.name}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {user?.email}
                        </p>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-2"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          />
                        </svg>
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-gray-900 font-medium transition-colors px-3 md:px-4 py-2 rounded-lg hover:bg-gray-100 text-sm md:text-base"
                >
                  Login
                </Link>
                <Link to="/register">
                  <Button className="text-sm px-3 py-1.5 md:px-4 md:py-2">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
