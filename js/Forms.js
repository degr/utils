/**
 * Created by rsmirnou on 6/19/2015.
 */
var Forms  = {

    createElement: function(type, options){
        if(!options)options = {};
        if(type == 'textarea') {
            return Forms.fun.buildTextares(options);
        } else if(type == 'select') {
            return Forms.buildSelect(options);
        } else if(type == 'checkbox') {
            return Forms.buildCheckbox(options);
        } else if(type == 'radio') {
            return Forms.buildRadio(options);
        } else {
            return Forms.fun.buildInput(type, options);
        }
    },
    fun: {
        classes: {
            wrapper: "input-wrapper",
            title: "input-title",
            body: "input-body"
        },
        buildTextares: function(options){
            var els = [];
            if(options.label) {
                els.push(Forms.fun.buildCommonLabel(options));
            }
            var textarea = newElement('textarea', options.attr);
            var bodyWrapper = Forms.fun.buildBodyWrapper([textarea]);
            els.push(bodyWrapper);
            return Forms.fun.buildWrapper(els);
        },
        buildInput: function(type, options){
            var els = [];
            if(options.label) {
                els.push(Forms.fun.buildCommonLabel(options));
            }
            if(!options.attr)options.attr = {};
            options.attr.type = type;
            var input = newElement('input', options.attr);
            var bodyWrapper = Forms.fun.buildBodyWrapper([input]);
            els.push(bodyWrapper);
            return Forms.fun.buildWrapper(els);
        },
        buildWrapper: function(els){
            return newElement('div', {'class': Forms.fun.classes.wrapper}, els);
        },
        buildBodyWrapper: function(els){
            return newElement('div', {'class': Forms.fun.classes.body}, els);
        },
        buildTitleWrapper: function(els){
            return newElement('div', {'class': Forms.fun.classes.title}, els);
        },
        buildCommonLabel: function(options){
            var label = newElement('label', {}, options.label);
            if(options.id) {
                label.setAttribute('for', options.id);
            }
            return Forms.fun.buildTitleWrapper([label]);
        }
    }

}