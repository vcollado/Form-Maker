/*
 * History module
 * @module History
 */

var G = G || {};
var formMaker = formMaker || {};

/**
 * Namespace for history functions
 * @class history
 * @namespace formMaker
 * @static
 */
formMaker.history = formMaker.history || {};

//control de estados del html de la zona de trabajo
formMaker.history.htmlHistory = [];
formMaker.history.auditTrail = [];

formMaker.history.printAlert = function(msg,alertType) {
  this.print({
    title: '<label class="styled-content-red-nopadding">Aviso</label> - ' + alertType,
    content: msg,
    msgType : 'alert'
  });
};

formMaker.history.print = function(msg)
{
  var _makeHistoryDiv = function _makeHistoryDiv(pTitle, pContent, pHtmlState)
  {
    var id = G.totalHistoryEntries;
    var title = pTitle,
            content = pContent,
            htmlState = pHtmlState;

    return $('<div>')
            .attr({
              'id': 'op-hist' + id,
              'class': ((htmlState) ? 'history-entry-html-mod' : 'history-entry-msg-shower')
            })
            .data({
              'htmlState': htmlState,
              'clickable': ((htmlState) ? true : false)
            })
            .click(function() {
              if ($(this).data('clickable'))
              {
                $('#tabs-1').html($(this).data().htmlState);
                restoreTdEvents();
                 unSelectTdSelected(); //todo fix para las acciones de copiado
              }
            })
            .html(' | ' + id + (id > 9 ? ' - ' : '&nbsp; - ') + title + (content ? ' - ' + content : ''));
  };

  if (G.appIsRunning())
  {
    //audit-trail
    G.totalHistoryEntries++;
    if (htmlState) {
      this.htmlHistory.push(htmlState);
    } else {
      this.htmlHistory.push('');
    }

    var $workspaceToPrint = $('#history-content');
    var title = msg.title,
            content = msg.content,
            htmlState = msg.htmlState,
            _msgType = msg.msgType;

    this.auditTrail.push({
      'id': G.totalHistoryEntries,
      'title': title,
      'content': content,
      'html': htmlState,
      'msgType': _msgType
    });
    
    $workspaceToPrint.append(_makeHistoryDiv(title, content, htmlState));
//    cs(this.auditTrail);

    $('.history-entry-html-mod').click(function() {

      $('.history-entry-selected').removeClass('history-entry-selected');
      $(this).addClass('history-entry-selected');
    });
    
    if (htmlState) {
      //seleccionar ultima accion
      selectLastHistoryModifier();
    } else {
      //mover el scroll a la parte inferior
      setHistoryPosition('bottom');
    }
  }
};


