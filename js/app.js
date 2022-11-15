console.log('connected');
import movies from '../movies.json' assert {type: 'json'};






let passButton = document.querySelector('.btn-pass');
let correctButton = document.querySelector('.btn-correct');
let movieNameHtml = document.querySelector('.movie-name')
let h1Content = document.querySelector('h1');


let moviesList = [];

let scores = 0;

const addTitleToMoviesList = () => {
    movies.forEach(title => {
        moviesList.push(title.title);
    })
}

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

const main = () => {
    addTitleToMoviesList();
    shuffleArray(moviesList)
    movieNameHtml.innerHTML = moviesList[0];
}

main();

// console.log(moviesList)

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

