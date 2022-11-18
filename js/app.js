import movies from '../assets/movies.json' assert {type: 'json'};

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

let scoreModalContainer = document.querySelector('#score_modal');
let scoreModalButton = document.querySelector('#btn-scoreboard');
let scoreTable = document.querySelector('.tlist');


//Score
let scores = 0;
//Movies
let moviesList = [];
let playerList = JSON.parse(localStorage.getItem('playerInfo') || '[]');
//Time
const startingTime = 45;
let time = startingTime * 1;
const countdownEl = document.querySelector('#countdown');



///LocalStorage and Scoreboard///
//Get Date
let currentDate = new Date();
var datetime = "Date: " + currentDate.getDate() + "/"
                + (currentDate.getMonth()+1)  + "/" 
                + currentDate.getFullYear() + " - "  
                + currentDate.getHours() + ":"  
                + currentDate.getMinutes() + ":" 
                + currentDate.getSeconds();

//Clear table to get updated table, without this the table will be duplicated
const clearTable = (parent) => {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

//Adding Old player list from localstorage and new player that have been added to Localstorage to Table
const savePlayerToScoreboard = () => {
    clearTable(scoreTable);
    playerList.reverse();
    playerList.forEach( (player) => {
        const trElHTML = document.createElement("tr")
        const dateElHTML = document.createElement("td")
        const nameElHTML = document.createElement("td")
        const pointsElHTML = document.createElement("td")
        trElHTML.append(dateElHTML);
        trElHTML.append(nameElHTML);
        trElHTML.append(pointsElHTML);
        dateElHTML.append(`${player.date}`)
        nameElHTML.append(`${player.name}`)
        pointsElHTML.append(`${player.points}`)
        scoreTable.append(trElHTML);
    })
}

//Saving player objects to localstorage, using stringnify to make it readable.
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
    savePlayerToScoreboard();
}


///SCOREBOARD - MODAL///
//After press 'Restart' this function will close the scoreboard, reset the time and scores, shuffle the movie list, and open the 'HOW TO PLAY' modal
const closeScoreboardModalAndRestartGame = () => {
    scoreModalContainer.style.display = 'none';
    time = startingTime * 1;
    scores = 0;
    h1Content.innerText = `${'💰 Points: ' + scores}`
    movieNameHtml.innerText = '';
    shuffleArray(moviesList)
    openIntroModal();
}
const openScoreboardModal = () => {
    scoreModalContainer.style.display = 'flex';
}

///SCORE ANNOUNCE - MODAL///
const openEndModal = () => {
    modalContainer.style.display ='flex';
    if(scores <= 5) {
        modalPoints.innerText = `${'🤢Just ' + scores + '? For real?'}`
    } else {
        modalPoints.innerText = `${'👏You got ' + scores + ' Points'}`
    }
}
//After closing the score announce modal, the input will be send to local storage with 'savePlayertoLocalStorage()' function and then openScoreboardModal.
const closeEndModal = () => {
    modalContainer.style.display = 'none'
    savePlayertoLocalStorage();
    openScoreboardModal();
}


///HOW TO PLAY - MODAL///
const openIntroModal = () => {
    introModalContainer.style.display = 'flex';
}

// After close the how to play modal, the first element of the shuffled array will be put in the innerhtml. Then the timer start, the update countdown function will check if the time reaches 0 then the cuurent game session ends, and open ScoreAnnounceModal
const closeIntroModal = () => {
    introModalContainer.style.display = 'none';
    movieNameHtml.innerHTML = moviesList[0];
    const updateCountdown = () => {
        let seconds = time % 60; // change multiply to modulus
        countdownEl.innerHTML = `⏳ ${seconds}`
        time--;
        if(time === -1){
            clearInterval(timeInterval);
            openEndModal();
        }
}
    let timeInterval = setInterval(updateCountdown, 1000);
}

///Shuffle array credit: https://www.folkstalk.com/2022/07/javascript-fisher-yates-shuffle-mdn-with-code-examples.html
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

///Add movies list objects obtained from JSON to array
const addTitleToMoviesList = () => {
    movies.forEach(title => {
        moviesList.push(title.title);
    })
}

///MAIN FUNCTION
const main = () => {
    addTitleToMoviesList();
    shuffleArray(moviesList)
}

main();







//Event Handler
passButton.addEventListener('click', () => {
    moviesList.push(moviesList.shift());
    movieNameHtml.innerText = moviesList[0];
})
correctButton.addEventListener('click', () => {
    moviesList.push(moviesList.shift());
    movieNameHtml.innerText = moviesList[0];
    scores++
    h1Content.innerText = `${'💰 Points: ' + scores}`
})
document.body.onkeyup = function(e) {
    if (e.key == " " ||
        e.code == "Space" ||      
        e.keyCode == 32      
    ) {
        moviesList.push(moviesList.shift());
        movieNameHtml.innerText = moviesList[0];
        scores++
        h1Content.innerText = `${'💰 Points: ' + scores}`
    } else if (e.key == "Control" ||
        e.code == "ControlLeft" ||      
        e.keyCode == 17      
    ) {
    moviesList.push(moviesList.shift());
    movieNameHtml.innerText = moviesList[0];
    }
}


introModalBtn.addEventListener('click', closeIntroModal);
modalbtnCloseEl.addEventListener('click', closeEndModal);
scoreModalButton.addEventListener('click', closeScoreboardModalAndRestartGame);

