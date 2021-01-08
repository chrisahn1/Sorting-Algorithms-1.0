// bar size range 100 - 350
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

var sizeSlider = document.getElementById("sizeRange");
var speedSlider = document.getElementById("speedRange");
var outputSize = document.getElementById("sizeR");
var outputSpeed = document.getElementById("speedR");

outputSize.innerHTML = sizeSlider.value;
outputSpeed.innerHTML = speedSlider.value;

sizeSlider.oninput = function() {
  outputSize.innerHTML = this.value;
}
speedSlider.oninput = function() {
  outputSpeed.innerHTML = this.value;
}

var unsortedArray = []
var sortArray = []

var mergeSortSteps = []
var myVar

var delay_time=3
var c_delay=0;

function generate () {
  delay_time = parseInt(speedSlider.value)
  c_delay = 0
  clearTimeout(myVar)

    unsortedArray = []
    sortArray = []
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    var dict = {}
    var list = []
    var barList = []

    var barSize = outputSize.innerHTML
    var fraction = 1240 / barSize

    // Generate an array
    for (var i = 0; i < barSize; i++) {
        barList.push(Math.random() * (450 - 50) + 50)
    }

    // Create bar for each element
    for (var i = 0; i < barSize; i++) {
        xResult = fraction * .996

        dict['x'] = xResult * (i + .25)
        dict['y'] = 450 - barList[i]
        dict['width'] = xResult * .81
        dict['height'] = barList[i]

        list.push(dict)
        unsortedArray.push(dict)
        sortArray.push(dict)

        dict = {}
    }

    // Display bars on canvas 
    for (var i = 0; i < barSize; i++) {
        ctx.save();

        ctx.fillStyle = '#00bfff';
        ctx.fillRect(list[i].x, list[i].y, list[i].width, list[i].height);

        // Restore the default state
        ctx.restore();

    }

}


// **************************BUBBLE SORT ALGORITHM**********************************
function BubbleSort() {
    n = sortArray.length

    var temp = []
    var arr1 = []
    var arr2 = []
    
    // Bubblesort Algorithm
    for (var i = 0; i < n - 1; i++) {

        for (var j = 0; j < n - i - 1; j++) {

          if (sortArray[j].height > sortArray[j + 1].height) {
            var xtemp
            arr1 = sortArray[j]
            arr2 = sortArray[j + 1]

            div_update(arr1, arr2)

            temp = sortArray[j]
            sortArray[j] = sortArray[j + 1]
            sortArray[j + 1] = temp

          }
        }
     }
}


// **************************QUICK SORT ALGORITHM**********************************
function partition (low, high) {
  var i = low - 1
  var pivot = sortArray[high].height
  var temp

  for (var n = low; n < high; n++) {
    if (sortArray[n].height < pivot) {
      i = i + 1

      var xtemp
      arr1 = sortArray[i]
      arr2 = sortArray[n]

      div_update(arr1, arr2)

      temp = sortArray[i]
      sortArray[i] = sortArray[n]
      sortArray[n] = temp
    } 
  }
  var xtemp
  arr1 = sortArray[i + 1]
  arr2 = sortArray[high]

  div_update(arr1, arr2)

  var templast = sortArray[i + 1]
  sortArray[i + 1] = sortArray[high]
  sortArray[high] = templast
  return (i + 1)
}


function QuickSort (low, high) {
  if (low < high) {
    var pi = partition(low, high)

    QuickSort(low, pi - 1)
    QuickSort(pi + 1, high)
  }
}

function QuickSortStart() {
  QuickSort(0, sortArray.length-1)
}



// **************************HEAP SORT ALGORITHM**********************************
function heapify (n, i) {
  let largest = i
  let l = 2 * i + 1
  let r = 2 * i + 2

  if (l < n && sortArray[l].height > sortArray[largest].height) {
    largest = l
  }
  if (r < n && sortArray[r].height > sortArray[largest].height) {
    largest = r
  }
  if (largest !== i) {
    var xtemp
    arr1 = sortArray[i]
    arr2 = sortArray[largest]

    div_update(arr1, arr2)

    temp = sortArray[i]
    sortArray[i] = sortArray[largest]
    sortArray[largest] = temp

    heapify(n, largest)
  }
}

function HeapSort () {
  let n = sortArray.length
  let i = Math.floor(n / 2 - 1)
  let k = n - 1

  while (i >= 0) {
    heapify(n, i)
    i--
  }

  while (k >= 0) {
    var xtemp
    arr1 = sortArray[0]
    arr2 = sortArray[k]

    div_update(arr1, arr2)

    temp = sortArray[0]
    sortArray[0] = sortArray[k]
    sortArray[k] = temp
    heapify(k, 0)
    k--
  }

}


function div_update(arr1, arr2)
{
  var xtemp
  myVar = window.setTimeout(function(){
    ctx.save();

    ctx.clearRect(arr1.x, arr1.y, arr1.width + (arr1.width * .2), arr1.height + (arr1.height * .2));
    ctx.clearRect(arr2.x, arr2.y, arr2.width + (arr2.width * .2), arr2.height + (arr2.height * .2));
  
    xtemp = arr1.x
    arr1.x = arr2.x
    arr2.x = xtemp
  
    ctx.fillStyle = '#00bfff';
    ctx.fillRect(arr1.x, arr1.y, arr1.width, arr1.height);
    ctx.fillRect(arr2.x, arr2.y, arr2.width, arr2.height);
  
    ctx.restore();
  },c_delay+=delay_time);
}