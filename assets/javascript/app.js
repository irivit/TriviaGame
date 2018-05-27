var actualQuestion = 0;
var answer = 0;
var intervalId;
var wins = 0;
var losses = 0;
var soundCorrect = new Audio("./assets/sounds/correct.wav")
var soundWrong = new Audio("./assets/sounds/wrong.mp3")

var questions = [{
  image: './assets/images/1.jpg',
  choices: ["Perú", "Chile", "Bolivia"],
  correctAnswer: "Perú",
  explanation: "Machu Picchu is a 15th-century Inca citadel situated on a mountain ridge 2,430 metres (7,970 ft) above sea level. It is located in the Cusco Region, Urubamba Province, Machupicchu District in Peru, above the Sacred Valley, which is 80 kilometres (50 mi) northwest of Cuzco and through which the Urubamba River flows."
},
{
  image: "./assets/images/2.jpg",
  choices: ["Sidney", "Singapur", "Reino Unido"],
  correctAnswer: "Sidney",
  explanation: "La Opera House es el emblema de Sidney y está situada justo a la orilla de la bahía de la ciudad. Diseñada por el arquitecto danés Jørn Utzon, en su inauguración en 1973 contó con la presencia de la reina Isabel II."
}]
//   { image: "./assets/images/3.jpg",
//   choices: ["Vermont", "Texas", "Dakota del Sur"],
//   correctAnswer: "Dakota del Sur",
//   explanation: "El Monumento Nacional Monte Rushmore se encuentra situado en una montaña de Keystone, en Dakota del Sur. En él están esculpidos los rostros de los expresidentes americanos George Washington, Tomas Jefferson, Theodore Roosevelt y Abraham Lincoln."
// },
//   { image: "./assets/images/4.jpg",
//   choices: ["India", "Birmania", "Camboya"],
//   correctAnswer: "Camboya",
//   explanation: "Angkor Wat es el templo más grande del asentamiento de Angkor, la antigua capital del Imperio jemer. Situado en Camboya, el país lo luce con orgullo en la imagen de su bandera."
//   },
//   { image: "./assets/images/5.jpg",
//   choices: ["Luxor", "El Cairo", "Nubia"],
//   correctAnswer: "El Cairo",
//   explanation: "Las famosas pirámides egipcias se encuentran en la Necrópolis de Gizeh, en la ciudad de El Cairo. La Gran pirámide de Gizeh es la única de las Siete Maravillas del Mundo Antiguo que aún sigue en pie."
//   },
//   { image: "./assets/images/6.jpg",
//   choices: ["Nueva York", "Washington", "Los Ángeles"],
//   correctAnswer: "Nueva York",
//   explanation: "El Rockefeller Center es un complejo de 19 edificios situados en Nueva York, entre la Quinta y la Sexta Avenida. Es conocido por sus increíbles vistas a Central Park, los estudios de televisión que alberga y porque su árbol de Navidad es el primero que se enciende en toda la ciudad."
//   },
//   { image: "./assets/images/7.jpg",
//   choices: ["Perú", "México", "Chile"],
//   correctAnswer: "México",
//   explanation: "Chichén Itzá es el yacimiento arqueológico más importante de Yucatán, México. De hecho es la ciudad maya mejor conservada y la más impresionante de la ruta de Yucatán, que también incluye Uxmal, Tulum y Ek Balam. Fue levantado por los mayas y actualmente es uno de los lugares más turísticos del país."
//   },
//   { image: "./assets/images/8.jpg",
//   choices: ["Nueva York", "Washington", "Los Ángeles"],
//   correctAnswer: "Nueva York",
//   explanation: "El Rockefeller Center es un complejo de 19 edificios situados en Nueva York, entre la Quinta y la Sexta Avenida. Es conocido por sus increíbles vistas a Central Park, los estudios de televisión que alberga y porque su árbol de Navidad es el primero que se enciende en toda la ciudad."
//   },
//   { image: "./assets/images/9.jpg",
//   choices: ["Nueva York", "Washington", "Los Ángeles"],
//   correctAnswer: "Nueva York",
//   explanation: "El Rockefeller Center es un complejo de 19 edificios situados en Nueva York, entre la Quinta y la Sexta Avenida. Es conocido por sus increíbles vistas a Central Park, los estudios de televisión que alberga y porque su árbol de Navidad es el primero que se enciende en toda la ciudad."
//   },
//   { image: "./assets/images/10.jpg",
//   choices: ["Nueva York", "Washington", "Los Ángeles"],
//   correctAnswer: "Nueva York",
//   explanation: "El Rockefeller Center es un complejo de 19 edificios situados en Nueva York, entre la Quinta y la Sexta Avenida. Es conocido por sus increíbles vistas a Central Park, los estudios de televisión que alberga y porque su árbol de Navidad es el primero que se enciende en toda la ciudad."
//   },]


var timeLaps = {

  time: 6,

  reset: function () {

    timeLaps.time = 6;

    actualQuestion++;
    if (actualQuestion < questions.length) {
      displayOptions();
      timeLaps.run();
    } else {
      alert('Fin del juego');
      timeLaps.stop();
      $('#form').empty();
      $('#timer').empty();
      $('#pic').html(`<img src="./assets/images/Background.jpg" width='100%' height='100%'  borderradius='5px'></div>`);
      $('#form').html("<h2>You have hit: " + wins + " answers and you have lost " + losses + " answers</h2><br/>");
      $('#form').append(`<div><a id = "startAgain" class="btn btn-primary btn-lg" href="#" role="button">Start again </a></div><br/>`);

    }

  },

  run: function () {
    intervalId = setInterval(timeLaps.decrement, 1000 * 1);
    $('#timer').html("<h2> Resting time: 00:05 sec </h2>");

  },

  delay: function () {

    var delayInMilliseconds = 1000 * 2; //2 second

    setTimeout(function () {
      //your code to be executed after 1 second
    }, delayInMilliseconds);

  },

  decrement: function () {

    timeLaps.time--;
    var currentTime = timeLaps.timeConverter(timeLaps.time);
    $('#timer').html("<h2> Resting time: " + currentTime + " sec </h2>");

    if (timeLaps.time === 0) {
      timeLaps.reset();
    }
  },

  stop: function () {

    //  Use clearInterval to stop the count here.
    clearInterval(intervalId);

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

function explanation() {
  var explanat = '';
  explanat += `<div><p>` + questions[actualQuestion].explanation + `</p></div>`;
  $('#form').append(explanat);
  timeLaps.delay();
}


function displayOptions() {

  var options = questions[actualQuestion].choices;
  var formHtml = '';
  var formPic = `<div> <img src="` + questions[actualQuestion].image + ` " width='100%' height='100%'  borderradius='5px'></div>`;

  for (var i = 0; i < options.length; i++) {
    questions[actualQuestion].choices[i]
    formHtml += `<div><a id = "answers` + i + `" class="btn btn-primary btn-lg" href="#" role="button">` + questions[actualQuestion].choices[i] + `</a> </div><br/>`;
  }

  $('#pic').html(formPic);
  $('#form').html(formHtml);

  timeLaps.run();
  listenToClick();
};

function listenToClick() {

  $("#answers0").click(function (event) {
    //answeredQuestion = true;
    var selectedAnswer = $('#answers0').text();
    if (selectedAnswer === questions[actualQuestion].correctAnswer) {
      soundCorrect.play();
      wins++;
      explanation();
      timeLaps.delay();
      timeLaps.stop();
      alert('correct');
      timeLaps.reset();
      // generateWin();
    }
    else {
      losses++;
      soundWrong.play();
      timeLaps.stop();
      alert("wrong answer!");
      timeLaps.reset();
      // generateLoss();
    }
  });

  $("#answers1").click(function (event) {
    //answeredQuestion = true;

    var selectedAnswer = $('#answers1').text();
    if (selectedAnswer === questions[actualQuestion].correctAnswer) {
      soundCorrect.play();
      explanation();
      wins++;
      timeLaps.stop();
      alert('correct');
      timeLaps.reset();
      // generateWin();
    }
    else {
      losses++;
      soundWrong.play();
      timeLaps.stop();
      alert("wrong answer!");
      timeLaps.reset();
      // generateLoss();
    }
  });

  $("#answers2").click(function (event) {

    var selectedAnswer = $('#answers2').text();
    if (selectedAnswer === questions[actualQuestion].correctAnswer) {
      soundCorrect.play();
      explanation();
      wins++;
      timeLaps.stop();
      alert('correct');
      timeLaps.reset();
      // generateWin();
    }
    else {
      losses++;
      soundWrong.play();
      timeLaps.stop();
      alert("wrong answer!");
      timeLaps.reset();
      // generateLoss();
    }
  });

  $("#startAgain").click(function (event) {

    timeLaps.reset();
  });

}


$(document).ready(function () {


  $('#start').click(function () {
    $("#principal").empty();

    displayOptions();


  });
});