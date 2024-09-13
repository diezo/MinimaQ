const topicElement = document.querySelector("#topic-input");
const difficultyElement = document.querySelector("#difficulty-input");
const questionsCountElement = document.querySelector("#questions-count-input");

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
        window.location = `/quiz?topic=${btoa(topic)}&difficulty=${difficulty}&count=${questionsCount}`;
    }
}