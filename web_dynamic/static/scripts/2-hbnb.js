$(document).ready(function () {
  const amenityIds = [];
  const amenityNames = [];
  $('DIV.amenities input[type="checkbox"]').on('change', function () {
    const amenityId = $(this).data('id');
    const amenityName = $(this).data('name');

    if (this.checked) {
      amenityIds.push(amenityId);
      amenityNames.push(amenityName);
    } else {
      const indexId = amenityIds.indexOf(amenityId);
      const indexName = amenityNames.indexOf(amenityName);
      if (indexId !== -1) {
        amenityIds.splice(indexId, 1);
      }
      if (indexName !== -1) {
        amenityNames.splice(indexName, 1);
      }
    }

    $('DIV.amenities H4').text(amenityNames.join(', '));
  });

  $.get('http://0.0.0.0:5001/api/v1/status/')
    .done(function (data) {
      if (data.status === 'OK') {
        if (!$('DIV#api_status').hasClass('available')) {
          $('DIV#api_status').addClass('available');
        }
      } else {
        if ($('DIV#api_status').hasClass('available')) {
          $('DIV#api_status').removeClass('available');
        }
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      if ($('DIV#api_status').hasClass('available')) {
        $('DIV#api_status').removeClass('available');
      }
    });
});
