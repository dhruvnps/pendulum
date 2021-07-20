var svg = d3
    .select('.canvas')
    .append('svg')
    .attr('width', '100%')
    .attr('height', '100%')

var bg = svg
    .append('g')
    .attr('class', 'bg')

p1 = new Pendulum('silver', 10, 1, Math.random() / 10)