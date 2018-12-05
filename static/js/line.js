// All Industries
var ConstructionTrace = {
  x: years,
  y: inflation(getIndustry("Construction")),
  type: "scatter",
  name: "Construction",
  marker:{
    color: '#f0932b'
  }
}
var FinancialTrace = {
  x: years,
  y: inflation(getIndustry("Financial Activities")),
  type: "scatter",
  name: "Financial Activities",
  marker:{
    color: '#eb4d4b'
  }
}
var LeisureTrace = {
  x: years,
  y: inflation(getIndustry("Leisure and Hospitality")),
  type: "scatter",
  name: "Leisure and Hospitality",
  marker:{
    color: '#6ab04c'
  }
}
var ManufacturingTrace = {
  x: years,
  y: inflation(getIndustry("Manufacturing")),
  type: "scatter",
  name: "Manufacturing",
  marker:{
    color: '#7ed6df'
  }
}
var OtherTrace = {
  x: years,
  y: inflation(getIndustry("Other Services")),
  type: "scatter",
  name: "Other Services",
  marker:{
    color: '#e056fd'
  }
}
var ProfTrace = {
  x: years,
  y: inflation(getIndustry("Professional and Business Services")),
  type: "scatter",
  name: "Professional and Business Services",
  marker:{
    color: '#686de0'
  }
}
var TradeTrace = {
  x: years,
  y: inflation(getIndustry("Trade Transportation and Utilities")),
  type: "scatter",
  name: "Trade Transportation and Utilities",
  marker:{
    color: '#30336b'
  }
}
var InformationTrace = {
  x: years,
  y: inflation(getIndustry("Information")),
  type: "scatter",
  name: "Information",
  marker:{
    color: '#22a6b3'
  }
}
var MiningTrace = {
  x: years,
  y: inflation(getIndustry("Mining and Logging")),
  type: "scatter",
  name: "Mining and Logging",
  marker:{
    color: '#ffbe76'
  }
}

var alldata = [ConstructionTrace, FinancialTrace, LeisureTrace, ManufacturingTrace, OtherTrace, ProfTrace, TradeTrace, InformationTrace, MiningTrace];

window.onresize = function() {
  Plotly.relayout(line_plot, {
    width: 0.9 * window.innerWidth,
    height: 0.9 * window.innerHeight
  })
}


// line graph
function getIndustry(industry){
  
  let industrySelection = Object.values(statedata[industry]);
  let average = [];

  for (let i = 0; i < industrySelection.length; i++){
    let year = Object.values(Object.values(industrySelection[i]));
    
    average.push(getAverage(year));
  };

  return average
};

function inflation(wageList){
  adjustedList = []

  adjustedList.push(wageList[0]*1.19)
  adjustedList.push(wageList[1]*1.19)
  adjustedList.push(wageList[2]*1.16)
  adjustedList.push(wageList[3]*1.14)
  adjustedList.push(wageList[4]*1.11)
  adjustedList.push(wageList[5]*1.09)
  adjustedList.push(wageList[6]*1.08)
  adjustedList.push(wageList[7]*1.08)
  adjustedList.push(wageList[8]*1.06)
  adjustedList.push(wageList[9]*1.04)
  adjustedList.push(wageList[10])

  return adjustedList
};


function init() {
  data = alldata;

  var layout = {
    title: "Wages by Year",
    showlegend: true
  };
  
    
  var LINE = document.getElementById("line_plot");
  Plotly.plot(LINE, data, layout);
  }
  

  //drop down graphs - not using

  // function updatePlotly(newx, newy) {
  //   var LINE = document.getElementById("plot");
  //   var newlayout = {showlegend: false};
  
  //   // Note the extra brackets around 'newx' and 'newy'
  //   Plotly.restyle(LINE, "x", [newx]);
  //   Plotly.restyle(LINE, "y", [newy]);
  // }
  
  // // Only works when you try to switch the drop downs. Initially it'll be init, then after you click it'll be getData
  // function getData(dataset) {
  
  //   // Initialize empty arrays to contain our axes
  //   var x = [];
  //   var y = [];
  
  //   // Fill the x and y arrays as a function of the selected dataset
  //   switch (dataset) {

  //   case "Construction": // we want this to be the same as the first data set up there
  //     x = years;
  //     y = getIndustry("Construction");
  //     break;
  //   case "Financial Activities":
  //     x = years;
  //     y = getIndustry("Financial Activities");
  //     break;
  //   case "Leisure and Hospitality":
  //     x = years;
  //     y = getIndustry("Leisure and Hospitality")
  //     break;
  //   case "Manufacturing":
  //     x = years;
  //     y = getIndustry("Manufacturing")
  //     break;
  //   case "Other Services":
  //     x = years;
  //     y = getIndustry("Other Services")
  //     break;
  //   case "Professional and Business Services":
  //     x = years;
  //     y = getIndustry("Professional and Business Services")
  //     break;
  //   case "Trade Transportation and Utilities":
  //     x = years;
  //     y = getIndustry("Trade Transportation and Utilities")
  //     break;
  //   case "Information":
  //     x = years;
  //     y = getIndustry("Information")
  //     break;
  //   case "Mining and Logging":
  //     x = years;
  //     y = getIndustry("Mining and Logging")
  //     break;
  //   default:
  //     x = years;
  //     y = getIndustry("Construction")
  //     break;
  //       }
  
  //   updatePlotly(x, y);
  // }
  
  init();