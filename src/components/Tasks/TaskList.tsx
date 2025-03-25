import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { RootState } from '@/store';
import { fetchTasks } from '@/store/slices/taskSlice';
import TaskItem from './TaskItem';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useAppDispatch } from '@/store';
import { CheckCircle2, ListTodo, ClipboardList } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
      <div className="flex flex-col items-center justify-center py-16">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-muted-foreground">Loading your tasks...</p>
      </div>
    );
  }
  
  if (tasks.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-16 px-4 text-center"
      >
        <div className="mb-6 rounded-full bg-muted p-6">
          <ClipboardList className="h-12 w-12 text-orange-400" />
        </div>
        <h3 className="text-xl font-medium mb-2">No tasks yet</h3>
        <p className="text-muted-foreground max-w-md mb-6">
          Your task list is empty. Add your first task using the form above to get started.
        </p>
        <Button 
          onClick={() => document.querySelector('input')?.focus()} 
          className="bg-orange-400 hover:bg-orange-500"
        >
          <ListTodo className="mr-2 h-4 w-4" />
          Create your first task
        </Button>
      </motion.div>
    );
  }
  
  return (
    <div className="space-y-8">
      {/* Pending tasks */}
      <div>
        <div className="flex items-center mb-4">
          <ListTodo className="mr-2 h-5 w-5 text-orange-500" />
          <h2 className="text-lg font-semibold">Tasks <span className="ml-1 text-muted-foreground">({pendingTasks.length})</span></h2>
        </div>
        <AnimatePresence>
          {sortedPendingTasks.map(task => (
            <TaskItem key={task.id} task={task} />
          ))}
        </AnimatePresence>
        
        {pendingTasks.length === 0 && (
          <div className="rounded-md border border-dashed border-muted p-4 text-center text-muted-foreground">
            Great job! You've completed all your tasks.
          </div>
        )}
      </div>
      
      {/* Completed tasks */}
      {completedTasks.length > 0 && (
        <div>
          <div className="flex items-center mb-4">
            <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
            <h2 className="text-lg font-semibold text-muted-foreground">
              Completed <span className="ml-1">({completedTasks.length})</span>
            </h2>
          </div>
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
