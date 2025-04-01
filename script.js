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
    })
})