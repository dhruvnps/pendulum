class Pendulum {

    constructor(color, delay, decay, offset = 0) {
        this.color = color
        this.delay = delay
        this.decay = decay

        var svg = d3.select('svg')
        this.l1 = svg.append('line').style('stroke', 'black')
        this.l2 = svg.append('line').style('stroke', 'black')
        this.c1 = svg.append('circle').style('fill', 'black')
        this.c2 = svg.append('circle').style('fill', 'black')

        var width = parseInt(svg.style('width'), 10),
            height = parseInt(svg.style('height'), 10)

        this.r1 = (Math.min(width, height) / 4) - 10
        this.r2 = (Math.min(width, height) / 4) - 10
        this.m1 = 5
        this.m2 = 5
        this.a1 = Math.PI / 2
        this.a2 = (Math.PI / 2) + offset
        this.a1_v = 0
        this.a2_v = 0
        this.g = 1
        this.ox = width / 2
        this.oy = height / 2
        this.px = null
        this.py = null

        this.draw()
    }

    draw(init = true) {
        var n1, n2, n3, n4, n5

        n1 = -this.g * (2 * this.m1 + this.m2) * Math.sin(this.a1)
        n2 = -this.m2 * this.g * Math.sin(this.a1 - 2 * this.a2)
        n3 = -2 * Math.sin(this.a1 - this.a2) * this.m2
        n4 = this.a2_v * this.a2_v * this.r2 + this.a1_v * this.a1_v * this.r1 * Math.cos(this.a1 - this.a2)
        n5 = this.r1 * (2 * this.m1 + this.m2 - this.m2 * Math.cos(2 * this.a1 - 2 * this.a2))
        var a1_a = (n1 + n2 + n3 * n4) / n5

        n1 = 2 * Math.sin(this.a1 - this.a2)
        n2 = (this.a1_v * this.a1_v * this.r1 * (this.m1 + this.m2))
        n3 = this.g * (this.m1 + this.m2) * Math.cos(this.a1)
        n4 = this.a2_v * this.a2_v * this.r2 * this.m2 * Math.cos(this.a1 - this.a2)
        n5 = this.r2 * (2 * this.m1 + this.m2 - this.m2 * Math.cos(2 * this.a1 - 2 * this.a2))
        var a2_a = (n1 * (n2 + n3 + n4)) / n5

        var x1 = this.r1 * Math.sin(this.a1) + this.ox,
            y1 = this.r1 * Math.cos(this.a1) + this.oy

        var x2 = x1 + this.r2 * Math.sin(this.a2),
            y2 = y1 + this.r2 * Math.cos(this.a2)

        if (isNaN(x1) || isNaN(x2) || isNaN(y1) || isNaN(y2)) return

        if (!init)
            d3.select('.bg').append('line').style('stroke', this.color)
                .attr('x1', this.px).attr('y1', this.py).attr('x2', x2).attr('y2', y2)

        this.c1.attr('cx', x1).attr('cy', y1).attr('r', this.m1)
        this.c2.attr('cx', x2).attr('cy', y2).attr('r', this.m2)
        this.l1.attr('x1', this.ox).attr('y1', this.oy).attr('x2', x1).attr('y2', y1)
        this.l2.attr('x1', x1).attr('y1', y1).attr('x2', x2).attr('y2', y2)

        this.a1_v += a1_a
        this.a2_v += a2_a
        this.a1 += this.a1_v
        this.a2 += this.a2_v

        this.a1_v *= this.decay
        this.a2_v *= this.decay

        this.px = x2
        this.py = y2

        setTimeout(() => this.draw(false), this.delay)
    }

}