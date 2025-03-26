
import React from 'react';
import CustomButton from './CustomButton';

interface TestingOptionsProps {
  onSelectOption: (option: 'api' | 'stress') => void;
}

const TestingOptions: React.FC<TestingOptionsProps> = ({ onSelectOption }) => {
  return (
    <div className="space-y-6 w-full">
      <h2 className="text-xl font-medium mb-4 text-center">Select Testing Type</h2>
      <div className="flex justify-center gap-4">
        <CustomButton 
          onClick={() => onSelectOption('api')}
          className="w-40"
        >
          API Testing
        </CustomButton>
        <CustomButton 
          onClick={() => onSelectOption('stress')}
          className="w-40"
        >
          Stress Testing
        </CustomButton>
      </div>
    </div>
  );
};

export default TestingOptions;
