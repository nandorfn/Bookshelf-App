const books = [];
const RENDER_EVENT = 'render-books';
const SAVED_EVENT = 'saved-books';
const STORAGE_KEY = 'BOOKSHELF_APPS';

function generateId(){
    return +new Date();
}

function generateBookObject(id, title, author, timestamp, isCompleted){
  return {
      id,
      title,
      author,
      timestamp,
      isCompleted
  }
}

function findBooks(booksId) {
  for (const booksItem of books) {
      if (booksItem.id === booksId) {
          return booksItem;
      }
  }
  return null;
}

function findBooksIndex(booksId) {
  for (const index in books) {
      if (books[index].id === booksId){
          return index;
      }
  }

  return -1;
}

//Local Storage
function isStorageExist() {
  if (typeof (Storage) === undefined) {
    alert('Browser kamu tidak mendukung local storage');
    return false;
  }
  return true;
}

function saveData() {
  if (isStorageExist()) {
    const parsed = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event(SAVED_EVENT));
  }
}

function loadDataFromStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);
  let data = JSON.parse(serializedData);

  if (data !== null) {
      for (const book of data){
      books.push(book)
  }
}
document.dispatchEvent(new Event(RENDER_EVENT));
}

function makebooks(booksObject){
  const {id, title, author, timestamp, isCompleted} = booksObject;

  const textTitle = document.createElement('h3');
  textTitle.innerText = booksObject.title;

  const textTimestamp = document.createElement('p');
  textTimestamp.innerText = booksObject.timestamp;

  const textAuthor = document.createElement('p');
  textAuthor.innerText = booksObject.author;
  textAuthor.classList.add('bookAuthor');

  const deleted = document.createElement('div');
  deleted.innerHTML = '<a href="#"><img src="assets/Cancel.svg" alt=""></a>'
  deleted.classList.add('deleted');

  const textContainer = document.createElement('div');
  textContainer.classList.add('inner');
  textContainer.append(textTitle, textTimestamp, textAuthor);

  const menuContainer = document.createElement('div');
  menuContainer.classList.add('menuIcon');
  menuContainer.append(deleted);

  const container = document.createElement('div');
  container.classList.add('item', 'shadow');
  container.append(textContainer, menuContainer);
  container.setAttribute('id', `book-${id}`);

  if (isCompleted) {
    const undoButton = document.createElement('div');
    undoButton.innerHTML = '<a href="#"><img src="assets/Reset.svg" alt=""></a>'
    undoButton.classList.add('undo-button');
    undoButton.addEventListener('click', function(){
      undoBookFromCompleted(id);
    });
    container.append(undoButton);

  } else{
    const checkButton = document.createElement('div');
    checkButton.innerHTML = '<a href="#"><img src="assets/Ok.svg" alt=""></a>'
    checkButton.classList.add('check-button');
    checkButton.addEventListener('click', function () {
      addBookToCompleted(id);
    });

    container.append(checkButton);
  }
  
  deleted.addEventListener('click', function(){
    var result = confirm('Apakah anda yakin untuk menghapus buku ini?');
    if (result) {
      removeBookFromList(id);
    }else{}
  });
  return container;
}

function addbook(){
  const title = document.getElementById("bookstittle").value;
  const author = document.getElementById("bookswritter").value;
  const timestamp = document.getElementById("booksyear").value;

  const generatedID = generateId();
  const booksObject = generateBookObject(generatedID, title, author, timestamp, false);
  books.push(booksObject); 
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

function addBookToCompleted(booksId) {
  const booksTarget = findBooks(booksId);

  if (booksTarget == null) return;

  booksTarget.isCompleted = true;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

//Function to remove Book
function removeBookFromList(booksId) {
  const booksTarget = findBooksIndex(booksId);

  if (booksTarget === -1) return;
  
  books.splice(booksTarget, 1);
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}
const booksValue = JSON.parse(localStorage.getItem('BOOKSHELF_APPS'));
  console.log(booksValue);

//Undo Book
function undoBookFromCompleted(booksId) {

  const booksTarget = findBooks(booksId);
  if (booksTarget == null) return;

  booksTarget.isCompleted = false;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

document.addEventListener('DOMContentLoaded', function () {
    const submitForm = document.getElementById('form');
    submitForm.addEventListener('submit', function (event) {
      event.preventDefault();
      addbook();
    });

      if (isStorageExist()) {
        loadDataFromStorage();
      }
    
  });
  document.addEventListener(SAVED_EVENT, () => {
    console.log('Data berhasil di simpan.');
  });

//popup Tambah Buku
document.querySelector("#show-addbox").addEventListener("click", function(){
    document.querySelector(".popup").classList.add("active");
});
document.querySelector(".popup .close-btn").addEventListener("click", function(){
    document.querySelector(".popup").classList.remove("active");
});

document.getElementById("submit").addEventListener("click", function(){
  document.querySelector(".popup").classList.remove("active");
});

//popup Login
document.querySelector("#showLogin").addEventListener("click", function(){
  document.querySelector(".popup-login").classList.add("active");
});
document.querySelector(".popup-login .close-btn").addEventListener("click", function(){
  document.querySelector(".popup-login").classList.remove("active");
});

document.getElementById("submit").addEventListener("click", function(){
document.querySelector(".popup-login").classList.remove("active");
});

//Books Category
document.addEventListener(RENDER_EVENT, function () { console.log(books);
  const uncompletedBookList = document.getElementById('uncompletedbooks');
  const completedBookList = document.getElementById('completedbooks');

  uncompletedBookList.innerHTML = '';
  completedBookList.innerHTML = '';

  for (const booksItem of books) {
    const booksElement = makebooks(booksItem);
    if (booksItem.isCompleted) {
      completedBookList.append(booksElement);
    } else {
      uncompletedBookList.append(booksElement);
    }
  }
})

//searchBar
document.querySelector('.searchBar').addEventListener('input', filterList);

function filterList() {
  const searchInput = document.querySelector('.searchBar');
  const filter = searchInput.value.toLowerCase();
  const listItems = document.querySelectorAll('.item');

  listItems.forEach((item) => {
    let text = item.textContent;
    if(text.toLowerCase().includes(filter.toLowerCase())) {
      item.style.display ='';
    }else{
      item.style.display = 'none';
  }
});
}

//hamburger menu
const hamburger = document.querySelector('#hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
})

document.querySelector("#showLogin").addEventListener("click", () => {
  hamburger.classList.remove("active");
  navMenu.classList.remove("active");
})














  