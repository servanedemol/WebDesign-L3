const question = document.getElementById("question");

/* getElementsByClassNamereturns an HTML collection
we want to convert choices into an array
so we are using Array.from*/
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("ProgressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");

/*variables*/
let currentQuestion = {}; /*object*/
let acceptingAnswers = true;  /*if we are accepting answers or not*/
let score = 0;
let questionCounter = 0;
/*an array of questions, we will empty as it goes so we do not ask twice the same question*/

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
const MAX_QUESTIONS = 3;

//startGame
startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions]; // spread operator ... which copy all the items of one array into another
    //console.log(availableQuestions);
    getNewQuestion();
};

getNewQuestion = () => {
    if (availableQuestions.length == 0 || questionCounter >= MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore',score);
        return window.location.assign("/end.html");
      //  https://youtu.be/Opje9VBrNfg?t=4016
    }
    questionCounter++;
    //update the text in the Question 1/3
    // syntax 1
    //questionCounterText.innerText = questionCounter + "/" + MAX_QUESTIONS
    // syntax 2
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
 
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
choices.forEach (choice => {
    choice.addEventListener("click", e=> {
        if (!acceptingAnswers) return;
        acceptingAnswers = false;
        const selectedChoice = e.target;
        //selectedAnswer is a string
        const selectedAnswer = selectedChoice.dataset["number"];
        
        //check if this is the correct answer
        //console.log(selectedAnswer, currentQuestion.answer);
        //console.log(selectedAnswer == currentQuestion.answer);
        //console.log(selectedAnswer);
      
        //we need to apply a different class to the css based on the answer
       /* let classToApply = 'incorrect';
        if (selectedAnswer == currentQuestion.answer){
            classToApply = 'correct';
        }*/
        // other way to do it
        const classToApply = 
            selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
        if (classToApply == 'correct'){
            incrementScore(CORRECT_BONUS);
        }
        console.log(classToApply);
        selectedChoice.parentElement.classList.add(classToApply);
        setTimeout(()=> {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    
        
    });
});

incrementScore = num =>{
    score += num;
    scoreText.innerText=score;
};

let isChild = true;
const bedTime = isChild ? '8pm' : '10pm';
console.log(`Your bedtime is ${bedTime}`);
startGame();
