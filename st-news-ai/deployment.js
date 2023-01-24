console.log("mike test 1 2 3..");
var superagent = require('superagent');
async function httpGet(theUrl)
{
    // if (window.XMLHttpRequest){// code for IE7+, Firefox, Chrome, Opera, Safari
    //     xmlhttp=new XMLHttpRequest();
    // } else {// code for IE6, IE5
    //     xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    // }
    xmlhttp=new XMLHttpRequest();
    xmlhttp.onreadystatechange=function(){
        if (xmlhttp.readyState==4 && xmlhttp.status==200){
            return xmlhttp.responseText;
        }
    }
    xmlhttp.open("GET", theUrl, false);
    xmlhttp.send();
}
document.getElementById("news_headline_1").innerHTML = await httpGet("https://straitstimes.com/sitemap.xml")