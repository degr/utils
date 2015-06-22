var Loader = {
    files: [
        'parse/code/properties.container.js',
        'parse/code/function.arguments.js',
        'parse/code/hql.to.sql.js',
        'convert/code.style.js',
        'jira/log.work.js',
        'convert/add.quotes.js'
    ],
    objects: {},
    start: function(){
        for(var i = 0; i < this.files.length; i++) {
            this.loadScript(this.files[i]);
        }
    },
    loadScript: function(file){
        var script = document.createElement('script');
        script.onload = function() {
            Loader.buildTab(file, Loader.objects[file].createGui());
        };
        script.src = 'js/' + file;
        document.getElementsByTagName('head')[0].appendChild(script);
    },

    buildTab: function(name, tab){
        var header = document.querySelector('.tab-header');
        var hidden = true;
        if(header.getAll('a').length == 0) {
            hidden = false;
        }
        var a = newElement('a', {'href':'#', 'data-tab':name, onclick: 'Loader.openTab("'+name+'");return false;', 'class':(!hidden ? 'active' : '')}, name);

        var tabWrapper = newElement('div', {'class': 'tab ' + (hidden  ? 'hidden' : ''), 'data-tab':name}, [tab]);
        header.appendChild(a);
        document.querySelector('.tab-content').appendChild(tabWrapper);
        this.fixTabsPositions();
    },
    fixTabsPositions: function () {
        var header = document.body.get('.tab-header');
        var els = header.getAll('a');
        var order = {};
        for(var k = 0; k < Loader.files.length; k++) {
            order[Loader.files[k]] = null;
        }
        for(var i = 0; i < els.length; i++) {
            var el = els[i];
            el.remove();
            order[el.getAttribute('data-tab')] = el;
        }

        for(var j in order) {
            if(order[j]) header.appendChild(order[j]);
        }
    },
    openTab: function(name){
        var tabs = document.body.getAll('.tab-content .tab');
        for(var i = 0; i < tabs.length; i++) {
            var tab = tabs[i];
            if(tab.getAttribute('data-tab') == name) {
                tab.removeClass('hidden');
            } else {
                tab.addClass('hidden');
            }
        }
        var els = document.body.getAll('.tab-header a');
        for(var j = 0; j < els.length; j++) {
            var h = els[j];
            if(h.getAttribute('data-tab') == name) {
                h.addClass('active');
            } else {
                h.removeClass('active');
            }
        }
    }
};