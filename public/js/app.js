const error = document.querySelector("#error")
const locationInfo = document.querySelector('#locationInfo')
const weather = document.querySelector("#weather")
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
var cloudImg = document.querySelectorAll('img')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value;
    fetch('/weather?address='+ location)
        .then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    error.textContent = data.error
                } else

                locationInfo.textContent = data.location
                console.log(data.weatherData.message);
                weather.textContent = data.weatherData.message
                var temp = (data.weatherData.temp);
                
                
                for(let i=0;i<cloudImg.length;i++){
                    if(temp=="Partly cloudy"|| temp=="Overcast")
                        cloudImg[i].src="./img/clouds.svg"
                    else if(temp=="Moderate or heavy rain shower" || temp=="Patchy rain possible" || temp=="Light rain" )
                        cloudImg[i].src="./img/rain.svg"
                    else if(temp=="Light rain shower"){
                        cloudImg[i].src="./img/thunder.svg"
                    }
                        else{
                        cloudImg[i].src="./img/day.svg"
                    }
                   
                }
                document.getElementsByClassName("weatherInfo").appendChild(cloudImg);
                document.getElementsByClassName("locationInfo").appendChild(cloudImg);
               
            })
        })
    
    
})