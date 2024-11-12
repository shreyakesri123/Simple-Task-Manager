import React, { useState, useEffect } from 'react';
import './TaskManager.css';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDueDate, setTaskDueDate] = useState('');
  const [taskPriority, setTaskPriority] = useState('Low');
  const [editTaskId, setEditTaskId] = useState(null);  // Track which task is being edited
  const [activeSection, setActiveSection] = useState('upcoming'); // Track which section is selected

  // Load tasks from localStorage
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  // Save tasks to localStorage
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Add or edit a task
  const handleSubmit = () => {
    if (!taskTitle) return;

    const newTask = {
      id: editTaskId || Date.now(),  // Use existing task ID if editing
      title: taskTitle,
      description: taskDescription,
      dueDate: taskDueDate,
      priority: taskPriority,
      completed: false,
    };

    if (editTaskId) {
      // Update existing task
      const updatedTasks = tasks.map(task =>
        task.id === editTaskId ? newTask : task
      );
      setTasks(updatedTasks);
    } else {
      // Add new task
      setTasks([...tasks, newTask]);
    }

    resetForm();  // Reset form fields
  };

  // Reset form fields
  const resetForm = () => {
    setTaskTitle('');
    setTaskDescription('');
    setTaskDueDate('');
    setTaskPriority('Low');
    setEditTaskId(null);  // Clear the edit mode
  };

  // Delete a task
  const deleteTask = (id) => {
    const filteredTasks = tasks.filter((task) => task.id !== id);
    setTasks(filteredTasks);
  };

  // Set task for editing
  const handleEdit = (task) => {
    setTaskTitle(task.title);
    setTaskDescription(task.description);
    setTaskDueDate(task.dueDate);
    setTaskPriority(task.priority);
    setEditTaskId(task.id);  // Set the task id to trigger edit mode
  };

  // Get tasks categorized into Upcoming, Overdue, and Completed
  const getCategorizedTasks = () => {
    const currentDate = new Date().toISOString().split('T')[0]; // Get today's date in 'YYYY-MM-DD' format

    const upcomingTasks = tasks.filter(task => task.dueDate >= currentDate && !task.completed);
    const overdueTasks = tasks.filter(task => task.dueDate < currentDate && !task.completed);
    const completedTasks = tasks.filter(task => task.completed);

    return { upcomingTasks, overdueTasks, completedTasks };
  };

  const { upcomingTasks, overdueTasks, completedTasks } = getCategorizedTasks();

  // Return tasks based on active section
  const getTasksForSection = () => {
    switch (activeSection) {
      case 'upcoming':
        return upcomingTasks;
      case 'overdue':
        return overdueTasks;
      case 'completed':
        return completedTasks;
      default:
        return [];
    }
  };

  return (
    <div className="task-manager">
      <div className="sidebar">
        <h2>Task Sections</h2>
        <ul>
          <li onClick={() => setActiveSection('upcoming')}>Upcoming Tasks</li>
          <li onClick={() => setActiveSection('overdue')}>Overdue Tasks</li>
          <li onClick={() => setActiveSection('completed')}>Completed Tasks</li>
        </ul>
      </div>

      <div className="main-content">
        <h1>Task Manager</h1>

        <div className="task-form">
          <input
            type="text"
            placeholder="Task Title"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
          />
          <textarea
            placeholder="Task Description"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
          />
          <input
            type="date"
            value={taskDueDate}
            onChange={(e) => setTaskDueDate(e.target.value)}
          />
          <select
            value={taskPriority}
            onChange={(e) => setTaskPriority(e.target.value)}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <button onClick={handleSubmit}>
            {editTaskId ? 'Save Changes' : 'Add Task'}
          </button>
        </div>

        {/* Task List for the active section */}
        <h2>{activeSection.charAt(0).toUpperCase() + activeSection.slice(1)} Tasks</h2>
        <ul className="task-list">
          {getTasksForSection().length > 0 ? (
            getTasksForSection().map((task) => (
              <li key={task.id} className="task-item">
                <div>
                  <h3>{task.title}</h3>
                  <p>{task.description}</p>
                  <p>Due: {task.dueDate} | Priority: {task.priority}</p>
                </div>
                <div>
                  <button onClick={() => handleEdit(task)}>Edit</button>
                  <button onClick={() => deleteTask(task.id)}>Delete</button>
                </div>
              </li>
            ))
          ) : (
            <p>No tasks available.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default TaskManager;
