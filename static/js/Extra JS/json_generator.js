// var result;

// d3.csv('labordata.csv', function(data) {
//     result=data;
// });
// setTimeout(function(){
//     console.log(result);
//     },200);

// var elems = {};
// for (var i = 0; i < result.length; i++)
// {
//     elems[result[i].State] = result[i].Industry;
// }
// console.log(elems)

elems = []

d3.csv("labordata.csv", function(data) {
    data.forEach(function(d) {
        State = d.State,
        Industry = d.Industry,
        d.Year = +d.Year,
        d.Value = +d.Value;

      });
    //   elems.push(data)
    //   console.log(elems)

    // var byindustry = d3.nest()
    //     .key(function(d) { return d.State; })
    //     .key(function(d) { return d.Industry; })
    //     .key(function(d) { return d.Year;})
    //     .rollup(function(v) { return d3.sum(v, function(d) { return d.Value; })})
    //     .object(data);
    // console.log(JSON.stringify(byindustry))

    //OTHER TEST SET UP
    // var byindustry = d3.nest()
    //     .key(function(d) { return d.Industry; })
    //     .key(function(d) { return d.Year; })
    //     .key(function(d) { return d.State;})
    //     .rollup(function(v) { return d3.sum(v, function(d) { return d.Value; })})
    //     .object(data);
    // console.log(JSON.stringify(byindustry))

    var byindustry = d3.nest()
        .key(function(d) { return d.State; })
        .key(function(d) { return d.Industry; })
        .key(function(d) { return d.Year;})
        // .rollup(function(v) { return d3.sum(v, function(d) { return d.Value; })})
        .entries(data)
        .map(function(group) {
            return {
              State: group.key,
            //   Industry: group.values.State,
            //   Year: group.values.Year,
            }
        });
        console.log(JSON.stringify(byindustry))
    });

