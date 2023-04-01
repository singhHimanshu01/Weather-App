// Initializing all elements constants
const tempraturefild = document.querySelector(".weather1");
const cityfield = document.querySelector(".weather2 p");
const datefield = document.querySelector(".weather2 span");
const emojifield = document.querySelector(".weather3 img");
const weatherfield = document.querySelector(".weather3 span");
const searchfield = document.querySelector(".search");
const form = document.querySelector("form");

// Default Location
let target = "katihar";

// Function to fetch Data from Weather API
const fetchdata = async (target) => {
    try {
        const url = `https://api.weatherapi.com/v1/current.json?key=a13dbea2665b44f4a8a150859233103&q=${target}`;

    const responce = await fetch(url);
    const data = await responce.json();
    console.log(data);

    // Destructuring
    const {
        current: {temp_c,condition:{text,icon}},
        location: {name,localtime},
    }=data;
    
    // Calling update Dom Function
    updateDom(temp_c,name,icon,text,localtime);

    } 
    catch (error) 
    {
    alert("Location not found");
    }
    };

    // Function to update Dom
    function updateDom(temp,city,emoji,text,time) {
        tempraturefild.innerText=temp;
        cityfield.innerText=city;
        emojifield.src=emoji;
        weatherfield.innerHTML=text;
        let exectdate = time.split(" ")[0];
        let execttime = time.split(" ")[1];
        let exectday = new Date(exectdate).getDay();
        datefield.innerText=`${execttime} - ${getday(exectday)} ${exectdate}`;
        }

    // Function to get the name of day
    function getday(num) {
        switch (num) {
            case 0: return "Sunday";
            case 1: return "Monday";
            case 2: return "Tuesday";
            case 3: return "Wednesday";
            case 4: return "Thursday";
            case 5: return "Friday";
            case 6: return "Saturday";
            default: return "Don't know";
        }
    }
    fetchdata(target);

    // Adding event listen to the form
    form.addEventListener("submit",(e)=>{
        e.preventDefault();
        target=searchfield.value;  // Search the location
        fetchdata(target);
    });
   