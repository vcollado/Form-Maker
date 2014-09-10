var formMaker = formMaker || {};

var G = {
  appIsRunning: function() {
    return this.app instanceof formMaker.app.Launcher;
  },
  creatorLoaded: false,
  deleterLoaded: false,
  editerLoaded: false,
  binderLoaded: false,
  springEncryptLoaded: false,
  historyLoaded: false,
  totalHistoryEntries: 0,
  getSelectedColCont: function() {
    return this.tdSelected;
  },
  setSelectedColCont: function(pCont) {
    $(this.tdSelected).html(pCont);
  },
  tdSelectedCopy: '',
  errorStack: [],
  addError: function(e) {
    this.errorStack.push(e);
  }
};

function cs(str) {
  console.log(str);
}

function closeDialog(obj) {
  $(obj).closest('.ui-dialog-content').dialog('close');
}

function selectLastHistoryModifier() {
  $('.history-entry-selected').removeClass('history-entry-selected');
  $('.history-entry-html-mod').last().addClass('history-entry-selected');

  setHistoryPosition('bottom');
}

function unSelectTdSelected() {
  $('.tdSelected').removeClass('tdSelected');
}

function setHistoryPosition(position) {
  switch (position) {
    case 'bottom':
      //situar el scroll automaticamente en la parte inferior
      var historyContent = document.getElementById('history-content');
      historyContent.scrollTop = historyContent.scrollHeight;
      break;
    case 'top':
      //situar el scroll automaticamente en la parte superior
      var historyContent = document.getElementById('history-content');
      historyContent.scrollTop = 0;
      break;
  }
}

function restoreTdEvents() {
  $('#tabs-1 td').click(function() {
    selectTd('history-restore', $(this));
  });
}

function setHtmlTextAreaContent(pVal) {
  $('#td-content-container-html').val(pVal);
}

function setHtmlPreviewAddObjHtml(pVal) {
  $('#preview-html-select-content').html(pVal);
}

function getContentOfSelectedCol() {
  return G.tdSelected.clone().removeClass('tdSelected').html();
}

function selectTd(callType, pObj) {
  var obj = pObj;
  switch (callType) {
    case 'menu':
    case 'history-restore':

      $('.tdSelected').removeClass('tdSelected');
      $(obj).addClass('tdSelected');
      G.tdSelected = $(obj);

      //workspace content info
      $('#menu-entry-edition-content').html($(obj).html());
      $('#menu-entry-edition-id').val($(obj).attr('id'));
      $('#menu-entry-edition-cssClass').val($(obj).attr('class'));

      var bind = new formMaker.domElementsManager.Bind;
      bind.ccp();
      break;
  }
}

function copySelectedTd() {
  $('.copyIndicator').removeClass('copyIndicator');

  if ($('.tdSelected').length) {
    try {
      G.tdSelectedCopy = G.tdSelected.html();
      G.tdSelected.addClass('copyIndicator');
    } catch (e) {
      G.errorStack.push(e);

    } finally {

      if (G.tdSelectedCopy) {
        formMaker.history.print({
          title: 'Se ha copiado una celda',
          htmlState: $('#tabs-1').html(),
          msgType: 'dom-manage'
        });
      }
    }
  } else {
    formMaker.history.printAlert('debe seleccionar una celda primero', 'Error al copiar');
  }
}

function cutSelectedTd() {
  $('.copyIndicator').removeClass('copyIndicator');

  if ($('.tdSelected').length) {
    try {
      G.tdSelectedCopy = G.tdSelected.html();
      G.tdSelected.addClass('copyIndicator');

      G.tdSelected.html('');
    } catch (e) {
      G.errorStack.push(e);

    } finally {
      if (G.tdSelected) {
        formMaker.history.print({
          title: 'Se ha cortado el contenido de la celda seleccionada',
          htmlState: $('#tabs-1').html(),
          msgType: 'dom-manage'
        });
      }
    }
  } else {
    formMaker.history.printAlert('debe seleccionar una celda primero', 'Error de cortado');
  }
}

function pasteSelectedTd() {

  if ($('.tdSelected').length) {
    if (G.tdSelectedCopy) {
      $('.copyIndicator').removeClass('copyIndicator');
      G.tdSelected.html(G.tdSelectedCopy);

      formMaker.history.print({
        title: 'Se ha pegado una celda',
        htmlState: $('#tabs-1').html(),
        msgType: 'dom-manage'
      });
    } else {
      formMaker.history.printAlert('ningún contenido guardado', 'Error al pegar');
    }
  } else {
    formMaker.history.printAlert('debe seleccionar una celda primero', 'Error al pegar');
  }
}