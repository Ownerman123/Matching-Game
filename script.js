const gameBoard = document.querySelector("#Game-Board")
let selectedcard1;
let selectedcard2;



const resetBtn = document.querySelector("#reset-button")
let cards = CreateCards(10);
ShuffleChildrenElements(cards);
resetBtn.addEventListener('click', ResetBoard);

function ResetBoard(){
    while(gameBoard.firstChild){
        gameBoard.firstChild.remove();
    }
    cards = CreateCards(10);
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
        CompareCards(selectedcard1,selectedcard2);
       }
    }

    
}

function UpdateApearance(card) {
    
    if(card.dataset.cardside == "face"){card.firstChild.style.visibility = "visible";}
    else{card.firstChild.style.visibility = "hidden";}

}

function CompareCards(card1 , card2){

    if(card1.firstChild.dataset.pairnum === card2.firstChild.dataset.pairnum) {
        //score or something
        selectedcard1 = undefined;
        selectedcard2 = undefined;
    } else { 
        
        selectedcard1 = undefined;
        selectedcard2 = undefined;
        

        card1.dataset.cardside = "back";
        UpdateApearance(card1);
        card2.dataset.cardside = "back";
        UpdateApearance(card2);

    }


}