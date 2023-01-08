//Ｏ, Ｘ, ＀
const markerX = "Ｘ"
const markerO = "Ｏ"
const markerBlank = "＀"

const names = ["Jim", "Huck", "Tom", "Sally", "Polly", "Judge", "Joe"]
const colors = ["bg-primary", "bg-success", "bg-info", "bg-caution"]
const markers = [markerX,markerO]
let iterator = 0;
// class Player
class Player{
    //own props:
    constructor(){

        //player name
        this.name = names[iterator];
        //player recor d = 0
        this.record = 0;
        //color
        this.color = 
        this.marker = markers[iterator++]
    }

    //method: getPlayerName
    getPlayerName(playerNumber){
        //inputID
        if(playerNumber==2){
           this.name = $(`#player-2-name`).val();
           console.log(this.name)
        }else{
            this.name = $('#player-1-name').val();
            console.log(this.name)
        }
        
        //set value as this.player name 
        //this.name = names[iterator++]
    }

    randomPlayerName(difficulty){
        let max = (difficulty == "easy") ? 4 : 7;
        let min = (difficulty == "easy") ? 0 : 4;
        let index = Math.floor(Math.random() * (max-min)) + min;
        this.name = names[index]
        return this.name;
    }

    getPlayerColor(){
        //inputID
        colors[Math.floor(Math.random * 4)]
        //set value as this.color
        this.color = colors[iterator]
    }
}         

// class BOARD
class Board{
    constructor(){
    //own props:
        //players
        let players = [new Player(), new Player()]
        //player 1
        this.player1 = players[0]
        //player 2
        this.player2 = players[1]
        //player 2 difficulty/person
        this.player2Difficulty;
        //session score record
        this.sessionScore;
        //player 1 side
        this.player1Marker = "Ｏ";
        //player 2 side
        this.player2Marker = "Ｘ";
        //board
        this.board = [];
        //current player
        this.currentPlayer = this.player1;
        //next player
        this.nextPlayer// = this.player2;
        //forfeit button
        this.forfeit = null;
        //total turns
        this.turns = 0;

    }

    //method: clear the board and prompt for number of players
    initialScreen(){
        this.clearBoard();
        
        //append number of players buttons
        $('#board').append('<div id="menu" class="row"><div class="col-1"></div><div id="1-player" class="btn col btn-primary shadow rounded-0">One Player</div><div class="col-1"></div><div id="2-player" class="col btn btn-success rounded-0 shadow">Two Players</div><div class="col-1"></div></div>')
        //if number of players is 1
        $('#1-player').on('click',() => {
            $('#menu').empty();
            //append player 1 name input
            $('#menu').append('<input id="player-1-name" type="text" placeholder="Player One Name" class="rounded-0">')
            //append computer difficulty buttons
            $('#menu').append('<br><div class="col-1"></div><div id="easy" class="col btn btn-primary rounded-0">Easy</div><div class="col-1"></div><div id="difficult" class="col btn btn-success rounded-0">Difficult</div><div class="col-1"></div>')
            //start game based on difficulty
            $('#easy').on('click', () => {
                if($('#player-1-name').val()){
                    this.player1.getPlayerName('player-1-name')
                    this.player2.randomPlayerName("easy");
                    $('#menu').empty();
                    //this.easyGame();
                    this.makeBoard();
                }
            })
            $('#difficult').on('click', () => {
                if($('#player-1-name').val()){
                    this.player1.getPlayerName('player-1-name')
                    this.player2.randomPlayerName("difficult")
                    $('#menu').empty();
                    // this.difficultGame();
                    this.makeBoard();
                }
            })
            
        })

        //if number of players is 2
        $('#2-player').on('click',() => {
            $('#menu').empty();
            //append player 1 name input
            $('#menu').html('<input id="player-1-name" type="text" placeholder="Player One Name" class="rounded-0"><input id="player-2-name" type="text" placeholder="Player Two Name" class="rounded-0"><div id="start-game" class="btn btn-success shadow-lg rounded-0 m-10">Start</div>')
           console.log($('#start-game').html())
            //start 2 player game
            $('#start-game').on('click', (e) => {
                
                if($('#player-1-name').val() && $('#player-2-name').val()){
                    $('#menu').empty();
                    this.player1.getPlayerName('player-1-name');
                    this.player2.getPlayerName('player-2-name');
                    console.log(this.player1, "p1")
                    console.log(this.player2, "p2")
                    this.player2Difficulty = false;
                    //$('#menu').twoPlayerGame();
                    this.makeBoard();
                }else{
                    console.log($('#player-1-name').val(),$('#player-2-name').val())
                }
            })
            
            
        })    
        
            

    //method: get number of players and names
        //get input from html
    }
 

    //reset game when start button pressed
    resetGame(){
        console.log("reset")
        //append reset button
        $('#board').append(`
        <div class="row">
            <div id="same-players" class="col m-10 btn btn-warning rounded-0">Restart Game</div>
            <div id="new-players" class="col m-10 btn btn-warning rounded-0">Restart Game with New Players</div>
        </div>`)
        // $('#board').append('<div id="same-players" class="btn btn-warning rounded-0">Restart Game</div>')
        // $('#board').append('<div id="new-players" class="btn btn-warning rounded-0">Restart Game with New Players</div>')
        //on click
        // $('#same-players').on('click',this.makeBoard())
        $('#new-players').on('click', () => {
            $('.alert').remove();
            this.initialScreen();
        })
        $('#same-players').on('click', () => {
            $('.alert').remove();
            this.makeBoard()
        })   
    }
        

    //makeBoard
    makeBoard(){
        this.clearBoard();
        
        console.log(this.player1, "p1")
        console.log(this.player2, "p2")
        console.log(this.currentPlayer, "current")
        console.log(this.nextPlayer, "next")
        // make an array of new Places, 3x3
            this.board = [];
            let boardDiv = $('#board')
            let counter = 1;
            //loop through rows y
            for(let i = 0; i < 3; i++){
                let rowDiv = `<div id="row${i}" class="row border-bottom border-dark border-3"></div>`
                boardDiv.append(rowDiv)
                //loop through columns x
                let cols = [];
                if(i==2){
                    $('#row3').toggleClass('border-bottom border-dark border-3')
                    console.log($('#row3'))
                }
                for(let j = 0; j < 3; j++){
                    console.log(counter)
                    //push new Place and pass in x and y
                    let cardDiv = `<div id="clickable${counter}" class="square col-4 btn btn-secondary align-middle rounded-0 border-0 y-${i+1} x-${j+1} clickable col-lg border-end border-dark border-5">
                                        <h1 id="x${j}y${i}" class="display-1 text-secondary opacity-1">⬞</h1>
                                    </div>`
                    
                    $(`#clickable${counter}`).html(``)
                    cols.push("")
                    $(`#row${i}`).append(cardDiv)
                    if(j==3){
                        $(`#clickable${counter}`).toggleClass("border-end border-dark border-5");
                    }
                    /*$(`#clickable${counter}`).hover(() => {
                        console.log("hover")
                        if(!this.board[i][j]){
                            console.log(i,j)
                            console.log("hide")
                            $(`#x${j}y${i}`).hide()
                        }
                    }, () => {
                        $(`#x${j}y${i}`).show()
                    })*/
                    $(`#clickable${counter}`).on("click", (e) => {
                        let titleMarker = `<h1 id="x${j}y${i}" class="display-1">${this.currentPlayer.marker}</h1>`;
                        console.log("click", e)
                        console.log(e.currentTarget.id)
                        let txt = $(`#${e.currentTarget.id}`)
                        if(!this.board[i][j]){
                            this.turns++
                            console.log(txt.children())
                            txt.html(titleMarker)
                            txt.toggleClass(`btn-secondary ${this.currentPlayer.color}`)
                            this.board[i][j]=this.currentPlayer.marker;
                            console.table(this.board)
                            if(this.turns >= 5){
                                this.checkForWinner(this.currentPlayer)
                                this.checkDraw();
                            }else{
                                console.log(5-this.turns,"more turns until checking for winner")
                                this.setTurn(this.currentPlayer)
                            }
                        }
                    })
                    counter++
                
                  
                }
                this.board.push(cols);
            }
            this.currentPlayer = this.randomPlayer();
            console.log(this.board);
            // this.currentPlayer = this.player1;
            // this.nextPlayer = this.player2;
            this.randomPlayer();
            $('#page').toggleClass(`bg-dark ${this.currentPlayer.color}`)
            $('#whose-turn').html(`<h1>${this.currentPlayer.name}'s turn</h1>`)
            // case this.board[0][0]==this.board[2][2]:
            //     case this.board[2][0]==this.board[0][2]:
            let diag1 = ['clickable1','clickable5','clickable9']
            let diag2 = ['clickable3','clickable5','clickable7']
            diag1.map(id => $(`#${id}`).toggleClass('diag-1'))
            diag2.map(id => $(`#${id}`).toggleClass('diag-2'))
            
    }

    //set turn to next player and display in Nav Bar
    setTurn(startingPlayer){
        console.log(startingPlayer)
        if(this.currentPlayer === undefined){
            this.currentPlayer = this.player1;
            this.nextPlayer = this.player2;
        }
        this.currentPlayer = (startingPlayer.name == this.player1.name) ? this.player2 : this.player1;
        console.log(`Switched current player to ${this.currentPlayer.name}`)
        this.nextPlayer = (startingPlayer.name == this.player1.name) ? this.player1 : this.player2;
        console.log(`Switched next player to ${this.nextPlayer.name}`)
        $('#whose-turn').html(`<h1>${this.currentPlayer.name}'s turn</h1>`)
        if($('#page').hasClass('bg-dark')) $('#page').removeClass('bg-dark');
        $('#page').toggleClass(`${this.currentPlayer.color} ${this.nextPlayer.color}`)
        console.log(`Turn set: ${this.currentPlayer.name}
        color: ${this.currentPlayer.color}`)
    }

    winnerAlert(boolArrays){ //takes nested arrays of boolean values to 
        let winningLines = [ [], [],[] ];  //first array is row/col number, second array is for row/col/diag
        let winningString = `${this.currentPlayer.name} won with:<br>`
        let color = this.currentPlayer.color.split('-')
        for(let i = 0; i < boolArrays.length; i++){
            let index = boolArrays[i].indexOf(true)
            if(index > -1){
                winningLines[0].push(index)
                switch (i){
                case 0:
                    winningLines[1].push("row")
                    winningLines[2].push(`y-${index+1}`)
                    break;
                case 1:
                    winningLines[1].push("column")
                    winningLines[2].push(`x-${index+1}`)
                    break;
                case 2:
                    winningLines[1].push("diagonal")
                    winningLines[2].push(`diag-${index+1}`)
                    
                    break;
                }
            }    
        }
        
        if(winningLines[0].length > 0){
            console.log(winningLines[0])
            for(let j = 0; j < winningLines[0].length; j++){
                winningString += `3-in-a-row on ${winningLines[1][j]} ${winningLines[0][j]+1}<br>`
                console.log(winningLines[2][j])
                this.winnerRow(winningLines[2][j])
            }
            $('#board').find('.clickable').off('click')
            // $('#board').before(`<h1 class="center-text">${winningString}</h1>`)
            $('#board').before(`<div class="alert alert-${color[1]} rounded-0" role="alert">
           ${winningString}
          </div>
          `)
          
        }
    }
    
    //toggles danger class, takes type(row, col, diag) and index(0,1,2)
    winnerRow(targetClass){
        let target =  $(`.${targetClass}`).get();
        console.log(target)
        target.map(element => {
            console.log($(element))
            if($(element).hasClass('bg-danger')==false){
                $(element).toggleClass("bg-danger")
                console.table(element)
                console.log("changing background for", targetClass)
            }
        })
        
        $('#whose-turn').html(`<h1>${this.currentPlayer.name} has won!</h1>`)
        
    }

    checkForWinner(){
        console.log("checking for winner")
        let checkWinningRow = [false, false, false];
        let checkWinningCol = [false, false, false];
        let checkWinningDiagonal = [false, false] // top left to bottom right, top right to bottom left
        let hasWinner = false;
    
        let indexOfWinningRows = [];
        let indexOfWinningCols = [];
        let columns = [
            [],
            [],
            []
        ];
       
            this.board.map((row, index) => {
                console.log(row);
                let rowSetSizeShouldBeOne = new Set(row);
                console.log(rowSetSizeShouldBeOne)
                
                for(let i = 0; i < 3; i++){
                    columns[i].push(row[i])
                }
                
                if(index == 2){
                    for(let j = 0; j < 3; j++){
                        let colSetSizeShouldBeOne = new Set(columns[j])
                        if(colSetSizeShouldBeOne.size == 1 && colSetSizeShouldBeOne.has("")==false){ 
                            checkWinningCol[j] = true;
                            indexOfWinningCols.push(j);                        
                            console.log("column:", j+1)
                            hasWinner = true;
                        }
                    }
                }
                
                if(rowSetSizeShouldBeOne.size == 1 && rowSetSizeShouldBeOne.has("")==false){ 
                    checkWinningRow[index] = true;
                    indexOfWinningRows.push(index)                
                    console.log("row:", index+1)
                    hasWinner = true;
                }
            })
            console.log(columns)
       //check columns
       //check diagonals
            switch (true){
                case this.board[0][0]==this.board[2][2]:
                case this.board[2][0]==this.board[0][2]:
                    if(this.board[1][1]!=""){
                        if(this.board[0][0]==this.board[1][1] && this.board[1][1]== this.board[2][2]){
                            checkWinningDiagonal[0] = true;
                           hasWinner = true;
                            console.log("diag: top left to bottom right")
                        }
                        if(this.board[2][0]==this.board[1][1] && this.board[1][1]== this.board[0][2]){
                            checkWinningDiagonal[1] = true;
                            hasWinner = true;
                            console.log("diag: top right to bottom left")
                        }
                    }
                    break;
            }
    
            console.log("finished")
            console.table(checkWinningRow)
            console.table(checkWinningCol)
            console.table(checkWinningDiagonal)
    
            if(hasWinner){
                this.resetGame()
                return this.winnerAlert([checkWinningRow, checkWinningCol,checkWinningDiagonal],this.currentPlayer)

            }else if(!this.forfeit){
                return this.setTurn(this.currentPlayer)
            }else{
                let draw = this.checkDraw();
                if(draw){
                    this.resetGame();
                    return "draw"
                }else{
                    return this.winnerAlert([[],[],[]],this.currentPlayer)
                }
            } 
    }

    clearBoard(){
        $(`#board`).empty()
    }

    checkDraw(){
        console.log("checking for draw")
        let check = !this.board.some(row => row.some(spot => spot == ""))
        console.log(check)
        if(check) {
            $('#whose-turn').html(`<h1>Draw!</h1>`)
            $('#page').toggleClass(`${this.currentPlayer.color} bg-secondary`)
        }
        return check
        
        // for(let row of this.board){
        //     if(hasLeft){
        //         break;
        //     }
        //     for(let spot of row){
        //         if(spot !== ""){
        //             hasLeft = true
        //             break
        //         }
        //     }
        // }
        // return hasLeft;
    }

    randomPlayer(){
        if(Math.floor(Math.random() * 2) > 0){
            return this.player1;
        }else{
            return this.player2;
        }
        
    }
}

//class Place
    //takes column and row
    //has properties:
        //marker = ""
        //row
        //column

// class Place {
//     constructor(col, row){
//         this.marker = "";
//         this.row = row;
//         this.col = col;
//         this.id = `x${col}y${row}`
//     }
// }
        

// class TwoPlayerGame
    //takes playerOne, playerTwo, board

    //own props


// class EasyGame

// class HardGame
    
//DOM
function drawDOM(){
    let turn = $('#whose-turn')
    turn.text("Player 1's turn")
}

let game = new Board();
game.initialScreen();


// $(".clickable").each((e, )=>{
//     console.log("Next Square")
//      $(this).toggleClass("hover");
     
//      $(this).click((e) => {
//         let txt = $(this).find("h1").id
//         console.log(txt)
//         console.log("clicked",  $(this))
//         if(txt == markerBlank){
//             console.log('blank 1')
//         }
//         if(txt != "X" && txt != "O"){
//             console.log(txt)
//             $(this).find("h1").toggleClass("bg-danger")
//             $(this).find("h1").text("X");
//             $(this).toggleClass("bg-danger")
//             game.setTurn(game.currentPlayer)
//         }

//     })
//     console.log( $(this))
// })



let btn = $('#forfeit')
btn.click((e) => {
    console.log("Forfeit button clicked")
    $('#board').find('.clickable').off('click')
    $('#board').before(`<h1 class="center-text">${game.currentPlayer.name} has forfeited<br>${game.nextPlayer.name} wins!</h1>`)
    game.resetGame();
    
})


const temp = [
    [
        ["x","o","-"],
        ["o","x","-"],
        ["o","o","o"]
    ],
    [
        ["o","o","-"],
        ["x","x","-"],
        ["o","o","o"]
    ],
    [
        ["x","o","o"],
        ["o","x","-"],
        ["o","o","x"]
    ],
    [
        ["x","o","x"],
        ["o","x","-"],
        ["x","o","x"]
    ],
    [
        ["x","x","x"],
        ["o","x","-"],
        ["x","-","x"]
    ]
]

// for(let next = 0; next < temp.length;next++){
//     checkForWinner(temp[next],names[next])
// }


// let obj = {
//      'Sally':0,
//  'Tom':0,
//   'Huck':0,
//    'Judge':0,
//     'Jim':0,
//      'Polly':0,
//       'Joe':0
//      }


// let obj2 = {
//     "easy":0,
//     "difficult":0
// }
// let test = new Player();
// let hard = ["easy","difficult"]
// let array = [];
// for(let y = 0;y< 20000;y++){
//     let rand = Math.floor(Math.random() * 2)
//     let rand2 = hard[rand]
//     array.push(test.randomPlayerName(rand2))
//     for(let key in obj){
//         if(array[y]==key){
//             obj[array[y]] += 1;
//         }
//     }
//     for(let key2 in obj2){
//         if(hard[rand]==key2){
//             obj2[hard[rand]] += 1;
//         }
//     }
// }

// console.log(new Set(array))
// console.log(obj)
// console.log(obj2)