  export const getOrderStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'revision': return 'bg-orange-100 text-orange-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'awaiting_payment': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  export const getDeliverableStatusColor = (status) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'APPROVED': return 'bg-green-100 text-green-800';
      case 'REJECTED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  