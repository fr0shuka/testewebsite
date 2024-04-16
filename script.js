document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.querySelector('.toggle-button');
  
    if (toggleButton) {
      toggleButton.addEventListener('click', () => {
        const navbarLinks = document.querySelector('.navbar-links');
        navbarLinks.classList.toggle('active');
      });
    }
  });