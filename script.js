/**En esta oportunidad, estoy programando un típico juego de "Simon says"
   o "Simón dice". El mismo consiste en memorizar una serie de patrones
   de "luces" (que en realidad son colores cambiados) y replicarlos para
   poder ganar. Fallar en uno de estos patrones, automáticamente te hace
   perder el juego.*/

// Comenzamos declarando las variables que vamos a utilizar a nivel global

const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const btnEmpezar = document.getElementById('btnEmpezar')
const FINAL_LEVEL = 10

// Declaramos la clase a utilizar, y todos sus métodos

class Juego {

    constructor() {
        this.inicializar()
        this.generarSecuencia()
        setTimeout(this.nextLevel, 500)
    }
    
    inicializar() {
        this.nextLevel = this.nextLevel.bind(this)
        this.elegirColor = this.elegirColor.bind(this)
        this.toggleBtnEmpezar()
        this.level = 1
        this.colores = {
            celeste,
            violeta,
            naranja,
            verde
        }
    }

    toggleBtnEmpezar() {
        if (btnEmpezar.classList.contains('hide')) {
            btnEmpezar.classList.remove('hide')
        } else {
            btnEmpezar.classList.add('hide')
        }
    }

    generarSecuencia() {
        this.secuencia = new Array(FINAL_LEVEL).fill(0).map(n => Math.floor(Math.random()*4))
    }

    nextLevel() {
        this.sublevel = 0
        this.iluminarSecuencia()
        this.addEventClick()
    }

    numeroAColor(num) {
        switch (num) {
            case 0:
                return 'celeste'
            case 1:
                return 'violeta'
            case 2:
                return 'naranja'
            case 3:
                return 'verde'
        }
    }

    colorANumero(color) {
        switch (color) {
            case 'celeste':
                return 0
            case 'violeta':
                return 1
            case 'naranja':
                return 2
            case 'verde':
                return 3
        }
    }

    iluminarSecuencia() {
        for (let i = 0; i < this.level; i++) {
            const color = this.numeroAColor(this.secuencia[i])
            setTimeout(() => this.prenderColor(color), 1000*i)
        }
    }

    prenderColor(color) {
        this.colores[color].classList.add('light')
        setTimeout(() => this.apagarColor(color), 350)
    }

    prenderColor2(color) {
        this.colores[color].classList.add('light')
        setTimeout(() => this.apagarColor(color), 150)
    }

    apagarColor(color) {
        this.colores[color].classList.remove('light')
    }

    addEventClick(){
        this.colores.celeste.addEventListener('click', this.elegirColor)
        this.colores.verde.addEventListener('click', this.elegirColor)
        this.colores.violeta.addEventListener('click', this.elegirColor)
        this.colores.naranja.addEventListener('click', this.elegirColor)
    }

    delEventClick() {
        this.colores.celeste.removeEventListener('click', this.elegirColor)
        this.colores.verde.removeEventListener('click', this.elegirColor)
        this.colores.violeta.removeEventListener('click', this.elegirColor)
        this.colores.naranja.removeEventListener('click', this.elegirColor)
    }

    elegirColor(ev){
        const nombreColor = ev.target.dataset.color
        const numeroColor = this.colorANumero(nombreColor)
        this.prenderColor2(nombreColor)
        // console.log(nombreColor) ---> Descomentar para hacer trampa
        if (numeroColor === this.secuencia[this.sublevel]) {
            this.sublevel++
            if (this.sublevel === this.level) {
                this.level++
                this.delEventClick()
                if (this.level === FINAL_LEVEL+1) {
                    this.win()
                } else {
                    setTimeout(this.nextLevel, 2000)
                }
            }
        } else {
            this.delEventClick()
            this.lose()
        }
    }

    win() {

        const self = this
        const success = () => alertify.success('Juego reiniciado.', 2)
        const error = () => alertify.error('¡Hasta luego!', 2)
        
        alertify.confirm('¡Felicitaciones!', '¡Ganaste el juego! ¿Te gustaría jugar de nuevo?', function(){success()},function(){error()})
            .set({ 
                'labels': { ok: '¡Dale!', cancel: 'Nope' }, 
                transition: 'slide', 
                'onok': function () { success(), self.inicializar() },
                'oncancel': function () { error()}
            })
            .show();
    }

    lose() {

        const self = this
        const success = () => alertify.success('Juego reiniciado.', 2)
        const error = () => alertify.error('¡Hasta luego!', 2)

        alertify.confirm('¡Qué mal!', 'Perdiste el juego... :( ¿Te gustaría jugar de nuevo?', function(){success()}, function(){error()})
            .set({
                'labels': { ok: '¡Dale!', cancel: 'Nope' },
                transition: 'slide',
                'onok': function () { success(), self.inicializar() },
                'oncancel': function () { error() }
            })
            .show();
    }
}

// Finalmente, la función más importante, y que da inicio a toda la lógica del juego.

function empezarJuego() {
    window.juego = new Juego()
}
