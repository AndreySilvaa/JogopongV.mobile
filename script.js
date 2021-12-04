//elementos
var dvjogador, dvcpu, dvbola, dvinicia

//posição
var posjogadorX, posjogadorY, posbolaX, posbolaY, poscpuX, poscpuY

//posição inicial
var posInijogX=130, posInijogY=435, posInibolaX=170, posInibolaY=290
var posInicpuX=130, posInicpuY=100

//direção jogador
var djogX

//direção
var dcpuX, dbolaX, dbolaY

//velocidade
var velbola, velcpu, veljogador

//tamanhos
var barraW=100, barraH=20, bolaW=20, bolaH=20, campoW=360, campoH=420

//frames
var frames

//controles
var pontoscpu, pontosjogador,  nivel, btesquerda, btdireita, jogo = false

//Movendo o jogador

function movedireita(){
    djogX = 1
}

function moveesquerda(){
    djogX = -1
}

function saiu(){
    djogX = 0
}


function controlajogador(){
    posjogadorX += veljogador*djogX

    if(posjogadorX <= 5){
        posjogadorX += veljogador*djogX *(-1)
    } else if(posjogadorX+(barraW) > campoW+4){
        posjogadorX += veljogador*djogX *(-1)
    }
    dvjogador.style.left = posjogadorX+'px'
}

// Movimentação da bola

function movebola(){
    posbolaY += velbola*dbolaY
    posbolaX += velbola*dbolaX

    //Batida na barra do jogador
    if(posbolaY+(bolaH) >= posjogadorY+60 && posbolaX < posjogadorX+(barraW) && posbolaX+(bolaW) > posjogadorX){
        dbolaX = (((posbolaX+(bolaW/2)) - (posjogadorX+(barraW/2)))/22)
                        //180                  180
        dbolaY = -1
    }




    // Batida da bola nas laterais do campo

    if(posbolaX+(bolaW) >= campoW+5 || posbolaX < 5){
        dbolaX *= -1
    }

    dvbola.style.top = posbolaY+'px'
    dvbola.style.left = posbolaX+'px'
}
// Controle do jogo
function game(){
    if(jogo){
        controlajogador()
        movebola()
    }

    frames = requestAnimationFrame(game)
}

function inicia(){
    if(!jogo){
        jogo = true
        cancelAnimationFrame(frames)
        velbola = veljogador = 4
        posjogadorX = posInijogX
        posjogadorY = posInijogY
        djogX = 0
        posbolaY = posInibolaY
        posbolaX = posInibolaX
        dbolaX = 0

        if(Math.random()*10 < 5){
            dbolaY = 1
        } else{
            dbolaY = -1
        }

        game()
    }
}

function inicializa(){
    dvjogador = document.getElementById('dvjogador')
    dvcpu = document.getElementById('dvcpu')
    dvbola = document.getElementById('dvbola')
    dvinicia = document.getElementById('dvinicia')
    dvinicia.addEventListener('click', inicia)
    btdireita = document.getElementById('dvdireita')
    btdireita.addEventListener('mousedown', movedireita)
    btdireita.addEventListener('mouseup', saiu)
    btesquerda=document.getElementById('dvesquerda')
    btesquerda.addEventListener('mousedown', moveesquerda)
    btesquerda.addEventListener('mouseup', saiu)
}

window.addEventListener('load', inicializa)