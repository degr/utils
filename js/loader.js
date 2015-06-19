var Loader = {
    files: [
        'parse/code/properties.container.js',
        'parse/code/function.arguments.js'
    ],
    objects: {},
    start: function(){
        for(var i = 0; i < this.files.length; i++) {
            this.loadScript(this.files[i]);
        }
    },
    loadScript: function(file){
        var me = this;
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
    },
    openTab: function(name){
        var els = document.body.getAll('.tab-content .tab');
        for(var i = 0; i < els.length; i++) {
            var tab = els[i];
            if(tab.getAttribute('data-tab') == name) {
                tab.removeClass('hidden');
            } else {
                tab.addClass('hidden');
            }
        }
        var els = document.body.getAll('.tab-header a');
        for(var i = 0; i < els.length; i++) {
            var tab = els[i];
            if(tab.getAttribute('data-tab') == name) {
                tab.addClass('active');
            } else {
                tab.removeClass('active');
            }
        }
    }
};