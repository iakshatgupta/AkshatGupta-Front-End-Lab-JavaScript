function Question( text, choices, answer ) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.isCorrectAnswer = function( answer ) {
    return this.answer === answer;
};

function Quiz( questions ) {
    this.questions = questions;
    this.score = 0;
    this.questionIndex = 0;
}

Quiz.prototype.getCurrentQuestion = function() {
    return this.questions[this.questionIndex];
};

Quiz.prototype.checkOptionWithAnswer = function( answer ) {
    if( this.getCurrentQuestion().isCorrectAnswer( answer ) ) {
        this.score++;
    }

    this.questionIndex++;
};

Quiz.prototype.done = function() {
    return this.questionIndex >= this.questions.length;
};

function showScore(){
    document.getElementById('quiz').innerHTML=`
        <h1>Result</h1>
        <h2 id="score">You Scored ${quiz.score}</h2><br>
        <h3 id="percentage">Your Percentage Is ${calculatePercentage()}</h3>
    `;
}

function calculatePercentage(){
    return ((quiz.score)*100)/(quiz.questions.length);
};

console.log(calculatePercentage);

function showProgress(){
    document.getElementById('progress').innerHTML=`
        Question ${quiz.questionIndex+1} of ${quiz.questions.length}
    `;
}

function loadQuestion() {
    if(quiz.done()){
        showScore();
        return;
    }
    const currentQuestion = quiz.getCurrentQuestion();
    // get the DOM node for the question and set the question in it
    const questionEl = document.getElementById( 'question' );
    questionEl.textContent = currentQuestion.text;

    // loop through choices for the question and get the choice elements in the UI, and populate the choices
    for( let i = 0; i < currentQuestion.choices.length; i++ ) {
        const currentChoice = currentQuestion.choices[i];

        document.getElementById( 'choice' + i ).textContent = currentChoice;
        handleSelect( 'btn' + i, currentChoice )
    }
    showProgress();
}



function handleSelect( id, choice ) {
    console.log( id, choice );

    // we set up event handler
    document.getElementById(id).onclick=function(){
        quiz.checkOptionWithAnswer(choice);
        loadQuestion();
    };
}

const questions = [
    new Question("JavaScript supports", ["Functions", "XHTML","CSS", "HTML"], "Functions"),
    new Question("Which language is used for styling web pages?", ["HTML", "JQuery", "CSS", "XML"], "CSS"),
    new Question("Which is not a JavaScript Framework?", ["Python Script", "JQuery","Django", "NodeJS"], "Django"),
    new Question("Which is used for Connect To Database?", ["PHP", "HTML", "JS", "All"], "PHP"),
    new Question("JavaScript is a ", ["Language", "Programming Language", "Development", "All"], "Programming Language")
];

// console.log( questions );

// If implemented correctly this should be the output
// console.log( questions[0].isCorrectAnswer( "Functions" ) ); // true
// console.log( questions[0].isCorrectAnswer( "CSS" ) ); // false

const quiz = new Quiz( questions );
loadQuestion();
// console.log( quiz );

// console.log( quiz.getCurrentQuestion() );
// console.log( quiz.checkOptionWithAnswer( 'Functions' ) ); // true
// console.log( quiz.checkOptionWithAnswer( 'CSS' ) ); // false