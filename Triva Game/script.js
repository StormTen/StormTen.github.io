var trivaData;
var request = new XMLHttpRequest();
var questions = [];
var difficulty;
var questionCount;
var category;
var timeout;
var correctDivId;
var counter = 0;
var currentScore = 0;
var totalScore = 0;
var TIMEOUT_TIME = 1500;
var cookieScore = parseInt(getCookie('score'));
document.getElementById('score').innerHTML = 'Current Score: ' + currentScore;




function loadData() {
    request.open('GET', 'https://opentdb.com/api.php?amount=' + questionCount + category + difficulty + '&type=multiple');
    request.onload = loadComplete;
    request.send();

}
function loadComplete(evt) {
    trivaData = JSON.parse(request.responseText);


    for (var i = 0; i < trivaData.results.length; i++) {
        questions.push({ question: trivaData.results[i].question, cAnswer: trivaData.results[i].correct_answer, otherAnswers: [trivaData.results[i].incorrect_answers[0], trivaData.results[i].incorrect_answers[1], trivaData.results[i].incorrect_answers[2]] });
    }
    nextQuestion();
}

function nextQuestion() {
    clearTimeout(timeout);
    setDivs();



    if (counter < questionCount) {
        var rnum = Math.floor(((Math.random() * 4) + 1))
        document.getElementById('question1').innerHTML = counter + 1 + '. ' + questions[counter].question;
        console.log(questions[counter].cAnswer);
        switch (rnum) {
            case 1:

                document.getElementById('answer1').innerHTML = questions[counter].cAnswer;
                document.getElementById('answer2').innerHTML = questions[counter].otherAnswers[0];
                document.getElementById('answer3').innerHTML = questions[counter].otherAnswers[1];
                document.getElementById('answer4').innerHTML = questions[counter].otherAnswers[2];
                document.getElementById('answer1').value = questions[counter].cAnswer;
                document.getElementById('answer2').value = questions[counter].otherAnswers[0];
                document.getElementById('answer3').value = questions[counter].otherAnswers[1];
                document.getElementById('answer4').value = questions[counter].otherAnswers[2];
                correctDivId = 'answer1';
                break;
            case 2:
                document.getElementById('answer2').innerHTML = questions[counter].cAnswer;
                document.getElementById('answer4').innerHTML = questions[counter].otherAnswers[0];
                document.getElementById('answer1').innerHTML = questions[counter].otherAnswers[1];
                document.getElementById('answer3').innerHTML = questions[counter].otherAnswers[2];
                document.getElementById('answer2').value = questions[counter].cAnswer;
                document.getElementById('answer4').value = questions[counter].otherAnswers[0];
                document.getElementById('answer1').value = questions[counter].otherAnswers[1];
                document.getElementById('answer3').value = questions[counter].otherAnswers[2];
                correctDivId = 'answer2';
                break;
            case 3:
                document.getElementById('answer3').innerHTML = questions[counter].cAnswer;
                document.getElementById('answer1').innerHTML = questions[counter].otherAnswers[0];
                document.getElementById('answer4').innerHTML = questions[counter].otherAnswers[1];
                document.getElementById('answer2').innerHTML = questions[counter].otherAnswers[2];
                document.getElementById('answer3').value = questions[counter].cAnswer;
                document.getElementById('answer1').value = questions[counter].otherAnswers[0];
                document.getElementById('answer4').value = questions[counter].otherAnswers[1];
                document.getElementById('answer2').value = questions[counter].otherAnswers[2];
                correctDivId = 'answer3';
                break;
            case 4:
                document.getElementById('answer4').innerHTML = questions[counter].cAnswer;
                document.getElementById('answer2').innerHTML = questions[counter].otherAnswers[0];
                document.getElementById('answer3').innerHTML = questions[counter].otherAnswers[1];
                document.getElementById('answer1').innerHTML = questions[counter].otherAnswers[2];
                document.getElementById('answer4').value = questions[counter].cAnswer;
                document.getElementById('answer2').value = questions[counter].otherAnswers[0];
                document.getElementById('answer3').value = questions[counter].otherAnswers[1];
                document.getElementById('answer1').value = questions[counter].otherAnswers[2];
                correctDivId = 'answer4';
                break;
        }
        counter++
    }
}

function checkAnswer(element) {
    var userAnswer = element.value;
    var elementid = element.id;
    var correctAnswer = questions[counter - 1].cAnswer;

    if (counter < questionCount) {
        if (userAnswer == correctAnswer) {
            document.getElementById(elementid).style.backgroundColor = 'green';
            timeout = setTimeout(nextQuestion, TIMEOUT_TIME);
            currentScore++;
            document.getElementById('score').innerHTML = 'Current Score: ' + currentScore;
        } else {
            document.getElementById(elementid).style.backgroundColor = 'red';
            document.getElementById(correctDivId).style.backgroundColor = 'green';
            timeout = setTimeout(nextQuestion, TIMEOUT_TIME);

        }
    } else {


        if (userAnswer == correctAnswer) {
            currentScore++;
            totalScore = cookieScore + currentScore;
            document.getElementById(elementid).style.backgroundColor = 'green';
            timeout = setTimeout(endGame, TIMEOUT_TIME);

        } else {
            totalScore = cookieScore + currentScore;
            document.getElementById(elementid).style.backgroundColor = 'red';
            document.getElementById(correctDivId).style.backgroundColor = 'green';
            timeout = setTimeout(endGame, TIMEOUT_TIME);
        }
    }
}

function getUserSelect() {
    var cat = document.getElementById('CatMenu');
    category = cat.options[cat.selectedIndex].value


    var diff = document.getElementById('DiffMenu');
    difficulty = diff.options[diff.selectedIndex].value


    var num = document.getElementById('NumMenu');
    questionCount = num.options[num.selectedIndex].value

    loadData();
    document.getElementById('questionArea').style.visibility = 'visible';
    document.getElementById('MenuArea').style.display = 'none';
}

function playAgain(elementagain) {
    var answer = elementagain.value;

    if (answer == 'yes') {
        location.reload();
    } else if (answer == 'no') {
        document.body.style.backgroundImage = 'url(images/stitch.gif)';
    }
}
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return 0;
}
function endGame() {

    document.getElementById('questionArea').innerHTML = 'You have Compleated the Quiz<br>Your Score is ' + (currentScore) + '<br> Your Total Score is ' + (totalScore);
    document.getElementById('playAgain').style.visibility = 'visible';
    document.cookie = "score=" + totalScore;
}
function setDivs() {
    document.getElementById('answer1').style.backgroundColor = '#233D4D';
    document.getElementById('answer2').style.backgroundColor = '#233D4D';
    document.getElementById('answer3').style.backgroundColor = '#233D4D';
    document.getElementById('answer4').style.backgroundColor = '#233D4D';

    document.getElementById('answer4').onmouseover = function () {
        this.style.backgroundColor = '#0FF4C6';
    };

    document.getElementById('answer1').onmouseover = function () {
        this.style.backgroundColor = '#0FF4C6';
    };
    document.getElementById('answer2').onmouseover = function () {
        this.style.backgroundColor = '#0FF4C6';
    };
    document.getElementById('answer3').onmouseover = function () {
        this.style.backgroundColor = '#0FF4C6';
    };
    document.getElementById('answer1').onmouseout = function () {
        this.style.backgroundColor = '#233D4D';
    };
    document.getElementById('answer2').onmouseout = function () {
        this.style.backgroundColor = '#233D4D';
    };
    document.getElementById('answer3').onmouseout = function () {
        this.style.backgroundColor = '#233D4D';
    };
    document.getElementById('answer4').onmouseout = function () {
        this.style.backgroundColor = '#233D4D';
    };
}