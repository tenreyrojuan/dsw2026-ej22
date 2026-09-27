document.addEventListener('DOMContentLoaded', () => {
    const specialtyForm = document.getElementById('specialty-form');
    const cancelBtn = document.getElementById('cancel-btn');

    if (cancelBtn){
        cancelBtn.addEventListener('click',() => {
            window.location.href = 'specialties_list.html';
        });
    }

    if (specialtyForm){
        specialtyForm.addEventListener('submit', (event)=>{
            event.preventDefault();

            const nameInput = document.getElementById('specialty-name');
            const descriptionInput = document.getElementById('specialty-description');
            const statusInput = document.getElementById('specialty-status');
            const name = nameInput.value.trim();
            const description = descriptionInput.value.trim();
            const status = statusInput.value;

            if (name === ''){
                alert('ingrese el nombre de la especialidad.');
                nameInput.focus();
                return;
            }

            const newSpecialty {
                name: name,
                description:description,
                status: status
            };

            const storedSpecialties = JSON.parse(localStorage.getItem('specialties')) || [];
            storedSpecialties.push(newSpecialty);
            localStorage.setItem('specialties', JSON.stringify(storedSpecialties));

            alert('especialidad guardada');
            window.location.href = 'specialties_list.html';
        });
    }
});