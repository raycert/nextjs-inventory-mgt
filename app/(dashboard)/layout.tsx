import type { ReactNode } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Topbar from '@/components/layout/Topbar';
import Footer from '@/components/layout/Footer';
import { SidebarProvider } from '@/components/layout/SidebarProvider';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
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
  );
}
