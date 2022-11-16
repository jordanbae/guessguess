console.log('connected');
import movies from '../movies.json' assert {type: 'json'};


// TODO
//
// RE-ARRANGE FILES - REMOVING CATEGORY PAGE / COPY CONTENT APP.HTML TO INDEX.HTML
// LOCAL STORAGE
// MODAL
//

let passButton = document.querySelector('.btn-pass');
let correctButton = document.querySelector('.btn-correct');
let movieNameHtml = document.querySelector('.movie-name')
let h1Content = document.querySelector('h1');

let modalbtnCloseEl = document.querySelector('#btn-closemodal')
let modalContainer = document.querySelector('.modal-container');

let tempmodalbutton1 = document.querySelector('#tempbutton1');
let tempmodalbutton2 = document.querySelector('#tempbutton2');


tempmodalbutton1.addEventListener('click', openEndModal);
tempmodalbutton2.addEventListener('click', closeEndModal);


// modalCloseEl.addEventListener('click', () => {
//     console.log('clicked');
// })

//Movies
let moviesList = [];
// Modal Trigger functions;

const openEndModal = () => {
    modalContainer.style.dislay ='flex';
}

const closeEndModal = () => {
    modalContainer.style.display = 'none'
}

//Timer
const startingTime = 1;
let time = startingTime * 10;
const countdownEl = document.querySelector('#countdown');
console.log(countdownEl)


//Score
let scores = 0;



//Timer
const updateCountdown = () => {
    let seconds = time % 60;

    countdownEl.innerHTML = `${seconds}`
    time--;

    if(time === -1){
        clearInterval(timeInterval);
        alert('times up');
    }
}
// let timeInterval = setInterval(updateCountdown, 1000);

//Add movies to array
const addTitleToMoviesList = () => {
    movies.forEach(title => {
        moviesList.push(title.title);
    })
}

//Shuffle array
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i

    // swap elements array[i] and array[j]
    // we use "destructuring assignment" syntax to achieve that
    // you'll find more details about that syntax in later chapters
    // same can be written as:
    // let t = array[i]; array[i] = array[j]; array[j] = t
    [array[i], array[j]] = [array[j], array[i]];
  }
}



//MAIN FUNCTION --- THE START OF EVERYTHING
const main = () => {
    addTitleToMoviesList();
    shuffleArray(moviesList)
    movieNameHtml.innerHTML = moviesList[0];
}
main();





//BUTTONS EVENT
passButton.addEventListener('click', () => {
    moviesList.push(moviesList.shift());
    movieNameHtml.innerText = moviesList[0];
    console.log('dis is movieList', moviesList)
})

correctButton.addEventListener('click', () => {
    moviesList.push(moviesList.shift());
    movieNameHtml.innerText = moviesList[0];
    console.log('dis is movieList', moviesList)
    scores++
    h1Content.innerText = `${'Scores:' + scores}`
})

