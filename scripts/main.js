$(document).ready(function () {

    // Setup Firebase reference
    var ref = new Firebase("https://eqlog.firebaseio.com/distributed");
    var equipmentOut;

    // Return items by getting it's unique key from the button's data attribute.  Use key to update dateIn value with current date.
    $('#eqOut').on('click', '.return', function returnItem() {

        // Create variables to store the item's key, and date returned.
        var returnedItemKey = $(this).data('key');
        var d = new Date();
        var month = d.getMonth() + 1;
        var date = d.getDate();
        var year = d.getFullYear();
        var dateReturned = year + '-' + (month < 10 ? '0' : '') + month + '-' + (date < 10 ? 0 : '') + date;
        console.log('Item RETURNED on ' + dateReturned);
        console.log($(this).data('key'));
        ref.child(returnedItemKey).update({
            dateIn: dateReturned
        }, onComplete);

    });

    // Same as the previous example, except we will also display an alert
    // message when the data has finished synchronizing.
    var onComplete = function (error) {
        if (error) {
            toastr.error('Synchronization failed');
        } else {
            toastr.success('Synchronization succeeded');
        }
    };

    // Save item, if all fields have data entered.
    $('#save').on('click', function (event) {
        var eqForm = $('#equipEntry');
        console.log('Save Button Clicked!');

        event.preventDefault();

        // Prevent the click event from bubbling up to the parent elements.
        event.stopPropagation();

        // Check to make sure the form is valid before pushing the item to Firebase's DB.
        equipmentOut = {
            //dateOut: $('#inputDateOut').val(),
            dateOut: Firebase.ServerValue.TIMESTAMP,
            tagDevice: $('#inputTagDevice').val(),
            name: $('#inputMOSName').val(),
            location: $('#inputLocation').val(),
            notes: $('#inputNotes').val(),
            dateIn: ''
        };
        var valid = true;
        var missingInfo;
        for (var property in equipmentOut) {
            if (equipmentOut.hasOwnProperty(property)) {
                // dCheck to make sure the form is valid before pushing the item to Firebase's DB.
                if (equipmentOut[property] === "" && property != "dateIn" && valid) {
                    valid = !valid;
                    missingInfo = property;
                }
                console.log(equipmentOut[property]);
            }
        }
        if (valid) {
            ref.push(equipmentOut);
            console.log(equipmentOut);
            //                equipmentOut = {};
            // Reset the form.  For some unknown reason, it stopped clearing itself after submission.
            $('#equipEntry')[0].reset();
        } else {
            // Notifiy user that the form is NOT complete.
            toastr.error("Please CHECK that ALL Form fields are filled in!", "'AH SNAP!  Looks like you forgot to fill in " + missingInfo + ".");

            return false;
        }
    });

    // On any change in the values of the items stored in the Firebase DB, this event is triggered which will update the data locally.
    ref.on('value', function (snapshot) {
        // The snapshot is the JSON data returned from Firebase containing all the items.
        var distributedList = snapshot.val();

        // On initial connection and a value change, CLEAR out DIV and APPEND updated data.
        $('#eqOut').empty();

        // Loop through each child item returned in Firebase's /distribute JSON tree.
        snapshot.forEach(function (childsnapshot) {
            // Child's unique key.
            var key = childsnapshot.key(),
                // Child's data as a JSON object.
                data = childsnapshot.val();

            // Only display the items that have NOT been returned by checking dateIn.
            if (data.dateIn === "") {
                // Store the amount of time the item has been out formatted with moment.js
                //var daysOut = moment(data.dateOut, "YYYYMMDD").fromNow();
                var daysOut = moment(moment(data.dateOut).format("MM-DD-YYYY hh:mm A")).fromNow();
                // Append each item to the unordered list <ul> with html id='eqOUT'.
                $('#eqOut').append(
                    "<li class='list-group-item' ><div class='well'>Date Out: <strong>" + moment(data.dateOut).format("MM-DD-YYYY hh:mm A") + "</strong><span class='badge overdue'>Borrowed " + daysOut + "</span><br>Tag/Device: <strong>" + data.tagDevice + "</strong><br>Name: <strong>" + data.name + "</strong><br>Location: <strong>" + data.location + "</strong><br>Notes: <strong>" + data.notes + "</strong><br><br><button class='btn btn-primary btn-sm return' data-key=" + key + ">Returned</button></div></li>");
            }
        });
    });
});
