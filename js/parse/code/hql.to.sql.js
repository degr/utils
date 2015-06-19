/**
 * Created by rsmirnou on 6/19/2015.
 */
Loader.objects['parse/code/hql.to.sql.js'] = {
    input: null,
    output: null,
    createGui: function(){
        var name = 'parse/code/hql.to.sql.js';

        var input = Forms.createElement('textarea', {label: 'Insert sql query here:'});
        var output = Forms.createElement('textarea', {label: 'Your output is here:'});
        var submit = Forms.createElement('submit', {attr:{value: 'Process'}});


        this.input = input.get('textarea');
        this.output = output.get('textarea');

        return newElement('form', {onsubmit: "Loader.objects['"+name+"'].onsubmit(); return false;"}, [input, submit, output]);
    },
    onsubmit: function(){
        var v = this.input.value.split('\n');
        var prevented = ['select', 'insert', 'where', 'in', 'join', 'left', 'inner', 'update', 'delete'];
        for(var i = 0; i < v.length;i++){
            if(v[i].trim().indexOf('"') == 0){
                v[i] = v[i].substring(v[i].indexOf('"')+1);
            }
            if(v[i].trim().lastIndexOf('+') == v[i].trim().length-1){
                v[i] = v[i].substring(0, v[i].trim().lastIndexOf('+'));
            }
            if(v[i].trim().lastIndexOf('"') == v[i].trim().length-1){
                v[i] = v[i].substring(0, v[i].trim().lastIndexOf('"'));
            }

            var ll = v[i].split(' ');
            var l = [];
            for(var j = 0;j<ll.length;j++){
                if(prevented.indexOf(ll[j]) != -1){
                    l.push(ll[j]);
                    continue;
                }
                var lll = ll[j].split('.');
                for(var c = 0; c<lll.length;c++){
                    lll[c] = lll[c].replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
                }
                l.push(lll.join('.'));
            }
            v[i] = l.join(' ');
        }
        this.output.value = (v.join("\n"));
    }
};