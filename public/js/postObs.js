"use strict";

$(document).ready(function() {
    // Code add selected class to star when it is clicked on
    $('.rating input').change(function() {
        var $radio = $(this);
        $('.rating .selected').removeClass('selected');
        $radio.closest('label').addClass('selected');
    });

    // Code to get number of stars any time user clicks on them
    var numberOfStars;

    $("#stars").on('click', function(event) {
        if ($(event.target) !== $(event.currentTarget)) {
            numberOfStars = event.target.value;
        }
        return numberOfStars;
    });

    // Get form data when the form is submitted
    $('#obsform').on('submit', function(event) {
        event.preventDefault();

        var newObs = {};

        let name = $('#name').val();
        let latitude = $('#latitude').val();
        let longitude = $('#longitude').val();
        let description = $('#description').val();
        //  let stars = $(this.stars).val();
        let stars = numberOfStars;
        let user_id = $('#user_id').val();

        newObs.name = name;
        newObs.latitude = latitude;
        newObs.longitude = longitude;
        newObs.description = description;
        newObs.stars = stars;
        // newObs.user_id = user_id;

        newObs = JSON.stringify(newObs);

        $.ajax({
            method: 'POST',
            url: '/observations/',
            dataType: 'json',
            contentType: 'application/json',
            data: newObs
        });

        window.location.replace("map.html"); // redirect user to map page
    }); // end obsform submit
}); // end doc ready
