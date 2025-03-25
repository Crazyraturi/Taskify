import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { addTask } from '@/store/slices/taskSlice';
import { fetchWeatherWithErrorHandling } from '@/services/weatherApi';
import { CalendarIcon, MapPin, PlusCircle } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useAppDispatch } from '@/store';

const TaskInput: React.FC = () => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>('medium');
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);
  const [location, setLocation] = useState('');
  const [showDetails, setShowDetails] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) return;
    
    // Fetch weather data if location is provided
    let weatherData = null;
    if (location) {
      weatherData = await fetchWeatherWithErrorHandling(location);
    }
    
    // Create task object
    const task = {
      title,
      description,
      priority,
      completed: false,
      dueDate: dueDate ? dueDate.toISOString() : undefined,
      location,
      weather: weatherData ? {
        temp: weatherData.temp,
        condition: weatherData.condition,
        icon: weatherData.icon,
        humidity: weatherData.humidity,
        wind: weatherData.wind,
        lastUpdated: weatherData.lastUpdated
      } : undefined,
    };
    
    // Dispatch action to add task
    await dispatch(addTask(task));
    
    // Reset form
    setTitle('');
    setDescription('');
    setPriority('medium');
    setDueDate(undefined);
    setLocation('');
    setShowDetails(false);
  };

  return (
    <Card className="glass-panel p-5 mb-8 border-t-4 border-t-orange-400 shadow-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="What needs to be done?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="transition-all duration-200 text-base py-5 focus-visible:ring-orange-400"
          />
          <Button 
            type="submit" 
            className="text-primary-foreground transition-all bg-orange-400 hover:bg-orange-500 duration-300"
            disabled={!title.trim()}
          >
            <PlusCircle className="h-5 w-5" />
            <span className="ml-2 hidden sm:inline">Add Task</span>
          </Button>
        </div>
        
        {/* Task details section - toggleable */}
        <div className="flex flex-wrap justify-between items-center gap-3">
          <Button 
            type="button" 
            variant="ghost" 
            onClick={() => setShowDetails(!showDetails)} 
            className={`px-3 text-sm transition-all ${showDetails ? 
              'bg-orange-100 hover:bg-orange-200 text-orange-700' : 
              'bg-orange-100 hover:bg-orange-200 text-orange-600'} 
              rounded-full py-1 border border-orange-200`}
          >
            {showDetails ? '− Hide details' : '+ Add details'}
          </Button>
          
          {/* Priority selection (always visible) */}
          <div className="bg-muted/50 p-1 rounded-full border border-border/50">
            <RadioGroup 
              value={priority} 
              onValueChange={(value) => setPriority(value as 'high' | 'medium' | 'low')}
              className="flex gap-2"
            >
              <div className="flex items-center space-x-1 px-2">
                <RadioGroupItem 
                  value="high" 
                  id="high" 
                  className="bg-red-500 text-white border-none h-3 w-3"
                />
                <Label htmlFor="high" className="text-xs cursor-pointer">High</Label>
              </div>
              <div className="flex items-center space-x-1 px-2">
                <RadioGroupItem 
                  value="medium" 
                  id="medium" 
                  className="bg-amber-500 text-white border-none h-3 w-3"
                />
                <Label htmlFor="medium" className="text-xs cursor-pointer">Medium</Label>
              </div>
              <div className="flex items-center space-x-1 px-2">
                <RadioGroupItem 
                  value="low" 
                  id="low" 
                  className="bg-green-500 text-white border-none h-3 w-3"
                />
                <Label htmlFor="low" className="text-xs cursor-pointer">Low</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
        
        {/* Expanded details */}
        {showDetails && (
          <div className="space-y-4 animate-in fade-in slide-in-from-top duration-300">
            <Textarea
              placeholder="Add description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[80px] transition-all duration-200 focus-visible:ring-orange-400"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Due date picker */}
              <div>
                <Label htmlFor="due-date" className="text-sm font-medium mb-1 block text-muted-foreground">
                  Due Date
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal transition-all duration-200 border-muted-foreground/20",
                        !dueDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 text-orange-500" />
                      {dueDate ? format(dueDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={dueDate}
                      onSelect={setDueDate}
                      initialFocus
                      className="border rounded-md"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              {/* Location input */}
              <div>
                <Label htmlFor="location" className="text-sm font-medium mb-1 block text-muted-foreground">
                  Location (for weather)
                </Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-orange-500" />
                  <Input
                    id="location"
                    placeholder="e.g. New York, London, Tokyo"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="pl-10 transition-all duration-200 border-muted-foreground/20 focus-visible:ring-orange-400"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </form>
    </Card>
  );
};

export default TaskInput;
