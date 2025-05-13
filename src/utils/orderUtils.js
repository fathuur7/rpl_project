 export const isDeadlineAvailable = (deadline) => {
    if (!deadline) return false;
    const now = new Date();
    const serviceDeadline = new Date(deadline);
    return serviceDeadline > now;
  };