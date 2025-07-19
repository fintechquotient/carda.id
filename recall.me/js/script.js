// JavaScript extracted from original file
document.addEventListener("DOMContentLoaded", function() {
  const tags = document.querySelectorAll('.tag');
  tags.forEach(tag => {
    tag.addEventListener('click', () => tag.classList.toggle('selected'));
  });

  const phoneInput = document.getElementById('phoneInput');
  const progressIndicator = document.getElementById('progressIndicator');
  const digitCounter = document.getElementById('digitCounter');

  phoneInput.addEventListener('input', () => {
    const value = phoneInput.value.replace(/\D/g, '');
    const length = value.length;
    const percent = Math.max(10, Math.min(100, (length / 10) * 100));
    progressIndicator.style.width = percent + '%';
    if (length === 0) {
      progressIndicator.style.backgroundColor = '#dc3545';
    } else if (length < 10) {
      progressIndicator.style.backgroundColor = '#ffc107';
    } else {
      progressIndicator.style.backgroundColor = '#28a745';
    }
    digitCounter.textContent = length < 10 ? \`\${10 - length} to go\` : "All done! ✅";
  });

  window.submitForm = function() {
    const form = document.forms['contactForm'];
    const fullname = form.fullname.value.trim();
    const phone = form.phone.value;

    if (!fullname || !/^\d{10}$/.test(phone)) {
      alert("Please fill the form correctly.");
      return;
    }

    alert("Form is valid. Proceed to send to Google Sheets or next step.");
  };
});
