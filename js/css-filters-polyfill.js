/*!
 * css-filters-polyfill.js
 *
 * Author: Christian Schepp Schaefer
 * Summary: A polyfill for CSS filter effects
 * License: MIT
 * Version: 0.22
 *
 * URL:
 * https://github.com/Schepp/
 *
 */
;(function(window){
	var polyfilter = {
		// Detect if we are dealing with IE <= 9
		// http://james.padolsey.com/javascript/detect-_ie-in-js-using-conditional-comments/
		_ie:			(function(){
			var undef,
			v = 3,
			div = document.createElement('div'),
			all = div.getElementsByTagName('i');
			
			while(
				div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
				all[0]
			);
			
			return v > 4 ? v : undef;
		}()),
		
		_svg_cache: 		{},
		
		_create_svg_element: function(tagname,attributes){
			var xmlns = 'http://www.w3.org/2000/svg';
			var elem = document.createElementNS(xmlns,tagname);
			for(key in attributes){
				elem.setAttributeNS(null,key,attributes[key]);
			}
			
			return elem;
		},
		
		_create_svg:	function(id,filterelements){
			var xmlns = 'http://www.w3.org/2000/svg';
			var svg = document.createElementNS(xmlns,'svg');
			svg.setAttributeNS(null,'width','0');
			svg.setAttributeNS(null,'height','0');
			svg.setAttributeNS(null,'style','position:absolute');
			
			var svg_filter = document.createElementNS(xmlns,'filter');
			svg_filter.setAttributeNS(null,'id',id);
			svg.appendChild(svg_filter);
			
			for(var i = 0; i < filterelements.length; i++){
				svg_filter.appendChild(filterelements[i]);
			}
			
			return svg;
		},
		
		_pending_stylesheets: 0,
	
		_stylesheets: 		[],
		
		_development_mode: (function(){
			if(location.hostname === 'localhost' || location.hostname.search(/.local$/) !== -1 || location.hostname.search(/\d+\.\d+\.\d+\.\d+/) !== -1){
				if(window.console) console.log('Detected localhost or IP address. Assuming you are a developer. Caching of stylesheets is disabled.');
				return true;
			}
			if(window.console) console.log('Caching of stylesheets is enabled. You need to refresh twice to see any changes.');
			return false;
		})(),
		
		process_stylesheets: function(){
			var xmlHttp = [];
			
			// Check if path to library is correct, do that 2 secs. after this to not disturb initial processing
			window.setTimeout(function(){
				if (window.XMLHttpRequest) {
					var xmlHttpCheck = new XMLHttpRequest();
				} else if (window.ActiveXObject) {
					var xmlHttpCheck = new ActiveXObject("Microsoft.XMLHTTP");
				}
				xmlHttpCheck.open('GET', window.polyfilter_scriptpath + 'htc/sepia.htc', true);
				xmlHttpCheck.onreadystatechange = function(){
					if(xmlHttp.readyState == 4 && xmlHttp.status != 200){
						alert('The configured path \r\rvar polyfilter_scriptpath = "' + window.polyfilter_scriptpath + '"\r\rseems wrong!\r\rConfigure the polyfill\'s correct absolute(!) script path before referencing the css-filters-polyfill.js, like so:\r\rvar polyfilter_scriptpath = "/js/css-filters-polyfill/";\r\rLeaving IE dead in the water is no option. You damn Mac user... ;)');
					}
				};
				try{
					xmlHttpCheck.send(null);
				} catch(e){}
			},2000);
			
			
			var stylesheets = document.querySelectorAll ? document.querySelectorAll('style,link[rel="stylesheet"]') : document.getElementsByTagName('*');
			
			for(var i = 0; i < stylesheets.length; i++){
				(function(i){
					switch(stylesheets[i].nodeName){
						default:
						break;
						
						case 'STYLE':
							polyfilter._stylesheets.push({
								media:		stylesheets[i].media || 'all',
								content: 	stylesheets[i].innerHTML
							});
						break;
						
						case 'LINK':
							if(stylesheets[i].rel === 'stylesheet'){
								var index = polyfilter._stylesheets.length;
							
								polyfilter._stylesheets.push({
									media:		stylesheets[i].media || 'all'
								});
								
								polyfilter._pending_stylesheets++;
								
								// Fetch external stylesheet
								var href = stylesheets[i].href;
								
								// Use localStorage as cache for stylesheets, if available
								if(!polyfilter._development_mode && window.localStorage && window.localStorage.getItem('polyfilter_' + href)){
									polyfilter._pending_stylesheets--;
									polyfilter._stylesheets[index].content = localStorage.getItem('polyfilter_' + href);
									if(polyfilter._pending_stylesheets === 0){
										polyfilter.process();
									}
								}
	
								// Always fetch stylesheets to reflect possible changes
								try{
									if(window.XMLHttpRequest) {
										var xmlHttp = new XMLHttpRequest();
									} else if(window.ActiveXObject) {
										var xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
									}
									xmlHttp.open('GET', href, true);
									xmlHttp.onreadystatechange = function(){
										if(xmlHttp.readyState === 4){
											if(xmlHttp.status === 0){
												if(window.console) console.log('Could not fetch external CSS via HTTP-Request ' + href + '. Probably because of cross origin.');
												if(!polyfilter._stylesheets[index].content){
													polyfilter._pending_stylesheets--;
													polyfilter._stylesheets[index].content = xmlHttp.responseText;
													if(polyfilter._pending_stylesheets === 0){
														polyfilter.process();
													}
												}
											} else {
												if(!polyfilter._stylesheets[index].content){
													polyfilter._pending_stylesheets--;
													polyfilter._stylesheets[index].content = xmlHttp.responseText;
													if(polyfilter._pending_stylesheets === 0){
														polyfilter.process();
													}
												}
												// Cache stylesheet in localStorage, if available
												if(!polyfilter._development_mode && window.localStorage){
													try{
														window.localStorage.setItem('polyfilter_' + href,polyfilter._stylesheets[index].content)
													}
													catch(e){
														if(window.console) console.log('Local storage quota have been exceeded. Caching of stylesheet ' + href + ' is not possible');
													}
												}
											}
										}
									};
									try{
										xmlHttp.send(null);
									} catch(e){
										if(window.console) console.log('Could not fetch external CSS via HTTP-Request ' + href + '. Are you maybe testing using the file://-protocol?');
										if(!polyfilter._stylesheets[index].content){
											polyfilter._pending_stylesheets--;
											if(polyfilter._pending_stylesheets === 0){
												polyfilter.process();
											}
										}
									}
								} catch(e){}
							}
						break;
					}
				})(i);
			}
			if(this._pending_stylesheets === 0){
				this.process();
			}
		},
	
		_processDeclarations:	function(rule){
			var newstyles = '';
			for(var k in rule.declarations){
				var declaration = rule.declarations[k];
			
				if(declaration.property === 'filter'){
					
					if(document.querySelectorAll){
						var elems = document.querySelectorAll(rule.mSelectorText);
						for(var k = 0; k < elems.length; k++){
							elems[k].style.polyfilterStore = declaration.valueText;
						}
					}
					
					var gluedvalues = declaration.valueText;
					var values = gluedvalues.split(/\)\s+/),
						properties = {
							filtersW3C:		[],
							filtersWebKit: 	[],
							filtersSVG:		[],
							filtersIE:		[],
							behaviorsIE:	[]
						};
					
					for(idx in values){
						var value = values[idx] + ')';
						
						currentproperties = polyfilter.convert(value);
		
						for(key in currentproperties){
							if(typeof properties[key] !== 'undefined'){
								properties[key] = properties[key].concat(currentproperties[key]);
							}
						}
					}
					
					newstyles += rule.mSelectorText + '{';
					if(properties['filtersW3C'].length > 0){
						var filter = 
						webkitFilter = 
						mozFilter = 
						oFilter = 
						msFilter = 
						properties['filtersW3C'].join(' ');
		
						if(properties['filtersWebKit'] && properties['filtersWebKit'].length > 0){
							webkitFilter = properties['filtersWebKit'].join(' ');
						}

						if(typeof this._ie === 'undefined'){
							newstyles += '-ms-filter:' + msFilter + ';';
						}
						
						newstyles += '-webkit-filter:' + webkitFilter + ';';
						newstyles += '-moz-filter:' + mozFilter + ';';
						newstyles += '-o-filter:' + oFilter + ';';
					}
					if(properties['filtersSVG'].length > 0){
						if(properties['filtersSVG'][0] != 'none'){
							var id = gluedvalues.replace(/[^a-z0-9]/g,'');

							if(typeof this._svg_cache[id] === 'undefined'){
								this._svg_cache[id] = this._create_svg(id,properties['filtersSVG']);

								if(typeof XMLSerializer === 'undefined'){
									document.body.appendChild(this._svg_cache[id]);
								}
								else {
									var s = new XMLSerializer();
									var svgString = s.serializeToString(this._svg_cache[id]);
									if(svgString.search('SourceGraphic') != -1){
										document.body.appendChild(this._svg_cache[id]);
									}
								}
							}
		
							if(typeof XMLSerializer === 'undefined'){
								newstyles += 'filter: url(#' + id + ')';
							}
							else {
								var s = new XMLSerializer();
								var svgString = s.serializeToString(this._svg_cache[id]);
								
								if(svgString.search('SourceGraphic') != -1){
									newstyles += 'filter: url(#' + id + ')';
								}
								else {
									newstyles += 'filter: url(\'data:image/svg+xml;utf8,' + svgString + '#' + id + '\')';
								}
							}
						}
						else {
							newstyles += 'filter: none;';
						}
					}
					if(typeof this._ie !== 'undefined'){
						if(properties['filtersIE'].length > 0){
							var filtersIE = properties['filtersIE'].join(' ');
							
							newstyles += 'filter:' + filtersIE + ';';
						}
						if(properties['behaviorsIE'].length > 0){
							var behaviorsIE = properties['behaviorsIE'].join(' ');
							
							newstyles += 'behavior:' + behaviorsIE + ';';
						}
					}
					newstyles += '}\r\n';
				}
			}
			return newstyles;
		},
		
		// Absolute path to the .htc-files
		scriptpath:		
			window.polyfilter_scriptpath ? window.polyfilter_scriptpath : (function(){
				alert('Please configure the polyfill\'s absolute(!) script path before referencing the css-filters-polyfill.js, like so:\r\nvar polyfilter_scriptpath = "/js/css-filters-polyfill/";');
				return './'
			})(),
		
		// process stylesheets
		process:		function(){
			var parser = new CSSParser();
	
			for(var i = 0; i < this._stylesheets.length; i++){
				var newstyles = '';
				var sheet = parser.parse(this._stylesheets[i].content, false, true);
				if(sheet !== null) for(var j in sheet.cssRules){
					var rule = sheet.cssRules[j];
					
					switch(rule.type){
						default:
						break;
						
						case 1:
							newstyles += this._processDeclarations(rule);
						break;
						
						case 4:
							newstyles += '@media ' + rule.media.join(',') + '{';
							for(var k in rule.cssRules){
								var mediarule = rule.cssRules[k];
								
								newstyles += this._processDeclarations(mediarule);
							}
							newstyles += '}';
						break;
					}
				}
				var newstylesheet = document.createElement('style');
				newstylesheet.setAttribute('media',this._stylesheets[i].media);
				
				if(typeof polyfilter._ie === 'undefined'){
					newstylesheet.innerHTML = newstyles;
					document.getElementsByTagName('head')[0].appendChild(newstylesheet);
				}
				else {
					document.getElementsByTagName('head')[0].appendChild(newstylesheet);
					newstylesheet.styleSheet.cssText = newstyles;
				}
			}
		},
		
		init:				function(){
			if(Object.defineProperty){
				Object.defineProperty(CSSStyleDeclaration.prototype, 'polyfilter', {
					get:	function(){
						return this.polyfilterStore;
					},
					set:	function(gluedvalues){
						values = gluedvalues.split(/\)\s+/);
						var properties = {
							filtersW3C:		[],
							filtersWebKit: 	[],
							filtersSVG:		[],
							filtersIE:		[],
							behaviorsIE:	[]
						}
				
						for(idx in values){
							var value = values[idx] + ')';
							
							currentproperties = polyfilter.convert(value);
							
							for(key in currentproperties){
								if(typeof properties[key] !== 'undefined'){
									properties[key] = properties[key].concat(currentproperties[key]);
								}
							}
						}
			
						if(properties['filtersW3C'].length > 0){
							if(typeof polyfilter._ie === 'undefined'){
								this.msFilter = 
									properties['filtersW3C'].join(' ');
							}
							
							this.webkitFilter = 
							this.mozFilter = 
							this.oFilter = 
								properties['filtersW3C'].join(' ');
						}
						if(properties['filtersWebKit'].length > 0){
							this.webkitFilter = properties['filtersWebKit'].join(' ');
						}
						if(properties['filtersSVG'].length > 0){
							if(properties['filtersSVG'][0] != 'none'){
								var id = gluedvalues.replace(/[^a-z0-9]/g,'');
					
								if(typeof polyfilter._svg_cache[id] === 'undefined'){
									polyfilter._svg_cache[id] = polyfilter._create_svg(id,properties['filtersSVG']);

									if(typeof XMLSerializer === 'undefined'){
										document.body.appendChild(polyfilter._svg_cache[id]);
									}
									else {
										var s = new XMLSerializer();
										var svgString = s.serializeToString(polyfilter._svg_cache[id]);
										if(svgString.search('SourceGraphic') != -1){
											document.body.appendChild(polyfilter._svg_cache[id]);
										}
									}
								}
			
								if(typeof XMLSerializer === 'undefined'){
									this.filter = 'url(#' + id + ')';
								}
								else {
									var s = new XMLSerializer();
									var svgString = s.serializeToString(polyfilter._svg_cache[id]);
									if(svgString.search('SourceGraphic') != -1){
										this.filter = 'url(#' + id + ')';
									}
									else {
										this.filter = 'url(\'data:image/svg+xml;utf8,' + svgString + '#' + id + '\')';
									}
								}
							}
							else {
								this.filter = 'none';
							}
						}
						if(typeof polyfilter._ie !== 'undefined'){
							if(properties['filtersIE'].length > 0){
								this.filter = 
									properties['filtersIE'].join(' ');
							}
							else {
								this.filter = '';
							}
							if(properties['behaviorsIE'].length > 0){
								this.behavior = 
									properties['behaviorsIE'].join(' ');
							}
							else {
								this.behavior = '';
							}
						}
						this.polyfilterStore = gluedvalues;
					}
				});
			}
		},
		
		convert:			function(value){
			// None
			var fmatch = value.match(/none/i);
			if(fmatch !== null){
				var properties = this.filters.none();
			}
			// Grayscale
			var fmatch = value.match(/(grayscale)\(([0-9\.]+)\)/i);
			if(fmatch !== null){
				var amount = parseFloat(fmatch[2],10),
					properties = this.filters.grayscale(amount);
			}
			// Sepia
			var fmatch = value.match(/(sepia)\(([0-9\.]+)\)/i);
			if(fmatch !== null){
				var amount = parseFloat(fmatch[2],10),
					properties = this.filters.sepia(amount);
			}
			// Blur
			var fmatch = value.match(/(blur)\(([0-9]+)[px]*\)/i);
			if(fmatch !== null){
				var amount = parseInt(fmatch[2],10),
					properties = this.filters.blur(amount);
			}
			// Invert
			var fmatch = value.match(/(invert)\(([0-9\.]+)\)/i);
			if(fmatch !== null){
				var amount = parseFloat(fmatch[2],10),
					properties = this.filters.invert(amount);
			}
			// Brightness
			var fmatch = value.match(/(brightness)\(([0-9\.]+)%\)/i);
			if(fmatch !== null){
				var amount = parseFloat(fmatch[2],10),
					properties = this.filters.brightness(amount);
			}
			// Drop Shadow
			var fmatch = value.match(/(drop\-shadow)\(([0-9]+)[px]*\s+([0-9]+)[px]*\s+([0-9]+)[px]*\s+([#0-9]+)\)/i);
			if(fmatch !== null){
				var offsetX = parseInt(fmatch[2],10),
					offsetY = parseInt(fmatch[3],10),
					radius = parseInt(fmatch[4],10),
					color = fmatch[5],
					properties = this.filters.dropShadow(offsetX,offsetY,radius,color);
			}
			
			return properties;
		},
		
		// EFFECTS SECTION -------------------------------------------------------------------------------------------------------------
		
		filters: 		{
			// None
			none:			function(){
				var properties = {};
				
				if(typeof polyfilter._ie === 'undefined'){
					// Proposed spec
					properties['filtersW3C'] = ['none'];
					
					// Firefox
					properties['filtersSVG'] = ['none'];
				}
				else {
					// IE
					properties['filtersIE'] = ['none'];
				}
				
				return properties;
			},
			
			// Grayscale
			grayscale:			function(amount){
				amount = amount || 0;
				
				var properties = {};
				
				if(typeof polyfilter._ie === 'undefined'){
					// Proposed spec
					properties['filtersW3C'] = ['grayscale(' + amount + ')'];
					
					// Firefox
					// https://dvcs.w3.org/hg/FXTF/raw-file/tip/filters/index.html
					var svg_fe1 = polyfilter._create_svg_element('feColorMatrix',{
						type:	'matrix',
						values:	(0.2126 + 0.7874 * (1 - amount)) + ' ' 
							+ (0.7152 - 0.7152 * (1 - amount)) + ' ' 
							+ (0.0722 - 0.0722 * (1 - amount)) + ' 0 0 ' 
							+ (0.2126 - 0.2126 * (1 - amount)) + ' ' 
							+ (0.7152 + 0.2848 * (1 - amount)) + ' ' 
							+ (0.0722 - 0.0722 * (1 - amount)) + ' 0 0 ' 
							+ (0.2126 - 0.2126 * (1 - amount)) + ' ' 
							+ (0.7152 - 0.7152 * (1 - amount)) + ' ' 
							+ (0.0722 + 0.9278 * (1 - amount)) + ' 0 0 0 0 0 1 0'
					});
					properties['filtersSVG'] = [svg_fe1];
				}
				else {
					// IE
					properties['filtersIE'] = amount >= 0.5 ? ['gray'] : [];
				}
				
				return properties;
			},
			
			// Sepia
			sepia:			function(amount){
				amount = amount || 0;
		
				var properties = {};
		
				if(typeof polyfilter._ie === 'undefined'){
				
					// Proposed spec
					properties['filtersW3C'] = ['sepia(' + amount + ')'];
					
					// Firefox
					// https://dvcs.w3.org/hg/FXTF/raw-file/tip/filters/index.html
					var svg_fe1 = polyfilter._create_svg_element('feColorMatrix',{
						type:	'matrix',
						values:	(0.393 + 0.607 * (1 - amount)) + ' ' 
							+ (0.769 - 0.769 * (1 - amount)) + ' ' 
							+ (0.189 - 0.189 * (1 - amount)) + ' 0 0 ' 
							+ (0.349 - 0.349 * (1 - amount)) + ' ' 
							+ (0.686 + 0.314 * (1 - amount)) + ' ' 
							+ (0.168 - 0.168 * (1 - amount)) + ' 0 0 '
							+ (0.272 - 0.272 * (1 - amount)) + ' ' 
							+ (0.534 - 0.534 * (1 - amount)) + ' ' 
							+ (0.131 + 0.869 * (1 - amount)) + ' 0 0 0 0 0 1 0'
					});
					properties['filtersSVG'] = [svg_fe1];
				}
				else {
					// IE
					properties['filtersIE'] = amount >= 0.5 ? ['gray','progid:DXImageTransform.Microsoft.Light()'] : [];
					properties['behaviorsIE'] = amount >= 0.5 ? ['url("' + polyfilter.scriptpath + 'htc/sepia.htc")'] : [];
				}
				
				return properties;
			},
			
			// Blur
			blur:			function(amount){
				amount = Math.round(amount) || 0;
				
				var properties = {};
				
				if(typeof polyfilter._ie === 'undefined'){
					// Proposed spec
					properties['filtersW3C'] = ['blur(' + amount + 'px)'];
					
					// Firefox
					// https://dvcs.w3.org/hg/FXTF/raw-file/tip/filters/index.html
					var svg_fe1 = polyfilter._create_svg_element('feGaussianBlur',{
						'in':			'SourceGraphic',
						stdDeviation: amount
					});
					properties['filtersSVG'] = [svg_fe1];
				}
				else {
					// IE
					properties['filtersIE'] = ['progid:DXImageTransform.Microsoft.Blur(pixelradius=' + amount + ')'];
				}
				
				return properties;
			},
			
			// Invert
			invert:			function(amount){
				amount = amount || 0;
				
				var properties = {};
				
				if(typeof polyfilter._ie === 'undefined'){
					// Proposed spec
					properties['filtersW3C'] = ['invert(' + amount + ')'];
					
					// Firefox
					// https://dvcs.w3.org/hg/FXTF/raw-file/tip/filters/index.html
					var svg_fe1 = polyfilter._create_svg_element('feComponentTransfer',{});
					var svg_fe1sub = polyfilter._create_svg_element('feFuncR',{
						type:	'table',
						tableValues: amount + ' ' + (1 - amount)
					});
					svg_fe1.appendChild(svg_fe1sub);
					var svg_fe1sub = polyfilter._create_svg_element('feFuncG',{
						type:	'table',
						tableValues: amount + ' ' + (1 - amount)
					});
					svg_fe1.appendChild(svg_fe1sub);
					var svg_fe1sub = polyfilter._create_svg_element('feFuncB',{
						type:	'table',
						tableValues: amount + ' ' + (1 - amount)
					});
					svg_fe1.appendChild(svg_fe1sub);
					properties['filtersSVG'] = [svg_fe1];
				}
				else {
					// IE
					properties['filtersIE'] = amount >= 0.5 ? ['invert'] : [];
				}
				
				return properties;
			},
				
			// Brightness
			brightness:			function(amount){
				amount = amount || 0;
				
				var properties = {};
				
				if(typeof polyfilter._ie === 'undefined'){
					// Proposed spec
					properties['filtersW3C'] = ['brightness(' + amount + '%)'];
	
					// WebKit "specialty"
					properties['filtersWebKit'] = ['brightness(' + (amount - 100) + '%)'];
					
					// Firefox
					// https://dvcs.w3.org/hg/FXTF/raw-file/tip/filters/index.html
					var svg_fe1 = polyfilter._create_svg_element('feComponentTransfer',{});
					var svg_fe1sub = polyfilter._create_svg_element('feFuncR',{
						type:	'linear',
						slope: 	amount / 100
					});
					svg_fe1.appendChild(svg_fe1sub);
					var svg_fe1sub = polyfilter._create_svg_element('feFuncG',{
						type:	'linear',
						slope: 	amount / 100
					});
					svg_fe1.appendChild(svg_fe1sub);
					var svg_fe1sub = polyfilter._create_svg_element('feFuncB',{
						type:	'linear',
						slope: 	amount / 100 
					});
					svg_fe1.appendChild(svg_fe1sub);
					properties['filtersSVG'] = [svg_fe1];
				}
				else {
					// IE
					properties['filtersIE'] = ['progid:DXImageTransform.Microsoft.Light()'];
					properties['behaviorsIE'] = ['url("' + polyfilter.scriptpath + 'htc/brightness.htc")'];
				}
				
				return properties;
			},
				
			// Drop Shadow
			dropShadow:			function(offsetX,offsetY,radius,color){
				offsetX = Math.round(offsetX) || 0;
				offsetY = Math.round(offsetY) || 0;
				radius = Math.round(radius) || 0;
				color = color || '#000000';
				
				var properties = {};
				
				if(typeof polyfilter._ie === 'undefined'){
					// Proposed spec
					properties['filtersW3C'] = ['drop-shadow(' + offsetX + 'px ' + offsetY + 'px ' + radius + 'px ' + color + ')'];
					
					// Firefox
					// https://dvcs.w3.org/hg/FXTF/raw-file/tip/filters/index.html
					var svg_fe1 = polyfilter._create_svg_element('feGaussianBlur',{
						'in':		'SourceAlpha',
						stdDeviation: radius
					});
					var svg_fe2 = polyfilter._create_svg_element('feOffset',{
						dx:		offsetX + 1,
						dy:		offsetY + 1,
						result:	'offsetblur'
					});
					var svg_fe3 = polyfilter._create_svg_element('feFlood',{
						'flood-color': color
					});
					var svg_fe4 = polyfilter._create_svg_element('feComposite',{
						in2:	'offsetblur',
						operator: 'in'
					});
					var svg_fe5 = polyfilter._create_svg_element('feMerge',{});
					var svg_fe5sub = polyfilter._create_svg_element('feMergeNode',{});
					svg_fe5.appendChild(svg_fe5sub);
					var svg_fe5sub = polyfilter._create_svg_element('feMergeNode',{
						'in':		'SourceGraphic'
					});
					svg_fe5.appendChild(svg_fe5sub);
					properties['filtersSVG'] = [svg_fe1,svg_fe2,svg_fe3,svg_fe4,svg_fe5];
				}
				else {
					// IE
					properties['filtersIE'] = ['progid:DXImageTransform.Microsoft.Glow(color=' + color + ',strength=0)','progid:DXImageTransform.Microsoft.Shadow(color=' + color + ',strength=0)'];
					properties['behaviorsIE'] = ['url("' + polyfilter.scriptpath + 'htc/drop-shadow.htc")'];
				}
				
				return properties;
			}
		}
	}

	// Inialize, either via jQuery...
	if(window.jQuery){
		window.jQuery(document).ready(function(e) {
			polyfilter.process_stylesheets();
		});
	}
	// or via contentLoaded...
	else if(window.contentLoaded){
		contentLoaded(window,function(){
			polyfilter.process_stylesheets();
		});
	}
	// or on DOM ready / load
	else {
		if(window.addEventListener) // W3C standard
		{
			document.addEventListener('DOMContentLoaded', function(){
				polyfilter.process_stylesheets();
			}, false);
		} 
		else if(window.attachEvent) // Microsoft
		{
			window.attachEvent('onload', function(){
				polyfilter.process_stylesheets();
			});
		}
	}
	
	// Install style setters and getters
	polyfilter.init();
})(window);