﻿function DPH_Apply(dph, text) {

	var dp = { sh: { Toolbar: {}, Utils: {}, RegexLib: {}, Brushes: {}, Strings: { AboutDialog: '<html><head><title>About...</title></head><body class="dp-about"><table cellspacing="0"><tr><td class="copy"><p class="title">dp.SyntaxHighlighter</div><div class="para">Version: {V}</p><p><a href="http://www.dreamprojections.com/syntaxhighlighter/?ref=about" target="_blank">http://www.dreamprojections.com/syntaxhighlighter</a></p>&copy;2004-2007 Alex Gorbatchev.</td></tr><tr><td class="footer"><input type="button" class="close" value="OK" onClick="window.close()"/></td></tr></table></body></html>' }, ClipboardSwf: null, Version: '1.5.1' } }; dp.SyntaxHighlighter = dp.sh; dp.sh.Toolbar.Commands = {
		ExpandSource: {
			label: '+ expand source', check: function (highlighter) { return highlighter.collapse; }, func: function (sender, highlighter) { sender.parentNode.removeChild(sender); highlighter.div.className = highlighter.div.className.replace('collapsed', ''); }
		}, ViewSource: {
			label: 'view plain', func: function (sender, highlighter) { var code = dp.sh.Utils.FixForBlogger(highlighter.originalCode).replace(/</g, '&lt;'); var wnd = window.open('', '_blank', 'width=750, height=400, location=0, resizable=1, menubar=0, scrollbars=0'); wnd.document.write('<textarea style="width:99%;height:99%">' + code + '</textarea>'); wnd.document.close(); }
		}, CopyToClipboard: {
			label: 'copy to clipboard', check: function () { return window.clipboardData != null || dp.sh.ClipboardSwf != null; }, func: function (sender, highlighter) {
				var code = dp.sh.Utils.FixForBlogger(highlighter.originalCode).replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&'); if (window.clipboardData) { window.clipboardData.setData('text', code); }
				else if (dp.sh.ClipboardSwf != null) {
					var flashcopier = highlighter.flashCopier; if (flashcopier == null) { flashcopier = document.createElement('div'); highlighter.flashCopier = flashcopier; highlighter.div.appendChild(flashcopier); }
					flashcopier.innerHTML = '<embed src="' + dp.sh.ClipboardSwf + '" FlashVars="clipboard=' + encodeURIComponent(code) + '" width="0" height="0" type="application/x-shockwave-flash"></embed>';
				}
				alert('The code is in your clipboard now');
			}
		}, PrintSource: {
			label: 'print', func: function (sender, highlighter) { var iframe = document.createElement('IFRAME'); var doc = null; iframe.style.cssText = 'position:absolute;width:0px;height:0px;left:-500px;top:-500px;'; document.body.appendChild(iframe); doc = iframe.contentWindow.document; dp.sh.Utils.CopyStyles(doc, window.document); doc.write('<div class="' + highlighter.div.className.replace('collapsed', '') + ' printing">' + highlighter.div.innerHTML + '</div>'); doc.close(); iframe.contentWindow.focus(); iframe.contentWindow.print(); alert('Printing...'); document.body.removeChild(iframe); }
		}, About: {
			label: '?', func: function (highlighter) { var wnd = window.open('', '_blank', 'dialog,width=300,height=150,scrollbars=0'); var doc = wnd.document; dp.sh.Utils.CopyStyles(doc, window.document); doc.write(dp.sh.Strings.AboutDialog.replace('{V}', dp.sh.Version)); doc.close(); wnd.focus(); }
		}
	}; dp.sh.Toolbar.Create = function (highlighter) {
		var div = document.createElement('DIV'); div.className = 'tools'; for (var name in dp.sh.Toolbar.Commands) {
			var cmd = dp.sh.Toolbar.Commands[name]; if (cmd.check != null && !cmd.check(highlighter))
				continue; div.innerHTML += '<a href="#" onclick="dp.sh.Toolbar.Command(\'' + name + '\',this);return false;">' + cmd.label + '</a>';
		}
		return div;
	}
	dp.sh.Toolbar.Command = function (name, sender) {
		var n = sender; while (n != null && n.className.indexOf('dp-highlighter') == -1)
			n = n.parentNode; if (n != null)
			dp.sh.Toolbar.Commands[name].func(sender, n.highlighter);
	}
	dp.sh.Utils.CopyStyles = function (destDoc, sourceDoc) {
		var links = sourceDoc.getElementsByTagName('link'); for (var i = 0; i < links.length; i++)
			if (links[i].rel.toLowerCase() == 'stylesheet')
				destDoc.write('<link type="text/css" rel="stylesheet" href="' + links[i].href + '"></link>');
	}
	dp.sh.Utils.FixForBlogger = function (str) { return (dp.sh.isBloggerMode == true) ? str.replace(/<br\s*\/?>|&lt;br\s*\/?&gt;/gi, '\n') : str; }
	dp.sh.RegexLib = { MultiLineCComments: new RegExp('/\\*[\\s\\S]*?\\*/', 'gm'), SingleLineCComments: new RegExp('//.*$', 'gm'), SingleLinePerlComments: new RegExp('#.*$', 'gm'), DoubleQuotedString: new RegExp('"(?:\\.|(\\\\\\")|[^\\""\\n])*"', 'g'), SingleQuotedString: new RegExp("'(?:\\.|(\\\\\\')|[^\\''\\n])*'", 'g') }; dp.sh.Match = function (value, index, css) { this.value = value; this.index = index; this.length = value.length; this.css = css; }
	dp.sh.Highlighter = function () { this.noGutter = false; this.addControls = true; this.collapse = false; this.tabsToSpaces = true; this.wrapColumn = 80; this.showColumns = true; }
	dp.sh.Highlighter.SortCallback = function (m1, m2) {
		if (m1.index < m2.index)
			return -1; else if (m1.index > m2.index)
			return 1; else {
			if (m1.length < m2.length)
				return -1; else if (m1.length > m2.length)
				return 1;
		}
		return 0;
	}
	dp.sh.Highlighter.prototype.CreateElement = function (name) { var result = document.createElement(name); result.highlighter = this; return result; }
	dp.sh.Highlighter.prototype.GetMatches = function (regex, css) {
		var index = 0; var match = null; while ((match = regex.exec(this.code)) != null)
			this.matches[this.matches.length] = new dp.sh.Match(match[0], match.index, css);
	}
	dp.sh.Highlighter.prototype.AddBit = function (str, css) {
		if (str == null || str.length == 0)
			return; var span = this.CreateElement('SPAN'); str = str.replace(/ /g, '&nbsp;'); str = str.replace(/</g, '&lt;'); str = str.replace(/\n/gm, '&nbsp;<br>'); if (css != null) {
				if ((/br/gi).test(str)) {
					var lines = str.split('&nbsp;<br>'); for (var i = 0; i < lines.length; i++) {
						span = this.CreateElement('SPAN'); span.className = css; span.innerHTML = lines[i]; this.div.appendChild(span); if (i + 1 < lines.length)
							this.div.appendChild(this.CreateElement('BR'));
					}
				}
				else { span.className = css; span.innerHTML = str; this.div.appendChild(span); }
			}
		else { span.innerHTML = str; this.div.appendChild(span); }
	}
	dp.sh.Highlighter.prototype.IsInside = function (match) {
		if (match == null || match.length == 0)
			return false; for (var i = 0; i < this.matches.length; i++) {
				var c = this.matches[i]; if (c == null)
					continue; if ((match.index > c.index) && (match.index < c.index + c.length))
					return true;
			}
		return false;
	}
	dp.sh.Highlighter.prototype.ProcessRegexList = function () {
		for (var i = 0; i < this.regexList.length; i++)
			this.GetMatches(this.regexList[i].regex, this.regexList[i].css);
	}
	dp.sh.Highlighter.prototype.ProcessSmartTabs = function (code) {
		var lines = code.split('\n'); var result = ''; var tabSize = 4; var tab = '\t'; function InsertSpaces(line, pos, count) {
			var left = line.substr(0, pos); var right = line.substr(pos + 1, line.length); var spaces = ''; for (var i = 0; i < count; i++)
				spaces += ' '; return left + spaces + right;
		}
		function ProcessLine(line, tabSize) {
			if (line.indexOf(tab) == -1)
				return line; var pos = 0; while ((pos = line.indexOf(tab)) != -1) { var spaces = tabSize - pos % tabSize; line = InsertSpaces(line, pos, spaces); }
			return line;
		}
		for (var i = 0; i < lines.length; i++)
			result += ProcessLine(lines[i], tabSize) + '\n'; return result;
	}
	dp.sh.Highlighter.prototype.SwitchToList = function () {
		var html = this.div.innerHTML.replace(/<(br)\/?>/gi, '\n'); var lines = html.split('\n'); if (this.addControls == true)
			this.bar.appendChild(dp.sh.Toolbar.Create(this)); if (this.showColumns) {
				var div = this.CreateElement('div'); var columns = this.CreateElement('div'); var showEvery = 10; var i = 1; while (i <= 150) {
					if (i % showEvery == 0) { div.innerHTML += i; i += (i + '').length; }
					else { div.innerHTML += '&middot;'; i++; }
				}
				columns.className = 'columns'; columns.appendChild(div); this.bar.appendChild(columns);
			}
		for (var i = 0, lineIndex = this.firstLine; i < lines.length - 1; i++, lineIndex++) { var li = this.CreateElement('LI'); var span = this.CreateElement('SPAN'); li.className = (i % 2 == 0) ? 'alt' : ''; span.innerHTML = lines[i] + '&nbsp;'; li.appendChild(span); this.ol.appendChild(li); }
		this.div.innerHTML = '';
	}
	dp.sh.Highlighter.prototype.Highlight = function (code) {
		function Trim(str) { return str.replace(/^\s*(.*?)[\s\n]*$/g, '$1'); }
		function Chop(str) { return str.replace(/\n*$/, '').replace(/^\n*/, ''); }
		function Unindent(str) {
			var lines = dp.sh.Utils.FixForBlogger(str).split('\n'); var indents = new Array(); var regex = new RegExp('^\\s*', 'g'); var min = 1000; for (var i = 0; i < lines.length && min > 0; i++) {
				if (Trim(lines[i]).length == 0)
					continue; var matches = regex.exec(lines[i]); if (matches != null && matches.length > 0)
					min = Math.min(matches[0].length, min);
			}
			if (min > 0)
				for (var i = 0; i < lines.length; i++)
					lines[i] = lines[i].substr(min); return lines.join('\n');
		}
		function Copy(string, pos1, pos2) { return string.substr(pos1, pos2 - pos1); }
		var pos = 0; if (code == null)
			code = ''; this.originalCode = code; this.code = Chop(Unindent(code)); this.div = this.CreateElement('DIV'); this.bar = this.CreateElement('DIV'); this.ol = this.CreateElement('OL'); this.matches = new Array(); this.div.className = 'dp-highlighter'; this.div.highlighter = this; this.bar.className = 'bar'; this.ol.start = this.firstLine; if (this.CssClass != null)
			this.ol.className = this.CssClass; if (this.collapse)
			this.div.className += ' collapsed'; if (this.noGutter)
			this.div.className += ' nogutter'; if (this.tabsToSpaces == true)
			this.code = this.ProcessSmartTabs(this.code); this.ProcessRegexList(); if (this.matches.length == 0) { this.AddBit(this.code, null); this.SwitchToList(); this.div.appendChild(this.bar); this.div.appendChild(this.ol); return; }
		this.matches = this.matches.sort(dp.sh.Highlighter.SortCallback); for (var i = 0; i < this.matches.length; i++)
			if (this.IsInside(this.matches[i]))
				this.matches[i] = null; for (var i = 0; i < this.matches.length; i++) {
					var match = this.matches[i]; if (match == null || match.length == 0)
						continue; this.AddBit(Copy(this.code, pos, match.index), null); this.AddBit(match.value, match.css); pos = match.index + match.length;
				}
		this.AddBit(this.code.substr(pos), null); this.SwitchToList(); this.div.appendChild(this.bar); this.div.appendChild(this.ol);
	}
	dp.sh.Highlighter.prototype.GetKeywords = function (str) { return '\\b' + str.replace(/ /g, '\\b|\\b') + '\\b'; }
	dp.sh.BloggerMode = function () { dp.sh.isBloggerMode = true; }
	dp.sh.HighlightAll = function (element, showGutter, showControls, collapseAll, firstLine, showColumns) {
		function FindValue() {
			var a = arguments; for (var i = 0; i < a.length; i++) {
				if (a[i] == null)
					continue; if (typeof (a[i]) == 'string' && a[i] != '')
					return a[i] + ''; if (typeof (a[i]) == 'object' && a[i].value != '')
					return a[i].value + '';
			}
			return null;
		}
		function IsOptionSet(value, list) {
			for (var i = 0; i < list.length; i++)
				if (list[i] == value)
					return true; return false;
		}
		function GetOptionValue(name, list, defaultValue) {
			var regex = new RegExp('^' + name + '\\[(\\w+)\\]$', 'gi'); var matches = null; for (var i = 0; i < list.length; i++)
				if ((matches = regex.exec(list[i])) != null)
					return matches[1]; return defaultValue;
		}
		function FindTagsByName(list, name, tagName) {
			var tags = document.getElementsByTagName(tagName); for (var i = 0; i < tags.length; i++)
				if (tags[i].getAttribute('name') == name)
					list.push(tags[i]);
		}
		var elements = [element]; var highlighter = null; var registered = {}; var propertyName = 'innerHTML';

		for (var brush in dp.sh.Brushes) {
			var aliases = dp.sh.Brushes[brush].Aliases; if (aliases == null)
				continue; for (var i = 0; i < aliases.length; i++)
				registered[aliases[i]] = brush;
		}

		for (var i = 0; i < elements.length; i++) {
			var element = elements[i]; var options = FindValue(element.attributes['class'], element.className, element.attributes['language'], element.language); var language = ''; if (options == null)
				continue; options = options.split(':'); language = options[0].toLowerCase(); if (registered[language] == null)
				continue; highlighter = new dp.sh.Brushes[registered[language]](); element.style.display = 'none'; highlighter.noGutter = (showGutter == null) ? IsOptionSet('nogutter', options) : !showGutter; highlighter.addControls = (showControls == null) ? !IsOptionSet('nocontrols', options) : showControls; highlighter.collapse = (collapseAll == null) ? IsOptionSet('collapse', options) : collapseAll; highlighter.showColumns = (showColumns == null) ? IsOptionSet('showcolumns', options) : showColumns; var headNode = document.getElementsByTagName('head')[0]; if (highlighter.Style && headNode) {
					var styleNode = document.createElement('style'); styleNode.setAttribute('type', 'text/css'); if (styleNode.styleSheet) { styleNode.styleSheet.cssText = highlighter.Style; }
					else { var textNode = document.createTextNode(highlighter.Style); styleNode.appendChild(textNode); }
					headNode.appendChild(styleNode);
				}
			highlighter.firstLine = (firstLine == null) ? parseInt(GetOptionValue('firstline', options, 1)) : firstLine; highlighter.Highlight(element[propertyName]); highlighter.source = element; element.parentNode.insertBefore(highlighter.div, element);
		}
	}


	dp.sh.Brushes.JScript = function () { var keywords = 'abstract boolean break byte case catch char class const continue debugger ' + 'default delete do double else enum export extends false final finally float ' + 'for function goto if implements import in instanceof int interface long native ' + 'new null package private protected public return short static super switch ' + 'synchronized this throw throws transient true try typeof var void volatile while with'; this.regexList = [{ regex: dp.sh.RegexLib.SingleLineCComments, css: 'comment' }, { regex: dp.sh.RegexLib.MultiLineCComments, css: 'comment' }, { regex: dp.sh.RegexLib.DoubleQuotedString, css: 'string' }, { regex: dp.sh.RegexLib.SingleQuotedString, css: 'string' }, { regex: new RegExp('^\\s*#.*', 'gm'), css: 'preprocessor' }, { regex: new RegExp(this.GetKeywords(keywords), 'gm'), css: 'keyword' }]; this.CssClass = 'dp-c'; }
	dp.sh.Brushes.JScript.prototype = new dp.sh.Highlighter(); dp.sh.Brushes.JScript.Aliases = ['js', 'jscript', 'javascript'];


	var b = dp.sh.Brushes.JScript;

	dph.innerHTML = "<textarea></textarea>";
	var ta = dph.firstChild;
	ta.language = b.Aliases[0] + ":nocontrols";
	ta.name = "rtesyntaxhighlighter" + new Date().getTime();
	ta.innerHTML = ta.value = text;


	dp.sh.HighlightAll(ta);

	dph.removeChild(ta);
	dph.classList.remove("dp-highlighter");
	DPH_AddCopyBtn(dph);
}

function DPH_AddCopyBtn(dph) {
	dph.style.cssText = "position:relative;";
	var d = document.createElement("div");
	d.style.cssText = "position:absolute;right:15px;top:5px;background-color:rgba(66,66,66,0.6);color:#fff;border-radius:5px;cursor:pointer;padding:1px 6px";
	d.innerText = "copy";
	dph.appendChild(d);
	d.onmouseover = function () {
		d.style.backgroundColor = "#333";
	}
	d.onmouseout = function () {
		d.style.backgroundColor = "rgba(66,66,66,0.6)";
	}
	d.onclick = function () {
		navigator.clipboard.writeText(dph.innerText);
		d.innerText = "copied";
		setTimeout(function () {
			d.innerText = "copy";
		}, 2000);
	}
}

function ReplaceDPH(dph) {
	var text = dph.innerText.trim();
	if (text.substring(0, 8) != "<script>")
		return;
	if (text.substring(text.length - 8, text.length) != "/script>")
		return;
	text = text.substring(8, text.length - 9);
	text = text.replace(/^(\s+)\n/, "")
	DPH_Apply(dph, text);
	return true;
}

function DocPatch() {

	for (var dph of document.querySelectorAll(".dp-highlighter")) {
		if (ReplaceDPH(dph))
			continue;
		DPH_AddCopyBtn(dph)
	}

	var editordemocode = document.querySelector(".editordemocode");
	if (editordemocode) {
		DPH_AddCopyBtn(editordemocode);
	}

	var navmenu = document.querySelector(".navmenu");
	if (navmenu) {
		var st = parseInt(sessionStorage.getItem("navmenu-scroll-top"));
		if (st) navmenu.scrollTop = st;

		setInterval(function () {
			if (st != navmenu.scrollTop) {
				st = navmenu.scrollTop;
				sessionStorage.setItem("navmenu-scroll-top", st)
			}
		}, 100)
	}

	var acoll = document.querySelectorAll("a");
	for (var i = 0; i < acoll.length; i++) {
		var a = acoll[i];
		if (a.href == location.href) {
			a.classList.add("active");
			if (a.parentNode.classList.contains("navitem")) {
				a.parentNode.classList.add("active");
			}
		}
	}

}

DocPatch();

var config = {};

	config.file_upload_handler = function (file, callback, optionalIndex, optionalFiles) {
		var uploadhandlerpath = "/imageupload.ashx";

		console.log("upload", file, "to", uploadhandlerpath)

		function append(parent, tagname, csstext) {
			var tag = parent.ownerDocument.createElement(tagname);
			if (csstext) tag.style.cssText = csstext;
			parent.appendChild(tag);
			return tag;
		}

		var uploadcancelled = false;

		var dialogouter = append(document.body, "div", "display:flex;align-items:center;justify-content:center;z-index:999999;position:fixed;left:0px;top:0px;width:100%;height:100%;background-color:rgba(128,128,128,0.5)");
		var dialoginner = append(dialogouter, "div", "background-color:white;border:solid 1px gray;border-radius:15px;padding:15px;min-width:200px;box-shadow:2px 2px 6px #7777");

		var line1 = append(dialoginner, "div", "text-align:center;font-size:1.2em;margin:0.5em;");
		line1.innerText = "Uploading...";

		var totalsize = file.size;
		var sentsize = 0;

		if (optionalFiles && optionalFiles.length > 1) {
			totalsize = 0;
			for (var i = 0; i < optionalFiles.length; i++) {
				totalsize += optionalFiles[i].size;
				if (i < optionalIndex) sentsize = totalsize;
			}
			console.log(totalsize, optionalIndex, optionalFiles)
			line1.innerText = "Uploading..." + (optionalIndex + 1) + "/" + optionalFiles.length;
		}

		var line2 = append(dialoginner, "div", "text-align:center;font-size:1.0em;margin:0.5em;");
		line2.innerText = "0%";

		var progressbar = append(dialoginner, "div", "border:solid 1px gray;margin:0.5em;");
		var progressbg = append(progressbar, "div", "height:12px");

		var line3 = append(dialoginner, "div", "text-align:center;font-size:1.0em;margin:0.5em;");
		var btn = append(line3, "button");
		btn.className = "btn btn-primary";
		btn.innerText = "cancel";
		btn.onclick = function () {
			uploadcancelled = true;
			xh.abort();
		}

		var xh = new XMLHttpRequest();
		xh.open("POST", uploadhandlerpath + "?name=" + encodeURIComponent(file.name) + "&type=" + encodeURIComponent(file.type) + "&size=" + file.size, true);
		xh.onload = xh.onabort = xh.onerror = function (pe) {
			console.log(pe);
			console.log(xh);
			dialogouter.parentNode.removeChild(dialogouter);
			if (pe.type == "load") {
				if (xh.status != 200) {
					console.log("uploaderror", pe);
					if (xh.responseText.startsWith("ERROR:")) {
						callback(null, "http-error-" + xh.responseText.substring(6));
					}
					else {
						callback(null);
					}
				}
				else if (xh.responseText.startsWith("READY:")) {
					console.log("File uploaded to " + xh.responseText.substring(6));
					callback(xh.responseText.substring(6));
				}
				else {
					callback(null, "http-error-" + xh.responseText);
				}
			}
			else if (uploadcancelled) {
				console.log("uploadcancelled", pe);
				callback(null, "cancelled");
			}
			else {
				console.log("uploaderror", pe);
				callback(null, pe.type);
			}
		}
		xh.upload.onprogress = function (pe) {
			console.log(pe);
			//pe.total
			var percent = Math.floor(100 * (sentsize + pe.loaded) / totalsize);
			line2.innerText = percent + "%";

			progressbg.style.cssText = "background-color:green;width:" + (percent * progressbar.offsetWidth / 100) + "px;height:12px;";
		}
		xh.send(file);
	}

	var editor1 = new RichTextEditor("#email-content", config);
