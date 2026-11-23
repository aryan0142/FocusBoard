import { LayoutGrid, ChevronDown } from 'lucide-react';

export default function Header({ activeNav }) {
  const pageTitle =
    activeNav === 'overview'
      ? 'Overview'
      : activeNav === 'tasks'
      ? 'My tasks'
      : activeNav === 'calendar'
      ? 'Calendar'
      : 'Settings';

  return (
    <header className="h-16 bg-white border-b border-slate-200/80 px-4 md:px-8 flex items-center justify-between sticky top-0 z-20">
      {/* Mobile Logo */}
      <div className="flex items-center gap-2.5 md:hidden">
        <div className="w-8 h-8 rounded-lg bg-[#5B4EF5] flex items-center justify-center text-white">
          <LayoutGrid className="w-4 h-4" />
        </div>
        <span className="font-bold text-lg tracking-tight text-slate-900">
          FocusBoard
        </span>
      </div>

      {/* Desktop Breadcrumb */}
      <div className="hidden md:flex items-center gap-2 text-sm">
        <span className="text-slate-400">Workspace</span>
        <span className="text-slate-300">/</span>
        <span className="font-semibold text-slate-900">{pageTitle}</span>
      </div>

      {/* Profile Avatar */}
      <button
        type="button"
        aria-label="User profile"
        className="flex items-center gap-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#5B4EF5]/40 cursor-pointer"
      >
        <div className="w-9 h-9 rounded-full bg-[#EAE7FE] text-[#5B4EF5] font-semibold text-xs flex items-center justify-center">
          JD
        </div>
        <ChevronDown className="hidden md:block w-4 h-4 text-slate-400" />
      </button>
    </header>
  );
}