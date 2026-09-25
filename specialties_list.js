document.addEventListener('DOMContentLoaded', async () => {
  const logoutButton = document.getElementById('logout');

  logoutButton.addEventListener('click', () => {
    window.location.href = 'login.html';
  });

const tbody = document.getElementById('specialities-table-body');

const response = await fetch('specialties.json');
const specialties = await response.json();

specialties.forEach(specialty => {
  let name = specialty.name;
  const iconRoute = getSpecialtyIconRoute(name);

  const row = document.createElement('tr');
  
  const nameCell = document.createElement('td');
  nameCell.classList.add('nameCell');

  const specialtyImg = makeSpecialtyImage(iconRoute);
  specialtyImg.classList.add('specialtyImg');

  const descriptionCell = document.createElement('td');
  descriptionCell.classList.add('descriptionCell');

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
  row.appendChild(actionCell);

  tbody.appendChild(row);
});

function getSpecialtyIconRoute(specialtyName) {
  const name = specialtyName.toLowerCase();

  switch(name){
    case "cardiology":
      return "images/beating_heart.png";
    case "dermatology":
      return "images/hair_follicle.png";
    case "neurology":
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
  const editImg = document.createElement('img'); 
  editImg.src = 'images/pen.png';
  editImg.height = 15;
  editImg.width = 15;
  editButton.appendChild(editImg);

  const deleteButton = document.createElement('button');
  const deleteImg = document.createElement('img'); 
  deleteImg.src = 'images/bin.png';
  deleteImg.height = 15;
  deleteImg.width = 15;
  deleteButton.appendChild(deleteImg);

  return [editButton,deleteButton];
}

const headerContainer = document.getElementById('header-container');

const searchContainer = document.getElementById('search-container');
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
  const query = searchBar.value.toLowerCase();

  tbody.querySelectorAll('tr').forEach(row => {
    row.hidden = false;
    const nameCell = row.cells[0].textContent.toLowerCase();
    const matches = nameCell.includes(query);
    if(!matches){
      row.hidden = true;
      }
    });
}});

