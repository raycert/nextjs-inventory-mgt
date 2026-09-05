import type { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth';
import Sidebar from '@/components/layout/Sidebar';
import Topbar from '@/components/layout/Topbar';
import Footer from '@/components/layout/Footer';
import { SidebarProvider } from '@/components/layout/SidebarProvider';

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const session = await auth();
  if (!session) {
    redirect('/');
  }

  return (
    <SessionProvider session={session}>
      <SidebarProvider>
        <Sidebar />
        <div className="gg-main">
          <Topbar />
          <main className="gg-content">
            {children}
            <Footer />
          </main>
        </div>
      </SidebarProvider>
    </SessionProvider>
  );
}
