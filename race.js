addRaceYearField();
addRaceRoundField();
addSubmitButton();
createRaceTable();


function addRaceYearField(){
    inputYear = document.createElement('input');
    inputYear.placeholder="Enter race year";
    inputYear.name = "racer_year"
    inputYear.classList.add("form-control")
    document.body.appendChild(inputYear);
};

function addRaceRoundField(){
    inputRound = document.createElement('input');
    inputRound.placeholder="Enter race round";
    inputRound.name = "racer_round"
    inputRound.classList.add("form-control")
    document.body.appendChild(inputRound);
};

function handleSubmit(){
    racerYear=document.getElementsByName("racer_year")[0].value;
    racerRound=document.getElementsByName("racer_round")[0].value;
    doAPICall(racerYear,racerRound);
};

function addSubmitButton(){
    button=document.createElement('button');
    button.innerText="Get Race";
    button.classList.add('btn','btn-outline-success')
    button.addEventListener('click', ()=>handleSubmit())
    document.body.appendChild(button);
};

function createTableHeaderEntry(label){
    th = document.createElement('th');
    th.innerText = label
    th.scope = "col"
    tr.appendChild(th)
}

function createRaceTable(){
    table = document.createElement("table");
    table.classList.add("table", "table-striped");
    document.body.appendChild(table);

    thead = document.createElement("thead");
    table.appendChild(thead)

    tr = document.createElement('tr');
    thead.appendChild(tr);

    createTableHeaderEntry("First Name");
    createTableHeaderEntry("Last Name");
    createTableHeaderEntry("DOB");
    createTableHeaderEntry("Position");
    createTableHeaderEntry("Wins");
    createTableHeaderEntry("Nationality");
    createTableHeaderEntry("Constructor");

    tbody = document.createElement('tbody');
    table.appendChild(tbody)
}

async function doAPICall(racerYear,racerRound){
    result = await axios.get(`https://ergast.com/api/f1/${racerYear}/${racerRound}/driverStandings.json`).catch((e)=>{console.error(e);alert('We cannot find this race.')}).finally(console.log('API request is over'))    
    tbody = document.getElementsByTagName('tbody')[0];
    result = result.data
    console.log(result)
    console.log(result.MRData.StandingsTable.season)
    allDrivers = result.MRData.StandingsTable.StandingsLists[0].DriverStandings

    

    for (let driver of allDrivers) {
    console.log(driver)

    tbody = document.getElementsByTagName('tbody')[0];

    tr = document.createElement('tr');
    tbody.appendChild(tr);


    th = document.createElement('th');
    th.scope="row";
    th.innerText = driver.Driver.givenName
    tr.appendChild(th)

    td = document.createElement("td"); 
    td.innerText = driver.Driver.familyName
    tr.appendChild(td)

    td = document.createElement("td"); 
    td.innerText = driver.Driver.dateOfBirth
    tr.appendChild(td)
    
    td = document.createElement("td"); 
    td.innerText = driver.position
    tr.appendChild(td)
    
    td = document.createElement("td"); 
    td.innerText = driver.wins
    tr.appendChild(td)

    td = document.createElement("td"); 
    td.innerText = driver.Driver.nationality
    tr.appendChild(td)

    td = document.createElement("td"); 
    td.innerText = driver.Constructors[0].name
    tr.appendChild(td)

    }

}