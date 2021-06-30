const request = require("request");

const wheather = (longitude,latitude, callback) => {
  const url =
  "http://api.weatherapi.com/v1/current.json?key=b6203b90137b4a8c8c3111857212506&q=" +encodeURIComponent(longitude)+","+encodeURIComponent(latitude)+"&aqi=yes";


  request({url, json: true }, (error, {body}) => {
    if (error) {
      callback("Unable to connect to weather service!");
    } else if (body.error) {
      callback("Unable to find location");
    } else {

      callback(undefined,
       {temp:body.current.condition.text,
        
        message:body.current.condition.text + " Thorughout the day." 
        +"It is currently " + body.current.temp_c +
          " degress out."}
      );
    }
  });
};

module.exports = wheather