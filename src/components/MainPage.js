import React, { useState } from 'react';
import LeftSection from './LeftSection';
import MiddleSection from './MiddleSection';
import RightSection from './RightSection';
import './MainPage.css';

function MainPage() {
  const [tasks, setTasks] = useState([]);       // Global task list
  const [filteredTasks, setFilteredTasks] = useState([]); // Filtered tasks to display
  const [editingTask, setEditingTask] = useState(null); // Task being edited

  // Add a task to the global list
  const handleAddTask = (task) => {
    const newTask = { ...task, id: Date.now(), completed: false };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks); // Update filtered tasks when a new task is added
  };

  // Update an existing task
  const handleUpdateTask = (updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks);
    setEditingTask(null); // Clear editing state
  };

  // Delete a task
  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks);
  };

  // Start editing a task
  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  // Handle filter change from LeftSection
  const handleFilterChange = (filter) => {
    const { priority, status } = filter;
    filterTasks(priority, status);
  };

  // Filter tasks based on priority and status
  const filterTasks = (priority, status) => {
    let filtered = tasks;

    if (priority && priority !== 'All') {
      filtered = filtered.filter((task) => task.priority === priority);
    }

    if (status && status !== 'All') {
      filtered = filtered.filter(
        (task) =>
          (status === 'completed' && task.completed) ||
          (status === 'incomplete' && !task.completed)
      );
    }

    setFilteredTasks(filtered);
  };

  return (
    <div className="main-page-container">
      <LeftSection onFilterChange={handleFilterChange} />
      <MiddleSection
        handleAddTask={handleAddTask}
        handleUpdateTask={handleUpdateTask}
        editingTask={editingTask}
      />
      <RightSection
        tasks={filteredTasks}
        onEditTask={handleEditTask}
        onDeleteTask={handleDeleteTask}
      />
    </div>
  );
}

export default MainPage;
