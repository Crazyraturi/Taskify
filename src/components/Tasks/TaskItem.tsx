
import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { deleteTask, toggleTaskCompletion, Task, Priority } from '@/store/slices/taskSlice';
import { CalendarIcon, Trash2, MapPin, CloudSun, Thermometer } from 'lucide-react';
import { format } from 'date-fns';
import { useAppDispatch } from '@/store';

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const dispatch = useAppDispatch();
  
  const priorityColors: Record<Priority, string> = {
    high: 'bg-priority-high text-white',
    medium: 'bg-priority-medium text-white',
    low: 'bg-priority-low text-white',
  };
  
  const handleDelete = () => {
    dispatch(deleteTask(task.id));
  };
  
  const handleToggleComplete = () => {
    dispatch(toggleTaskCompletion(task.id));
  };

  // Weather condition icon mapper
  const getWeatherIcon = (condition: string) => {
    const condition_lower = condition.toLowerCase();
    if (condition_lower.includes('cloud')) return <CloudSun className="h-4 w-4" />;
    if (condition_lower.includes('sun') || condition_lower.includes('clear')) return <CloudSun className="h-4 w-4" />;
    // Default icon
    return <CloudSun className="h-4 w-4" />;
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className="mb-3"
    >
      <Card 
        className={`glass-panel glass-panel-hover p-4 transition-all duration-300 ${
          task.completed ? 'bg-muted/30' : ''
        }`}
      >
        <div className="flex items-start gap-3">
          <div className="pt-0.5">
            <Checkbox 
              checked={task.completed}
              onCheckedChange={handleToggleComplete}
              className="transition-all duration-200"
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h3 className={`font-medium text-base ${
                task.completed ? 'line-through text-muted-foreground' : ''
              }`}>
                {task.title}
              </h3>
              <Badge className={priorityColors[task.priority]}>
                {task.priority}
              </Badge>
            </div>
            
            {task.description && (
              <p className={`text-sm mt-1 ${
                task.completed ? 'text-muted-foreground/70 line-through' : 'text-muted-foreground'
              }`}>
                {task.description}
              </p>
            )}
            
            <div className="flex flex-wrap gap-2 mt-2">
              {task.dueDate && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <CalendarIcon className="h-3 w-3" />
                  <span>{format(new Date(task.dueDate), 'PP')}</span>
                </div>
              )}
              
              {task.location && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  <span>{task.location}</span>
                </div>
              )}
            </div>
            
            {/* Enhanced Weather Display */}
            {task.weather && (
              <div className="mt-2 p-2 bg-muted/30 rounded-md border border-border/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img 
                      src={task.weather.icon} 
                      alt={task.weather.condition}
                      className="h-8 w-8"
                    />
                    <div>
                      <div className="text-xs font-medium">{task.weather.condition}</div>
                      <div className="flex items-center gap-1">
                        <Thermometer className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs">{task.weather.temp}°C</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {task.location}
                  </Badge>
                </div>
              </div>
            )}
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            className="text-muted-foreground hover:text-destructive transition-colors duration-200"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};

export default TaskItem;
