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

let selectedBusiness = null;

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

// Glow button handler - redirect to budget page
glowBtn?.addEventListener('click', () => {
  if (selectedBusiness) {
    // Store selected business for budget page
    localStorage.setItem('selectedBusiness', selectedBusiness);
    // Redirect to budget page (will be created)
    alert(`Proceeding to Budget page for: ${selectedBusiness}`);
    // Uncomment when budget page is created:
    // window.location.href = 'budget.html';
  }
});

// Navigation items (visual only - for future implementation)
const navItems = document.querySelectorAll('.nav-item');
navItems.forEach(item => {
  item.addEventListener('click', () => {
    navItems.forEach(nav => nav.classList.remove('active'));
    item.classList.add('active');
  });
});
