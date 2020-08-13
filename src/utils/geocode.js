const request = require('request');

const geocode = (address,callback) => {
    
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?types=address&access_token=pk.eyJ1IjoiY2hhZDE3OTEiLCJhIjoiY2s2N2k4OWVsMGN2OTNtcHdnY3d1ODdkMiJ9.q5PjnrtdC9OdisrzQ8m41g`;

    request({ url, json: true }, (error,{body})=>{ ///object destructuring - response.

        const features = body.features;
    
        if(error){
            callback("Cannot reach the location services at this moment!", undefined);
        }
        else 
        if(features.length === 0){
            callback("Invalid location...", undefined);
        }
        else{
    
            const center = features[0].center; ////[langitude,latitude]
            const longitude = center[0];
            const latitude = center[1];
            const location = features[0].place_name;
                
            callback(undefined, {
                longitude : longitude,
                latitude: latitude,
                location: location
            });
        }
    });   
};

module.exports = geocode;