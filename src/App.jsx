import { useState, useEffect } from 'react';
import { SAMPLE_TASKS } from './data/sampleTask';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import FocusCarousel from './components/FocusCarousel';
import StatsGrid from './components/StatsGrid';
import TaskFilters from './components/TaskFilters';
import TaskItem from './components/TaskItem';
import TaskModal from './components/TaskModal';

const STORAGE_KEY = 'focusboard_tasks_v1';

export default function App() {
  const [activeNav, setActiveNav] = useState('overview');

  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (error) {
      console.error('Failed to load tasks from localStorage:', error);
    }
    return SAMPLE_TASKS;
  });

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');

  // Modal state (editingTask === null means Create mode)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error('Failed to save tasks to localStorage:', error);
    }
  }, [tasks]);

  // Derived statistics
  const totalTasks = tasks.length;
  const inProgressCount = tasks.filter((t) => t.status === 'In progress').length;
  const completedCount = tasks.filter((t) => t.status === 'Completed').length;
  const completionRate =
    totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;

  // Combined filtering (Search + Status Tab + Priority Dropdown)
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchQuery.trim().toLowerCase());
    const matchesStatus =
      statusFilter === 'All' || task.status === statusFilter;
    const matchesPriority =
      priorityFilter === 'All' || task.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  // Modal handlers
  const handleOpenCreateModal = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  // Create or Update task (immutable state updates)
  const handleSaveTask = (formData) => {
    if (editingTask) {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === editingTask.id ? { ...task, ...formData } : task
        )
      );
    } else {
      const newTask = {
        id:
          typeof crypto !== 'undefined' && crypto.randomUUID
            ? crypto.randomUUID()
            : `task-${Date.now()}`,
        ...formData,
      };
      setTasks((prev) => [newTask, ...prev]);
    }
    handleCloseModal();
  };

  const handleToggleComplete = (taskId) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: task.status === 'Completed' ? 'In progress' : 'Completed',
            }
          : task
      )
    );
  };

  const handleStatusChange = (taskId, newStatus) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const handleDeleteTask = (taskId, taskTitle) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${taskTitle}"?`
    );
    if (!confirmed) return;
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setStatusFilter('All');
    setPriorityFilter('All');
  };

  return (
    <div className="min-h-screen flex bg-[#F8F9FC] text-slate-900">
      <Sidebar activeNav={activeNav} onSelectNav={setActiveNav} />

      <div className="flex-1 flex flex-col min-w-0 pb-20 md:pb-8">
        <Header activeNav={activeNav} />

        <main className="flex-1 w-full max-w-[1160px] mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-8">
          {/* Page Heading Row */}
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                Your work, in focus.
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Plan your day, stay organized, and celebrate small wins.
              </p>
            </div>

            <button
              type="button"
              onClick={handleOpenCreateModal}
              className="hidden md:inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-[#5B4EF5] hover:bg-[#4B3EE0] text-white text-sm font-medium shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#5B4EF5]/40 cursor-pointer"
            >
              New task
            </button>
          </div>

          <FocusCarousel tasks={tasks} completionRate={completionRate} />

          <StatsGrid
            total={totalTasks}
            inProgress={inProgressCount}
            completed={completedCount}
            completionRate={completionRate}
          />

          <section aria-label="Task list">
            <TaskFilters
              totalCount={totalTasks}
              statusFilter={statusFilter}
              onStatusChange={setStatusFilter}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              priorityFilter={priorityFilter}
              onPriorityChange={setPriorityFilter}
              onOpenNewTask={handleOpenCreateModal}
              onResetFilters={handleResetFilters}
            />

            {filteredTasks.length === 0 ? (
              <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-8 text-center">
                <p className="text-sm font-medium text-slate-700">
                  No tasks match your current filters.
                </p>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="mt-3 px-4 py-2 rounded-xl bg-[#F0EFFE] text-[#5B4EF5] text-xs font-semibold hover:bg-[#E4E1FD] transition-colors cursor-pointer"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredTasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onToggleComplete={handleToggleComplete}
                    onStatusChange={handleStatusChange}
                    onEdit={handleOpenEditModal}
                    onDelete={handleDeleteTask}
                  />
                ))}
              </div>
            )}
          </section>
        </main>
      </div>

      {/* Conditionally mounted so form state resets cleanly every time it opens */}
      {isModalOpen && (
        <TaskModal
          editingTask={editingTask}
          onClose={handleCloseModal}
          onSave={handleSaveTask}
        />
      )}
    </div>
  );
}