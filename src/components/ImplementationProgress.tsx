
import React from 'react';

interface ImplementationProgressProps {
  onClose: () => void;
}

const ImplementationProgress: React.FC<ImplementationProgressProps> = ({ onClose }) => {
  return (
    <div className="space-y-6 px-2">
      <h2 className="text-xl font-semibold text-center">Implementation in Progress...</h2>
      <p className="text-center text-gray-600 mb-4">
        Our team is working on implementing the following UI testing features:
      </p>
      
      <div className="space-y-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium text-primary">Accessibility Report on the UI screen</h3>
          <p className="text-sm text-gray-600 mt-1">
            Comprehensive auditing of UI elements to ensure they meet WCAG standards and are accessible to all users.
          </p>
        </div>
        
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium text-primary">User Experience Analysis</h3>
          <p className="text-sm text-gray-600 mt-1">
            Detailed evaluation of user flows, interactive elements, and overall usability of the interface.
          </p>
        </div>
        
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium text-primary">Dead Links Reporting</h3>
          <p className="text-sm text-gray-600 mt-1">
            Automated detection and reporting of broken links, missing resources, and navigation issues.
          </p>
        </div>
        
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium text-primary">Custom UI Functional Requirements</h3>
          <p className="text-sm text-gray-600 mt-1">
            Support for defining and testing custom UI functionality and business-specific requirements.
          </p>
        </div>
      </div>
      
      <div className="text-center pt-2">
        <button 
          onClick={onClose}
          className="px-6 py-2 text-primary font-medium hover:text-darkerBlue transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ImplementationProgress;
