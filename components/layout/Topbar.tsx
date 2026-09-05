'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { ChevronDown, Grid2x2, KeyRound, LogOut, Menu, Monitor, Plus, UserRound } from 'lucide-react';
import { useSidebar } from './SidebarProvider';

function pageTitleFromPath(pathname: string) {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length === 0) return 'Dashboard';
  const last = segments[segments.length - 1];
  return last.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function Topbar() {
  const { toggleCollapsed } = useSidebar();
  const pathname = usePathname();
  const title = pageTitleFromPath(pathname);

  const { data: session } = useSession();
  const displayName = session?.user?.name || session?.user?.email || 'Account';
  const initial = displayName.charAt(0).toUpperCase();

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;

    function handlePointerDown(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen]);

  return (
    <header className="gg-topbar">
      <button className="gg-icon-btn" title="Toggle sidebar" onClick={toggleCollapsed}>
        <Menu />
      </button>
      <div className="gg-topbar-title">
        <span className="gg-page-chip">
          <Plus />
        </span>
        <span className="gg-breadcrumb">{title}</span>
      </div>
      <div className="gg-topbar-spacer" />
      <button className="gg-pos-btn">
        <Monitor style={{ width: 16, height: 16 }} /> POS
      </button>
      <button className="gg-icon-btn">
        <Grid2x2 />
      </button>

      <div ref={menuRef} style={{ position: 'relative' }}>
        <div className="gg-user" onClick={() => setMenuOpen((open) => !open)}>
          <div className="gg-avatar">{initial}</div>
          <span style={{ fontWeight: 600, color: 'var(--ink)', fontSize: 14 }}>{displayName}</span>
          <ChevronDown style={{ width: 16, height: 16, color: 'var(--gray-400)' }} />
        </div>

        {menuOpen ? (
          <div className="gg-menu" style={{ position: 'absolute', top: 'calc(100% + 8px)', right: 0, zIndex: 40 }}>
            <Link href="/profile" className="gg-menu-item" onClick={() => setMenuOpen(false)}>
              <UserRound /> Profile
            </Link>
            <Link href="/change-password" className="gg-menu-item" onClick={() => setMenuOpen(false)}>
              <KeyRound /> Change Password
            </Link>
            <div
              className="gg-menu-item is-danger"
              onClick={() => {
                setMenuOpen(false);
                signOut({ callbackUrl: '/' });
              }}
            >
              <LogOut /> Logout
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}
