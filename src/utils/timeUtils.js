  export const getTimeRemaining = (deadline) => {
    if (!deadline) return "No deadline set";
    
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - now;
    
    if (diffTime < 0) return "Expired";
    
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (diffDays > 0) {
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} ${diffHours} hr${diffHours !== 1 ? 's' : ''}`;
    } else if (diffHours > 0) {
      return `${diffHours} hour${diffHours !== 1 ? 's' : ''}`;
    } else {
      const diffMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
      return `${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''}`;
    }
  };