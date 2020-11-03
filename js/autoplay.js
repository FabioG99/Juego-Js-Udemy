// se crean variables globales para poderlas utilizar en cualquier parte.
var Total_secs;
var Total_mins;
var cronometer; 

var Moves_Required;
var Moves;
var Options;
var Bonus;

var Level = 1;
var Lifes = 1;
var Level_Moves;
var Next_Level = false;


var board = new Array(8);

//creamos las variables las cuales llevaran un control del cual
//es la ultima posición que estamos ocupando.
var CellSelected_x;
var CellSelected_y;
var CheckCell_Required;

//funcion que comprobara si ya se ha terminado la partida con victoria 
function Check_SuccessfullEnd(){

    SuccessfullEnd = true;
    if (Moves > 0) SuccessfullEnd = false;
    if (SuccessfullEnd) ShowMessage ("YOU WIN!", "Next Level", false);

}
//funcion de game over
function Check_GameOver(x, y){
    Options = 0;

    Check_Moves(x, y, 1, 2); //check move right - top long
    Check_Moves(x, y, 2, 1); //check move right long - top
    Check_Moves(x, y, 1, -2); //check move right - bottom long
    Check_Moves(x, y, 2, -1); //check move right long - bottom long

    Check_Moves(x, y, -1, 2); //check move left - top long
    Check_Moves(x, y, -2, 1); //check move left long - top
    Check_Moves(x, y, -1, -2); //check move left - bottom long
    Check_Moves(x, y, -2, -1); //check move left long - bottom long


    document.getElementById("options").innerHTML = Options;
    if (!Options){
        if (Bonus) CheckCell_Required = false;
        else ShowMessage ("GAME OVER!", "Try Again!", true);
    } 
}
function Check_Moves(x, y, mov_x, mov_y){
    option_x = x + mov_x;
    option_y = y + mov_y;

    if (option_x < 8 && option_y < 8 && 
        option_x >= 0 && option_y >= 0){

        if(board[option_x][option_y] == 0 || 
            board[option_x][option_y] == 2 ) Options++;

    }
}

// funcion de control de movimientos.
function SelectCell(x, y){

    //restamos movimientos
    Moves--; 
    document.getElementById("moves").innerHTML = Moves;

    Grow_MeterBonus();
    
    PaintCell(CellSelected_x, CellSelected_y, "black");
    PaintHorseCell(x, y, "green");

    if (board[x][y] == 2 ){
        Bonus++;
        document.getElementById("bonus").innerHTML = "+" + Bonus;
    }
    board [x][y] = 1;
    CellSelected_x = x;
    CellSelected_y = y;
    CheckCell_Required = true;

    Check_SuccessfullEnd();
    Check_GameOver(x, y);
    Check_newBonus();


}
//funcion que me mostrara cuanto faltara para el bonus.
function Grow_MeterBonus(){
/*
    1-0         9-8        17-16
      8*0         8*1         8*2
        1/8         9/8         17/8
*/
    moves_done = Level_Moves - Moves;
    bonus_done = Math.floor( moves_done / Moves_Required );
    moves_rest = Moves_Required * bonus_done;
    bonus_grow = moves_done - moves_rest;

    width_meter = bonus_grow * 168 / Moves_Required;

    document.getElementById("meter_bonus").style.width =  width_meter + "px";
}
function Check_newBonus(){
    if (( Level_Moves - Moves ) % Moves_Required == 0){
        //buscar una casilla al azar para poner el bonus

        Bonus_Cell = false;
        while (Bonus_Cell == false){

            Bonus_Cell_x = Math.round(Math.random() * 7);
            Bonus_Cell_y = Math.round(Math.random() * 7);

            if (board[Bonus_Cell_x][Bonus_Cell_y] == 0)
                Bonus_Cell = true;
              
        }

        //en el board [][] = 2
        board[Bonus_Cell_x][Bonus_Cell_y] = 2;
        //pintarla con el bonus 
        PaintBonusCell(Bonus_Cell_x, Bonus_Cell_y);

        
    }
}
function CheckCell (x, y){
    CheckTrue = true;
    if (CheckCell_Required){
        //creamos variable que nos indique si ha pasado el chequeo.
        CheckTrue = false;
        //creamos dos variables que nos indiquen la diferencia que hay en el eje 'x' y el eje 'y'
        dif_x = x - CellSelected_x;
        dif_y = y - CellSelected_y;

        if(dif_x == 1 && dif_y == -2) CheckTrue = true; // right - bottom long
        if(dif_x == 2 && dif_y == -1) CheckTrue = true; // right long - bottom
        if(dif_x == 1 && dif_y == 2) CheckTrue = true; // right - top long
        if(dif_x == 2 && dif_y == 1) CheckTrue = true; // right long - top

        if(dif_x == -1 && dif_y == -2) CheckTrue = true; //left - bottom long
        if(dif_x == -2 && dif_y == -1) CheckTrue = true; //left long - bottom
        if(dif_x == -1 && dif_y == 2) CheckTrue = true; //left - top long
        if(dif_x == -2 && dif_y == 1) CheckTrue = true; //left long - top
    }
    else{
        if (board [x][y] == 0 || board [x][y] == 2){
            Bonus--;
            document.getElementById("bonus").innerHTML = "+" + Bonus;
            if ( Bonus == 0 ) document.getElementById("bonus").innerHTML = "";

            
        }
    }
    //en la posicion actual hara que no  se regrese a la anterior posicion.
    if(board[x][y] == 1) CheckTrue = false;

    if (CheckTrue) SelectCell(x,  y);
    
}

function autoplay(){

    setLevel_Parameters();


    for ( i = 0; i < 8; i++) board[i] = new Array(8);

    ClearBoard();
    setBoard();

    ResetTime();
    setTimeout ("StarTime()", 2000);

    First_Position = false;
    while( First_Position == false){ 

        x = Math.round(Math.random()*7);
        y = Math.round(Math.random()*7);
        if (board[x][y] == 0 ) First_Position = true;
    }
    CellSelected_x = x;
    CellSelected_y = y;

    SelectCell (x, y);
}
autoplay ();

// valores de cada casilla 
// 0 = vacia
// 1 = ocupada
// 2 = bonus