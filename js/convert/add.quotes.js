/**
 * Created by rsmirnou on 6/19/2015.
 */
Loader.objects['convert/add.quotes.js'] = {
    input: null,
    output: null,
    createGui: function(){
        var name = 'convert/add.quotes.js';

        var input = Forms.createElement('textarea', {label: 'Insert input code here:'});
        var output = Forms.createElement('textarea', {label: 'Your output code here:'});
        var submit = Forms.createElement('submit', {attr:{value: 'Process:'}});

        this.input = input.get('textarea');
        this.output = output.get('textarea');

        return newElement('form', {onsubmit: "Loader.objects['"+name+"'].onsubmit(); return false;"}, [input, submit, output]);
    },
    onsubmit: function(){
        var v = this.input.value.split('\n');
        for(var i = 0; i < v.length; i++){
            v[i] = '"' + v[i] + '\\n"+';
        }
        this.output.value = v.join('\n');
    }
};