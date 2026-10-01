const natural = require('natural');

function analyzeSentiment(text) {
    const Analyzer = natural.SentimentAnalyzer;
    const stemmer = natural.PorterStemmer;
    const analyzer = new Analyzer("English", stemmer, "afinn");
    return analyzer.getSentiment(text.split(" "));
}

module.exports = analyzeSentiment;
