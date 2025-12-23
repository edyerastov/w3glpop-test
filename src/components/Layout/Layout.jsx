import { useState, useEffect } from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import "./layout.css"
import useUserState from '../../store/store'

export default function Layout() {
  const { returnChipsToTotal, isLoggedIn, resetUser, username, userMoney, setIsMiniGame } = useUserState();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
        setIsDropdownOpen(false);
      }
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  function resetTableChips() {
    returnChipsToTotal();
  }

  function handleLogout() {
    resetUser();
    window.sessionStorage.removeItem("token");
  }

  function sendToMiniGame(e) {
    e.preventDefault();
    setIsMiniGame(true);
    navigate('/blackjack')
  }

  function handleLeaveGame() {
    window.sessionStorage.removeItem("isMiniGame");
    setIsMiniGame(false)
    resetTableChips()
    setIsMobileMenuOpen(false);
  }

  function toggleMobileMenu() {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }

  function closeMobileMenu() {
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
  }

  function toggleDropdown(e) {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      setIsDropdownOpen(!isDropdownOpen);
    }
  }

  return (
      <div className='Layout'>
          {isMobileMenuOpen && <div className="mobile-menu-overlay" onClick={closeMobileMenu}></div>}
          <nav className='nav'>
        <button className={`mobile-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`} onClick={toggleMobileMenu} aria-label="Toggle menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div className={`nav-links ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
        {isLoggedIn && (
            <div className="nav-user-info">
              <span>{username}: </span>
              <span>${userMoney}</span>
            </div>
          )}
          {!isLoggedIn ? (
          <Link to='/' onClick={handleLeaveGame}>
          Home
            </Link> 
          ) : (
              <Link to='/cashier' onClick={handleLeaveGame}>
                Cashier
              </Link>
          )}

          <div className={`dropdown ${isDropdownOpen ? 'active' : ''}`}>
          <Link to="#" className="dropbtn" onClick={toggleDropdown}>How to Play</Link>
          <div className="dropdown-content">
              {isLoggedIn && <Link to="/" onClick={closeMobileMenu}>Welcome</Link>}
            <Link to="/howtoplay/blackjack" onClick={handleLeaveGame}>Blackjack</Link>
            <Link to="/howtoplay/roulette" onClick={handleLeaveGame}>Roulette</Link>
            <Link to="/howtoplay/slots" onClick={handleLeaveGame}>Slots</Link>
          </div>
          </div>
          

          <Link to='/leaderboards' onClick={handleLeaveGame}>Leaderboards</Link>
          <Link to='/casino' onClick={handleLeaveGame}>Casino</Link>
          {isLoggedIn && <Link onClick={(e) => { sendToMiniGame(e); closeMobileMenu(); }}>MiniGame</Link>}
          {isLoggedIn ? (<Link to='/' onClick={(e) => { handleLogout(); closeMobileMenu(); }}>Logout</Link>) : (<Link to='/account' onClick={(e) => { resetTableChips(); closeMobileMenu(); }}> Login</Link>)}

        </div>  
      </nav>
      
<main>
        <Outlet />
        </main>
    </div>
  )
}
