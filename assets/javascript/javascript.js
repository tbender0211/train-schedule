$(document).ready(function(){

var config = {
    apiKey: "AIzaSyAJErk1SKo0hXp7OcpMR-3JuBYFYDk0HHM",
    authDomain: "train-project-d9d3c.firebaseapp.com",
    databaseURL: "https://train-project-d9d3c.firebaseio.com",
    projectId: "train-project-d9d3c",
    storageBucket: "train-project-d9d3c.appspot.com",
    messagingSenderId: "305152603428"
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
    
    trainName = $("#train-name").val().trim();
    destination = $("#destination").val().trim();
    firstTrain = $("#first-train").val().trim();
    frequency = $("#frequency").val().trim();
    nextTrain = "";

    database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
        nextTrain: nextTrain,
        minAway: minAway,
    })

});

database.ref().on("child_added", function(childSnapshot){

    console.log(childSnapshot.val());
    console.log(childSnapshot.val().trainName);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().firstTrain);
    console.log(childSnapshot.val().frequency);
    console.log(childSnapshot.val().nextTrain);
    console.log(childSnapshot.val().minAway);

    var firstTimeConverted = moment(childSnapshot.val().firstTrain, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    var currentTime = moment();
    
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

    var tRemainder = diffTime % childSnapshot.val().frequency;

    minAway = childSnapshot.val().frequency - tRemainder;

    nextTrain = moment(currentTime + minAway).format("LT");

    console.log(trainName);
    console.log(destination);
    console.log(firstTrain);
    console.log(frequency);


    $(".table").append("<tr><td>" + childSnapshot.val().trainName + "</td><td>" + childSnapshot.val().destination + "</td><td>" + childSnapshot.val().frequency + "</td><td>" + nextTrain + "</td><td>" + minAway + "</td></tr>");

}, function(errorObject) {

    console.log("Errors handled: " + errorObject.code);

}); 

});