angular.module("pokeApp").constant("lessonLength", 3).controller("lessonController", function($scope, lessonLength){

    

    //local variables
    var lesson = new Lesson(lessonLength, 0);
    correct = new Array();
    for(var i =0; i < lesson.length; i++){
    	correct.push(null);
    }
    //scope variables
    $scope.lesson = lesson;
    $scope.inputAnswers = new Array();
    for(var i =0; i < lesson.length; i++){
    	$scope.inputAnswers.push("");
    }
    $scope.currentPokemon = lesson.getNextPokemon();   
    $scope.finishedTest = false;
    //scope methods
	$scope.nextPokemon = function() {

        $scope.currentPokemon = lesson.getNextPokemon();
	}

	$scope.startTest = function(){

    	$scope.testStarted = true;

	}
	$scope.genSelectButtonHandler = function(gen) {

	    lesson.changeGeneration(gen);
	    $scope.nextPokemon();
		resetUi();
	}

	$scope.nextLesson = function() {
    
	    lesson.nextLesson();
	    $scope.nextPokemon();
	    $scope.testStarted = false;
	    resetUi();
	}

	$scope.submitAnswer = function() {

	    for (var i = 0; i < lesson.length; i++) {

	        if (lesson.submitAnswer($scope.inputAnswers[i],i)) {
	            // animateInput(input, true);
	            correct[i] = true;
	        }
	        else {
	            $scope.inputAnswers[i] = lesson.pokemon[i].name;
	            // animateInput(input, false);
	            correct[i] = false;
	        }
	    }
	    $scope.finishedTest = true;

	}

	$scope.inputEnter = function () {

        if ($scope.finishedTest) {
            $scope.nextLesson();
        }
        else{
            validateAnswers();
        }

	}

	$scope.getInputClass = function(inpNum){

		if(correct[inpNum] == null){
			return "";
		}
		else if (!correct[inpNum]){
			return "input-incorrect";
		}
		else{
			return "input-correct";
		}
	}

	$scope.selectedButtonClass = function(btnNumber){

		return btnNumber == lesson.generation ? "btn-primary" : "";
	}

    //helper methods
	function validateAnswers() {

	    var count = 0;
	    for (var i = 0; i < lesson.length; i++) {

	        if (lesson.validateAnswer($scope.inputAnswers[i],i)){
	            // animateInput(input, true);
	            count++;
	            correct[i] = true;
	        } 
	        else {
	            // animateInput(input, false);
	            correct[i] = false;
	        }
	    }
	    if (count == lesson.length) {
	        lesson.allCorrect();
	        $scope.finishedTest = true;
	    }
	}

	function resetUi(){

		$scope.finishedTest = false;
		$scope.testStarted = false;
		for(var i = 0; i < lesson.length; i++){
			$scope.inputAnswers[i] = '';
			correct[i] = null;
		}

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

});