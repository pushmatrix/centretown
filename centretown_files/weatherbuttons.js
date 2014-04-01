		function BodyOnLoad()
		{
		if (document.searchform.prodname)
			{
		document.searchform.prodname.focus();
			}
		}


		function CheckCity()
		{
			if (document.searchform.prodname.value == "city")
			{
				document.searchform.prodname.value = "city";

			}
		}

var xmlhttp1;
var placeNumber=0;

function loadWarnings() {
	xmlhttp1=null;

	url = "http://"+location.hostname+"/common/ssidata/warnings/"+warningRegions[placeNumber]+".js";
	//alert("loadWarnings["+placeNumber+"]:"+url);

	if (window.XMLHttpRequest) { xmlhttp1=new XMLHttpRequest() }	// code for Mozilla, etc.
	else if (window.ActiveXObject) { xmlhttp1=new ActiveXObject("Microsoft.XMLHTTP") } 	// code for IE

	if (xmlhttp1!=null) {
		xmlhttp1.onreadystatechange=function() {
			if (xmlhttp1.readyState==4) {
				// if "OK"
				if (xmlhttp1.status==200) {
					//alert(placeNumber+" = "+xmlhttp1.responseText);
					document.getElementById('warnings'+placeNumber).innerHTML=xmlhttp1.responseText;
				} else {
					//alert("Problem retrieving data:" + xmlhttp1.statusText)
				}

				placeNumber++;
				if (placeNumber<5) { loadWarnings(); } else { change0(); }
			}
		}

		xmlhttp1.open("GET",url,true);
		xmlhttp1.send(null);
	} else {
		//alert("Your browser does not support XMLHTTP.")
	}
}


function clearText() {
	if (document.searchform.prodname.value != "") {
		document.searchform.prodname.value = "";
	}
}