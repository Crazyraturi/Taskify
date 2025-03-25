import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { deleteTask, toggleTaskCompletion, Task, Priority } from '@/store/slices/taskSlice';
import { CalendarIcon, Trash2, MapPin, CloudSun, Thermometer, Droplets, Wind, AlertCircle, Clock } from 'lucide-react';
import { format, isPast, isToday, isTomorrow } from 'date-fns';
import { useAppDispatch } from '@/store';

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const dispatch = useAppDispatch();
  const [isCompleting, setIsCompleting] = useState(false);
  
  // Reset animation state when task changes
  useEffect(() => {
    setIsCompleting(false);
  }, [task.id]);
  
  const priorityColors: Record<Priority, string> = {
    high: 'border-l-red-500',
    medium: 'border-l-amber-500',
    low: 'border-l-green-500',
  };

  const priorityBadgeColors: Record<Priority, string> = {
    high: 'bg-red-500 text-white',
    medium: 'bg-amber-500 text-white',
    low: 'bg-green-500 text-white',
  };
  
  const handleDelete = () => {
    dispatch(deleteTask(task.id));
  };
  
  const handleToggleComplete = () => {
    if (!task.completed) {
      // Only animate when completing a task, not when uncompleting
      setIsCompleting(true);
      
      // Add a slight delay before dispatching the action for better user experience
      setTimeout(() => {
        dispatch(toggleTaskCompletion(task.id));
      }, 300);
    } else {
      // Immediately toggle back if uncompleting
      dispatch(toggleTaskCompletion(task.id));
    }
  };

  // Due date helpers
  const getDueDateStatus = () => {
    if (!task.dueDate) return null;
    
    const date = new Date(task.dueDate);
    if (isPast(date) && !isToday(date)) {
      return { 
        label: 'Overdue!', 
        className: 'text-red-500 font-medium'
      };
    } else if (isToday(date)) {
      return { 
        label: 'Today', 
        className: 'text-amber-500 font-medium'
      };
    } else if (isTomorrow(date)) {
      return { 
        label: 'Tomorrow', 
        className: 'text-blue-500 font-medium'
      };
    }
    return null;
  };

  const dueDateStatus = getDueDateStatus();
  
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
        className={`glass-panel glass-panel-hover p-4 transition-all duration-300 border-l-4 ${
          priorityColors[task.priority]
        } ${task.completed ? 'bg-muted/30 opacity-75' : 'hover:shadow-md'} ${
          isCompleting ? 'animate-pulse bg-green-50' : ''
        }`}
      >
        <div className="flex items-start gap-3">
          <div className="pt-0.5 relative">
            <Checkbox 
              checked={task.completed || isCompleting}
              onCheckedChange={handleToggleComplete}
              className={`transition-all duration-300 ${
                isCompleting ? 'scale-110 border-green-500' : ''
              }`}
            />
            {isCompleting && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1.5, opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 rounded-full border-2 border-green-500"
              />
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h3 className={`font-medium text-base ${
                task.completed ? 'line-through text-muted-foreground' : ''
              }`}>
                {task.title}
              </h3>
              <Badge className={`${priorityBadgeColors[task.priority]} text-xs px-2 py-0`}>
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
            
            <div className="flex flex-wrap gap-3 mt-2 items-center">
              {task.dueDate && (
                <div className={`flex items-center gap-1 text-xs ${dueDateStatus ? dueDateStatus.className : 'text-muted-foreground'}`}>
                  {isPast(new Date(task.dueDate)) && !isToday(new Date(task.dueDate)) 
                    ? <AlertCircle className="h-3 w-3" /> 
                    : <Clock className="h-3 w-3" />
                  }
                  <span>
                    {dueDateStatus ? `${dueDateStatus.label}: ` : ''}
                    {format(new Date(task.dueDate), 'PP')}
                  </span>
                </div>
              )}
              
              {task.location && !task.weather && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  <span>{task.location}</span>
                </div>
              )}
            </div>
            
            {/* Enhanced Weather Display */}
            {task.weather && (
              <div className="mt-2 overflow-hidden rounded-md border border-border/50 transition-all duration-300 hover:shadow-md">
                <div className="flex flex-col">
                  <div className="flex items-center justify-between bg-gradient-to-r from-blue-500/10 to-sky-500/10 p-3">
                    <div className="flex items-center gap-3">
                      {task.weather.icon && (
                        <img 
                          src={task.weather.icon} 
                          alt={task.weather.condition}
                          className="h-12 w-12 rounded-full bg-white/20 p-1 shadow-sm"
                        />
                      )}
                      <div>
                        <div className="text-sm font-medium">{task.weather.condition}</div>
                        <div className="flex items-center gap-1">
                          <Thermometer className="h-3 w-3 text-red-500" />
                          <span className="text-sm font-bold">{task.weather.temp}°C</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-white/30 text-xs">
                      {task.location}
                    </Badge>
                  </div>
                  
                  {/* Additional weather information */}
                  {(task.weather.humidity || task.weather.wind) && (
                    <div className="flex flex-wrap justify-between gap-2 bg-muted/30 p-2 px-3">
                      {task.weather.humidity && (
                        <div className="flex items-center gap-1">
                          <Droplets className="h-3 w-3 text-blue-500" />
                          <span className="text-xs">{task.weather.humidity}% humidity</span>
                        </div>
                      )}
                      {task.weather.wind && (
                        <div className="flex items-center gap-1">
                          <Wind className="h-3 w-3 text-slate-500" />
                          <span className="text-xs">{task.weather.wind.speed} km/h {task.weather.wind.direction}</span>
                        </div>
                      )}
                      
                      {/* Last updated info */}
                      {task.weather.lastUpdated && (
                        <div className="text-xs text-muted-foreground/70 ml-auto">
                          Updated: {task.weather.lastUpdated}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            className="text-muted-foreground hover:text-red-500 hover:bg-red-50 transition-colors duration-200"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};

export default TaskItem;
