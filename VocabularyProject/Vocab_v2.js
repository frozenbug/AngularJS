var myApp = angular.module("vocabApp",[]);
	myApp.controller("vocabController",["$scope","$http",function (sc,http){
		sc.Math=window.Math;

		http.get('words_b.json').success(function (result) {
			sc.words_success = 0;
			sc.words_completed = 0;
			sc.words_left = result.length;
			sc.words=result;
			sc.words_pct = 0;
			sc.getNextQn();
		});
		sc.getNextQn=function(){
			var randNo = Math.round(sc.Math.random() * 100);

		// UI
			$("#ans").css('visibility','hidden');
			$("#validate").show();
			$("#next").hide();
			$("#word").val("");
			
		// Get a random word
			sc.meaning = sc.words[randNo].meaning;
			sc.word = sc.words[randNo].word;
		// Remove word
			sc.words.splice(randNo,1);
			sc.words_left = sc.words.length;
			
			//console.log(sc.word);
		}
		sc.validate=function(){
		//UI
			$("#ans").css('visibility','visible');
			$( "#ans" ).show( 'blind', {}, 500, function() {} );
			$("#validate").hide();
			$("#next").show();
			
			if (sc.word === $("#word").val()) {
				sc.words_success += 1;
			}
			sc.words_completed += 1;
			sc.words_pct = Math.round(sc.words_success/sc.words_completed * 100);
		}
	}]);
