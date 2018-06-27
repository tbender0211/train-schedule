var config = {
    apiKey: "AIzaSyCJBjsI9xc4RhgFkM1febqED3LSmwTFyAY",
    authDomain: "train-schedule-5ca0b.firebaseapp.com",
    databaseURL: "https://train-schedule-5ca0b.firebaseio.com",
    projectId: "train-schedule-5ca0b",
    storageBucket: "train-schedule-5ca0b.appspot.com",
    messagingSenderId: "533130741236"
  };
  firebase.initializeApp(config);

var trainName = "";
var destination = "";
var firstTrain = "";
var frequency = "";
var nextTrain = "";
var minAway = "";
var database = firebase.database();

$("#submit").on("click", function(event){

    event.preventDefault();
    
    var trainName = $("#train-name").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrain = $("#first-train").val().trim();
    var frequency = $("#frequency").val().trim();
    var nextTrain = "";
    var minAway = "";

    console.log(trainName);
    console.log(destination);
    console.log(firstTrain);
    console.log(frequency);

    database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
        nextTrain: nextTrain,
        minAway: minAway,
    })

})

database.ref().on("child_added", function(childSnapshot){

    $("#train-schedule").append("<tr><td>" + childSnapshot.val().trainName + "</td><td>" + childSnapshot.val().destination + "</td><td>" + childSnapshot.val().firstTrain + "</td><td>" + childSnapshot.val().frequency + "</td><td>" + nextTrain + "</td><td>" + minAway + "</td></tr>");

})