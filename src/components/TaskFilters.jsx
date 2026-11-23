import { Search, Plus } from 'lucide-react';

const STATUS_TABS = [
  { id: 'All', label: 'All tasks' },
  { id: 'In progress', label: 'In progress' },
  { id: 'Completed', label: 'Completed' },
];

export default function TaskFilters({
  totalCount,
  statusFilter,
  onStatusChange,
  searchQuery,
  onSearchChange,
  priorityFilter,
  onPriorityChange,
  onOpenNewTask,
  onResetFilters,
}) {
  return (
    <div className="mb-4">
      {/* Section Header */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <div>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900">
            My tasks
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Manage and track everything in one place.
          </p>
        </div>

        {/* Desktop "View all tasks" button (resets active filters) */}
        <button
          type="button"
          onClick={onResetFilters}
          className="hidden md:inline-flex items-center px-4 py-2 rounded-xl bg-[#F0EFFE] hover:bg-[#E4E1FD] text-[#5B4EF5] text-sm font-medium transition-colors cursor-pointer"
        >
          View all tasks
        </button>

        {/* Mobile "+" New Task button */}
        <button
          type="button"
          onClick={onOpenNewTask}
          aria-label="Create new task"
          className="md:hidden w-11 h-11 rounded-xl bg-[#5B4EF5] hover:bg-[#4B3EE0] text-white flex items-center justify-center shadow-sm transition-colors cursor-pointer"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-3 sm:p-4 shadow-[0_1px_2px_rgba(15,23,42,0.03)] flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        {/* Status Tabs */}
        <div
          role="tablist"
          aria-label="Filter tasks by status"
          className="flex items-center gap-1.5 overflow-x-auto"
        >
          {STATUS_TABS.map(({ id, label }) => {
            const isActive = statusFilter === id;
            return (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onStatusChange(id)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#F0EFFE] text-[#5B4EF5]'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {label}
                {id === 'All' && (
                  <span className="ml-1.5 font-semibold">{totalCount}</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Search + Priority Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
          {/* Case-insensitive Title Search */}
          <div className="relative flex-1 sm:w-56">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Find a task..."
              aria-label="Search tasks by title"
              className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200/80 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-[#5B4EF5] focus:ring-2 focus:ring-[#5B4EF5]/15 transition-all"
            />
          </div>

          {/* Priority Dropdown */}
          <select
            value={priorityFilter}
            onChange={(e) => onPriorityChange(e.target.value)}
            aria-label="Filter tasks by priority"
            className="px-3.5 py-2 rounded-xl bg-white border border-slate-200/80 text-sm font-medium text-slate-700 focus:outline-none focus:border-[#5B4EF5] focus:ring-2 focus:ring-[#5B4EF5]/15 cursor-pointer"
          >
            <option value="All">Priority: All</option>
            <option value="High">Priority: High</option>
            <option value="Medium">Priority: Medium</option>
            <option value="Low">Priority: Low</option>
          </select>
        </div>
      </div>
    </div>
  );
}