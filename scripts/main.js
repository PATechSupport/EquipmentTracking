'use strict';




$(document).ready(function () {

    // Setup Firebase reference
    var ref = new Firebase("https://eqlog.firebaseio.com/distributed");

    ref.on('value', function (snapshot) {
        // On initial connection and a value change, CLEAR out DIV and APPEND updated data.
        $('#eqOut').empty();
        // Loop through each item in Firebase's /distribute JSON tree.
        snapshot.forEach(function (childsnapshot) {
            var key = childsnapshot.key();
            var data = childsnapshot.val();
            $('#eqOut').append("<li class='list-group-item' data-key=" + key + ">Date Out: " + data.dateOut + "Tag/Device: " + data.tagDevice + "Name: " + data.name + "Location: " + data.location + "Notes: " + data.notes + "Key: " + key + "<span class='badge'>#days Overdue</span><button class='btn btn-primary btn-sm return' >Returned</button></li>");

        });
    });

    $('#eqOut').on('click', '.return', function returnItem() {
        console.log('Item RETURNED! ' + $(this).val());
    });

    $('#save').on('click', function () {
        console.log('Form Valid: ' + $('form').valid());
        if ($('form').valid()) {
            var equipmentOut = {
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
