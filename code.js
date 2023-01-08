let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ];
  
  // win states
  const winningCombinations = [

    // rows
    [[0,0], [0,1], [0,2]], // top
    [[1,0], [1,1], [1,2]], // middle
    [[2,0], [2,1], [2,2]], // bottom
    // columns
    [[0,0], [1,0], [2,0]], // left
    [[0,1], [1,1], [2,1]], // middle
    [[0,2], [1,2], [2,2]], // right
    // diagonals
    [[0,0], [1,1], [2,2]], // left to right
    [[2,0], [1,1], [0,2]] // right to left

  ];

  let currentPlayer;
  let player2;

  // cells for building events
  let cellBoard = [
    [0,0],
    [0,1],
    [0,2],
    [1,0],
    [1,1],
    [1,2],
    [2,0],
    [2,1],
    [2,2]
]



// reset game
function newGame(buttonReset, computer){
    if(!buttonReset){
        newGameButton();
    }
    drawBoard();
    buildCells();
    

 //randomize starting player
    let randomPlayer = Math.floor(Math.random()*100)
    console.log(randomPlayer)
    currentPlayer = (randomPlayer > 0 && randomPlayer % 2 == 1) ? "X" : "O";
    console.log(currentPlayer, "'s turn")

    //check if playing against a computer
    
    player2 = computer ? false : true;

    //computer starts?
    if(currentPlayer == "O" && !player2){
        makeComputerMove();
    }

    $('#whose-turn').text(`${currentPlayer}'s turn...`)
}


// builds event handlers
function buildCells(){

    for(let cell = 0; cell < 9; cell++){
    
        let [row, col] = getRowColFromIndex(cell)
        console.log(row, col)
            // on click, handle move
        $(`#cell-${cell}`).click((e)=>{
                console.log("click", e.currentTarget.id);
                handleMove(row, col);
        })
            // change cell to player
            // launch alert for next player 

    }
}

function drawBoard(){
    let flatBoard = [...board[0],...board[1],...board[2]]
    for(let i = 0; i < 9; i++){
        if(flatBoard[i]){
            $(`#cell-${i}`).html(`<p>${flatBoard[i]}<p>`)
        }else{
            $(`#cell-${i}`).html(`<p>⬞<p>`)
        }
    }
}
 
// gets coordinates from cell id
function getRowColFromIndex(cell){

    return cellBoard[cell]
    
}
  
 
  
  // check board for win states
function checkForWin() {

    for (let i = 0; i < winningCombinations.length; i++) {
        let combination = winningCombinations[i];
        let [a, b, c] = combination;
        let [rowA, colA] = a;
        let [rowB, colB] = b;
        let [rowC, colC] = c;
        if (board[rowA][colA] === currentPlayer && board[rowB][colB] === currentPlayer && board[rowC][colC] === currentPlayer) {
                return true;
        }
    }

    return false;

}
  
  // check board for tie
function checkForTie() {

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === "") {
            return false;
        }
        }
    }

return true;

}
  
  // handle the computer move using RNG
function makeComputerMove() {

    let cell = Math.floor(Math.random() * 9);
    let [row, col] = getRowColFromIndex(cell);

    if (board[row][col] === "") {
        handleMove(row, col, cell);
    } else {
        makeComputerMove();
    }

}
  
  // handle current turn
function handleMove(row, col, cell) {

    // if move isn't valid, do nothing
    if (board[row][col] !== "") {
        return;
    }

    // otherwise make move
    legalMove(row,col);


    // check for win
    if (checkForWin()) {
        console.log(`Player ${currentPlayer} wins!`);
        $('.cell').off('click');
        // displaye winning player
        $('#whose-turn').html(`<h1 class="display-1"> ${currentPlayer} wins!</h1>`)
        return;
    }

    // check for tie
    if (checkForTie()) {
        console.log("Tie game!");
        $('.cell').off('click');
        // display tie
        $('#whose-turn').html(`<h1 class="display-1">Tie Game!</h1>`)
        return;
    }

    // switch player
    currentPlayer = (currentPlayer === "X") ? "O" : "X";
    $('#whose-turn').text(`${currentPlayer}'s turn...`)

    //display board
    console.table(board)

    // computer goes after player
    if (currentPlayer === "O" && !player2) {
        console.log("computer's turn")
        makeComputerMove();
    }else if(currentPlayer == "O" && player2){
        console.log("O's turn")
    }else {
        console.log("X's move")
    }

    return true;
}

// make move and redraw board
function legalMove(row, col){
    board[row][col] = currentPlayer;
    drawBoard();
}

// add click listner to new game button (formerly a forfeit button, RIP all those extras I'd coded)
function newGameButton(){
    $('#forfeit').click(e=> {
        board = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]
        ];
        drawBoard();
        // passes in true to avoid calling newGameButton immediately
        newGame(true);
    })
    $('#whose-turn').click(()=>{
        board = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]
        ];
        drawBoard();
        console.log("switching to computer..")
        newGame(true, true);
    })

}


newGame();