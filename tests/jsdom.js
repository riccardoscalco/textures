const jsdom = require('jsdom');

module.exports = function (html) {
	return (new jsdom.JSDOM(html)).window.document;
};
