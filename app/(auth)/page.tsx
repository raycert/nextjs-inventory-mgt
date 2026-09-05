import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import LoginForm from '@/components/auth/LoginForm';
import './auth.css';

export default async function SignInPage() {
  const session = await auth();
  if (session) {
    redirect('/dashboard');
  }

  return <LoginForm />;
}
