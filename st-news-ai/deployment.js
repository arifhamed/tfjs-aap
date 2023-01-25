"use strict";

console.log("mike test 1 2 3..");
// function httpGet(theUrl)
// {
//     if (window.XMLHttpRequest){// code for IE7+, Firefox, Chrome, Opera, Safari
//         xmlhttp=new XMLHttpRequest();
//     } else {// code for IE6, IE5
//         xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
//     }
//     // xmlhttp=new XMLHttpRequest();
//     xmlhttp.onreadystatechange=function(){
//         if (xmlhttp.readyState==4 && xmlhttp.status==200){
//             document.getElementById("news_headline_1").innerHTML = xmlhttp.responseText;
//         }
//     }
//     xmlhttp.open("GET", theUrl, false);
//     xmlhttp.send();
// }
// httpGet("https://straitstimes.com/sitemap.xml")
// document.getElementById("news_headline_1").innerHTML = await httpGet("https://straitstimes.com/sitemap.xml")

document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.changelog')) {
        function file_get_contents(filename) {
            fetch(filename).then((resp) => resp.text()).then(data => {
                // Optional, replace the H1 heading with nothing,
                // as I do not need it on my static website
                // data = data.replace(/<h1>(.*?)<\/h1>/ig, "");

                // Initialize the document parser
                const parser = new DOMParser();
                let doc = parser.parseFromString(data, 'text/html');

                // Get the <body> element content
                let body = doc.querySelector('body').innerHTML;

                // Replace my empty element with the retrieved content
                document.querySelector('#news_headline_1').innerHTML = body;
            });
        }

        // Call the function and point it to my GitHub Pages page
        file_get_contents('https://straitstimes.com/sitemap.xml');
    }
});