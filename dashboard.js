document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.getElementById('logout');

  logoutButton.addEventListener('click', () => {
    window.location.href = 'login.html';

  });

  const menuBtn = document.getElementById('menu');
  const nav = document.getElementById('sidebar');

  menuBtn.addEventListener('click', () => {
    nav.classList.toggle('open');
  });

  const navButton = document.getElementById('menu-button');
  const navbar = document.getElementById('sidebar');

  navButton.addEventListener('click',() => {
    navbar.classList.toggle('open');
  });
});