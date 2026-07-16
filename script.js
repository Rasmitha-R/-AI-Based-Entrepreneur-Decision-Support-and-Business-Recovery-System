const passwordInput = document.getElementById('password');
const passwordToggle = document.querySelector('.password-toggle');
const form = document.querySelector('.login-form');
const status = document.getElementById('form-status');
const roleOptions = document.querySelectorAll('.role-option');
const credentialsPanel = document.querySelector('.credentials-panel');
const loginCard = document.getElementById('login-card');
const emailInput = document.getElementById('email');
const fullNameInput = document.getElementById('fullName');

const showStatus = (message, isSuccess = false) => {
  status.textContent = message;
  status.classList.toggle('status-success', isSuccess);
};

const preselectEntrepreneur = () => {
  const entrepreneurOption = document.querySelector('.role-option input[value="entrepreneur"]')?.closest('.role-option');
  const entrepreneurInput = document.querySelector('input[name="role"][value="entrepreneur"]');

  roleOptions.forEach((item) => item.classList.remove('active'));
  entrepreneurOption?.classList.add('active');
  entrepreneurInput.checked = true;
  credentialsPanel?.classList.remove('hidden');
};

passwordToggle?.addEventListener('click', () => {
  const isHidden = passwordInput.type === 'password';
  passwordInput.type = isHidden ? 'text' : 'password';
  passwordToggle.querySelector('span').textContent = isHidden ? 'Hide' : 'Show';
  passwordToggle.setAttribute('aria-label', isHidden ? 'Hide password' : 'Show password');
});

roleOptions.forEach((option) => {
  option.addEventListener('click', () => {
    roleOptions.forEach((item) => item.classList.remove('active'));
    option.classList.add('active');
    option.querySelector('input').checked = true;
    credentialsPanel?.classList.remove('hidden');
  });
});

preselectEntrepreneur();

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const fullName = fullNameInput.value.trim();
  const email = document.getElementById('email').value.trim();
  const password = passwordInput.value;
  const role = document.querySelector('input[name="role"]:checked')?.value;

  if (!role) {
    showStatus('Please choose a role to continue.');
    return;
  }

  if (!fullName || !email || !password) {
    showStatus('Please enter your name, email and password.');
    return;
  }

  const demoCredentialsMatch =
    (role === 'entrepreneur' && email === 'entrepreneur@aibusiness.com' && password === 'Entrepreneur@123') ||
    (role === 'admin' && email === 'admin@aibusiness.com' && password === 'Admin@123');

  if (demoCredentialsMatch || (email && password)) {
    if (role === 'entrepreneur') {
      // Store user name in localStorage
      localStorage.setItem('userName', fullName);
      // Immediate redirect to profile analysis page
      window.location.replace('profile-analysis.html');
    } else {
      showStatus('Logged in successfully ✓', true);
    }
    return;
  }

  showStatus('Please enter your email and password.');
});
