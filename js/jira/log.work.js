/**
 * Created by rsmirnou on 6/22/2015.
 */
/**
 * Created by rsmirnou on 6/19/2015.
 */
Loader.objects['jira/log.work.js'] = {
    createGui: function(){
        var code = "var sYear = prompt('Enter start year: ', new Date().getFullYear());\n"+
                "var sMonth = prompt('Enter start month : ', new Date().getMonth()+1);\n"+
                "var sDay = prompt('Enter start day: ', 1);\n"+
                "\n"+
                "var eYear = prompt('Enter end year: ', new Date().getFullYear());\n"+
                "var eMonth = prompt('Enter end month : ', new Date().getMonth()+1);\n"+
                "var eDay = prompt('Enter end day: ', (function (m, y) {return m===2 ? y & 3 || !(y%25) && y & 15 ? 28 : 29 : 30 + (m+(m>>3)&1);})(new Date().getMonth()+1, new Date().getFullYear()));\n"+
                "\n"+
                "if(sYear && sMonth && sDay && eYear && eMonth && eDay) {\n"+
                "	var sDate = new Date(sYear, sMonth-1, sDay);\n"+
                "	var eDate = new Date(eYear, eMonth-1, eDay);\n"+
                "\n"+
                "	var workLogDialogWindow = null;\n"+
                "	var obSubmitDialogWindow = false;\n"+
                "	var worInterval = setInterval(function(){\n"+
                "		\n"+
                "		workLogDialogWindow = document.getElementById('log-work-dialog');\n"+
                "		if(workLogDialogWindow == null) {\n"+
                "			obSubmitDialogWindow = false;\n"+
                "			return;\n"+
                "		}\n"+
                "		if(obSubmitDialogWindow){\n"+
                "			return;\n"+
                "		}\n"+
                "		\n"+
                "		if(sDate.getDay() > 0 && sDate.getDay() < 6) {\n"+
                "			var hours = document.getElementById('scn-log-work-time-logged');\n"+
                "			hours.value = 8;\n"+
                "			var workType = document.getElementById('scn-log-work-wl-type');\n"+
                "			for(var i = 0; i < workType.options.length; i++){\n"+
                "				if(workType.options[i].innerHTML.trim() == 'Development'){\n"+
                "					workType.options[i].selected = true;\n"+
                "					break;\n"+
                "				}\n"+
                "			}\n"+
                "			var locale = 'en-us';\n"+
                "			var month = sDate.toLocaleString(locale, { month: 'short' });\n"+
                "			\n"+
                "			var dateStart = document.getElementById('scn-log-work-date-logged-date-picker');\n"+
                "			dateStart.value = sDate.getDate() + '/'+month+'/'+(sDate.getFullYear()-2000)+' ' + '10:00 AM';\n"+
                "			\n"+
                "			obSubmitDialogWindow = true;\n"+
                "		}\n"+
                "		sDate = new Date(sDate.getTime() + 24*3600*1000);\n"+
                "		if(sDate.getTime() > eDate.getTime()){\n"+
                "			clearInterval(worInterval);\n"+
                "		}\n"+
                "		\n"+
                "	}, 500);\n"+
                "}\n";

        return newElement('pre', {}, code);
    },
};