import { useState, useRef, useEffect } from 'react';
import { Check, Calendar, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';

const PRIORITY_STYLES = {
  High: 'bg-amber-50 text-amber-700',
  Medium: 'bg-emerald-50 text-emerald-700',
  Low: 'bg-teal-50 text-teal-700',
};

const CATEGORY_STYLES = {
  Design: 'bg-[#F0EFFE] text-[#5B4EF5]',
  Development: 'bg-indigo-50 text-indigo-600',
  Content: 'bg-violet-50 text-violet-600',
};

function formatDueDate(dateStr) {
  if (!dateStr) return 'No date';
  const date = new Date(`${dateStr}T00:00:00`);
  if (Number.isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export default function TaskItem({ task, onToggleComplete, onStatusChange, onEdit, onDelete }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const isCompleted = task.status === 'Completed';

  // Close the "..." dropdown when clicking outside
  useEffect(() => {
    if (!menuOpen) return;
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  return (
    <article className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:px-5 sm:py-4 shadow-[0_1px_2px_rgba(15,23,42,0.03)] hover:border-slate-300/90 transition-colors">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3.5">
        {/* Left: Checkbox + Title & Description */}
        <div className="flex items-start gap-3.5 min-w-0 flex-1">
          <button
            type="button"
            onClick={() => onToggleComplete(task.id)}
            aria-label={
              isCompleted
                ? `Mark "${task.title}" as in progress`
                : `Mark "${task.title}" as completed`
            }
            className={`mt-0.5 w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors cursor-pointer ${
              isCompleted
                ? 'bg-emerald-50 text-emerald-600'
                : 'bg-[#F0EFFE] text-[#5B4EF5] hover:bg-[#E4E1FD]'
            }`}
          >
            {isCompleted ? (
              <Check className="w-4 h-4 stroke-[2.5]" />
            ) : (
              <span className="w-3.5 h-3.5 rounded-[4px] border-2 border-[#5B4EF5]" />
            )}
          </button>

          <div className="min-w-0 flex-1">
            <h3
              className={`text-sm sm:text-[15px] font-semibold leading-snug truncate ${
                isCompleted ? 'line-through text-slate-400' : 'text-slate-900'
              }`}
            >
              {task.title}
            </h3>
            {task.description && (
              <p className="text-xs sm:text-[13px] text-slate-500 mt-0.5 truncate">
                {task.description}
              </p>
            )}
          </div>
        </div>

        {/* Right: Badges, Due Date & Action Menu */}
        <div className="flex items-center justify-between md:justify-end gap-2.5 pl-11 md:pl-0 shrink-0">
          <div className="flex flex-wrap items-center gap-2">
            {/* Category Badge */}
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                CATEGORY_STYLES[task.category] || 'bg-slate-100 text-slate-600'
              }`}
            >
              {task.category || 'General'}
            </span>

            {/* Priority Badge */}
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                PRIORITY_STYLES[task.priority] || 'bg-slate-100 text-slate-600'
              }`}
            >
              {task.priority}
            </span>

            {/* Due Date */}
            <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 ml-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              {formatDueDate(task.dueDate)}
            </span>
          </div>

          {/* "..." Action Menu */}
          <div className="relative" ref={menuRef}>
            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label={`Actions for ${task.title}`}
              aria-expanded={menuOpen}
              className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-1.5 w-44 bg-white rounded-xl border border-slate-200 shadow-lg py-1.5 z-20 text-sm">
                <p className="px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Set Status
                </p>
                {['To do', 'In progress', 'Completed'].map((statusOption) => (
                  <button
                    key={statusOption}
                    type="button"
                    onClick={() => {
                      onStatusChange(task.id, statusOption);
                      setMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-slate-50 cursor-pointer ${
                      task.status === statusOption
                        ? 'text-[#5B4EF5] font-semibold'
                        : 'text-slate-700'
                    }`}
                  >
                    <span>{statusOption}</span>
                    {task.status === statusOption && <Check className="w-3.5 h-3.5" />}
                  </button>
                ))}

                <div className="my-1 border-t border-slate-100" />

                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    onEdit(task);
                  }}
                  className="w-full text-left px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                >
                  <Pencil className="w-3.5 h-3.5 text-slate-400" />
                  Edit task
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    onDelete(task.id, task.title);
                  }}
                  className="w-full text-left px-3 py-1.5 text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Delete task
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}