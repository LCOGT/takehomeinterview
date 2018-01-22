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
};

$(document).ready(() => {
  addPlanet();
});
