document.addEventListener('DOMContentLoaded', async () => {
  const logoutButton = document.getElementById('logout');

  logoutButton.addEventListener('click', () => {
    window.location.href = 'login.html';
  });

const tbody = document.getElementById('specialities-table-body');

let specialties = [];
specialties = JSON.parse(localStorage.getItem('specialties')) || [];

specialties.forEach(specialty => {
  const row = specialtyRender(specialty);
  tbody.appendChild(row);
});

function specialtyRender(specialty) {
  let name = specialty.name;
  const iconRoute = getSpecialtyIconRoute(name);

  const row = document.createElement('tr');
  
  const nameCell = document.createElement('td');
  nameCell.classList.add('nameCell');

  const specialtyImg = makeSpecialtyImage(iconRoute);
  specialtyImg.classList.add('specialtyImg');

  const descriptionCell = document.createElement('td');
  descriptionCell.classList.add('descriptionCell');

  const stateCell = document.createElement('td');
  const stateDiv = document.createElement('div');

  stateDiv.classList.add('statusCell');
  stateDiv.append(specialty.status);

  stateCell.append(stateDiv);

  const actionDiv = document.createElement('div');
  actionDiv.classList.add('actionButtonCell');

  const [editButton,deleteButton] = makeActionButtons();
  editButton.classList.add('button')
  deleteButton.classList.add('button')

  const actionCell = document.createElement('td');

  nameCell.append(specialtyImg,specialty.name);


  descriptionCell.textContent = specialty.description;
  actionDiv.append(editButton,deleteButton);
  
  actionCell.appendChild(actionDiv);

  row.appendChild(nameCell);
  row.appendChild(descriptionCell);
  row.appendChild(stateCell);
  row.appendChild(actionCell);

  return row;
}

function getSpecialtyIconRoute(specialtyName) {
  const name = specialtyName.toLowerCase();

  switch(name){
    case "cardiologia":
      return "images/beating_heart.png";
    case "dermatologia":
      return "images/hair_follicle.png";
    case "neurologia":
      return "images/brain.png";
    case "pediatry":
      return "images/baby_bottle.png";
    default:
      return "Invalid Specialty";
  }
}

function makeSpecialtyImage(iconRoute) {
  const img = document.createElement('img');
  img.src = iconRoute;
  img.width = 17,5;
  img.height = 17,5;

  return img;
}

function makeActionButtons(){
  const editButton = document.createElement('button');
  editButton.id = 'editButton';

  const editImg = document.createElement('img'); 
  editImg.src = 'images/pen.png';
  editImg.height = 15;
  editImg.width = 15;
  editButton.appendChild(editImg);

  const deleteButton = document.createElement('button');
  deleteButton.id = 'deleteButton';

  const deleteImg = document.createElement('img'); 
  deleteImg.src = 'images/bin.png';
  deleteImg.height = 15;
  deleteImg.width = 15;
  deleteButton.appendChild(deleteImg);

  return [editButton,deleteButton];
}

const searchButton = document.getElementById('search-button');
const searchBar = document.getElementById('search-bar');

searchButton.addEventListener('click', (event) => {
  event.preventDefault();
  showSpecialtyMatches();
})

searchBar.addEventListener('keypress',(event) =>{
    if(event.key === 'Enter'){
      event.preventDefault();
      showSpecialtyMatches();
    }

})

function showSpecialtyMatches(){
  tbody.innerHTML = '';
  const query = searchBar.value.toLowerCase();

  specialties.forEach(specialty => {
    if(query === ''){
      const row = specialtyRender(specialty);
      tbody.appendChild(row);
    }

    let name = specialty.name.toLowerCase();
    if(name.includes(query)){
      const row = specialtyRender(specialty);
      tbody.appendChild(row);
    }
  })

/*
  tbody.querySelectorAll('tr').forEach(row => {
    row.hidden = false;
    const nameCell = row.cells[0].textContent.toLowerCase();
    const matches = nameCell.includes(query);
    if(!matches){
      row.hidden = true;
      }
    });
*/
}

const paginationContainer = document.getElementById('pagination-container');
const itemsPerPage = 3;
let currentPage = 1;

function renderTable(page) {
  currentPage = page;
  tbody.innerHTML = '';

  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedItems = specialties.slice(start, end);

  paginatedItems.forEach(item => {
    const row = specialtyRender(item);
    tbody.appendChild(row);
  });

  renderPagination();
}

function renderPagination() {
  paginationContainer.innerHTML = '';

  const totalPages = Math.ceil(specialties.length / itemsPerPage);

  if (totalPages <= 1) return;

  const ul = document.createElement('ul');
  ul.classList.add('pagination-style');

  for (let i = 1; i <= totalPages; i++) {
    const li = document.createElement('li');
    const button = document.createElement('button');

    button.textContent = i;
    button.value = i;

    if (i === currentPage) {
      button.classList.add('pagination-button');
      button.disabled = true;
    }

    button.addEventListener('click', () => {
      renderTable(i);
    });

    li.appendChild(button);
    ul.appendChild(li);
  }

  paginationContainer.appendChild(ul);
}

if (specialties.length > 0) {
  renderTable(1);
}
});

