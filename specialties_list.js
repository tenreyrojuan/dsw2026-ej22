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

  const descriptionCell = document.createElement('td');
  descriptionCell.classList.add('descriptionCell');

  const actionCell = document.createElement('td');
  actionCell.classList.add('actionButtonCell');
  
  const specialtyImg = makeSpecialtyImage(iconRoute);
  specialtyImg.classList.add('specialtyImg');

  const [editButton,deleteButton] = makeActionButtons();
  editButton.classList.add('button')
  deleteButton.classList.add('button')


  nameCell.append(specialtyImg,specialty.name);
  descriptionCell.textContent = specialty.description;
  actionCell.append(editButton,deleteButton);
  

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

const searchButton = document.getElementById('search-button');
const searchBar = document.getElementById('search-bar');

searchButton.addEventListener('click', (event) => {
  event.preventDefault();
    showSpecialtyMatches()
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
}

  const menuButton = document.getElementById('menu');
  const navBar = document.getElementById('sidebar');

  menuButton.addEventListener('click', () => {
    navBar.classList.toggle('shown')
  })


  const navbarList = document.getElementById('list');
  const specialties_card = navbarList.children[1];
  console.log(specialties_card.childElementCount);
  console.log(specialties_card.children[1]);
  const specialties_a = specialties_card.children[1];

  specialties_a.addEventListener('click', (event) => {
    event.preventDefault();

    specialties_card.classList.add('selected');
  })

});

