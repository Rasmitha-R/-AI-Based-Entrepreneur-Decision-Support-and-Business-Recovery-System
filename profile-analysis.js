const profileForm = document.getElementById('profile-form');
const resultsContainer = document.getElementById('results-container');
const backBtn = document.getElementById('back-btn');
const resetBtn = document.getElementById('reset-btn');
const userNameDisplay = document.getElementById('user-name');
const glowBtn = document.getElementById('glow-btn');
const trackerFill = document.getElementById('tracker-fill');
const trackerPercentage = document.getElementById('tracker-percentage');
const autoFillBtn = document.getElementById('auto-fill-btn');
const autoFillDropdown = document.getElementById('auto-fill-dropdown');
const budgetSection = document.getElementById('budget-section');
const budgetForm = document.getElementById('budget-form');
const budgetResults = document.getElementById('budget-results');
const continueLocationBtn = document.getElementById('continue-location-btn');
const budgetTrackerFill = document.getElementById('budget-tracker-fill');
const budgetTrackerPercentage = document.getElementById('budget-tracker-percentage');
const selectedBusinessName = document.getElementById('selected-business-name');
const mobileToast = document.getElementById('mobile-toast');
const budgetSlider = document.getElementById('budget-slider');
const sliderValue = document.getElementById('slider-value');
const budgetHealth = document.getElementById('budget-health');
const locationSection = document.getElementById('location-section');
const locationForm = document.getElementById('location-form');
const locationResults = document.getElementById('location-results');
const locationBusinessName = document.getElementById('location-business-name');
const locationBusinessBudget = document.getElementById('location-business-budget');
const locationTrackerFill = document.getElementById('location-tracker-fill');
const locationTrackerPercentage = document.getElementById('location-tracker-percentage');
const continueLossBtn = document.getElementById('continue-loss-btn');

let selectedBusiness = null;
let selectedBudget = null;

// Training Dataset for Location Recommendations
const locationTrainingData = [
  // Digital Marketing Agency
  { business: 'Digital Marketing Agency', budget: 350000, areaType: 'urban', demand: 'high', competition: 'medium', location: 'Tech Park, Bangalore', successRate: 92 },
  { business: 'Digital Marketing Agency', budget: 250000, areaType: 'semi-urban', demand: 'medium', competition: 'low', location: 'IT Corridor, Hyderabad', successRate: 88 },
  { business: 'Digital Marketing Agency', budget: 500000, areaType: 'commercial', demand: 'high', competition: 'high', location: 'Business District, Mumbai', successRate: 85 },
  { business: 'Digital Marketing Agency', budget: 200000, areaType: 'urban', demand: 'high', competition: 'high', location: 'Connaught Place, Delhi', successRate: 78 },
  { business: 'Digital Marketing Agency', budget: 400000, areaType: 'semi-urban', demand: 'medium', competition: 'medium', location: 'Electronic City, Chennai', successRate: 90 },
  
  // Organic Grocery Store
  { business: 'Organic Grocery Store', budget: 300000, areaType: 'residential', demand: 'high', competition: 'low', location: 'Koramangala, Bangalore', successRate: 94 },
  { business: 'Organic Grocery Store', budget: 250000, areaType: 'semi-urban', demand: 'medium', competition: 'medium', location: 'Whitefield, Bangalore', successRate: 87 },
  { business: 'Organic Grocery Store', budget: 400000, areaType: 'urban', demand: 'high', competition: 'medium', location: 'South Extension, Delhi', successRate: 89 },
  { business: 'Organic Grocery Store', budget: 200000, areaType: 'rural', demand: 'low', competition: 'low', location: 'Village Outskirts, Pune', successRate: 82 },
  { business: 'Organic Grocery Store', budget: 350000, areaType: 'residential', demand: 'high', competition: 'low', location: 'Anna Nagar, Chennai', successRate: 91 },
  
  // Mobile Accessories Shop
  { business: 'Mobile Accessories Shop', budget: 200000, areaType: 'commercial', demand: 'high', competition: 'high', location: 'Commercial Street, Bangalore', successRate: 86 },
  { business: 'Mobile Accessories Shop', budget: 150000, areaType: 'semi-urban', demand: 'medium', competition: 'medium', location: 'Dilsukhnagar, Hyderabad', successRate: 84 },
  { business: 'Mobile Accessories Shop', budget: 300000, areaType: 'urban', demand: 'high', competition: 'high', location: 'Church Street, Bangalore', successRate: 88 },
  { business: 'Mobile Accessories Shop', budget: 180000, areaType: 'commercial', demand: 'medium', competition: 'medium', location: 'MG Road, Pune', successRate: 85 },
  { business: 'Mobile Accessories Shop', budget: 250000, areaType: 'semi-urban', demand: 'high', competition: 'low', location: 'KPHB, Hyderabad', successRate: 90 },
  
  // Cloud Kitchen
  { business: 'Cloud Kitchen', budget: 400000, areaType: 'residential', demand: 'high', competition: 'medium', location: 'HSR Layout, Bangalore', successRate: 91 },
  { business: 'Cloud Kitchen', budget: 350000, areaType: 'semi-urban', demand: 'medium', competition: 'low', location: 'Madhapur, Hyderabad', successRate: 88 },
  { business: 'Cloud Kitchen', budget: 500000, areaType: 'urban', demand: 'high', competition: 'high', location: 'Koramangala, Bangalore', successRate: 87 },
  { business: 'Cloud Kitchen', budget: 300000, areaType: 'residential', demand: 'high', competition: 'medium', location: 'Indiranagar, Bangalore', successRate: 89 },
  { business: 'Cloud Kitchen', budget: 450000, areaType: 'commercial', demand: 'high', competition: 'high', location: 'Bandra, Mumbai', successRate: 85 },
  
  // Fashion Boutique
  { business: 'Fashion Boutique', budget: 350000, areaType: 'commercial', demand: 'high', competition: 'high', location: 'Linking Road, Mumbai', successRate: 86 },
  { business: 'Fashion Boutique', budget: 300000, areaType: 'urban', demand: 'medium', competition: 'medium', location: ' Brigade Road, Bangalore', successRate: 88 },
  { business: 'Fashion Boutique', budget: 450000, areaType: 'commercial', demand: 'high', competition: 'high', location: 'Connaught Place, Delhi', successRate: 84 },
  { business: 'Fashion Boutique', budget: 250000, areaType: 'semi-urban', demand: 'medium', competition: 'low', location: 'Jubilee Hills, Hyderabad', successRate: 90 },
  { business: 'Fashion Boutique', budget: 400000, areaType: 'urban', demand: 'high', competition: 'medium', location: 'T Nagar, Chennai', successRate: 89 },
  
  // Software Development
  { business: 'Software Development', budget: 500000, areaType: 'urban', demand: 'high', competition: 'high', location: 'Silicon Valley, Bangalore', successRate: 92 },
  { business: 'Software Development', budget: 400000, areaType: 'commercial', demand: 'high', competition: 'medium', location: 'Cyber City, Gurgaon', successRate: 90 },
  { business: 'Software Development', budget: 600000, areaType: 'urban', demand: 'high', competition: 'high', location: 'HITEC City, Hyderabad', successRate: 88 },
  { business: 'Software Development', budget: 450000, areaType: 'semi-urban', demand: 'medium', competition: 'low', location: 'Magarpatta, Pune', successRate: 87 },
  { business: 'Software Development', budget: 550000, areaType: 'commercial', demand: 'high', competition: 'medium', location: 'Andheri, Mumbai', successRate: 89 }
];

// Convert categorical values to numeric for KNN
const convertToNumeric = (value, type) => {
  const conversions = {
    areaType: { 'urban': 5, 'commercial': 4, 'semi-urban': 3, 'residential': 2, 'industrial': 1, 'rural': 0 },
    demand: { 'high': 2, 'medium': 1, 'low': 0 },
    competition: { 'high': 2, 'medium': 1, 'low': 0 }
  };
  
  return conversions[type][value] || 0;
};

// Normalize budget to 0-1 range
const normalizeBudget = (budget) => {
  const minBudget = 150000;
  const maxBudget = 600000;
  return (budget - minBudget) / (maxBudget - minBudget);
};

// Calculate Euclidean distance between two data points
const calculateDistance = (point1, point2) => {
  const budgetDiff = normalizeBudget(point1.budget) - normalizeBudget(point2.budget);
  const areaTypeDiff = convertToNumeric(point1.areaType, 'areaType') - convertToNumeric(point2.areaType, 'areaType');
  const demandDiff = convertToNumeric(point1.demand, 'demand') - convertToNumeric(point2.demand, 'demand');
  const competitionDiff = convertToNumeric(point1.competition, 'competition') - convertToNumeric(point2.competition, 'competition');
  
  return Math.sqrt(
    Math.pow(budgetDiff, 2) +
    Math.pow(areaTypeDiff, 2) +
    Math.pow(demandDiff, 2) +
    Math.pow(competitionDiff, 2)
  );
};

// KNN Algorithm to find best locations
const knnLocationRecommendation = (business, budget, areaType, demand, competition, k = 5) => {
  const queryPoint = { business, budget, areaType, demand, competition };
  
  // Calculate distances to all training data points
  const distances = locationTrainingData.map(data => ({
    data,
    distance: calculateDistance(queryPoint, data)
  }));
  
  // Sort by distance and get k nearest neighbors
  const nearestNeighbors = distances
    .sort((a, b) => a.distance - b.distance)
    .slice(0, k);
  
  // Return the nearest neighbors with their data
  return nearestNeighbors.map(neighbor => ({
    location: neighbor.data.location,
    successRate: neighbor.data.successRate,
    distance: neighbor.distance,
    matchPercentage: Math.max(0, Math.round((1 - neighbor.distance) * 100))
  }));
};

// Auto-fill data for different score scenarios
const autoFillData = {
  good: {
    fullName: 'John Smith',
    age: 32,
    gender: 'male',
    mobileNumber: '9876543210',
    email: 'john.smith@example.com',
    qualification: 'master',
    degree: 'Master of Business Administration',
    certifications: 'PMP, Six Sigma, Digital Marketing Certification',
    technicalSkills: 'Advanced Excel, Data Analysis, Python programming, Cloud computing',
    businessSkills: 'Strategic planning, Financial management, Team leadership, Negotiation',
    digitalSkills: 'Social media marketing, SEO, Google Analytics, E-commerce platforms',
    industryKnowledge: '10 years in retail and e-commerce industry',
    experienceType: 'experienced',
    yearsOfExperience: 8,
    previousJob: 'Regional Manager at leading retail chain, managed 50+ employees',
    businessCategory: 'retail',
    preferredIndustry: 'E-commerce and Retail',
    locationPreference: 'urban'
  },
  moderate: {
    fullName: 'Jane Doe',
    age: 26,
    gender: 'female',
    mobileNumber: '9876543211',
    email: 'jane.doe@example.com',
    qualification: 'bachelor',
    degree: 'Bachelor of Commerce',
    certifications: 'Basic Digital Marketing',
    technicalSkills: 'Microsoft Office, Basic Excel',
    businessSkills: 'Customer service, Basic accounting, Sales',
    digitalSkills: 'Facebook, Instagram, WhatsApp for business',
    industryKnowledge: '2 years in customer service role',
    experienceType: 'experienced',
    yearsOfExperience: 2,
    previousJob: 'Customer Service Executive',
    businessCategory: 'services',
    preferredIndustry: 'Service Industry',
    locationPreference: 'semi-urban'
  },
  low: {
    fullName: 'Alex Johnson',
    age: 22,
    gender: 'male',
    mobileNumber: '9876543212',
    email: 'alex.johnson@example.com',
    qualification: 'high-school',
    degree: 'High School Diploma',
    certifications: '',
    technicalSkills: '',
    businessSkills: '',
    digitalSkills: 'Basic social media usage',
    industryKnowledge: '',
    experienceType: 'fresher',
    yearsOfExperience: 0,
    previousJob: '',
    businessCategory: '',
    preferredIndustry: '',
    locationPreference: 'urban'
  }
};

// Load user name from localStorage
const loadUserName = () => {
  const userName = localStorage.getItem('userName');
  if (userName && userNameDisplay) {
    userNameDisplay.textContent = userName;
  }
};

// Initialize on page load
loadUserName();

// Budget slider functionality
budgetSlider?.addEventListener('input', (event) => {
  const value = parseInt(event.target.value);
  sliderValue.textContent = `₹${value.toLocaleString()}`;
  
  // Auto-fill min and max budget based on slider
  const minBudgetInput = document.getElementById('min-budget');
  const maxBudgetInput = document.getElementById('max-budget');
  
  if (minBudgetInput && maxBudgetInput) {
    minBudgetInput.value = Math.round(value * 0.8);
    maxBudgetInput.value = Math.round(value * 1.2);
  }
  
  // Update budget health indicator
  updateBudgetHealth(value);
});

// Budget health validation
const updateBudgetHealth = (budget) => {
  if (!budgetHealth) return;
  
  const business = selectedBusinessName.textContent;
  const minRequiredBudget = getMinimumBudgetForBusiness(business);
  
  budgetHealth.classList.remove('healthy', 'warning', 'critical');
  
  if (budget >= minRequiredBudget * 1.5) {
    budgetHealth.classList.add('healthy');
    budgetHealth.querySelector('.health-icon').textContent = '✅';
    budgetHealth.querySelector('.health-text').textContent = `Excellent! Your budget of ₹${budget.toLocaleString()} is well above the minimum requirement of ₹${minRequiredBudget.toLocaleString()} for ${business}.`;
  } else if (budget >= minRequiredBudget) {
    budgetHealth.classList.add('warning');
    budgetHealth.querySelector('.health-icon').textContent = '⚠️';
    budgetHealth.querySelector('.health-text').textContent = `Your budget of ₹${budget.toLocaleString()} meets the minimum requirement of ₹${minRequiredBudget.toLocaleString()} for ${business}, but consider adding a buffer for unexpected costs.`;
  } else {
    budgetHealth.classList.add('critical');
    budgetHealth.querySelector('.health-icon').textContent = '❌';
    budgetHealth.querySelector('.health-text').textContent = `Your budget of ₹${budget.toLocaleString()} is below the recommended minimum of ₹${minRequiredBudget.toLocaleString()} for ${business}. Consider increasing your investment or exploring lower-cost alternatives.`;
  }
};

// Get minimum budget requirement for business type
const getMinimumBudgetForBusiness = (business) => {
  const minBudgets = {
    'Digital Marketing Agency': 250000,
    'Organic Grocery Store': 300000,
    'Mobile Accessories Shop': 200000,
    'Cloud Kitchen': 400000,
    'Fashion Boutique': 350000,
    'Software Development': 500000
  };
  return minBudgets[business] || 300000;
};

// Mobile toast notification
const showToast = (message, type = 'success') => {
  if (!mobileToast) return;
  
  mobileToast.textContent = message;
  mobileToast.className = 'mobile-toast show';
  
  if (type === 'success') {
    mobileToast.classList.add('success');
  } else if (type === 'warning') {
    mobileToast.classList.add('warning');
  } else if (type === 'error') {
    mobileToast.classList.add('error');
  }
  
  setTimeout(() => {
    mobileToast.classList.remove('show');
  }, 3000);
};

// Rule-based AI for investment planning
const ruleBasedBudgetBreakdown = (business, minBudget, maxBudget) => {
  const budget = (minBudget + maxBudget) / 2;
  
  const costRules = {
    'Digital Marketing Agency': {
      registration: 0.08,
      equipment: 0.30,
      marketing: 0.22,
      officeSetup: 0.20,
      softwareLicenses: 0.05,
      emergencyReserve: 0.15
    },
    'Organic Grocery Store': {
      registration: 0.10,
      equipment: 0.25,
      marketing: 0.15,
      officeSetup: 0.30,
      initialInventory: 0.05,
      emergencyReserve: 0.15
    },
    'Mobile Accessories Shop': {
      registration: 0.08,
      equipment: 0.35,
      marketing: 0.18,
      officeSetup: 0.20,
      initialStock: 0.05,
      emergencyReserve: 0.14
    },
    'Cloud Kitchen': {
      registration: 0.12,
      equipment: 0.30,
      marketing: 0.22,
      officeSetup: 0.18,
      kitchenSetup: 0.05,
      emergencyReserve: 0.13
    },
    'Fashion Boutique': {
      registration: 0.08,
      equipment: 0.25,
      marketing: 0.22,
      officeSetup: 0.25,
      initialInventory: 0.08,
      emergencyReserve: 0.12
    },
    'Software Development': {
      registration: 0.06,
      equipment: 0.25,
      marketing: 0.25,
      officeSetup: 0.25,
      softwareLicenses: 0.05,
      emergencyReserve: 0.14
    },
    'default': {
      registration: 0.08,
      equipment: 0.28,
      marketing: 0.20,
      officeSetup: 0.25,
      miscellaneous: 0.04,
      emergencyReserve: 0.15
    }
  };
  
  const rules = costRules[business] || costRules['default'];
  
  let breakdown = {
    registration: Math.round(budget * rules.registration),
    equipment: Math.round(budget * rules.equipment),
    marketing: Math.round(budget * rules.marketing),
    officeSetup: Math.round(budget * rules.officeSetup),
    emergencyReserve: Math.round(budget * rules.emergencyReserve),
    total: budget
  };
  
  // Add business-specific categories
  if (rules.softwareLicenses) {
    breakdown.softwareLicenses = Math.round(budget * rules.softwareLicenses);
  }
  if (rules.initialInventory) {
    breakdown.initialInventory = Math.round(budget * rules.initialInventory);
  }
  if (rules.initialStock) {
    breakdown.initialStock = Math.round(budget * rules.initialStock);
  }
  if (rules.kitchenSetup) {
    breakdown.kitchenSetup = Math.round(budget * rules.kitchenSetup);
  }
  if (rules.miscellaneous) {
    breakdown.miscellaneous = Math.round(budget * rules.miscellaneous);
  }
  
  return breakdown;
};

// Regression ML Model Simulation
const regressionMLPrediction = (business, budget) => {
  const modelCoefficients = {
    'Digital Marketing Agency': {
      monthlyExpenseBase: 35000,
      monthlyRevenueBase: 65000,
      breakEvenMonths: 8,
      growthRate: 0.12
    },
    'Organic Grocery Store': {
      monthlyExpenseBase: 45000,
      monthlyRevenueBase: 70000,
      breakEvenMonths: 10,
      growthRate: 0.08
    },
    'Mobile Accessories Shop': {
      monthlyExpenseBase: 30000,
      monthlyRevenueBase: 55000,
      breakEvenMonths: 7,
      growthRate: 0.15
    },
    'Cloud Kitchen': {
      monthlyExpenseBase: 50000,
      monthlyRevenueBase: 80000,
      breakEvenMonths: 9,
      growthRate: 0.10
    },
    'Fashion Boutique': {
      monthlyExpenseBase: 40000,
      monthlyRevenueBase: 60000,
      breakEvenMonths: 11,
      growthRate: 0.09
    },
    'Software Development': {
      monthlyExpenseBase: 55000,
      monthlyRevenueBase: 90000,
      breakEvenMonths: 12,
      growthRate: 0.14
    },
    'default': {
      monthlyExpenseBase: 40000,
      monthlyRevenueBase: 65000,
      breakEvenMonths: 9,
      growthRate: 0.11
    }
  };
  
  const model = modelCoefficients[business] || modelCoefficients['default'];
  const budgetFactor = Math.log(budget / 100000 + 1);
  
  const monthlyExpenses = Math.round(model.monthlyExpenseBase * budgetFactor * (0.9 + Math.random() * 0.2));
  const monthlyRevenue = Math.round(model.monthlyRevenueBase * budgetFactor * (0.85 + Math.random() * 0.3));
  const breakEvenMonths = Math.round(model.breakEvenMonths * (0.8 + Math.random() * 0.4));
  
  return {
    monthlyExpenses,
    monthlyRevenue,
    breakEvenMonths,
    profitMargin: ((monthlyRevenue - monthlyExpenses) / monthlyRevenue * 100).toFixed(1)
  };
};

// Recommendation Engine
const recommendationEngine = (business, budget, predictions) => {
  const recommendations = [];
  
  if (budget < 200000) {
    recommendations.push({
      type: 'warning',
      message: 'Your budget is on the lower side. Consider starting with a lean business model.'
    });
  } else if (budget > 1000000) {
    recommendations.push({
      type: 'success',
      message: 'Excellent budget capacity! You can consider premium equipment and marketing.'
    });
  }
  
  if (predictions.profitMargin < 15) {
    recommendations.push({
      type: 'warning',
      message: 'Profit margin is tight. Focus on cost optimization and premium pricing.'
    });
  } else if (predictions.profitMargin > 35) {
    recommendations.push({
      type: 'success',
      message: 'Strong profit potential! Consider reinvestment strategies for growth.'
    });
  }
  
  if (predictions.breakEvenMonths > 12) {
    recommendations.push({
      type: 'warning',
      message: 'Long break-even period. Ensure adequate working capital reserves.'
    });
  } else if (predictions.breakEvenMonths < 6) {
    recommendations.push({
      type: 'success',
      message: 'Quick break-even expected! Great for rapid ROI.'
    });
  }
  
  return recommendations;
};

// Generative AI Explanation
const generateAIExplanation = (business, budget, breakdown, predictions) => {
  const totalCost = breakdown.total;
  const monthlyProfit = predictions.monthlyRevenue - predictions.monthlyExpenses;
  const roi = ((monthlyProfit * 12) / totalCost * 100).toFixed(1);
  
  return `Based on your budget analysis for ${business}, you've allocated ₹${totalCost.toLocaleString()} across key categories. Your monthly expenses are estimated at ₹${predictions.monthlyExpenses.toLocaleString()} with projected revenue of ₹${predictions.monthlyRevenue.toLocaleString()}. You can expect to break even in approximately ${predictions.breakEvenMonths} months with an annual ROI of ${roi}%. The emergency reserve of ₹${breakdown.emergencyReserve.toLocaleString()} provides a safety net for unexpected challenges.`;
};

// Display budget results
const displayBudgetResults = (business, minBudget, maxBudget) => {
  const breakdown = ruleBasedBudgetBreakdown(business, minBudget, maxBudget);
  const predictions = regressionMLPrediction(business, breakdown.total);
  const explanation = generateAIExplanation(business, breakdown.total, breakdown, predictions);
  
  // Update breakdown list with dynamic categories
  const breakdownList = document.getElementById('breakdown-list');
  let breakdownHTML = `
    <div class="breakdown-item">
      <span class="breakdown-category">Registration & Licenses</span>
      <span class="breakdown-cost">₹${breakdown.registration.toLocaleString()}</span>
    </div>
    <div class="breakdown-item">
      <span class="breakdown-category">Equipment & Tools</span>
      <span class="breakdown-cost">₹${breakdown.equipment.toLocaleString()}</span>
    </div>
    <div class="breakdown-item">
      <span class="breakdown-category">Marketing & Promotion</span>
      <span class="breakdown-cost">₹${breakdown.marketing.toLocaleString()}</span>
    </div>
    <div class="breakdown-item">
      <span class="breakdown-category">Office Setup</span>
      <span class="breakdown-cost">₹${breakdown.officeSetup.toLocaleString()}</span>
    </div>
  `;
  
  // Add business-specific categories
  if (breakdown.softwareLicenses) {
    breakdownHTML += `
      <div class="breakdown-item">
        <span class="breakdown-category">Software Licenses</span>
        <span class="breakdown-cost">₹${breakdown.softwareLicenses.toLocaleString()}</span>
      </div>
    `;
  }
  if (breakdown.initialInventory) {
    breakdownHTML += `
      <div class="breakdown-item">
        <span class="breakdown-category">Initial Inventory</span>
        <span class="breakdown-cost">₹${breakdown.initialInventory.toLocaleString()}</span>
      </div>
    `;
  }
  if (breakdown.initialStock) {
    breakdownHTML += `
      <div class="breakdown-item">
        <span class="breakdown-category">Initial Stock</span>
        <span class="breakdown-cost">₹${breakdown.initialStock.toLocaleString()}</span>
      </div>
    `;
  }
  if (breakdown.kitchenSetup) {
    breakdownHTML += `
      <div class="breakdown-item">
        <span class="breakdown-category">Kitchen Setup</span>
        <span class="breakdown-cost">₹${breakdown.kitchenSetup.toLocaleString()}</span>
      </div>
    `;
  }
  if (breakdown.miscellaneous) {
    breakdownHTML += `
      <div class="breakdown-item">
        <span class="breakdown-category">Miscellaneous</span>
        <span class="breakdown-cost">₹${breakdown.miscellaneous.toLocaleString()}</span>
      </div>
    `;
  }
  
  breakdownHTML += `
    <div class="breakdown-item">
      <span class="breakdown-category">Emergency Reserve</span>
      <span class="breakdown-cost">₹${breakdown.emergencyReserve.toLocaleString()}</span>
    </div>
  `;
  
  breakdownList.innerHTML = breakdownHTML;
  
  document.getElementById('total-cost').textContent = `₹${breakdown.total.toLocaleString()}`;
  
  // Update AI insights
  const loanNeeded = Math.max(0, breakdown.total - maxBudget);
  document.getElementById('loan-amount').textContent = loanNeeded > 0 ? `₹${loanNeeded.toLocaleString()}` : 'Not Required';
  document.getElementById('monthly-expenses').textContent = `₹${predictions.monthlyExpenses.toLocaleString()}`;
  document.getElementById('monthly-revenue').textContent = `₹${predictions.monthlyRevenue.toLocaleString()}`;
  document.getElementById('break-even').textContent = `${predictions.breakEvenMonths} months`;
  document.getElementById('remaining-budget').textContent = `₹${(maxBudget - breakdown.total).toLocaleString()}`;
  
  // Update AI explanation
  document.getElementById('ai-explanation').textContent = explanation;
  
  // Update tracker
  if (budgetTrackerFill && budgetTrackerPercentage) {
    budgetTrackerFill.style.width = '100%';
    budgetTrackerPercentage.textContent = '100%';
  }
  
  // Show results
  budgetResults.classList.remove('hidden');
  
  showToast('Budget analysis completed successfully!', 'success');
  
  budgetResults.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

// Budget form handler
budgetForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  
  const minBudget = parseInt(document.getElementById('min-budget').value);
  const maxBudget = parseInt(document.getElementById('max-budget').value);
  const business = selectedBusinessName.textContent;
  
  if (!minBudget || !maxBudget) {
    showToast('Please enter both minimum and maximum budget', 'error');
    return;
  }
  
  if (minBudget > maxBudget) {
    showToast('Minimum budget cannot exceed maximum budget', 'error');
    return;
  }
  
  if (minBudget < 50000) {
    showToast('Minimum budget should be at least ₹50,000', 'warning');
    return;
  }
  
  showToast('Analyzing your budget with AI...', 'success');
  
  setTimeout(() => {
    displayBudgetResults(business, minBudget, maxBudget);
  }, 800);
});

// Continue to Location button handler
continueLocationBtn?.addEventListener('click', () => {
  if (selectedBusiness) {
    // Get budget from slider or form
    const budget = parseInt(budgetSlider?.value) || 350000;
    selectedBudget = budget;
    
    // Update location section with business info
    if (locationBusinessName) {
      locationBusinessName.textContent = selectedBusiness;
    }
    if (locationBusinessBudget) {
      locationBusinessBudget.textContent = `Budget: ₹${budget.toLocaleString()}`;
    }
    
    // Hide budget results and show location section
    budgetResults.classList.add('hidden');
    budgetForm.parentElement.classList.add('hidden');
    budgetSection.classList.add('hidden');
    locationSection.classList.remove('hidden');
    
    // Update app bar title
    document.querySelector('.appbar-title').textContent = '📍 Location Recommendation';
    
    // Update bottom navigation
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    document.querySelectorAll('.nav-item')[2].classList.add('active');
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    showToast('Proceeding to Location Recommendation', 'success');
  }
});

// Location form handler
locationForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  
  const areaType = document.getElementById('area-type').value;
  const demandLevel = document.getElementById('demand-level').value;
  const competitionLevel = document.getElementById('competition-level').value;
  
  if (!areaType || !demandLevel || !competitionLevel) {
    showToast('Please select all location preferences', 'error');
    return;
  }
  
  if (!selectedBusiness || !selectedBudget) {
    showToast('Business and budget information required', 'error');
    return;
  }
  
  showToast('Running KNN analysis to find best locations...', 'success');
  
  setTimeout(() => {
    displayLocationResults(selectedBusiness, selectedBudget, areaType, demandLevel, competitionLevel);
  }, 1000);
});

// Display location results
const displayLocationResults = (business, budget, areaType, demand, competition) => {
  const recommendations = knnLocationRecommendation(business, budget, areaType, demand, competition, 5);
  
  // Display KNN process steps
  const knnSteps = document.getElementById('knn-steps');
  knnSteps.innerHTML = `
    <div class="knn-step">
      <span class="knn-step-icon">🎯</span>
      <div class="knn-step-content">
        <div class="knn-step-title">Input Analysis</div>
        <div class="knn-step-description">Business: ${business}, Budget: ₹${budget.toLocaleString()}, Area: ${areaType}, Demand: ${demand}, Competition: ${competition}</div>
      </div>
    </div>
    <div class="knn-step">
      <span class="knn-step-icon">🔄</span>
      <div class="knn-step-content">
        <div class="knn-step-title">Numeric Conversion</div>
        <div class="knn-step-description">Converted categorical values to numeric: Area=${convertToNumeric(areaType, 'areaType')}, Demand=${convertToNumeric(demand, 'demand')}, Competition=${convertToNumeric(competition, 'competition')}</div>
      </div>
    </div>
    <div class="knn-step">
      <span class="knn-step-icon">📊</span>
      <div class="knn-step-content">
        <div class="knn-step-title">KNN Model Processing</div>
        <div class="knn-step-description">Comparing with ${locationTrainingData.length} similar businesses in training dataset using Euclidean distance</div>
      </div>
    </div>
    <div class="knn-step">
      <span class="knn-step-icon">🔍</span>
      <div class="knn-step-content">
        <div class="knn-step-title">Finding Nearest Matches</div>
        <div class="knn-step-description">Identified top 5 nearest neighbors with similar business characteristics</div>
      </div>
    </div>
    <div class="knn-step">
      <span class="knn-step-icon">🏆</span>
      <div class="knn-step-content">
        <div class="knn-step-title">Location Recommendation</div>
        <div class="knn-step-description">Ranked locations by similarity and success rate for optimal recommendation</div>
      </div>
    </div>
  `;
  
  // Display top 3 location recommendations
  const locationRecommendations = document.getElementById('location-recommendations');
  const top3 = recommendations.slice(0, 3);
  
  locationRecommendations.innerHTML = top3.map((rec, index) => `
    <div class="location-card ${index === 0 ? 'selected' : ''}" data-location="${rec.location}">
      <span class="location-rank">${index + 1}</span>
      <div class="location-info">
        <div class="location-name">${rec.location}</div>
        <div class="location-type">Success Rate: ${rec.successRate}%</div>
      </div>
      <div class="location-match">${rec.matchPercentage}% Match</div>
    </div>
  `).join('');
  
  // Display location details
  const locationDetails = document.getElementById('location-details');
  const bestMatch = top3[0];
  
  locationDetails.innerHTML = `
    <div class="detail-item">
      <span class="detail-label">Recommended Location</span>
      <span class="detail-value">${bestMatch.location}</span>
    </div>
    <div class="detail-item">
      <span class="detail-label">Match Percentage</span>
      <span class="detail-value">${bestMatch.matchPercentage}%</span>
    </div>
    <div class="detail-item">
      <span class="detail-label">Historical Success Rate</span>
      <span class="detail-value">${bestMatch.successRate}%</span>
    </div>
    <div class="detail-item">
      <span class="detail-label">KNN Distance Score</span>
      <span class="detail-value">${bestMatch.distance.toFixed(4)}</span>
    </div>
    <div class="detail-item">
      <span class="detail-label">Similar Businesses Found</span>
      <span class="detail-value">${recommendations.length}</span>
    </div>
  `;
  
  // Update AI explanation
  const locationExplanation = document.getElementById('location-explanation');
  locationExplanation.textContent = `Based on KNN analysis, we compared your ${business} with a budget of ₹${budget.toLocaleString()} against ${locationTrainingData.length} similar businesses in our database. The top recommendation is ${bestMatch.location} with a ${bestMatch.matchPercentage}% match and a historical success rate of ${bestMatch.successRate}%. This location best matches your preferences for ${areaType} area with ${demand} demand and ${competition} competition level.`;
  
  // Update tracker
  if (locationTrackerFill && locationTrackerPercentage) {
    locationTrackerFill.style.width = '100%';
    locationTrackerPercentage.textContent = '100%';
  }
  
  // Show results
  locationResults.classList.remove('hidden');
  
  showToast('Location analysis completed successfully!', 'success');
  
  locationResults.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

// Auto-fill button toggle
autoFillBtn?.addEventListener('click', () => {
  autoFillDropdown.classList.toggle('hidden');
});

// Auto-fill option selection
document.querySelectorAll('.auto-fill-option').forEach(option => {
  option.addEventListener('click', () => {
    const level = option.getAttribute('data-level');
    const data = autoFillData[level];
    
    if (data) {
      // Fill the form with the selected data
      document.getElementById('fullName').value = data.fullName || '';
      document.getElementById('age').value = data.age || '';
      document.getElementById('gender').value = data.gender || '';
      document.getElementById('mobileNumber').value = data.mobileNumber || '';
      document.getElementById('email').value = data.email || '';
      document.getElementById('qualification').value = data.qualification || '';
      document.getElementById('degree').value = data.degree || '';
      document.getElementById('certifications').value = data.certifications || '';
      document.getElementById('technicalSkills').value = data.technicalSkills || '';
      document.getElementById('businessSkills').value = data.businessSkills || '';
      document.getElementById('digitalSkills').value = data.digitalSkills || '';
      document.getElementById('industryKnowledge').value = data.industryKnowledge || '';
      document.getElementById('experienceType').value = data.experienceType || '';
      document.getElementById('yearsOfExperience').value = data.yearsOfExperience || '';
      document.getElementById('previousJob').value = data.previousJob || '';
      document.getElementById('businessCategory').value = data.businessCategory || '';
      document.getElementById('preferredIndustry').value = data.preferredIndustry || '';
      document.getElementById('locationPreference').value = data.locationPreference || '';
    }
    
    // Close the dropdown
    autoFillDropdown.classList.add('hidden');
  });
});

// Close dropdown when clicking outside
document.addEventListener('click', (event) => {
  if (!autoFillBtn?.contains(event.target) && !autoFillDropdown?.contains(event.target)) {
    autoFillDropdown?.classList.add('hidden');
  }
});

// AI Analysis Logic (Simulated)
const analyzeProfile = (formData) => {
  // Calculate readiness score based on specific weights
  let educationScore = 0;
  let skillsScore = 0;
  let experienceScore = 0;
  let businessInterestScore = 0;
  let certificationsScore = 0;
  
  // Education contribution (20%)
  const educationScores = {
    'high-school': 12,
    'diploma': 15,
    'bachelor': 18,
    'master': 20,
    'phd': 20,
    'other': 10
  };
  educationScore = educationScores[formData.qualification] || 10;
  
  // Skills contribution (30%)
  let skillFields = 0;
  if (formData.technicalSkills && formData.technicalSkills.trim()) skillFields++;
  if (formData.businessSkills && formData.businessSkills.trim()) skillFields++;
  if (formData.digitalSkills && formData.digitalSkills.trim()) skillFields++;
  if (formData.industryKnowledge && formData.industryKnowledge.trim()) skillFields++;
  skillsScore = Math.min((skillFields / 4) * 30, 30);
  
  // Experience contribution (25%)
  if (formData.experienceType === 'experienced') {
    experienceScore = Math.min(15 + (formData.yearsOfExperience * 2), 25);
  } else {
    experienceScore = 5;
  }
  
  // Business Interest contribution (15%)
  if (formData.businessCategory && formData.businessCategory !== '') {
    businessInterestScore = 15;
  } else {
    businessInterestScore = 5;
  }
  
  // Certifications contribution (10%)
  if (formData.certifications && formData.certifications.trim()) {
    certificationsScore = 10;
  } else {
    certificationsScore = 3;
  }
  
  // Total readiness score
  const readinessScore = Math.round(educationScore + skillsScore + experienceScore + businessInterestScore + certificationsScore);
  
  // Determine experience level
  let experienceLevel = 'Beginner';
  if (formData.experienceType === 'experienced') {
    if (formData.yearsOfExperience >= 10) {
      experienceLevel = 'Advanced';
    } else if (formData.yearsOfExperience >= 3) {
      experienceLevel = 'Intermediate';
    } else {
      experienceLevel = 'Beginner';
    }
  }
  
  // Determine skill strengths
  const skillStrengths = [];
  if (formData.businessSkills && formData.businessSkills.trim()) {
    skillStrengths.push({ name: 'Business Management', level: 'Strong' });
  }
  if (formData.technicalSkills && formData.technicalSkills.trim()) {
    skillStrengths.push({ name: 'Technical Knowledge', level: 'Strong' });
  }
  if (formData.digitalSkills && formData.digitalSkills.trim()) {
    skillStrengths.push({ name: 'Digital Marketing', level: 'Moderate' });
  }
  if (skillStrengths.length === 0) {
    skillStrengths.push({ name: 'General Business', level: 'Developing' });
  }
  
  // Recommended businesses based on profile
  const businessRecommendations = {
    'retail': ['Organic Grocery Store', 'Fashion Boutique', 'Mobile Accessories Shop'],
    'food-beverage': ['Cloud Kitchen', 'Food Truck', 'Cafe & Bakery'],
    'agriculture': ['Organic Farming', 'Dairy Farm', 'Agri-tourism'],
    'it-services': ['Digital Marketing Agency', 'Software Development', 'Tech Support Services'],
    'manufacturing': ['Small Scale Manufacturing', 'Textile Unit', 'Food Processing'],
    'healthcare': ['Pharmacy', 'Wellness Center', 'Home Healthcare'],
    'education': ['Tuition Center', 'Skill Training Institute', 'Online Education Platform'],
    'services': ['Consulting Firm', 'Event Management', 'Travel Agency'],
    'other': ['Digital Marketing Agency', 'Mobile Accessories Shop', 'Organic Grocery Store']
  };
  
  const recommendations = businessRecommendations[formData.businessCategory] || 
    ['Digital Marketing Agency', 'Mobile Accessories Shop', 'Organic Grocery Store'];
  
  // Success probability (correlated with readiness score)
  const successProbability = Math.min(readinessScore + Math.floor(Math.random() * 10), 98);
  
  // Determine score category and message
  let scoreCategory, scoreMessage, scoreEmoji, scoreReason;
  if (readinessScore >= 80) {
    scoreCategory = 'Good';
    scoreEmoji = '✅';
    scoreMessage = 'Ready to Start a Business';
    scoreReason = "Bachelor's or Master's degree, Strong technical/business skills, 2+ years of experience, Relevant certifications, Clear business interest";
  } else if (readinessScore >= 50) {
    scoreCategory = 'Average';
    scoreEmoji = '⚠️';
    scoreMessage = 'Moderately Ready';
    scoreReason = "Diploma or Bachelor's degree, Some useful skills, Fresher or limited experience, Few or no certifications";
  } else {
    scoreCategory = 'Low';
    scoreEmoji = '❌';
    scoreMessage = 'Needs Improvement';
    scoreReason = "Limited education, Few relevant skills, No experience, No certifications, Unclear business interest";
  }
  
  return {
    readinessScore,
    skillStrengths,
    experienceLevel,
    recommendations,
    successProbability,
    scoreCategory,
    scoreMessage,
    scoreEmoji,
    scoreReason
  };
};

// Display results in the UI
const displayResults = (results) => {
  // Update readiness score with category-based styling
  const scoreElement = document.getElementById('readiness-score');
  scoreElement.textContent = `${results.readinessScore}%`;
  
  // Update score label with category message
  const scoreLabel = document.querySelector('.score-label');
  if (scoreLabel) {
    scoreLabel.textContent = `${results.scoreEmoji} ${results.scoreMessage}`;
  }
  
  // Update score reason
  const scoreReasonElement = document.getElementById('score-reason');
  if (scoreReasonElement) {
    scoreReasonElement.textContent = results.scoreReason;
  }
  
  // Update skill strengths
  const skillsList = document.getElementById('skill-strength');
  skillsList.innerHTML = results.skillStrengths.map(skill => `
    <div class="skill-item">
      <span class="skill-name">${skill.name}</span>
      <span class="skill-level">${skill.level}</span>
    </div>
  `).join('');
  
  // Update experience level
  document.getElementById('experience-level').textContent = results.experienceLevel;
  
  // Update recommendations with selection functionality
  const recommendationsList = document.getElementById('recommendations');
  recommendationsList.innerHTML = results.recommendations.map((business, index) => `
    <div class="recommendation-item selectable" data-business="${business}">
      <span class="rank">${index + 1}</span>
      <span class="business-name">${business}</span>
      <span class="select-indicator">✓</span>
    </div>
  `).join('');
  
  // Add click handlers for business selection
  document.querySelectorAll('.recommendation-item.selectable').forEach(item => {
    item.addEventListener('click', () => {
      // Remove selection from all items
      document.querySelectorAll('.recommendation-item').forEach(i => i.classList.remove('selected'));
      // Add selection to clicked item
      item.classList.add('selected');
      // Store selected business
      selectedBusiness = item.getAttribute('data-business');
      // Enable glow button
      if (glowBtn) {
        glowBtn.disabled = false;
      }
    });
  });
  
  // Update success probability
  document.getElementById('success-probability').textContent = `${results.successProbability}%`;
  
  // Update tracker to show completion
  if (trackerFill && trackerPercentage) {
    trackerFill.style.width = '100%';
    trackerPercentage.textContent = '100%';
  }
};

// Form submission handler
profileForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  
  // Collect form data
  const formData = {
    fullName: document.getElementById('fullName').value,
    age: parseInt(document.getElementById('age').value),
    gender: document.getElementById('gender').value,
    mobileNumber: document.getElementById('mobileNumber').value,
    email: document.getElementById('email').value,
    qualification: document.getElementById('qualification').value,
    degree: document.getElementById('degree').value,
    certifications: document.getElementById('certifications').value,
    technicalSkills: document.getElementById('technicalSkills').value,
    businessSkills: document.getElementById('businessSkills').value,
    digitalSkills: document.getElementById('digitalSkills').value,
    industryKnowledge: document.getElementById('industryKnowledge').value,
    experienceType: document.getElementById('experienceType').value,
    yearsOfExperience: parseInt(document.getElementById('yearsOfExperience').value) || 0,
    previousJob: document.getElementById('previousJob').value,
    businessCategory: document.getElementById('businessCategory').value,
    preferredIndustry: document.getElementById('preferredIndustry').value,
    locationPreference: document.getElementById('locationPreference').value
  };
  
  // Analyze profile
  const analysisResults = analyzeProfile(formData);
  
  // Display results
  displayResults(analysisResults);
  
  // Hide form and show results
  profileForm.classList.add('hidden');
  resultsContainer.classList.remove('hidden');
  
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Back button handler
backBtn?.addEventListener('click', () => {
  window.location.replace('index.html');
});

// Reset button handler
resetBtn?.addEventListener('click', () => {
  // Reset form
  profileForm.reset();
  
  // Reset selection
  selectedBusiness = null;
  
  // Reset glow button
  if (glowBtn) {
    glowBtn.disabled = true;
  }
  
  // Reset tracker
  if (trackerFill && trackerPercentage) {
    trackerFill.style.width = '0%';
    trackerPercentage.textContent = '0%';
  }
  
  // Show form and hide results
  profileForm.classList.remove('hidden');
  resultsContainer.classList.add('hidden');
  
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Glow button handler - show budget section
glowBtn?.addEventListener('click', () => {
  if (selectedBusiness) {
    // Store selected business
    localStorage.setItem('selectedBusiness', selectedBusiness);
    
    // Update selected business display in budget section
    if (selectedBusinessName) {
      selectedBusinessName.textContent = selectedBusiness;
    }
    
    // Hide profile results and show budget section
    resultsContainer.classList.add('hidden');
    profileForm.classList.add('hidden');
    budgetSection.classList.remove('hidden');
    
    // Update app bar title
    document.querySelector('.appbar-title').textContent = '💰 Budget Planning';
    
    // Update bottom navigation
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    document.querySelectorAll('.nav-item')[1].classList.add('active');
    
    // Initialize budget health indicator with default slider value
    const defaultBudget = parseInt(budgetSlider?.value) || 350000;
    updateBudgetHealth(defaultBudget);
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    showToast('Proceeding to Budget Planning', 'success');
  }
});

// Navigation items - toggle between sections
const navItems = document.querySelectorAll('.nav-item');
navItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    navItems.forEach(nav => nav.classList.remove('active'));
    item.classList.add('active');
    
    const appbarTitle = document.querySelector('.appbar-title');
    
    if (index === 0) {
      // Profile Analysis
      if (appbarTitle) appbarTitle.textContent = '📊 Profile Analysis';
      budgetSection.classList.add('hidden');
      budgetResults.classList.add('hidden');
      locationSection.classList.add('hidden');
      locationResults.classList.add('hidden');
      if (selectedBusiness) {
        resultsContainer.classList.remove('hidden');
        profileForm.classList.add('hidden');
      } else {
        profileForm.classList.remove('hidden');
        resultsContainer.classList.add('hidden');
      }
    } else if (index === 1) {
      // Budget
      if (selectedBusiness) {
        if (appbarTitle) appbarTitle.textContent = '💰 Budget Planning';
        profileForm.classList.add('hidden');
        resultsContainer.classList.add('hidden');
        locationSection.classList.add('hidden');
        locationResults.classList.add('hidden');
        budgetSection.classList.remove('hidden');
      } else {
        showToast('Please complete profile analysis first', 'warning');
        navItems.forEach(nav => nav.classList.remove('active'));
        navItems[0].classList.add('active');
      }
    } else if (index === 2) {
      // Location
      if (selectedBusiness && selectedBudget) {
        if (appbarTitle) appbarTitle.textContent = '📍 Location Recommendation';
        profileForm.classList.add('hidden');
        resultsContainer.classList.add('hidden');
        budgetSection.classList.add('hidden');
        budgetResults.classList.add('hidden');
        locationSection.classList.remove('hidden');
      } else {
        showToast('Please complete budget planning first', 'warning');
        navItems.forEach(nav => nav.classList.remove('active'));
        navItems[1].classList.add('active');
      }
    } else if (index === 3) {
      // Loss Panel
      showToast('Loss Panel coming soon!', 'success');
    } else if (index === 4) {
      // Report
      showToast('Report generation coming soon!', 'success');
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
