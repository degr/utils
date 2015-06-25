/**
 * Created by rsmirnou on 6/22/2015.
 */
/**
 * Created by rsmirnou on 6/19/2015.
 */
Loader.objects['components/autocomplete.js'] = {
    createGui: function(){
        var code = "<h3>Insert CSS code: </h3>"+
            ".autocomplete-item{\n"+
            "	background-color: lightgray;\n"+
            "}\n"+
            ".autocomplete-item.active{\n"+
            "	background-color: steelblue;\n"+
            "}\n"+
        "<h3>Insert some helper methods such as event handlers and className handlers: </h3>"+
        "Element.prototype.guid = 0;\n"+
        "\n"+
        "Element.prototype.fixEvent = function(event) {\n"+
        "	event = event || window.event;\n"+
        "	if (event.isFixed )return event;\n"+
        "	event.isFixed = true ;\n"+
        "	event.preventDefault = event.preventDefault || function(){this.returnValue = false};\n"+
        "	event.stopPropagation = event.stopPropagaton || function(){this.cancelBubble = true};\n"+
        "	event.stop = function(){\n"+
        "		event.preventDefault();\n"+
        "		event.stopPropagation();\n"+
        "	}\n"+
        "	if (!event.target)\n"+
        "		event.target = event.srcElement;\n"+
        "\n"+
        "	if (!event.relatedTarget && event.fromElement)\n"+
        "		event.relatedTarget = event.fromElement == event.target ? event.toElement : event.fromElement;\n"+
        "	\n"+
        "\n"+
        "	if ( event.pageX == null && event.clientX != null ) {\n"+
        "		var html = document.documentElement, body = document.body;\n"+
        "		event.pageX = event.clientX + (html && html.scrollLeft || body && body.scrollLeft || 0) - (html.clientLeft || 0);\n"+
        "		event.pageY = event.clientY + (html && html.scrollTop || body && body.scrollTop || 0) - (html.clientTop || 0);\n"+
        "	}\n"+
        "	if ( !event.which && event.button ) {\n"+
        "		event.which = (event.button & 1 ? 1 : ( event.button & 2 ? 3 : ( event.button & 4 ? 2 : 0 ) ));\n"+
        "	}\n"+
        "	return event\n"+
        "};\n"+
        "\n"+
        "Element.prototype.commonHandle = function(event) {\n"+
        "	event = this.fixEvent(event);\n"+
        "	var handlers = this.events[event.type];\n"+
        "	for ( var g in handlers ) {\n"+
        "		var handler = handlers[g];\n"+
        "\n"+
        "		var ret = handler.call(this, event);\n"+
        "		if ( ret === false ) {\n"+
        "			event.preventDefault();\n"+
        "			event.stopPropagation()\n"+
        "		}\n"+
        "	}\n"+
        "}\n"+
        "\n"+
        "\n"+
        "Element.prototype.addEvent = function(type, handler) {\n"+
        "	if(!type)throw new Error('Can\'t add event, because event type is undefined or null');\n"+
        "	if(!handler)throw new Error('Can\'t add event, because event handler is undefined or null');\n"+
        "	\n"+
        "	if (!handler.guid) {\n"+
        "		handler.guid = ++this.guid\n"+
        "	}\n"+
        "	\n"+
        "	if (!this.events) {\n"+
        "		this.events = {};\n"+
        "		this.handle = function(event) {\n"+
        "			if (typeof Event !== 'undefined') {\n"+
        "				return this.commonHandle.call(this, event)\n"+
        "			}\n"+
        "		}\n"+
        "	}\n"+
        "	\n"+
        "	if (!this.events[type]) {\n"+
        "		this.events[type] = {};\n"+
        "		\n"+
        "		if (this.addEventListener)\n"+
        "			this.addEventListener(type, this.handle, false);\n"+
        "		else if (this.attachEvent)\n"+
        "			this.attachEvent('on' + type, this.handle)\n"+
        "	}\n"+
        "	\n"+
        "	this.events[type][handler.guid] = handler\n"+
        "},\n"+
        "Element.prototype.removeEvent = function(type, handler) {\n"+
        "	var handlers = this.events && this.events[type];\n"+
        "	\n"+
        "	if (!handlers) return;\n"+
        "	\n"+
        "	delete this.events[type][handler.guid];\n"+
        "	\n"+
        "	if (this.removeEventListener) {\n"+
        "		this.removeEventListener(type, handler, false);\n"+
        "	} else if (this.detachEvent) {\n"+
        "		this.detachEvent('on' + type, handler);\n"+
        "	}\n"+
        "}\n"+
        "/**\n"+
        " * add classname to element. Chainable.\n"+
        " * @param className\n"+
        " * @returns {HTMLElement}\n"+
        " */\n"+
        "Element.prototype.addClass = function(className){\n"+
        "    var c=this.className.split(' ');for(var i=0;i&lt;c.length;i++)if(c[i]==className)return;this.className+=\" \"+className;\n"+
        "};\n"+
        "/**\n"+
        " * Remove classname from element. Chainable.\n"+
        " * @param className\n"+
        " * @returns {HTMLElement}\n"+
        " */\n"+
        "Element.prototype.removeClass = function(className){\n"+
        "    var c=this.className.split(' ');for(var i=0;i&lt;c.length;i++)if(c[i]==className){c.splice(i,1);break;}this.className=c.join(' ',className);\n"+
        "};\n"+
            "/**\n"+
            " * check, have element class or not\n"+
            " * @param c\n"+
            " * @returns {boolean}\n"+
            " */\n"+
            "Element.prototype.hasClass = function(c){\n"+
            "    return this.className.split(' ').indexOf(c) != -1 ? true : false;\n"+
            "};\n"+
            "\n"+
            "\n"+
        "\n"+
        "<h3>Autocomplete class definition: </h3>"+

            "var Autocomplete = function(element, searchHandler){\n"+
            "\n"+
            "	this.element = element;/*your element*/\n"+
            "	this.input = null;/*input element (nameless)*/\n"+
            "	this.wrapper = null;/*wrapper*/\n"+
            "	this.box = null;/*dom element with hint items*/\n"+
            "	this.data = [];/*data array*/\n"+
            "	this.currentSelection = null;\n"+
            "	this.search = null;/*search word*/\n"+
            "	this.selectedItem = null;/*currently selected search item*/\n"+
            "	this.activeItem = null;/*current active item. Chosen selected item.*/\n"+
            "	this.searchHandler = searchHandler;/*handler for onchange event. Recieve this.search as argument*/\n"+
            "	var me = this;\n"+
            "	\n"+
            "	this.setData = function(data){\n"+
            "		this.data = data;\n"+
            "	};\n"+
            "	\n"+
            "	this.showHint = function(search){\n"+
            "		if(!this.data)return;\n"+
            "		search = search.trim();\n"+
            "		if(search == me.search)return;\n"+
            "		me.search = search;\n"+
            "		this.box.removeClass('hidden');\n"+
            "		this.box.innerHTML = '';\n"+
            "		\n"+
            "		for(var i = 0; i < this.data.length; i++) {\n"+
            "			var c = this.data[i];\n"+
            "			if(c.value.indexOf(search) == -1)continue;\n"+
            "			var li = document.createElement('li');\n"+
            "			li.innerHTML = me.makeTextBold(c.value);\n"+
            "			li.className = 'autocomplete-item';\n"+
            "			li.setAttribute('data-id', c.id);\n"+
            "			li.addEvent('click', me.onmouseclick);\n"+
            "			this.box.appendChild(li);\n"+
            "		}\n"+
            "	};\n"+
            "	\n"+
            "	this.hideHint = function(){\n"+
            "		me.box.addClass('hidden');\n"+
            "		me.box.innerHTML = '';\n"+
            "	};\n"+
            "	this.highlightSearchItem = function(up){\n"+
            "		var items = me.box.querySelectorAll('li.autocomplete-item');\n"+
            "        var length = items.length;\n"+
            "        var index;\n"+
            "        switch(length) {\n"+
            "            case 0:\n"+
            "                return;\n"+
            "            case 1:\n"+
            "                index = 0;\n"+
            "                break;\n"+
            "            default:\n"+
            "                index = me.currentSelection != null ? me.currentSelection + (up ? -1 : 1) : 0;\n"+
            "                if(index == length) {\n"+
            "                    index--;\n"+
            "                } else if(index < 0) {\n"+
            "                    index = 0;\n"+
            "                }\n"+
            "        }\n"+
            "        if(me.currentSelection != index) {\n"+
            "			me.currentSelection = index;\n"+
            "			me.highlight(items[index]);\n"+
            "        }\n"+
            "	};\n"+
            "	this.highlight = function(el) {\n"+
            "		var active = me.box.querySelector('li.autocomplete-item.active');\n"+
            "		if(active)active.removeClass('active');\n"+
            "		el.addClass('active');\n"+
            "	};\n"+
            "	\n"+
            "	this.onmouseclick = function(e){\n"+
            "		var target;\n"+
            "		e.stop();\n"+
            "		if(!e.target.hasClass('autocomplete-item')) {\n"+
            "			var a = e.target;\n"+
            "			while(!a.hasClass('autocomplete-item')) {\n"+
            "				a = a.parentNode;\n"+
            "			}\n"+
            "			target = a;\n"+
            "		} else {\n"+
            "			target = e.target;\n"+
            "		}\n"+
            "		\n"+
            "		var id = target.getAttribute('data-id');\n"+
            "		if(target.hasClass('active')){\n"+
            "			me.selectItem();\n"+
            "		} else {\n"+
            "			var items = me.box.querySelectorAll('.autocomplete-item');\n"+
            "			for(var i = 0; i < items.length; i++) {\n"+
            "				if(items[i] == target) {\n"+
            "					me.currentSelection = i;\n"+
            "					me.highlight(target);\n"+
            "					break;\n"+
            "				}\n"+
            "			}\n"+
            "		}\n"+
            "	};\n"+
            "	this.onkeyup = function(e){\n"+
            "        if(e.keyCode == 38) {\n"+
            "            //up arrow\n"+
            "            me.highlightSearchItem(true);\n"+
            "			e.stop();\n"+
            "        } else if(e.keyCode == 40) {\n"+
            "            //down arrow\n"+
            "            me.highlightSearchItem(false);\n"+
            "			e.stop();\n"+
            "        } else if(e.keyCode == 13) {\n"+
            "            //enter\n"+
            "            me.selectItem();\n"+
            "			e.stop();\n"+
            "        }else if(e.keyCode == 27) {\n"+
            "            //escape\n"+
            "			me.mountActiveItem();\n"+
            "            me.resetSearch();\n"+
            "			e.stop();\n"+
            "        } else {\n"+
            "			me.showHint(me.input.value);\n"+
            "		}\n"+
            "    };\n"+
            "	this.resetSearch = function(){\n"+
            "		me.currentSelection = null;\n"+
            "		me.search = '';\n"+
            "		me.selectedItem = null;\n"+
            "		me.hideHint();\n"+
            "		me.box.innerHTML = '';\n"+
            "	}\n"+
            "	this.selectItem = function(){\n"+
            "		var items = me.box.querySelectorAll('li.autocomplete-item');\n"+
            "		if(!items[me.currentSelection])return;\n"+
            "		var id = parseInt(items[me.currentSelection].getAttribute('data-id'));\n"+
            "		me.activeItem = null;\n"+
            "		for(var i in me.data) {\n"+
            "			if(id == me.data[i].id){\n"+
            "				me.activeItem = me.data[i];\n"+
            "				break;\n"+
            "			}\n"+
            "		}\n"+
            "		if(me.activeItem) {\n"+
            "			me.mountActiveItem();\n"+
            "			me.resetSearch();\n"+
            "		}\n"+
            "	};\n"+
            "	this.mountActiveItem = function(){\n"+
            "		if(!me.activeItem)return;\n"+
            "		me.element.value = me.activeItem.id;\n"+
            "		me.input.value = me.activeItem.value;\n"+
            "	}\n"+
            "	this.makeTextBold = function(text){\n"+
            "        var subSearch = this.search.split(' ');\n"+
            "        subSearch = subSearch.sort(function(v1, v2){return v1.length < v2.length});\n"+
            "        for(var i = 0; i < subSearch.length; i++) {\n"+
            "            if(!subSearch[i])continue;\n"+
            "            var re = new RegExp('(' + subSearch[i].trim() + ')', 'gi');\n"+
            "            text = text.replace(re, '<b>$1</b>');\n"+
            "        }\n"+
            "        return text;\n"+
            "    },\n"+
            "	\n"+
            "	(function(){\n"+
            "		var input = document.createElement('input');\n"+
            "		input.type = element.type ? element.type : 'text';\n"+
            "		input.addClass('autocomplete-input');\n"+
            "		me.input = input;\n"+
            "		\n"+
            "		element.type = 'hidden';\n"+
            "		\n"+
            "		me.wrapper = document.createElement('div');\n"+
            "		me.wrapper.className = 'autocomplete';\n"+
            "		element.parentNode.appendChild(me.wrapper);\n"+
            "		element.remove();\n"+
            "		\n"+
            "		me.box = document.createElement('ul');\n"+
            "		me.box.className = 'autocomplete-box';\n"+
            "		\n"+
            "		me.wrapper.appendChild(element);\n"+
            "		me.wrapper.appendChild(input);\n"+
            "		me.wrapper.appendChild(me.box);\n"+
            "		input.addEvent('keyup', me.onkeyup);\n"+
            "	})();\n"+
            "}\n"+
        "<h3>Initialization. You need to have input[type=\"text\"]#myAutocomplete in your DOM. Also, set your custom function to autocomplete search handler.</h3>"+


        "var input = document.getElementById('myAutocomplete');\n"+
        "var autocomplete = new Autocomplete(input);\n"+
        "autocomplete.searchHandler = autocomplete.showHint;\n"+
        "autocomplete.setData([\n"+
        "	{id:0, value: 'zero'},\n"+
        "	{id:1, value: 'one'},\n"+
        "	{id:2, value: 'two'},\n"+
        "	{id:3, value: 'three'},\n"+
        "	{id:4, value: 'four'},\n"+
        "	{id:5, value: 'five'},\n"+
        "	{id:6, value: 'six'},\n"+
        "	{id:7, value: 'seven'},\n"+
        "	{id:8, value: 'eight'},\n"+
        "	{id:9, value: 'nine'},\n"+
        "]);";

        return newElement('pre', {}, code);
    }
};