const data = [
    {"x": 1.0, "y": 3.0}, {"x": 1.2, "y": 2.5}, {"x": 1.4, "y": 2.5}, {"x": 1.6, "y": 2.5},
    {"x": 1.5, "y": 3.2}, {"x": 1.7, "y": 3.5}, {"x": 1.8, "y": 3.0}, {"x": 1.9, "y": 3.0},
    {"x": 2.0, "y": 4.0}, {"x": 2.1, "y": 3.5}, {"x": 2.2, "y": 4.0}, {"x": 2.3, "y": 3.5},
    {"x": 2.2, "y": 4.5}, {"x": 2.4, "y": 4.5}, {"x": 2.5, "y": 4.0}, {"x": 2.6, "y": 4.0},
    {"x": 2.6, "y": 5.0}, {"x": 2.8, "y": 5.5}, {"x": 3.0, "y": 5.0}, {"x": 3.1, "y": 6.0},
    {"x": 3.0, "y": 8.5}, {"x": 3.2, "y": 9.0}, {"x": 3.2, "y": 10.0}, {"x": 3.4, "y": 9.5},
    {"x": 3.5, "y": 11.0}, {"x": 3.5, "y": 12.0}, {"x": 3.6, "y": 11.5}, {"x": 3.8, "y": 11.0}, {"x": 4.0, "y": 12.5}, 
    {"x": 4.5, "y": 14.5}, {"x": 4.6, "y": 13.5}, {"x": 4.8, "y": 14.0},
    {"x": 5.0, "y": 14.0}, {"x": 5.0, "y": 15.5}, {"x": 5.2, "y": 15.0}, {"x": 5.5, "y": 14.5}
];

const margin = {top: 30, right: 10, bottom: 0, left: 50};
const width = 700 - margin.left - margin.right;
const height = 450 - margin.top - margin.bottom;

const x = d3.scaleLinear()
.domain([0, 6])
.range([0, width]);

const y = d3.scaleLinear()
.domain([0, 20])
.range([height, 0]);

const xAxis = d3.axisBottom(x);
const yAxis = d3.axisLeft(y);

const svg = d3.select("body").append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.append("g")
.attr("transform", "translate(0," + height + ")")
.call(xAxis);

svg.append("g")
.call(yAxis);

const meanY = d3.mean(data, d => d.y);
const slope = 3.535;
const intercept = -3.011;
const predictY = (valX) => slope * valX + intercept;

svg.append('line')
.attr('x1', x(0))
.attr('x2', x(6))
.attr('y1', y(meanY))
.attr('y2', y(meanY))
.attr('stroke', '#81142C')
.attr('stroke-width', 2)
.attr('stroke-dasharray', '5,5')
.attr('opacity', 0.7);

svg.append('text')
.attr('x', x(5.7))
.attr('y', y(meanY) - 8)
.text('Mean (ȳ)')
.style('fill', '#81142C')
.style('font-size', '12px')
.style('font-weight', 'bold');

svg.append('line')
.attr('x1', x(1))
.attr('x2', x(5.5))
.attr('y1', y(predictY(1)))
.attr('y2', y(predictY(5.5)))
.attr('stroke', '#B0D19A')
.attr('stroke-width', 3);

svg.append('text')
.attr('x', x(5.6))
.attr('y', y(predictY(5.2)) - 10)
.text('Regression Line')
.style('fill', '#B0D19A')
.style('font-size', '12px')

svg.selectAll("circle")
.data(data)
.enter()
.append("circle")
.attr("cx", d => x(d.x))
.attr("cy", d => y(d.y))
.attr("r", 4)
.attr("fill", "#A0AFB5")
.attr("opacity", 0.6);

const focusPoint = data.find(d => d.x === 4.0 && d.y === 12.5);
const xPos = x(focusPoint.x);
const yPoint = y(focusPoint.y);
const yReg = y(predictY(focusPoint.x));
const yMean = y(meanY);

svg.append("circle")
.attr("cx", xPos)
.attr("cy", yPoint)
.attr("r", 6)
.attr("fill", "orange")
.attr("stroke", "gray")
.attr("stroke-width", 2);

svg.append("line")
.attr("x1", xPos - 8)
.attr("x2", xPos - 8)
.attr("y1", yPoint)
.attr("y2", yMean)
.attr("stroke", "purple")
.attr("stroke-width", 3);

svg.append("text")
.attr("x", xPos - 40)
.attr("y", (yPoint + yMean) / 1.8)
.text("SST")
.style("fill", "purple")
.style("font-size", "13px")
.style("font-weight", "bold");

svg.append("line")
.attr("x1", xPos + 8)
.attr("x2", xPos + 8)
.attr("y1", yPoint)
.attr("y2", yReg-5)
.attr("stroke", "#A3D9D9")
.attr("stroke-width", 3);

svg.append("text")
.attr("x", xPos + 15)
.attr("y", (yPoint + yReg) / 2.2)
.text("SSE")
.style("fill", "#A3D9D9")
.style("font-size", "13px")
.style("font-weight", "bold");

svg.append("line")
.attr("x1", xPos+3)
.attr("x2", xPos+3)
.attr("y1", yReg)
.attr("y2", yMean)
.attr("stroke", "#B69AD2")
.attr("stroke-width", 3);

svg.append("text")
.attr("x", xPos + 15)
.attr("y", (yReg + yMean) / 2)
.text("SSR")
.style("fill", "#B69AD2")
.style("font-size", "13px")
.style("font-weight", "bold");