'use strict'
$(document).ready(function () {

    // Setup Firebase reference
    var ref = new Firebase("https://eqlog.firebaseio.com/distribute");

    ref.once('value', function (snapshot) {
        snapshot.forEach(function (childsnapshot) {
            var key = childsnapshot.key();
            var data = childsnapshot.val();
            $('#eqOut').append("<li class='list-group-item'>Date Out: " + data.dateOut + "Tag/Device: " + data.tagDevice + "Name: " + data.name + "Location: " + data.location + "Notes: " + data.notes + " Days Overdue: <span class='badge'>#days Overdue</span></li>");

        });
    });



    $('#save').on('click', function () {
        console.log('Save clicked!');
        var equipmentOut = {
            dateOut: $('#inputDateOut').val(),
            tagDevice: $('#inputTagDevice').val(),
            name: $('#inputMOSName').val(),
            // command: $('#').val(),
            location: $('#inputLocation').val(),
            notes: $('#inputNotes').val(),
            dateIn: ''
        };
        ref.child("distributed").push(equipmentOut);
    });

    $('#return').on('click', function () {
        console.log('Return clicked!');
    });

});
