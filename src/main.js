// Variables targetting the relevant DOM elements here 👇
var coverTitle = document.querySelector('.cover-title');

var imageArray = document.querySelector('.cover-image');

var mainCover = document.querySelector('.main-cover')

var tagline = document.querySelector('.tagline')

var taglineArrayOne = document.querySelector('.tagline-1');

var taglineArrayTwo = document.querySelector('.tagline-2');

var getRandomButton = document.querySelector('.random-cover-button');

var makeYourOwnButton = document.querySelector('.make-new-button');

var saveCoverButton = document.querySelector('.save-cover-button');

var viewSaveCoverButton = document.querySelector('.view-saved-button');

var homeButton = document.querySelector('.home-button');

var viewFormView = document.querySelector('.form-view');

var viewHomeView = document.querySelector('.home-view');

var viewSavedView = document.querySelector('.saved-view');

var userCover = document.querySelector('.user-cover');

var userTitle = document.querySelector('.user-title');

var userDesc1 = document.querySelector('.user-desc1');

var userDesc2 = document.querySelector('.user-desc2');

var savedCoverSection = document.querySelector('.saved-covers-section');

var createNewBookButton = document.querySelector('.create-new-book-button');

var savedCovers = [
  new Cover("http://3.bp.blogspot.com/-iE4p9grvfpQ/VSfZT0vH2UI/AAAAAAAANq8/wwQZssi-V5g/s1600/Do%2BNot%2BForsake%2BMe%2B-%2BImage.jpg", "Sunsets and Sorrows", "sunsets", "sorrows")
];

// Event listeners here 👇
window.addEventListener('load', getRandomCover)

getRandomButton.addEventListener('click', getRandomCover)

makeYourOwnButton.addEventListener('click', makeNewPage)

viewSaveCoverButton.addEventListener('click', savedView)

saveCoverButton.addEventListener('click', saveCover)

homeButton.addEventListener('click', viewHome)

createNewBookButton.addEventListener('click', userBookAdd)

// Event handlers and other functions here 👇
function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
};

function makeNewPage(event){
  event.preventDefault();
  viewFormView.classList.remove('hidden');
  viewHomeView.classList.add('hidden');
  viewSavedView.classList.add('hidden');
  altViewButtons()
};

function savedView() {
  viewHomeView.classList.add('hidden');
  viewSavedView.classList.remove('hidden');
  viewFormView.classList.add('hidden');

savedCoverSection.innerHTML = "";
  for (var i =0; i < savedCovers.length; i++) {

savedCoverSection.innerHTML += `<section class="mini-cover" id="${savedCovers[i].id}">
    <img class="mini-cover" src=${savedCovers[i].cover}>
    <h2 class="cover-title"> ${savedCovers[i].title} </h2>
    <h3 class="tagline">A tale of <span class="tagline-1"> ${savedCovers[i].tagline1} </span> and <span class="tagline-2"> ${savedCovers[i].tagline2} </span> </h3>

    </section>`
  }
  findMiniCover()
  altViewButtons()
};

function viewHome() {
  viewHomeView.classList.remove('hidden');
  viewSavedView.classList.add('hidden');
  viewFormView.classList.add('hidden');
  homeViewButtons()
};

function altViewButtons() {
  getRandomButton.classList.add('hidden');
  saveCoverButton.classList.add('hidden');
  homeButton.classList.remove('hidden');
};

function homeViewButtons() {
  homeButton.classList.add('hidden');
  getRandomButton.classList.remove('hidden');
  saveCoverButton.classList.remove('hidden');
};

function getRandomCover(event) {
  event.preventDefault();
  var image = covers[getRandomIndex(covers)];
  var title = titles[getRandomIndex(titles)];
  var descriptor1 = descriptors[getRandomIndex(descriptors)];
  var descriptor2 = descriptors[getRandomIndex(descriptors)];

  currentCover = new Cover(image, title, descriptor1, descriptor2)
  imageArray.src = currentCover.cover
  coverTitle.innerText = currentCover.title
  taglineArrayOne.innerText = currentCover.tagline1
  taglineArrayTwo.innerText = currentCover.tagline2
};

function userBookAdd(event) {
  event.preventDefault();

  var coverNew = userCover.value;
  imageArray.src = coverNew;
  covers.push(coverNew);

  var titleNew = userTitle.value;
  coverTitle.innerText = titleNew;
  titles.push(coverTitle);

  var descriptor1New = userDesc1.value;
  taglineArrayOne.innerText = descriptor1New
  descriptors.push(descriptor1New);

  var descriptor2New = userDesc2.value;
  taglineArrayTwo.innerText = descriptor2New
  descriptors.push(descriptor2New);

  currentCover = new Cover(coverNew, titleNew, descriptor1New, descriptor2New);

  viewFormView.classList.add('hidden');
  viewHomeView.classList.remove('hidden');

  viewHome();
};

function saveCover() {
  if (!savedCovers.includes(currentCover)) {
    savedCovers.push(currentCover);
  }
};

function findMiniCover() {
  var miniCovers = document.querySelectorAll('.mini-cover')
    for (var i = 0; i < miniCovers.length; i++) {
      miniCovers[i].addEventListener('dblclick', deleteBook)
    }
};

function deleteBook(event) {
  event.preventDefault();
  for (var i = 0; i < savedCovers.length; i++) {
    if (event.target.parentNode.id === `${savedCovers[i].id}`) {
      savedCovers.splice(i, 1)
    }
  }
savedView()
};
