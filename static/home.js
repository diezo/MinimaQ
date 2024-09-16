const topicElement = document.querySelector("#topic-input");
const difficultyElement = document.querySelector("#difficulty-input");
const questionsCountElement = document.querySelector("#questions-count-input");
const timerSeconds = document.querySelector("#timer-seconds");
const timerMilliseconds = document.querySelector("#timer-milliseconds");
const timerScreen = document.querySelector("#timer-screen");

var timerInterval = null;

topicElement.addEventListener("keydown", e => {
    if (e.key == "Enter") generate();
})

function generate()
{
    let topic = topicElement.value.trim();
    let difficulty = difficultyElement.value;
    let questionsCount = questionsCountElement.value;

    if (topic != "")
    {
        startTimer();
        window.location = `/quiz?topic=${btoa(topic)}&difficulty=${difficulty}&count=${questionsCount}`;
    }
}

function modifyDigits(number, i)
{
    let text = number.toString();

    if (text.length < i) return ("0" * (text.length - i)) + text;
    else return text;
}

function startTimer()
{
    timerScreen.style.display = "block";

    let second = 0;
    let millisecond = 0;

    let secondsUpdated = false;

    timerInterval = setInterval(() => {
        
        if (secondsUpdated)
        {
            timerSeconds.classList.add("pop-animated");
            setTimeout(() => timerSeconds.classList.remove("pop-animated"), 250);

            secondsUpdated = false;
        }

        timerSeconds.innerText = modifyDigits(second, 1);
        timerMilliseconds.innerText = modifyDigits(millisecond, 2);
        
        if (millisecond >= 99)
        {
            second++;
            secondsUpdated = true;

            millisecond = 0;
        }
        else millisecond++;

    }, 10);
}

function finishTimer()
{
    timerScreen.style.display = "none";
    if (timerInterval != null && timerInterval != undefined) clearInterval(timerInterval);
}

document.addEventListener("visibilitychange", () =>{
    if (!document.hidden) finishTimer();
})