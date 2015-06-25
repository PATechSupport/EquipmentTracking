'use strict'
$(document).ready(function () {

    // Setup Firebase reference
    var ref = new Firebase("https://eqlog.firebaseio.com/");
});




$('#distribute').on('click', function () {
    console.log('Distrute clicked!');
    var equipmentOut = {
        dateOut: '',
        tagDevice: '',
        name: '',
        command: '',
        location: '',
        notes: '',
        dateIn: ''
    };
    ref.child('distributed').push(eqOut);
});

$('#return').on('click', function () {
console.log('Return clicked!');
});
});
