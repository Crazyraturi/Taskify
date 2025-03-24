
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AnimatePresence } from 'framer-motion';
import { RootState } from '@/store';
import { fetchTasks } from '@/store/slices/taskSlice';
import TaskItem from './TaskItem';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useAppDispatch } from '@/store';

const TaskList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { tasks, status } = useSelector((state: RootState) => state.tasks);
  
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);
  
  // Group tasks by completion status
  const completedTasks = tasks.filter(task => task.completed);
  const pendingTasks = tasks.filter(task => !task.completed);
  
  // Sort tasks by priority (high -> medium -> low)
  const sortByPriority = (a: typeof tasks[0], b: typeof tasks[0]) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  };
  
  const sortedPendingTasks = [...pendingTasks].sort(sortByPriority);
  
  if (status === 'loading' && tasks.length === 0) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner />
      </div>
    );
  }
  
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-muted-foreground">No tasks yet</h3>
        <p className="text-sm text-muted-foreground/70 mt-1">
          Add a task to get started
        </p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {/* Pending tasks */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Tasks ({pendingTasks.length})</h2>
        <AnimatePresence>
          {sortedPendingTasks.map(task => (
            <TaskItem key={task.id} task={task} />
          ))}
        </AnimatePresence>
      </div>
      
      {/* Completed tasks */}
      {completedTasks.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-3 text-muted-foreground">
            Completed ({completedTasks.length})
          </h2>
          <AnimatePresence>
            {completedTasks.map(task => (
              <TaskItem key={task.id} task={task} />
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default TaskList;
