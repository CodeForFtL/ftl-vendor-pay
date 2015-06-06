// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require bootstrap-sprockets
//= require jquery_ujs
//= require turbolinks
//= require_tree .

var sampleData = 
	{ sumVendTop: 
		[
			{ "AGENCY FOR HEALTH CARE ADMIN" : 20923882780.100025 },
			{ "STATE BOARD OF ADMINISTRATION" : 5585115582.389993 },
			{ "MIAMI-DADE COUNTY SCHOOL BOARD" : 1664458036.2000022 },
			{ "FL CFO SPEC PURPOSE INVEST ACCT" : 1596296192.7299998 },
			{ "BROWARD COUNTY SCHOOL BOARD" : 1263273147.2300034 },
			{ "HILLSBOROUGH CO SCHOOL BOARD" : 1180955374.4900005 },
			{ "FL DFS TAX REVOLVING ACCOUNT" : 1164839659.46 },
			{ "ORANGE COUNTY SCHOOL BOARD" : 1161125745.7300036 },
			{ "MIAMI DADE COUNTY" : 857798335.5299993 },
			{ "DUVAL COUNTY SCHOOL BOARD" : 710290560.6599996 },
			{ "PALM BEACH COUNTY SCHOOL BOARD" : 683468142.6599997 },
			{ "POLK COUNTY SCHOOL BOARD" : 625411137.5099989 },
			{ "STATE OF FLORIDA EMPLOYEE'S" : 617100000 },
			{ "DMS SELF INSURED AVMED CLAIMS" : 471000000 },
			{ "MEDCO" : 470088659.87999994 },
			{ "PINELLAS COUNTY SCHOOL BOARD" : 469469925.3399996 },
			{ "CENTERS FOR MEDICARE & MEDICAID" : 430777480.21 },
			{ "PASCO COUNTY SCHOOL BOARD" : 424303326.3099998 },
			{ "UNIVERSITY OF SOUTH FLORIDA" : 423745211.9399995 },
			{ "HILLSBOROUGH CO BOCC" : 397885099.3099999 },
			{ "AGENCY FOR HEALTH CARE ADMIN." : 395932238.31 },
			{ "BREVARD COUNTY SCHOOL BOARD" : 370516888.8599997 },
			{ "LEE COUNTY SCHOOL BOARD" : 358684408.36999977 },
			{ "OSCEOLA COUNTY SCHOOL BOARD" : 343539505.30999964 },
			{ "VOLUSIA COUNTY SCHOOL BOARD" : 339323925.04999983 },
			{ "CITY OF JACKSONVILLE, TREASURY" : 336732720.1800006 },
			{ "SEMINOLE COUNTY SCHOOL BOARD" : 316862210.3299996 }
		]
	};


$(function() {
	InitChart();
});

function InitChart() {
	var diameter = 600;
	var color = d3.scale.category20();
	var svg = d3.select('#svgVisualize')
	   .attr('width', diameter)
	   .attr('height', diameter);

	var bubble = d3.layout.pack()
	   .size([diameter, diameter])
	   .padding(3)   // padding between adjacent circles
	   // new data will be loaded to bubble layout
	   .value(function(d) { return d.size; });

	var nodes = bubble.nodes(processData(sampleData))
	   // filter out the outer bubble
	   .filter(function(d) { return !d.children; });

      var vis = svg.selectAll('circle')
					.data(nodes);
  
  	vis.enter().append('g')
		.attr('transform', function(d) { return 'translate(' + d.x + ',' + d.y + ')'; })
		.append('circle')
		.attr('r', function(d) { return d.r; })
		.attr('class', function(d) { return d.className; })			
	   	.style('fill',function() { return "hsl(" + Math.random() * 360 + ",100%,50%)"; })
	   	.style('stroke', 'black')
	   	.style('stroke-opacity', 0.25);

   	d3.selectAll('g')
	   	.append('text')
	    .attr("dx", function(d){return -20})
	    .attr('stroke', 'black')
	    .attr('stroke-opacity', 0.25)
	    .attr('alt', function(d){return '$' + (d.size).toFixed(2)});
}

  function processData(data) {
    var obj = data.sumVendTop;

    var newDataSet = [];

    for(var prop in obj) {
    	for(var item in obj[prop]) {
      		newDataSet.push({name: item, className: item.toLowerCase(), size: obj[prop][item]});
    	}
    }

    return {children: newDataSet};
  }