////Next
//
//// _this.idxHistoryNavigator ++;
//
//// $('#right-workspace-space')
//// 	.empty()
//// 	.html(_this.htmlState[_this.idxHistoryNavigator]);
//// cs(_this.idxHistoryNavigator);
//
////Previous
//
//// if(_this.idxHistoryNavigator > 0)
//// {
//// 	_this.idxHistoryNavigator --;
//	
//// 	$('#right-workspace-space')
//// 		.empty()
//// 		.html(_this.htmlState[_this.idxHistoryNavigator]);
//
//// 	cs(_this.idxHistoryNavigator);																					
//// }				
//
//<form:form method="POST" commandName="user">
//<form:input path="name" />
//<form:password path="password" />
//<form:radiobutton path="gender" value="M" label="M" />
//
//<form:select path="country">
//	<form:option value="0" label="Select" />
//	<form:options items="${countryList}" itemValue="countryId" itemLabel="countryName" />
//</form:select>
//
//<form:radiobutton path="gender" value="F" label="F" />
//<form:checkboxes path="communityList" items="${communityList}" itemValue="key" itemLabel="value" />
//<form:checkbox path="mailingList" label="Would you like to join our mailinglist?" />
//</form:form>
//
//var o = {
//	f : function(){
//		return 10;
//	}
//}
//
//function test(){
//	console.log(this.f());
//	return arguments;
//}
//
//// console.log(test.call(o,22));
//
//console.log(test.apply(o,[11,22]))
//
////Diferencia entre call y llamada normal - call es una llamada indirecta
//
//var testCall = function(){
//		
//	console.log(arguments);
//	var hr = this.getJqueryObj('hr');
//
//};
//var testStd = function(obj){
//		
//	var hr = obj.getJqueryObj('hr');
//	console.log(hr);
//};
//
//testCall.call(create);
//testStd(create);
//
///*
//* 
//* @class 
//* @namespace formMaker.
//* @constructor
//*/


var s = function s() {
  cs('test');
};

var s = function() {
  cs('testing');
}();

//IIFE
;
(function() {
  return true;
})();

/*HISTORIAL*/

/*
 .append(
 //Historial
 this.makeByTagName('li', leftMenuOptionsText[1])
 .attr({
 'class': 'menu-entry',
 'id': 'menu-entry-history'
 })
 .addClass('styled-content-red')
 .append(
 this.makeByTagName('section')
 .append(
 this.makeByTagName('input')
 .attr({
 'type': 'button',
 'value': leftMenuOptionsText[4]
 })
 .button() //jquery-ui
 .click(function() {
 })
 )//end input Previous
 .append(
 this.makeByTagName('input')
 .attr({
 'type': 'button',
 'value': leftMenuOptionsText[5]
 })
 .button() //jquery-ui
 .click(function() {
 })
 )//end append input Next
 )//end append section History
 )//end append li menu-entry-history
 */

/*
 
 /* same not delete
 $.each(this.formObjects, function() {
 try {
 _constructTab.call(_this, this);
 } catch (e) {
 cs(e);
 G.errorStack.push(e);
 }
 });
 */