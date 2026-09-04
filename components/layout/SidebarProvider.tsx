'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

interface SidebarContextValue {
  collapsed: boolean;
  toggleCollapsed: () => void;
}

const SidebarContext = createContext<SidebarContextValue | null>(null);

export function useSidebar() {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error('useSidebar must be used within a SidebarProvider');
  return ctx;
}

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => setCollapsed((c) => !c);

  return (
    <SidebarContext.Provider value={{ collapsed, toggleCollapsed }}>
      <div className={collapsed ? 'gg-app is-collapsed' : 'gg-app'}>{children}</div>
    </SidebarContext.Provider>
  );
}
