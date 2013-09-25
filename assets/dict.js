String.prototype.trim = function() {
	return this.replace(/(^\s*)|(\s*$)/g, "");
}
String.prototype.ltrim = function() {
	return this.replace(/(^\s*)/g, "");
}
String.prototype.rtrim = function() {
	return this.replace(/(\s*$)/g, "");
}

HTMLElement.prototype.getElementsByName = function(nameVal, nodes){
    if( arguments.length < 2 ){
        var nodes = new Array();
    }
    for ( var child = this.firstElementChild; child != null; child = child.nextElementSibling) {
        child.getElementsByName(nameVal, nodes);
        if( child.ElementName == nameVal ){
            nodes[nodes.length] = child;
        }
    }
    return nodes;
}

HTMLElement.prototype.loadElementName = function(){
    this.ElementName = this.getAttribute('name');
    for ( var child = this.firstElementChild; child != null; child = child.nextElementSibling) {
        child.loadElementName();
    }
}

function toggleDict(targetid) {
	if (document.getElementById) {
		var target = document.getElementById(targetid);
		var img = document.getElementById(targetid + 'Btn');
		if (target.style.display == 'none') {
			target.style.display = 'block';
			img.src = "img/close.png";
		} else {
			target.style.display = 'none';
			img.src = "img/expand.png";
		}

	}
}

function toggleDictContents(e) {
	var img = e.firstElementChild;
	e = e.nextElementSibling;
	e = e.nextElementSibling;
	if (e.style.display == 'none') {
		e.style.display = 'block';
		img.src = "img/close.png";
	} else {
		e.style.display = 'none';
		img.src = "img/expand.png";
	}
}

function toggleWord(e) {
	var wordDetailDive = e.nextElementSibling;
	if (wordDetailDive.style.display == 'none') {
		wordDetailDive.style.display = 'block';
		e.style.background = "url('img/minus.png') no-repeat left center"
	} else {
		wordDetailDive.style.display = 'none';
		e.style.background = "url('img/plus.png') no-repeat left center"
	}
}

function toggleExample(targetid) {
	if (document.getElementById) {
		var target = document.getElementById(targetid);
		var img = document.getElementById(targetid + 'Btn');
		if (target.style.display == 'none') {
			target.style.display = 'block';
			img.src = "img/up_brown.png";
		} else {
			target.style.display = 'none';
			img.src = "img/down_brown.png";
		}

	}
}

function getEleByClass(classname, tagname, parentNode) {
	var parent = parentNode || document.body;
	var tagname = tagname || '*';
	var o = parent.getElementsByTagName(tagname);
	var p = [];
	for ( var i = 0; i < o.length; i++) {
		var e = o[i];
		var classNames = e.className.split(' ');
		for ( var j = 0; j < classNames.length; j++) {
			if (classname == classNames[j]) {
				p.push(e);
				// p[p.length]=o[i];
				break;
			}
		}
	}
	return p;
}

function fixPhonetic(text){
	var arr = text.split("");
	var s = '';
	for(var i=0; i<arr.length; i++){
		switch(arr[i]){
		case '5':
			s = s + "'"
			break;
		case '7':
			s = s + "ˌ"
			break;
		case '9':
		    s = s + 'ˈ';
		    break;
		case 'E':
			s = s + 'ə';
			break;
		case 'V':
			s = s + 'ʒ';
			break;
		case 'Q':
			s = s + 'ʌ';
			break;
		case 'A':
			s = s + 'æ';
			break;
		case '^':
			s = s + 'ɡ';
			break;
		case 'J':
			s = s + 'ʊ';
			break;
		case 'N':
			s = s + 'ŋ';
			break;
		case 'T':
			s = s + 'ð';
			break;
		case 'Z':
			s = s + 'ɛ';
			break;
		case 'C':
			s = s + 'ɔ';
			break;
		case 'B':
		    s = s + 'ɑ';
		    break;
		case 'U':
		    s= s + 'u';
		    break;
		case 'I':
		    s = s + 'ɪ';
		    break;
		case 'F':
		    s = s + 'ʃ';
		    break;
		case 'R':
		    s = s + 'ɔ';
		    break;
		case '\\':
		    s = s + 'ɜ';
		    break;
		case 'W':
		    s = s + 'θ';
		    break;
		default:
			s = s + arr[i];
			break;
		}
	}
	return s;
}



function queryOnlineDict(dictUrl, jsonpCallback){
    var url = encodeURIComponent(dictUrl);
    var JSONP=document.createElement("script");  
    JSONP.type="text/javascript";  
    JSONP.src="http://mobilevoa.duapp.com/proxy.php?callback=" + jsonpCallback + "&url="+url;  
    document.getElementsByTagName("head")[0].appendChild(JSONP);  
}

function getJsonpCallback(publishDictObj){
	for(var i=0; i<PlugIns.length; i++){
		if( PlugIns[i] == publishDictObj ){
			return 'PlugIns['+i+'].func';
		}
	}
	return null;
}

function handlePlugins() {
	console.log("handlePlugins 1");
	for(var i=0; i<PlugIns.length; i++){
		var dictHandler = PlugIns[i];
		var e = document.getElementById(dictHandler.name);
		dictHandler.func(e);
	}
}

window.onload = handlePlugins;