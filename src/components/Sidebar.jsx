import { LayoutGrid, ListTodo, Calendar, Settings } from 'lucide-react';

const NAV_ITEMS = [
  { id: 'overview', label: 'Overview', mobileLabel: 'Overview', icon: LayoutGrid },
  { id: 'tasks', label: 'My tasks', mobileLabel: 'Tasks', icon: ListTodo },
  { id: 'calendar', label: 'Calendar', mobileLabel: 'Calendar', icon: Calendar },
  { id: 'settings', label: 'Settings', mobileLabel: 'Settings', icon: Settings },
];

export default function Sidebar({ activeNav, onSelectNav }) {
  return (
    <>
      {/* Desktop Left Sidebar */}
      <aside className="hidden md:flex md:flex-col md:w-60 bg-white border-r border-slate-200/80 min-h-screen shrink-0">
        {/* Brand Logo */}
        <div className="h-16 px-6 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#5B4EF5] flex items-center justify-center text-white shadow-sm">
            <LayoutGrid className="w-4 h-4" />
          </div>
          <span className="font-bold text-lg tracking-tight text-slate-900">
            FocusBoard
          </span>
        </div>

        {/* Navigation Links */}
        <nav aria-label="Main navigation" className="px-3 py-4 flex-1">
          <p className="px-3 mb-2 text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
            Workspace
          </p>
          <ul className="space-y-1">
            {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
              const isActive = activeNav === id;
              return (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => onSelectNav(id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-[#F0EFFE] text-[#5B4EF5]'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* Mobile Bottom Navigation Bar */}
      <nav
        aria-label="Mobile navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-slate-200 px-2 pb-1 pt-2"
      >
        <ul className="grid grid-cols-4 gap-1">
          {NAV_ITEMS.map(({ id, mobileLabel, icon: Icon }) => {
            const isActive = activeNav === id;
            return (
              <li key={id}>
                <button
                  type="button"
                  onClick={() => onSelectNav(id)}
                  className={`w-full flex flex-col items-center justify-center gap-1 py-1.5 text-xs font-medium relative cursor-pointer ${
                    isActive ? 'text-[#5B4EF5]' : 'text-slate-500'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{mobileLabel}</span>
                  {isActive && (
                    <span className="w-8 h-0.5 bg-[#5B4EF5] rounded-full mt-0.5" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}