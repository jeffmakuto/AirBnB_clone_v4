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

$(document).ready(function() {
    function updateAPIStatus() {
        $.get('http://0.0.0.0:5001/api/v1/status/', function(data) {
            if (data.status === 'OK') {
                $(('#api_status').addClass('available'));
            } else {
                $(('#api_status').removeClass('available'));
            }
        })
    }
    updateAPIStatus();
    setInterval(updateAPIStatus, 5000);
})

const URL = 'http://0.0.0.0:5001/api/v1/places_search/';
fetch (url, {
    method: POST,
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    amenities: checkedAmenities,
    cities: Object.keys(checkedLocations),
    states: Object.keys(checkedLocations),
});

fetch(URL, requestOptions)
    .then(response => response.json())
    .then(data => {
        const placesSelection =document.getElementById('places');
        data.forEach(place => {
            const article = document.createElement('article');
            article.innerHTML = `<p>${place.name}</p><p>${place.description}</p>`;
            placesSelection.appendChild(article);
        });
    })
    .catch(error => {
        console.log('error:', error);
    });

document.getElementById('searchButton').addEventListener('click', function() {
    const checkedAmenities = Array.from(document.querySelectorAll('.amenity-checkbox:checked'))
    .map(checkbox => checkbox.getAttribute('data-id'));
})

document.addEventListener('DOMContentLoaded', function () {
    const checkedLocations = {};
    
    function updateLocationsList() {
        const locationsH4 = document.querySelector('.locationsH4');
        locationsH4.textContent = 'Checked Locations: ' + Object.values(checkedLocations).join(', ');
    }
    
    document.querySelectorAll('.state-checkbox, .city-checkbox').forEach(function (checkbox) {
        checkbox.addEventListener('change', function () {
            const id = this.getAttribute('data-id');
            const name = this.getAttribute('data-name');

            if (this.checked) {
                checkedLocations[id] = name;
            } else {
                delete checkedLocations[id];
            }
            updateLocationsList();
        });
    });
});
