import { ListTodo, Clock, CheckCircle2 } from 'lucide-react';

export default function StatsGrid({ total, inProgress, completed, completionRate }) {
  const stats = [
    {
      label: 'Total tasks',
      value: total,
      caption: 'Across all projects',
      icon: ListTodo,
      iconBg: 'bg-[#F0EFFE]',
      iconColor: 'text-[#5B4EF5]',
    },
    {
      label: 'In progress',
      value: inProgress,
      caption: 'Keep the momentum',
      icon: Clock,
      iconBg: 'bg-sky-50',
      iconColor: 'text-sky-600',
    },
    {
      label: 'Completed',
      value: completed,
      caption: `${completionRate}% completion rate`,
      icon: CheckCircle2,
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
    },
  ];

  return (
    <section aria-label="Overview statistics" className="mb-8">
      <h2 className="text-base font-bold text-slate-900 mb-3 md:hidden">
        Overview
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-5">
        {stats.map(({ label, value, caption, icon: Icon, iconBg, iconColor }, index) => (
          <div
            key={label}
            className={`bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-[0_1px_2px_rgba(15,23,42,0.03)] ${
              index === 2 ? 'col-span-2 sm:col-span-1' : ''
            }`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className={`w-9 h-9 rounded-xl ${iconBg} ${iconColor} flex items-center justify-center shrink-0`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-xs sm:text-sm font-medium text-slate-500">
                {label}
              </span>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                {value}
              </span>
              <span className="text-xs text-slate-400 truncate">
                {caption}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}