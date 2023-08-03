const board_div = document.querySelector('.board');
const winMsg_div = document.querySelector('#winning-message');
const btnPlayAgain = document.querySelector('#play-again');
const btnChangeFigures = document.querySelector('#change-figure');
const playersFigures_divs = document.querySelectorAll('.players-figure');

let boxes = [];
let playerFigure = 'circle';
let computerFigure = 'cross';
let availableSquares = [];
const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

const playersChoice = (num) => {
    boxes[num].classList.add(playerFigure);
    boxes[num].style.pointerEvents = 'none';
    checkScore(playerFigure);
    availableSquares = availableSquares.filter(nums => nums !== num);
}
const computersChoice = () => {
    if (availableSquares.length === 0) return;
    const choose = (choice) => {
        boxes[choice].classList.add(computerFigure);
        boxes[choice].style.pointerEvents = 'none';
        checkScore(computerFigure);
        availableSquares = availableSquares.filter(nums => nums !== choice);
    }

    let counter = 0;
    let thirdBoxID = null;
    let choiceValue = null;

    // if computer has 2 of winning combo AND 3rd is free - put there
    for (let i = 0; i < winningCombos.length; i++) {
        counter = 0;
        let myArray = winningCombos[i];
        for (let j = 0; j < myArray.length; j++) {
            if (boxes[myArray[j]].classList.contains(computerFigure)) {
                counter++;
            } else {
                thirdBoxID = Number(boxes[myArray[j]].id);
            }
        }
        if (counter === 2 && availableSquares.includes(thirdBoxID)) {
            choiceValue = thirdBoxID;
            choose(choiceValue);
            return;
        }
    }
    // else if player has 2 of winning combo AND 3rd is free - put there
    for (let i = 0; i < winningCombos.length; i++) {
        counter = 0;
        let myArray = winningCombos[i];
        for (let j = 0; j < myArray.length; j++) {
            if (boxes[myArray[j]].classList.contains(playerFigure)) {
                counter++;
            } else {
                thirdBoxID = Number(boxes[myArray[j]].id);
            }
        }
        if (counter === 2 && availableSquares.includes(thirdBoxID)) {
            choiceValue = thirdBoxID;
            choose(choiceValue);
            return;
        }
    }

    // else random
    const choiceIndex = Math.floor(Math.random() * availableSquares.length);
    choiceValue = availableSquares[choiceIndex];
    choose(choiceValue);
}
const checkScore = (circleOrCross) => {
    winningCombos.forEach(array => {
        const won = array.every(cell =>
            boxes[cell].classList.contains(circleOrCross));
        if (won) {
            winMsg_div.textContent = circleOrCross.toUpperCase() + ' WON';
            boxes.forEach(box => box.style.pointerEvents = 'none');
            availableSquares = [];
        }
    })
}
const newBoard = () => {
    board_div.innerHTML = "";
    winMsg_div.textContent = "";
    availableSquares = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    for (let i = 0; i < 9; i++) {
        const box = document.createElement('div');
        box.id = i.toString();
        board_div.appendChild(box);
    }
    boxes = document.querySelectorAll('.board > div');
    boxes.forEach(box => {
        box.onclick = (e) => {
            const boxNum = Number(e.target.id);
            playersChoice(boxNum);
            setTimeout(() => {
                computersChoice();
            }, 200);
        }
    })
}
newBoard();

btnPlayAgain.onclick = () => {
    newBoard();
}

btnChangeFigures.onclick = () => {
    playersFigures_divs[0].classList.remove(playerFigure);
    playersFigures_divs[0].classList.add(computerFigure);
    playersFigures_divs[1].classList.remove(computerFigure);
    playersFigures_divs[1].classList.add(playerFigure);
    const temp = playerFigure;
    playerFigure = computerFigure;
    computerFigure = temp;
    newBoard();
}

