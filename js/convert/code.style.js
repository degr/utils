/**
 * Created by rsmirnou on 6/19/2015.
 */
Loader.objects['convert/code.style.js'] = {
    input: null,
    radio: {},
    output: null,
    createGui: function(){
        var name = 'convert/code.style.js';

        var input = Forms.createElement('textarea', {label: 'Insert input code here:'});
        var output = Forms.createElement('textarea', {label: 'Your output code here:'});
        var submit = Forms.createElement('submit', {attr:{value: 'Process:'}});
        var radio = Forms.createElement('radio', {name: 'code_select', id: 'code_select', buttons: [
            {value: 'camel_to_underscore', label: 'Camel to underscore', checked: 1},
            {value: 'underscore_to_camel', label: 'Underscore to camel'}
        ]});

        this.input = input.get('textarea');
        this.output = output.get('textarea');
        this.radio['camel_to_underscore'] = radio.get('input[value="camel_to_underscore');
        this.radio['underscore_to_camel'] = radio.get('input[value="underscore_to_camel');

        return newElement('form', {onsubmit: "Loader.objects['"+name+"'].onsubmit(); return false;"}, [radio, input, submit, output]);
    },
    onsubmit: function(){
        var v = this.input.value.split('\n');
        var regexp;


        for(var i = 0; i < v.length;i++){
            var ll = v[i].split(' ');
            var l = [];
            for(var j = 0;j<ll.length;j++){
                var lll = ll[j].split('.');
                for(var c = 0; c<lll.length;c++){
                    if(this.radio.underscore_to_camel.checked) {
                        lll[c] = lll[c].replace(/_([a-z])/g, function (g) { return g[1].toUpperCase(); });
                    } else {
                        lll[c] = lll[c].replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
                    }
                }
                l.push(lll.join('.'));
            }
            v[i] = l.join(' ');
        }
        this.output.value = (v.join("\n"));
    }
};