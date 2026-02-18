// TRANSLATIONS — Bilingual strings for Peg Jump (ES / EN)

const TRANSLATIONS = {
  es: {
    subtitle: "¿Podrás resolver este puzle?",
    navGame: "Juego",
    navRules: "Reglas",
    sectionTitle: "Empieza a resolver",
    sectionInstructions: "Haz clic en una ficha y luego en un hueco para saltar y eliminar fichas.",
    statsPegs: "Fichas restantes:",
    statsMoves: "Movimientos:",
    statsTime: "Tiempo:",
    ariaUndo: "Deshacer último movimiento",
    ariaReset: "Reiniciar partida",
    ariaHint: "Pista",
    ariaCloseRules: "Cerrar reglas",
    rulesTitle: "Reglas del Juego",
    rulesRule1Title: "Objetivo",
    rulesRule1Text: "Eliminar todas las fichas del tablero hasta dejar solo una.",
    rulesRule2Title: "Movimiento",
    rulesRule2Text: "Una ficha salta sobre otra adyacente y aterriza en un hueco vacío.",
    rulesRule3Title: "Captura",
    rulesRule3Text: "La ficha saltada se elimina del tablero automáticamente.",
    rulesRule4Title: "Fin",
    rulesRule4Text: "La partida termina cuando no quedan movimientos posibles.",
    footerProject: "Proyecto de Ingeniería Web I",
    metaDescription: "Peg Jump - Juego clásico de fichas - Proyecto Full Stack para Ingeniería Web I",
    alertsVictory: "¡VICTORIA! Has dejado solo 1 ficha en {moves} movimientos y {time}.",
    alertsGameOver: "Fin de la partida. Quedan {pegs} fichas. ¡Inténtalo de nuevo!"
  },
  en: {
    subtitle: "Can you solve this puzzle?",
    navGame: "Game",
    navRules: "Rules",
    sectionTitle: "Start solving",
    sectionInstructions: "Click on a peg and then on an empty hole to jump and remove pegs.",
    statsPegs: "Pegs remaining:",
    statsMoves: "Moves:",
    statsTime: "Time:",
    ariaUndo: "Undo last move",
    ariaReset: "Restart game",
    ariaHint: "Hint",
    ariaCloseRules: "Close rules",
    rulesTitle: "Game Rules",
    rulesRule1Title: "Objective",
    rulesRule1Text: "Remove all pegs from the board until only one remains.",
    rulesRule2Title: "Move",
    rulesRule2Text: "A peg jumps over an adjacent peg and lands in an empty hole.",
    rulesRule3Title: "Capture",
    rulesRule3Text: "The jumped peg is automatically removed from the board.",
    rulesRule4Title: "End",
    rulesRule4Text: "The game ends when there are no possible moves left.",
    footerProject: "Web Engineering I Project",
    metaDescription: "Peg Jump - Classic peg board game - Full Stack project for Web Engineering I",
    alertsVictory: "VICTORY! You left only 1 peg in {moves} moves and {time}.",
    alertsGameOver: "Game over. {pegs} pegs left. Try again!"
  }
};

if (typeof window !== 'undefined') {
  window.TRANSLATIONS = TRANSLATIONS;
}
