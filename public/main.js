// const { copySync } = require("fs-extra");

// Select Element Fuction
$(function (){
    $('.hamburger-menu').on('click', function(){
        $('.toggle').toggleClass('open');
        $('.nav-list').toggleClass('open');

    });
});



// document.getElementById('.btn form-btn').on('click', getFreeKundali());

function getFreeKundali(){
 console.log(`button Pressed`);   
var name = document.querySelector('#Name').value;
var dateOfBirth = document.querySelector('#DOB').value;
var timeOfBirth = document.querySelector('#Time').value;
var cityName = document.querySelector('#City').value;
var countryName = document.querySelector('#Country').value;
if(name == "" && dateOfBirth == "" && timeOfBirth == "" && cityName =="" && countryName ==""){
    console.log("All Fields are compulsary");
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);

    alert('All Fields are compulsary');
}else{
    // Extracting details from text 
var year = dateOfBirth.substring(0,4);
var month = dateOfBirth.substring(5,7);
var date = dateOfBirth.substring(8,10);
var hours = timeOfBirth.substring(0,2);
var minutes = timeOfBirth.substring(3,5);

var userDetails = {
    'name' : name,
    'year': year,
    'month': month,
    'date': date,
    'hours': hours,
    'minutes': minutes, 
    'country': countryName,
    'city': cityName,   
}
sessionStorage.setItem('userDetails', JSON.stringify(userDetails));
console.log("Data stored");

}
}

function getDailyHoroscope(zodiacSign, imageName){
    document.getElementById("overlay-zodiac").style.display = "block";
    document.getElementById('spinner').style.display = "block";


    var url = `https://aztro.sameerkumar.website/?sign=${zodiacSign}&day=today`;

    fetch(url, {
        method: 'POST',
        headers: {
            "content-type": "application/json"
        },
    }).then((response) => {
        if(response.status == 200){
            var data = response.json();
            data.then((result) => {
                document.getElementById('spinner').style.display = "none";
                var objectData = result;
                console.log(objectData['description']);
                var image = document.getElementById('overlay-zodiac-img');
                image.src = imageName;
                document.getElementById('overlay-card-text').innerText = objectData['description'];
            });
        }
    });


  
}

function saveCardButton(){
    console.log("Save Card Button Pressed");
}

function hideOverlay(){
    document.getElementById("overlay-zodiac").style.display = "none";

}





