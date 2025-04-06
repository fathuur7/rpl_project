import React from 'react';

const CategoryList = ({
  categories,
  onEditCategory,
  onDeleteCategory
}) => {
  if (categories.length === 0) {
    return (
      <div className="text-center p-8 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-gray-500 font-medium">No categories found</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg shadow-md">
      <table className="min-w-full bg-white divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left px-6 py-3 text-xs font-medium text-gray-700 uppercase tracking-wider">
              Category Name
            </th>
            <th className="text-right px-6 py-3 text-xs font-medium text-gray-700 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {categories.map((category) => (
            <tr 
              key={category._id} 
              className="hover:bg-gray-50 transition-colors duration-150"
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="font-medium text-gray-800 capitalize">{category.name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => onEditCategory(category)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-150"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDeleteCategory(category._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-150"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryList;