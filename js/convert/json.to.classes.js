/**
 * Created by rsmirnou on 6/19/2015.
 */
Loader.objects['convert/json.to.classes.js'] = {
    input: null,
    output: null,
    createGui: function(){
        var name = 'convert/json.to.classes.js';

        var input = Forms.createElement('textarea', {label: 'Insert json here:'});
        var submit = Forms.createElement('submit', {attr:{value: 'Process:'}});
        var output = Forms.createElement('textarea', {label: 'Your form code here:'});

        this.input = input.get('textarea');
        this.output = output.get('textarea');
        return newElement('form', {onsubmit: "Loader.objects['"+name+"'].onsubmit(); return false;"}, [input, submit, output]);
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
        var elems = [];
        for(var i in o) {
            elems.push(this.buildClass(i, o[i]));
        }
        this.output.value = elems.join("\n\n\n======================\n\n\n");
    },
    buildClass: function(key, o){
        var out = 'class ' + key.ucfirst() + "{\n";
        var inner = [];
        var vars = [];
        for(var i in o) {
            if(typeof o[i] == 'object') {
                inner.push({key:i, value: o[i]});
            }
            vars.push(i);
            out += "\tprivate $" + i+";\n";
        }
        for(var v = 0; v < vars.length; v++) {
            out += this.buildGetterAndSetter(vars[v], true);
            out += this.buildGetterAndSetter(vars[v], false);
        }
        out += "}\n\n\n=================================\n\n\n";
        for(var j = 0; j < inner.length; j++) {
            out += this.buildClass(inner[j].key, inner[j].value);
        }

        return out;
    },
    buildGetterAndSetter: function(name, isGetter){
        var preffix = isGetter ? "get" : "set";
        return "\tpublic function "+preffix+name.ucfirst()+"("+(isGetter ? "" : "$" + name)+"){\n" +
            "\t\t" + (isGetter ? "return $this->" + name  : "$this->"+name +" = $"+name) + ";\n" +
         "\t}\n";
    }
};