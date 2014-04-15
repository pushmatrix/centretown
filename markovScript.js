// Generated by CoffeeScript 1.6.1
(function() {
  var getNextWord, minSentenceLength,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  minSentenceLength = 20;

  window.generateChain = function(corpus) {
    var chain, endWord, ends, lastWord, post, sentence, starts, word, words, _i, _j, _k, _len, _len1, _len2, _ref;
    starts = [];
    ends = [];
    chain = {};
    for (_i = 0, _len = corpus.length; _i < _len; _i++) {
      post = corpus[_i];
      post = corpus[_i].join(" ")
      _ref = post.split(".");
      for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
        sentence = _ref[_j];
        words = sentence.trim().split(" ");
        lastWord = null;
        if (words.length === 0) {
          return;
        }
        for (_k = 0, _len2 = words.length; _k < _len2; _k++) {
          word = words[_k];
          if (lastWord == null) {
            if (word.trim() !== "" && word !== "“") {
              starts.push(word);
            }
          } else {
            chain[lastWord] || (chain[lastWord] = []);
            chain[lastWord].push(word);
          }
          lastWord = word;
        }
        endWord = words[words.length - 1];
        if (endWord !== 'a' && endWord !== 'for' && endWord !== 'with') {
          ends.push(endWord);
        }
      }
    }
    return {
      starts: starts,
      ends: ends,
      chain: chain
    };
  };

  Array.prototype.randomElement = function() {
    return this[Math.floor(Math.random() * this.length)];
  };

  String.prototype.strip = function() {
    if (String.prototype.trim != null) {
      return this.trim();
    } else {
      return this.replace(/^\s+|\s+$/g, "");
    }
  };

  getNextWord = function(chain, word) {
    if (chain.chain[word]) {
      return chain.chain[word].randomElement();
    } else {
      return chain.starts.randomElement().toLowerCase();
    }
  };

  window.markov = function(chain, length) {
    var currentWord, sentence, text;
    currentWord = chain.starts.randomElement();
    text = "";
    sentence = currentWord.strip();
    while (true) {
      if (sentence.split(" ").length > 10 + Math.random() * 5) {
        if (__indexOf.call(chain.ends, currentWord) >= 0) {
          currentWord = chain.starts.randomElement();
          text += sentence + ". ";
          sentence = currentWord;
          if (Math.random() < 0.2) {
            text += "\n\n";
          }
          if (text.length > length) {
            return text;
          }
          continue;
        }
      }
      currentWord = getNextWord(chain, currentWord);
      sentence += " " + currentWord;
    }
  };

}).call(this);
