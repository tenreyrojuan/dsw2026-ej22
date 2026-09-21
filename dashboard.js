document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.getElementById('logout');

    logoutButton.addEventListener('click', () => {
        window.location.href = 'login.html';
    });

    const menuBtn = document.getElementById('menu');
    const nav = document.getElementById('sidebar');

    menuBtn.addEventListener('click', () => {
        if (window.innerWidth < 600) {
            nav.classList.toggle('open');
        }
    });
});