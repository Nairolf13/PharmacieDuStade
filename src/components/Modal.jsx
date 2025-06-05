import React from 'react';

function Modal({ isOpen, onClose, title, children, type = 'info' }) {
  if (!isOpen) return null;

  const getModalStyles = () => {
    switch (type) {
      case 'success':
        return 'border-green-500 bg-gradient-to-br from-green-50 to-green-100';
      case 'error':
        return 'border-red-500 bg-gradient-to-br from-red-50 to-red-100';
      case 'warning':
        return 'border-yellow-500 bg-gradient-to-br from-yellow-50 to-yellow-100';
      default:
        return 'border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100';
    }
  };

  const getIconStyles = () => {
    switch (type) {
      case 'success':
        return 'text-green-600 bg-green-100';
      case 'error':
        return 'text-red-600 bg-red-100';
      case 'warning':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-blue-600 bg-blue-100';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '🎯';
      case 'error':
        return '⚠️';
      case 'warning':
        return '📢';
      default:
        return '💡';
    }
  };

  const getButtonStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-lg hover:shadow-xl';
      case 'error':
        return 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-lg hover:shadow-xl';
      case 'warning':
        return 'bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 shadow-lg hover:shadow-xl';
      default:
        return 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl';
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className={`bg-white rounded-2xl shadow-2xl max-w-md w-full border-l-4 transform transition-all duration-300 scale-100 ${getModalStyles()}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8">
          <div className="flex items-center mb-6">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 shadow-lg ${getIconStyles()}`}>
              <span className="text-2xl">
                {getIcon()}
              </span>
            </div>
            <h3 className="text-xl font-bold text-gray-900">
              {title}
            </h3>
          </div>
          <div className="text-gray-700 mb-8 leading-relaxed">
            {children}
          </div>
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className={`text-white px-6 py-3 rounded-full font-bold transition-all duration-300 transform hover:scale-105 ${getButtonStyles()}`}
            >
              Compris !
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
