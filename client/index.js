const getPlanets = () => {
  $.get('/planets', (planets) => {
    planets.forEach((planet) => {
      if ($('td').text().indexOf(planet.ordinality) === -1) {
        const newPlanet = $(
          `<tr key=${planet.ordinality}>
          <td style="padding:0 20px 0 20px;">${planet.ordinality}</td>
          <td style="padding:0 20px 0 20px;">${planet.name}</td>
          <td style="padding:0 20px 0 20px;">${planet.size}</td>
          <td style="padding:0 20px 0 20px;">${planet.distance}</td>
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
    const name = $('#name').val();
    const size = $('#size').val();
    const distance = $('#distance').val();
    const ordinality = $('#ordinality').val();
    const description = $('#description').val();
    console.log(name, size, distance, ordinality, description)
  });
  getPlanets();
};

$(document).ready(() => {
  getPlanets();
  addPlanet();
});
