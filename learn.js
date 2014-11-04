var lesson;
var testFinished = false;

$(document).ready(function () {

    lesson = new Lesson(3, 0);
    makeImageElements(3);
    nextPokemon();
    
});

function makeImageElements(number) {

    $("#questions-div").hide()
    var testDiv = document.getElementById("questions");
    
    var width = 12 / number;

    for (var i = 0; i < number; i++) {

        //make a new div that will be a table column
        var div = document.createElement("div");
        div.setAttribute("class", "col-md-" + width);
        testDiv.appendChild(div);
        var br = document.createElement("br");

        //make the image container div
        var imgConDiv = document.createElement("div");
        imgConDiv.setAttribute("class", "img-container");

        //make an image element and append it to the image container
        var img = document.createElement("img");
        img.setAttribute("class", "img-responsive");
        img.setAttribute("id", "question-img" + i);
        imgConDiv.appendChild(img);

        //make a text input
        var input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("id", "question" + i);
        input.onkeydown = inputFunction();

        //add all the new created elements to our div
        div.appendChild(imgConDiv);
        div.appendChild(br);
        div.appendChild(input);
    }

}

function genSelectButtonHandler(gen) {

    testFinished = false;
    lesson.changeGeneration(gen);
    $('#questions-div').hide();
    $('#next-lesson-button').hide();
    for (var i = 0; i < lesson.length; i++) {

        var input = $('#question' + i);
        input.val('');
        input.removeClass();
    }
    $('#give-up-button').hide();
    nextPokemon();
    $('#learning-div').show();

}

function nextLesson() {

    //set finished to false. Hide the questions. Reset the inputs - classes and content. Hide the questions. 
    testFinished = false;
    $('#questions-div').hide();
    $('#next-lesson-button').hide();
    for (var i = 0; i < lesson.length; i++) {

        var input = $('#question' + i);
        input.val('');
        input.removeClass();
    }

    lesson.nextLesson();
    nextPokemon();
    $('#learning-div').show();
}

function startTest() {

    $("#learning-div").hide();
    //var testDiv = document.getElementById("questions");
    var questionarray = lesson.pokemon;
    

    for (var i = 0; i < questionarray.length; i++) {
        //set the src element of the imgs
        var img = document.getElementById("question-img" + i);
        img.setAttribute("src", questionarray[i].imgUrl);
    }
    $('#questions-div').show();
    $("#give-up-button").show();
}

function inputFunction() {

    return function (evt) {
        evt = evt || window.evt;
        if (evt.keyCode == 13) {
            if (testFinished) {
                nextLesson();
            }
            else{
                validateAnswers();
            }
        }
            
    }

}

function validateAnswers() {

    var correct = new Array();
    var count = 0;
    for (var i = 0; i < lesson.length; i++) {


        var input = $("#question" + i);

        if (lesson.validateAnswer(input.val(), i)) {
            animateInput(input, true);
            count++;
        } else {
            animateInput(input, false);
        }
    }
    if (count == lesson.length) {
        lesson.allCorrect();
        testCompleted();
    }
}

function submitAnswer() {

    for (var i = 0; i < lesson.length; i++) {

        var input = $("#question" + i);
        if (lesson.submitAnswer(input.val(), i)) {
            animateInput(input, true);
        }
        else {
            input.val(lesson.pokemon[i].name);
            animateInput(input, false);
        }
    }

    testCompleted();

}

function testCompleted() {

    testFinished = true;
    $('#next-lesson-button').show();
    $('#give-up-button').hide();

}

function animateInput(input, correct) {

    if (correct) {
        input.animate({ fontSize: '1.5em', opacity: '0.3' }, 'medium');
        input.attr('class', 'correct-input');
        input.animate({ fontSize: '1em', opacity: '1' }, 'medium');
    } else {
        input.animate({ fontSize: '1.5em', opacity: '0.3' }, 'medium');
        input.attr('class', 'incorrect-input');
        input.animate({ fontSize: '1em', opacity: '1' }, 'medium');
    }
}

function nextPokemon() {

    if (lesson.finished) {
        startTest();
    }
    else {
        var pokemon = lesson.getNextPokemon();
        document.getElementById("pic").setAttribute('src', pokemon.imgUrl);
        document.getElementById("label").innerHTML = "This is " + pokemon.name;
        if (lesson.finished) {

        }
    }
}