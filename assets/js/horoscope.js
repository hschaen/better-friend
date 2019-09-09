//Horoscope
function horoscopeFun() {
    switch(birthdayLog.substring(0,2)) {
        case "01":
            if(parseInt($("#birthdayText").text().substring(3,5)) <= 19) {
                sunSign = "Capricorn";
            } else {
                sunSign = "Aquarius";
            }
            break;
        case "02":
            if(parseInt($("#birthdayText").text().substring(3,5)) <= 18) {
                sunSign = "Aquarius";
            } else {
                sunSign = "Pisces";
            }
            break;
        case "03":
            if(parseInt($("#birthdayText").text().substring(3,5)) <= 20) {
                sunSign = "Pisces";
            } else {
                sunSign = "Aries";
            }
            break;
        case "04":
            if(parseInt($("#birthdayText").text().substring(3,5)) <= 19) {
                sunSign = "Aries";
            } else {
                sunSign = "Taurus";
            }
            break;
        case "05":
            if(parseInt($("#birthdayText").text().substring(3,5)) <= 20) {
                sunSign = "Taurus";
            } else {
                sunSign = "Gemini";
            }
            break;
        case "06":
            if(parseInt($("#birthdayText").text().substring(3,5)) <= 20) {
                sunSign = "Gemini";
            } else {
                sunSign = "Cancer";
            }
            break;
        case "07":
            if(parseInt($("#birthdayText").text().substring(3,5)) <= 22) {
                sunSign = "Cancer";
            } else {
                sunSign = "Leo";
            }
            break;
        case "08":
            if(parseInt($("#birthdayText").text().substring(3,5)) <= 22) {
                sunSign = "Leo";
            } else {
                sunSign = "Virgo";
            }
            break;
        case "09":
            if(parseInt($("#birthdayText").text().substring(3,5)) <= 22) {
                sunSign = "Virgo";
            } else {
                sunSign = "Libra";
            }
            break;
        case "10":
            if(parseInt($("#birthdayText").text().substring(3,5)) <= 22) {
                sunSign = "Libra";
            } else {
                sunSign = "Scorpio";
            }
            break;
        case "11":
            if(parseInt($("#birthdayText").text().substring(3,5)) <= 21) {
                sunSign = "Scorpio";
            } else {
                sunSign = "Sagittarius";
            }
            break;
        case "12":
            if(parseInt($("#birthdayText").text().substring(3,5)) <= 21) {
                sunSign = "Sagittarius";
            } else {
                sunSign = "Capricorn";
            }
            break;
    }
    // var hScopeApi = "http://sandipbgt.com/theastrologer/api/horoscope/"+ sunSign.toLowerCase() + "/today";
    var hScopeApi = "http://horoscope-api.herokuapp.com/horoscope/today/"+ sunSign.toLowerCase();
    jQuery.support.cors = true;

    jQuery.ajaxPrefilter(function(options) {
        if (options.crossDomain && jQuery.support.cors) {
            options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
        }
    });
    $.get(hScopeApi).then(function(response) {
        // xyo = JSON.parse(response);
        xyo = response;
        $("#hScopeText").text(xyo.horoscope);
        $("#sunSign").text(sunSign);
        $("#horoscope").show();
        $("#phone, #email, #address, #address, #birthday, #facebook, #instagram, #notes, #backBtn, #moreFriendInfoLink, #viewHistoryLink ").hide();
        $('#saveInfo').attr("disabled", true);
    });
}