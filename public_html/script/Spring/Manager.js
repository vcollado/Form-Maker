/*
 * Spring module
 * @module Spring
 */

var G = G || {};
var formMaker = formMaker || {};
formMaker.spring = formMaker.spring || {};

/*
 * Se encarga de modificar los elementos dados para hacerlos manejables en el DOM
 * @class Manager
 * @namespace formMaker.spring
 * @constructor
 */
formMaker.spring.Manager = function()
{
  if (G.appIsRunning())
  {
    G.springEncryptLoaded = false;
    this.allowOps = true;
  }
  else
  {
    this.allowOps = false;
  }
};

formMaker.spring.Manager.prototype.modifyToView = function()
{

};

formMaker.spring.Manager.prototype.addToDomTabs = function()
{
  var dom = new formMaker.domElementsManager.Create(),
          _this = this;

  var _constructTab = function constuctTab(pFormObj) {
    var _this = this;
    var foObj = pFormObj;

    var tabToAppend = $(foObj.tab),
            id = foObj.id,
            literal = foObj.literal,
            name = foObj.name,
            attr = foObj.attributes;

    var content = [];

    content.push(dom.getPredefObj('styled-red-text').text('K'));
    content.push(dom.setId.call(dom.getPredefObj('input-text'), 'id-' + name));
    //name ? todo
    /*
     content.push(dom.getPredefObj('styled-blue-text').text('NAME'));
     content.push(dom.setId.call(dom.getPredefObj('input-text'), 'name-' + name));
     */
    content.push('');
    content.push('');

    $.each(attr, function(key, value) {
      //well
      if (_this.importantAttr.indexOf(value) !== -1)
      {
        content.push(dom.getPredefObj('styled-red-text').html(value));
      }
      else
      {
        content.push(dom.getPredefObj('styled-blue-text').html(value));
      }
      content.push(dom.setId.call(dom.getPredefObj('input-text'), 'attr-' + value));
    });

    dom.table({
      elemToAppend: tabToAppend,
      columnas: 4,
      filas: (((attr.length / 4) * 2) + 1),
      tableId: 'test-tab-2-table',
      tableClass: 'stdTableTrBorder',
      noClickEvent: true,
      tdContent: content
    });
  };

  for (var idx in this.formObjects) {
    try {
      _constructTab.call(_this, this.formObjects[idx]);
    } catch (e) {
      G.addError(e);
    }
  }

  return this;
};

//campos que son marcados en rojo en el listado de atributos
formMaker.spring.Manager.prototype.importantAttr = [
  'path', 'cssClass', 'cssStyle', 'itemLabel', 'itemValue'
];

formMaker.spring.Manager.prototype.formObjects = [{
    'id': '1',
    'name': 'button',
    'literal': 'form:button',
    'tab': '#tabs-button',
    'attributes': ['disabled', 'id', 'name', 'value']
  }, {
    'id': '2',
    'name': 'checkbox',
    'literal': 'form:checkbox',
    'tab': '#tabs-checkbox',
    'attributes': ['path', 'cssClass', 'cssStyle', 'accesskey', 'cssErrorClass', 'dir', 'disabled', 'htmlEscape', 'id', 'label',
      'lang', 'onblur', 'onchange', 'onclick', 'ondblclick', 'onfocus', 'onkeydown', 'onkeypress', 'onkeyup',
      'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'tabindex', 'title', 'value']
  }, {
    'id': '3',
    'name': 'checkboxes',
    'tab': '#tabs-checkboxes',
    'literal': 'form:checkboxes',
    'attributes': ['path', 'cssClass', 'cssStyle', 'accesskey', 'cssErrorClass', 'delimiter', 'dir', 'disabled', 'element', 'htmlEscape', 'id', 'itemLabel', 'itemValue', 'items',
      'lang', 'onblur', 'onchange', 'onclick', 'ondblclick', 'onfocus', 'onkeydown', 'onkeypress', 'onkeyup',
      'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'tabindex', 'title']
  }, {
    'id': '4',
    'name': 'errors',
    'tab': '#tabs-errors',
    'literal': 'form:errors',
    'attributes': []
  }, {
    'id': '5',
    'name': 'form',
    'tab': '#tabs-form',
    'literal': 'form:form',
    'attributes': []
  }, {
    'id': '6',
    'name': 'hidden',
    'tab': '#tabs-hidden',
    'literal': 'form:hidden',
    'attributes': []
  }, {
    'id': '7',
    'name': 'input',
    'tab': '#tabs-input',
    'literal': 'form:input',
    'attributes': ['path', 'cssClass', 'cssStyle', 'accesskey', 'alt', 'autocomplete', 'cssErrorClass', 'dir', 'disabled',
      'htmlEscape', 'id', 'lang', 'maxlength', 'onblur', 'onchange', 'onclick', 'ondblclick', 'onfocus',
      'onkeydown', 'onkeypress', 'onkeyup', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover',
      'onmouseup', 'onselect', 'readonly', 'size', 'tabindex', 'title']
  }, {
    'id': '8',
    'name': 'label',
    'tab': '#tabs-label',
    'literal': 'form:label',
    'attributes': []
  }, {
    'id': '9',
    'name': 'option',
    'tab': '#tabs-option',
    'literal': 'form:option',
    'attributes': []
  }, {
    'id': '10',
    'name': 'options',
    'tab': '#tabs-options',
    'literal': 'form:options',
    'attributes': []
  }, {
    'id': '11',
    'name': 'password',
    'tab': '#tabs-password',
    'literal': 'form:password',
    'attributes': []
  }, {
    'id': '12',
    'name': 'radiobutton',
    'tab': '#tabs-radiobutton',
    'literal': 'form:radiobutton',
    'attributes': []
  }, {
    'id': '13',
    'name': 'radiobuttons',
    'tab': '#tabs-radiobuttons',
    'literal': 'form:radiobuttons',
    'attributes': []
  }, {
    'id': '14',
    'name': 'select',
    'tab': '#tabs-select',
    'literal': 'form:select',
    'attributes': []
  }, {
    'id': '14',
    'name': 'textarea',
    'tab': '#tabs-textarea',
    'literal': 'form:textarea',
    'attributes': []
  }
];
  