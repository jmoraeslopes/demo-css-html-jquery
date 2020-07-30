/* index.js */

$(document).ready(function() {
    "use strict"

var resultList = $("#resultsList");
resultList.text("This is from jQuery"); 

var toggleButton = $("#toggleButton");
toggleButton.on("click", function(){
    resultList.toggle(500);
    if (toggleButton.text() == "Hide") toggleButton.text("Show");
    else toggleButton.text("Hide");
});

$("#gitHubSearchForm").on("submit", function () {
    var gitHubApiUrl = "https://api.github.com/search/repositories?q=";
    var searchQuery = $("#searchQuery").val();
    var useStars = $("#useStars").val();
    var langChoice = $("#langChoice").val();

    if (searchQuery) {
        resultList.text("Performing search, please wait...");
        gitHubApiUrl += encodeURIComponent(searchQuery);

    if (langChoice != "All") {
        gitHubApiUrl += "language:" +encodeURIComponent(langChoice);
    }

    if (useStars) {
        gitHubApiUrl += "&sort=stars";
    }
    console.log(gitHubApiUrl);

$.get(gitHubApiUrl)
    .then(function successCallBack(r) {
        resultList.empty();
        displayResults(r.items);
    },
    function errorCallBack(r){
        console.log("Failed to query GitHub");
    });
    } 
    return false;
});

function displayResults(results) {
    resultList.empty
    $.each(results, function(i, item) {
        var newResult = $("<div class='result'>" +
        "<div class='title'>" + item.name + "</div>" +
        "<div> Language: " + item.language + "</div>" +
        "<div> Owner: " + item.owner.login + "</div>" +
        "</div>");
    
        newResult.hover(function () {
            //make it darker
            $(this).css("background-color", "lightgray");
        }, function (){
            //reverse
            $(this).css("background-color", "transparent");
        });
    
        resultList.append(newResult);
    });
    }

});