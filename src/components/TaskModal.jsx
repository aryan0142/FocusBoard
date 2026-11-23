import { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';

export default function TaskModal({ editingTask, onClose, onSave }) {
  const isEditMode = Boolean(editingTask);

  const [title, setTitle] = useState(editingTask?.title ?? '');
  const [description, setDescription] = useState(editingTask?.description ?? '');
  const [status, setStatus] = useState(editingTask?.status ?? 'To do');
  const [priority, setPriority] = useState(editingTask?.priority ?? 'Medium');
  const [dueDate, setDueDate] = useState(editingTask?.dueDate ?? '');
  const [category, setCategory] = useState(editingTask?.category ?? 'Design');
  const [titleError, setTitleError] = useState('');

  const titleInputRef = useRef(null);

  // Focus title input, lock background scroll, and support Escape key to close
  useEffect(() => {
    titleInputRef.current?.focus();
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      setTitleError('Task title is required. Please enter a short title.');
      titleInputRef.current?.focus();
      return;
    }

    onSave({
      title: trimmedTitle,
      description: description.trim(),
      status,
      priority,
      dueDate,
      category,
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/45 backdrop-blur-[2px] p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="task-modal-title"
    >
      {/* Modal Card (stops clicks inside from closing the modal) */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[600px] max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-xl border border-slate-200/80 p-6 sm:p-8"
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 pb-5 border-b border-slate-100">
          <div>
            <h2
              id="task-modal-title"
              className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900"
            >
              {isEditMode ? 'Edit task' : 'Create new task'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {isEditMode
                ? 'Update your task details to keep your board accurate.'
                : 'Add your task details to stay on top of your work.'}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center shrink-0 transition-colors focus:outline-none focus:ring-2 focus:ring-[#5B4EF5]/40 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
          {/* Task Title (Required) */}
          <div>
            <label
              htmlFor="task-title"
              className="block text-sm font-semibold text-slate-800 mb-1.5"
            >
              Task title <span className="text-[#5B4EF5]">*</span>
            </label>
            <input
              ref={titleInputRef}
              id="task-title"
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (titleError) setTitleError('');
              }}
              placeholder="e.g. Update pricing page"
              aria-required="true"
              aria-invalid={Boolean(titleError)}
              aria-describedby={titleError ? 'task-title-error' : undefined}
              className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                titleError
                  ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/20'
                  : 'border-slate-200 focus:border-[#5B4EF5] focus:ring-[#5B4EF5]/15'
              }`}
            />
            {titleError && (
              <p
                id="task-title-error"
                role="alert"
                className="text-xs font-medium text-rose-600 mt-1.5"
              >
                {titleError}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="task-description"
              className="block text-sm font-semibold text-slate-800 mb-1.5"
            >
              Description
            </label>
            <textarea
              id="task-description"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add notes about this task..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#5B4EF5] focus:ring-2 focus:ring-[#5B4EF5]/15 transition-all resize-y"
            />
          </div>

          {/* Status & Priority (2-column on sm+, stacked on mobile) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="task-status"
                className="block text-sm font-semibold text-slate-800 mb-1.5"
              >
                Status
              </label>
              <select
                id="task-status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:border-[#5B4EF5] focus:ring-2 focus:ring-[#5B4EF5]/15 cursor-pointer"
              >
                <option value="To do">To do</option>
                <option value="In progress">In progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="task-priority"
                className="block text-sm font-semibold text-slate-800 mb-1.5"
              >
                Priority
              </label>
              <select
                id="task-priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:border-[#5B4EF5] focus:ring-2 focus:ring-[#5B4EF5]/15 cursor-pointer"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>

          {/* Due Date & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="task-due-date"
                className="block text-sm font-semibold text-slate-800 mb-1.5"
              >
                Due date
              </label>
              <input
                id="task-due-date"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:border-[#5B4EF5] focus:ring-2 focus:ring-[#5B4EF5]/15"
              />
            </div>

            <div>
              <label
                htmlFor="task-category"
                className="block text-sm font-semibold text-slate-800 mb-1.5"
              >
                Category
              </label>
              <select
                id="task-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:border-[#5B4EF5] focus:ring-2 focus:ring-[#5B4EF5]/15 cursor-pointer"
              >
                <option value="Design">Design</option>
                <option value="Development">Development</option>
                <option value="Content">Content</option>
                <option value="General">General</option>
              </select>
            </div>
          </div>

          <p className="text-xs text-slate-400">* Required field</p>

          {/* Footer Action Buttons */}
          <div className="pt-5 border-t border-slate-100 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-sm font-semibold text-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-300 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#5B4EF5] hover:bg-[#4B3EE0] text-white text-sm font-semibold shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#5B4EF5]/40 cursor-pointer"
            >
              {isEditMode ? 'Save changes' : 'Create task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}