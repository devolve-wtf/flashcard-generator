const fs = require('fs');
const inquirer = require('inquirer');
const BasicCard = require('./BasicCard.js');
const ClozeCard = require('./ClozeCard.js');

let basicCards = [];
let clozeCards = [];

let i = 0;

function study(arr, keys, i) {
    inquirer.prompt([
        {
            name: 'input',
            message: arr[i][keys[0]]
        }
    ]).then(function(answer) {
        if(answer.input.toLowerCase() === arr[i][keys[1]].toLowerCase()) {
            console.log('Correct!');
        }else{
            console.log('Wrong! The correct answer is ' + arr[i][keys[1]]);
        }
        i++;
        if(i < arr.length) {
            study(arr, keys, i);
        }
    });
}

fs.readFile('./data.JSON', 'utf8', function(err, data) {
    if(!err) {
        let objects = JSON.parse(data);
        let cardType = '';
        
        for(object in objects) {
            basicCards.push(new BasicCard(objects[object].question, objects[object].answer));
            clozeCards.push(new ClozeCard(objects[object].statement, objects[object].answer));
        }

        inquirer.prompt([
            {
                name: 'cardType',
                message: 'What type of flashcard would you like to use? Basic or Cloze?'
            }
        ]).then(function(answer) {

            if(answer.cardType.toLowerCase() === 'basic') {

                let keys = ['front', 'back'];

                study(basicCards, keys, 0);

            }else if(answer.cardType.toLowerCase() === 'cloze') {

                let keys = ['partialText', 'cloze'];

                study(clozeCards, keys, 0);

            }else{
                console.log('I don\'t understand what it is that you want');
            }

        });
    }
});