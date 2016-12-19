/**
 * Created by rsmirnou on 6/22/2015.
 */
Loader.objects['db/search.in.database.js'] = {
    scForm: null,
    stForm: null,
    qForm: null,
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

        var select = Forms.createElement('select', {label: 'Select table', options: []});
        var ids = Forms.createElement('input', {label: 'Enter refid\'s, separated by comma'});
        var queryOut = newElement('div', {class: 'table-wrapper', style: 'border: 1px solid black'});
        var qSubmit = Forms.createElement('submit', {attr: {value: 'Press to process'}});
		var directQuery = Forms.createElement('input', {label: 'Enter query'});
        var qForm = newElement('form', {onsubmit: "Loader.objects['"+name+"'].doQuery(); return false;"}, [select,ids,qSubmit, queryOut, directQuery]);
        this.qForm = {
            ids: ids,
            table: select,
			directQuery: directQuery
        }
        this.findTables();
        
        return newElement('div', {}, [
            newElement('h2', {}, 'Search column'),
            scForm,
            newElement('hr'),
            newElement('h2', {}, 'Search value over ALL database'),
            stForm,
            newElement('hr'),
            newElement('h2', {}, 'Do select on table'),
            qForm]);
    },

    findTables: function(){
        var data = this.encode({method: 'showTables'});
        var me = this;
        $.ajax({
            url: "php/search.in.db.php",
            method: 'POST',
            data: data
        }).done(function(r) {
            
            r = JSON.parse(r);
            var select = me.qForm.table.querySelector('select');
            for(var i = 0; i < r.length; i++) {
                select.appendChild(newElement('option', {'value': r[i]}, r[i].replace('ppxray_', '')));
            }
        }); 
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

    doQuery: function(){
        var select = this.qForm.table.querySelector('select');
        var table = select.options[select.selectedIndex].value;
        if(!table) {
            return;
        }
		var directQuery = this.qForm.directQuery.querySelector('input').value;
        $.ajax({
            url: "php/search.in.db.php",
            method: 'POST',
            data: this.encode({
				method: 'query',
				directQuery: directQuery,
				ids: this.qForm.ids.querySelector('input').value,
				table: table
			})
        }).done(function(r){
            try {
                r = JSON.parse(r);

                var columns = r && r[0] ? Object.keys(r[0]) : null;
                if (columns) {
                    var rows = [];
                    var header = [];
                    for (var key1 in columns) {
                        header.push(newElement('th', {}, columns[key1]));
                    }
                    rows.push(newElement('tr', {}, header));

                    for (var i = 0; i < r.length; i++) {
                        var cells = [];
                        for (var j = 0; j < columns.length; j++) {
                            var col = columns[j];
                            cells.push(newElement('td', {}, r[i][col]));
                        }
                        rows.push(newElement('tr', {}, cells));
                    }
                    var w = document.querySelector('.table-wrapper');
                    w.innerHTML = '';
                    w.appendChild(newElement('table', {border: 1}, rows))
                }
            } catch (e) {
                alert('Error. May be data is too large. Please specify refids');
            }
            console.log(r);
        })
    }
};