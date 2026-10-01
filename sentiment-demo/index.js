const natural = require('natural');
const Analyzer = natural.SentimentAnalyzer;
const stemmer = natural.PorterStemmer;

const analyzer = new Analyzer("English", stemmer, "afinn");

const comments = [
    "This gift is in excellent condition and very helpful!",
    "Item arrived broken and missing components."
];

comments.forEach(comment => {
    const tokenized = comment.toLowerCase().split(' ');
    const score = analyzer.getSentiment(tokenized);
    console.log(`Comment: "${comment}" | Sentiment Score: ${score}`);
});