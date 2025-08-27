import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../actions/auth';
import { 
  Code2, 
  Users, 
  MessageCircle, 
  LayoutDashboard, 
  LogOut, 
  UserPlus, 
  LogIn,
  Menu,
  X,
  Sparkles,
  Home
} from 'lucide-react';

const Navbar = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector(state => state.auth);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navbarStyle = {
    position: 'fixed',
    top: isScrolled ? '10px' : '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: isScrolled ? '95%' : '90%',
    maxWidth: '1200px',
    borderRadius: isScrolled ? '50px' : '60px',
    border: '1px solid rgba(139, 92, 246, 0.3)',
    boxShadow: isScrolled 
      ? '0 8px 32px rgba(59, 130, 246, 0.2)' 
      : '0 12px 40px rgba(59, 130, 246, 0.3)',
    padding: isScrolled ? '12px 32px' : '16px 40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 1000,
    transition: 'all 0.3s ease',
    overflow: 'hidden'
  };

  const backgroundPatternStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)
    `,
    zIndex: 1
  };

  const logoContainerStyle = {
    position: 'relative',
    zIndex: 2,
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  const logoStyle = {
    color: 'white',
    textDecoration: 'none',
    fontSize: isScrolled ? '22px' : '24px',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'all 0.3s ease',
    background: 'linear-gradient(45deg, #ffffff, #a78bfa)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  };

  const navLinksStyle = {
    position: 'relative',
    zIndex: 2,
    display: 'flex',
    listStyle: 'none',
    margin: 0,
    padding: 0,
    gap: '8px',
    alignItems: 'center'
  };

  const mobileNavLinksStyle = {
    position: 'absolute',
    top: '100%',
    left: '0',
    right: '0',
    background: 'rgba(15, 15, 35, 0.98)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderRadius: '0 0 30px 30px',
    border: '1px solid rgba(139, 92, 246, 0.3)',
    borderTop: 'none',
    padding: '20px',
    display: isMobileMenuOpen ? 'flex' : 'none',
    flexDirection: 'column',
    gap: '12px',
    zIndex: 1000
  };

  const navLinkStyle = {
    color: '#d1d5db',
    textDecoration: 'none',
    padding: '10px 20px',
    borderRadius: '25px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    position: 'relative',
    overflow: 'hidden'
  };

  const activeLinkStyle = {
    ...navLinkStyle,
    background: 'linear-gradient(45deg, rgba(59, 130, 246, 0.3), rgba(139, 92, 246, 0.3))',
    border: '1px solid rgba(139, 92, 246, 0.5)',
    color: 'white'
  };

  const logoutLinkStyle = {
    ...navLinkStyle,
    background: 'linear-gradient(45deg, rgba(239, 68, 68, 0.2), rgba(220, 38, 38, 0.2))',
    border: '1px solid rgba(239, 68, 68, 0.3)',
    color: '#fca5a5'
  };

  const mobileToggleStyle = {
    display: 'none',
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '8px',
    padding: '8px',
    color: 'white',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    zIndex: 2,
    position: 'relative'
  };

  const sparkleStyle = {
    animation: 'sparkle 2s ease-in-out infinite',
    color: '#fbbf24'
  };

  const AuthLinks = ({ mobile = false }) => (
    <>
      <li>
        <Link 
          to="/profiles" 
          style={navLinkStyle}
          className="nav-link"
          onClick={mobile ? () => setIsMobileMenuOpen(false) : undefined}
        >
          <Users size={16} />
          <span>Developers</span>
        </Link>
      </li>
      <li>
        <Link 
          to="/posts" 
          style={navLinkStyle}
          className="nav-link"
          onClick={mobile ? () => setIsMobileMenuOpen(false) : undefined}
        >
          <MessageCircle size={16} />
          <span>Posts</span>
        </Link>
      </li>
      <li>
        <Link 
          to="/dashboard" 
          style={activeLinkStyle}
          className="nav-link active"
          onClick={mobile ? () => setIsMobileMenuOpen(false) : undefined}
        >
          <LayoutDashboard size={16} />
          <span>Dashboard</span>
        </Link>
      </li>
      <li>
        <a 
          onClick={() => {
            dispatch(logout());
            if (mobile) setIsMobileMenuOpen(false);
          }} 
          href="#!"
          style={logoutLinkStyle}
          className="nav-link logout"
        >
          <LogOut size={16} />
          <span>Logout</span>
        </a>
      </li>
    </>
  );

  const GuestLinks = ({ mobile = false }) => (
    <>
      <li>
        <Link 
          to="/" 
          style={navLinkStyle}
          className="nav-link"
          onClick={mobile ? () => setIsMobileMenuOpen(false) : undefined}
        >
          <Home size={16} />
          <span>Home</span>
        </Link>
      </li>
      <li>
        <Link 
          to="/profiles" 
          style={navLinkStyle}
          className="nav-link"
          onClick={mobile ? () => setIsMobileMenuOpen(false) : undefined}
        >
          <Users size={16} />
          <span>Developers</span>
        </Link>
      </li>
      <li>
        <Link 
          to="/register" 
          style={navLinkStyle}
          className="nav-link"
          onClick={mobile ? () => setIsMobileMenuOpen(false) : undefined}
        >
          <UserPlus size={16} />
          <span>Register</span>
        </Link>
      </li>
      <li>
        <Link 
          to="/login" 
          style={activeLinkStyle}
          className="nav-link active"
          onClick={mobile ? () => setIsMobileMenuOpen(false) : undefined}
        >
          <LogIn size={16} />
          <span>Login</span>
        </Link>
      </li>
    </>
  );

  return (
    <>
      <style>
        {`
          @keyframes sparkle {
            0%, 100% { opacity: 1; transform: scale(1) rotate(0deg); }
            50% { opacity: 0.7; transform: scale(1.1) rotate(180deg); }
          }
          
          @keyframes glow {
            0%, 100% { box-shadow: 0 0 5px rgba(139, 92, 246, 0.5); }
            50% { box-shadow: 0 0 20px rgba(139, 92, 246, 0.8), 0 0 30px rgba(59, 130, 246, 0.5); }
          }
          
          /* Fixed navbar background */
          .navbar-container {
            background: rgba(15, 15, 35, 0.95) !important;
            backdrop-filter: blur(20px) !important;
            -webkit-backdrop-filter: blur(20px) !important;
          }
          
          .navbar-container.scrolled {
            background: rgba(15, 15, 35, 0.98) !important;
          }
          
          /* Fallback for browsers that don't support backdrop-filter */
          @supports not (backdrop-filter: blur(20px)) {
            .navbar-container {
              background: rgba(15, 15, 35, 0.98) !important;
            }
          }
          
          .nav-link:hover {
            transform: translateY(-2px);
            background: rgba(255, 255, 255, 0.15) !important;
            box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3);
            color: white !important;
          }
          
          .nav-link.active:hover {
            background: linear-gradient(45deg, rgba(59, 130, 246, 0.4), rgba(139, 92, 246, 0.4)) !important;
            box-shadow: 0 4px 15px rgba(139, 92, 246, 0.5);
          }
          
          .nav-link.logout:hover {
            background: linear-gradient(45deg, rgba(239, 68, 68, 0.3), rgba(220, 38, 38, 0.3)) !important;
            box-shadow: 0 4px 15px rgba(239, 68, 68, 0.4);
            color: #fecaca !important;
          }
          
          .logo:hover {
            animation: glow 2s ease-in-out infinite;
          }
          
          .mobile-toggle:hover {
            background: rgba(255, 255, 255, 0.2) !important;
            transform: scale(1.05);
          }
          
          @media (max-width: 768px) {
            .desktop-nav {
              display: none !important;
            }
            
            .mobile-toggle {
              display: block !important;
            }
            
            .navbar-container {
              padding: 12px 24px !important;
            }
          }
          
          @media (min-width: 769px) {
            .mobile-nav {
              display: none !important;
            }
          }
          
          /* Add padding to body to prevent navbar overlap */
          html, body {
            padding-top: 0 !important;
            margin: 0;
          }
          
          /* Create space for fixed navbar on all pages */
          #root {
            padding-top: 100px !important;
          }
          
          /* Adjust for different screen sizes */
          @media (max-width: 768px) {
            #root {
              padding-top: 90px !important;
            }
          }
        `}
      </style>
      
      <nav 
        style={navbarStyle} 
        className={`navbar-container ${isScrolled ? 'scrolled' : ''}`}
      >
        <div style={backgroundPatternStyle}></div>
        
        {/* Logo */}
        <div style={logoContainerStyle}>
          <Link to="/" style={logoStyle} className="logo">
            <Code2 size={isScrolled ? 20 : 24} />
            DevConnector
            <Sparkles size={16} style={sparkleStyle} />
          </Link>
        </div>

        {/* Desktop Navigation */}
        {!loading && (
          <ul style={navLinksStyle} className="desktop-nav">
            {isAuthenticated ? <AuthLinks /> : <GuestLinks />}
          </ul>
        )}

        {/* Mobile Toggle */}
        <button
          style={mobileToggleStyle}
          className="mobile-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Mobile Navigation */}
        {!loading && (
          <ul style={mobileNavLinksStyle} className="mobile-nav">
            {isAuthenticated ? <AuthLinks mobile={true} /> : <GuestLinks mobile={true} />}
          </ul>
        )}
      </nav>
    </>
  );
};

export default Navbar;