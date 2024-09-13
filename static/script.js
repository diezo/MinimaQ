const data = JSON.parse(atob(document.querySelector("#data").innerHTML.trim()));
const questionElement = document.querySelector("#question");
const problemNumberElement = document.querySelector("#problem-number");
const optionElements = document.querySelectorAll(".option");
const submitButton = document.querySelector("#submit-button");
const explainationElement = document.querySelector("#explaination");
const explainationTextElement = document.querySelector("#explaination-text");
const correctSoundEffect = document.querySelector("#correct-sound");
const wrongSoundEffect = document.querySelector("#wrong-sound");
const correctGif = document.querySelector("#correct-gif");
const wrongGif = document.querySelector("#wrong-gif");
const scorecardElement = document.querySelector("#scorecard");
const scoreElement = document.querySelector("#score");
const positiveGreetingElement = document.querySelector("#positive-greeting");
const negativeGreetingElement = document.querySelector("#negative-greeting");
const progressElement = document.querySelector("#progress")

var score = 0;
var correctOption = -1;
var currentQuestionIndex = -1;
var answerable = true;

// Load Questions
loadQuestion(0);

function loadQuestion(index)
{
    clearSelections();
    answerable = true;

    currentQuestionIndex = index;

    correctOption = data["questions"][index]["correct"];
    let questionTitle = data["questions"][index]["question"];
    let questionExplaination = data["questions"][index]["explaination"];
    let questionOptions = data["questions"][index]["options"];

    problemNumberElement.querySelector(".value").innerText = (index + 1);

    questionElement.innerText = questionTitle;  // Load Title
    
    // Load Options
    optionElements[0].querySelector(".option-text").innerHTML = questionOptions[0];
    optionElements[1].querySelector(".option-text").innerHTML = questionOptions[1];
    optionElements[2].querySelector(".option-text").innerHTML = questionOptions[2];
    optionElements[3].querySelector(".option-text").innerHTML = questionOptions[3];

    // Load Explaination
    explainationTextElement.innerText = questionExplaination;

    // Next/Submit Button
    if ((index + 1) == data["questions"].length)
    {
        submitButton.innerText = "SUBMIT";
    }
}

function clearSelections()
{
    optionElements[0].classList.remove("correct-option");
    optionElements[1].classList.remove("correct-option");
    optionElements[2].classList.remove("correct-option");
    optionElements[3].classList.remove("correct-option");

    optionElements[0].classList.remove("incorrect-option");
    optionElements[1].classList.remove("incorrect-option");
    optionElements[2].classList.remove("incorrect-option");
    optionElements[3].classList.remove("incorrect-option");

    explainationElement.style.display = "none";
    
    correctGif.style.display = "none";
    wrongGif.style.display = "none";
}

function check(optionIndex)
{
    if (!answerable) return;    
    answerable = false;

    optionElements[correctOption].classList.add("correct-option");

    if (optionIndex != correctOption)
    {
        wrongSoundEffect.play();
        wrongGif.style.display = "block";

        optionElements[optionIndex].classList.add("incorrect-option");
    }
    else
    {
        correctSoundEffect.play();
        correctGif.style.display = "block";

        score++;  // Increment Score
    }

    // Show Explaination
    explainationElement.style.display = "block";
}

function nextQuestion()
{
    // Update Progress Bar
    let progress = ((currentQuestionIndex + 1) / data["questions"].length) * 100;
    progressElement.style.width = `${progress}%`;

    if (currentQuestionIndex + 1 == data["questions"].length)
    {
        scorecard();
        return;
    }

    loadQuestion(currentQuestionIndex + 1);
}

function scorecard()
{
    let scorePercentage = (score / data["questions"].length) * 100;
    scoreElement.innerText = `${score}/${data["questions"].length}`;

    if (scorePercentage >= 50)
    {
        positiveGreetingElement.style.display = "block";
    }
    else
    {
        negativeGreetingElement.style.display = "block";
    }

    scorecardElement.style.display = "block";
}