// convert a cast member's gender from a number to the actual
const determineGender = function(gender) {
  if (gender === 1) {
    return "Women";
  } else if (gender === 2) {
    return "Men";
  }
  return "Unknown";
};

module.exports = determineGender;
