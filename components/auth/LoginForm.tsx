'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { CircleAlert, UserRound } from 'lucide-react';

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setLoading(false);
      setError('Invalid email or password.');
      return;
    }

    router.push('/dashboard');
    router.refresh();
  }

  return (
    <div className="auth-page">
      <div className="auth">
        <div className="auth-ava">
          <UserRound />
        </div>
        <div className="auth-card">
          <h1 className="auth-title">Sign In</h1>

          {error ? (
            <div className="auth-error">
              <CircleAlert style={{ width: 18, height: 18, flexShrink: 0 }} />
              <span>{error}</span>
            </div>
          ) : null}

          <form onSubmit={handleSubmit}>
            <div className="auth-field">
              <div className="auth-label-row">
                <label className="auth-label" htmlFor="email">
                  Email : <span className="req">*</span>
                </label>
              </div>
              <input
                id="email"
                name="email"
                className="auth-input"
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>

            <div className="auth-field">
              <div className="auth-label-row">
                <label className="auth-label" htmlFor="password">
                  Password: <span className="req">*</span>
                </label>
                <a href="#" className="auth-forgot">
                  Forgot Password ?
                </a>
              </div>
              <input
                id="password"
                name="password"
                className="auth-input"
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>

            <button className="auth-btn" type="submit" disabled={loading}>
              {loading ? 'Signing In…' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
