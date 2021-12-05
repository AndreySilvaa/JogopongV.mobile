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
var pontoscpu, pontosjogador, btesquerda, btdireita, jogo = false

//Movimentação do jogador

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

// Movimentação da CPU
function controlacpu(){
    if(posbolaY < posInibolaY && dbolaY < 0){
        // Mover para esquerda
        if(posbolaX+(bolaW/2) < poscpuX+(barraW/2) && poscpuX > 5){
            poscpuX -= velcpu
        }

        // Mover para direira
        if(posbolaX+(bolaW/2) > poscpuX+(barraW/2) && poscpuX+(barraW) < 365){
            poscpuX += velcpu
        }
    }else if(posbolaY < posInibolaY && dbolaY > 0){
        if(poscpuX < posInicpuX){
            poscpuX += velcpu
        }else if(poscpuX > posInicpuX){
            poscpuX -= velcpu
        }
    }

    dvcpu.style.left = poscpuX+'px'
}

// Nível da CPU
function nivel(n){
    if(n == 3.5){
        document.getElementById('facil').style.filter = 'brightness(1.4)'
        document.getElementById('normal').style.filter = 'brightness(1.0)'
        document.getElementById('dificil').style.filter = 'brightness(1.0)'
        document.getElementById('facil').style.boxShadow = '0px 0px 3px 0px rgb(255, 255, 255)'
        document.getElementById('normal').style.boxShadow = '0px 0px 3px 0px black'
        document.getElementById('dificil').style.boxShadow = '0px 0px 3px 0px black'
    } else if(n == 5){
        document.getElementById('facil').style.filter = 'brightness(1.0)'
        document.getElementById('normal').style.filter = 'brightness(1.4)'
        document.getElementById('dificil').style.filter = 'brightness(1.0)'
        document.getElementById('facil').style.boxShadow = '0px 0px 3px 0px black'
        document.getElementById('normal').style.boxShadow = '0px 0px 3px 0px rgb(255, 255, 255)'
        document.getElementById('dificil').style.boxShadow = '0px 0px 3px 0px black'
    } else if(n == 7){
        document.getElementById('facil').style.filter = 'brightness(1.0)'
        document.getElementById('normal').style.filter = 'brightness(1.0)'
        document.getElementById('dificil').style.filter = 'brightness(1.4)'
        document.getElementById('facil').style.boxShadow = '0px 0px 3px 0px black'
        document.getElementById('normal').style.boxShadow = '0px 0px 3px 0px black'
        document.getElementById('dificil').style.boxShadow = '0px 0px 3px 0px rgb(255, 255, 255)'
    }
    velcpu = n
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

    //Batida na barra da cpu
    if(posbolaY <= poscpuY+(barraH) && posbolaX+(bolaW) > poscpuX && posbolaX < poscpuX+(barraW)){
        dbolaY = 1
    }


    // Batida da bola nas laterais do campo

    if(posbolaX+(bolaW) >= campoW+5 || posbolaX < 5){
        dbolaX *= -1
    }

    // Fim de jogo

    if(posbolaY > 500){
        posbolaY = posInibolaY
        posbolaX = posInibolaX
        posjogadorX = posInijogX
        poscpuX = posInicpuX

        dvjogador.style.left = posjogadorX+'px'
        dvcpu.style.left = poscpuX+'px'
        pontoscpu++
        document.getElementById('pontoscpu').innerHTML = pontoscpu

        jogo = false
    }else if(posbolaY < 95){
        posbolaY = posInibolaY
        posbolaX = posInibolaX
        posjogadorX = posInijogX
        poscpuX = posInicpuX

        dvjogador.style.left = posjogadorX+'px'
        dvcpu.style.left = poscpuX+'px'
        pontosjogador++
        document.getElementById('pontosjogador').innerHTML = pontosjogador

        jogo = false
    }

    dvbola.style.top = posbolaY+'px'
    dvbola.style.left = posbolaX+'px'
}
// Controle do jogo
function game(){
    if(jogo){
        controlajogador()
        movebola()
        controlacpu()
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

        poscpuY = posInicpuY
        poscpuX = posInicpuX
        //dcpuX = 0
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
    btdireita.addEventListener('touchstart', movedireita)  //mousedown
    btdireita.addEventListener('touchend', saiu)           //mouseup
    btesquerda=document.getElementById('dvesquerda')
    btesquerda.addEventListener('touchstart', moveesquerda)
    btesquerda.addEventListener('touchend', saiu)
    pontoscpu = 0
    pontosjogador = 0
    velcpu = 5
}

window.addEventListener('load', inicializa)