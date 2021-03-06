/**
 * Created by jbush_000 on 3/3/2016.
 */
var d3 = require("d3");

var width = 960,
    height = 500;

var randomX = d3.random.normal(width / 2, 80),
    randomY = d3.random.normal(height / 2, 80);

var data = d3.range(2000).map(function () {
    return [
        randomX(),
        randomY()
    ];
});

var x = d3.scale.linear()
    .domain([0, width])
    .range([0, width]);

var y = d3.scale.linear()
    .domain([0, height])
    .range([height, 0]);

var canvas = d3.select("body").append("canvas")
    .attr("width", width)
    .attr("height", height)
    .call(d3.behavior.zoom().x(x).y(y).scaleExtent([1, 8]).on("zoom", zoom))
    .node().getContext("2d");

draw();

function zoom() {
    canvas.clearRect(0, 0, width, height);
    draw();
}

function draw() {
    var i = -1, n = data.length, d, cx, cy;
    canvas.beginPath();
    while (++i < n) {
        d = data[i];
        cx = x(d[0]);
        cy = y(d[1]);
        canvas.moveTo(cx, cy);
        canvas.arc(cx, cy, 2.5, 0, 2 * Math.PI);
    }
    canvas.fill();
}