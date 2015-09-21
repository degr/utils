/**
 * Created by rsmirnou on 6/19/2015.d
 */
var Forms  = {

    createElement: function(type, options){
        if(!options)options = {};
        if(type == 'textarea') {
            return Forms.fun.buildTextares(options);
        } else if(type == 'select') {
            return Forms.fun.buildSelect(options);
        } else if(type == 'checkbox') {
            return Forms.fun.buildCheckbox(options);
        } else if(type == 'radio') {
            return Forms.fun.buildRadio(options);
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
        buildRadio: function(options){
            return Forms.fun.buildRadioOrCheckbox(options, true);
        },
        buildCheckbox: function(options){
            return Forms.fun.buildRadioOrCheckbox(options, false);
        },
        buildSelect: function(options){
            var els = [];
            if(options.label) {
                els.push(Forms.fun.buildCommonLabel(options));
            }
            if(!options.attr)options.attr = {};
            var opts = [];
            for(var i = 0; i < options.options.length; i++) {
                var o = options.options[i];
                var oa = {value: o.id ? o.id : ''};
                if(o.selected)oa.selected = true;
                opts.pop(newElement('option', oa, o.value ? o.value : ''));
            }
            var select = newElement('select', options.attr, opts);
            var bodyWrapper = Forms.fun.buildBodyWrapper([select]);
            els.push(bodyWrapper);
            return Forms.fun.buildWrapper(els);
        },
        buildRadioOrCheckbox: function(options, isRadio){
            var name = options.name;
            var els = [];
            for(var i in options.buttons) {
                var b = options.buttons[i];
                b.type = isRadio ? 'radio' : 'checkbox';
                b.name = name;
                var radio = newElement('input', b);
                if(b.label) {
                    var labelOpts = {label: b.label};
                    if(options.id && b.value) {
                        labelOpts['id'] = options.id + '_'+ b.value;
                        radio.setAttribute('id', options.id + '_'+ b.value);
                    }

                    var label = Forms.fun.buildCommonLabel(labelOpts);
                    if(label.childNodes.length == 0) {
                        label.appendChild(radio)
                    } else {
                        label.insertBefore(radio, label.childNodes[0])
                    }
                    els.push(label);
                } else {
                    els.push(radio)
                }
            }
            return Forms.fun.buildWrapper(els)
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