/**
 * Created by rsmirnou on 6/19/2015.
 */
Loader.objects['convert/from.to.preffix.suffix.js'] = {
    input: null,

    fromSuffix: null,
    toSuffix: null,

    fromPostfix : null,
    toPostfix : null,

    output: null,
    createGui: function(){
        var name = 'convert/from.to.preffix.suffix.js';

        var input = Forms.createElement('textarea', {label: 'Insert input code here:'});

        var fromSuffix = Forms.createElement('input', {label: 'Insert your preffix name:'});
        var toSuffix = Forms.createElement('textarea', {label: 'Insert preffix replacement name:'});

        var fromPostfix = Forms.createElement('input', {label: 'Insert your postfix name:'});
        var toPostfix = Forms.createElement('textarea', {label: 'Insert postfix replacement name:'});

        var output = Forms.createElement('textarea', {label: 'Your output code here:'});
        var submit = Forms.createElement('submit', {attr:{value: 'Process:'}});



        this.input = input.get('textarea');
        this.output = output.get('textarea');
        this.fromSuffix = fromSuffix.get('input');
        this.toSuffix = toSuffix.get('textarea');

        this.fromPostfix = fromPostfix.get('input');
        this.toPostfix = toPostfix.get('textarea');

        return newElement('form', {onsubmit: "Loader.objects['"+name+"'].onsubmit(); return false;"}, [input,fromSuffix, toSuffix, fromPostfix, toPostfix, submit, output]);
    },
    onsubmit: function(){
        var v = this.input.value.split('\n');

        var fromS = this.fromSuffix.value.trim();

        var toS = this.toSuffix.value;
        var toSTrimmed = toS.trim();

        var fromP = this.fromPostfix.value.trim();
        var toP = this.toPostfix.value.trim();


        for(var i = 0; i < v.length;i++){
            var r = v[i].trim();
            if(r.indexOf(fromS) == 0) {

                var v2 = r.substring(fromS.length, r.length).trim();
                var f = toS.charAt(toS.length-1) != ' ' ? v2.charAt(0).toUpperCase() : ' ' + v2.charAt(0);
                r = toSTrimmed + f + v2.substr(1);
            }
            if(r.lastIndexOf(fromP) + fromP.length == r.length) {
                var v3 = r.substring(0, r.lastIndexOf(fromP)).trim();
               // var c = v3.charAt(v3.length).toUpperCase();
                r = v3 /*+ c*/ + toP;
            }
            v[i] = r;
        }
        this.output.value = (v.join("\n"));
    }
};