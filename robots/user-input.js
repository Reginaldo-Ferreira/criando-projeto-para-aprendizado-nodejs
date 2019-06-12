const readline = require('readline-sync')
function robot(content){
  content.searchTerm = askAndReturnSearchTerm()
  content.prefix = askAndReturnPrefix()

    function askAndReturnSearchTerm(){
      return readline.question('type a Wikipedia seach term: ')
    }

    function askAndReturnPrefix(){
    const prefixes = ['Whois','What is', 'the history of' ]
    const selectedPrefixIndex = readline.keyInSelect(prefixes,'choose one option: ')
    const selectedPrefixText = prefixes[selectedPrefixIndex]
    return selectedPrefixText
    }
  }

  module.exports = robot
