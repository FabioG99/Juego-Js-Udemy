function ResetTime (){
    //Agregamos clearInterval el cual es metodo que se utiliza para  deterner el bucle cronometrado
    // el cual se inicio con el metodo setInterval.
    clearInterval(cronometer);
}

function StarTime(){

    Seconds = 0;
    s = document.getElementById("seconds");
    m = document.getElementById("minutes");

    // Agregamos setInterval la cual nos permite ejecutar una instruccion
    //indefinidamente cada un cierto periodo de tiempo.
    cronometer = setInterval(function(){
        Seconds++;

        secs = Seconds;
        mins = 0;
        //80seg -> 1min 20seg
        while (secs >= 60){
            mins++;
            secs -= 60;
        }
        // Agregamos innerHTML para que ingrese al html y modfique lo que esta ahi y 
        // ingrese el valor que le estamos dando directamente desde el JS.
        if ( mins < 10 ) m.innerHTML = "0" + mins;
        else m.innerHTML = mins;
        if ( secs < 10 ) s.innerHTML = "0" + secs;
        else s.innerHTML = secs;

        // Agregamos las variables globales y las actualizamos para ciertas funcionalidades
        // del programa.

        Total_secs = secs;
        Total_mins = mins;

    },1000);
}