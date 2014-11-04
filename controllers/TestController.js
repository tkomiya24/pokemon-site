angular.module("pokeApp").controller("testController", function($scope){
	
	//local variables 
	var gen = 0;
	var alreadyAsked = new Array();
	var pkmGenerator = new Generator();
	
	//scope variables.
	$scope.inputAnswer = '';
	$scope.streak = 0;
	$scope.correct = true;
	$scope.currentPokemon;
	$scope.currentPokemon = getNextPokemon(gen);

	//scope methods
	$scope.validateAnswer = function(giveup) {

	    if (!giveup && $scope.currentPokemon.name.toLowerCase() == $scope.inputAnswer.toLowerCase()) {

	        $scope.streak++;
	        alreadyAsked[$scope.currentPokemon.name] = true;
	        updateScore();
	        $scope.currentPokemon = getNextPokemon(gen);
	        $scope.inputAnswer = '';

	    }
	    else {
	        
	        $scope.correct = false;
	        // var status = $('#status');
	        // var answer = $('#answer');
	        // input.animate({ fontSize: '1.5em', opacity: '0.3' }, 'medium');
	        // input.attr('class', 'incorrect-input');
	        // input.animate({ fontSize: '1em', opacity: '1' }, 'medium');
	        // answer.fadeIn(600);
	        // alreadyAsked = new Array();
	    }
	};

	$scope.reset = function() {

	    $scope.correct = true;
	    $scope.inputAnswer = '';
	    resetScore();
	    $scope.currentPokemon = getNextPokemon(gen);

	}

	$scope.switchGen = function(i) {
	    gen = i;
	    $scope.reset();
	}


	$scope.inputEnter = function() {

	    if ($scope.correct)
	        $scope.validateAnswer(false);
	    else
	        $scope.reset();
	};

	$scope.selectedButtonClass = function(generation){

		return generation == gen ? "btn-primary" : "";

	}

	$scope.getStatus = function(){

		if($scope.streak > 0 && $scope.correct){
			return "Correct!";
		}
		else if($scope.correct){
			return "";
		}
		else{
			return "Wrong!";
		}

	}

	$scope.getInputClass = function(){

		return !$scope.correct ? "input-incorrect" : "";

	}

	$scope.getStatusClass = function(){

		return $scope.correct ? 'status-correct' : 'status-incorrect';

	}

	function getNextPokemon(gen) {

	    var pok;
	    do{
	        pok = pkmGenerator.getRandomPokemon(gen);
	    } while (alreadyAsked[pok.name] == true);

	    return pok;

	};


	function updateScore() {

	    var div = $("#streakTracker");
	    div.animate({ fontSize: '4em', opacity: '0.3' }, 'medium');
	    div.animate({ fontSize: '3em', opacity: '1' }, 'medium');

	};

	function resetScore() {

	        $scope.streak = 0;     
	        updateScore();
	}

});