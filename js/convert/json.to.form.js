/**
 * Created by rsmirnou on 6/19/2015.
 */
Loader.objects['convert/json.to.form.js'] = {
    input: null,
    radio: null,
    output: null,
    withoutValues: null,
    createGui: function(){
        var name = 'convert/json.to.form.js';

        var input = Forms.createElement('textarea', {label: 'Insert json here:'});
        var url = Forms.createElement('text', {label: 'Form submit URL'});
        var radio = Forms.createElement('radio', {name: 'method', id: 'method', buttons: [
            {value: 'get', label: 'GET'},
            {value: 'post', label: 'POST', checked: 1},
            {value: 'put', label: 'PUT'},
            {value: 'delete', label: 'DELETE'}
        ]});
        var withoutValues = Forms.createElement('checkbox', {'buttons':[{label: 'Without values (empty form)'}]});
        var submit = Forms.createElement('submit', {attr:{value: 'Process:'}});
        var output = Forms.createElement('textarea', {label: 'Your form code here:'});

        this.input = input.get('textarea');
        this.url = url.get('input');
        this.output = output.get('textarea');
        this.withoutValues = withoutValues.get('input');
        this.radio = radio.getAll('input[type="radio"]');
        return newElement('form', {onsubmit: "Loader.objects['"+name+"'].onsubmit(); return false;"}, [input, url, radio,withoutValues, submit, output]);
    },
    getMethod: function(){
        for(var i = 0; i < this.radio.length; i++){

            if(this.radio[i].checked) {
                return this.radio[i].value;
            }
        }
        return '';
    },
    onsubmit: function(){
        var o;
        if(this.input.value.trim() !== '') {
            try {
                o = JSON.parse(this.input.value.trim());
            } catch (e) {
                this.output.value = "ivalid json";
                return;
            }
        } else {
            o = {};
        }
        var method = this.getMethod();
        var url = this.url.value;
        var elems = [];
        for(var i in o) {
            elems.push(this.buildElement(i, o[i], null));
        }
        elems.push(Forms.createElement('submit'));
        var form = newElement('form', {method: method, action: url}, elems);
        this.output.value = form.outerHTML;
    },
    buildElement: function(key, o, preffix){
        var out;
        if(typeof o == 'object') {
            var elems = [newElement('legend', {}, key)];
            for(var i in o) {
                elems.push(this.buildElement(i, o[i], (preffix ? preffix : key) + "[" + i + "]"));
            }
            out = newElement('fieldset', {}, elems);
        } else {
            var params =  {label: key};
            params.attr = {};
            params.attr.name = preffix ? preffix : key;
            if(!this.withoutValues.checked) {
                params.attr.value = o;
            }
            out = Forms.createElement('text', params);
        }
        return out;
    }
};