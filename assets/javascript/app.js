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
  image: './assets/images/1.jpg',              //url of the pic
  choices: ["Perú", "Chile", "Bolivia"],       //possible answers 
  correctAnswer: "Perú",                       //correct answer
  explanation: "Machu Picchu is a 15th-century Inca citadel situated on a mountain ridge 2,430 metres (7,970 ft) above sea level. It is located in the Cusco Region, Urubamba Province, Machupicchu District in Peru, above the Sacred Valley, which is 80 kilometres (50 mi) northwest of Cuzco and through which the Urubamba River flows."     //breve description of monument
},
{
  image: "./assets/images/2.jpg",
  choices: ["Sidney", "Singapur", "Reino Unido"],
  correctAnswer: "Sidney",
  explanation: "La Opera House es el emblema de Sidney y está situada justo a la orilla de la bahía de la ciudad. Diseñada por el arquitecto danés Jørn Utzon, en su inauguración en 1973 contó con la presencia de la reina Isabel II."
},
{ image: "./assets/images/3.jpg",
  choices: ["Vermont", "Texas", "Dakota del Sur"],
  correctAnswer: "Dakota del Sur",
  explanation: "El Monumento Nacional Monte Rushmore se encuentra situado en una montaña de Keystone, en Dakota del Sur. En él están esculpidos los rostros de los expresidentes americanos George Washington, Tomas Jefferson, Theodore Roosevelt y Abraham Lincoln."
},
  { image: "./assets/images/4.jpg",
  choices: ["India", "Birmania", "Camboya"],
  correctAnswer: "Camboya",
  explanation: "Angkor Wat es el templo más grande del asentamiento de Angkor, la antigua capital del Imperio jemer. Situado en Camboya, el país lo luce con orgullo en la imagen de su bandera."
  },
  { image: "./assets/images/5.jpg",
  choices: ["Luxor", "El Cairo", "Nubia"],
  correctAnswer: "El Cairo",
  explanation: "Las famosas pirámides egipcias se encuentran en la Necrópolis de Gizeh, en la ciudad de El Cairo. La Gran pirámide de Gizeh es la única de las Siete Maravillas del Mundo Antiguo que aún sigue en pie."
  },
  { image: "./assets/images/6.jpg",
  choices: ["Nueva York", "Washington", "Los Ángeles"],
  correctAnswer: "Nueva York",
  explanation: "El Rockefeller Center es un complejo de 19 edificios situados en Nueva York, entre la Quinta y la Sexta Avenida. Es conocido por sus increíbles vistas a Central Park, los estudios de televisión que alberga y porque su árbol de Navidad es el primero que se enciende en toda la ciudad."
  },
  { image: "./assets/images/7.jpg",
  choices: ["Perú", "México", "Chile"],
  correctAnswer: "México",
  explanation: "Chichén Itzá es el yacimiento arqueológico más importante de Yucatán, México. De hecho es la ciudad maya mejor conservada y la más impresionante de la ruta de Yucatán, que también incluye Uxmal, Tulum y Ek Balam. Fue levantado por los mayas y actualmente es uno de los lugares más turísticos del país."
  },
  { image: "./assets/images/8.jpg",
  choices: ["Nueva York", "Washington", "Los Ángeles"],
  correctAnswer: "Nueva York",
  explanation: "El Rockefeller Center es un complejo de 19 edificios situados en Nueva York, entre la Quinta y la Sexta Avenida. Es conocido por sus increíbles vistas a Central Park, los estudios de televisión que alberga y porque su árbol de Navidad es el primero que se enciende en toda la ciudad."
  },
  { image: "./assets/images/9.jpg",
  choices: ["Nueva York", "Washington", "Los Ángeles"],
  correctAnswer: "Nueva York",
  explanation: "El Rockefeller Center es un complejo de 19 edificios situados en Nueva York, entre la Quinta y la Sexta Avenida. Es conocido por sus increíbles vistas a Central Park, los estudios de televisión que alberga y porque su árbol de Navidad es el primero que se enciende en toda la ciudad."
  },
  { image: "./assets/images/10.jpg",
  choices: ["Nueva York", "Washington", "Los Ángeles"],
  correctAnswer: "Nueva York",
  explanation: "El Rockefeller Center es un complejo de 19 edificios situados en Nueva York, entre la Quinta y la Sexta Avenida. Es conocido por sus increíbles vistas a Central Park, los estudios de televisión que alberga y porque su árbol de Navidad es el primero que se enciende en toda la ciudad."
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
      alert('Fin del juego');                 //alert the end of the game
      timeLaps.stop();                        //stop the timer
      $('#form').empty();                     //clean the childs of the element form
      $('#timer').empty();                    //clean the childs of the element timer
      $('#pic').html(`<img src="./assets/images/Background.jpg" width='100%' height='100%'  borderradius='5px'></div>`); //display the background pic 
      $('#form').html("<h2>You have hit: " + wins + " answers and you have lost: " + losses + " answers</h2><br/>"); //create a new text where inform to user how many question answer correct and wrong
      $('#form').append(`<div><a id = "startAgain" class="btn btn-primary btn-lg" href="#" role="button">Start again </a></div><br/>`); //add a new button to start the game again

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

    var selectedAnswer = $('#answers1').text();
    if (selectedAnswer === questions[actualQuestion].correctAnswer) {
      soundCorrect.play();
      wins++;
      timeLaps.stop();
      alert('correct');
      timeLaps.reset();

    }
    else {
      losses++;
      soundWrong.play();
      timeLaps.stop();
      timeLaps.reset();

    }
  });

  $("#answers2").click(function (event) {

    clicked = true; //Flag to control if user clicked on any button

    var selectedAnswer = $('#answers2').text();
    if (selectedAnswer === questions[actualQuestion].correctAnswer) {
      soundCorrect.play();
      explanation();
      wins++;
      timeLaps.stop();
      alert('correct');
      timeLaps.reset();

    }
    else {
      losses++;
      soundWrong.play();
      timeLaps.stop();
      alert("wrong answer!");
      timeLaps.reset();

    }
  });

  $("#startAgain").click(function (event) {  //listen to click the button to stat the game again

    actualQuestion = 0;   //reset the index of the array
    displayOptions();     //call to display the first question

  });

}


$(document).ready(function () {


  $('#start').click(function () {   //clean the start page
    $("#principal").empty();

    displayOptions();            //call the first question


  });
});