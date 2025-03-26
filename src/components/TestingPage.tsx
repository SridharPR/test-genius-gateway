
import React, { useState, useEffect } from 'react';
import { Home, Download, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import CustomButton from './CustomButton';
import Rating from './Rating';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface TestingPageProps {
  type: 'api' | 'stress';
  domain: string;
  onGoHome: () => void;
}

const TestingPage: React.FC<TestingPageProps> = ({ type, domain, onGoHome }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [scenarios, setScenarios] = useState('');
  const [additionalRequirements, setAdditionalRequirements] = useState('');
  const [showRatingDialog, setShowRatingDialog] = useState(false);
  const [userRating, setUserRating] = useState(0);
  
  useEffect(() => {
    setIsLoading(true);
    
    const timer = setTimeout(() => {
      const exampleScenarios = generateExampleScenarios(domain, type);
      setScenarios(exampleScenarios);
      setIsLoading(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [domain, type]);
  
  const handleSubmit = () => {
    if (!additionalRequirements.trim()) {
      toast.error('Please enter your specific requirements');
      return;
    }
    
    setIsLoading(true);
    setTimeout(() => {
      const newScenarios = generateExampleScenarios(domain, type) + 
        `\n\nAdditional scenarios based on your requirements:\n${generateAdditionalScenarios(additionalRequirements)}`;
      setScenarios(newScenarios);
      setIsLoading(false);
      setAdditionalRequirements(''); // Clear the additional requirements field
      toast.success('Test scenarios updated successfully');
    }, 2000);
  };
  
  const handleDownload = () => {
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${domain} ${type.toUpperCase()} Testing Report</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 20px; }
          h1 { color: #2c5282; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px; }
          pre { background-color: #f7fafc; padding: 15px; border-radius: 5px; white-space: pre-wrap; }
          .footer { margin-top: 30px; font-size: 0.8em; color: #718096; text-align: center; }
          .rating { margin-top: 20px; padding: 15px; background-color: #f7fafc; border-radius: 5px; }
          .rating-statement { margin-top: 10px; font-style: italic; color: #4a5568; }
        </style>
      </head>
      <body>
        <h1>${domain} ${type.toUpperCase()} Testing Report</h1>
        <p>Generated on: ${new Date().toLocaleString()}</p>
        <pre>${scenarios}</pre>
        ${userRating > 0 ? `
        <div class="rating">
          <div>User Rating: ${userRating} out of 5 stars</div>
          <div class="rating-statement">Based on the rating of the user, we have improved response for user's specific information.</div>
        </div>` : ''}
        <div class="footer">Generated by Gen AI Test-Hub</div>
      </body>
      </html>
    `;
    
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${domain.toLowerCase()}-${type.toLowerCase()}-testing-report.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('Report downloaded successfully');
  };
  
  const handleRating = (rating: number) => {
    setUserRating(rating);
    setShowRatingDialog(false);
    toast.success(`Thank you for your ${rating}-star rating!`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6 pb-4 border-b">
        <h1 className="text-2xl font-semibold">{domain} - {type === 'api' ? 'API' : 'Stress'} Testing</h1>
        <button 
          onClick={onGoHome}
          className="flex items-center gap-2 hover:text-primary transition-colors"
        >
          <Home size={18} />
          <span>Home</span>
        </button>
      </div>
      
      <div className="space-y-8">
        <div className="space-y-4">
          <label className="block font-medium">Generated Test Scenarios:</label>
          <div className="relative min-h-[300px] w-full">
            {isLoading ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 rounded-lg">
                <div className="w-8 h-8 border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mb-2"></div>
                <p className="text-gray-500">Generating test scenarios...</p>
              </div>
            ) : (
              <textarea
                value={scenarios}
                onChange={(e) => setScenarios(e.target.value)}
                className="w-full h-[300px] p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            )}
          </div>
        </div>
        
        <div className="space-y-4">
          <label className="block font-medium">Any more specific requirements?</label>
          <textarea
            value={additionalRequirements}
            onChange={(e) => setAdditionalRequirements(e.target.value)}
            placeholder="Enter your specific requirements here..."
            className="w-full h-[100px] p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        
        <div className="flex flex-wrap gap-4 justify-between items-center">
          <div className="flex gap-3">
            <CustomButton onClick={handleDownload} className="flex items-center gap-2">
              <Download size={16} />
              <span>Download Report</span>
            </CustomButton>
            
            <CustomButton 
              onClick={() => setShowRatingDialog(true)} 
              variant="outline" 
              className="flex items-center gap-2"
            >
              <Star size={16} fill="#FFD700" />
              <span>Rate Response</span>
            </CustomButton>
          </div>
          
          <CustomButton 
            onClick={handleSubmit}
            disabled={isLoading}
            className="px-8"
          >
            Submit
          </CustomButton>
        </div>
      </div>
      
      <Dialog open={showRatingDialog} onOpenChange={setShowRatingDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Rate the quality of these test scenarios</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center py-4 gap-3">
            <Rating onChange={handleRating} initialRating={userRating} />
            <p className="text-sm text-gray-500 mt-2">Click on a star to submit your rating</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

function generateExampleScenarios(domain: string, type: 'api' | 'stress'): string {
  switch (domain) {
    case 'Loans':
      if (type === 'api') {
        return `# Loans API Testing Scenarios

1. Test loan application submission API with valid data
2. Test loan application submission API with invalid data
3. Verify loan status retrieval API returns correct status
4. Test loan approval API with authorized user
5. Test loan approval API with unauthorized user
6. Verify loan details retrieval API returns all required fields
7. Test loan repayment API with valid payment amount
8. Test loan repayment API with insufficient payment amount
9. Verify loan history API returns all transactions in chronological order
10. Test loan term modification API with valid parameters
11. Test interest rate calculation API with different loan types
12. Verify credit score integration API returns valid scores
13. Test document upload API with valid file formats
14. Test document upload API with invalid file formats
15. Verify loan eligibility check API with various income levels`;
      } else {
        return `# Loans Stress Testing Scenarios

1. Test system performance with 1000 concurrent loan applications
2. Verify system stability during peak hours (10,000+ users)
3. Test database performance with 1 million loan records
4. Verify API response times under heavy load (5000+ requests/minute)
5. Test system recovery after database failure
6. Verify loan processing pipeline with 10,000 queued applications
7. Test system behavior during network latency spikes
8. Verify document processing system with 10,000 concurrent uploads
9. Test payment processing system with 5000 concurrent transactions
10. Verify report generation with large datasets (100,000+ records)
11. Test system behavior during partial service outages
12. Verify data consistency during high-volume operations
13. Test cache performance under heavy load
14. Verify backup and recovery procedures under stress conditions
15. Test search functionality with large result sets (50,000+ items)`;
      }
    
    case 'Deposits':
      if (type === 'api') {
        return `# Deposits API Testing Scenarios

1. Test deposit account creation API with valid customer data
2. Test deposit account creation API with invalid customer data
3. Verify deposit transaction API with valid amount and account
4. Test withdrawal transaction API with sufficient balance
5. Test withdrawal transaction API with insufficient balance
6. Verify account balance retrieval API returns accurate information
7. Test interest calculation API for different account types
8. Test account statement generation API for specified date ranges
9. Verify transaction history API returns all transactions correctly
10. Test account closure API with zero balance
11. Test account closure API with non-zero balance
12. Verify beneficiary addition API with valid details
13. Test recurring deposit schedule API with valid parameters
14. Test transaction limits enforcement API
15. Verify multi-currency deposit account API functionality`;
      } else {
        return `# Deposits Stress Testing Scenarios

1. Test system performance with 5000 concurrent deposit transactions
2. Verify system stability during month-end interest calculations
3. Test database performance with 10 million transaction records
4. Verify API response times under heavy load (10,000+ requests/minute)
5. Test system recovery after payment gateway failure
6. Verify transaction processing pipeline with 20,000 queued operations
7. Test system behavior during database replication lag
8. Verify statement generation system with 50,000 concurrent requests
9. Test batch processing system with large transaction volumes
10. Verify reporting system with massive datasets (500,000+ records)
11. Test system behavior during partial microservice outages
12. Verify data consistency during high-volume transaction periods
13. Test caching mechanisms under heavy read operations
14. Verify backup and recovery procedures under peak conditions
15. Test search and filtering with complex queries on large datasets`;
      }
      
    case 'Credit Risks':
      if (type === 'api') {
        return `# Credit Risks API Testing Scenarios

1. Test credit score calculation API with various customer profiles
2. Test risk assessment API for new loan applications
3. Verify fraud detection API with known fraud patterns
4. Test credit limit recommendation API based on customer history
5. Test risk categorization API for different customer segments
6. Verify portfolio risk analysis API returns accurate metrics
7. Test early warning system API for detecting deteriorating credits
8. Test collateral valuation API with different asset types
9. Verify regulatory compliance check API for risk reporting
10. Test stress testing API with various economic scenarios
11. Test risk model calibration API with historical data
12. Verify concentration risk calculation API for sector exposures
13. Test probability of default API with current market conditions
14. Test loss given default calculation API for different collateral types
15. Verify credit monitoring API for existing customer portfolio`;
      } else {
        return `# Credit Risks Stress Testing Scenarios

1. Test system performance with 2000 concurrent risk assessments
2. Verify system stability during economic downturn simulations
3. Test database performance with complex risk calculations on 5 million accounts
4. Verify API response times under heavy analytical workloads
5. Test system recovery after model service failures
6. Verify risk calculation pipeline with 10,000 queued assessments
7. Test system behavior during data feed disruptions
8. Verify batch risk recalculation for entire portfolio (1 million+ accounts)
9. Test model validation system with massive historical datasets
10. Verify reporting system with comprehensive risk metrics calculations
11. Test system behavior during market volatility simulations
12. Verify data consistency during parallel risk calculations
13. Test machine learning model inference under heavy load
14. Verify backup and recovery procedures for risk data warehouse
15. Test performance with multiple concurrent stress testing scenarios`;
      }
      
    case 'Regulatory Compliances':
      if (type === 'api') {
        return `# Regulatory Compliances API Testing Scenarios

1. Test KYC verification API with valid customer identification
2. Test AML screening API against watchlists
3. Verify transaction monitoring API for suspicious activities
4. Test regulatory reporting API for different jurisdictions
5. Test consent management API for customer data processing
6. Verify data retention policy enforcement API
7. Test GDPR compliance API for data subject access requests
8. Test sanctions screening API with various entity types
9. Verify regulatory filing generation API with accurate data
10. Test risk-based compliance assessment API
11. Test compliance attestation API for internal controls
12. Verify audit trail API for compliance activities
13. Test regulatory change management API
14. Test compliance training verification API
15. Verify cross-border transaction compliance API`;
      } else {
        return `# Regulatory Compliances Stress Testing Scenarios

1. Test system performance with 3000 concurrent compliance checks
2. Verify system stability during regulatory reporting deadlines
3. Test database performance with complex compliance queries on historical data
4. Verify API response times under heavy compliance screening load
5. Test system recovery after compliance service disruptions
6. Verify regulatory reporting pipeline under peak period loads
7. Test system behavior during watchlist update propagation
8. Verify transaction monitoring with high volume transaction flows
9. Test compliance detection systems with sophisticated evasion patterns
10. Verify reporting generation with tight regulatory deadlines
11. Test system behavior during regulatory audit examinations
12. Verify data consistency during compliance rule updates
13. Test AI-based compliance monitoring under heavy load
14. Verify backup and recovery procedures for compliance evidence
15. Test search and retrieval of compliance records under audit conditions`;
      }
      
    case 'Assets Liability Management':
      if (type === 'api') {
        return `# Assets Liability Management API Testing Scenarios

1. Test liquidity ratio calculation API with current balance sheet data
2. Test interest rate risk measurement API with yield curve shifts
3. Verify cash flow projection API with contractual maturities
4. Test capital adequacy ratio calculation API
5. Test funding concentration analysis API by source
6. Verify maturity gap analysis API for different time buckets
7. Test net interest income simulation API with rate scenarios
8. Test stress testing API for liquidity under market stress
9. Verify transfer pricing calculation API for internal funds
10. Test contingency funding plan activation API
11. Test early warning indicator monitoring API
12. Verify behavioral modeling API for non-maturing deposits
13. Test IRRBB (Interest Rate Risk in Banking Book) calculation API
14. Test liquidity coverage ratio (LCR) calculation API
15. Verify net stable funding ratio (NSFR) calculation API`;
      } else {
        return `# Assets Liability Management Stress Testing Scenarios

1. Test system performance with complex ALM calculations across entire balance sheet
2. Verify system stability during market stress simulations
3. Test database performance with historical balance sheet data (10+ years)
4. Verify API response times under heavy analytical model executions
5. Test system recovery after risk model service failures
6. Verify ALM calculation pipeline with multiple concurrent scenarios
7. Test system behavior during market data feed disruptions
8. Verify Monte Carlo simulation engine with 10,000+ iterations
9. Test capital planning models under extreme market conditions
10. Verify reporting system with comprehensive ALM metrics
11. Test system behavior during liquidity crisis simulations
12. Verify data consistency across risk and finance data domains
13. Test stochastic modeling engines under heavy computational load
14. Verify backup and recovery procedures for ALM analytical datasets
15. Test performance with multiple concurrent regulatory stress tests`;
      }
      
    case 'Customer Information':
      if (type === 'api') {
        return `# Customer Information API Testing Scenarios

1. Test customer profile creation API with valid data
2. Test customer profile update API with authorized credentials
3. Verify customer search API with various search criteria
4. Test customer relationship API for household connections
5. Test customer preference management API
6. Verify customer document retrieval API with proper authentication
7. Test customer activity log API with date filtering
8. Test customer onboarding workflow API
9. Verify customer segmentation API based on attributes
10. Test customer contact information validation API
11. Test customer consent management API for marketing
12. Verify customer authentication API with multi-factor options
13. Test customer product eligibility API
14. Test customer feedback collection API
15. Verify customer communication preference API`;
      } else {
        return `# Customer Information Stress Testing Scenarios

1. Test system performance with 10,000 concurrent customer profile retrievals
2. Verify system stability during customer data migration
3. Test database performance with 50 million customer records
4. Verify API response times under heavy customer service center load
5. Test system recovery after customer master data service failure
6. Verify customer search functionality with complex query patterns
7. Test system behavior during peak onboarding periods
8. Verify batch processing with large customer data updates
9. Test customer segmentation engine with complex rules on full customer base
10. Verify reporting system with comprehensive customer analytics
11. Test system behavior during marketing campaign launches
12. Verify data consistency during concurrent profile updates
13. Test machine learning-based recommendation engine under load
14. Verify backup and recovery procedures for customer data
15. Test performance of customer 360-view generation for service representatives`;
      }
      
    default:
      if (type === 'api') {
        return `# ${domain} API Testing Scenarios\n\n1. Test endpoint authentication and authorization\n2. Verify correct data retrieval from API endpoints\n3. Test data creation through API with valid inputs\n4. Test API behavior with invalid inputs\n5. Verify API response formats and status codes\n`;
      } else {
        return `# ${domain} Stress Testing Scenarios\n\n1. Test system performance under heavy load\n2. Verify system stability during peak usage periods\n3. Test database performance with large datasets\n4. Verify system recovery after failures\n5. Test concurrent user capacity\n`;
      }
  }
}

function generateAdditionalScenarios(requirements: string): string {
  return `1. Custom test for ${requirements.split(' ').slice(0, 3).join(' ')}...\n2. Specific scenario for ${requirements.split(' ').slice(-3).join(' ')}...\n3. Edge case testing for given requirements...\n4. Validation testing for specific business rules...\n5. Boundary testing for specified conditions...`;
}

export default TestingPage;
