fs = require('fs')

var data = []

function get() {
  return data
}

function checkValid(d) {
  if(!d) return 'Empty data'
  if(!d.name) return 'Name is not specified'
  if(!d.size) return 'Size is not specified'
  if(!d.distance) return 'Distance is not specified'
  if(!d.ordinality) return 'Ordinality is not specified'
  if(typeof d.size != 'number') return 'Size is not a number'
  if(typeof d.distance != 'number') return 'Distance is not a number'
  if(typeof d.ordinality != 'number') return 'Ordinality is not a number'
  return 'Pass'
}

function checkUnique(d) {
  if(data.find(e => e.name == d.name)) return 'Duplicate Name'
  if(data.find(e => e.ordinality == d.ordinality)) return 'Duplicate Ordinality'
  return 'Pass'
}

function add(rawData) {
  // Name and ordinality should be unique. 
  // Size, Ordinality and Distance should be restricted to numerical input.
  try {
    var newData = JSON.parse(rawData)
  } catch(e) {
    return 'Cannot Pass JSON string'
  }
  var validicity = checkValid(newData)
  if(validicity != 'Pass') return validicity

  var uniqueness = checkUnique(newData)
  if(uniqueness != 'Pass') return uniqueness

  if(!newData.description) newData.description = ''

  data.push(newData)
  return 'Pass'

}

module.exports = {get, add};
