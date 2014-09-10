/*
 * print module.
 * @module print
 */

var G = G || {};
var formMaker = formMaker || {};

/**
 * Namespace for utility functions.
 * @class print
 * @namespace formMaker
 * @static
 */
formMaker.print = formMaker.print || {};


formMaker.print.msgList = {
  done: '| Operation done | '
};


/**
 * Pinta por consola el mensaje requerido
 * @method console
 * @static
 * @param {Object} printObj Objeto que contiene los datos del mensaje props: title - content.
 */
formMaker.print.console = function(printObj)
{
  cs(printObj.title + ': ' + printObj.content);
};

/*
 * Pinta por consola un mensaje fijo para las operaciones satisfactorias
 */
formMaker.print.done = function(doneMsg) {
  cs(this.msgList.done + doneMsg);
};

formMaker.print.in = function(zoneToPrint, msg)
{
  switch (zoneToPrint) {
    case 'debug-zone':
      $('#debug-zone-textarea').html(
              $('#debug-zone-textarea').text() + '\n' + msg
              );
      break;
  }
};
