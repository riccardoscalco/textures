(function() {
  var width = 660,
      height = 500;

  var t1 = textures.lines().orientation("vertical").thicker().lighter();
  var t2 = textures.circles().complement().thicker().lighter();
  var t3 = textures.lines().size(4).strokeWidth(2);
  var t4 = textures.circles()
    .size(10)
    .radius(2)
    .fill("white")
    .background("#343434");


  var svg = d3.select(".map-section").append("svg")
      .attr("id", "map")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", "0 0 660 500")          // make it
      .attr("preserveAspectRatio", "xMidYMid") // responsive

  svg.call(t1.thicker());
  svg.call(t2);
  svg.call(t3);
  svg.call(t4);
  var getPattern;
  
  var wi = 150,
      hi = 200;
  // var t = textures.lines().stroke("darkorange").lighter().thicker();
  var t = textures.paths()
    .d(function(s) {
        return "M 0," + s*3/4 + " l " +
          s/2 + "," + -s/2 + " l " +
          s/2 + "," + s/2;
    })
    .size(30)
    .strokeWidth(1)
    .thicker(2)
    .stroke("darkorange");
  var italy = d3.select("#italy").append("svg")
      .attr("width", wi)
      .attr("height", hi);
  italy.call(t);

  getPattern = function(province) {
    switch (province.toLowerCase()) {
      case "novara":
        return t2.url();
      case "torino":
        return t1.url();
      case "cuneo":
        return t3.url();
      case "valle d'aosta":
        return t1.url();
      case "imperia":
        return t1.url();
      case "asti":
        return t2.url();
      case "alessandria":
        return t3.url();
      case "como":
        return t3.url();
      case "savona":
        return t2.url();
      case "genova":
        return t1.url();
      case "la spezia":
        return t1.url();
      case "varese":
        return t1.url();
      case "milano":
        return t3.url();
      case "pavia":
        return t3.url();
      case "bergamo":
        return t3.url();
      case "brescia":
        return t2.url();
      case "sondrio":
        return t1.url();
      case "bolzano/bozen":
        return t2.url();
      case "cremona":
        return t4.url();
      case "mantova":
        return t4.url();
      case "belluno":
        return t4.url();
      case "trento":
        return t4.url();
      case "verona":
        return t2.url();
      case "vicenza":
        return t1.url();
      case "rovigo":
        return t1.url();
      case "treviso":
        return t2.url();
      case "venezia":
        return t3.url();
      case "padova":
        return t3.url();
      case "udine":
        return t3.url();
      case "gorizia":
        return t1.url();
      case "parma":
        return t1.url();
      case "reggio nell'emilia":
        return t2.url();
      case "trieste":
        return t2.url();
      case "piacenza":
        return t4.url();
      case "modena":
        return t4.url();
      case "bologna":
        return t2.url();
      case "ferrara":
        return t2.url();
      case "ravenna":
        return t2.url();
      case "ancona":
        return t1.url();
      case "pistoia":
        return t1.url();
      case "firenze":
        return t1.url();
      case "macerata":
        return t1.url();
      case "lucca":
        return t3.url();
      case "arezzo":
        return t3.url();
      case "livorno":
        return t1.url();
      case "pisa":
        return t2.url();
      case "bari":
        return t2.url();
      case "perugia":
        return t3.url();
      case "cosenza":
        return t4.url();
      case "grosseto":
        return t4.url();
      case "siena":
        return t4.url();
      case "roma":
        return t4.url();
      case "viterbo":
        return t2.url();
      case "latina":
        return t1.url();
      case "caserta":
        return t2.url();
      case "frosinone":
        return t2.url();
      case "napoli":
        return t1.url();
      case "salerno":
        return t1.url();
      case "pescara":
        return t2.url();
      case "chieti":
        return t3.url();
      case "teramo":
        return t3.url();
      case "matera":
        return t2.url();
      case "biella":
        return t2.url();
      case "crotone":
        return t1.url();
      case "lecco":
        return t1.url();
      case "fermo":
        return t1.url();
      case "lodi":
        return t4.url();
      case "rimini":
        return t4.url();
      case "prato":
        return t4.url();
      case "messina":
        return t1.url();
      case "siracusa":
        return t1.url();
      case "cosenza":
        return t3.url();
      case "agrigento":
        return t3.url();
      case "sassari":
        return t1.url();
      case "taranto":
        return t1.url();
      case "catanzaro":
        return t1.url();
      case "brindisi":
        return t1.url();
      case "nuoro":
        return t4.url();
      case "lecce":
        return t4.url();
      case "trapani":
        return t2.url();
      case "enna":
        return t2.url();
      case "cagliari":
        return t2.url();
      case "pordenone":
        return t1.url();
      case "palermo":
        return t3.url();
      case "catania":
        return t3.url();
      case "potenza":
        return t3.url();
      case "ragusa":
        return t2.url();
      case "isernia":
        return t2.url();
      default:
        return t1.url();
    }
  };

  d3.json("./itx.json", function(error, it) {

      var projection = d3.geo.albers()
          .center([0, 40])
          .rotate([347, 0])
          .parallels([35, 45])
          .scale(4300)
          .translate([width / 2, height / 2]);

      var subunits = topojson.feature(it, it.objects.sub);
      
      var path = d3.geo.path()
          .projection(projection);
    
      // draw and style any feature at time
      svg.selectAll("path")
          .data(topojson.feature(it, it.objects.sub).features)
          .enter().append("path")
          //.attr("class","prov")
          .attr("class", function(d) { return "prov " + d.id; })
          .style("fill", function(d) { return getPattern(d.id); })
          .attr("d",path);

      // draw all the features together (no different styles)
      svg.append("path")
          .datum(subunits)
          .attr("class", "map")
          .attr("d", path)

      d3.select(".map-section").transition().duration(1500).style("opacity",1);
      d3.select(".subtitle").transition().delay(500).duration(1000).style("opacity",1);
      d3.select(".github").transition().delay(800).duration(1000).style("opacity",1);

      var projectionItaly = d3.geo.albers()
          .center([0, 42])
          .rotate([347, 0])
          .parallels([35, 45])
          .scale(1000)
          .translate([wi / 2, hi / 2]);

      var pathItaly = d3.geo.path()
          .projection(projectionItaly);

      // draw border with sea
      italy.append("path")
        .datum(topojson.mesh(it, it.objects.sub, function(a, b) { return a === b ; }))
        .attr("d", pathItaly)
        .style("fill", t.url());

  })

})()