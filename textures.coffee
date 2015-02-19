root = exports ? this

rand = () ->
  (Math.random().toString(36)+"00000000000000000")
    .replace(/[^a-z]+/g, "")
    .slice(0, 5)

root.textures = {

  # circles ------------------------------------------------------------

  circles : () ->

      size = 20
      background = ""
      radius = 1
      complement = false
      fill = "#343434"
      stroke = "#343434"
      strokeWidth = 0
      outerRadius = 0          # not displayed by default
      outerFill = "#343434"
      outerStroke = "#343434"
      outerStrokeWidth = 0
      id = rand()

      circles = () ->
          g = this.append("defs")
              .append("pattern")
              .attr("id", id)
              .attr("patternUnits", "userSpaceOnUse")
              .attr("width", size)
              .attr("height", size)
          if background
            g.append("rect")
                .attr("width", size)
                .attr("height", size)
                .attr("fill", background)
          if outerRadius
            g.append("circle")
                .attr("cx", size/2)
                .attr("cy", size/2)
                .attr("r", outerRadius)
                .attr("fill", outerFill)
                .attr("stroke", outerStroke)
               .attr("stroke-width", outerStrokeWidth)
            if complement
              for corner in [ [ 0, 0 ], [ 0, size ], [ size, 0 ], [ size, size ] ]
                g.append("circle")
                    .attr("cx", corner[0])
                    .attr("cy", corner[1])
                    .attr("r", outerRadius)
                    .attr("fill", outerFill)
                    .attr("stroke", outerStroke)
                    .attr("stroke-width", outerStrokeWidth)
          g.append("circle")
              .attr("cx", size/2)
              .attr("cy", size/2)
              .attr("r", radius)
              .attr("fill", fill)
              .attr("stroke", stroke)
              .attr("stroke-width", strokeWidth)
          if complement
            for corner in [ [ 0, 0 ], [ 0, size ], [ size, 0 ], [ size, size ] ]
              g.append("circle")
                  .attr("cx", corner[0])
                  .attr("cy", corner[1])
                  .attr("r", radius)
                  .attr("fill", fill)
                  .attr("stroke", stroke)
                  .attr("stroke-width", strokeWidth)



      circles.background = (_) ->
        background = _
        circles

      circles.size = (_) ->
        size = _
        circles

      circles.complement = () ->
        complement = true
        circles

      circles.radius = (_) ->
        radius = _
        circles

      circles.fill = (_) ->
        fill = _
        circles

      circles.stroke = (_) ->
        stroke = _
        circles

      circles.strokeWidth = (_) ->
        strokeWidth = _
        circles

      circles.outerRadius = (_) ->
        outerRadius = _
        circles

      circles.outerFill = (_) ->
        outerFill = _
        circles

      circles.outerStroke = (_) ->
        outerStroke = _
        circles

      circles.outerStrokeWidth = (_) ->
        outerStrokeWidth = _
        circles

      circles.id = (_) ->
        if not arguments.length
          id
        else
          id = _
          circles
 
      circles.url = () ->
        "url(#" + circles.id() + ")"

      circles

  # lines --------------------------------------------------------------
  
  lines : () ->

      size = 20
      strokeWidth = 2
      stroke = "#343434"
      id = rand()
      background = ""
      orientation = ["diagonal"]
      shapeRendering = "auto"

      path = (orientation) ->
        switch orientation
          when "0/8" then do (s=size) -> "M "+s/2+", 0 l 0, "+s
          when "vertical" then do (s=size) -> "M "+s/2+", 0 l 0, "+s
          when "1/8" then do (s=size) -> "M "+s/4+",0 l "+s/2+","+s+" M "+-s/4+",0 l "+s/2+","+s+" M "+s*3/4+",0 l "+s/2+","+s
          when "2/8" then do (s=size) -> "M 0,"+s+" l "+s+","+-s+" M "+-s/4+","+s/4+" l "+s/2+","+-s/2+" M "+3/4*s+","+5/4*s+" l "+s/2+","+-s/2
          when "diagonal" then do (s=size) -> "M 0,"+s+" l "+s+","+-s+" M "+-s/4+","+s/4+" l "+s/2+","+-s/2+" M "+3/4*s+","+5/4*s+" l "+s/2+","+-s/2
          when "3/8" then do (s=size) -> "M 0,"+3/4*s+" l "+s+","+-s/2+" M 0,"+s/4+" l "+s+","+-s/2+" M 0,"+s*5/4+" l "+s+","+-s/2
          when "4/8" then do (s=size) -> "M 0,"+s/2+" l "+s+",0"
          when "horizontal" then do (s=size) -> "M 0,"+s/2+" l "+s+",0"
          when "5/8" then do (s=size) -> "M 0,"+-s/4+" l "+s+","+s/2+"M 0,"+s/4+" l "+s+","+s/2+"M 0,"+s*3/4+" l "+s+","+s/2
          when "6/8" then do (s=size) -> "M 0,0 l "+s+","+s+" M "+-s/4+","+3/4*s+" l "+s/2+","+s/2+" M "+s*3/4+","+-s/4+" l "+s/2+","+s/2
          when "7/8" then do (s=size) -> "M "+-s/4+",0 l "+s/2+","+s+" M "+s/4+",0 l "+s/2+","+s+" M "+s*3/4+",0 l "+s/2+","+s
          else do (s=size) -> "M "+s/2+", 0 l 0, "+s

      lines = () ->
          g = this.append("defs")
              .append("pattern")
              .attr("id", id)
              .attr("patternUnits", "userSpaceOnUse")
              .attr("width", size)
              .attr("height", size)
          if background
            g.append("rect")
                .attr("width", size)
                .attr("height", size)
                .attr("fill", background)
          for o in orientation
            g.append("path")
                .attr("d", path(o))
                .attr("stroke-width", strokeWidth)
                .attr("shape-rendering", shapeRendering)
                .attr("stroke", stroke)
                .attr("stroke-linecap", "square")

      lines.background = (_) ->
        background = _
        lines

      lines.shapeRendering = (_) ->
        shapeRendering = _
        lines

      lines.thicker = (_) ->
        if not arguments.length
          strokeWidth = strokeWidth * 2
        else
          strokeWidth = strokeWidth * 2 * _
        lines

      lines.thinner = (_) ->
        if not arguments.length
          strokeWidth = strokeWidth / 2
        else
          strokeWidth = strokeWidth / ( 2 * _ )
        lines

      lines.farther = (_) ->
        if not arguments.length
          size = size * 2
        else
          size = size * 2 * _
        lines

      lines.nearer = (_) ->
        if not arguments.length
          size = size / 2
        else
          size = size / ( 2 * _ )
        lines

      lines.orientation = (args...) ->
        orientation = args
        lines

      lines.size = (_) ->
        size = _
        lines

      lines.stroke = (_) ->
        stroke = _
        lines

      lines.strokeWidth = (_) ->
        strokeWidth = _
        lines

      lines.id = (_) ->
        if not arguments.length
          id
        else
          id = _
          lines
 
      lines.url = () ->
        "url(#" + lines.id() + ")"
          
      lines

}