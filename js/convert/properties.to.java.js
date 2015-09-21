/**
 * Created by rsmirnou on 6/19/2015.
 */
Loader.objects['convert/properties.to.java.js'] = {
    input: null,
    output: null,
    createGui: function(){
        var name = 'convert/properties.to.java.js';

        var input = Forms.createElement('textarea', {label: 'Insert input code here:'});
        var output = Forms.createElement('textarea', {label: 'Your output code here:'});
        var submit = Forms.createElement('submit', {attr:{value: 'Process:'}});

        this.input = input.get('textarea');
        this.output = output.get('textarea');

        return newElement('form', {onsubmit: "Loader.objects['"+name+"'].onsubmit(); return false;"}, [input, submit, output]);
    },
    onsubmit: function(){
        var v = this.input.value.split('\n');
        var c = [];
        for(var i = 0; i < v.length; i++) {
            if(!v[i].trim())continue;
            var p = (v[i].trim().split('=')[0]).lcfirst();
            c.push('@Value("${' + p + '}")\nString ' +this.toFieldName(p));
        }

        this.output.value = c.join('\n');
    },
    toFieldName: function(p){
        var g = p.split('.');
        var o = '';
        for(var i =0; i< g.length;i++) {
            o+= i==0 ? g[i].lcfirst() : g[i].ucfirst();
        }
        return o+";\n";
    }
};