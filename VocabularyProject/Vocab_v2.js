var myApp = angular.module("vocabApp",[]);
	myApp.controller("vocabController",["$scope","$http",function (sc,http){
		sc.Math=window.Math;

		http.get('words_b.json').success(function (result) {
			sc.words_success = 0;
			sc.words_completed = 0;
			sc.words = result;
			sc.words_pct = 0;
			sc.total_words = result.length;
			sc.words_left = sc.total_words;
			sc.getNextQn();
		});
		sc.getNextQn=function(){
			var randNo = Math.floor(sc.Math.random() * sc.words_left);

			console.log(sc.words);
			console.log(randNo);

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
			
		}
		sc.validate=function(){
		//UI
			$("#ans").css('visibility','visible');
			$("#validate").hide();
			
			if (sc.word === $("#word").val()) {
				sc.words_success += 1;
			}
			sc.words_completed += 1;
			sc.words_pct = Math.round(sc.words_success/sc.words_completed * 100);
			
			if (sc.words_left > 0) {
				$("#next").show();
			}
			else {
				$("#bSummary").show();
			}
		}
		sc.summary=function(){
			$("#output").hide();
			$("#summary").show();
		}		
	}]);

//Todo
	//List of bad words
	//Option to use multiple files