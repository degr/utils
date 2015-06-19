Loader.objects['parse/code/function.arguments.js'] = {
    propName: null,
    input: null,
    output: null,
    createGui: function(){
        var name = 'parse/code/function.arguments.js';
        var input = Forms.createElement('textarea', {label: 'Insert function arguments here:'});
        var output = Forms.createElement('textarea', {label: 'Your output is here:'});
        var propName = Forms.createElement('input', {label: 'Insert property container name here:'});
        var submit = Forms.createElement('submit', {attr: {value: 'Press to process'}});

        this.input = input.get('textarea');
        this.output = output.get('textarea');
        this.propName = propName.get('input');

        return newElement('form', {onsubmit: "Loader.objects['"+name+"'].onsubmit(); return false;"}, [input, propName, submit, output]);
    },
    onsubmit: function(){
        var v = this.input.value.split(',');
        var p = this.propName.value;
        for(var i = 0; i < v.length;i++){
            v[i] = v[i].trim();
            if(v[i].indexOf('$') == 0) {
                v[i] = v[i].substring(1, v[i].length);
            }
            v[i] = v[i].split('=');

            //if there is class declaration
            v[i][0] = v[i][0].split(' ');
            if(v[i][0].length == 1) {
                v[i][0] = v[i][0][0];
            } else {
                v[i][0] = v[i][0][1];
            }

            if(v[i].length == 2){
                v[i] = '!empty('+p+'["'+v[i][0]+'"]) ? '+p+'["'+v[i][0]+'"] : '+v[i][1]+',';
            }else {
                v[i] = p+'["' + v[i][0] + '"],';
            }
        }
        this.output.value = v.join('\n');
    }
};