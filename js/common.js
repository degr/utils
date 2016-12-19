/**
 * Created by rsmirnou on 6/19/2015.
 */
function newElement(tag, attr, elements, html){
    var e=document.createElement(tag);
    for(var i in attr){e.setAttribute(i, attr[i]);};
    if(elements){
        if(typeof  elements == 'string') e.innerHTML = elements;
        else for(var i=0;i<elements.length;i++)e.appendChild(elements[i]);
    }
    return e;
}
/**
 * check, have element class or not
 * @param c
 * @returns {boolean}
 */
Element.prototype.hasClass = function(c){
    return this.className.split(' ').indexOf(c) != -1 ? true : false;
};
/**
 * add classname to element. Chainable.
 * @param className
 * @returns {HTMLElement}
 */
Element.prototype.addClass = function(className){
    var c=this.className.split(' ');for(var i=0;i<c.length;i++)if(c[i]==className)return;this.className+=" "+className;
};
/**
 * Remove classname from element. Chainable.
 * @param className
 * @returns {HTMLElement}
 */
Element.prototype.removeClass = function(className){
    var c=this.className.split(' ');for(var i=0;i<c.length;i++)if(c[i]==className){c.splice(i,1);break;}this.className=c.join(' ',className);
};
/**
 * get first dom element with setted css selector
 * @param t String, CSS selector.
 * @returns {HTMLElement}
 */
Element.prototype.get = function(t){
    return this.querySelector(t);
};
/**
 * get node list with setted css selector
 * @param t String, CSS selector
 * @returns {NodeList}
 */
Element.prototype.getAll = function(t){
    return this.querySelectorAll(t);
};

String.prototype.ucfirst = function(){
    return this.charAt(0).toUpperCase() + this.substr(1);
};
String.prototype.lcfirst = function(){
    return this.charAt(0).toLowerCase() + this.substr(1);
};