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

            if (name.length>= 15){
                alert('el nombre no debe tener mas de 15 caracteres');
                nameInput.value = '';
                nameInput.focus();
                return;
            }
            if (name === ''){
                alert('ingrese el nombre de la especialidad.');
                nameInput.focus();
                return;
            }
            
            if (description.length>= 100){
                alert('la descripcion no debe tener mas de 100 caracteres');
                descriptionInput.value = '';
                descriptionInput.focus();
                return;
            }

            const newSpecialty = {
                id: crypto.randomUUID(),
                name: name,
                description:description,
                status: status
            };

            console.log(newSpecialty);

            const storedSpecialties = JSON.parse(localStorage.getItem('specialties')) || [];
            storedSpecialties.push(newSpecialty);
            localStorage.setItem('specialties', JSON.stringify(storedSpecialties));

            alert('especialidad guardada');
            window.location.href = 'specialties_list.html';
        });
    }
});