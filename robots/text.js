const algorithmia = require('algorithmia')
const algorithmiaApiKey = require('./credentials/algorithmia.json').apiKey
const sentenceBoundaryDetection = require('sbd')

async function robot(content) {
  await fetchContentFromWikipedia(content)
  sanitizeContent(content)
  breakContentIntoSentences(content)
//  breakContentIntoSentences(content)

async function fetchContentFromWikipedia(content){
      const algorithmiaAuthenticated = algorithmia(algorithmiaApiKey)
      const wikipediaAlgorithm = algorithmiaAuthenticated.algo('web/WikipediaParser/0.1.2')
      const wikipediaResponde = await wikipediaAlgorithm.pipe(content.searchTerm)
      const wikipediaContent = wikipediaResponde.get()
      content.sourceContentOringinal = wikipediaContent.content
    //  console.log(wikipediaContent);
  }

  function sanitizeContent(content){
    const withoutBlankLinesAndMarkdown = removeBlankLinesAndMarkdown(content.sourceContentOringinal)
    const withoutDatesInParentheses = removeDatesInParentheses(withoutBlankLinesAndMarkdown)
  content.sourceContentSanitized = withoutDatesInParentheses

    function removeBlankLinesAndMarkdown(text) {
      const allLines = text.split('\n') //gera um array quebando em linhas
      const withoutBlankLinesAndMarkdown = allLines.filter((line) => {
        if (line.trim().length === 0 || line.trim().startsWith('=')){ // retira espaços ou onde começa com o caracter '='
          return false // caso um dos dois retorne
        }
        return true // tudo correto continua
      })

      return withoutBlankLinesAndMarkdown.join(' ') // deixa de ser array
    }

    function removeDatesInParentheses(text){ //retira parenteses junto com as datas dentro
      return text.replace(/\((?:\([^()]*\)|[^()])*\)/gm, '').replace(/  /g,' ')
    }

  }

  function breakContentIntoSentences(content){
    content.sentences =[]
    const sentences = sentenceBoundaryDetection.sentences(content.sourceContentSanitized)
    sentences.forEach((sentence) => {
      content.sentences.push({
        text: sentence,
        keywords: [],
        images: []
      })
    })
  //  console.log();
  }
}
module.exports = robot
