import React                from 'react';
import ReactFauxDOM from 'react-faux-dom';
import * as d3 from 'd3';

export default class RadarChart extends React.Component {
  
  constructor() {
    super()
  }

  render() {

    const defaultOpts = {
      radius: 5,
      width: 450,
      height: 450,
      factor: 1,
      factorLegend: .85,
      levels: 4,
      maxValue: 0,
      radians: 2 * Math.PI,
      opacityArea: 0.5,
      toRight: 5,
      translateX: 80,
      translateY: 30,
      extraWidthX: 100,
      extraWidthY: 100,
      color: d3.scaleOrdinal(d3.schemeCategory10)
    };

    const options = Object.assign({}, defaultOpts, this.props.style);
    const score = function(proficiency, lengthOfUse){
        const max = 95;
        const x = proficiency;
        const y = lengthOfUse;
        const z = 12*x + 5*y;
        const res = 0.5*((max + z) - Math.abs(max - z));
        return res;
    };
    const dataValues = [];
    const parsed = this.props.points.map( (p) => {
      return {axis: p.type, value: score(p.proficiency, p.lengthOfUse)};
    });
    const data = [
      parsed
    ];


    options.maxValue = Math.max(options.maxValue, d3.max(data, function(i){return d3.max(i.map(function(o){return o.value;}))}));
    const allAxis = (data[0].map(function(i, j){return i.axis}));
    const total = allAxis.length;
    const radius = options.factor*Math.min(options.width/2, options.height/2);
    const Format = d3.format('%');

    const svgNode = ReactFauxDOM.createElement('div');
    
    const g = d3.select(svgNode)
        .append("svg")
        .attr("width", options.width+options.extraWidthX)
        .attr("height", options.height+options.extraWidthY)
        .append("g")
        .attr("transform", "translate(" + options.translateX + "," + options.translateY + ")");

    for (let j=0; j<options.levels-1; j++) {
      const levelFactor = options.factor*radius*((j+1)/options.levels);
      g.selectAll(".levels")
       .data(allAxis)
       .enter()
       .append("svg:line")
       .attr("x1", function(d, i){return levelFactor*(1-options.factor*Math.sin(i*options.radians/total));})
       .attr("y1", function(d, i){return levelFactor*(1-options.factor*Math.cos(i*options.radians/total));})
       .attr("x2", function(d, i){return levelFactor*(1-options.factor*Math.sin((i+1)*options.radians/total));})
       .attr("y2", function(d, i){return levelFactor*(1-options.factor*Math.cos((i+1)*options.radians/total));})
       .attr("class", "line")
       .style("stroke", "grey")
       .style("stroke-opacity", "0.75")
       .style("stroke-width", "0.3px")
       .attr("transform", "translate(" + (options.width/2-levelFactor) + ", " + (options.height/2-levelFactor) + ")");
    }

    for (let j=0; j<options.levels; j++) {
      const levelFactor = options.factor*radius*((j+1)/options.levels);
      g.selectAll(".levels")
       .data(data[0]) //dummy data
       .enter()
       .append("svg:text")
       .attr("x", function(d){return levelFactor*(1-options.factor*Math.sin(0));})
       .attr("y", function(d){return levelFactor*(1-options.factor*Math.cos(0));})
       .attr("class", "legend")
       .style("font-family", "sans-serif")
       .style("font-size", "10px")
       .attr("transform", "translate(" + (options.width/2-levelFactor + options.toRight) + ", " + (options.height/2-levelFactor) + ")")
       .attr("fill", "#737373")
       .text(Math.floor((j+1)*options.maxValue/options.levels) + '%');
    }
    
    let series = 0;

    const axis = g.selectAll(".axis")
        .data(allAxis)
        .enter()
        .append("g")
        .attr("class", "axis");

    axis.append("line")
      .attr("x1", options.width/2)
      .attr("y1", options.height/2)
      .attr("x2", function(d, i){return options.width/2*(1-options.factor*Math.sin(i*options.radians/total));})
      .attr("y2", function(d, i){return options.height/2*(1-options.factor*Math.cos(i*options.radians/total));})
      .attr("class", "line")
      .style("stroke", "grey")
      .style("stroke-width", "1px");

    axis.append("text")
      .attr("class", "legend")
      .text(function(d){return d})
      .style("font-family", "sans-serif")
      .style("font-size", "11px")
      .attr("text-anchor", "middle")
      .attr("dy", "1.5em")
      .attr("transform", function(d, i){return "translate(0, -10)"})
      .attr("x", function(d, i){return options.width/2*(1-options.factorLegend*Math.sin(i*options.radians/total))-60*Math.sin(i*options.radians/total);})
      .attr("y", function(d, i){return options.height/2*(1-Math.cos(i*options.radians/total))-20*Math.cos(i*options.radians/total);});

    data.forEach(function(y, x){
      g.selectAll(".nodes")
      .data(y, function(j, i){
        dataValues.push([
        options.width/2*(1-(parseFloat(Math.max(j.value, 0))/options.maxValue)*options.factor*Math.sin(i*options.radians/total)), 
        options.height/2*(1-(parseFloat(Math.max(j.value, 0))/options.maxValue)*options.factor*Math.cos(i*options.radians/total))
        ]);
      });
      dataValues.push(dataValues[0]);
      g.selectAll(".area")
             .data([dataValues])
             .enter()
             .append("polygon")
             .attr("class", "radar-chart-serie"+series)
             .style("stroke-width", "2px")
             .style("stroke", options.color(series))
             .attr("points",function(d) {
               var str="";
               for(let pti=0; pti<d.length; pti++){
                  if (d[pti]) str=str+d[pti][0]+","+d[pti][1]+" ";
               }
               return str;
              })
             .style("fill", function(j, i){return options.color(series)})
             .style("fill-opacity", options.opacityArea)
             .on('mouseover', function (d){
                let z = "polygon."+d3.select(this).attr("class");
                g.selectAll("polygon")
                 .transition(200)
                 .style("fill-opacity", 0.1); 
                g.selectAll(z)
                 .transition(200)
                 .style("fill-opacity", .7);
                })
             .on('mouseout', function(){
                      g.selectAll("polygon")
                       .transition(200)
                       .style("fill-opacity", options.opacityArea);
             });
      series++;
    });
    series=0;

    let tooltip;

    data.forEach(function(y, x){
      g.selectAll(".nodes")
      .data(y).enter()
      .append("svg:circle")
      .attr("class", "radar-chart-serie"+series)
      .attr('r', options.radius)
      .attr("alt", function(j){return Math.max(j.value, 0)})
      .attr("cx", function(j, i){
        dataValues.push([
        options.width/2*(1-(parseFloat(Math.max(j.value, 0))/options.maxValue)*options.factor*Math.sin(i*options.radians/total)), 
        options.height/2*(1-(parseFloat(Math.max(j.value, 0))/options.maxValue)*options.factor*Math.cos(i*options.radians/total))
      ]);
      return options.width/2*(1-(Math.max(j.value, 0)/options.maxValue)*options.factor*Math.sin(i*options.radians/total));
      })
      .attr("cy", function(j, i){
        return options.height/2*(1-(Math.max(j.value, 0)/options.maxValue)*options.factor*Math.cos(i*options.radians/total));
      })
      .attr("data-id", function(j){return j.axis})
      .style("fill", options.color(series)).style("fill-opacity", .9)
      .on('mouseover', function (d){
            const newX = parseFloat(d3.select(this).attr('cx')) - 10;
            const newY = parseFloat(d3.select(this).attr('cy')) - 5;
            
            tooltip
              .attr('x', newX)
              .attr('y', newY)
              .text(Format(d.value))
              .transition(200)
              .style('opacity', 1);
              
            const z = "polygon."+d3.select(this).attr("class");
            g.selectAll("polygon")
              .transition(200)
              .style("fill-opacity", 0.1); 
            g.selectAll(z)
              .transition(200)
              .style("fill-opacity", .7);
            })
      .on('mouseout', function(){
            tooltip
              .transition(200)
              .style('opacity', 0);
            g.selectAll("polygon")
              .transition(200)
              .style("fill-opacity", options.opacityArea);
            })
      .append("svg:title")
      .text(function(j){return Math.max(j.value, 0)});

      series++;
    });
    
    tooltip = g.append('text')
     .style('opacity', 0)
     .style('font-family', 'sans-serif')
     .style('font-size', '13px');

    return svgNode.toReact();
  }
}