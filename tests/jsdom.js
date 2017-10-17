const jsdom = require('jsdom');
const d3 = require('d3-selection');

module.exports = function(html) {
	return (new jsdom.JSDOM(html)).window.document;
};
