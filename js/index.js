var RecipesApp=angular.module("Recipes", []);

RecipesApp.controller("RecipesController", function($scope, $http){

	$scope.search_term;
	$scope.search_type = 'title';
	$scope.search=function() {
		$scope.search_type.toLowerCase();
		$scope.search_term.toLowerCase();

		$http({
			method: 'GET',
			url: "https://mampalicious.herokuapp.com/searchtitle?type="+$scope.search_type + "&keyword=" + $scope.search_term
		}).then(function success(response) {
			$scope.recipes = response.data;
			console.log("SUCCESS");
		}, function error(response) {
			console.log("ERROR");
		});
	};
    
    $scope.showMenu = false;
    $scope.showDescrip = false;
    $scope.titleClass = "active";
	$scope.ingredientClass = " ";

	$scope.keypressEnter = function(keyEvent) {
	  	if (keyEvent.which === 13) {
	  		$scope.search();
	 	}
	}

    $scope.setSearchTitle = function () {
		$scope.search_type = 'title';
		$scope.titleClass = "active";
		$scope.ingredientClass = " ";
	}

	$scope.setSearchIngredient = function () {
		$scope.search_type = 'ingredient';
		$scope.ingredientClass = "active";
		$scope.titleClass = " ";
	}

});

RecipesApp.controller("FormController", function($scope, $http) {
	$scope.form_ingredients = [];
	$scope.form_utilities = [];

	$scope.form_amount;
	$scope.form_ingredient;
	$scope.form_utility;

	$scope.form_title;
	$scope.form_instructions;
	$scope.form_cuisine;
	$scope.form_country;

	$scope.addIngredient = function(keyEvent) {
		if ($scope.form_amount != undefined  && 
			$scope.form_ingredient!= undefined) {
			form = { 
				"amount" : $scope.form_amount, 
				"ingredient" : $scope.form_ingredient
			}
		
	  		$scope.form_ingredients.push(form);
		}  	
	}

	$scope.addUtility = function() {
		$scope.form_utilities.push($scope.form_utility);
	}	

	$scope.deleteIngredient = function() {
		$scope.form_ingredients.splice(this.$index, 1);
	}

	$scope.deleteUtility = function() {
		$scope.form_utilities.splice(this.$index, 1);
	}

	$scope.keypressEnterIngredient = function(keyEvent) {
	  	if (keyEvent.which === 13) {
	  		$scope.addIngredient();
	 	}
	}

	$scope.keypressEnterUtility = function(keyEvent) {
	  	if (keyEvent.which === 13) {
	  		$scope.addUtility();
	 	}
	}

	$scope.sendRecipes = function () {
		var amounts = '';
		var ingredients = '';
		var utilities = '';

		for (i = 0; i < $scope.form_ingredients.length; i++) {
			amounts += "amounts=" + $scope.form_ingredients[i].amount + "&";
			ingredients += "ingredients=" + $scope.form_ingredients[i].ingredient + "&";
		}

		for (i = 0; i < $scope.form_utilities.length; i++) {
			utilities += "utilities=" + $scope.form_utilities[i] + "&";
		}

		var data = "title=" + $scope.form_title + "&" + 
					amounts + "&" + ingredients + utilities + 
					"instructions=" + $scope.form_instructions + "&" + 
					"country=" + $scope.form_country + "&" + 
					"cuisine=" + $scope.form_cuisine;

		var req = {
	 		method: 'POST',
			url: 'https://mampalicious.herokuapp.com/form',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}, data: data
		}

		$http(req).then(function success(response) {
			console.log("SUCCESS");
		}, function error(response) {
			console.log("ERROR");
		});
	}
});