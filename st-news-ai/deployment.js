// import sentencePieceProcessor from 'https://cdn.jsdelivr.net/npm/@weblab-notebook/sentencepiece';

// const { sentencePieceProcessor } = require("@weblab-notebook/sentencepiece");

// import * as tf from '@tensorflow/tfjs';
console.log("mike test 1, 2, 3...");

const template = `
<div class="col-sm-4 grid-margin">
  <div class="rotate-img"> 
    <img src="https://raw.githubusercontent.com/arifhamed/static/main/projects/aap_tfjs/assets/images/loading.gif" alt="banner" class="img-fluid" /> 
  </div> 
</div> 
<div class="col-sm-8 grid-margin"> 
  <h2 class="font-weight-600 mb-2 row-headline"> 
    article headline loading.. 
  </h2> 
  <p class="fs-13 text-muted mb-0"> 
    <span class="mr-2">Photo </span>
    10 Minutes ago 
  </p> 
  <p class="fs-15"> 
    article details here
  </p> 
</div>`;
const MAX_SEQUENCE_LENGTH = 16;
// bruh = new Array;
function csvToArray(n,i=","){const r=n.slice(0,n.indexOf("\n")).split(i),t=n.slice(n.indexOf("\n")+1).split("\n");return t.map(function(n){var t=n.split(i);return r.reduce(function(n,i,r){return n[i]=t[r],n},{})})};
function getRandomInt(t,o){return t=Math.ceil(t),o=Math.floor(o),Math.floor(Math.random()*(o-t+1))+t}
function capitalize(e){return e.charAt(0).toUpperCase()+e.slice(1)}
function getHeadline(url){return url.substring(url.lastIndexOf("/")+1,url.length).split("-").map(capitalize).join(" ")}
function make_sequences(r){let o=Array();if(r.slice(0,MAX_SEQUENCE_LENGTH).forEach(function(r){r=word_preprocessor(r);r=words_vocab[r];null==r?o.push(words_vocab["<UNK>"]):o.push(r)}),o.length<MAX_SEQUENCE_LENGTH){let r=Array(MAX_SEQUENCE_LENGTH-o.length);r.fill(words_vocab["<UNK>"]),o=o.concat(r)}return o}
$.ajax({
  url: "https://arifhamed.com/tfjs-aap/assets/stnews.csv",
  dataType: "text"
}).done(function(csvData) {  
  tf.loadLayersModel('https://arifhamed.com/tfjs-aap/st-news-ai/model.json').then(model => {
    // use.load({vocabUrl: "https://arifhamed.com/tfjs-aap/st-news-ai/bpevocab.json"}).then(tokenizer => {
      requirejs(['package/sentencepiece'], function (SentencePiece) {
        const data = csvToArray(csvData);
        const mainTable = document.getElementById("news-column");
        const total_iters = 10;
        var news_retrieval_limit = 0; // by right should be 100
        const stp = new window.SentencePiece("https://arifhamed.com/tfjs-aap/st-news-ai/bpe.json");
        for (let i=0; i < total_iters;){
          news_retrieval_limit++;
          const buffer = tf.buffer([1,16]);
          const rowData = data[news_retrieval_limit];
          // const stp = sentencePieceProcessor()
          
          // stp.loadVocabulary("https://arifhamed.com/tfjs-aap/st-news-ai/bpe.vocab")
          const encoded_headline = stp.encode(getHeadline(rowData["url"]));
          console.log(encoded_headline);
          for (let i=0; i < encoded_headline.length; i++){buffer.set(encoded_headline[i],0,i)};
          const prediction = model.predict(buffer.toTensor());
          decidingOutput = ((prediction.data())[0] < (prediction.data())[1]) ? "housing" : "not housing";
          console.log(decidingOutput);
          if ((prediction.data())[0] < (prediction.data())[1]){
            i++;
            const clone = document.createElement("a");
            clone.setAttribute("class","row");
            clone.setAttribute("style","text-decoration:none;color:unset;");
            clone.setAttribute("href",rowData["url"])
            clone.setAttribute("target","_blank");
            clone.innerHTML = template;
            let h2 = clone.querySelector("h2");
            h2.textContent = getHeadline(rowData["url"]);
            let img = clone.querySelector("img");
            img.src = "https://raw.githubusercontent.com/arifhamed/static/main/projects/aap_tfjs/st-news-ai/"+getRandomInt(0,total_iters*2)+".jpeg";
            mainTable.appendChild(clone);
          } 
        }
      })
      
    // })
  })
  
});