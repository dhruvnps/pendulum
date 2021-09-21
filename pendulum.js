class Pendulum {

    constructor(color, delay, decay, offset = 0) {
        var p = this

        p.color = color
        p.delay = delay
        p.decay = decay

        var svg = d3.select('svg')

        p.l1 = svg
            .append('line')
            .style('stroke', 'black')
        p.l2 = svg
            .append('line')
            .style('stroke', 'black')

        p.c1 = svg
            .append('circle')
            .style('fill', 'black')
        p.c2 = svg
            .append('circle')
            .style('fill', 'black')

        var width = parseInt(svg.style('width'), 10),
            height = parseInt(svg.style('height'), 10)

        p.r1 = (Math.min(width, height) / 4) - 10
        p.r2 = (Math.min(width, height) / 4) - 10
        p.m1 = 5
        p.m2 = 5
        p.a1 = Math.PI / 2
        p.a2 = (Math.PI / 2) + offset
        p.a1_v = 0
        p.a2_v = 0
        p.g = 1
        p.ox = width / 2
        p.oy = height / 2
        p.px = null
        p.py = null

        p.draw()
    }

    draw(init = true) {
        var p = this
        var n1, n2, n3, n4, n5

        n1 = -p.g * (2 * p.m1 + p.m2) * Math.sin(p.a1)
        n2 = -p.m2 * p.g * Math.sin(p.a1 - 2 * p.a2)
        n3 = -2 * Math.sin(p.a1 - p.a2) * p.m2
        n4 = p.a2_v * p.a2_v * p.r2 + p.a1_v * p.a1_v * p.r1 * Math.cos(p.a1 - p.a2)
        n5 = p.r1 * (2 * p.m1 + p.m2 - p.m2 * Math.cos(2 * p.a1 - 2 * p.a2))
        var a1_a = (n1 + n2 + n3 * n4) / n5

        n1 = 2 * Math.sin(p.a1 - p.a2)
        n2 = (p.a1_v * p.a1_v * p.r1 * (p.m1 + p.m2))
        n3 = p.g * (p.m1 + p.m2) * Math.cos(p.a1)
        n4 = p.a2_v * p.a2_v * p.r2 * p.m2 * Math.cos(p.a1 - p.a2)
        n5 = p.r2 * (2 * p.m1 + p.m2 - p.m2 * Math.cos(2 * p.a1 - 2 * p.a2))
        var a2_a = (n1 * (n2 + n3 + n4)) / n5

        var x1 = p.r1 * Math.sin(p.a1) + p.ox,
            y1 = p.r1 * Math.cos(p.a1) + p.oy

        var x2 = x1 + p.r2 * Math.sin(p.a2),
            y2 = y1 + p.r2 * Math.cos(p.a2)

        if (isNaN(x1) || isNaN(x2) || isNaN(y1) || isNaN(y2)) return

        if (!init) {
            var line = d3
                .select('.bg')
                .append('line')
                .style('stroke', p.color)
                .attr('x1', p.px)
                .attr('y1', p.py)
                .attr('x2', x2)
                .attr('y2', y2)
        }

        p.c1
            .attr('cx', x1)
            .attr('cy', y1)
            .attr('r', p.m1)
        p.c2
            .attr('cx', x2)
            .attr('cy', y2)
            .attr('r', p.m2)

        p.l1
            .attr('x1', p.ox)
            .attr('y1', p.oy)
            .attr('x2', x1)
            .attr('y2', y1)
        p.l2
            .attr('x1', x1)
            .attr('y1', y1)
            .attr('x2', x2)
            .attr('y2', y2)

        p.a1_v += a1_a
        p.a2_v += a2_a
        p.a1 += p.a1_v
        p.a2 += p.a2_v

        p.a1_v *= p.decay
        p.a2_v *= p.decay

        p.px = x2
        p.py = y2

        setTimeout(() => p.draw(false), p.delay)
    }

}