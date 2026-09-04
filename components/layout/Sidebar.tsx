'use client';

import { useState, type ComponentType } from 'react';
import {
  BarChart3,
  Boxes,
  ChevronRight,
  DollarSign,
  FileText,
  LayoutDashboard,
  LayoutTemplate,
  Languages,
  Receipt,
  Repeat,
  Search,
  Settings,
  ShieldCheck,
  ShoppingCart,
  SlidersHorizontal,
  Truck,
  User,
  Users,
  Wallet,
  Warehouse,
  type LucideProps,
} from 'lucide-react';

type Icon = ComponentType<LucideProps>;

type NavLeaf = { label: string; icon?: Icon };

type NavEntry =
  | { type: 'item'; label: string; icon: Icon }
  | { type: 'group'; label: string; icon: Icon; children: NavLeaf[] };

const NAV: NavEntry[] = [
  { type: 'item', label: 'Dashboard', icon: LayoutDashboard },
  {
    type: 'group',
    label: 'Products',
    icon: Boxes,
    children: [
      { label: 'Products' },
      { label: 'Product Categories' },
      { label: 'Brands' },
      { label: 'Units' },
      { label: 'Base Units' },
      { label: 'Print Barcode' },
    ],
  },
  { type: 'item', label: 'Adjustments', icon: SlidersHorizontal },
  { type: 'item', label: 'Quotations', icon: FileText },
  {
    type: 'group',
    label: 'Purchases',
    icon: Receipt,
    children: [{ label: 'Purchases' }, { label: 'Purchases Returns' }],
  },
  {
    type: 'group',
    label: 'Sales',
    icon: ShoppingCart,
    children: [{ label: 'Sales' }, { label: 'Sales Returns' }],
  },
  { type: 'item', label: 'Transfers', icon: Repeat },
  {
    type: 'group',
    label: 'Expenses',
    icon: Wallet,
    children: [{ label: 'Expenses' }, { label: 'Expense Categories' }],
  },
  {
    type: 'group',
    label: 'Peoples',
    icon: Users,
    children: [
      { label: 'Suppliers', icon: Truck },
      { label: 'Customers', icon: Users },
      { label: 'Users', icon: User },
    ],
  },
  { type: 'item', label: 'Roles/Permissions', icon: ShieldCheck },
  { type: 'item', label: 'Warehouse', icon: Warehouse },
  { type: 'item', label: 'Reports', icon: BarChart3 },
  { type: 'item', label: 'Currencies', icon: DollarSign },
  { type: 'item', label: 'Languages', icon: Languages },
  {
    type: 'group',
    label: 'Templates',
    icon: LayoutTemplate,
    children: [{ label: 'SMS Templates' }, { label: 'Email Templates' }],
  },
  { type: 'item', label: 'Settings', icon: Settings },
];

export default function Sidebar() {
  const [openGroups, setOpenGroups] = useState<Set<string>>(new Set());

  const toggleGroup = (label: string) => {
    setOpenGroups((prev) => {
      const next = new Set(prev);
      if (next.has(label)) {
        next.delete(label);
      } else {
        next.add(label);
      }
      return next;
    });
  };

  return (
    <aside className="gg-sidebar">
      <div className="gg-brand">
        <div className="gg-brand-mark">G</div>
        <span className="gg-brand-name">GildedGlow</span>
      </div>
      <div className="gg-sidebar-search">
        <div className="gg-input-icon">
          <Search />
          <input className="gg-input" type="text" placeholder="Search" />
        </div>
      </div>
      <nav className="gg-nav">
        {NAV.map((entry) =>
          entry.type === 'item' ? (
            <div className="gg-nav-item" key={entry.label}>
              <entry.icon className="gg-nav-ico" />
              <span className="gg-nav-label">{entry.label}</span>
            </div>
          ) : (
            <div
              className={
                openGroups.has(entry.label) ? 'gg-nav-group is-open' : 'gg-nav-group'
              }
              key={entry.label}
            >
              <div className="gg-nav-item" onClick={() => toggleGroup(entry.label)}>
                <entry.icon className="gg-nav-ico" />
                <span className="gg-nav-label">{entry.label}</span>
                <ChevronRight className="gg-nav-chev" />
              </div>
              <div className="gg-nav-sub">
                {entry.children.map((child) => (
                  <div className="gg-nav-item" key={child.label}>
                    {child.icon ? <child.icon className="gg-nav-ico" /> : null}
                    <span className="gg-nav-label">{child.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )
        )}
      </nav>
    </aside>
  );
}
