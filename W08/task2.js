d3.csv("task2.csv")
    .then( data => {

        var config = {
            parent: '#drawing_region',
            width: 256,
            height: 256,
            margin: {top:40, right:40, bottom:40, left:60},
            axis_margin: {top:10, right:10, bottom:10, left:20}
        };

        const linechart = new LineChart(config,data);
        linechart.update();



    })
    .catch( error => {
        console.log( error );
    });




class LineChart {

    constructor(config,data) {
        this.config = {
            parent: config.parent,
            width: config.width || 256,
            height: config.height || 256,
            margin: config.margin || {top:10, right:10, bottom:10, left:10},
            axis_margin:config.axis_margin || {top:10, right:10, bottom:10, left:10}
        }
        this.data = data;
        this.init();
    }

    init(){
        let self = this;
        self.svg = d3.select('#drawing_region')
            .attr('width', this.config.width)
            .attr('height', this.config.height);

        self.chart = self.svg.append('g')
            .attr('transform', `translate(${self.config.margin.left}, ${self.config.margin.top})`);

        self.inner_width = self.config.width - self.config.margin.left - self.config.margin.right;
        self.inner_height = self.config.height - self.config.margin.top - self.config.margin.bottom;

        self.xscale = d3.scaleLinear()
            .domain([0,d3.max(self.data, d => d.x)])
            .range([0, self.inner_width]);

        self.yscale = d3.scaleBand()
            .domain([0,d3.max(self.data, d=>d.y)])
            .range([0, self.inner_height])

        self.xaxis = d3.axisBottom( self.xscale )
            .ticks(5)
            .tickSizeOuter(0);

        self.yaxis = d3.axisLeft( self.yscale )
            .tickSizeOuter(0);

        self.xaxis_group = self.chart.append('g')
            .attr('transform', `translate(0, ${self.inner_height})`)
            .call( self.xaxis );

        self.yaxis_group = self.chart.append('g')
            .call( self.yaxis );

        self.line = d3.line()
            .x( d => self.xscale(d.x) )
            .y( d => d.y );
    }

    update(){
        let self =this;

        self.render();
    }

    render(){
        let self =this;

        self.svg.append('path')
            .attr('d', self.line(self.data))
            .attr('stroke', 'black')
            .attr('fill', 'none')
            .attr('transform', `translate(${this.config.margin.left}, ${this.config.margin.top})`);

    }

}