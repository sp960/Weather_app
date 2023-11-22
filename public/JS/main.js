const submitBtn = document.getElementById('submitBtn')
const cityName = document.getElementById('cityName')
const city_name = document.getElementById('city_name')
const temp = document.getElementById('temp')
const temp_status = document.getElementById('temp_status')
const data_hide = document.querySelector('.weather')
const Day = document.getElementById('Day');
const today_date = document.getElementById('today_date')

const getCurrentDateAndTime = () => {
const weekDays = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
const now = new Date();
const today = now.getDate()
const month = now.toLocaleString('default', { month: 'short' });
const day = weekDays[now.getDay()];
const currentDateAndTime = `${day}`;
console.log(currentDateAndTime);
Day.innerText = currentDateAndTime
today_date.innerText = `${today}  ${month}`   
};

// Call the function to update the date and time
getCurrentDateAndTime();

const getInfo = async (event) => {
            event.preventDefault();
            let cityVal = cityName.value
            if (cityVal === '') {
                        city_name.innerText = `Enter the city Name`;
                        data_hide.classList.add('data_hide');
            }
            else {
                        try {
                                    let apiUrl = (`https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&appid=f2ad535a7a593712eeac490dad122d44`);

                                    const response = await fetch(apiUrl)
                                    const data = await response.json();
                                    const arrData = [data]
                                    temp.innerHTML = Math.round((arrData[0].main.temp) - 273.15);
                                    city_name.innerHTML = `${arrData[0].name},${arrData[0].sys.country}`
                                    const tempStatus = `${arrData[0].weather[0].main}`
                                    if(tempStatus == 'Sunny'){
                                                temp_status.innerHTML = 
                                                "<i class='fas fa-sun' style='color: #eccc68;''></i>"
                                            }
                                            else if(tempStatus == "Clouds"){
                                               temp_status.innerHTML = 
                                                "<i class='fas fa-cloud' style='color: #f1f2f6;'></i>"
                                            } else if(tempStatus == "Rainy"){
                                               temp_status.innerHTML = 
                                                "<i class='fas fa-rain' style='color: #a4b0be;'></i>"
                                            } else {
                                               temp_status.innerHTML = 
                                               " <i class='fas fa-sun' style='color: #eccc68;'></i>"
                                            }
                                    data_hide.classList.remove('data_hide');
                        }
                        catch {
                                    city_name.innerText = `City doesn't exist`
                                    data_hide.classList.add('data_hide');

                        }
            }

}
submitBtn.addEventListener('click', getInfo)