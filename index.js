const readline = require('readline-sync')
const robots = {
  userInput: require('./robots/user-input.js'),
  text: require('./robots/text.js')
}

async function start() {
  const content = {}
//  content.searchTerm = askAndReturnSearchTerm()
//  content.prefix = askAndReturnPrefix()
  robots.userInput(content)
  await robots.text(content)
//  function askAndReturnSearchTerm(){
//    return readline.question('type a Wikipedia seach term: ')
//  }

//   function askAndReturnPrefix(){
//  const prefixes = ['Whois','What is', 'the history of' ]
//  const selectedPrefixIndex = readline.keyInSelect(prefixes,'choose one option: ')
//  const selectedPrefixText = prefixes[selectedPrefixIndex]
//  return selectedPrefixText
//   }

  console.log(content);

}

start()
