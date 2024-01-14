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
});
