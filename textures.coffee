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
      orientation = 'diagonal'

      path = (orientation) ->
        switch orientation
          when '0/8' then do (s=size) -> 'M '+s/2+', 0 l 0, '+s
          when 'vertical' then do (s=size) -> 'M '+s/2+', 0 l 0, '+s
          when '1/8' then do (s=size) -> 'M '+s/4+',0 l '+s/2+','+s+' M '+-s/4+',0 l '+s/2+','+s+' M '+s*3/4+',0 l '+s/2+','+s
          when '2/8' then do (s=size) -> 'M 0,'+s+' l '+s+','+-s+' M '+-s/4+','+s/4+' l '+s/2+','+-s/2+' M '+3/4*s+','+5/4*s+' l '+s/2+','+-s/2
          when 'diagonal' then do (s=size) -> 'M 0,'+s+' l '+s+','+-s+' M '+-s/4+','+s/4+' l '+s/2+','+-s/2+' M '+3/4*s+','+5/4*s+' l '+s/2+','+-s/2
          when '3/8' then do (s=size) -> 'M 0,'+3/4*s+' l '+s+','+-s/2+' M 0,'+s/4+' l '+s+','+-s/2+' M 0,'+s*5/4+' l '+s+','+-s/2
          when '4/8' then do (s=size) -> 'M 0,'+s/2+' l '+s+',0'
          when 'horizontal' then do (s=size) -> 'M 0,'+s/2+' l '+s+',0'
          when '5/8' then do (s=size) -> 'M 0,'+-s/4+' l '+s+','+s/2+'M 0,'+s/4+' l '+s+','+s/2+'M 0,'+s*3/4+' l '+s+','+s/2
          when '6/8' then do (s=size) -> 'M 0,0 l '+s+','+s+' M '+-s/4+','+3/4*s+' l '+s/2+','+s/2+' M '+s*3/4+','+-s/4+' l '+s/2+','+s/2
          when '7/8' then do (s=size) -> 'M '+-s/4+',0 l '+s/2+','+s+' M '+s/4+',0 l '+s/2+','+s+' M '+s*3/4+',0 l '+s/2+','+s
          else do (s=size) -> 'M '+s/2+', 0 l 0, '+s

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
              .attr('d', path(orientation))
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

      lines.orientation = (_) ->
        orientation = _
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