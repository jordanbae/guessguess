console.log('connected');
import movies from '../movies.json' assert {type: 'json'};






let passButton = document.querySelector('.btn-pass');
let correctButton = document.querySelector('.btn-correct');
let movieNameHtml = document.querySelector('.content')
let h1Content = document.querySelector('h1');


let moviesList = [];
let scores = 0;
const preload = () => {
    addTitleToMoviesList();
    movieNameHtml.innerText = moviesList[0];
}

const addTitleToMoviesList = () => {
    movies.forEach(title => {
        moviesList.push(title.title);
    })
}

preload();


console.log(moviesList)






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

