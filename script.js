const passwordInput = document.getElementById('password');
const passwordToggle = document.querySelector('.password-toggle');
const form = document.querySelector('.login-form');
const status = document.getElementById('form-status');
const roleOptions = document.querySelectorAll('.role-option');
const credentialsPanel = document.querySelector('.credentials-panel');

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

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const email = document.getElementById('email').value.trim();
  const password = passwordInput.value;
  const role = document.querySelector('input[name="role"]:checked')?.value;

  if (!role) {
    status.textContent = 'Please choose a role to continue.';
    return;
  }

  if (!email || !password) {
    status.textContent = 'Please enter your email and password.';
    return;
  }

  status.textContent = `Secure access request prepared for ${role}.`;
});
