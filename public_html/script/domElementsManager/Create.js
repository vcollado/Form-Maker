/*
 * domElementsManager module.
 * @module domElementsManager
 */

var G = G || {};
var formMaker = formMaker || {};
formMaker.domElementsManager = formMaker.domElementsManager || {};

/*
 * Se encarga de crear los objetos Jquery requeridos para el DOM
 * @class Create
 * @namespace formMaker.domElementsManager
 * @constructor
 */
formMaker.domElementsManager.Create = function()
{
  if (G.appIsRunning())
  {
    G.creatorLoaded = true;
    this.allowOps = true;
    this.totalDOMCreations = 0;
    this.domId = 0;
    this.totalTableAdded = 0;

//    this.htmlState = []; deprecated
//    this.idxHistory = 0;
//    this.idxHistoryNavigator = 0;

  }
  else
  {
    this.allowOps = false;
  }

};

formMaker.domElementsManager.Create.prototype.isAllowOps = function()
{
  return this.allowOps;
};



formMaker.domElementsManager.Create.prototype.getJqueryObj = function(objName)
{
  return $('<' + objName + '>');
};

formMaker.domElementsManager.Create.prototype.instanceError = function(methodName, instancePointId)
{
  formMaker.print.console({
    title: 'Instance error in method: ' + methodName + ' id: ' + instancePointId,
    content: 'you must create first an instance of app, @see launcher.js @search errorId'
  });
};

formMaker.domElementsManager.Create.prototype.springObjectManager = function(methodName, instancePointId)
{

};

formMaker.domElementsManager.Create.prototype.jQueryUiObj = function()
{
  //pestanas
  $('#tabs').tabs();
  $('#tabs-dialog-editor').tabs();
  $('#tabs-dialog-html-select').tabs();
  $('#tabs-dialog-spring-select').tabs();

  //buttonsets
  $('#tabls-dialog-spring-select').buttonset();

  //spinners
  $('.select-table-size').spinner();

  //buttons
  $('#save-td-content-container-html').button();
  $('#saveAndClose-td-content-container-html').button();
  $('#tabs-dialog-html-select-insert-new-table').button();
  $('#save-html-select-content-container-html').button();
  $('#saveAndClose-html-select-content-container-html').button();
  $('#delete-html-select-content-container-html').button();
  $('#delete-td-content-container-html').button();
  $('#tabs-dialog-html-select-insert-new-image').button();
  $('#tabs-dialog-html-select-insert-new-a').button();
  $('#close-td-content-container-html').button();
  $('#close-html-select-content-container-html').button();
  $('#copy-col-object-button').button();
  $('#paste-col-object-button').button();
  $('#cut-col-object-button').button();

  //dialogs
  //dialogo de edicion de celda
  $('#dialog-editor').dialog({
    autoOpen: false,
    width: 910,
    modal: true,
    resizable: false,
    position: {my: 'top', at: 'top+33'}
  });

  //tooltips
  var setToolTip = function setTooltip(elem, msg) {
    elem.attr('title', msg).tooltip();
  };

//  setToolTip($('#demo-f-1'),'Crear una tabla sin bordes ( por defecto )');
//  setToolTip($('#demo-f-2'),'Crear una tabla con bordes en cada fila');
//  setToolTip($('#demo-f-3'),'Crear una tabla con bordes en cada fila y columna');
//  setToolTip($('#ui-id-1'),'Zona de trabajo');
//  setToolTip($('#ui-id-2'),'Visualize el código de sus tablas');
//  setToolTip($('#edit-col-object-button'),'Añada y edite objetos Spring / Html');


  return this;
};

formMaker.domElementsManager.Create.prototype.setId = function(pId)
{
  $(this).attr('id', pId);

  return this;
};

formMaker.domElementsManager.Create.prototype.getPredefObj = function(elementName)
{
  switch (elementName) {
    case 'styled-red-text':
      return this.getJqueryObj('label')
              .attr({
                'class': 'predef-red-styled-label'
              });
      break;
    case 'styled-blue-text':
      return this.getJqueryObj('label')
              .attr({
                'class': 'predef-blue-styled-label'
              });
      break;
    case 'styled-red-hr':

      break;
    case 'input-text':
      return this.getJqueryObj('input')
              .attr({
                'type': 'text',
                'class': 'predef-input-text'
              });
      break;
  }
};

formMaker.domElementsManager.Create.prototype.makeByTagName = function(typeOfElement, textOfTheElement)
{
  var objToCreate;
  var domObjAllowed = ['table', 'tr', 'td', 'lu', 'li', 'input', 'br', 'hr', 'section', 'article', 'header', 'img', 'a', 'label', 'div'];

  //si hay instancia de la app
  if (this.isAllowOps())
  {
    //control de elementos
    if (domObjAllowed.indexOf(typeOfElement) !== -1)
    {
      //creacion del row object
      objToCreate = this.getJqueryObj(typeOfElement);

      //tratamiento individual
      switch (typeOfElement)
      {
        case 'table':
          objToCreate.attr({'width': '100%'});
          break;
        case 'li':
//          objToCreate.append(this.makeByTagName('header').text(textOfTheElement));
          objToCreate.html(textOfTheElement);
          break;
      }
    }
    else
    {
      formMaker.print.console({
        title: 'DOM write permissions error',
        content: 'You cannot add ' + typeOfElement + ' to the dom. Elements allowed: ' + domObjAllowed
      });
    }
  }
  else {
    //@errorId 1
    this.instanceError('makeByTagName', '1');
  }

  if (objToCreate)
  {
    this.totalDOMCreations++;
    // formMaker.print.done('ID: '+ this.totalDOMCreations +' | desc: '+ $(objToCreate).prop('tagName').toLowerCase() + ' created |');
    // formMaker.print.in('debug-zone','ID: '+ this.totalDOMCreations +' | desc: '+ $(objToCreate).prop('tagName').toLowerCase() + ' created |');
  }

  // cs(objToCreate);
  return objToCreate;
};

formMaker.domElementsManager.Create.prototype.image = function(pSrc, pDesc, pClass, pTitle)
{
  return this.makeByTagName('img').attr({
    'src': pSrc,
    'alt': pDesc,
    'class': pClass,
    'title': 'image test tile'
  });
};

formMaker.domElementsManager.Create.prototype.anchor = function(pSrc, pDesc, pClass, pTitle)
{
  return (this.makeByTagName('a').attr({
    'href': pSrc
  }).text(pDesc));
};


//formMaker.domElementsManager.Create.prototype.table = function(pFilas, pColumnas, pElemToAppend, callType)
formMaker.domElementsManager.Create.prototype.table = function(paramObj)
{
  var workSpace = paramObj.elemToAppend,
          filas = paramObj.filas,
          columnas = paramObj.columnas,
          callType = paramObj.callType,
          tableId = paramObj.tableClass,
          tableClass = paramObj.tableClass,
          trClass = paramObj.trClass,
          emptyContent = paramObj.emptyContent,
          clickEvent = paramObj.noClickEvent,
          tdContent = paramObj.tdContent;

  var _this = this;
  var tdCount = 0;

  if (filas > 0)
  {
    if (!tableId) {
      this.totalTableAdded++;
    }
    var tableToAppend = this.makeByTagName('table');

    //crear las filas y columas indicadas
    for (var idx = 0; idx < filas; idx++) {
      tableToAppend.append(
              function() {
                var percentByCol = 100 / columnas;
                var tdToAppend = _this.makeByTagName('tr');

                if (trClass) {
                  tdToAppend.addClass(trClass);
                }

                for (var idxTd = 0; idxTd < columnas; idxTd++) {
                  _this.domId++;
                  tdCount++;

                  //fila inicial que establece el ancho de cada columna
                  if (idx === 0)
                  {
                    tdToAppend
                            .append($('<td>')
                                    .attr({
                                      'width': percentByCol + '%',
                                      'class': 'td-percent'
                                    })
                                    .data({
                                      'it-id': _this.domId,
                                      'isPercent': true,
                                      'clickEvent': clickEvent
                                    })
                                    .html((emptyContent ? '' : (tdContent ? tdContent[tdCount - 1] : tdCount)))
                                    //edicion de las celdas en el click
                                    .click(function() {
                                      if (!$(this).data('clickEvent')) {
                                        selectTd('menu', $(this));
                                      }
                                    })//end click td
                                    );//end append td
                  }
                  else
                  {
                    tdToAppend
                            .append($('<td>')
                                    .data({
                                      'it-id': _this.domId,
                                      'empty': emptyContent,
                                      'clickEvent': clickEvent
                                    })
                                    .html((emptyContent ? '' : (tdContent ? tdContent[tdCount - 1] : tdCount)))
                                    //edicion de las celdas en el click
                                    .click(function() {
                                      if (!$(this).data('clickEvent')) {
                                        selectTd('menu', $(this));
                                      }
                                    })//end click td
                                    );//end append td
                  }
                }//end for idxTd
                return tdToAppend;
              }
      ); //end append tr
    }//end for idx

    tableToAppend.attr({
//      'class': ((workSpace) ? 'stdTable' : tableClass),
      'class': ((workSpace) ? ((tableClass) ? tableClass : 'stdTable') : tableClass),
      'id': (tableId ? tableId : 'table' + this.totalTableAdded)
    });

    if (workSpace) {
      workSpace.append(tableToAppend);

      //fix-me
      //fix para el borde inferior de la ultima tabla
      if (callType) {
        switch (callType) {
          case 'menu':
//            $('#tabs-1 .stdTable')
            /*
             $('#tabs-1 > table').css('border-bottom-width', '0px');
             $('#tabs-1 > table tr:last').css('border-bottom-width', '0px');
             */

//            $('#tabs-1 > table').css('border-bottom-width', '0px').last().css('border-bottom-width', '1px');


            break;
          case 'dialog':
            $('#preview-html-select .stdTable').css('border-bottom-width', '0px').last().css('border-bottom-width', '1px');
            break;
        }
      }
    } else {
      return tableToAppend;
    }
  }
};

/**
 * Construye el menu izquierda
 * @param {String} typeOfElement
 */
formMaker.domElementsManager.Create.prototype.mainMenu = function(typeOfElement)
{
  var leftMenuOptionsS = $('#left-menu-options');

  var catalaStr = ['Creació de taules', 'Historial', 'Files', 'Columnes', 'Anterior'
            , 'Següent', 'Menú d\'operacions', 'Constructor de formularis v 0.001 270914'];

  var englishStr = ['Table creation', 'History', 'Rows', 'Cols', 'Previous', 'Next', 'Option menu', 'Form builder v 0.001 270914'];

  var castellanoStr = ['Selección de tamaño', 'Historial', 'Filas', 'Columnas', 'Anterior',
    'Siguiente', 'Menú de operaciones', 'Constructor de formularios v 0.001 270914',
    'Zona de edición', 'Contenido: ', 'DOM Id ', 'CSS Class ', 'Editar', 'Insertar'];

  var leftMenuOptionsText = castellanoStr;

  var stdInput = {'size': '2', 'value': '4', 'class': 'select-table-size'};
  var _this = this;

  if (this.isAllowOps()) {
//    $('#left-menu-title').text(leftMenuOptionsText[6]);
    // $('#content-title').text(leftMenuOptionsText[7])

    leftMenuOptionsS.append(
            this.makeByTagName('lu')
            .attr({
              'id': 'menu-entry-list'
            })
            .append(
                    this.makeByTagName('li', '<header id="header-create-table">Creación de tabla</header>Tamaño')
                    .attr({
                      'class': 'menu-entry',
                      'id': 'menu-entry-table-make'
                    })
                    .addClass('styled-content-red')
                    .append(this.makeByTagName('hr').attr({
                      'class': 'hr-styled-red'
                    }))
                    .append(
                            this.makeByTagName('section')
                            .attr('id', 'section-work-table')
                            .append(leftMenuOptionsText[2]).addClass('styled-content')
                            .append(
                                    this.makeByTagName('input')
                                    .attr(stdInput)
                                    .attr('id', 'filas-value')
                                    )
                            .append(leftMenuOptionsText[3])
                            .append(
                                    this.makeByTagName('input')
                                    .attr(stdInput)
                                    .attr({
                                      'id': 'columnas-value'
                                    })
                                    )
//                            .append(this.makeByTagName('br')
                            .append(this.makeByTagName('br'))
                            .append(this.makeByTagName('br'))
                            .append(this.makeByTagName('label').text('Estilo').attr('id', 'label-menu-style'))
                            .append(this.makeByTagName('hr').attr({
                              'class': 'hr-styled-red'
                            }))
                            .append(
                                    this.makeByTagName('section')
                                    .attr({
                                      'id': 'section-demo-f'
                                    })
                                    .append(this.table({
                                      filas: 2,
                                      columnas: 2,
                                      tableId: 'demo-f-1',
                                      tableClass: 'demo-f-1',
                                      trClass: 'demo-f-1-tr',
                                      emptyContent: true,
                                      noClickEvent: true
                                    }))
                                    .append(this.table({
                                      filas: 2,
                                      columnas: 2,
                                      tableId: 'demo-f-2',
                                      tableClass: 'demo-f-2',
                                      trClass: 'demo-f-2-tr',
                                      emptyContent: true,
                                      noClickEvent: true
                                    }))
                                    .append(this.table({
                                      filas: 2,
                                      columnas: 2,
                                      tableId: 'demo-f-3',
                                      tableClass: 'demo-f-3',
                                      trClass: 'demo-f-3-tr',
                                      emptyContent: true,
                                      noClickEvent: true
                                    })))

                            .append(this.makeByTagName('section')
                                    .attr({
                                      'id': 'label-menu-ops-section'
                                    })
                                    .append(this.makeByTagName('label').text('Operaciones').attr('id', 'label-menu-ops-table'))
                                    .append(this.makeByTagName('hr').attr({
                                      'class': 'hr-styled-red'
                                    }))).append(this.makeByTagName('input')
                            .attr({
                              'id': 'insert-new-table',
                              'type': 'button',
                              'value': leftMenuOptionsText[13]
                            })
                            .button() //jquery-ui
                            //boton insertar
                            .click(function() {
                              var borderSelected = $('.demo-f-selected').attr('id');
                              var classWithBorder;

                              if (borderSelected) {
                                switch (borderSelected) {
                                  case 'demo-f-1':
                                    classWithBorder = 'stdTable';
                                    break;
                                  case 'demo-f-2':
                                    classWithBorder = 'stdTableTrBorder';
                                    break;
                                  case 'demo-f-3':
                                    classWithBorder = 'stdTableTdBorder';
                                    break;
                                }
                              }

                              var workSpace = $('#tabs-1'),
                                      filas = $('#filas-value').val(),
                                      columnas = $('#columnas-value').val();

                              _this.table({
                                filas: filas,
                                columnas: columnas,
                                elemToAppend: workSpace,
                                callType: 'menu',
                                tableClass: classWithBorder
                              });

                              formMaker.history.print({
                                title: 'Se ha añadido una tabla',
                                content: 'filas: ' + filas + ' columnas: ' + columnas,
                                htmlState: $('#tabs-1').html()
                              });                            
                            })//end click input Insert
                            )//end append input Insert
                            )//end append section
                    )//end append li menu-entry-table-make
            //END CREACION DE TABLAS
            .append(this.makeByTagName('br'))
            .append(
                    //area de trabajo de celda
                    this.makeByTagName('li', '')
                    .append(
                            this.makeByTagName('header')
                            .attr({
                              'id': 'header-menu-entry-edition'
                            })
                            .text('Edición de celda')
                            )
                    .attr({
                      'class': 'menu-entry',
                      'id': 'menu-entry-edition'
                    })
                    .append(
                            this.makeByTagName('section')
                            .attr({
                              'id': 'col-edition-section'
                            })
                            .append(this.makeByTagName('label').text('Propiedades').attr('id', 'label-menu-props'))
                            .append(this.makeByTagName('hr').attr({
                              'class': 'hr-styled-red'
                            }))
                            .append(
                                    this.makeByTagName('article')
                                    .text(leftMenuOptionsText[10])
                                    .addClass('styled-content')
                                    .append(this.makeByTagName('br'))
                                    .append(
                                            this.makeByTagName('input')
                                            .attr('id', 'menu-entry-edition-id')
                                            )
                                    )//end append article DOM ID
                            .append(
                                    this.makeByTagName('article')
                                    .text(leftMenuOptionsText[11]).addClass('styled-content')
                                    .append(this.makeByTagName('br'))
                                    .append(
                                            this.makeByTagName('input')
                                            .attr('id', 'menu-entry-edition-cssClass')
                                            )
                                    )//end append article CSS Class
                            .append(
                                    this.makeByTagName('article')
                                    .attr({'id': 'menu-entry-edition-content-addContent'})
                                    .append(this.makeByTagName('label').text('Operaciones').attr('id', 'label-menu-ops'))
                                    .append(this.makeByTagName('hr').attr({
                                      'class': 'hr-styled-red'
                                    }))
                                    .append(
                                            this.makeByTagName('input')
                                            .attr({
                                              'id': 'edit-col-object-button',
                                              'type': 'button',
                                              //Botón 'Editar'
                                              'value': leftMenuOptionsText[12]
                                            })
                                            .button() //jquery-ui
                                            )
                                    .append(
                                            this.makeByTagName('input')
                                            .attr({
                                              'id': 'cut-col-object-button',
                                              'type': 'button',
                                              'value': 'Cortar'
                                            })
                                            )
                                    .append(
                                            this.makeByTagName('input')
                                            .attr({
                                              'id': 'copy-col-object-button',
                                              'type': 'button',
                                              'value': 'Copiar'
                                            })
                                            )
                                    .append(
                                            this.makeByTagName('input')
                                            .attr({
                                              'id': 'paste-col-object-button',
                                              'type': 'button',
                                              'value': 'Pegar'
                                            })
                                            )                                    
                                    )//end append article Edit content

                            )//end append section Edit zone
                    )//end append li menu-entry-edition
            .append(this.makeByTagName('br'))

            );//end append lu menu-entry-list
  }
  else {
    //@errorId 2
    this.instanceError('mainMenu', '2');
  }

  return this;
};
