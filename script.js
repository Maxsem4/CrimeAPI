let offenses = ["aggravated-assault", "all-other-larceny", "all-other-offenses", "animal-cruelty", "arson", "assisting-or-promoting-prostitution", "bad-checks", "betting", "bribery", "burglary-breaking-and-entering", "counterfeiting-forgery", "credit-card-automated-teller-machine-fraud", "destruction-damage-vandalism-of-property", "driving-under-the-influence", "drug-equipment-violations", "drug-violations", "drunkenness", "embezzlement", "extortion-blackmail", "false-pretenses-swindle-confidence-game", "fondling", "gambling-equipment-violation", "hacking-computer-invasion", "human-trafficking-commerical-sex-acts", "human-trafficking-commerical-involuntary-servitude", "identity-theft", "impersonation", "incest", "intimidation", "justifiable-homicide", "kidnapping-abduction", "motor-vehicle-theft", "murder-and-nonnegligent-manslaughter", "negligent-manslaughter", "operating-promoting-assiting-gambling", "curfew-loitering-vagrancy-violations", "peeping-tom", "pocket-picking", "pornography-obscence-material", "prostitution", "purchasing-prostitution", "purse-snatching", "rape", "robbery", "sexual-assult-with-an-object", "sex-offenses-non-forcible", "shoplifting", "simple-assault", "sodomy", "sports-tampering", "statutory-rape", "stolen-property-offenses", "theft-from-building", "theft-from-coin-operated-machine-or-device", "theft-from-motor-vehicle", "theft-of-motor-vehicle-parts-or-accessories", "theft-from-motor-vehicle", "weapon-law-violation", "welfare-fraud", "wire-fraud", "not-specified", "liquor-law-violations", "crime-against-person", "crime-against-property", "crime-against-society", "assault-offenses", "homicide-offenses", "human-trafficking-offenses", "sex-offenses", "sex-offenses-non-forcible", "fraud-offenses", "larceny-theft-offenses", "drugs-narcotic-offenses", "gambling-offenses", "prostitution-offenses", "all-offenses"]
let offenseVariable = ["COUNT", "WEAPONS", "LINKEDOFFENSE", "SUSPECTUSING", "CRIMINAL_ACTIVITY", "PROPERTY_RECOVERED", "PROPERTY_STOLEN", "BIAS"]
let endpoint = selState
//toggle between hiding and showing the dropdown content */

// from dropdownList.html
//**
function changeState() {

    //let selColor = document.getElementById("selColor");
    let endpoint3 = selState.value
    let endpoint4 = selOffense.value
    let endpoint5 = selOffenseVariable.value
    let APIKey3 = 'lnCSsYjnRgflhaB0c4Uc78F9LivWRTDMPUP1Bsu1'
    //var color = selColor.value;
    //document.body.style.backgroundColor = color;

    let queryURL3 = 'https://api.usa.gov/crime/fbi/sapi/api/summarized/state/' + endpoint3 + '/' + endpoint4 + '/2016/2017?API_KEY=' + APIKey3
    fetch(queryURL3)
        .then(function (response) {
            // Decode the JSON response.body
            return response.json()
        })
        // We store all of the retrieved data inside of an object called "data"
        // NOTE: we could name the variable for the function parameter anything
        // that makes sense for our application. It does not need to be called data.


        .then(function (list2) {
            // Log the queryURL
            console.log(queryURL3)
            // Log the object retreived from the API
            console.log(list2)
            let blahblahGet = document.getElementById("blahblah")
                //blahblahGet.createElement("h1")                  
                  let blahblahPut = blahblahGet.innerHTML = (list2.results[0].ori)
                  document.appendChild(blahblahPut)
        })

} // end function
//}

let APIKey2 = 'lnCSsYjnRgflhaB0c4Uc78F9LivWRTDMPUP1Bsu1'
// let endpoint = 'HI0010000'

//let queryURL2 = 'https://api.usa.gov/crime/fbi/sapi/api/agencies/' + endpoint  + '?api_key=' + APIKey2
let queryURL2 = 'https://api.usa.gov/crime/fbi/sapi/api/states?api_key=lnCSsYjnRgflhaB0c4Uc78F9LivWRTDMPUP1Bsu1'
//all people convincted age and states
fetch(queryURL2)
    .then(function (response) {
        // Decode the JSON response.body
        return response.json()
    })
    // We store all of the retrieved data inside of an object called "data"
    // NOTE: we could name the variable for the function parameter anything
    // that makes sense for our application. It does not need to be called data.


    .then(function (list) {
        // Log the queryURL
        //console.log(queryURL2)
        // Log the object retreived from the API
        //console.log(list)

        for (i = 0; i < list.results.length; i++) {
            let iconCode5 = list.results[i].state_abbr
            let states = [iconCode5];
            //alert (iconCode5);
            //console.log(states);
            for (j = 0; j < states.length; j++) {
                let option = document.createElement("option")
                txt = document.createTextNode(states[j]);
                option.appendChild(txt);
                selState.insertBefore(option, selState.lastChild);
            }

        }
        for (k = 0; k < offenses.length; k++) {
            let option2 = document.createElement("option")
            txt2 = document.createTextNode(offenses[k]);
            option2.appendChild(txt2);
            selOffense.insertBefore(option2, selOffense.lastChild);
        }
        for (l = 0; l < offenseVariable.length; l++) {
            let option3 = document.createElement("option")
            txt3 = document.createTextNode(offenseVariable[l]);
            option3.appendChild(txt3);
            selOffenseVariable.insertBefore(option3, selOffenseVariable.lastChild);
        }
        //https://api.usa.gov/crime/fbi/sapi/api/data/nibrs/offense/13/monthly/2016/2017?agencies/{ori}/{variable}
        //https://api.usa.gov/crime/fbi/sapi/api/participation/states/AL?api_key=lnCSsYjnRgflhaB0c4Uc78F9LivWRTDMPUP1Bsu1
        //https://crime-data-explorer.fr.cloud.gov/api

        // https://api.usa.gov/crime/fbi/sapi/api/agencies?api_key=iiHnOKfno2Mgkt5AynpvPpUQTEyxE77jo1RU8PIv - list of different agencies
        // }
        // all offenses https://api.usa.gov/crime/fbi/sapi/api/arrest/states/offense/ak/all/2000/2001?API_KEY=iiHnOKfno2Mgkt5AynpvPpUQTEyxE77jo1RU8PIv

                  
                  
                  


    })