import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { AuthModal } from './AuthModal';
import './UserMenu.css';

export function UserMenu() {
  const { user, isGuest, logout } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      // ignore
    }
  };

  return (
    <>
      <div className="user-menu">
        {isGuest ? (
          <button className="user-menu__login-btn" onClick={() => setShowAuthModal(true)}>
            ログイン
          </button>
        ) : (
          <div className="user-menu__logged-in">
            <span className="user-menu__email">{user?.email}</span>
            <button className="user-menu__logout-btn" onClick={handleLogout}>
              ログアウト
            </button>
          </div>
        )}
      </div>

      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </>
  );
}
