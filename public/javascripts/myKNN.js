/*
Johu 2020/2/2 11:41:28.
*/
module.exports = function (arr, trainingData, k, debug = false) {

  var inXarr = []
  for (var key in arr[0]) {
    inXarr.push((arr[0][key]));
  }

  trainingData.unshift(arr[0])

  var distances = []


  for (var i = 0; i < trainingData.length; i++) {
    // console.log(trainingData[i]);
    var distance = 0;
    // console.log(element);
    for (var key in trainingData[i]) {
      // console.log(trainingData[0]);
      // console.log('bia       ' + trainingData[0][key]);
      // console.log('fei       ' + trainingData[i][key]);
      var diff = Number(trainingData[0][key]) - Number(trainingData[i][key])

      distance += (diff * diff);
    }
    distances.push(Math.sqrt(distance));


    var sortedDistIndicies = distances
      .map((value, index) => {
        return {value, index};
      })
      .sort((a, b) => a.value - b.value);
  }
  return (sortedDistIndicies.slice(0, k));

}
