const getPlanets = () => {
  $.get('/planets', (planets) => {
    planets.forEach((planet) => {
      if ($('td').text().indexOf(planet.ordinality) === -1) {
        const newPlanet = $(
          `<tr key=${planet.ordinality}>
          <td class="ordinality" style="padding:0 20px 0 20px;">${planet.ordinality}</td>
          <td class="name" style="padding:0 20px 0 20px;">${planet.name}</td>
          <td class="size" style="padding:0 20px 0 20px;">${planet.size}</td>
          <td class="distance" style="padding:0 20px 0 20px;">${planet.distance}</td>
          </tr>`,
        );
        $('#planet-list').append(newPlanet);
      }
    });
  });
};

const addPlanet = () => {
  $('#planetForm').submit((e) => {
    e.preventDefault();
    const data = {
      name: $('#name').val(),
      size: $('#size').val(),
      distance: $('#distance').val(),
      ordinality: $('#ordinality').val(),
      description: $('#description').val(),
    };

    if ($('.name').text().toLowerCase() === data.name.toLowerCase() || $('.ordinality').text() === data.ordinality) {
      alert('Planet Name and Ordinality needs to be unique')
    }
    if (!parseInt(data.size, 10) || !parseInt(data.distance, 10) || !parseInt(data.ordinality, 10)) {
      alert('Planet Size, Distance and Ordinality needs to be an Integer');
    } else {
      $.ajax({
        type: 'POST',
        url: '/',
        data,
        success: (planet) => {
          console.log(planet, 'has been posted');
        },
      });
      location.reload();
    }
  });
};

$(document).ready(() => {
  getPlanets();
  addPlanet();
});
