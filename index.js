//import * as tf from '@tensorflow/tfjs';
//import Tokenizer from './tokenizer';
//import { tokenizerFromJson } from './tokenizer';
//import { Series, DataFrame } from 'pandas-js';
//import * as tf from '@tensorflow/tfjs';


// tokeniser class
class Tokenizer {
  constructor(config = {}) {
    this.filters = config.filters || /[\\.,/#!$%^&*;:{}=\-_`~()]/g;
    this.lower = typeof config.lower === 'undefined' ? true : config.lower;

    // Primary indexing methods. Word to index and index to word.
    this.wordIndex = {};
    this.indexWord = {};

    // Keeping track of word counts
    this.wordCounts = {};
  }

  cleanText(text) {
    if (this.lower) text = text.toLowerCase();
    return text
      .replace(this.filters, '')
      .replace(/\s{2,}/g, ' ')
      .split(' ');
  }

  fitOnTexts(texts) {
    texts.forEach(text => {
      text = this.cleanText(text);
      text.forEach(word => {
        this.wordCounts[word] = (this.wordCounts[word] || 0) + 1;
      });
    });

    Object.entries(this.wordCounts)
      .sort((a, b) => b[1] - a[1])
      .forEach(([word, number], i) => {
        this.wordIndex[word] = i + 1;
        this.indexWord[i + 1] = word;
      });
  }

  textsToSequences(texts,wordIndex) {
      // console.log(wordIndex["steuerkenntnisse"])

    return texts.map(text => this.cleanText(text).map(word => wordIndex[word] || 0));
  }

  toJson() {
    return JSON.stringify({
      wordIndex: this.wordIndex,
      indexWord: this.indexWord,
      wordCounts: this.wordCounts
    })
  }
}

export const tokenizerFromJson = json_string => {
  const tokenizer = new Tokenizer();
  const js = JSON.parse(json_string);
  tokenizer.wordIndex = js.wordIndex;
  tokenizer.indexWord = js.indexWord;
  tokenizer.wordCounts = js.wordCounts;
  return tokenizer;
};
//


const PAD_INDEX = 0;

function preprocess(text)
{

    //let tokenizer = new Tokenizer();
   // tokenizer.fitOnTexts(text);

    //convert the image data to a tensor 
    let tensor = tf.fromPixels(img)
    //resize to 50 X 50
    const resized = tf.image.resizeBilinear(tensor, [50, 50]).toFloat()
    // Normalize the image 
    const offset = tf.scalar(255.0);
    const normalized = tf.scalar(1.0).sub(resized.div(offset));
    //We add a dimension to get a batch shape 
    const batched = normalized.expandDims(0)
    return batched

}


//padding sequence function

// Perform padding.

function padSequences(sequences, maxLen, padding = 'pre', truncating = 'pre', value = PAD_INDEX)
 {

    return sequences.map(seq => {
    if (seq.length < maxLen) {
      const pad = [];
      for (let i = 0; i < maxLen - seq.length; ++i) {
        pad.push(value);
      }
      if (padding === 'pre') {
        seq = pad.concat(seq);
      } else {
        seq = seq.concat(pad);
      }
    }

// Perform truncation.
    if (seq.length > maxLen) {
      if (truncating === 'pre') {
        seq.splice(0, seq.length - maxLen);
      } else {
        seq.splice(maxLen, seq.length - maxLen);
      }
    }

return seq;
 });
}

//padding sequence function


  function prediction2(text,model,wordIndex) {
    // Convert to lower case and remove all punctuations.
    const inputText =
        text.trim().toLowerCase().replace(/(\.|\,|\!)/g, '').split(' ');
    // Convert the words to a sequence of word indices.
    const sequence = inputText.map(word => {
      $: wordIndex = wordIndex[word] ;
      if (wordIndex > 20000) {
        wordIndex = 2;
      }
      return wordIndex;
    });
    // Perform truncation and padding.
    const paddedSequence = padSequences([sequence], 121);

console.dir(paddedSequence);
 console.log("paddedsequence");
console.log(typeof paddedsequence);

    const input = tf.tensor2d(paddedSequence, [1, 121]);
    console.log(input);
 console.dir(input);
 console.log("input");
console.log(typeof input);

}

function prediction(text,model,wordIndex)

{
    //a = a

var a = tf.tensor([  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
, 0,0,0,0,0,0,0,0,0, 202,1, 265,209])

    a = tf.reshape(a, [1, 121])
    console.log("Hello world!");


//var text_object = new String(text);
//var text = "Python is maniac";
    // Convert to lower case and remove all punctuations.
   // const inputText =   text.trim().toLowerCase().replace(/(\.|\,|\!)/g, '').split(' ');


console.log(wordIndex);

const tokenizer = new Tokenizer();

console.log(typeof text);
//console.log(inputText);




//var text_object = ["Python is good"]
//SPlit this.
var sequence1 = tokenizer.textsToSequences(text,wordIndex);
//console.log(sequence);
console.log("SEQUENCE");
console.log(sequence1);



console.log(wordIndex["rezepturen"]);

    // Convert the words to a sequence of word indices.
  // const sequence = inputText.map(word => {
    // $: wordIndex = wordIndex[word];
     // if (wordIndex > 20000) {
      //  wordIndex = 2;
     // }
     // return wordIndex;
   /// });
 console.log("SEQ")
   //console.log(sequence)
   console.log(sequence1)

//var seq_object = new String(sequence);

    // Perform truncation and padding.
    const paddedSequence = padSequences(sequence1, 121);
    console.dir(paddedSequence);
 console.log("paddedsequence");
console.log(typeof paddedsequence);

 console.dir(a);
 console.log("a");
console.log(typeof a);
   // const input = tf.tensor(paddedSequence);
const input = tf.tensor2d(paddedSequence, [1, 121],'int32');

//tf.tensor2d([1, 2, 3, 4], [2, 2]).print();

    //console.log(input);
    console.log("SHAPE OF THE INPUT");

   // input.print();
   // const beginMs = performance.now();
    const predictOut = model.predict(input);
    //const score = predictOut.dataSync()[0];
    //predictOut.dispose();
    //const endMs = performance.now();
    console.log(predictOut.print())
    return {predictOut};
  }


// LSTM Predict function
async function start() {

//const ds = new Series([1, 2, 3, 4], {name: 'My test name', index: [2, 3, 4, 5]})
//ds.toString()






var a = tf.tensor([  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
, 0,0,0,0,0,0,0,0,0 ,202,1, 265,209])


console.log("Start entered!");

var request = new XMLHttpRequest();
   request.open("GET", "word_dict.json", false);
   request.send(null)
   var my_JSON_object = JSON.parse(request.responseText);
console.log(request.responseText);
console.log(my_JSON_object);

var wordIndex = my_JSON_object;
console.log(wordIndex["steuerkenntnisse"]);



//var obj = JSON.parse('simple_json.json');
//console.log(obj)

//const model = tf.sequential();
 const model = await tf.loadLayersModel('model.json')
  // Use the model to do inference on a data point the model hasn't seen.
  // Should print approximately 39.

//var inputVal = document.getElementById("myInput").value;

console.log("Model Loaded");
console.log(model.summary());
const prediction_text = ["Steuerkenntnisse sind sehr wünschenswert"];
     prediction(prediction_text,model,wordIndex);
}

start();