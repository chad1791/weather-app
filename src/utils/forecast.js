const request = require('request');

const forecast = (lat,lang,callback,language="en") => {

    const url = `https://api.darksky.net/forecast/57b4ea50a039aab3b8e38f76a8529db5/${lat},${lang}?lang=${language}`;

    request({ url, json: true }, (error,{body})=>{  ///object destrutoring - response
    
        if(error){
            callback("Cannot get forecast at the moment. Please check your internet connection!",undefined);
        }
        else
        if(body.error){ 
            callback("Invalid location!",undefined);
        }
        else{

            const currently = body.currently;
            const todaySummary = body.daily.summary;

            callback(undefined, `${todaySummary} It is currently ${currently.temperature} degrees outside.`);
            
        }  
    });
};

module.exports = forecast;