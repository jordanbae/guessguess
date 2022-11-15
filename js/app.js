console.log('connected');

let movieList = {};
let movieListArray = [];

let passButton = document.querySelector('.btn-pass');
let correctButton = document.querySelector('.btn-correct');
let imageContent = document.querySelector('.content')
let h1Content = document.querySelector('h1');


let tempArray = ['1','2','3','4','5']
var scores = 0;
let newArr = [];


const moviesId = {
  method: 'GET',
  url: 'https://imdb8.p.rapidapi.com/title/get-most-popular-movies',
  params: {homeCountry: 'US', purchaseCountry: 'US', currentCountry: 'US'},
  headers: {
    'X-RapidAPI-Key': '42263d648emshbe13979451f9429p1dbc56jsn2f9b78bea88b',
    'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
  }
};

axios.request(moviesId)
.then(function (response) {
	// console.log('response.data', typeof response.data, response.data);
    movieList = { ...response }
    movieListArray = movieList.data;
    // console.log("THIS IS A MOVIE LIST ARRAY", movieListArray, Array.isArray(movieListArray))
    // console.log("movieList", Array.isArray(movieList.data) , movieList.data)
    passFunction();
})

.catch(function (error) {
	console.error(error);
});
    



const passFunction = () => {


    passButton.addEventListener('click', () => {
        let modifiedIdsArray = [];
        movieListArray.forEach((ids) => {
            let modifiedIds = ids.replace('/title/', '');
            modifiedIdsArray.push(modifiedIds);
        })
        let randId = modifiedIdsArray[Math.floor(Math.random()*modifiedIdsArray.length)];
        console.log(randId)

        const moviesTitle = {
            method: 'GET',
            url: 'https://imdb8.p.rapidapi.com/title/get-meta-data',
            params: {ids: randId, region: 'US'}, //added modified ids, could crash
            headers: {
              'X-RapidAPI-Key': '42263d648emshbe13979451f9429p1dbc56jsn2f9b78bea88b',
              'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
            }
          };
          
          axios.request(moviesTitle).then(function (response) {
              console.log(response.data);
          }).catch(function (error) {
              console.error(error);
          });
    
    })
}

// passButton.addEventListener('click', () => {
    

    // console.log('pass clicked')
    // tempArray.push(tempArray.shift());
    // newArr = tempArray;
    // console.log(newArr)
    // imageContent.innerText = newArr[0];

    // console.log('dis is movieList', movieList)
// })

correctButton.addEventListener('click', () => {
    console.log('correct clicked')
    tempArray.push(tempArray.shift());
    newArr = tempArray;
    console.log(newArr)
    imageContent.innerText = newArr[0];
    scores++
    h1Content.innerText = `${'Scores:' + scores}`
})

