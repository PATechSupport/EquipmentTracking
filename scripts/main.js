'use strict'
$(document).ready(function () {

    // Setup Firebase reference
    var ref = new Firebase("https://eqlog.firebaseio.com/");





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
