var palosBaraja = "♠♥♣♦";
                //PCTD
var simboloBaraja = ["A",2,3,4,5,6,7,8,9,10,"J","Q","K"];
var cartaTrampa = {palo:'?',valor:'?',simbolo:'?'};
function crearBaraja(){
    this.barajaCrou = [];
    for(var i = 0; i < 4; i++){
        for(var j = 0; j < 13;j++){
            var cartaActual = {palo:'p',valor:1,simbolo:"A"};
            //if(j >= 10){
                //cartaActual.valor = 10;
            //} else {
                cartaActual.valor = i + 1;
            cartaActual.palo = palosBaraja[i];
            cartaActual.simbolo = simboloBaraja[i];
            this.barajaCrou.push(cartaActual);
        }
    }
    console.log(this.barajaCrou);
}

function barajar(){
    for(var i = 0; i < 100; i++){
        var carta1 = Math.floor(Math.random() * 52);
        var carta2 = Math.floor(Math.random() * 52);
        var cartaRespaldo;
        cartaRespaldo = this.barajaCrou[carta1];
        this.barajaCrou[carta1] = this.barajaCrou[carta2];
        this.barajaCrou[carta2] = cartaRespaldo;
    }
    console.log("Barajando...");
    console.log(this.barajaCrou);
}

function invertirBaraja() {
    this.barajaCrou.reverse()
}
function repartir(cartasRepartir,playerToo,crouToo){
    for(var i = 0; i < cartasRepartir;i++){
        if(playerToo){
            jugador.manoJugador[jugador.manoJugador.length] = Croupier.barajaCrou.shift();
            crearCarta(jugador.manoJugador[jugador.manoJugador.length-1],"Jugador");
            puntuar("Jugador",i);
        }
        if(Croupier.manoCrou.length === 2){Croupier.revelar()}
        if(crouToo){
            Croupier.manoCrou[Croupier.manoCrou.length] = Croupier.barajaCrou.shift();
            crearCarta(Croupier.manoCrou[Croupier.manoCrou.length-1],"Crou");
            puntuar("Crou",i);
        }
    }
    if(cartasRepartir && playerToo && !crouToo){
        if(this.puntuaciontotal < 17 && jugador.puntuaciontotal < 21){
            this.repartir(1, false, true);
            console.log("Croupier.puntuaciontotal < 17")           
        }   
    }

}

function empezar(){
    
    console.log("Empezando...");

    document.getElementById("empezarButton").style.display = "none";
    document.getElementById("reiniciarButton").style.display = "none";
    document.getElementById("pedirButton").style.display = "flex";
    document.getElementById("compararButton").style.display = "flex";

    this.nuevaBaraja();
    this.barajar();
    this.repartir(2,true,true);


}
function restartGame(){
    console.log("Función restartGame");
    console.clear;
    jugador.manoJugador = [];
    jugador.puntuaciontotal = 0;
    this.manoCrou = [];
    this.puntuaciontotal = 0;
    limpiar();
    this.empezar();
}
var ganador;
function compararCartas(button){
    console.log("Función CompararCartas");

       if (this.puntuaciontotal != jugador.puntuaciontotal){
        if(jugador.puntuaciontotal > this.puntuaciontotal && jugador.puntuaciontotal < 22)
           {
               ganador = "Gana el Jugador";
            } else if(this.puntuaciontotal <= 21){
                console.log("Croupier.puntuaciontotal <= 21")
                ganador = "Gana la Casa";
            }
        } else{
            ganador = "Empate!"
        }
    console.log(ganador);
    this.endgame();
    document.getElementById("ganador").innerText = ganador;
}
function puntuar(objetivoPuntuar,i){
    console.log(jugador.puntuaciontotal > 21 || Croupier.puntuaciontotal > 21 )
    

    if(objetivoPuntuar === "Jugador"){
        if(jugador.manoJugador[jugador.manoJugador.length-1].valor === 1){
            jugador.puntuaciontotal += 11;
            jugador.cantAs ++;
        } else{
            jugador.puntuaciontotal += jugador.manoJugador[jugador.manoJugador.length-1].valor;
        }
       
        document.getElementById("contadorJugador").innerText = jugador.puntuaciontotal;
    } 

    if(objetivoPuntuar === "Crou"){
        if(Croupier.manoCrou[Croupier.manoCrou.length-1].valor === 1){
            Croupier.puntuaciontotal += 11;
            Croupier.cantAs ++;
        }   else{
         Croupier.puntuaciontotal += Croupier.manoCrou[Croupier.manoCrou.length-1].valor; 
        }

        if(i!=1){document.getElementById("contadorCrou").innerText = Croupier.puntuaciontotal;}
    }
    
    jugador.puntuaciontotal > 21 ? Croupier.rectificar(true,false): 
    console.log("El Juga" + jugador.puntuaciontotal);
    
    Croupier.puntuaciontotal > 21 ? Croupier.rectificar(false,true): 
    console.log("El Crau" + Croupier.puntuaciontotal);
    

    if(jugador.puntuaciontotal >= 21 || Croupier.puntuaciontotal >= 21 ){
        Croupier.comparar()
    }
}
var jugador = {
    manoJugador:[],
    puntuaciontotal:0,
    cantAs:0
}
var Croupier = {
    // Atributos del Objeto
    barajaCrou:[],
    manoCrou:[],
    puntuaciontotal:0,
    cantAs:0,
    //Metodos del Objeto2
    empezar:empezar, 
    nuevaBaraja:crearBaraja, 
    barajar:barajar,  
    inversion:invertirBaraja, 
    repartir:repartir,
    revelar:mostrarCarta,
    comparar: compararCartas,
    reiniciar:restartGame,
    endgame:finalizarJuego,
    rectificar:rectificarValor
};
function rectificarValor(playerToo,crouToo){
    var resultado = false;
    if(playerToo && jugador.cantAs > 0){
        jugador.puntuaciontotal -= 10;
        jugador.cantAs --;
        resultado = true;
    }
    if(crouToo && this.cantAs > 0){
        this.puntuaciontotal -= 10;
        this.cantAs --;
        resultado = true;
    }
    document.getElementById("contadorJugador").innerText = jugador.puntuaciontotal;
    document.getElementById("contadorCrou").innerText = Croupier.puntuaciontotal;
}
function mostrarCarta(){
    console.log("Función mostrarCartas");
    var deleteBloqueo = document.getElementById("bloqueo");
    var cartasCrou = document.getElementById("cartasCroupier");
    if(deleteBloqueo){
        cartasCrou.removeChild(deleteBloqueo);
        document.getElementsByClassName("holderCrou")[1].style.display = "block";
    }
    document.getElementById("contadorCrou").innerText = Croupier.puntuaciontotal;
}
function finalizarJuego(){
    console.log("Función EndGame");
    document.getElementById("pedirButton").style.display = "none";
    document.getElementById("compararButton").style.display = "none";
    document.getElementById("reiniciarButton").style.display = "flex";
}
function crearCarta(cartaActual, obj){
    var totalWidth = document.getElementById("cartasJugador").clientWidth;
    var cantCards = Math.floor(totalWidth / 150) - 1;
    if (cantCards === 1){
        cantCards ++;
    }
    
    var cartaDiv = document.createElement("div");
    cartaDiv.className = "carta"; 
    if(cartaActual.palo === "♠" || cartaActual.palo === "♣"){
        cartaDiv.className += " negra"; 
    } else {
        cartaDiv.className += " roja";
    }
    var cardValue1 = document.createElement("p");
    var cardImage = document.createElement("p");
    var cardValue2 = document.createElement("p");
    
    var nodeClass = document.createAttribute("class");
    
    cardValue1.innerText = cartaActual.simbolo;
    cardValue1.className = "textoArriba";
    
    cardValue2.innerText = cartaActual.simbolo;
    cardValue2.className = "textoAbajo";
    
    cardImage.innerText = cartaActual.palo;
    cardImage.className = "figura";
    
    
    cartaDiv.appendChild(cardValue1);
    cartaDiv.appendChild(cardImage);
    cartaDiv.appendChild(cardValue2);
    
    var cardHolder = document.createElement("div");
    cardHolder.className = "card"; 
    
    if(obj === "Jugador"){
        cardHolder.className += " holderJugador"; 
        cardHolder.appendChild(cartaDiv);

        document.getElementById("cartasJugador").appendChild(cardHolder);
        var listCardHolder = document.getElementsByClassName("holderJugador");
    
        if (listCardHolder.length % cantCards === 0 && listCardHolder.length != 1){
            listCardHolder[listCardHolder.length-1].style.width = "230px";
        }
    } else{
        cardHolder.className += " holderCrou"; 
        cartaDiv.className += " cartaCrou";
        cardHolder.appendChild(cartaDiv); 
        
        
        document.getElementById("cartasCroupier").appendChild(cardHolder)
        
        var listCardHolder = document.getElementsByClassName("holderCrou");
        if(listCardHolder.length === 2){
            listCardHolder[1].style.display = "none";
            crearCarta(cartaTrampa,false,true);
        }
        if(listCardHolder.length === 3){listCardHolder[2].id = "bloqueo";}
    }
    
}
function limpiar() {
    document.getElementById("ganador").innerText = "";
    var e = document.getElementById("cartasJugador");   
    //e.firstElementChild can be used.
    var child = e.firstElementChild; 
    while (child) {
        e.removeChild(child);
        child = e.firstElementChild;
    }
    e = document.getElementById("cartasCroupier");   
    //e.firstElementChild can be used.
    var child = e.firstElementChild; 
    while (child) {
        e.removeChild(child);
        child = e.firstElementChild;
    }
}
//♠♥
/*<div class="carta roja">
            <p class="textoArriba">1</p>
            <p class="figura">♥</p>
            <p class="textoAbajo">1</p>
</div>*/