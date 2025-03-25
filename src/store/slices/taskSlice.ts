import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'sonner';

// Priority type
export type Priority = 'high' | 'medium' | 'low';

// Task interface
export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  completed: boolean;
  createdAt: string;
  dueDate?: string;
  weather?: {
    temp: number;
    condition: string;
    icon: string;
    humidity?: number;
    wind?: {
      speed: number;
      direction: string;
    };
    lastUpdated?: string;
  };
  location?: string;
}

interface TasksState {
  tasks: Task[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Helper to simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Load tasks from localStorage
const loadTasksFromStorage = (): Task[] => {
  try {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  } catch (error) {
    console.error('Failed to load tasks from localStorage:', error);
    return [];
  }
};

// Save tasks to localStorage
const saveTasksToStorage = (tasks: Task[]) => {
  try {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  } catch (error) {
    console.error('Failed to save tasks to localStorage:', error);
  }
};

// Async thunks
export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async () => {
    // Simulate API call delay
    await delay(500);
    
    // Load tasks from localStorage
    return loadTasksFromStorage();
  }
);

export const addTask = createAsyncThunk(
  'tasks/addTask',
  async (task: Omit<Task, 'id' | 'createdAt'>) => {
    // Simulate API call delay
    await delay(500);
    
    // Create new task with ID and createdAt date
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    
    return newTask;
  }
);

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async (task: Task) => {
    // Simulate API call delay
    await delay(500);
    
    return task;
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (taskId: string) => {
    // Simulate API call delay
    await delay(500);
    
    return taskId;
  }
);

export const toggleTaskCompletion = createAsyncThunk(
  'tasks/toggleTaskCompletion',
  async (taskId: string, { getState }) => {
    // Simulate API call delay
    await delay(300);
    
    const state = getState() as { tasks: TasksState };
    const task = state.tasks.tasks.find(t => t.id === taskId);
    
    if (!task) {
      throw new Error('Task not found');
    }
    
    return {
      taskId,
      completed: !task.completed
    };
  }
);

// Initial state
const initialState: TasksState = {
  tasks: [],
  status: 'idle',
  error: null,
};

// Tasks slice
const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch tasks cases
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.status = 'succeeded';
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch tasks';
        toast.error('Failed to load tasks');
      })
      
      // Add task cases
      .addCase(addTask.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.status = 'succeeded';
        state.tasks.push(action.payload);
        saveTasksToStorage(state.tasks);
        toast.success('Task added successfully');
      })
      .addCase(addTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to add task';
        toast.error('Failed to add task');
      })
      
      // Update task cases
      .addCase(updateTask.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.status = 'succeeded';
        const index = state.tasks.findIndex(task => task.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
          saveTasksToStorage(state.tasks);
          toast.success('Task updated successfully');
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to update task';
        toast.error('Failed to update task');
      })
      
      // Delete task cases
      .addCase(deleteTask.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteTask.fulfilled, (state, action: PayloadAction<string>) => {
        state.status = 'succeeded';
        state.tasks = state.tasks.filter(task => task.id !== action.payload);
        saveTasksToStorage(state.tasks);
        toast.success('Task deleted successfully');
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to delete task';
        toast.error('Failed to delete task');
      })
      
      // Toggle task completion cases
      .addCase(toggleTaskCompletion.fulfilled, (state, action) => {
        const { taskId, completed } = action.payload;
        const taskIndex = state.tasks.findIndex(task => task.id === taskId);
        
        if (taskIndex !== -1) {
          state.tasks[taskIndex].completed = completed;
          saveTasksToStorage(state.tasks);
        }
      });
  },
});

export default taskSlice.reducer;
