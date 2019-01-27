
  $(document).ready(function(){
  
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyD88sBtJDZdUFQWVkILWsJbLRCddEi8mKg",
    authDomain: "train-scheduler-7eb62.firebaseapp.com",
    databaseURL: "https://train-scheduler-7eb62.firebaseio.com",
    projectId: "train-scheduler-7eb62",
    storageBucket: "",
    messagingSenderId: "513277253020"
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

// Create form reset function
function reset() {
    $("#train-name").val() = "";
    $("#destination").val() = "";
    $("#firstTime").val() = "";
    $("#frequency").val() = "";
}


// Create onclick event for new train submission

$("#submit").on("click" function(add){
    add.preventDefault();
    console.log('got here');  

        // Set js variables equal to user input and calculated time fields
        train = $("#train-name").val();
            console.log(train);
        destination = $("#destination").val();
            console.log(destination);
        frequency =  $("#frequency").val();
            console.log(frequency);
        firstTime = $("#firstTime").val(); 
            console.log(firstTime);    
            elapsed = firstTime.toNow();   
                console.log(elapsed);
        minAway = elapsed % frequency;
            console.log(minAway);
        nextArrival = moment() + minAway
            console.log(nextArrival);

        // Set variables in database


        // Reset form values to blank
        reset();


// Create an event listener for updates to the database


        // Update variables to hold values from the database



        // Calculate new table fields for "Next Arrival" and "Minutes Away"



        // Create new table data elements with the updated variable values



        // append the new table data elements to the table of trains



// Close document ready function
  }
