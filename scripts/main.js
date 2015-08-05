$(document).ready(function () {

    // Setup Firebase reference
    var ref = new Firebase("https://eqlog.firebaseio.com/distributed");
    var equipmentOut;
    var list;

    ref.on('value', function (snapshot) {
        // On initial connection and a value change, CLEAR out DIV and APPEND updated data.
        $('#eqOut').empty();
        // Loop through each item in Firebase's /distribute JSON tree.
        snapshot.forEach(function (childsnapshot) {
            var key = childsnapshot.key(),
            data = childsnapshot.val();
            list += [key, data];

            console.log(list[0,0]);

            if (data.dateIn === "") {
                $('#eqOut').append(
                    "<li class='list-group-item' ><div class='well'>Date Out: <strong>" + data.dateOut + "</strong><br>Tag/Device: <strong>" + data.tagDevice + "</strong><br>Name: <strong>" + data.name + "</strong><br>Location: <strong>" + data.location + "</strong><br>Notes: <strong>" + data.notes + "</strong><br>Key: <strong>" + key + "</strong><span class='badge'>#days Overdue</span><button class='btn btn-primary btn-sm return' data-key=" + key + ">Returned</button></div></li>");
            }

        });
    });

    $('#eqOut').on('click', '.return', function returnItem() {
        // Same as the previous example, except we will also display an alert
        // message when the data has finished synchronizing.
        var onComplete = function (error) {
            if (error) {
                console.log('Synchronization failed');
            } else {
                console.log('Synchronization succeeded');
            }
        };

        var returnedItemKey = $(this).data('key');
        var d = new Date();
        var month = d.getMonth() + 1;
        var date = d.getDate();
        var year = d.getFullYear();
        var dateReturned = year + '-' + (month < 10 ? '0' : '') + month + '-' + (date < 10 ? 0 : '') +  date;
        console.log('Item RETURNED on ' + dateReturned);
        console.log($(this).data('key'));
        //ref.child(returnedItemKey).update({dateIn: dateReturned}, onComplete);
    });

    $('#save').on('click', function () {
        console.log('Form Valid: ' + $('form').valid());
        if ($('form').valid()) {
            equipmentOut = {
                dateOut: $('#inputDateOut').val(),
                tagDevice: $('#inputTagDevice').val(),
                name: $('#inputMOSName').val(),
                // command: $('#').val(),
                location: $('#inputLocation').val(),
                notes: $('#inputNotes').val(),
                dateIn: ''
            };
            ref.push(equipmentOut);
        } else {
            alert('Please CHECK Form!');
        }
    });


});
