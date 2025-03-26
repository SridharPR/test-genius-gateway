
import React, { useState } from 'react';
import CustomButton from '@/components/CustomButton';
import Modal from '@/components/Modal';
import TestingOptions from '@/components/TestingOptions';
import TestingPage from '@/components/TestingPage';
import ImplementationProgress from '@/components/ImplementationProgress';

const domains = [
  'Loans',
  'Deposits',
  'Credit Risks',
  'Regulatory Compliances',
  'Assets Liability Management',
  'Customer Information',
  'UI Testing'
];

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImplementationModalOpen, setIsImplementationModalOpen] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState('');
  const [selectedTestingType, setSelectedTestingType] = useState<'api' | 'stress' | null>(null);

  const handleDomainClick = (domain: string) => {
    if (domain === 'UI Testing') {
      setIsImplementationModalOpen(true);
      return;
    }
    
    setSelectedDomain(domain);
    setIsModalOpen(true);
  };

  const handleSelectTestingType = (type: 'api' | 'stress') => {
    setSelectedTestingType(type);
    setIsModalOpen(false);
  };

  const handleGoHome = () => {
    setSelectedTestingType(null);
    setSelectedDomain('');
  };

  // Render the testing page if a testing type is selected
  if (selectedTestingType && selectedDomain) {
    return (
      <div className="min-h-screen py-12 px-4 sm:px-6 md:px-8">
        <TestingPage 
          type={selectedTestingType} 
          domain={selectedDomain} 
          onGoHome={handleGoHome}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col p-6 animate-fade-in">
      <header className="mb-12 mt-8">
        <h1 className="text-4xl font-light text-center tracking-tight">
          Gen AI Test-Hub
        </h1>
        <p className="text-center text-gray-600 mt-3">
          Test Scenarios Generator powered by Gen AI
        </p>
      </header>

      <main className="flex-1">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {domains.slice(0, 6).map((domain) => (
            <CustomButton
              key={domain}
              onClick={() => handleDomainClick(domain)}
              className="h-16 text-base"
            >
              {domain}
            </CustomButton>
          ))}
        </div>
        
        <div className="flex justify-center mt-8">
          <CustomButton
            onClick={() => handleDomainClick('UI Testing')}
            className="w-64 h-16 text-base"
          >
            UI Testing
          </CustomButton>
        </div>
      </main>

      <section className="mt-16 mb-8">
        <div className="max-w-4xl mx-auto border border-gray-200 rounded-xl p-6">
          <h2 className="text-2xl font-light text-center mb-6">
            Future Enhancements
          </h2>
          
          <ul className="space-y-3 text-sm text-gray-600 flex flex-col items-center">
            <li className="flex items-baseline">
              <span className="mr-2 text-primary">•</span>
              <span>Expanding to wider domains in software industry</span>
            </li>
            <li className="flex items-baseline">
              <span className="mr-2 text-primary">•</span>
              <span>UI Testing - Providing support for Accessibility and User Experience Testing</span>
            </li>
            <li className="flex items-baseline">
              <span className="mr-2 text-primary">•</span>
              <span>More deeper testing capabilities - Integration with real time application code</span>
            </li>
            <li className="flex items-baseline">
              <span className="mr-2 text-primary">•</span>
              <span>Integration with tools to enable more robust testing - Performance Testing, etc..</span>
            </li>
            <li className="flex items-baseline">
              <span className="mr-2 text-primary">•</span>
              <span>Reporting capabilities along with tracking of test improvements</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Domain Testing Options Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title={`${selectedDomain} Testing Options`}
      >
        <TestingOptions onSelectOption={handleSelectTestingType} />
      </Modal>

      {/* Implementation Progress Modal */}
      <Modal
        isOpen={isImplementationModalOpen}
        onClose={() => setIsImplementationModalOpen(false)}
        title="UI Testing"
      >
        <ImplementationProgress onClose={() => setIsImplementationModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default Index;
