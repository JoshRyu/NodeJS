/**
 * This function creates a new job listing and company on the 'submit' page by sending the
 * data through Ajax.
 *
 * @param  url  contains the address to which to send the request
 * @param  data  A plain object or string that is sent to the server with the request
 */
function sendAjaxQuery(url, data) {
    console.log(data);
    $.ajax({
        url: url ,
        data: data,
        dataType: 'json',
        type: 'POST',
        success: function (dataR) {
            // no need to JSON parse the result, as we are using
            // dataType:json, so JQuery knows it and unpacks the
            // object for us before returning it
            var ret = dataR;
            // in order to have the object printed by alert
            // we need to JSON stringify the object
            document.getElementById('results').innerHTML= "You have successfully submitted the job offer.";
        },
        error: function (xhr, status, error) {

            alert('Error: ' + error.message);
        }
    });
}

/**
 * This function creates the data needed for the ajax query. The
 * data consists of taking the information from the form on the
 * 'submit' page and placing it in a variable named 'data'
 *
 */
function onSubmit() {
    $(g).attr('disabled', true);
    var formArray= $("form").serializeArray();
    var data={};
    for (index in formArray){
        data[formArray[index].name]= formArray[index].value;
    }
    sendAjaxQuery('/submit', data);
    event.preventDefault();
}
