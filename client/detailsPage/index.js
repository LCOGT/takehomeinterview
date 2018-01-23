const getPlanets = () => {
  $.get('/planets', (planets) => {
    planets.forEach((planet) => {
      const detail = $(
        `<div key=${planet.ordinality}>
            <h3>${planet.name}</h3>
            <p>${planet.description}</p>
            <br>
            <p>Ordinality: ${planet.ordinality}</p>
            <p>Size: ${planet.size} Earth Mases</p>
            <p>Distance: ${planet.distance} AU</p>
            </div>
            <br>`,
      );
      $('#details-list').append(detail);
    });
  });
};

$(document).ready(() => {
  getPlanets();
});
