let years = ["2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018"];
let industries = Object.keys(statedata);

// function to get average
const getAverage = arr => arr.reduce((a,b) => a + b, 0) / arr.length;

// bar graph
function getYear(year){
  let average = [];
  
  industries.forEach(industry => {  
    let stateWages = Object.values(statedata[industry][year]);

    average.push(getAverage(stateWages));
  });

  return average;
};

function init() {
    data = [{
      x: industries,
      y: getYear("2008"),
      marker:{
        color: ['#f0932b',
        '#eb4d4b',
        '#6ab04c',
        '#7ed6df',
        '#e056fd',
        '#686de0',
        '#30336b',
        '#22a6b3',
        '#ffbe76'
        ]
      },
      type: "bar",
      transforms: [{
        type: 'sort',
        target: 'y',
        order: 'descending'}]
    }];
    var barlayout = {
      title: "Wages by Industry",
      showlegend: false
    };

    var BAR = document.getElementById("bar_plot");
    Plotly.plot(BAR, data, barlayout);
  }
  
  function updatePlotly(newx, newy) {
    var BAR = document.getElementById("bar_plot");
  
    // Note the extra brackets around 'newx' and 'newy'
    Plotly.restyle(BAR, "x", [newx]);
    Plotly.restyle(BAR, "y", [newy]);
  }
  
  // Only works when you try to switch the drop downs. Initially it'll be init, then after you click it'll be getData
  function getData(dataset) {
  
    // Initialize empty arrays to contain our axes
    var x = [];
    var y = [];
  
    // Fill the x and y arrays as a function of the selected dataset
    switch (dataset) {
      case "2008": // we want this to be the same as the first data set up there
        x = industries;
        y = getYear("2008");
        break;
      case "2009":
        x = industries;
        y = getYear("2009");
        break;
      case "2010":
        x = industries;
        y = getYear("2010");
        break;
      case "2011":
        x = industries;
        y = getYear("2011");
        break;
      case "2012":
        x = industries;
        y = getYear("2012");
        break;
      case "2013":
        x = industries;
        y = getYear("2013");
        break;
      case "2014":
        x = industries;
        y = getYear("2014");
        break;
      case "2015":
        x = industries;
        y = getYear("2015");
        break;
      case "2016":
        x = industries;
        y = getYear("2016");
        break;
      case "2017":
        x = industries;
        y = getYear("2017");
        break;
      case "2018":
        x = industries;
        y = getYear("2018");
        break;
      default:
        x = industries;
        y = getYear("2008");
        break;
    };
  
    updatePlotly(x, y);
  };
  
  init();

