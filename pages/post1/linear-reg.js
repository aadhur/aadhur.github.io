// D3 visualization
const data = [
    {x: 0.0, y: 1.4967141530112327},
    {x: 1.1111111111111112, y: 3.0839579210510375},
    {x: 2.2222222222222223, y: 6.092132982545137},
    {x: 3.3333333333333335, y: 9.189696523074693},
    {x: 4.444444444444445, y: 9.654735514165553},
    {x: 5.555555555555555, y: 11.87697415416193},
    {x: 6.666666666666667, y: 15.912546148840725},
    {x: 7.777777777777779, y: 17.322990284708467},
    {x: 8.88888888888889, y: 18.308303391842827},
    {x: 10.0, y: 21.542560043585965}
];

const margin = {top: 20, right: 20, bottom: 30, left: 40};
const width = 600 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

const svg = d3.select("svg")
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.x) * 1.1])
    .range([0, width]);

const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.y) * 1.1])
    .range([height, 0]);

svg.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(xScale));

svg.append("g")
    .call(d3.axisLeft(yScale));

svg.selectAll(".data-point")
    .data(data)
    .enter()
    .append("circle")
    .attr("class", "data-point")
    .attr("cx", d => xScale(d.x))
    .attr("cy", d => yScale(d.y))
    .attr("r", 5);

const fitLine = svg.append("line")
    .attr("class", "fit-line");

const residuals = svg.selectAll(".residual")
    .data(data)
    .enter()
    .append("line")
    .attr("class", "residual");

const slopeSlider = document.getElementById("slope");
const interceptSlider = document.getElementById("intercept");
const slopeValue = document.getElementById("slope-value");
const interceptValue = document.getElementById("intercept-value");
const wText = document.getElementById("w-text");
const bText = document.getElementById("b-text");
const mseValue = document.getElementById("mse-value");

function update() {
    const w = parseFloat(slopeSlider.value);
    const b = parseFloat(interceptSlider.value);

    slopeValue.textContent = w.toFixed(2);
    interceptValue.textContent = b.toFixed(2);
    wText.textContent = w.toFixed(2);
    bText.textContent = b.toFixed(2);

    fitLine
        .attr("x1", xScale(0))
        .attr("y1", yScale(b))
        .attr("x2", xScale(d3.max(data, d => d.x)))
        .attr("y2", yScale(w * d3.max(data, d => d.x) + b));

    residuals
        .attr("x1", d => xScale(d.x))
        .attr("y1", d => yScale(d.y))
        .attr("x2", d => xScale(d.x))
        .attr("y2", d => yScale(w * d.x + b));

    const mse = data.reduce((sum, d) => sum + Math.pow(d.y - (w * d.x + b), 2), 0) / data.length;
    mseValue.textContent = mse.toFixed(4);
}

update();

slopeSlider.addEventListener("input", update);
interceptSlider.addEventListener("input", update);
