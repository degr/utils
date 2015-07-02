/**
 * Created by rsmirnou on 7/2/2015.
 */
/**
 * Created by rsmirnou on 6/19/2015.
 */
Loader.objects['download/web.page.js'] = {
    input: null,
    output: null,
    createGui: function(){
        var sitePosition = 'http://site.loc';
        var html = document.querySelector('html');
        var wrapper = document.createElement("div");
        wrapper.appendChild(html);
        var scripts = wrapper.querySelectorAll('script');
        var images = wrapper.querySelectorAll('img');
        console.log('aaaa');
        var css = wrapper.querySelectorAll('link').filter(function(i){return i.rel && i.rel == 'stylesheet' && i.href;});
        var links = [];
        this.fixLinks(scripts, 'src', sitePosition, links);
        this.fixLinks(images, 'src', sitePosition, links);
        this.fixLinks(css, 'href', sitePosition, links);
        console.log('bbb');
        var out = {html: wrapper.innerHTML, links: links};
        return out;

    },
    fixLinks: function(elements, linkAncor, baseUrl, linksArray){
        var provider = document.createElement('a');
        for(var i = 0; i < elements.length; i++) {
            var el = elements[i];
            if(el[linkAncor]) {
                var base = el.getAttribute(linkAncor);
                linksArray.push(base);
                provider.href = base;
                provider.hostname = baseUrl;
                el.setAttribute(linkAncor,  provider.href);
            }
        }
    },
    onsubmit: function(){
        var v = this.input.value.split('\n');
        for(var i = 0; i < v.length; i++){
            v[i] = '"' + v[i] + '\\n"+';
        }
        this.output.value = v.join('\n');
    }
};

var aa = {
    createGui: function(){
        var sitePosition = 'http://site.loc';
        var html = document.querySelector('html');
        var wrapper = document.createElement("div");
        wrapper.appendChild(html);
        var scripts = wrapper.querySelectorAll('script');
        var images = wrapper.querySelectorAll('img');
        console.log('aaaa');
        var css = wrapper.querySelectorAll('link');
        css = this.filterCss(css);
        console.log('b');
        var links = [];
        this.fixLinks(scripts, 'src', sitePosition, links);
        this.fixLinks(images, 'src', sitePosition, links);
        this.fixLinks(css, 'href', sitePosition, links);
        console.log('bbb');
        var out = {html: wrapper.innerHTML, links: links};
        return out;

    },
    fixLinks: function(elements, linkAncor, baseUrl, linksArray){
        var provider = document.createElement('a');
        for(var i = 0; i < elements.length; i++) {
            var el = elements[i];
            if(el[linkAncor]) {
                var base = el.getAttribute(linkAncor);
                linksArray.push(base);
                provider.href = base;
                provider.hostname = baseUrl;
                el.setAttribute(linkAncor,  provider.href);
            }
        }
    },
    filterCss: function(links){
        var out = [];
        for(var i = 0; i < links.length; i++) {
            if(links[i].rel == 'stylesheet' && links[i].href) {
                out.push(links[i]);
            }
        }
        return out;
    }
};