


$(document).ready(function() {

    // Create an array
    var topics = ["grumpy cat", "angry panda", "sleepy pug", "cuddly bunny", "hungry hamster",
    "playful meerkat", "dexterous raccoon", "mellow koala", "confused otter", "disdainful monkey"];

    // Set up buttons

    function renderGifButtons(){
    
        // empty out the button div
        $("#button-section").empty();
    
        // Create a for loop
        for (var i = 0; i < topics.length; i++) {
        
            // Create and add class and content to buttons
            var animalButton = $("<button>");
            animalButton.addClass("animal-button");
            animalButton.addClass("btn btn primary");
            animalButton.attr("data-name", topics[i]);
            animalButton.text(topics[i]);
            $("#button-section").append(animalButton);
        }
    }

    // Add new buttons
    function newButton(){
        $("#submit-button").on("click", function() {
            var animal = $("#animal-input").val().trim();
            if (animal == "") {
                return false;
            }
            topics.push(animal);

            renderGifButtons();
            return false;
        });
    }

    // Display GIFs
    function addGifs() {
        var animal = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=y13smfMncOWPPZsMgVK37Wk45HhmRJDk&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        })

        .then(function(response) {
            console.log(queryURL);
            console.log(response);
            
            var results = response.data;

            for (var i = 0; i < results.length; i++) {
        
                var animalGifs = $("<div>");
                var gifRating = $("<p>").text("Rating: " + results[i].rating);
                animalGifs.append(gifRating);

                var animalImage = $("<img>");
                animalImage.attr("src", results[i].images.fixed_height_still.url);
                animalImage.attr("data-still",results[i].images.fixed_height_still.url);
                animalImage.attr("data-animate",results[i].images.fixed_height.url);
                animalImage.attr("data-state", "still");
                animalImage.addClass("animal-image");
                animalGifs.append(animalImage);
   
                $("#gifSection").prepend(animalGifs);
            }
        });

    }

    renderGifButtons();
    newButton();

    $(document).on("click", ".animal-button", addGifs);
    $(document).on("click", ".animal-image", function() {
        var state = $(this).attr('data-state');
        if ( state == 'still'){
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        } else{
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    });
});




// $("button").on("click", function() {
//     // Grabbing and storing the data-animal property value from the button
//     var funAnimal = $(this).attr("data-animal");

//     // Constructing a queryURL using the animal name
//     var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=y13smfMncOWPPZsMgVK37Wk45HhmRJDk";

//     // Performing an AJAX request with the queryURL
//     $.ajax({
//       url: queryURL,
//       method: "GET"
//     })
//       // After data comes back from the request
//       .then(function(response) {
//         console.log(queryURL);

//         console.log(response);
//         // storing the data from the AJAX request in the results variable
//         var results = response.data;

//         // Looping through each result item
//         for (var i = 0; i < results.length; i++) {

//           // Creating and storing a div tag
//           var animalDiv = $("<div>");

//           // Creating a paragraph tag with the result item's rating
//           var p = $("<p>").text("Rating: " + results[i].rating);

//           // Creating and storing an image tag
//           var animalImage = $("<img>");
//           // Setting the src attribute of the image to a property pulled off the result item
//           animalImage.attr("src", results[i].images.fixed_height.url);

//           // Appending the paragraph and image tag to the animalDiv
//           animalDiv.append(p);
//           animalDiv.append(animalImage);

//           // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
//           $("#gifs-appear-here").prepend(animalDiv);
//         }
//       });
//   });



// $(".gif").on("click", function() {
//     // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
//     var state = $(this).attr("data-state");
//     // If the clicked image's state is still, update its src attribute to what its data-animate value is.
//     // Then, set the image's data-state to animate
//     // Else set src to the data-still value
//     if (state === "still") {
//       $(this).attr("src", $(this).attr("data-animate"));
//       $(this).attr("data-state", "animate");
//     } else {
//       $(this).attr("src", $(this).attr("data-still"));
//       $(this).attr("data-state", "still");
//     }
// });