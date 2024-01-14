#!/usr/bin/node

//wait for DOM to be fully loaded

$(document).ready(function () {
    var selectedAmenities = [];

    //listen for changes on each checkbox with class 'amenity-checkbox'
    $('.amenity-checkbox').change(function() {
        var amenityId = $(this).data('id');

        if ($(this).prop(checked)) {
            selectedAmenities.push(amenityId);
        }else {
            selectedAmenities = selectedAmenities.filter(function(id) {
                return id !== amenityId;
            });
        }
        $('#selected-amenities-list').html('<li>' + selectedAmenities.join('<li></li>') + '</li>')
    });
});