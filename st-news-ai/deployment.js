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

// document.addEventListener('DOMContentLoaded', () => {
//     if (document.querySelector('#news_headline_1')) {
//         function file_get_contents(filename) {
//             fetch(filename).then((resp) => resp.text()).then(data => {
//                 // Optional, replace the H1 heading with nothing,
//                 // as I do not need it on my static website
//                 // data = data.replace(/<h1>(.*?)<\/h1>/ig, "");

//                 // Initialize the document parser
//                 const parser = new DOMParser();
//                 let doc = parser.parseFromString(data, 'text/html');

//                 // Get the <body> element content
//                 let body = doc.querySelector('body').innerHTML;

//                 // Replace my empty element with the retrieved content
//                 document.querySelector('#news_headline_1').innerHTML = body;
//             });
//         }

//         // Call the function and point it to my GitHub Pages page
//         file_get_contents('https://www.straitstimes.com/sitemap.xml?page=36');
//     }
// });

newsFace();
// function convertTZ(date, tzString) {
//     return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString}));   
// }
async function newsFace() {
    // for some reason sg doesn't work but my works :/
    const response = await fetch("http://api.mediastack.com/v1/news?access_key=a94c1c74b0ba73efb9d82b4a66c05a67&countries=sg,my&languages=en");
    const all = await response.json();
    const current = all['data'][0]["title"];
    console.log(current);
    // const bruh = convertTZ(current.substring(0,4)+"/"+current.substring(5,7)+"/"+current.substring(8,10)+" "+current.substring(11,14)+":"+current.substring(14,17)+":"+current.substring(17,19)+" +0000", "Asia/Singapore");
    // const zeroPad = (num, places) => String(num).padStart(places, '0');
    document.querySelector("#news_headline_1").innerHTML = current
    // document.getElementById('time').innerHTML = "this website was last updated in "+bruh.getDate()+" "+["January","February","March","April","May","June","July","August","September","October","November","December"][bruh.getMonth()]+" "+bruh.getFullYear()+", "+zeroPad(parseInt(bruh.getHours()),2)+":"+zeroPad(parseInt(bruh.getMinutes()),2)+":"+zeroPad(parseInt(bruh.getSeconds()),2)+" (GMT+8, Singapore Time).";
    // if (document.getElementById('time').innerHTML.includes("NaN")){
    //     document.getElementById('time').innerHTML = "you could be on mobile right now, yeah i see you, your soul looks delicious";
    // }
}