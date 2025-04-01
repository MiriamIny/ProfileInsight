document.addEventListener("DOMContentLoaded", function() 
{
    // on click, call api's to get results
    document.getElementById("predictBtn").addEventListener("click", async function() 
    {
        const nameInput = document.getElementById("nameInput").value.trim();
        const genderResult = document.getElementById("genderResult");
        const ageResult = document.getElementById("ageResult");
        const nationalityResult = document.getElementById("nationalityResult");

        // alert user and exit function if no name input
        if (!nameInput) 
        {
            alert("Please enter a valid name.");
            return; 
        }

        // display loader during async function
        document.querySelector(".loader").style.display = "grid";

        try {
            // asynchronous function to fetch data from multiple APIs
            async function fetchData() 
            {
                // Promise.all() to run multiple fetch requests in parallel
                // await to ensure that all fetch calls resolve before proceeding
                let [genderResponse, ageResponse, nationalityResponse] = await Promise.all
                ([
                    fetch(`https://api.genderize.io?name=${nameInput}`),
                    fetch(`https://api.agify.io?name=${nameInput}`),
                    fetch(`https://api.nationalize.io?name=${nameInput}`)
                ]);
    
                // Check if API responses are successful, otherwise throw an error to be displayed in catch block
                if (!genderResponse.ok) throw new Error("Gender API request failed.");
                if (!ageResponse.ok) throw new Error("Age API request failed.");
                if (!nationalityResponse.ok) throw new Error("Nationality API request failed.");
    
                // Extract JSON data from each response (.json() is asynchronous function)
                // Use await to ensure that execution is paused until json parsing is completed
                let genderData = await genderResponse.json();
                let ageData = await ageResponse.json();
                let nationalityData = await nationalityResponse.json();
    
                // Return the extracted data as an array
                return [genderData, ageData, nationalityData];
            }
        
            // Call the async fetch data function and wait for the Promise to resolve
            let [genderData, ageData, nationalityData] = await fetchData();
        
        } 
        catch (error) 
        {
            // Handle any errors that occur in the try block
            alert(error); // Display an alert to the user
        } 
    })
})