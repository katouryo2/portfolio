import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './AuthModal.css';

interface Props {
  onClose: () => void;
}

type Tab = 'login' | 'register';

export function AuthModal({ onClose }: Props) {
  const { login, register } = useAuth();
  const [tab, setTab] = useState<Tab>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (tab === 'register' && password !== confirmPassword) {
      setError('パスワードが一致しません');
      return;
    }

    if (password.length < 6) {
      setError('パスワードは6文字以上で入力してください');
      return;
    }

    setLoading(true);
    try {
      if (tab === 'login') {
        await login(email, password);
      } else {
        await register(email, password);
      }
      onClose();
    } catch (err: unknown) {
      const code = (err as { code?: string }).code ?? '';
      if (code === 'auth/user-not-found' || code === 'auth/wrong-password' || code === 'auth/invalid-credential') {
        setError('メールアドレスまたはパスワードが正しくありません');
      } else if (code === 'auth/email-already-in-use') {
        setError('このメールアドレスは既に登録されています');
      } else if (code === 'auth/invalid-email') {
        setError('メールアドレスの形式が正しくありません');
      } else {
        setError('エラーが発生しました。もう一度お試しください');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-modal__overlay" onClick={onClose}>
      <div className="auth-modal" onClick={e => e.stopPropagation()}>
        <button className="auth-modal__close" onClick={onClose} aria-label="閉じる">
          &#10005;
        </button>

        <div className="auth-modal__tabs">
          <button
            className={`auth-modal__tab ${tab === 'login' ? 'active' : ''}`}
            onClick={() => { setTab('login'); setError(''); }}
          >
            ログイン
          </button>
          <button
            className={`auth-modal__tab ${tab === 'register' ? 'active' : ''}`}
            onClick={() => { setTab('register'); setError(''); }}
          >
            新規登録
          </button>
        </div>

        <form className="auth-modal__form" onSubmit={handleSubmit}>
          <div className="auth-modal__field">
            <label className="auth-modal__label">メールアドレス</label>
            <input
              type="email"
              className="auth-modal__input"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="auth-modal__field">
            <label className="auth-modal__label">パスワード</label>
            <input
              type="password"
              className="auth-modal__input"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              minLength={6}
              autoComplete={tab === 'login' ? 'current-password' : 'new-password'}
            />
          </div>

          {tab === 'register' && (
            <div className="auth-modal__field">
              <label className="auth-modal__label">パスワード（確認）</label>
              <input
                type="password"
                className="auth-modal__input"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
                minLength={6}
                autoComplete="new-password"
              />
            </div>
          )}

          {error && <p className="auth-modal__error">{error}</p>}

          <button className="auth-modal__submit" type="submit" disabled={loading}>
            {loading ? '処理中...' : tab === 'login' ? 'ログイン' : 'アカウント作成'}
          </button>
        </form>
      </div>
    </div>
  );
}
