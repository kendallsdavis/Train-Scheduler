$(document).ready(function(){
  
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCTYHEKdPRbKh4LI123IlOPxIrHoJWaBzI",
        authDomain: "train-scheduler-2-709a6.firebaseapp.com",
        databaseURL: "https://train-scheduler-2-709a6.firebaseio.com",
        projectId: "train-scheduler-2-709a6",
        storageBucket: "",
        messagingSenderId: "608946958781"
      };
      firebase.initializeApp(config);

// Create variable for firebase database
  database = firebase.database();

// Set initial variable values
var train = "";
var destination = "";
var frequency = "";
var nextArrival = "";
var minAway = "";
var firstTime = "";
var elapsed = "";

// Create form reset function
function reset() {
    $("#train-name").val("");
    $("#destination").val("");
    $("#time").val("");
    $("#frequency").val("");
};

// Create onclick event for new train submission
$("#submit").click(function(){
    event.preventDefault(); 

        // Convewrt current time into total minutes
        var now = new Date();
        var currentHour = now.getHours();
        var currentMinutes = now.getMinutes();
        var currentTimeMin = (currentHour * 60) + currentMinutes;
        console.log(currentTimeMin);
      
        //Create JS variables equal to user inputs in the new train form 
        train = $("#train-name").val();            
        destination = $("#destination").val();            
        frequency =  $("#frequency").val();            
        firstTime = $("#time").val();

        // Convert the first train time iput by user into a moment object, and isolate the hours and minutes from the date
        firstTime = moment(firstTime);
        moment(firstTime).format("HH:mm");
        firstTime = firstTime._i;
        console.log(firstTime);
        //Split the HH:mm into two variables, and convert to total minutes to allow for calculation against current time 
        firstTimeSplit = firstTime.toString().split(":");
        console.log(firstTimeSplit);
        ftHour = parseInt(firstTimeSplit[0]);
        ftMin = parseInt(firstTimeSplit[1]);
        ftTotal = (ftHour * 60) + ftMin;
        console.log(ftTotal);

          

        // Calculate minutes away
        // If the first train is in the future, minutes away is future time minus current time
        // If the first train was in the past, minutes away is the time elapsed between the current time and the first train
        // with the modulus calculated with frequency
        if(currentTimeMin<ftTotal){
            minAway = ftTotal - currentTimeMin;
        } else {
            minAway = frequency - ((currentTimeMin-ftTotal)%frequency);
        }
        console.log(minAway);

        // Calculate the current time in minutes + minutes away to get the minute count at the next train arrival
        // Split the next arrival into hours and minutes
        nextArrivalTtl = currentTimeMin + minAway;
        nextArrivalHrs = nextArrivalTtl/60
        // To select only the numbers before the decimal of nextArrivalHrs
        nextArrivalHrs = nextArrivalHrs.toString().split(".")[0];
        nextArrivalMin = nextArrivalTtl%60;
        if(nextArrivalMin<10){
            nextArrivalMin = "0"+nextArrivalMin;
        }
        console.log(nextArrivalTtl);
        console.log(nextArrivalHrs);
        console.log(nextArrivalMin);

        // If the first arrival is in the future, set nextArrival equal to the first arrival input by user
        // Otherwise, set nextArrival using the Hrs and Min calculated above
        if(currentTimeMin<ftTotal){
            nextArrival = firstTime;
            } else {
        nextArrival = nextArrivalHrs + ":" + nextArrivalMin;
            };

        console.log(currentTimeMin);
        console.log(ftTotal);
        console.log(nextArrivalTtl);
        console.log(nextArrivalHrs);
        console.log(nextArrivalMin)

          // // Set variables in database equal to javascript variables
          database.ref().push({
            train: train,
            destination: destination, 
            frequency: frequency,
            nextArrival: nextArrival,
            minAway: minAway,
            firstTime: firstTime
        }); 


        // // Reset form values to blank
        reset();

    });

// Create an event listener for updates to the database
    database.ref().on("child_added", function (snapshot) {
    console.log(snapshot);

        // Create new table row and data elements for variables from the database
        var newTR = $("<tr>");
        var newTrain = $("<td>").text(snapshot.val().train);
        var newDestination = $("<td>").text(snapshot.val().destination); 
        var newFrequency = $("<td>").text(snapshot.val().frequency);
        var newArrival = $("<td>").text(snapshot.val().nextArrival);
        var newMinAway = $("<td>").text(snapshot.val().minAway);

        // append the new table data elements to the table of trains
        newTR.append(newTrain, newDestination, newFrequency, newArrival, newMinAway);
        $("#train-list").append(newTR);
    });

// Close document ready function
  });