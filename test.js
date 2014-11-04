var gen = 0;
var streak = 0;
var alreadyAsked;
var currentPokemon;
var pkmGenerator;
var correct = true;
window.onload = function(){

    pkmGenerator = new Generator();
    nameInputSetup();   
    alreadyAsked = new Array();
    generateQuestion();
    updateScore();
};

function generateQuestion() {

    currentPokemon = getNextPokemon(gen);
    document.getElementById('question').setAttribute('src', currentPokemon.imgUrl);

};

function getNextPokemon(gen) {

    var pok;
    do{
        pok = pkmGenerator.getRandomPokemon(gen);
    } while (alreadyAsked[pok.name] == true);

    return pok;

};

function nameInputSetup() {

    var input = document.getElementById("nameAnswer");
    input.onkeydown = function (evt) {
        evt = evt || window.event;
        if (evt.keyCode == 13) {

            if (correct)
                validateAnswer(false);
            else
                reset();
        }

    };
    input.focus();
};

function validateAnswer(giveup) {

    var input = $('#nameAnswer');
    if (!giveup && currentPokemon.name.toLowerCase() == input.val().toLowerCase()) {
        document.getElementById('status').innerHTML = "Correct!";
        $('#status').animate({ fontSize: '1.7em', opacity: '0.3' }, 'medium');
        $('#status').animate({ fontSize: '1.5em', opacity: '1' }, 'medium');
        streak++;
        alreadyAsked[currentPokemon.name] = true;
        updateScore();
        generateQuestion();
        input.val('');

    }
    else {
        
        correct = false;
        var status = $('#status');
        var answer = $('#answer');
        status.css('color', 'red');
        answer.html(currentPokemon.name);
        status.html('Wrong!');
        input.animate({ fontSize: '1.5em', opacity: '0.3' }, 'medium');
        input.attr('class', 'incorrect-input');
        input.animate({ fontSize: '1em', opacity: '1' }, 'medium');
        status.animate({ fontSize: '1.7em', opacity: '0.3' }, 'medium');
        status.animate({ fontSize: '1.5em', opacity: '1' }, 'medium');
        answer.fadeIn(600);
        $('#submit-button').hide();
        $('#give-up-button').hide();
        tryagainbutton = $('#try-again-button');
        tryagainbutton.show();
        alreadyAsked = new Array();
    }
};

function reset() {

    correct = true;
    $('#answer').hide();
    input = $('#nameAnswer');
    input.val('');
    input.removeClass('incorrect-input');
    $('#try-again-button').hide();
    $('#submit-button').show();
    $('#give-up-button').show();
    resetScore();
    generateQuestion();

}

//button handler
function switchGen(i) {
    gen = i;
    reset();
}

function updateScore() {

    var div = $("#streakTracker");
    div.html(streak);
    div.animate({ fontSize: '4em', opacity: '0.3' }, 'medium');
    div.animate({ fontSize: '3em', opacity: '1' }, 'medium');

};

function resetScore() {

        streak = 0;
        var status = $('#status');
        status.html('');
        status.css('color', 'lightgreen');
        
        updateScore();
}
