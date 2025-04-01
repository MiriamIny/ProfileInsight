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

            // Update the HTML elements with the fetched data
            genderResult.innerHTML = "<strong>Gender:</strong> " + (genderData.gender || "Unknown");
            ageResult.innerHTML = "<strong>Age:</strong> " + (ageData.age || "Unknown");
        
            // Process nationality data and update the result
            // If nationalityData.country list exists, display top 3 probable nationalities
            if (nationalityData.country.length > 0) 
            {
                let topCountries = nationalityData.country.slice(0, 3).map(c => c.country_id).join(", ");
                nationalityResult.innerHTML = "<strong>Nationality:</strong> " + topCountries;
            } 
            else 
            {
                nationalityResult.innerHTML = "<strong>Nationality:</strong> Unknown";
            }
        
        } 
        catch (error) 
        {
            // Handle any errors that occur in the try block
            alert(error); // Display an alert to the user
        } 
        finally 
        {
            // hide loader and display results regardless of success or failure in try block
            document.querySelector(".loader").style.display = "none";
            document.querySelector(".result").style.display = "block";
        }
    })
})