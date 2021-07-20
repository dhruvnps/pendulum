var svg = d3
    .select('.canvas')
    .append('svg')
    .attr('width', '100%')
    .attr('height', '100%')

var width = parseInt(svg.style('width'), 10)
var height = parseInt(svg.style('height'), 10)

var d = d3.path()
var path = svg.append('path').style('stroke', 'silver').style('fill', 'none')

var l1 = svg.append('line').style('stroke', 'black')
var l2 = svg.append('line').style('stroke', 'black')

var c1 = svg.append('circle').style('fill', 'black')
var c2 = svg.append('circle').style('fill', 'black')


var r1 = (Math.min(width, height) / 4) - 10
var r2 = (Math.min(width, height) / 4) - 10
var m1 = 5
var m2 = 5
var a1 = Math.PI / 2
var a2 = Math.PI / 2
var a1_v = 0
var a2_v = 0
var g = 1
var cx = width / 2
var cy = height / 2

function draw(first = true) {
    var n1 = -g * (2 * m1 + m2) * Math.sin(a1)
    var n2 = -m2 * g * Math.sin(a1 - 2 * a2)
    var n3 = -2 * Math.sin(a1 - a2) * m2
    var n4 = a2_v * a2_v * r2 + a1_v * a1_v * r1 * Math.cos(a1 - a2)
    var div = r1 * (2 * m1 + m2 - m2 * Math.cos(2 * a1 - 2 * a2))
    var a1_a = (n1 + n2 + n3 * n4) / div

    n1 = 2 * Math.sin(a1 - a2)
    n2 = (a1_v * a1_v * r1 * (m1 + m2))
    n3 = g * (m1 + m2) * Math.cos(a1)
    n4 = a2_v * a2_v * r2 * m2 * Math.cos(a1 - a2)
    div = r2 * (2 * m1 + m2 - m2 * Math.cos(2 * a1 - 2 * a2))
    var a2_a = (n1 * (n2 + n3 + n4)) / div

    var x1 = r1 * Math.sin(a1)
    var y1 = r1 * Math.cos(a1)

    var x2 = x1 + r2 * Math.sin(a2)
    var y2 = y1 + r2 * Math.cos(a2)

    c1.attr('cx', x1 + cx).attr('cy', y1 + cy).attr('r', m1)
    c2.attr('cx', x2 + cx).attr('cy', y2 + cy).attr('r', m2)

    l1.attr('x1', cx).attr('y1', cy).attr('x2', x1 + cx).attr('y2', y1 + cy)
    l2.attr('x1', x1 + cx).attr('y1', y1 + cy).attr('x2', x2 + cx).attr('y2', y2 + cy)

    if (first) {
        d.moveTo(x2 + cx, y2 + cy)
    } else {
        d.lineTo(x2 + cx, y2 + cy)
    }
    path.attr('d', d)

    a1_v += a1_a
    a2_v += a2_a
    a1 += a1_v
    a2 += a2_v

    setTimeout(() => draw(false), 10)
}

draw()