root = exports ? this

rand = () ->
  (Math.random().toString(36)+'00000000000000000')
    .replace(/[^a-z]+/g, '')
    .slice(0, 5)

root.textures = {
  
  lines : () ->

      width = 4
      height = 4
      strokeWidth = 1
      fill = '#000'
      stroke = 'red'
      id = rand()

      lines = () ->
          this.append('defs')
             .append('pattern')
             .attr('id', id)
             .attr('patternUnits', 'userSpaceOnUse')
             .attr('width', width)
             .attr('height', height)
             .append('path')
             .attr('d', 'M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2')
             .attr('stroke-width', strokeWidth)
             .attr('stroke', stroke)
             .attr("transform","rotate(0)")

      lines.width = (_) ->
          width = _
          lines

      lines.height = (_) ->
          height = _
          lines

      lines.stroke = (_) ->
          stroke = _
          lines

      lines.id = (_) ->
        if not arguments.length
          id
        else
          id = _
          lines
 
      lines.url = (_) ->
        "url(#" + lines.id() + ")"
          
      lines

}