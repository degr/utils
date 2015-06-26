/**
 * Created by rsmirnou on 6/22/2015.
 */
Loader.objects['db/search.in.database.js'] = {
    scForm: null,
    stForm: null,
    createGui: function(){
        var name = 'db/search.in.database.js';

        var scInput = Forms.createElement('input', {label: 'Insert database column here:'});
        var scOutput = Forms.createElement('textarea', {label: 'Your output is here:'});
        var scSubmit = Forms.createElement('submit', {attr: {value: 'Press to process'}});
        var scForm = newElement('form', {onsubmit: "Loader.objects['"+name+"'].searchColumnName(); return false;"}, [scInput, scSubmit, scOutput]);
        this.scForm = {
            input: scInput.querySelector('input'),
            output: scOutput.querySelector('textarea')
        };

        var stInput = Forms.createElement('input', {label: 'Insert search value:'});
        var stOutput = Forms.createElement('textarea', {label: 'Your output is here:'});
        var stSubmit = Forms.createElement('submit', {attr: {value: 'Press to process'}});
        var stForm = newElement('form', {onsubmit: "Loader.objects['"+name+"'].searchText(); return false;"}, [stInput,stSubmit, stOutput]);
        this.stForm = {
            input: stInput.querySelector('input'),
            output: stOutput.querySelector('textarea')
        };


        return newElement('div', {}, [scForm, stForm]);
    },
    searchColumnName: function(){
        var v = this.scForm.input.value;
        if(!v){this.scForm.output.value = 'Please set search value';return;}
        var o = this.scForm.output;
        var data = this.encode({value: v, method: 'searchColumn'});
        $.ajax({
            url: "php/search.in.db.php",
            method: 'POST',
            data: data
        }).done(function(r) {
            o.value = r ? r : "[no results found]";
        });
    },
    searchText: function(){
        var v = this.stForm.input.value;
        if(!v){this.stForm.output.value = 'Please set search value';return;}
        var o = this.stForm.output;
        var data = this.encode({value: v, method: 'searchValue'});
        $.ajax({
            url: "php/search.in.db.php",
            method: 'POST',
            data: data
        }).done(function(r) {
            o.value = r ? r : "[no results found]";
        });

    },
    encode: function(data){
        if(typeof data == 'object'){
            var d = [];
            for(var i in data){
                d.push(encodeURIComponent(i)+'='+(typeof data[i] == 'object' ? this.encodeRecoursivly(data[i]) : encodeURIComponent(data[i])));
            }
            data = d.join('&');
        }
        return data;
    },
    encodeRecoursivly: function(v){
        var d = [];
        for(var i in v) {
            d.push('"'+encodeURIComponent(i)+'":"'+(typeof v[i] == 'object' ? this.encodeRecoursivly(v[i]) : encodeURIComponent(v[i]))+'"');
        }
        return '{'+ d.join(encodeURIComponent(',')) + '}';
    },
};