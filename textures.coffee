root = exports ? this

rand = () ->
  (Math.random().toString(36)+'00000000000000000')
    .replace(/[^a-z]+/g, '')
    .slice(0, 5)

root.textures = {

  # lines --------------------------------------------------------------
  
  lines : () ->

      size = 20
      strokeWidth = 2
      stroke = '#1a1a1a'
      id = rand()
      background = ''

      lines = () ->
          g = this.append('defs')
              .append('pattern')
              .attr('id', id)
              .attr('patternUnits', 'userSpaceOnUse')
              .attr('width', size)
              .attr('height', size)
          if background
            g.append("rect")
                .attr("width", size)
                .attr("height", size)
                .attr("fill", background)
          g.append('path')
              #.attr('d', 'M -1,1 l 2,-2 M 0,10 l 10,-10 M 9,11 l 2,-2')
              #.attr('d', do (s=size) -> 'M '+s/2+', 0 l 0, '+s)
              .attr('d', do (s=size) -> 'M '+s/4+',0 l '+s/2+','+s+' M '+-s/4+',0 l '+s/2+','+s+' M '+s*3/4+',0 l '+s/2+','+s)
              .attr('stroke-width', strokeWidth)
              .attr("shape-rendering", "crispEdges")
              .attr('stroke', stroke)
              .attr("stroke-linecap", "square")


      lines.background = (_) ->
        background = _
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

  # circles ------------------------------------------------------------

}