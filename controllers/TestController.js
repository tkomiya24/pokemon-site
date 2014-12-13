angular.module("pokeApp").controller("testController", function($scope){
	
	//local variables 
	var gen = 0;
	var alreadyAsked = new Array();
	var pkmGenerator = new Generator();
	
	//scope variables.
	$scope.inputAnswer = '';
	$scope.streak = 0;
	$scope.correct = true;
	$scope.currentPokemon = getNextPokemon(gen);
	$scope.correctAnswer = '';
	$scope.pokemonTypes = ["Normal","Fire","Fighting","Water","Flying","Grass","Poison","Electric","Ground","Psychic","Rock","Ice","Bug","Dragon","Ghost","Dark","Steel","Fairy"].sort();

	//scope methods
	$scope.validateAnswer = function(giveup) {

	    if (!giveup && $scope.currentPokemon.name.toLowerCase() == $scope.inputAnswer.toLowerCase()) {

	        $scope.streak++;
	        alreadyAsked[$scope.currentPokemon.name] = true;
	        animateStreakDiv();
	        animateStatus();
	        $scope.currentPokemon = getNextPokemon(gen);
	        $scope.inputAnswer = '';

	    }
	    else {
	        $scope.correctAnswer = $scope.currentPokemon.name;
	        $scope.correct = false;
	        animateStatus();
	        // input.animate({ fontSize: '1.5em', opacity: '0.3' }, 'medium');
	        // input.animate({ fontSize: '1em', opacity: '1' }, 'medium');
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

	function animateStatus(){

		var status = $("#status");
		status.animate({fontSize: '2.5em', opacity:'0.5'}, 'medium');
		status.animate({fontSize: '1.9em', opacity:'1'}, 'medium');
	}

	function animateStreakDiv() {

	    var div = $("#streakTracker");
	    div.animate({ fontSize: '4em', opacity: '0.3' }, 'medium');
	    div.animate({ fontSize: '3em', opacity: '1' }, 'medium');

	};

	function resetScore() {

	        $scope.streak = 0;     
	        animateStreakDiv();
	}

});