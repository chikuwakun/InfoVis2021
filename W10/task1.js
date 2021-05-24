


d3.csv("task1.csv")
    .then( data => {
        data.forEach( d => { d.x = +d.x; d.y = +d.y; });

        var config = {
            parent: '#drawing_region',
            width: 512,
            height: 256,
            margin: {top:40, right:40, bottom:40, left:60},
            axis_margin: {top:10, right:10, bottom:10, left:20}
        };

        console.log("data is loaded");

        const barchart = new BarChart(config,data);
        console.log("data is loaded");
        barchart.update();

        console.log("data is loaded");

        d3.select('#reverse')
            .on('click', d => {

                barchart.reverse();
                barchart.init();
                barchart.update();
            });

        d3.select('#sort')
            .on('click', d => {

                barchart.sort();
                barchart.init();
                barchart.update();
            });


    })
    .catch( error => {
        console.log( error );
    });



class BarChart {

    constructor(config,data) {
        this.config = {
            parent: config.parent,
            width: config.width || 256,
            height: config.height || 256,
            margin: config.margin || {top:10, right:10, bottom:10, left:10},
            axis_margin:config.axis_margin || {top:10, right:10, bottom:10, left:10}
        }
        this.data = data;


        // Color
        this.colors = [ 'rgb(255,0,0)', 'rgb(255,255,0)' ];


        this.init();
    }



    init(){
        let self = this;
        d3.select("g").remove();


        self.svg = d3.select('#drawing_region')
            .attr('width', self.config.width)
            .attr('height', self.config.height);

        self.grad = self.svg.append('defs')
            .append('linearGradient')
            .attr('id', 'grad')
            .attr('x1', '0%')
            .attr('x2', '0%')
            .attr('y1', '0%')
            .attr('y2', '100%');

        self.chart = self.svg.append('g')
            .attr('transform', `translate(${self.config.margin.left}, ${self.config.margin.top})`);

        self.inner_width = self.config.width - self.config.margin.left - self.config.margin.right;
        self.inner_height = self.config.height - self.config.margin.top - self.config.margin.bottom;

        self.xscale = d3.scaleLinear()
            .domain([0, d3.max(self.data, d => d.value)])
            .range([0, self.inner_width]);

        self.yscale = d3.scaleBand()
            .domain(self.data.map(d => d.label))
            .range([0, self.inner_height])
            .paddingInner(0.1);

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
    }

    update(){

        let self = this;


        self.render();
    }

    render(){
        let self = this;
        console.log("rending");

        console.log(self.data);

        self.chart.selectAll("rect").data(self.data).enter()
            .append("rect")
            .transition().duration(1000)
            .attr("x", 0)
            .attr("y", d => self.yscale(d.label))
            .attr("width", d => self.xscale(d.value))
            .attr("height", self.yscale.bandwidth());

        console.log("rended");

    }

    reverse(){
        let self = this;
        self.data.reverse("value");
        console.log("data is reversed")
        console.log(self.data)
    }

    sort(){
        let self = this;
        self.data.sort(function(a,b){
            if(a.value > b.value)return -1;
            if( a.value < b.value) return 1;
            return 0;
        })
    }


}



