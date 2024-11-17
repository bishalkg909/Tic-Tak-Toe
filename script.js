const boxes = document.querySelectorAll('.box');
const gameInfo = document.querySelector('.game-info');
const newGameBtn = document.querySelector('.btn');


let currentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function initGame(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];

    // making boxes empty in ui
    boxes.forEach((box,index)=>{
        box.innerHTML = '';
        boxes[index].style.pointerEvents = "all";
        box.classList = `box box${index+1}`
    })

    newGameBtn.classList.remove("active");
    gameInfo.textContent = `Current Player - ${currentPlayer}`;
}

function swapTurn(){
    if(currentPlayer==='X'){
        currentPlayer = 'O'; 
    }else{
        currentPlayer = 'X';
    }
    //UI Updating
    gameInfo.innerHTML = `Current Player - ${currentPlayer}`;
}

function handleClick(index){
    if(gameGrid[index]===""){
        boxes[index].innerHTML = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        //swapping turn
        swapTurn();
        //checking won or not
        checkGameOver();
    }
}

function checkGameOver(){
    let answer = "";

    winningPositions.forEach((position) => {
        // all the boxes should be non empty and all the values will be either x or o
        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "" )
            && (gameGrid[position[0]] === gameGrid[position[1]] && gameGrid[position[1]]===gameGrid[position[2]])){
            
            // checking if winner is x or o
            if(gameGrid[position[0]]==='X'){
                answer = 'X';
            }else{
                answer = 'O';
            }

            //disabling pointer events because we got a winner
            boxes.forEach((box)=>{
                box.style.pointerEvents = "none";
            })

            // Now we know the winner , now changing the color 
            boxes[position[0]].classList.add('win');
            boxes[position[1]].classList.add('win');
            boxes[position[2]].classList.add('win');

        }
    })

    if(answer !==""){
        gameInfo.innerHTML = ` Winner Player - ${answer}`;
        newGameBtn.classList.add('active');
        return;
    }

    //when there is no winner, for tie
    let fillCount = 0;
    gameGrid.forEach((box)=>{
        if(box !== ""){
            fillCount++;
        }
    });

    //board is full or nor
    if(fillCount===9){
        gameInfo.innerHTML = "Game Tied !";
        newGameBtn.classList.add('active');
    }

}

initGame();

boxes.forEach((box,index)=>{
    box.addEventListener('click',()=>{
        handleClick(index);
    });
});

newGameBtn.addEventListener('click', initGame);