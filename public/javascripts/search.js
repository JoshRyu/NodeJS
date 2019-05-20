/**
 * This function takes the user entered parameters in the 'name' text box
 * on the job search page and lists the jobs where the job name matches
 * these parameters
 *
 */
function searchJob() {
    var jobSearch = document.getElementById("name");
    var jobSearchFilter = jobSearch.value.toLowerCase();
    var table = document.getElementById("jobTable");
    var jobArray = table.getElementsByTagName("tr");

    var i = 0;
    for (i = 0; i < jobArray.length; i++) {
        var jobName = jobArray[i].getElementsByTagName("td")[0];
        if (jobName) {
            var txtValue = jobName.textContent || jobName.innerText;
            if (txtValue.toLowerCase().indexOf(jobSearchFilter) > -1) {
                jobArray[i].style.display = "";
            } else {
                jobArray[i].style.display = "none";
            }
        }
    }
}

/**
 * This function takes the user entered parameters in the 'location' text box
 * on the job search page and lists the jobs where the location matches these
 * parameters
 *
 */
function searchLocation() {
    var locationSearch = document.getElementById("location");
    var locationSearchFilter = locationSearch.value.toLowerCase();
    var table = document.getElementById("jobTable");
    var locationArray = table.getElementsByTagName("tr");

    var i = 0;
    for (i = 0; i < locationArray.length; i++) {
        var locationName = locationArray[i].getElementsByTagName("td")[2];
        if (locationName) {
            var txtValue = locationName.textContent || locationName.innerText;
            if (txtValue.toLowerCase().indexOf(locationSearchFilter) > -1) {
                locationArray[i].style.display = "";
            } else {
                locationArray[i].style.display = "none";
            }
        }
    }
}