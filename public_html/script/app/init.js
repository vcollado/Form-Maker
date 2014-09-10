var G = G || {};
var formMaker = formMaker || {};

$(function() {
  var initApp = function initApp(obj) {

    var app = new formMaker.app.Launcher();
    G.app = app;

    var domCreate = new formMaker.domElementsManager.Create();
    var domBind = new formMaker.domElementsManager.Bind();
    var springMng = new formMaker.spring.Manager();
    
    //chaining
    domCreate.mainMenu().jQueryUiObj();
    domBind.click().simulations().keys();
    springMng.addToDomTabs();
    
    formMaker.history.print({
      title: 'Aplicación iniciada correctamente',
      content: 'v.03 rev300814',
      msgType : 'sys-msg'
    });
    formMaker.history.print({
      title: 'Workspace vacío',
      content: 'estado inicial',
      htmlState : ' ',
      msgType : 'sys-msg'
    });

  }({});
});
