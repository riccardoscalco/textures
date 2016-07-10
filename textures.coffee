

# helper function
rand = () ->
  "#{Math.random().toString(36)}00000000000000000"
    .replace /[^a-z]+/g, ""
    .slice 0, 5

umd = (factory) ->
  if typeof exports is 'object'
    module.exports = factory()
  else if typeof define is 'function' and define.amd
    define [], factory
  else
    @textures = factory()

# global factory
umd ->

  # circles ------------------------------------------------------------

  circles: () ->
    size = 20
    background = ""
    radius = 2
    complement = false
    fill = "#343434"
    stroke = "#343434"
    strokeWidth = 0
    id = rand()

    circles = (sel) ->
      g = sel.append "defs"
          .append "pattern"
          .attr "id", id
          .attr "patternUnits", "userSpaceOnUse"
          .attr "width", size
          .attr "height", size
      if background
        g.append "rect"
          .attr "width", size
          .attr "height", size
          .attr "fill", background
      g.append "circle"
        .attr "cx", size / 2
        .attr "cy", size / 2
        .attr "r", radius
        .attr "fill", fill
        .attr "stroke", stroke
        .attr "stroke-width", strokeWidth
      if complement
        for corner in [ [ 0, 0 ], [ 0, size ], [ size, 0 ], [ size, size ] ]
          g.append "circle"
            .attr "cx", corner[0]
            .attr "cy", corner[1]
            .attr "r", radius
            .attr "fill", fill
            .attr "stroke", stroke
            .attr "stroke-width", strokeWidth

    circles.heavier = (_) ->
      if not arguments.length
        radius = radius * 2
      else
        radius = if _ then radius * 2 * _ else radius * 2
      circles

    circles.lighter = (_) ->
      if not arguments.length
        radius = radius / 2
      else
        radius = if _ then radius / ( 2 * _ ) else radius / 2
      circles

    circles.thinner = (_) ->
      if not arguments.length
        size = size * 2
      else
        size = if _ then size * 2 * _ else size * 2
      circles

    circles.thicker = (_) ->
      if not arguments.length
        size = size / 2
      else
        size = if _ then size / ( 2 * _ ) else size / 2
      circles

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

    circles.id = (_) ->
      if not arguments.length
        id
      else
        id = _
        circles

    circles.url = () ->
      "url(##{id})"

    circles


  # lines --------------------------------------------------------------

  lines: () ->
    size = 20
    strokeWidth = 2
    stroke = "#343434"
    id = rand()
    background = ""
    orientation = ["diagonal"]
    shapeRendering = "auto"

    path = (orientation) ->
      switch orientation
        when "0/8" then do (s=size) ->
          "M #{s/2}, 0 l 0, #{s}"
        when "vertical" then do (s=size) ->
          "M #{s/2}, 0 l 0, #{s}"
        when "1/8" then do (s=size) ->
          """M #{s/4},0 l #{s/2},#{s} M #{-s/4},0 l #{s/2},#{s}
             M #{s*3/4},0 l #{s/2},#{s}"""
        when "2/8" then do (s=size) ->
          """M 0,#{s} l #{s},#{-s} M #{-s/4},#{s/4} l #{s/2},#{-s/2}
             M #{3/4*s},#{5/4*s} l #{s/2},#{-s/2}"""
        when "diagonal" then do (s=size) ->
          """M 0,#{s} l #{s},#{-s} M #{-s/4},#{s/4} l #{s/2},#{-s/2}
             M #{3/4*s},#{5/4*s} l #{s/2},#{-s/2}"""
        when "3/8" then do (s=size) ->
          """M 0,#{3/4*s} l #{s},#{-s/2} M 0,#{s/4} l #{s},#{-s/2}
             M 0,#{s*5/4} l #{s},#{-s/2}"""
        when "4/8" then do (s=size) ->
          "M 0,#{s/2} l #{s},0"
        when "horizontal" then do (s=size) ->
          "M 0,#{s/2} l #{s},0"
        when "5/8" then do (s=size) ->
          """M 0,#{-s/4} l #{s},#{s/2}M 0,#{s/4} l #{s},#{s/2}
             M 0,#{s*3/4} l #{s},#{s/2}"""
        when "6/8" then do (s=size) ->
          """M 0,0 l #{s},#{s} M #{-s/4},#{3/4*s} l #{s/2},#{s/2}
             M #{s*3/4},#{-s/4} l #{s/2},#{s/2}"""
        when "7/8" then do (s=size) ->
          """M #{-s/4},0 l #{s/2},#{s} M #{s/4},0 l #{s/2},#{s}
             M #{s*3/4},0 l #{s/2},#{s}"""
        else do (s=size) ->
          "M #{s/2}, 0 l 0, #{s}"

    lines = (sel) ->
      g = sel.append "defs"
          .append "pattern"
          .attr "id", id
          .attr "patternUnits", "userSpaceOnUse"
          .attr "width", size
          .attr "height", size
      if background
        g.append "rect"
          .attr "width", size
          .attr "height", size
          .attr "fill", background
      for o in orientation
        g.append "path"
          .attr "d", path o
          .attr "stroke-width", strokeWidth
          .attr "shape-rendering", shapeRendering
          .attr "stroke", stroke
          .attr "stroke-linecap", "square"

    lines.background = (_) ->
      background = _
      lines

    lines.shapeRendering = (_) ->
      shapeRendering = _
      lines

    lines.heavier = (_) ->
      if not arguments.length
        strokeWidth = strokeWidth * 2
      else
        strokeWidth = if _ then strokeWidth * 2 * _ else strokeWidth * 2
      lines

    lines.lighter = (_) ->
      if not arguments.length
        strokeWidth = strokeWidth / 2
      else
        strokeWidth = if _ then strokeWidth / ( 2 * _ ) else strokeWidth / 2
      lines

    lines.thinner = (_) ->
      if not arguments.length
        size = size * 2
      else
        size = if _ then size * 2 * _ else size * 2
      lines

    lines.thicker = (_) ->
      if not arguments.length
        size = size / 2
      else
        size = if _ then size / ( 2 * _ ) else size / 2
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
      "url(##{id})"

    lines


  # path ---------------------------------------------------------------

  paths: () ->
    size = 20
    height = 1
    width = 1
    strokeWidth = 2
    stroke = "#343434"
    background = ""
    d = ""
    shapeRendering = "auto"
    fill = "transparent"
    id = undefined

    # Contributions with custom paths are welcome,
    # for example have a look at the "hexagons" path below
    # (`width` and `height` are in units of `size`)

    svgPath = (_) ->
      switch _
        when "squares" then do (s=size) ->
          "M #{s/4} #{s/4} l #{s/2} 0 l 0 #{s/2} l #{-s/2} 0 Z"
        when "nylon" then do (s=size) ->
          """M 0 #{s/4} l #{s/4} 0 l 0 #{-s/4} M #{s*3/4} #{s} l 0 #{-s/4}
             l #{s/4} 0 M #{s/4} #{s/2} l 0 #{s/4} l #{s/4} 0 M #{s/2} #{s/4}
             l #{s/4} 0 l 0 #{s/4}"""
        when "waves" then do (s=size) ->
          """M 0 #{s/2} c #{s/8} #{-s/4} , #{s*3/8} #{-s/4} , #{s/2} 0
             c #{s/8} #{s/4} , #{s*3/8} #{s/4} , #{s/2} 0 M #{-s/2} #{s/2}
             c #{s/8} #{s/4} , #{s*3/8} #{s/4} , #{s/2} 0 M #{s} #{s/2}
             c #{s/8} #{-s/4} , #{s*3/8} #{-s/4} , #{s/2} 0"""
        when "woven" then do (s=size) ->
          """M #{s/4},#{s/4}l#{s/2},#{s/2}M#{s*3/4},#{s/4}l#{s/2},#{-s/2}
             M#{s/4},#{s*3/4}l#{-s/2},#{s/2}M#{s*3/4},#{s*5/4}l#{s/2},#{-s/2}
             M#{-s/4},#{s/4}l#{s/2},#{-s/2}"""
        when "crosses" then do (s=size) ->
          "M #{s/4},#{s/4}l#{s/2},#{s/2}M#{s/4},#{s*3/4}l#{s/2},#{-s/2}"
        when "caps" then do (s=size) ->
          "M #{s/4},#{s*3/4}l#{s/4},#{-s/2}l#{s/4},#{s/2}"
        when "hexagons" then do (s=size) ->
          width = 3
          height = Math.sqrt(3)
          """M #{s},0 l #{s},0 l #{s/2},#{(s*Math.sqrt(3)/2)}
             l #{(-s/2)},#{(s*Math.sqrt(3)/2)} l #{(-s)},0
             l #{(-s/2)},#{(-s*Math.sqrt(3)/2)} Z M 0,#{s*Math.sqrt(3)/2}
             l #{s/2},0 M #{(3*s)},#{s*Math.sqrt(3)/2} l #{(-s/2)},0"""
        else _ size

    paths = (sel) ->
      path = svgPath d
      id = rand()
      g = sel.append "defs"
        .append "pattern"
        .attr "id", id
        .attr "patternUnits", "userSpaceOnUse"
        .attr "width", size * width
        .attr "height", size * height
      if background
        g.append "rect"
          .attr "width", size * width
          .attr "height", size * height
          .attr "fill", background
      g.append "path"
        .attr "d", path
        .attr "fill", fill
        .attr "stroke-width", strokeWidth
        .attr "shape-rendering", shapeRendering
        .attr "stroke", stroke
        .attr "stroke-linecap", "square"

    paths.background = (_) ->
      background = _
      paths

    paths.shapeRendering = (_) ->
      shapeRendering = _
      paths

    paths.heavier = (_) ->
      if not arguments.length
        strokeWidth = strokeWidth * 2
      else
        strokeWidth = if _ then strokeWidth * 2 * _ else strokeWidth * 2
      paths

    paths.lighter = (_) ->
      if not arguments.length
        strokeWidth = strokeWidth / 2
      else
        strokeWidth = if _ then strokeWidth / ( 2 * _ ) else strokeWidth / 2
      paths

    paths.thinner = (_) ->
      if not arguments.length
        size = size * 2
      else
        size = if _ then size * 2 * _ else size * 2
      paths

    paths.thicker = (_) ->
      if not arguments.length
        size = size / 2
      else
        size = if _ then size / ( 2 * _ ) else size / 2
      paths

    paths.d = (_) ->
      d = _
      paths

    paths.size = (_) ->
      size = _
      paths

    paths.stroke = (_) ->
      stroke = _
      paths

    paths.strokeWidth = (_) ->
      strokeWidth = _
      paths

    paths.id = (_) ->
      if not arguments.length
        id
      else
        id = _
        paths

    paths.url = () ->
      "url(##{id})"

    paths
