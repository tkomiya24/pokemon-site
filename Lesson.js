/*
    The Lesson object constructor.
    The Lesson object chooses 'length'
    amount of pokemon and then validates
    the answers in the test. It keeps track
    of which pokemon have already been asked
    AND answered correctly
    (alreadyAsked array). Pokemon asked but
    incorrectly answered will appear in a 
    future lesson.
    It uses a Generator object to choose the random 
    pokemon for the lessons. 
*/
function Lesson(length, generation) {
    this.length = length;//length of each lesson
    this.currentIndex = 0;//how far in the lesson we currently are
    this.alreadyAsked = new Array();//all pokemon that have been asked and answered correctly
    this.finished = false;//keeps track of whether the lesson if finished or not.
    this.generation = generation;//limits the pokemon in lessons to be of this.generation generation   
    this.pkmGenerator = new Generator();//the generator object used to choose the next pokemon.

    this.pokemon;//the array that will hold the pokemon of the current lesson
    this.choosePokemon();//fills the array of the line above.
};



/*
    Generates the next lesson. 
    ie, chooses the next pokemon
    for the next lesson.
*/
Lesson.prototype.nextLesson = function(){
    
    this.choosePokemon();
    this.currentIndex = 0;
    this.finished = false;
};

Lesson.prototype.changeGeneration = function (gen) {

    this.generation = gen;
    this.choosePokemon();
    this.currentIndex = 0;
    this.finished = false;
}

Lesson.prototype.validateAnswer = function (answer, index) {

    if (answer.toLowerCase() == this.pokemon[index].name.toLowerCase())
        return true;

    else
        return false;

}

Lesson.prototype.submitAnswer = function (answer, index) {

    if (this.validateAnswer(answer, index)) {
        this.alreadyAsked[answer] = true;
        return true;
    }
    else
        return false;
}

//HELPER METHODS

/*
    Helper method.
    This function marks all pokemon in the current
    lesson as having been correct.
*/
Lesson.prototype.allCorrect = function(){

    for (var i = 0; i < this.pokemon.length; i++) {

        this.alreadyAsked[this.pokemon[i].name] = true;
    }
}

/*
    Helper method. 
    This function chooses randomly the next pokemon
    to be used in the next lesson, and then sets
    them to this.pokemon.
*/
Lesson.prototype.choosePokemon = function() {

    this.pokemon = new Array();
    var curNums = new Array();

    for (var i = 0; i < this.length; i++) {
        var pok;
        do {
            pok = this.pkmGenerator.getRandomPokemon(this.generation);
        } while (this.alreadyAsked[pok.name] || curNums.indexOf(pok.number)>=0);
        this.pokemon.push(pok);
        curNums.push(pok.number);
    }
}

/*
    Helper Method.
    Returns the next pokemon in the lesson.
*/
Lesson.prototype.getNextPokemon = function () {

    if (this.currentIndex == this.length - 1) {
        this.finished = true;
    }
    return this.pokemon[this.currentIndex++];

};
