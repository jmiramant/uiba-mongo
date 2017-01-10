import React                from 'react';
import ReactFauxDOM from 'react-faux-dom';
import * as d3 from 'd3';

export default class RadarChart extends React.Component {
  
  constructor() {
    super()
  }

  setSizeBySkillCount(points, options) {
    switch (points.length) {
      case 1:
        return {...options, extraWidthY: options.height / 2.5 * -1};
      case 2:
        return {...options, height: options.height / 2};
      case 3:
        return {...options, extraWidthY: options.height / 9 * -1};
      case 4:
        return {...options};
      default:
        return options
    }
  }

  setOptions(data) {
    const { points } = this.props;
    const ax = this.setAllAxis(data);

    const defaultOpts = {
      radius: 5,
      width: 450,
      height: 450,
      factor: 1,
      factorLegend: .75,
      levels: 4,
      radians: 2 * Math.PI,
      opacityArea: 0.5,
      toRight: 5,
      translateX: 60,
      translateY: 30, 
      extraWidthX: 110,
      pointsLength: _.max(this.props.points, (p) => {return p.length}).length,
      extraWidthY: 75,
      color: d3.scaleOrdinal(d3.schemeCategory10),
      maxValue: Math.max(0, d3.max(data, function(i){return d3.max(i.map(function(o){return o.value;}))})),
      allAxis: ax,
      total: ax.length
    };

    return this.setSizeBySkillCount(points[0], {...defaultOpts, ...this.props.style});
  }

  parseData() {
    const score = function(proficiency, lengthOfUse){
        const max = 95;
        const x = proficiency;
        const y = lengthOfUse;
        const z = 12*x + 5*y;
        const res = 0.5*((max + z) - Math.abs(max - z));
        return res;
    };

    const flat = _.flatten(this.props.points);
    const p = _.map(this.props.points, (points) => {
      let a = [];
      _.forEach([...flat], (p) => {
        if (points.indexOf(p) > -1 ) {
          a.push({axis: p.type, value: score(p.proficiency, p.lengthOfUse)})
        } else {
          a.push({axis: p.type, value: 0})
        }
      });
      return a
    });
    return p;
  }

  setRadius(options) {
    return options.factor*Math.min(options.width/2, options.height/2);
  }

  setAllAxis(data) {
    return (data[0].map(function(i, j){return i.axis}))
  }

  buildBackgroundRadius(g, options) {
    const radius = this.setRadius(options);
    for (let j=0; j<options.levels-1; j++) {
      const levelFactor = options.factor*radius*((j+1)/options.levels);
      g.selectAll(".levels")
       .data(options.allAxis)
       .enter()
       .append("svg:line")
       .attr("x1", function(d, i){return levelFactor*(1-options.factor*Math.sin(i*options.radians/options.total));})
       .attr("y1", function(d, i){return levelFactor*(1-options.factor*Math.cos(i*options.radians/options.total));})
       .attr("x2", function(d, i){return levelFactor*(1-options.factor*Math.sin((i+1)*options.radians/options.total));})
       .attr("y2", function(d, i){return levelFactor*(1-options.factor*Math.cos((i+1)*options.radians/options.total));})
       .attr("class", "line")
       .style("stroke", "grey")
       .style("stroke-opacity", "0.75")
       .style("stroke-width", "0.3px")
       .attr("transform", "translate(" + (options.width/2-levelFactor) + ", " + (options.height/2-levelFactor) + ")");
    }
  }

  buildLevelMarkers(g, options, data) {
    const radius = this.setRadius(options);
    for (let j=0; j<options.levels; j++) {
      const levelFactor = options.factor*radius*((j+1)/options.levels);
      g.selectAll(".levels")
       .data(data) 
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
  }

  buildPointRanges(g, options, data) {
    let series = 0;
    let dataValues;
    const radius = this.setRadius(options);
    data.forEach(function(y, x){
      dataValues = []
      g.selectAll(".nodes")
      .data(y, function(j, i){

        dataValues.push([
          options.width/2*(1-(parseFloat(Math.max(j.value, 0))/options.maxValue)*options.factor*Math.sin(i*options.radians/options.total)), 
          options.height/2*(1-(parseFloat(Math.max(j.value, 0))/options.maxValue)*options.factor*Math.cos(i*options.radians/options.total))
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
               console.log(d)
               for(let pti=0; pti<d.length; pti++){

                  if (d[pti]) str=str+d[pti][0]+","+d[pti][1]+" ";
               }
               return str;
              })
             .style("fill", options.color(series))
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
        options.width/2*(1-(parseFloat(Math.max(j.value, 0))/options.maxValue)*options.factor*Math.sin(i*options.radians/options.total)), 
        options.height/2*(1-(parseFloat(Math.max(j.value, 0))/options.maxValue)*options.factor*Math.cos(i*options.radians/options.total))
      ]);
      return options.width/2*(1-(Math.max(j.value, 0)/options.maxValue)*options.factor*Math.sin(i*options.radians/options.total));
      })
      .attr("cy", function(j, i){
        return options.height/2*(1-(Math.max(j.value, 0)/options.maxValue)*options.factor*Math.cos(i*options.radians/options.total));
      })
      .attr("data-id", function(j){return j.axis})
      .style("fill", options.color(series)).style("fill-opacity", .9)
      .append("svg:title")
      .text(function(j){return Math.max(j.value, 0)});

      series++;
    });
  }

  textWrap(text, width) {
    text.each(function() {
      var text = d3.select(this),
          words = text.text().split(/\s+/).reverse(),
          word,
          line = [],
          lineNumber = 0,
          lineHeight = 1.1, // ems
          y = text.attr("y"),
          dy = parseFloat(text.attr("dy")),
          tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
      while (word = words.pop()) {
        line.push(word);
        tspan.text(line.join(" "));
        if (tspan.node().getComputedTextLength() > width) {
          line.pop();
          tspan.text(line.join(" "));
          line = [word];
          tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
        }
      }
    });
  }

  buildBackgroundLines (g, options) {
    
    const axis = g.selectAll(".axis")
        .data(options.allAxis)
        .enter()
        .append("g")
        .attr("class", "axis");

    axis.append("line")
      .attr("x1", options.width/2)
      .attr("y1", options.height/2)
      .attr("x2", function(d, i){return options.width/2*(1-options.factor*Math.sin(i*options.radians/options.total));})
      .attr("y2", function(d, i){return options.height/2*(1-options.factor*Math.cos(i*options.radians/options.total));})
      .attr("class", "line")
      .style("stroke", "grey")
      .style("stroke-width", "1px");

    const wrap = (text, width) => {
        text.each(function() {
            var text = d3.select(this),
            words = text.text().split(/\s+/).reverse(),
            word,
            line = [],
            lineNumber = 0,
            y = text.attr("y"),
            dy = parseFloat(text.attr("dy")),
            lineHeight = 1.1, // ems
            tspan = text.text(null).append("tspan").attr("x", function(d) { return d.children || d._children ? -10 : 10; }).attr("y", y).attr("dy", dy + "em");     
            while (word = words.pop()) {
                line.push(word);
                tspan.text(line.join(" "));
                var textWidth = tspan.node().getComputedTextLength();
                if (tspan.node().getComputedTextLength() > width) {
                    line.pop();
                    tspan.text(line.join(" "));
                    line = [word];
                    ++lineNumber;
                    tspan = text.append("tspan").attr("x", function(d) { return d.children || d._children ? -10 : 10; }).attr("y", 0).attr("dy", lineNumber * lineHeight + dy + "em").text(word);
                }
            }
        });
    }

    axis.append("text")
      .attr("class", "legend")
      .text(function(d){
        return d
      })
      .style("font-size", "10px")

      .style('width', '30px')
      .attr("text-anchor", "middle")
      .attr("dy", "1.5em")
      .attr("transform", function(d, i){ 
        let x = 0;
        let y = -10
        if (i % 2 !== 0) {
          i === 1 ? x = 10 : x = -10
          y = -30
        }
        return "translate(" + x + ", " + y + ")"
      })
      .attr("x", function(d, i){return options.width/2*(1-options.factorLegend*Math.sin(i*options.radians/options.total))-60*Math.sin(i*options.radians/options.total);})
      .attr("y", function(d, i){return options.height/2*(1-Math.cos(i*options.radians/options.total))-20*Math.cos(i*options.radians/options.total);});
  
  }

  chartBase() {
    const { points } = this.props;
    const data = this.parseData();
    const options = this.setOptions(data);
    const radius = this.setRadius(options);
    const Format = d3.format('%');

    const svgNode = ReactFauxDOM.createElement('div');
    
    svgNode.setAttribute('class', 'radar-chart-container')
    svgNode.style.setProperty('text-align', 'center')

    const g = d3.select(svgNode)
        .append("svg")
        .attr("width", options.width+options.extraWidthX)
        .attr("height", options.height+options.extraWidthY)
        .append("g")
        .attr("transform", "translate(" + options.translateX + "," + options.translateY + ")");

    this.buildBackgroundRadius(g, options);
    this.buildLevelMarkers(g, options, data);
    this.buildBackgroundLines(g, options);
    this.buildPointRanges(g, options, data);

    return svgNode.toReact();
  }

  render() {
    if (this.props.points.length > 0) {
      return (this.chartBase());
    } else {
      return (null);
    }
  }
}