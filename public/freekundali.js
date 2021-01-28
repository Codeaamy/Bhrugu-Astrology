var sunDetail;
var moonDetails;
var mercuryDetails;
var venusDetails;
var marsDetails;
var jupiterDetails;
var saturnDetails;
var rahuDetails;
var ketuDetails;
var AscendantDetails;
var globalPlanetoryInfo;

function getUsersDetails(){
    console.log('indide Kundali Page');
    hideAllElements();
    var retrivedUsersDetails = sessionStorage.getItem('userDetails');
    var userDetails = JSON.parse(retrivedUsersDetails);
    basicDetailsTableFromJson(userDetails);
    getKundaliFromServer(userDetails);
}

async function getKundaliFromServer(userDetails){
        var name = userDetails['name'];
        var year = userDetails['year'];
        var date = userDetails['date'];
        var hours = userDetails['hours'];
        var minutes = userDetails['minutes'];
        var cityName = userDetails['city'];
        var countryName =  userDetails['country'];
        var month = userDetails['month'];
        
        var api_url = `/kundali/${name},${year},${date},${hours}, ${minutes}, ${cityName}, ${countryName}, ${month}`;
    
        const response = await fetch(api_url);
        var serverdata = await response.json();
        var jsonString = JSON.stringify(serverdata);
        var data = JSON.parse(jsonString);
        console.log(data['planetaryInfo']);
        planetoryPositionTableFromJson(data);
}


function basicDetailsTableFromJson(userDetails){
    var name = userDetails['name'];
    var year = userDetails['year'];
    var date = userDetails['date'];
    var hours = userDetails['hours'];
    var minutes = userDetails['minutes'];
    var cityName = userDetails['city'];
    var countryName =  userDetails['country'];
    var month = userDetails['month'];


    document.getElementById('user-name').innerHTML = name;
    document.getElementById('user-dob').innerHTML = `${date}/${month}/${year}`;
    document.getElementById('user-time').innerHTML = `${hours}:${minutes}:${00}`;
    document.getElementById('user-city').innerHTML = cityName;
    document.getElementById('user-country').innerHTML = countryName;
}

function planetoryPositionTableFromJson(data){
    var planetoryInfo = data['planetaryInfo'];
    var count = Object.keys(planetoryInfo).length;
    console.log(planetoryInfo);

    AscendantDetails = planetoryInfo['Ascendant'];
    sunDetail = planetoryInfo['Sun'];
    moonDetails = planetoryInfo['Moon'];
    mercuryDetails = planetoryInfo['Mercury'];
    venusDetails = planetoryInfo['Venus'];
    marsDetails = planetoryInfo['Mars'];
    jupiterDetails = planetoryInfo['Jupiter'];
    saturnDetails = planetoryInfo['Saturn'];
    rahuDetails = planetoryInfo['Rahu'];
    ketuDetails = planetoryInfo['Ketu'];


    console.log(planetoryInfo);
    var table = document.getElementById('planet-position');
    var planets = ['Ascendant','Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter','Saturn','Rahu','Ketu'];


    for (var i = 0; i < count; i ++){
        var postions =  String(planetoryInfo[planets[i]].signPosition);
        var retro = planetoryInfo[planets[i]].isRetro;
        var nakshatra = String(planetoryInfo[planets[i]].nakshatraPada.nak + " - " +planetoryInfo[planets[i]].nakshatraPada.pada);
        console.log(retro);
        var t = "";
        if(retro == true){
             t = '(R)'   
        }
        var row = `<tr>
                        <td>${planetoryInfo[planets[i]].planet} ${t}</td>
                        <td>${planetoryInfo[planets[i]].sign}</td>  
                        <td>${postions.substring(0,4)}</td>  
                        <td>${nakshatra}</td>  

                   </tr>`
        table.innerHTML += row ;          
    }
    document.getElementById('user-moon').innerHTML = moonDetails.sign;
    document.getElementById('user-ascendant').innerHTML = AscendantDetails.sign;
    document.getElementById('user-nakshatra').innerHTML = `${moonDetails.nakshatraPada.nak} - ${moonDetails.nakshatraPada.pada}`;

    arrageZodiaSignOntoHtml(planetoryInfo);
    arrangeChandraKundali(planetoryInfo);
   
}

    function arrageZodiaSignOntoHtml(planetoryInfo){
        var signs = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra','Scorpio' ,'Sagittarius','Capricorn','Aquarius','Pisces' ];

        var house2Number;
        var house3Number;
        var house4Number;
        var house5Number;
        var house6Number;
        var house7Number;
        var house8Number;
        var house9Number;
        var house10Number;
        var house11Number;
        var house12Number;

        var house0Planets = [];
        var house1Planets = [];
        var house2Planets = [];
        var house3Planets = [];
        var house4Planets = [];
        var house5Planets = [];
        var house6Planets = [];
        var house7Planets = [];
        var house8Planets = [];
        var house9Planets = [];
        var house10Planets = [];
        var house11Planets = [];
        var house12Planets = [];


        AscendantDetails = planetoryInfo['Ascendant'];
        sunDetail = planetoryInfo['Sun'];
        moonDetails = planetoryInfo['Moon'];
        mercuryDetails = planetoryInfo['Mercury'];
        venusDetails = planetoryInfo['Venus'];
        marsDetails = planetoryInfo['Mars'];
        jupiterDetails = planetoryInfo['Jupiter'];
        saturnDetails = planetoryInfo['Saturn'];
        rahuDetails = planetoryInfo['Rahu'];
        ketuDetails = planetoryInfo['Ketu'];

  
        var ascendantSign = AscendantDetails.sign;
        var house1Number = signs.indexOf(ascendantSign) + 1;
        console.log(house1Number);

        var sunSign = sunDetail.sign;
        var sunSignNumber = signs.indexOf(sunSign) + 1;

        var moonSign = moonDetails.sign;
        var moonSignNumber = signs.indexOf(moonSign) + 1;

        var mercurySign = mercuryDetails.sign;
        var mercurySignNumber = signs.indexOf(mercurySign) + 1;

        var marsSign = marsDetails.sign;
        var marsSignNumber = signs.indexOf(marsSign) + 1;

        var venusSign = venusDetails.sign;
        var venusSignNumber = signs.indexOf(venusSign) + 1;

        var jupiterSign = jupiterDetails.sign;
        var jupiterSignNumber = signs.indexOf(jupiterSign) + 1;

        var saturnSign = saturnDetails.sign;
        var saturnSignNumber = signs.indexOf(saturnSign) + 1;

        var rahuSign = rahuDetails.sign;
        var rahuSignNumber = signs.indexOf(rahuSign) + 1;

        var ketuSign = ketuDetails.sign;
        var ketuSignNumber = signs.indexOf(ketuSign) + 1;
        

     

        if(house1Number == 12){
            house2Number = 1;
        }else{
            house2Number = house1Number + 1;
        }

        if(house2Number == 12){
            house3Number = 1;
        }else{
            house3Number = house2Number + 1;
        }

        if(house3Number == 12){
            house4Number = 1;
        }else{
            house4Number = house3Number + 1;
        }

        if(house4Number == 12){
            house5Number = 1;
        }else{
            house5Number = house4Number + 1;
        }

        if(house5Number == 12){
            house6Number = 1;

        }else{
            house6Number = house5Number + 1;
        }

        if(house6Number == 12){
            house7Number = 1;
        }else{
            house7Number = house6Number + 1;
        }


        if(house7Number == 12){
            house8Number = 1;
        }else{
            house8Number = house7Number + 1;
        }

        if(house8Number == 12){
            house9Number = 1;
        }else{
            house9Number = house8Number + 1;
        }

        if(house9Number == 12){
            house10Number = 1;
        }else{
            house10Number = house9Number + 1;
        }

        if(house10Number == 12){
            house11Number = 1;
        }else{
            house11Number = house10Number + 1;
        }

        if(house11Number == 12){
            house12Number = 1;
        }else{
            house12Number = house11Number + 1;
        }
        var currentZodia = [house1Number, house2Number,house3Number, house4Number ,house5Number, house6Number, house7Number ,house8Number ,house9Number ,house10Number, house11Number, house12Number]

        document.getElementById('house1-zodiac-sign').innerHTML = house1Number;
        document.getElementById('house2-zodiac-sign').innerHTML = house2Number;
        document.getElementById('house3-zodiac-sign').innerHTML = house3Number;
        document.getElementById('house4-zodiac-sign').innerHTML = house4Number;
        document.getElementById('house5-zodiac-sign').innerHTML = house5Number;
        document.getElementById('house6-zodiac-sign').innerHTML = house6Number;
        document.getElementById('house7-zodiac-sign').innerHTML = house7Number;
        document.getElementById('house8-zodiac-sign').innerHTML = house8Number;
        document.getElementById('house9-zodiac-sign').innerHTML = house9Number;
        document.getElementById('house10-zodiac-sign').innerHTML = house10Number;
        document.getElementById('house11-zodiac-sign').innerHTML = house11Number;
        document.getElementById('house12-zodiac-sign').innerHTML = house12Number;

        var allPlanets = [house0Planets,house1Planets,house2Planets, house3Planets,house4Planets,house5Planets,house6Planets,house7Planets,house8Planets,house9Planets,house10Planets,house11Planets,house12Planets]
        // arragePlanetsToHouses(planetoryInfo);
        var sunHouseNumber = currentZodia.indexOf(sunSignNumber) + 1;
        var moonhouseNumber = currentZodia.indexOf(moonSignNumber) +1;
        var mercuryHouseNumber = currentZodia.indexOf(mercurySignNumber) +1;
        var venusHouseNumber = currentZodia.indexOf(venusSignNumber) +1;
        var marsHouseNumber = currentZodia.indexOf(marsSignNumber) +1;
        var jupiterHouseNumber = currentZodia.indexOf(jupiterSignNumber) +1;
        var saturnHouseNumber = currentZodia.indexOf(saturnSignNumber) +1;
        var rahuHouseNumber = currentZodia.indexOf(rahuSignNumber) +1;
        var ketuHouseNumber = currentZodia.indexOf(ketuSignNumber ) +1;

        for(var i = 0; i < allPlanets.length; i++){
            if(sunHouseNumber == i){
                allPlanets[i].push('Su ');
            }
            if(moonhouseNumber == i){
                allPlanets[i].push('Mo ');
            }
            if(mercuryHouseNumber == (i)){
                allPlanets[i].push('Me ');
                // console.log(allPlanets[i]);
            }
            if(venusHouseNumber == i){
                allPlanets[i].push("Ve ");
                // console.log(allPlanets[i]);
            }

            if (marsHouseNumber == i){
                allPlanets[i].push('Ma ');
                // console.log(allPlanets[i]);
            }

            if(jupiterHouseNumber == i){
                allPlanets[i].push('Ju ');
                // console.log(allPlanets[i]);
            }

            if(saturnHouseNumber == i){
                allPlanets[i].push('Sa ');
                // console.log(allPlanets[i]);
            }
            if(rahuHouseNumber == i){
                allPlanets[i].push('Ra ');
                // console.log(allPlanets[i]);
            }

            if(ketuHouseNumber == i){
                allPlanets[i].push("Ke ");
                // console.log(allPlanets[i]);
            }
            var newArrayTrial = ['Su', 'Mo', 'Ma'];
            document.getElementById('house1-planet').innerHTML = house1Planets;
            document.getElementById('house2-planet').innerHTML = house2Planets;
            document.getElementById('house3-planet').innerHTML = house3Planets.join('<br>');
            document.getElementById('house4-planet').innerHTML = house4Planets;
            document.getElementById('house5-planet').innerHTML = house5Planets.join('<br>');
            document.getElementById('house6-planet').innerHTML = house6Planets;
            document.getElementById('house7-planet').innerHTML = house7Planets;
            document.getElementById('house8-planet').innerHTML = house8Planets;
            document.getElementById('house9-planet').innerHTML = house9Planets.join('<br>');
            document.getElementById('house10-planet').innerHTML = house10Planets;
            document.getElementById('house11-planet').innerHTML = house11Planets.join('<br>');
            document.getElementById('house12-planet').innerHTML = house12Planets; 
 
        }
        isMangalic(marsHouseNumber);
        // sadeSathi(moonhouseNumber, saturnHouseNumber);
        gemStoneRecommendation(moonSign, ascendantSign);
        getPrediction(house1Number);
        showAllElements();
    }

    function arrangeChandraKundali(planetoryInfo){
        var signs = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra','Scorpio' ,'Sagittarius','Capricorn','Aquarius','Pisces' ];
        
        var house1Number;
        var house2Number;
        var house3Number;
        var house4Number;
        var house5Number;
        var house6Number;
        var house7Number;
        var house8Number;
        var house9Number;
        var house10Number;
        var house11Number;
        var house12Number;

        var house0Planets = [];
        var house1Planets = [];
        var house2Planets = [];
        var house3Planets = [];
        var house4Planets = [];
        var house5Planets = [];
        var house6Planets = [];
        var house7Planets = [];
        var house8Planets = [];
        var house9Planets = [];
        var house10Planets = [];
        var house11Planets = [];
        var house12Planets = [];

        moonDetails = planetoryInfo['Moon'];
        // AscendantDetails = planetoryInfo['Ascendant'];
        sunDetail = planetoryInfo['Sun'];
        mercuryDetails = planetoryInfo['Mercury'];
        venusDetails = planetoryInfo['Venus'];
        marsDetails = planetoryInfo['Mars'];
        jupiterDetails = planetoryInfo['Jupiter'];
        saturnDetails = planetoryInfo['Saturn'];
        rahuDetails = planetoryInfo['Rahu'];
        ketuDetails = planetoryInfo['Ketu'];

  
        // var ascendantSign = AscendantDetails.sign;
        // var house1Number = signs.indexOf(ascendantSign) + 1;
        // console.log(house1Number);

        var moonSign = moonDetails.sign;
        var moonSignNumber = signs.indexOf(moonSign) + 1;
        house1Number = signs.indexOf(moonSign) + 1;

        var sunSign = sunDetail.sign;
        var sunSignNumber = signs.indexOf(sunSign) + 1;

        var mercurySign = mercuryDetails.sign;
        var mercurySignNumber = signs.indexOf(mercurySign) + 1;

        var marsSign = marsDetails.sign;
        var marsSignNumber = signs.indexOf(marsSign) + 1;

        var venusSign = venusDetails.sign;
        var venusSignNumber = signs.indexOf(venusSign) + 1;

        var jupiterSign = jupiterDetails.sign;
        var jupiterSignNumber = signs.indexOf(jupiterSign) + 1;

        var saturnSign = saturnDetails.sign;
        var saturnSignNumber = signs.indexOf(saturnSign) + 1;

        var rahuSign = rahuDetails.sign;
        var rahuSignNumber = signs.indexOf(rahuSign) + 1;

        var ketuSign = ketuDetails.sign;
        var ketuSignNumber = signs.indexOf(ketuSign) + 1;
        

     

        if(house1Number == 12){
            house2Number = 1;
        }else{
            house2Number = house1Number + 1;
        }

        if(house2Number == 12){
            house3Number = 1;
        }else{
            house3Number = house2Number + 1;
        }

        if(house3Number == 12){
            house4Number = 1;
        }else{
            house4Number = house3Number + 1;
        }

        if(house4Number == 12){
            house5Number = 1;
        }else{
            house5Number = house4Number + 1;
        }

        if(house5Number == 12){
            house6Number = 1;

        }else{
            house6Number = house5Number + 1;
        }

        if(house6Number == 12){
            house7Number = 1;
        }else{
            house7Number = house6Number + 1;
        }


        if(house7Number == 12){
            house8Number = 1;
        }else{
            house8Number = house7Number + 1;
        }

        if(house8Number == 12){
            house9Number = 1;
        }else{
            house9Number = house8Number + 1;
        }

        if(house9Number == 12){
            house10Number = 1;
        }else{
            house10Number = house9Number + 1;
        }

        if(house10Number == 12){
            house11Number = 1;
        }else{
            house11Number = house10Number + 1;
        }

        if(house11Number == 12){
            house12Number = 1;
        }else{
            house12Number = house11Number + 1;
        }
        var currentZodia = [house1Number, house2Number,house3Number, house4Number ,house5Number, house6Number, house7Number ,house8Number ,house9Number ,house10Number, house11Number, house12Number]

        document.getElementById('chandra-house1-zodiac-sign').innerHTML = house1Number;
        document.getElementById('chandra-house2-zodiac-sign').innerHTML = house2Number;
        document.getElementById('chandra-house3-zodiac-sign').innerHTML = house3Number;
        document.getElementById('chandra-house4-zodiac-sign').innerHTML = house4Number;
        document.getElementById('chandra-house5-zodiac-sign').innerHTML = house5Number;
        document.getElementById('chandra-house6-zodiac-sign').innerHTML = house6Number;
        document.getElementById('chandra-house7-zodiac-sign').innerHTML = house7Number;
        document.getElementById('chandra-house8-zodiac-sign').innerHTML = house8Number;
        document.getElementById('chandra-house9-zodiac-sign').innerHTML = house9Number;
        document.getElementById('chandra-house10-zodiac-sign').innerHTML = house10Number;
        document.getElementById('chandra-house11-zodiac-sign').innerHTML = house11Number;
        document.getElementById('chandra-house12-zodiac-sign').innerHTML = house12Number;

        var allPlanets = [house0Planets,house1Planets,house2Planets, house3Planets,house4Planets,house5Planets,house6Planets,house7Planets,house8Planets,house9Planets,house10Planets,house11Planets,house12Planets]
        // arragePlanetsToHouses(planetoryInfo);
        var sunHouseNumber = currentZodia.indexOf(sunSignNumber) + 1;
        var moonhouseNumber = currentZodia.indexOf(moonSignNumber) +1;
        var mercuryHouseNumber = currentZodia.indexOf(mercurySignNumber) +1;
        var venusHouseNumber = currentZodia.indexOf(venusSignNumber) +1;
        var marsHouseNumber = currentZodia.indexOf(marsSignNumber) +1;
        var jupiterHouseNumber = currentZodia.indexOf(jupiterSignNumber) +1;
        var saturnHouseNumber = currentZodia.indexOf(saturnSignNumber) +1;
        var rahuHouseNumber = currentZodia.indexOf(rahuSignNumber) +1;
        var ketuHouseNumber = currentZodia.indexOf(ketuSignNumber ) +1;

        for(var i = 0; i < allPlanets.length; i++){
            if(sunHouseNumber == i){
                allPlanets[i].push('Su ');
            }
            if(moonhouseNumber == i){
                allPlanets[i].push('Mo ');
            }
            if(mercuryHouseNumber == (i)){
                allPlanets[i].push('Me ');
                // console.log(allPlanets[i]);
            }
            if(venusHouseNumber == i){
                allPlanets[i].push("Ve ");
                // console.log(allPlanets[i]);
            }

            if (marsHouseNumber == i){
                allPlanets[i].push('Ma ');
                // console.log(allPlanets[i]);
            }

            if(jupiterHouseNumber == i){
                allPlanets[i].push('Ju ');
                // console.log(allPlanets[i]);
            }

            if(saturnHouseNumber == i){
                allPlanets[i].push('Sa ');
                // console.log(allPlanets[i]);
            }
            if(rahuHouseNumber == i){
                allPlanets[i].push('Ra ');
                // console.log(allPlanets[i]);
            }

            if(ketuHouseNumber == i){
                allPlanets[i].push("Ke ");
                // console.log(allPlanets[i]);
            }
            var newArrayTrial = ['Su', 'Mo', 'Ma'];
            document.getElementById('chandra-house1-planet').innerHTML = house1Planets;
            document.getElementById('chandra-house2-planet').innerHTML = house2Planets;
            document.getElementById('chandra-house3-planet').innerHTML = house3Planets.join('<br>');
            document.getElementById('chandra-house4-planet').innerHTML = house4Planets;
            document.getElementById('chandra-house5-planet').innerHTML = house5Planets.join('<br>');
            document.getElementById('chandra-house6-planet').innerHTML = house6Planets;
            document.getElementById('chandra-house7-planet').innerHTML = house7Planets;
            document.getElementById('chandra-house8-planet').innerHTML = house8Planets;
            document.getElementById('chandra-house9-planet').innerHTML = house9Planets.join('<br>');
            document.getElementById('chandra-house10-planet').innerHTML = house10Planets;
            document.getElementById('chandra-house11-planet').innerHTML = house11Planets.join('<br>');
            document.getElementById('chandra-house12-planet').innerHTML = house12Planets;    
        }
        spinnerLoader();
    }
    
    function isMangalic(marsHouseNumber){
            var mangalicNumber = [1,4,7,8,12];
            if(mangalicNumber.includes(marsHouseNumber)){
                document.getElementById('isManglic').innerHTML = "Your Horoscope is <strong> <u>Manglic</u> </strong>";
            }else{
                document.getElementById('isManglic').innerHTML = "Your Horoscope is <strong><u> Not Manglic </u></strong>";

            }
    }


    function gemStoneRecommendation(moonSign, ascendantSign){
            var signs = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra','Scorpio' ,'Sagittarius','Capricorn','Aquarius','Pisces' ];
            console.log('Gemstone function');
            console.log(moonSign);
            console.log(ascendantSign)
            var gemStone1;
            var gemStone2;
            var gemStoneImage1;
            var gemStoneImage2;
            var luckyDay1;
            var luckyDay2;
            var luckyColour1;
            var luckyColour2;

            if(moonSign == 'Aries' || moonSign == "Scorpio"){
                gemStone1 = "Opal";
                gemStoneImage1 = "Coral_trans.png";
                luckyDay1 = "Tuesday";
                luckyColour1 = "Blood Red";

            }else if(moonSign == "Taurus" || moonSign == "Libra"){
                gemStone1 = "Diamond";
                gemStoneImage1 = "Diamond_trans.png";
                luckyDay1 = "Firday";
                luckyColour1 = "White (Transparent)";

            }else if(moonSign == "Gemini" || moonSign == "Virgo"){
                gemStone1 = "Green Emerald";
                gemStoneImage1 = "Emarald_trans.png";
                luckyDay1 = "Wednesday";
                luckyColour1 = "Green";


            }else if(moonSign == "Cancer"){
                gemStone1 = "Pearl";
                gemStoneImage1 = "Pearl_trans.png";
                luckyDay1 = "Monday";
                luckyColour1 = "Milky White";

            }else if(moonSign == "Leo"){
                gemStone1 = "Ruby";
                gemStoneImage1 = "Ruby_trans.png";
                luckyDay1 = "Sunday";
                luckyColour1 = "Copper Red";

            }else if(moonSign == "Capricorn" || moonSign == 'Aquarius'){
                gemStone1 = "Blue Sapphire";
                gemStoneImage1 = "blue_sapphire_trans.png";
                luckyDay1 = "Saturday";
                luckyColour1 = "Blue";
                


            }else if(moonSign == 'Sagittarius' || moonSign == 'Pisces'){
                gemStone1 = 'Yellow Sapphire';
                gemStoneImage1 = 'Yellow_Sapphire_trans.png';
                luckyDay1 = "Thrusday";
                luckyColour1 = 'Yellow';

            }else{
                gemStone1 = "No Data Found";
                gemStoneImage1 = 'Yellow_Sapphire_trans.png';
                luckyDay1 = "No Data Found";
                luckyColour1 = 'No Data Found';

            }
// ASCENDANT READING
            if(ascendantSign == 'Aries' || ascendantSign == "Scorpio"){
                gemStone2 = "Opal";
                gemStoneImage2 = "Coral_trans.png";
                luckyDay2 = "Tuesday";
                luckyColour2 = "Blood Red";

            }else if(ascendantSign == "Taurus" || ascendantSign == "Libra"){
                gemStone2 = "Diamond";
                gemStoneImage2 = "Diamond_trans.png";
                luckyDay2 = "Firday";
                luckyColour2 = "White (trasnparent)";



            }else if(ascendantSign == "Gemini" || ascendantSign == "Virgo"){
                gemStone2 = "Green Emerald";
                gemStoneImage2 = 'Emarald_trans.png';
                luckyDay2 = "Wednesday";
                luckyColour2 = "Green";


            }else if(ascendantSign == "Cancer"){
                gemStone2 = "Pearl";
                gemStoneImage2 = 'Pearl_trans.png';
                luckyDay2 = "Monday";
                luckyColour2 = "Milky White";



            }else if(ascendantSign == "Leo"){
                gemStone2 = "Ruby";
                gemStoneImage2 = 'Ruby_trans.png';
                luckyDay2 = "Sunday";
                luckyColour2 = "Copper Red";



            }else if(ascendantSign == "Capricorn" || ascendantSign == 'Aquarius'){
                gemStone2 = "Blue Sapphire";
                gemStoneImage2 = 'blue_sapphire_trans.png';
                luckyDay2 = "Saturday";
                luckyColour2 = "Blue";


            }else if(ascendantSign == 'Sagittarius' || ascendantSign == 'Pisces'){
                gemStone2 = 'Yellow Sapphire';
                gemStoneImage2 = 'Yellow_Sapphire_trans.png';
                luckyDay2 = "Thrusday";
                luckyColour2 = "Yellow";



            }else{
                gemStone2 = "No Data Found";
                gemStoneImage2 = 'No';
                luckyColour2 = "No Data Found";
                luckyDay2 = "No Data found";


            }

            document.getElementById('gemstone1-name').innerHTML = gemStone1;
            document.getElementById('gemstone2-name').innerHTML = gemStone2;
            document.getElementById('luck-day1').innerHTML = luckyDay1;
            document.getElementById('luck-day2').innerHTML = luckyDay2;
            document.getElementById('lucky-colour1').innerHTML = luckyColour1;
            document.getElementById('lucky-colour2').innerHTML = luckyColour2;  
            
            // GEMSTONE IMAGE 1
            var img1 = document.createElement('img');
            img1.style.width = 'auto';
            img1.style.height = '100px';    
            img1.src = `images/${gemStoneImage1}`;
            var src1 = document.getElementById('gemstone1-image');
            src1.appendChild(img1);


            // GEMSTONE IMAGE 2
            var img2 = document.createElement('img');
            img2.style.width = 'auto';
            img2.style.height = '100px';   
            img2.src = `images/${gemStoneImage2}`;
            var src2 = document.getElementById('gemstone2-image');
            src2.appendChild(img2);

            

    }

function getPrediction(house1Number){
        var signs = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra','Scorpio' ,'Sagittarius','Capricorn','Aquarius','Pisces' ];
        var signNumber = house1Number - 1;
        var ascSign = signs[signNumber];
        console.log(`AscSign.......${ascSign}`);

          var prediction = [
            //   Aries
              {    
                  "general": "The first sign of the Zodiac, Aries are the trailblazers. Passionate and independent, Aries will never do something just because everyone else is doing it—a Ram needs to be 100 percent committed to the task at hand. Competitive to the max, the best way to motivate an Aries is to turn something into a contest. Aries will put everything they have (and then some) into winning. Loyal, smart, and impulsive, they always have multiple projects on their mind, and won't be satisfied until their work, social life, and personal lives line up exactly with the dream life they've envisioned. Those who are drawn to magnetic Aries may have trouble keeping up—but if they can, they'll have a friend for life.",
                  "body":"You have the physical qualities of a noble Ram and you stand proudly. You will likely have a strong and rugged appearance with a prominent brow, nose, chin and mouth. You have strong bone structure and are usually of average height. You stand up straight unless you’ve become deeply saddened. It’s rare that you feel defeat but when you do, you hang your head. Aries rules the head which is why you love to have your head massaged or your hair played with. Aries are often born with a distinguishable mole somewhere on the face.",
                  "nature":"The native is Independent with optimistic view and enthusiastic in every nature. The native is promt for action. The native is courageous is hardly gets afraid.",
                  "weakness": "The native is moody and shifts from one to mood other rapidly. Is short tempered and has an impulsive behaviour. The native is impatient.",
                  "famous-personalities": "Big Sean, Marlon Brando, Charlie Chaplin, Joan Crawford, Leonardo da Vinci, Robert Downey Jr., James Franco, Robert Frost, Lady Gaga, Harry Houdini, Thomas Jefferson, Keira Knightley, Vincent van Gogh, Emma Watson, Reese Witherspoon",
              },
            //   Taurus
              {
                "general": "Smart, ambitious, and trustworthy, Taurus is the anchor of the Zodiac. Amazing friends, colleagues, and partners, Taureans value honesty above all else and are proud that their personal relationships tend to be drama free. Bulls get the reputation of being stubborn, but they're not always stuck in their ways. This searching sign is willing to see another point of view, but they won't flip-flop on an opinion just to make someone else happy. They will shift their thinking only if they truly have a change of heart.", 
                "body":"Characteristics of the bull include a well-rounded face with sensual lips. Your hair is thick and healthy and your neck will stand out in some way. Many Taurus will have a rounded nose that turns up at the end. It could be long and elegant or thick giving you incredible upper body strength. A Taurus sign loves to dress fashionably and they know how to put together an outfit. You love top designer clothes and stick out in a crowd with your impeccable style. You are also the most apt of the signs to be physically active so you probably have a muscular, attractive body.",
                "nature":" Taurus is an earth sign represented by the bull. Like their celestial spirit animal, Taureans enjoy relaxing in serene, bucolic environments, surrounded by soft sounds, soothing aromas, and succulent flavors. Taurus is ruled by Venus, the enchanting planet that governs love, beauty, and money.",
                "weakness": "Taureans are Laziness and needs a push to get he work done.Are possessive in nature and hate if some one touches their belongings they cannot tolerate. Materialistic nature can create some problems. Are self indulging.",
                "famous-personalities":"Adele, Dwayne The Rock Johnson, Audrey Hepburn, Chris Brown, Cam Newton",
            },
            // Gemini
            {
                "general":"Smart, passionate, and dynamic, Gemini is characterized by the Twins, Castor and Pollux, and is known for having two different sides they can display to the world. Expert communicators, Gemini is the chameleon of the Zodiac, adept at blending into different groups based on the vibe and energy they perceive. While they're also amazing at showcasing surface traits, the Gemini well runs deep, which is why the Twins are one of the Zodiac's most emotionally intelligent signs.",
                "body":"The Gemini is often tall and strong with shiny eyes and an expressive face. Even when at rest, the Gemini has a sense of energy within. Your complexion is often light and you have a high forehead with a straight nose. Being the sign of the twins, you change up your outfits often because you’re ruled not by just one personality, but two.",
                "nature":"Intelligence. Gemini is quick-witted and can read a room or situation in an almost supernatural way. Without saying very many words, a Gemini soon knows who has an agenda, who's a good ally, and who may need someone to bolster them up. Because of this, Gemini is an amazing friend, leader, and person everyone should be lucky to have in their lives.",
                "weakness": "They can be superficial at times which can hurt some people. Restless and devious with indecisiveness sometimes,",
                "famous-personalities":"Kendrick Lamar, Azealia Banks, Iggy Azalea, Angelina Jolie, Natalie Portman",
            },
            // Cancer 
            {
                "general":"Emotional, intuitive, and practically psychic; ruled by the moon and characterized by the crab, Cancer has so much going on in its watery depths. Cancers may seem prickly and standoffish at first meeting, once they make the decision to become friends with someone, that person has a friend for life",
                "body":"The crab doesn’t like to have too much attention on them so it’s fitting that the facial features of Cancer are often small but attractive. The jawbone will be prominent in an attractive way and your eyes are often a light color of blue or grey accentuated by eyebrows that arch down. Those born under Cancer often have thin legs and arms but have powerful hands. Cancer women tend to have a larger or somehow more prominent bust. You may have to wear glasses as many Cancer signs are nearsighted.",
                "nature":"With off-the-charts emotional intelligence, Cancer quickly cuts through the BS and noise to the heart of an issue. Crabs don't need all the facts and figures to know the right course of action, and their ability to trust intuition without judgment can aid them well. This gift is one that other Zodiac signs can learn from and be inspired by",
                "weakness": "While Cancer easily and accurately reads situations when they're presented, he or she may not share those opinions with others. Speaking up is key, because turning inward with emotions means that those emotions may erupt unexpectedly. Crabs also expect others to know what they're thinking, which is another source of pent-up frustration. Learning to voice opinions, even if it leads to conflict, is a lifelong lesson for Cancer.",
                "famous-personalities":"Selena Gomez, Ariana Grande, King Bach, Lionel Messi, Luke Bryan, Kevin Hart",
            },
            // Leo 
            {
                "general":"Bold, intelligent, warm, and courageous, fire sign Leo is a natural leader of the Zodiac, ready to blaze a trail, vanquish injustice, and make a name for themselves along the way. Blessed with high self-esteem, Lions know that they possess enviable traits—and they're proud of them. They don't believe in false modesty and will be the first to praise themselves for a job well done. But Leo isn't self-aggrandizing or unwilling to roll up those sleeves and do the work: this sign knows that in order to be respected and admired, he or she needs to put in the effort worthy of a leader.",
                "body":"Those born under the Leo sign have catlike features and are almost always very good looking. In some way or another, they will have fabulous hair that is as big as a lion’s mane. The Leo is often tall and even if you’re not, you’ll hold yourself in a majestic way that brings a large presence to you. The Leo is the most confident of all the signs and so while it’s not a physical trait, you would have a hard time ignoring their aura as a part of the whole attractive package.",
                "nature":" Intense and energetic, Leos thrive on social interactions and have no problem making friends—although pinning them down to spend time with you is another story. Leos put themselves first, and will turn down a plan that doesn't fit with their agenda or idea of fun. This trait has gained them an unfair reputation for arrogance. But on the flip side, when a Lion chooses to spend time with you, it's genuinely because he or she wants to",
                "weakness": "Leos are domineering and they might unknowingly dominate the near and dear ones, which might push the close onse away from them. Can become melodramatic and exaggerate things to an extreme limit. Leo are stubborn that what leos are known for stubborn and will power, but it can also become as a problem, some times you have to let things go and move on.",
                "famous-personalities":"Barack Obama, Leonardo DiCaprio, Mila Kunis, Daniel Radcliffe, J.K. Rowling, Chris Hemsworth, Jennifer Lawrence, Madonna",
            },
            // Virgo 
            {
                "general":"Smart, sophisticated, and kind, Virgo gets the job done without complaining. Virgos are amazing friends, always there to lend a hand and also lend advice. Practical Virgos are incredibly adept at big picture thinking, and planning out their life, their vacations, and what they're going to do today isn't a drag it makes them feel in control and secure",
                "body":"The Virgo is a health fanatic and you nurture yourself which shows in your remarkable physiques. The Virgo sign symbolizes health so you tend to look healthy and strong. You have a slim, oval face that is attractive and gentle and most Virgos develop later than others. Let’s be honest Virgo, you spend a great deal of time in the mirror but we all appreciate how put together you look.",
                "nature":"Virgos are Observant in nature and follow rules and regulations put upon them.Their anatlytical approach helps them in analyise the situation and take difficult and tough decision, they can weight their option and choose wisely. Virgos are reliable and precise to the point.",
                "weakness": "Virgo's desire to have everything be perfect can manifest in frustration when things don't live up to those (sometimes unrealistic) expectations. Besides occasionally leading to fights with friends and partners, Virgo's focus on perfection can cause everything even uploading an Instagram photo to take forever. Learning to go with the flow and accept is a constant struggle.",
                "famous-personalities":"Blake Lively, Cameron Diaz, Beyonce, Salma Hayek, Chris Pine, Jennifer Judson, Prince Harry, Nas, Jason Derulo, Mase, Zendaya",
            },
            // Libra
             {
                "general":"Intelligent, kind, and always willing to put others before themselves, Libras value harmony in all forms. Ruled by Venus, the planet of beauty, Libra adores a life that looks good. As the master of compromise and diplomacy, Libra is adept at seeing all points of view, and excels at crafting compromises and effecting mediation between others. This sign has a rich inner life yet loves other people, and they're always happiest with a large group of friends, family, and coworkers on whom they can count.",
                "body":"For those under the Libra sign, you likely have a great physique and are taller than average. An interesting feature for a Libra is that some of you may have a cupid’s bow in your upper lip or heart shaped lips. You tend to wear jewelery to compliment your wardrobe. Libra tends to be weak when it comes to vices and this can show up in your appearance. If you stay away from chocolate and the like, you’ll keep the excellent physique you have from your youth.",
                "nature":" When Libra falls in love, he or she falls hard, but this sign also recognizes that there's room for more than one grand love in his or her life. The Scales are pragmatic about love, realizing that different relationships often have different seasons. Librans can sometimes be accused of being too pragmatic, and they've been known to call off a relationship pre-emptively if they feel it may not work due to distance, age difference, or another external conflict",
                "weakness": "Libra is great at making everyone happy—but what good is that if Libras themselves don't feel fulfilled? While the Scales have a fine-tuned internal compass, they sometimes ignore what they want in favor of what makes everyone else happy—and this habit ends up backfiring in the long run.",
                "famous-personalities":"Matt Damon, Marion Cotillard, Hugh Jackman, Gwyneth Paltrow, Kim Kardashian, Bruno Mars, Lil Wayne, Bella Thorne, Nick Cannon, Halsey, Will Smith, Candice Swanepoel, Kate Winslet",
            },
            // Scorpio
            {
                "general": "When Libra falls in love, he or she falls hard, but this sign also recognizes that there's room for more than one grand love in his or her life. The Scales are pragmatic about love, realizing that different relationships often have different seasons. Librans can sometimes be accused of being too pragmatic, and they've been known to call off a relationship pre-emptively if they feel it may not work due to distance, age difference, or another external conflict",
                "body":"Facial features of those born under the Scorpio are often strong with an angular shape to them. Your hair is usually dark with a tinge of red that reveals itself when you’re in the sun. Your body is often lean and slender and eyes that penetrate those who look into them. A Scorpio will always have a noticeable nose and nicely arched eyebrows. Your bodies are warm and they can handle a lot of stress without getting ill.",
                "nature":"Scorpios are very Loyal in nature and rarely leave hand in dry. Passionate in the things they do. These people are observant and keep in mind the things happen arround them and are dynamic in nature, ",
                "weakness": "Repeat after us: It's all right to cry. Scorpio tries to hard to seem tough that they sometimes cut off their vulnerable side entirely, seeming prickly, uncaring, and cold to outsiders. While expressing emotion is scary, learning how to do it is key for Scorpio, since presenting an 'I don't care' veneer can only work for so long before it get's exhausting!",
                "famous-personalities":"Ciara, Julia Roberts, Gabrielle Union, Matthew McConaughey, Drake, Ryan Reynolds, Katy Perry, Kris Jenner, Anne Hathaway, Ryan Gosling, Owen Wilson",
            },
            // Sagitarrius
            {
                "general":"Independent and strong-willed, Sagittarius personalities are all about going off the beaten path. Sagittarius isn’t afraid to step away from the pack, and is a natural born leader who goes after what he or she wants, regardless of what other people think. Sagittarius is a born adventurer, and loves solo travel and exploration. Sagittarius also loves exploring the inner workings of their minds, and love stretching their horizons through a good book or movie.",
                "body":"As Sagittarius holds the warrior symbol, those born under this sign often have the physiques of a warrior. You are agile and have a taller frame than most. You have eyes of merriment that are shiny and expressively happy. The femur or thigh bone of the Sagittarius is uniquely long (perhaps for shooting a bow and arrow)?",
                "nature":"Sagittarius is a steadfast friend and a creative thinker; a great person to have on a work team, as they have infectious energy and enthusiasm. They aren’t looking for constant feedback, and can take a project and run with it. A Sag can also be an adept entrepreneur or CEO. A Sagittarius is smart, capable, and a true trailblazer.",
                "weakness": "Sagittarius can sometimes be far too blunt, and put their own needs above others. You don’t need to veer from your values, but sometimes, a white lie saves all. It can also be helpful to be part of the pack now and then. Sagittarius is so good at doing things independently, but sometimes it can be faster, smarter, and more fun to do things as part of a group.",
                "famous-personalities":"Shree Bhagwat, Nicki Minaj, Taylor Swift, Miley Cyrus, Brad Pitt, Rita Ora, Chrissy Teigen, Jay-Z, Vanessa Hudgens",
            },
            // capricorn
            {
                "general":"Smart, hardworking, and fully in control of their destiny, a Capricorn will always get what they set their mind to, in both personal and professional life—no excuses. Capricorns may get a reputation as stubborn, but they simply know what they want, and also know how they wish other people would behave.",
                "body":"Those born under the Capricorn sign dress well with their own unique style. You tend to tan well and often have olive toned skin. You have a curvy body and strong facial features such as a strong jaw line or high cheek bones. Often, the Capricorn will look concerned due to long periods of melancholy that afflict this sign.",
                "nature":"Capricorn is intelligent, detail-oriented, and will not take no for an answer when they want something. Their hard working attitude is an inspiration to all, and they truly believe they can achieve anything with hard work. Capricorn is always ready to learn new skills, and sees something they don’t know—like changing a tire or boiling the perfect egg—as a challenge they must undertake. This attitude makes them a master of all trades, and they have esoteric knowledge that is impressive to all who know them.",
                "weakness": "Capricorns can be incredibly hard on themselves, and just as hard on other people. They can hold grudges and hold other people in their lives to impossible standards. Capricorns sometimes see one narrow way of doing something, and broadening their horizons and perspective can be incredibly helpful in giving them and others a break.",
                "famous-personalities":"John Legend, Bradley Cooper, Kate Middleton, Liam Hemsworth, Michelle Obama, Ellen Degeneres",
            },
            // Aquarius
            {
                "general":"Independent and enigmatical, Aquarians are unique. There is no one quite like an Aquarius, and because each is so incredibly individual, it can be tough to describe them as a group. Aquarians don't like labels, and may shy away from any adjective—even the good ones you might bestow upon them. Aquarians believe in the nature of change and evolution, and even though they're a fixed sign, they may not necessarily believe they are the same people they were when they were born.",
                "body":"It is the most difficult to pick out Aquarian physical traits as they have a lot of androgyny in their looks within the sign. An Aquarian will often have a slender, boy like body with a candid face. Most Aquarians have a natural head drop but always carry a genial look in their eyes. Their profile is noble and often have some small features such as the ears as well as thin lips.",
                "nature":"Aquarius is intellectual and analytical, but don't mistake these attributes for aloofness. Aquarians have deep passion, but they know jumping into something too quickly can cause more harm than good. Aquarians are often big-picture thinkers who can see connections in a way that eludes others. Aquarians have energy, warmth, and a deep desire to get things done. They feel they're on the planet to change the world and they will do so. Aquarians are idealistic, and will never accept 'good enough' until they truly believe it's good enough.",
                "weakness": "Aquarians can sometimes seem as if they don't care about their individual relationships, or they are holding something else at a higher value. For example, an Aquarian may cancel a date at the last minute because a friend or family member is stuck and needs a ride. It's not personal, and it's not a bad thing. An Aquarian has a value system that's constantly prioritizing the people who need them the most, and sometimes, that puts the people they love in a lurch. Clear communication is necessary to avoid these issues",
                "famous-personalities":"Ed Sheeran, Harry Styles, The Weeknd, Shakira, Oprah Winfrey, Jennifer Aniston, Chloe Moretz, Taylor Lautner",
            },
            // Pisces
            {
                "general":"Smart, creative, and deeply intuitive, Pisces can be close to psychic. Pisces feel things deeply, and have incredibly strong gut reactions. A Pisces 'knows' things from deep within, and can often judge whether a person or situation is good or bad. That doesn't mean a Pisces ignores the logical part of their brain, though. Deeply intelligent, Pisces have a profound respect for the power of the human mind. Is it a surprise that Albert Einstein was a Pisces?",
                "body":"Those born under the Pisces symbol have dimples on their face and light blue eyes. Some Pisces walk much like a fish would walking on their fins. They take short steps and shift their body weight from one foot to the next. Pisces often have bigger breasts and a very womanly physique with stocky legs and thighs. The eyes let you in on how they’re feeling and they will cry often but it’s a sweet kind of crying as they show their sincerity and depth. TC mark",
                "nature":"A Pisces has a great gut and great intuition, which can guide them well, and help them make creative or intellectual leaps other people might not be able to see or consider. Deeply imaginative, Pisces can happily spend hours daydreaming, and are often just as surprised as the rest of the world when the pieces come together in an amazing way. Pisces don't necessarily work the same way as other people do, and they may be able to get things done incredibly quickly. But it's not that they're that much faster than other zodiac signs. It's that the time they may have been caught staring into space are times that are deeply valuable to them, and necessary for any creative process. The more a Pisces understands how they work and respects that process, the better they are.",
                "weakness": "Pisces can sometimes spend too much time in their heads, getting overly wrapped up in a problem and assuming there's no solution. Pisces are always one of the first signs to lend an ear to others, but when it comes to asking for help—especially emotional help—Pisces can sometimes wall themselves off, assuming that nobody knows what they are feeling and not even giving anyone a chance to try. Learning how to open up can be a huge lesson for Pisces. Of course, the fact remains that no one can read a Pisces mind. Pisces sometimes feels frustrated that they are seen as 'more complicated' than their peers, and that feeling can make them act or seem defensive. Pisces needs to learn to let down their guard, allow people to love them, and allow for mistakes to be made.",
                "famous-personalities":"Albert Einsteint, Rihanna, Steve Jobs, George Washington"
            }
        
          ];

          var img1 = document.createElement('img');
          img1.style.width = 'auto';
          img1.style.height = '100px';    
          img1.src = `images/${ascSign}.png`;
          var src1 = document.getElementById('zodiac-img');
          src1.appendChild(img1);

          document.getElementById('zodiac-sign').innerHTML = ascSign;
          document.getElementById('ascendent-zodiac-sign').innerHTML = ascSign;

          document.getElementById('general').innerHTML = prediction[signNumber]['general'];
          document.getElementById('apperance').innerHTML = prediction[signNumber]['body'];
          document.getElementById("nature").innerHTML = prediction[signNumber]['nature'];
          document.getElementById("weakness").innerHTML = prediction[signNumber]['weakness'];
          document.getElementById("famous-personalities").innerHTML = prediction[signNumber]['famous-personalities'];
        spinnerLoader();
        showAllElements();
 }

function spinnerLoader(){
        let spinnerWrapper = document.querySelector('.spinner-wrapper');
            spinnerWrapper.parentElement.removeChild(spinnerWrapper);
        
}

function hideAllElements(){
        document.getElementById('detail-table').style.display = 'none';
        document.getElementById('kundali').style.display = 'none';
        document.getElementById('prediction').style.display = 'none';
        document.getElementById('general-recommendation').style.display = 'none';
        document.getElementById('manglic-prediction').style.display = 'none';
}

function showAllElements(){
        document.getElementById('detail-table').style.display = 'block';
        document.getElementById('kundali').style.display = 'block';
        document.getElementById('prediction').style.display = 'block';
        document.getElementById('general-recommendation').style.display = 'block';
        document.getElementById('manglic-prediction').style.display = 'block';
}



    



 

              

