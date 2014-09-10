/*
 * domElementsManager module
 * @module domElementsManager
 */

var G = G || {};
var formMaker = formMaker || {};
formMaker.domElementsManager = formMaker.domElementsManager || {};

/*
 * Se encarga de bindear eventos a los objetos del DOM
 * @class Bind
 * @namespace formMaker.domElementsManager
 * @constructor
 */
formMaker.domElementsManager.Bind = function()
{
  if (G.appIsRunning())
  {
    G.binderLoaded = true;
    this.allowOps = true;
    this.bindClick = false;
    this.bindChange = false;
  }
  else
  {
    this.allowOps = false;
  }
};

formMaker.domElementsManager.Bind.prototype.simulations = function()
{
  //seleccion por defecto del estilo sin bordes
  $('#demo-f-3').click();

  return this;
};

formMaker.domElementsManager.Bind.prototype.ccp = function()
{
  $('.tdSelected').bind('copy', function() {
    $('#copy-col-object-button').click();
  }).bind('paste', function() {
    $('#paste-col-object-button').click();
  }).bind('cut', function() {
    $('#cut-col-object-button').click();
  });
};

formMaker.domElementsManager.Bind.prototype.keys = function()
{
  //TODO añadir control de ventana de edicion 
  $(document).keydown((function(e) {
    switch (e.which) {
      case 72 : //h
//        $('#right-workspace-footer-header-history').click();
        break;
      case 67: //c
//        $('#copy-col-object-button').click();
        break;
      case 86: //v
//        $('#paste-col-object-button').click();
        break;
      case 66: //b
//        $('#delete-col-object-button').click();
        break;
      case 69: //e
//        $('#edit-col-object-button').click();
        break;
      case 49: //1
        $('#demo-f-1').click();
        break;
      case 50: //2
        $('#demo-f-2').click();
        break;
      case 51: //3
        $('#demo-f-3').click();
        break;
      case 13: //intro
        $('#insert-new-table').click();
        break;
    }
  }));

  return this;
};

formMaker.domElementsManager.Bind.prototype.click = function()
{

  $('#right-workspace-footer-header-history').click(function() {

    //73vh - 17.3vh
    if (!$('#history-content').data('hidden'))
    {
      $('#right-workspace').animate({'height': '86.3vh'});
      $('#right-workspace-footer-history').animate({'height': '4vh'});

      $('#history-content')
              .data('hidden', true)
              .fadeOut('fast');
    }
    else
    {
      $('#right-workspace').animate({'height': '73vh'});
      $('#right-workspace-footer-history').animate({'height': '17.3vh'}, function() {
        $('#history-content')
                .data('hidden', false)
                .fadeIn('fast');
      });
    }
  });

  //Editar contenido
  $('#edit-col-object-button').click(function() {
    if ($('.tdSelected').length) {
      $('#dialog-editor').dialog('open');

      var $tdContent = getContentOfSelectedCol();

      setHtmlTextAreaContent($tdContent);
      setHtmlPreviewAddObjHtml($tdContent);
    } else {
      formMaker.history.printAlert('debe seleccionar una celda para continuar', 'Error de edición');
    }
  });

  //COPIAR
  $('#copy-col-object-button').click(function() {
    copySelectedTd();
  });

  //PEGAR
  $('#paste-col-object-button').click(function() {
    pasteSelectedTd();
  });

  //BORRER

  $('#cut-col-object-button').click(function() {
    cutSelectedTd();
  });

  //BOTONES PESTANA - EDITAR HTML

  //GUARDAR  
  $('#save-td-content-container-html').click(function() {

    //Actualizar celda seleccionada con html editado
    G.tdSelected.html($('#td-content-container-html').val());

    //Actualizar previsualizacion de la pestana 'Anadir Objetos HTML'
    $('#preview-html-select-content').html($('#td-content-container-html').val());

    formMaker.history.print({
      title: 'Se ha editado el HTML',
      content: 'todo',
      htmlState: $('#tabs-1').html(),
      msgType: 'dom-change'
    });
  });

  //GUARDAR Y SALIR
  $('#saveAndClose-td-content-container-html').click(function() {

    //Actualizar celda seleccionada con html editado
    G.tdSelected.html($('#td-content-container-html').val());

    //Actualizar previsualizacion de la pestana 'Anadir Objetos HTML'
    $('#preview-html-select-content').html($('#td-content-container-html').val());

    closeDialog(this);

    formMaker.history.print({
      title: 'Se ha editado el HTML',
      content: 'todo',
      htmlState: $('#tabs-1').html(),
      msgType: 'dom-change'
    });
  });

  //BORRAR
  $('#delete-td-content-container-html').click(function() {
    $('#td-content-container-html')
            .val('')
            .focus();
  });

  //CERRAR
  $('#close-td-content-container-html').click(function() {
    closeDialog(this);
  });


  // BOTONES PESTANA - ANADIR OBJETOS HTML

  //INSERTAR TABLA
  $('#tabs-dialog-html-select-insert-new-table').click(function() {
    var create = new formMaker.domElementsManager.Create();

    var filas = $('#html-select-table-row').val(),
            columnas = $('#html-select-table-cols').val(),
            workspace = $('#preview-html-select-content');

//    create.table(filas, columnas, workspace, 'dialog');
    create.table({
      filas: filas,
      columnas: columnas,
      elemToAppend: workspace,
      callType: 'dialog',
      noClickEvent: true
    });

  });

  //INSERTAR IMAGEN
  $('#tabs-dialog-html-select-insert-new-image').click(function() {

    var create = new formMaker.domElementsManager.Create();

    var enlace = $('#html-obj-image-src'),
            descripcion = $('#html-obj-image-desc');

    $('#preview-html-select-content')
            .append(
                    create.image(enlace, descripcion, 'littleImg')
                    );
  });

  //INSERTAR ENLACE
  $('#tabs-dialog-html-select-insert-new-a').click(function() {

    var create = new formMaker.domElementsManager.Create();

    var enlace = $('#html-obj-a-src').val(),
            descripcion = $('#html-obj-a-desc').val();

    cs(create.anchor(enlace, descripcion));

    $('#preview-html-select-content')
            .append(
                    create.anchor(enlace, descripcion)
                    );
  });

  //GUARDAR
  $('#save-html-select-content-container-html').click(function() {

    //actualizar celda seleccionada
    G.tdSelected.html($('#preview-html-select-content').html());

    //actualizar editor de html
    $('#td-content-container-html').val(G.tdSelected.html());

    formMaker.history.print({
      title: 'Se han añadidos objetos html',
      content: 'todo',
      htmlState: $('#tabs-1').html(),
      msgType: 'dom-change'
    });
  });

  //GUARDAR Y SALIR
  $('#saveAndClose-html-select-content-container-html').click(function() {

    //actualizar celda seleccionada
    G.tdSelected.html($('#preview-html-select-content').html());

    //actualizar editor de html por si se da el caso de que el usuario abre la misma celda dos veces
    $('#td-content-container-html').val(G.tdSelected.html());

    closeDialog(this);

    formMaker.history.print({
      title: 'Se han añadidos objetos html',
      content: 'todo',
      htmlState: $('#tabs-1').html(),
      msgType: 'dom-change'
    });
  });

  //BORRAR
  $('#delete-html-select-content-container-html').click(function() {

    $('#preview-html-select-content').empty();
  });

  //CERRAR
  $('#close-html-select-content-container-html').click(function() {
    closeDialog(this);
  });

  //CUADROS DE SELECCION DE ESTILO DE BORDE DE TABLA
  var $borderStyleSelectors = $('[id^="demo-f"]');

  $borderStyleSelectors.click(function() {

    $('.demo-f-selected').removeClass('demo-f-selected');
    $(this).addClass('demo-f-selected');

  });

  return this;
};
