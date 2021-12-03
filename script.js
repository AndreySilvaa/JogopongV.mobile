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
    dvjogador.style.left = posjogadorX+'px'
}

// Controle do jogo
function game(){
    if(jogo){
        controlajogador()
    }

    frames = requestAnimationFrame(game)
}

function inicia(){
    if(!jogo){
        jogo = true
        cancelAnimationFrame(frames)
        veljogador = 4
        posjogadorX = posInijogX
        posjogadorY = posInijogY
        djogX = 0

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
    btdireita.addEventListener('mouseover', movedireita)
    btdireita.addEventListener('mouseout', saiu)
    btesquerda=document.getElementById('dvesquerda')
    btesquerda.addEventListener('mouseover', moveesquerda)
    btesquerda.addEventListener('mouseout', saiu)
}

window.addEventListener('load', inicializa)