const question = document.getElementById("question");

/* getElementsByClassNamereturns an HTML collection
we want to convert choices into an array
so we are using Array.from*/
//const choices = document.getElementsByClassName("choice-text");

const choices = Array.from(document.getElementsByClassName("choice-text"));
console.log(choices);

/*variables*/
let currentQuestion = {}; /*object*/
let acceptingAnswers = true;  /*if we are accepting answers or not*/
let score = 0;
let questionCounter = 0;
/*an array of questions, we will empty as it goes so we do not ask twice the same question*/
let availableQuestions = [];

let questions = [
        {
            question: "Inside which HTML element do we put the JavaScript??",
            choice1: "<script>",
            choice2: "<javascript>",
            choice3: "<js>",
            choice4: "<scripting>",
            answer: 1
        },
        
        {
            question: "What is the correct syntax for referring to an external sript called 'xxx.js'?",
            choice1: "<script href='xxx.js'>",
            choice2: "<script name='xxx.js'>",
            choice3: "<script src='xxx.js'>",
            choice4: "<script file='xxx.js'>",
            answer: 3
        },
        
        {
            question: "How do you write 'Hello World' in an console?",
            choice1: "Console.log('Hello  World')",
            choice2: "log.console('Hello  World')",
            choice3: "Log.console('Hello  World')",
            choice4: "console.log('Hello  World')",
            answer: 4
        }
    ] 
    
     
    
    
// CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = questions.length;
console.log(`you have a max of ${MAX_QUESTIONS}`);

//startGame
startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions]; /* spread operator ... 
    which copy all the items of one array into another*/
    console.log(availableQuestions);
    getNewQuestion();
};

getNewQuestion = () => {
    if (availableQuestions.length == 0 || questionCounter >= MAX_QUESTIONS){
        return window.location.assign("/end.html");
    }
    questionCounter++;
    //Math.random gives a random number between 0 and 1
    //Math.floor will give an integer
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;
    
    choices.forEach( choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion["choice" + number];
    });
    
    
    
    availableQuestions.splice(questionIndex,1);
    
    acceptingAnswers = true;
};


startGame();
