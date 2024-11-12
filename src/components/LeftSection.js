import React, { useState } from 'react';
import './LeftSection.css';

function LeftSection({ onFilterChange }) {
  const [selectedPriority, setSelectedPriority] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const handlePriorityChange = (e) => {
    const priority = e.target.value;
    setSelectedPriority(priority);
    onFilterChange({ priority, status: selectedStatus });
  };

  const handleStatusChange = (e) => {
    const status = e.target.value;
    setSelectedStatus(status);
    onFilterChange({ priority: selectedPriority, status });
  };

  return (
    <div className="left-section">
      <h2>Filter Tasks</h2>
      <div className="filter-group">
        <h3>Priority</h3>
        <select value={selectedPriority} onChange={handlePriorityChange}>
          <option value="All">All</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>
      <div className="filter-group">
        <h3>Status</h3>
        <select value={selectedStatus} onChange={handleStatusChange}>
          <option value="All">All</option>
          <option value="completed">Completed</option>
          <option value="incomplete">Incomplete</option>
        </select>
      </div>
    </div>
  );
}

export default LeftSection;
