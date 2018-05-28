//variable declaration section

var actualQuestion = 0;    //index to run the array of questions
var clicked = false;       //flag to know if any button was clicked
var intervalId;            // id for interval
var wins = 0;              //counter for wins
var losses = 0;            //counter for losses
var playing = true;        //flag to stop the game
var soundCorrect = new Audio("./assets/sounds/correct.wav");  //var for correct answer
var soundWrong = new Audio("./assets/sounds/wrong.mp3");      //var for wrong answer

var questions = [{              
  image: './assets/images/0.jpg',              //url of the pic
  choices: ["Seville", "Havana", "Rome"],       //possible answers 
  correctAnswer: "Havana",                       //correct answer
  explanation: "Havana Cathedral (The Cathedral of the Virgin Mary of the Immaculate Conception) is one of eleven Roman Catholic cathedrals on the island of Cuba. It is located in the Plaza de la Catedral in the center of Old Havana. The Jesuits began construction of the cathedral in 1748 on the site of an earlier church and it was completed in 1777."     //breve description of monument
},
{ image: './assets/images/1.jpg',              //url of the pic
  choices: ["Peru", "Chile", "Bolivia"],       //possible answers 
  correctAnswer: "Peru",                       //correct answer
  explanation: "Machu Picchu is a 15th-century Inca citadel situated on a mountain ridge 2,430 metres (7,970 ft) above sea level. It is located in the Cusco Region, Urubamba Province, Machupicchu District in Peru, above the Sacred Valley, which is 80 kilometres (50 mi) northwest of Cuzco and through which the Urubamba River flows."     //breve description of monument
},
{ image: "./assets/images/2.jpg",
  choices: ["Sydney", "Singapore", "United Kingdom"],
  correctAnswer: "Sydney",
  explanation: "The Opera House is the emblem of Sydney and is located right on the edge of the city bay. Designed by the Danish architect Jørn Utzon, it was inaugurated in 1973 and was attended by Queen Elizabeth II."
},
{ image: "./assets/images/3.jpg",
  choices: ["Vermont", "Texas", "South Dakota"],
  correctAnswer: "South Dakota",
  explanation: "The Mount Rushmore National Monument is located on a mountain in Keystone, South Dakota. The faces of the American ex-presidents George Washington, Thomas Jefferson, Theodore Roosevelt and Abraham Lincoln are sculpted."
},
  { image: "./assets/images/4.jpg",
  choices: ["India", "Burma", "Cambodia"],
  correctAnswer: "Cambodia",
  explanation: "Angkor Wat is the largest temple in the settlement of Angkor, the former capital of the Khmer Empire. Located in Cambodia, the country proudly looks on the image of its flag."
  },
  { image: "./assets/images/5.jpg",
  choices: ["Luxor", "Cairo", "Nubia"],
  correctAnswer: "Cairo",
  explanation: "The famous Egyptian pyramids are found in the Necropolis of Giza, in the city of Cairo. The Great Pyramid of Gizeh is the only one of the Seven Wonders of the Ancient World that still stands today."
  },
  { image: "./assets/images/6.jpg",
  choices: ["New York", "Washington", "Los Angeles"],
  correctAnswer: "New York",
  explanation: "The Rockefeller Center is a complex of 19 buildings located in New York, between Fifth and Sixth Avenue. It is known for its incredible views of Central Park, the television studios that it houses and because its Christmas tree is the first one that lights up throughout the city."
  },
  { image: "./assets/images/10.jpg",
  choices: ["Peru", "Mexico", "Chile"],
  correctAnswer: "Mexico",
  explanation: "Chichen Itza is the most important archaeological site in Yucatan, Mexico. In fact it is the best preserved and most impressive Mayan city on the Yucatan route, which also includes Uxmal, Tulum and Ek Balam. It was built by the Mayans and is currently one of the most touristic places in the country."
  },
  { image: "./assets/images/9.jpg",
  choices: ["Cuba", "Poland", "Brazil"],
  correctAnswer: "Brazil",
  explanation: "The Christ the Redeemer on the hill of Corcovado is the best-known image of Rio de Janeiro, Brazil. The sculpture, considered one of the new wonders of the world, measures 38 meters in height."
  },
  { image: "./assets/images/7.jpg",
  choices: ["Prague", "Budapest", "Paris"],
  correctAnswer: "Budapest",
  explanation: "The Chain Bridge is the symbol of Budapest. It dates from 1849, although during the Second World War it suffered great damage and had to be rebuilt. It was the first bridge of the city and its objective was to unite the ancient cities of Buda and Pest. The Hammersmith Bridge in London was modeled on its construction."
  },
  { image: "./assets/images/8.jpg",
  choices: ["St. Petersburg "," Minsk ","Moscow"],
  correctAnswer: "Moscow",
  explanation: "St. Basil's Cathedral is one of the best-known images of Moscow. It is located in the Red Square and draws attention for its colorful domes."
  },
  { image: "./assets/images/11.jpg",
  choices: ["Cuba", "United States", "France"],
  correctAnswer: "Cuba",
  explanation: "El Capitolio, or National Capitol Building in Havana, Cuba, was the organization of government in Cuba until after the Cuban Revolution in 1959, and is now home to the Cuban Academy of Sciences. Its design is compared to that of the United States Capitol, but is not a replica of it. Completed in 1929, it was the tallest building in Havana until the 1950s and houses the world's third largest indoor statue."
  },]


var timeLaps = {   //objetc to control time

  time: 15,      //time for user to guess question

  reset: function () {  //function to reset the game

    timeLaps.time = 15;    //reset the timer
    playing = true;       //variable to true to reset the game

    actualQuestion++;     //increment the index of the array
    if (actualQuestion < questions.length) {  //compare index with the lenght of array of questions
      clearInterval(intervalId);              //clear the interval
      displayOptions();                       //call to display next question
    } else {
      // alert('Fin del juego');                 //alert the end of the game
      timeLaps.stop();                        //stop the timer
      $('#form').empty();                     //clean the childs of the element form
      $('#timer').empty();                    //clean the childs of the element timer
      $('#pic').html(`<img src="./assets/images/Background.jpg" width='100%' height='100%'  borderradius='5px'></div>`); //display the background pic 
      $('#form').html("<h2>You have hit: " + wins + " answers and you have lost: " + losses + " answers</h2><br/>"); //create a new text where inform to user how many question answer correct and wrong
      $('#form').append(`<div><a id = "startAgain" class="btn btn-primary btn-lg" href="#" role="button">Start again </a></div><br/>`); //add a new button to start the game again

      $("#startAgain").click(function (event) {  //listen to click the button to stat the game again

        actualQuestion = 0;   //reset the index of the array
        playing = true;       //restar the flag to start the game again
    
        displayOptions();     //call to display the first question
       
      });
    }

  },

  timeIsUp: function () {  //function for control if any button was clicked or if the time finished without any answer
    if (!clicked) {
      losses++;             //if the time finished without clicked any button increment the losses in 1
      soundWrong.play();    //call to sound of wrong question
    }
  },

  run: function () {  //function for start timer 

    if (playing) {      //flag to know if the user is playing or not
      intervalId = setInterval(timeLaps.decrement, 1000);     //call decrenete each 1 sec
      $('#timer').html("<h2> Resting time: 00:15 sec </h2>");   //display the timer in 15sec first time
    } else {
      timeLaps.stop();  //if not playing call stop the timer
    }
  },

  delay: function () {    //function for delay the time in order to show a breve descrition of the monumnet in question.

    var delayInMilliseconds = 1000 * 7;    //the user has 7 sec to read the desciption

    timeLaps.stop();               //call stop the time
    setTimeout(function () {
      playing = true;              //reset the playing flag to true to keep playing
      timeLaps.reset();            

    }, delayInMilliseconds);


  },

  decrement: function () {   //This function is in charge of display the timer in sec 

    timeLaps.time--;     //decrement the sec
    var currentTime = timeLaps.timeConverter(timeLaps.time);   //convert the time in sec
    $('#timer').html("<h2> Resting time: " + currentTime + " sec </h2>");   //display the time each 1 sec

    if (timeLaps.time === 0) {   //control if the user has time or not
      timeLaps.timeIsUp();       //call to timeIsUp
      timeLaps.reset();          //call to reset the game
    }
  },

  stop: function () {      //this function stop the timer

    clearInterval(intervalId);
    playing = false;       // update the flag to stop the game

  },

  timeConverter: function (t) {

    //  Takes the current time in seconds and convert it to minutes and seconds (mm:ss).
    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);

    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    if (minutes === 0) {
      minutes = "00";
    }

    else if (minutes < 10) {
      minutes = "0" + minutes;
    }

    return minutes + ":" + seconds;
  },

};

function explanation() {   //This function display a breve description of the monument
  var explanat = '';
  explanat += `<div><p>` + questions[actualQuestion].explanation + `</p></div>`;  //create the div dinamicaly
  $('#form').append(explanat);  //show the description at the end of the form
  timeLaps.delay();   //call to delay to give time to user for read the description.
}


function displayOptions() { //this function display the image and the possible answers

  timeLaps.run();    //call to strat the timer

  var options = questions[actualQuestion].choices;  //store in a variable the possible answers
  var formHtml = '';
  var formPic = `<div> <img src="` + questions[actualQuestion].image + ` " width='100%' height='100%'  borderradius='5px'></div>`;  // create the html to display the new image

  for (var i = 0; i < options.length; i++) {  //create dinamically the buttons with the possible answers
    questions[actualQuestion].choices[i]
    formHtml += `<div><a id = "answers` + i + `" class="btn btn-primary btn-lg" href="#" role="button">` + questions[actualQuestion].choices[i] + `</a> </div><br/>`;
  }

  $('#pic').html(formPic);    //display the pic
  $('#form').html(formHtml);  //display the buttons


  listenToClick();  //call this function to listen to click
};

function listenToClick() {   //this function is in charge of listen to click

  $("#answers0").click(function (event) {

    clicked = true; //Flag to control if user clicked on any button
   
    $("#answers0").attr("disabled", "true");
    $("#answers1").attr("disabled", "true");
    $("#answers2").attr("disabled", "true");

    var selectedAnswer = $('#answers0').text();  //capture in a variable the text of the button
    if (selectedAnswer === questions[actualQuestion].correctAnswer) {   //compare the correct answer with the user answer  => if correct
      soundCorrect.play();    //call to the correct sound 
      wins++;                 //increment the wins
      explanation();          //call to explanation function
      timeLaps.stop();        //call to stop the timer
    }
    else {                   // => if incorrect answer
      losses++;              // increment the losses
      soundWrong.play();     //call to the wrong sound 
      timeLaps.stop();       //call to stop the timer
      timeLaps.reset();      //call to reset the game
    }
  });

  $("#answers1").click(function (event) {

    clicked = true; //Flag to control if user clicked on any button

    // $("#answers0").attr("disabled", "true");
    // $("#answers1").attr("disabled", "true");
    // $("#answers2").attr("disabled", "true");

    var selectedAnswer = $('#answers1').text();
    if (selectedAnswer === questions[actualQuestion].correctAnswer) {
      soundCorrect.play();    //call to the correct sound 
      wins++;                 //increment the wins
      explanation();          //call to explanation function
      timeLaps.stop();        //call to stop the timer

    }
    else {
      losses++;              // increment the losses
      soundWrong.play();     //call to the wrong sound 
      timeLaps.stop();       //call to stop the timer
      timeLaps.reset();      //call to reset the game

    }
  });

  $("#answers2").click(function (event) {

    clicked = true; //Flag to control if user clicked on any button

    // $("#answers0").attr("disabled", "true");
    // $("#answers1").attr("disabled", "true");
    // $("#answers2").attr("disabled", "true");

    var selectedAnswer = $('#answers2').text();
    if (selectedAnswer === questions[actualQuestion].correctAnswer) {
      soundCorrect.play();    //call to the correct sound 
      wins++;                 //increment the wins
      explanation();          //call to explanation function
      timeLaps.stop();        //call to stop the timer
    }
    else {
      losses++;              // increment the losses
      soundWrong.play();     //call to the wrong sound 
      timeLaps.stop();       //call to stop the timer
      timeLaps.reset();      //call to reset the game

    }
  });



}


$(document).ready(function () {


  $('#start').click(function () {   //clean the start page
    $("#principal").empty();

    displayOptions();            //call the first question


  });
});