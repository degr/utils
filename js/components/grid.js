/**
 * Created by rsmirnou on 6/22/2015.
 */
/**
 * Created by rsmirnou on 6/19/2015.
 */
Loader.objects['components/grid.js'] = {
    createGui: function(){
        var code = "<h3>Insert css code: </h3>\n" +
            "\n" +
            ".grid-sorter{\n"+
            "	width: 10px;\n"+
            "	height: 10px;\n"+
            "	display: inline-block;\n"+
            "	box-sizing: border-box;\n"+
            "	border-top: 5px solid black;\n"+
            "	border-left: 5px solid white;\n"+
            "	border-right: 5px solid white;\n"+
            "	position: relative;\n"+
            "	top: 3px;\n"+
            "}\n"+
            "\n"+
            ".grid-sorter[data-sort-order=\"desc\"]{\n"+
        "	border-bottom: 5px solid black;\n"+
        "	border-top: none;\n"+
        "	bottom: 3px;\n"+
        "	top: initial;\n"+
        "}\n"+
        "\n"+
        "\n"+
        "<h3>Than you need implement Element.prototype.addEvent function: </h3>" +
        "\n"+
        "Element.prototype.guid = 0;\n"+
        "\n"+
        "Element.prototype.fixEvent = function(event) {\n"+
        "	event = event || window.event;\n"+
        "	if (event.isFixed )return event;\n"+
        "	event.isFixed = true ;\n"+
        "	event.preventDefault = event.preventDefault || function(){this.returnValue = false};\n"+
        "	event.stopPropagation = event.stopPropagaton || function(){this.cancelBubble = true};\n"+
        "		\n"+
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
        "	delete handlers[handler.guid];\n"+
        "	\n"+
        "	for(var any in handlers) return;\n"+
        "	if (this.removeEventListener) {\n"+
        "		this.removeEventListener(type, this.handle, false);\n"+
        "	} else if (this.detachEvent) {\n"+
        "		this.detachEvent('on' + type, this.handle);\n"+
        "	}\n"+
        "	delete this.events[type];\n"+
        "\n"+
        "	\n"+
        "	for (var any in this.events) return\n"+
        "	try {\n"+
        "		delete this.handle;\n"+
        "		delete this.events \n"+
        "		delete this.events \n"+
        "	} catch(e) { // IE\n"+
        "		this.removeAttribute('handle');\n"+
        "		this.removeAttribute('events')\n"+
        "	}\n"+
        "}\n"+
        "\n"+
        "<h3>There is a grid class: </h3>" +

                "\n"+
                "var Grid = function(element){\n"+
                "	this.element = element;\n"+
                "	this.model = {};\n"+
                "	this.tHead = null;\n"+
                "	this.tBody = null;\n"+
                "	this.data = null;\n"+
                "	this.sort = null;\n"+
                "	var me = this;\n"+
                "	/**\n"+
                "	 * set model to grid. Remove all old data.\n"+
                "	 */\n"+
                "	this.setModel = function(model){\n"+
                "		this.element.innerHTML = '';\n"+
                "		\n"+
                "		this.model = model;\n"+
                "		this.tHead = document.createElement('thead');\n"+
                "		this.tBody = document.createElement('tbody');\n"+
                "		this.element.appendChild(this.tHead);\n"+
                "		this.element.appendChild(this.tBody);\n"+
                "		\n"+
                "		\n"+
                "		for(var i in model.columns){\n"+
                "			var c = model.columns[i];\n"+
                "			var th = document.createElement('th');\n"+
                "			th.setAttribute('data-name', i);\n"+
                "			if(!c.label && c.label !== '') {\n"+
                "				th.innerHTML = i;\n"+
                "			} else if(c.label){\n"+
                "				th.innerHTML = c.label;\n"+
                "			}\n"+
                "			this.tHead.appendChild(th);\n"+
                "			if(c.sort) {\n"+
                "				var sorter = document.createElement('a');\n"+
                "				sorter.className = 'grid-sorter';\n"+
                "				sorter.setAttribute('data-sort-order', c.sort.direction == 'desc' ? 'desc' : 'asc');\n"+
                "				var me = this;\n"+
                "				sorter.addEvent('click', me.applySortOnClick);\n"+
                "				th.appendChild(sorter);\n"+
                "				\n"+
                "				if(c.sort.active) {\n"+
                "					this.sort = c.sort;\n"+
                "					this.sort.id = i;\n"+
                "				}\n"+
                "			}\n"+
                "		}\n"+
                "	},\n"+
                "	/**\n"+
                "	 * Apply sort on sorter click\n"+
                "	 */\n"+
                "	this.applySortOnClick = function(e){\n"+
                "		var el = e.target;\n"+
                "		var cols = me.model.columns;\n"+
                "		var id= el.parentNode.getAttribute('data-name');\n"+
                "		var colModel = cols[id];\n"+
                "		var sort = colModel.sort;\n"+
                "		\n"+
                "		if(sort.active) {\n"+
                "			sort.order = sort.order == 'desc' ? 'asc' : 'desc'\n"+
                "			el.setAttribute('data-sort-order', sort.order);\n"+
                "		} else {\n"+
                "			for(var i in cols) {\n"+
                "				if(cols[i].sort && cols[i].sort.active) {\n"+
                "					model.columns[i].sort.active = false;\n"+
                "				}\n"+
                "			}\n"+
                "			sort.active = true;\n"+
                "		}\n"+
                "		if(!sort.id)sort.id = id;\n"+
                "		me.sort = sort;\n"+
                "		me.setData(me.data);\n"+
                "	}\n"+
                "	/**\n"+
                "	 * set data to grid. Array of {} with key-value pairs according to model\n"+
                "	 */\n"+
                "	this.setData = function(data){\n"+
                "		this.data = data;\n"+
                "		if(this.sort){\n"+
                "			this.applySort(this.sort);\n"+
                "		}\n"+
                "		this.tBody.innerHTML = '';\n"+
                "		for(var i = 0; i &lt; data.length; i++){\n"+
                "			this.addRow(data[i]);\n"+
                "		}\n"+
                "	}\n"+
                "	/**\n"+
                "	 * apply active sorter\n"+
                "	 */\n"+
                "	this.applySort = function(sort){\n"+
                "		\n"+
                "		this.data.sort(sort.customSort ? sort.customSort : function(i1, i2){\n"+
                "			if(sort.order && sort.order.toLowerCase() == 'desc') {\n"+
                "				return i1[sort.id] &lt; i2[sort.id];\n"+
                "			} else {\n"+
                "				return i1[sort.id] &gt; i2[sort.id];\n"+
                "			}\n"+
                "		});\n"+
                "	}\n"+
                "	/**\n"+
                "	 * add one row. Row is {} with key-value pairs according to model\n"+
                "	 */\n"+
                "	this.addRow = function(row){\n"+
                "		var r = document.createElement('tr');\n"+
                "		for(var i in this.model.columns) {\n"+
                "			var m = this.model.columns[i];\n"+
                "			var td = document.createElement('td');\n"+
                "			td.setAttribute('data-name', i);\n"+
                "			if(m.renderer) {\n"+
                "				var o = m.renderer(row[i]);\n"+
                "				if(typeof o == 'object') {\n"+
                "					td.appendChild(o);\n"+
                "				} else {\n"+
                "					td.innerHTML = o;\n"+
                "				}\n"+
                "			} else {\n"+
                "				td.innerHTML = row[i] ? row[i] : null;\n"+
                "			}\n"+
                "			r.appendChild(td);\n"+
                "		}\n"+
                "		this.tBody.appendChild(r); \n"+
                "	}\n"+
                "	\n"+
                "	/**\n"+
                "	 * set new sort order, but not apply it.\n"+
                "	 */\n"+
                "	this.setSort = function(sort){\n"+
                "		this.sort = sort;\n"+
                "	}\n"+
                "}\n"+
        "<h3>And at last, init it using this code: </h3>" +
            "\n"+
            "\n"+
            "var model = {\n"+
            "	id: 'person_grid',\n"+
            "	columns: {\n"+
            "		id: {\n"+
            "			type: 'int',\n"+
            "			label: 'Identifier',\n"+
            "			sort: {\n"+
            "				order: 'asc',\n"+
            "				active: true,\n"+
            "				customSort: null\n"+
            "			}\n"+
            "		},\n"+
            "		name: {\n"+
            "			type: 'string',\n"+
            "			label: 'Name',\n"+
            "			sort: {\n"+
            "				order: 'asc',\n"+
            "				active: false,\n"+
            "				customSort: null\n"+
            "			}\n"+
            "		},\n"+
            "		smoker: {\n"+
            "			type: 'boolean',\n"+
            "			renderer: function(i){return '&lt;input type=\"checkbox\" '+(i ? 'checked' : '')+' /&gt;'},\n"+
        "			label: 'Smoker',\n"+
        "			sort: {\n"+
        "				order: 'asc',\n"+
        "				active: false,\n"+
        "				customSort: null\n"+
        "			}\n"+
        "		},\n"+
        "		control: {\n"+
        "			type: 'object',\n"+
        "			label: 'Control',\n"+
        "			sort: null,\n"+
        "			renderer: function(){\n"+
        "				var w = document.createElement('div');\n"+
        "				var del = document.createElement('a');\n"+
        "				var separator = document.createElement('span');\n"+
        "				separator.innerHTML = ' | ';\n"+
        "				del.setAttribute('href', '#');\n"+
        "				del.innerHTML = 'Delete';\n"+
        "				var edit = document.createElement('a');\n"+
        "				edit.setAttribute('href', '#');\n"+
        "				edit.innerHTML = 'Edit';\n"+
        "				\n"+
        "				w.appendChild(edit);\n"+
        "				w.appendChild(separator)\n"+
        "				w.appendChild(del);\n"+
        "				return w;\n"+
        "			}\n"+
        "		}\n"+
        "	}\n"+
        "};\n"+
        "\n"+
        "\n"+
        "var table = new Grid(document.getElementById('myGrid'));\n"+
        "table.setModel(model);\n"+
        "table.setData([\n"+
        "	{id: 1, name: 'Bill', smoker: true},\n"+
        "	{id: 2, name: 'Alex', smoker: false},\n"+
        "	{id: 3, name: 'Sam', smoker: 1}\n"+
        "]);\n"+
        "\n";

        return newElement('pre', {}, code);
    }
};