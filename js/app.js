console.log('connected');

let passButton = document.querySelector('.btn-pass');
let correctButton = document.querySelector('.btn-correct');
let imageContent = document.querySelector('.img-content')


let tempArray = ['1','2','3','4','5']
let scores = 0;

passButton.addEventListener('click', () => {
    console.log('pass clicked')
    let newArr = [];
    tempArray.push(tempArray.shift());
    newArr = tempArray;
    console.log(newArr)
    imageContent.innerText = newArr[0];
})

correctButton.addEventListener('click', () => {
    console.log('correct clicked')
    let newArr2 = [];
    tempArray.push(tempArray.shift());
    newArr2 = tempArray;

})
