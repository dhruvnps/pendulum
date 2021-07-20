var svg = d3
    .select('.canvas')
    .append('svg')
    .attr('width', '100%')
    .attr('height', '100%')

var width = parseInt(svg.style('width'), 10),
    height = parseInt(svg.style('height'), 10)

var d = d3.path(),
    path = svg.append('path').style('stroke', 'silver').style('fill', 'none')

var l1 = svg.append('line').style('stroke', 'black'),
    l2 = svg.append('line').style('stroke', 'black')

var c1 = svg.append('circle').style('fill', 'black'),
    c2 = svg.append('circle').style('fill', 'black')

var r1 = (Math.min(width, height) / 4) - 10,
    r2 = (Math.min(width, height) / 4) - 10,
    m1 = 5,
    m2 = 5,
    a1 = Math.PI / 2,
    a2 = Math.PI / 2,
    a1_v = 0,
    a2_v = 0,
    g = 1,
    ox = width / 2,
    oy = height / 2

function draw(init = true) {
    var n1, n2, n3, n4, n5

    n1 = -g * (2 * m1 + m2) * Math.sin(a1)
    n2 = -m2 * g * Math.sin(a1 - 2 * a2)
    n3 = -2 * Math.sin(a1 - a2) * m2
    n4 = a2_v * a2_v * r2 + a1_v * a1_v * r1 * Math.cos(a1 - a2)
    n5 = r1 * (2 * m1 + m2 - m2 * Math.cos(2 * a1 - 2 * a2))
    var a1_a = (n1 + n2 + n3 * n4) / n5

    n1 = 2 * Math.sin(a1 - a2)
    n2 = (a1_v * a1_v * r1 * (m1 + m2))
    n3 = g * (m1 + m2) * Math.cos(a1)
    n4 = a2_v * a2_v * r2 * m2 * Math.cos(a1 - a2)
    n5 = r2 * (2 * m1 + m2 - m2 * Math.cos(2 * a1 - 2 * a2))
    var a2_a = (n1 * (n2 + n3 + n4)) / n5

    var x1 = r1 * Math.sin(a1) + ox,
        y1 = r1 * Math.cos(a1) + oy

    var x2 = x1 + r2 * Math.sin(a2),
        y2 = y1 + r2 * Math.cos(a2)

    c1.attr('cx', x1).attr('cy', y1).attr('r', m1)
    c2.attr('cx', x2).attr('cy', y2).attr('r', m2)

    l1.attr('x1', ox).attr('y1', oy).attr('x2', x1).attr('y2', y1)
    l2.attr('x1', x1).attr('y1', y1).attr('x2', x2).attr('y2', y2)

    if (init) {
        d.moveTo(x2, y2)
    } else {
        d.lineTo(x2, y2)
    }
    path.attr('d', d)

    a1_v += a1_a
    a2_v += a2_a
    a1 += a1_v
    a2 += a2_v

    setTimeout(() => draw(false), 10)
}

draw()