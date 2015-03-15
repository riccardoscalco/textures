(function(){
  var width = 960,
      height = 500;

  var t1 = textures.lines()
          .thicker()
          .background("darkorange")
          .strokeWidth(1)
          .stroke("#343434"),
      t2 = textures.lines()
          .background("darkorange")
          .thicker()
          .strokeWidth(3)
          .stroke("#343434"),
      t3 = textures.lines()
          .thicker()
          //.orientation("6/8")
          .background("darkorange")
          .strokeWidth(5)
          .stroke("#343434"),
      t4 = textures.lines()
          .thicker()
          .strokeWidth(10)
          //.orientation("6/8")
          .background("darkorange")
          .size(16)
          .stroke("#343434");


  var projection = d3.geo.albersUsa()
      .scale(1000)
      .translate([width / 2, height / 2]);

  var path = d3.geo.path()
      .projection(projection);

  var svg = d3.select(".usa").append("svg")
      .attr("width", width)
      .attr("height", height);

  svg.call(t1);
  svg.call(t2);
  svg.call(t3);
  svg.call(t4);

  d3.json("us.json", function(error, us) {
    
    var getRandomTextures, tt;
    tt = [t1, t2, t3, t4];
    getRandomTextures = function() {
      return tt[Math.floor(Math.random() * tt.length)].url();
    };



    svg.insert("path", ".graticule")
        .datum(topojson.feature(us, us.objects.land))
        .attr("class", "land")
        .style("fill", t1.url())
        .style("stroke-width", 3)
        .attr("d", path);

    // svg.insert("path", ".graticule")
    //     .datum(topojson.mesh(us, us.objects.counties, function(a, b) { return a !== b && !(a.id / 1000 ^ b.id / 1000); }))
    //     .attr("class", "county-boundary")
    //     .attr("d", path);

    svg.insert("path", ".graticule")
        .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
        .attr("class", "state-boundary")
        .style("fill", t1.url())
        .style("stroke","darkorange")
        .style("stroke-width", 5)
        .attr("d", path);

    // draw and style any feature at time
    svg.selectAll("path")
        .data(topojson.feature(us, us.objects.states).features)
        .enter().append("path")
        //.attr("class","prov")
        // .attr("class", function(d) { return "prov " + d.id; })
        // .style("fill", function(d) { return getPattern(d.id); })
        .style("fill", function(){
          var r = getRandomTextures();
          return r;
        })
        .style("stroke-width", 5)
        .style("stroke","darkorange")
        .attr("d",path);

    svg.insert("path", ".graticule")
        .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
        .attr("class", "state-boundary")
        .style("fill", "none")
        .style("stroke","#343434")
        .style("stroke-width", 1)
        .attr("d", path);

  });

})()