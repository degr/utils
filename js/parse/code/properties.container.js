Loader.objects['parse/code/properties.container.js'] = {
    propName: null,
    input: null,
    output: null,
    createGui: function(){
        var name = 'parse/code/properties.container.js';
        var input = Forms.createElement('textarea', {label: 'Insert code here:'});
        var output = Forms.createElement('textarea', {label: 'Your output is here:'});
        var propName = Forms.createElement('input', {label: 'Insert property container name:'});
        var submit = Forms.createElement('submit', {attr: {value: 'Press to process'}});

        this.input = input.get('textarea');
        this.output = output.get('textarea');
        this.propName = propName.get('input');

        return newElement('form', {onsubmit: "Loader.objects['"+name+"'].onsubmit(); return false;"}, [input, propName, submit, output]);
    },
    onsubmit: function(){
        var v = this.input.value.split('\n');
        var v2 = [];
        for(var g = 0; g < v.length;g++){
            if(v[g].indexOf(this.propName.value) > -1){
                v2.push(v[g]);
            }
        }

        var v3 = [];
        for(var i = 0; i < v2.length;i++) {
            var f = v2[i].split(this.propName.value);
            for (var j = 0; j < f.length; j++) {
                if (f[j].indexOf("['") == 0) {
                    v3.push(f[j].substring(2, f[j].indexOf("']")));
                } else if (f[j].indexOf('["') == 0) {
                    v3.push(f[j].substring(2, f[j].indexOf('"]')));
                }
            }
        }
        var out = {};
        this.output.value = '';
        for(var c = 0; c < v3.length; c++){
            out[v3[c]] = 'private String '+v3[c]+';';
        }
        var keys = Object.keys(out).sort();
        for(var k = 0; k < keys.length; k++){
            this.output.value += out[keys[k]]+'\n';
        }

    }
};