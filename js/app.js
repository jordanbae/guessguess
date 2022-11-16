console.log('connected');
import movies from '../assets/movies.json' assert {type: 'json'};


// TODO
//
// LOCAL STORAGE
// MODAL
//

let passButton = document.querySelector('.btn-pass');
let correctButton = document.querySelector('.btn-correct');
let movieNameHtml = document.querySelector('.movie-name')
let h1Content = document.querySelector('h1');

let introModalBtn = document.querySelector('#intro-btn-closemodal');
let introModalContainer = document.querySelector('.intro-modal-container');

let modalbtnCloseEl = document.querySelector('#btn-closemodal')
let modalContainer = document.querySelector('#modal_container');
let modalPoints = document.querySelector('#modal-title');
let modalInput = document.querySelector('#modal-input');



let tempmodalbutton1 = document.querySelector('#tempbutton1');
let tempmodalbutton2 = document.querySelector('#btn-closemodal');

//Score
let scores = 0;


// modalCloseEl.addEventListener('click', () => {
//     console.log('clicked');
// })

//Movies
let moviesList = [];
let playerList = JSON.parse(localStorage.getItem('playerInfo') || '[]');

console.log(playerList);
// Modal Trigger functions;
let currentDate = new Date();
var datetime = "Date: " + currentDate.getDate() + "/"
                + (currentDate.getMonth()+1)  + "/" 
                + currentDate.getFullYear() + " - "  
                + currentDate.getHours() + ":"  
                + currentDate.getMinutes() + ":" 
                + currentDate.getSeconds();



const savePlayertoLocalStorage = () => {
    let date = datetime;
    let name = modalInput.value;
    let points = scores;

    let playerInfo = {
        date: date,
        name: name,
        points: points,
    }
    playerList.push(playerInfo);
    localStorage.setItem("playerInfo", JSON.stringify(playerList));
    console.log(playerList)
}



const openEndModal = () => {
    console.log('inopen')
    modalContainer.style.display ='flex';
    modalPoints.innerText = `${scores + ' Points'}`
    // console.log("openEndModal - modalContainer.style.dislay", modalContainer.style.display)

}

const closeEndModal = () => {
    console.log('inclose');
    modalContainer.style.display = 'none'

    savePlayertoLocalStorage();
    openIntroModal();
    time = startingTime * 10;
}
const openIntroModal = () => {
    introModalContainer.style.display = 'flex';
}
const closeIntroModal = () => {
    introModalContainer.style.display = 'none';
    const updateCountdown = () => {
        let seconds = time % 60;
        countdownEl.innerHTML = `${seconds}`
        time--;
        if(time === -1){
            clearInterval(timeInterval);
            openEndModal();
        }
}
    let timeInterval = setInterval(updateCountdown, 1000);
}

//Timer
const startingTime = 1;
let time = startingTime * 10;
const countdownEl = document.querySelector('#countdown');
console.log(countdownEl)


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
    h1Content.innerText = `${'Points: ' + scores}`
})

introModalBtn.addEventListener('click', closeIntroModal);

tempmodalbutton1.addEventListener('click', openEndModal);
tempmodalbutton2.addEventListener('click', closeEndModal);

