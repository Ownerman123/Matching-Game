const gameBoard = document.querySelector("#Game-Board");
const scoreBoard = document.querySelector("#Score-Board");
let selectedcard1;
let selectedcard2;
let isComparing = false;
let score = 0;
let totalpairs;



const resetBtn = document.querySelector("#reset-button")
let cards = CreateCards(1);
ShuffleChildrenElements(cards);
resetBtn.addEventListener('click', ResetBoard);

function ResetBoard(){
    while(gameBoard.firstChild){
        gameBoard.firstChild.remove();
    }
    console.log("children removed");
    score = 0;
    cards = CreateCards((cards.length / 2) + 5);
    ShuffleChildrenElements(cards);
    
}

function createCard( pairId , char ) {
    const cardcontainer = document.createElement("div");
    cardcontainer.setAttribute("class" , "match-card");
    cardcontainer.setAttribute("data-cardside", "back");

    const cardchar = document.createElement("p");
    cardchar.textContent = char;
    cardchar.setAttribute("data-pairNum", pairId );
    cardcontainer.appendChild(cardchar);
    
    document.querySelector("#Game-Board").appendChild(cardcontainer);
    cardcontainer.addEventListener('click', Pickcards);
    return cardcontainer;

};

function CreateCards(pairs) {

    const cardsarray = [];
    totalpairs = pairs;

    for(let i = 0; i < pairs; i++) {
        cardsarray.push(createCard(i,i));
        cardsarray.push(createCard(i,i));

    }

    return cardsarray;

}

function ShuffleChildrenElements(array) {

    const parent = array[0].parent;

    const arrayShuffler = GenShuffledarray(array);

    for(let i = 0; i < array.length; i++){

        document.querySelector("#Game-Board").appendChild(array[arrayShuffler[i]])

    }

    
    
}

function GenShuffledarray(array) {
    
    const shuffledarray = [];
    for(let i = 0; i < array.length; i++)
    {

        let valid = false;
        let placeholder;
        while(!valid){

            placeholder = Math.floor(Math.random()*array.length);
            if(!shuffledarray.includes(placeholder)){
                shuffledarray.push(placeholder);
                valid = true;

            }


        }

    }
    return shuffledarray;

}

function Pickcards(event) {

    if(isComparing){return;}

    if(selectedcard1 === undefined) {
        selectedcard1 = event.target;
        selectedcard1.dataset.cardside = "face";
        UpdateApearance(selectedcard1)
        console.log(selectedcard1);
    }else if (selectedcard2 === undefined ){
       if(selectedcard1 === event.target){return;}
       else{ 
        selectedcard2 = event.target;
        selectedcard2.dataset.cardside = "face";
        UpdateApearance(selectedcard2)
        console.log(selectedcard2);
        isComparing = true;
        CompareCards(selectedcard1,selectedcard2);
       }
    }

    
}

function WaitForSecs(secs) {

    const timerInterval = setInterval(function () { 

       secs--;
       console.log(secs);

        if(secs === 0){
            clearInterval(timerInterval);
        }


    }, 1000);

}

function UpdateApearance(card) {
    
    if(card.dataset.cardside == "face"){
        card.firstChild.style.visibility = "visible";
        card.style.background =  "var(--facecolor)";
}
    else{
        card.firstChild.style.visibility = "hidden";
        card.style.background =  "var(--backcolor)";    
}

}

function CompareCards(card1 , card2){

    if(card1.firstChild.dataset.pairnum === card2.firstChild.dataset.pairnum) {
        //score or something
        Score();
        selectedcard1 = undefined;
        selectedcard2 = undefined;
        isComparing = false;
    } else { 
        
        selectedcard1 = undefined;
        selectedcard2 = undefined;
        
        let secs = 1;
        const timerInterval = setInterval(function () { 

            secs--;
            console.log(secs);
     
             if(secs === 0){
                clearInterval(timerInterval);
                card1.dataset.cardside = "back";
                UpdateApearance(card1);
                card2.dataset.cardside = "back";
                UpdateApearance(card2);
                isComparing = false;
             }
     
     
         }, 1000);

        

    }


}
function Score() {

    score++;
    scoreBoard.textContent = `Pairs Matched:${score} Pairs Left ${totalpairs - score}`;
    scoreBoard.style.fontSize = "1.5em";
    if(totalpairs-score === 0) {
        scoreBoard.textContent = "You win!";
        scoreBoard.style.fontSize = "100px";
        
    }


}