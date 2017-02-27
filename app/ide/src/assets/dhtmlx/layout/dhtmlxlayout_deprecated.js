/*
Product Name: dhtmlxLayout 
Version: 5.0 
Edition: Standard 
License: content of this file is covered by GPL. Usage outside GPL terms is prohibited. To obtain Commercial or Enterprise license contact sales@dhtmlx.com
Copyright UAB Dinamenta http://www.dhtmlx.com
*/

window.dhtmlxAjax = { get: function(a, c, b) { if (b) { return dhx4.ajax.getSync(a) } else { dhx4.ajax.get(a, c) } }, post: function(a, b, d, c) { if (c) { return dhx4.ajax.postSync(a, b) } else { dhx4.ajax.post(a, b, d) } }, getSync: function(a) { return dhx4.ajax.getSync(a) }, postSync: function(a, b) { return dhx4.ajax.postSync(a, b) } };
dhtmlXLayoutObject.prototype.listViews = function() { return this.listPatterns() };
dhtmlXLayoutObject.prototype.setEffect = function() {};
dhtmlXLayoutObject.prototype.getEffect = function() {};
dhtmlXLayoutObject.prototype.dockWindow = function(a) { this.cells(a).dock() };
dhtmlXLayoutObject.prototype.unDockWindow = function(a) { this.cells(a).undock() };
dhtmlXLayoutObject.prototype.setCollapsedText = function(b, a) { this.cells(b).setCollapsedText(a) };
dhtmlXLayoutObject.prototype.getIdByIndex = function(a) {
    if (a < 0 || a > this.items.length - 1) { return null }
    var b = null;
    this.forEachItem(function(c) { if (b == null && c == this.items[a]) { b = c.conf.name } });
    return b
};
dhtmlXLayoutObject.prototype.getIndexById = function(d) { var a = this.cells(d); var b = -1; for (var c = 0; c < this.items.length; c++) { if (a == this.items[c]) { b = c } } return b };
dhtmlXLayoutObject.prototype.showPanel = function(a) { this.cells(a).showHeader() };
dhtmlXLayoutObject.prototype.hidePanel = function(a) { this.cells(a).hideHeader() };
dhtmlXLayoutObject.prototype.isPanelVisible = function(a) { return this.cells(a).isHeaderVisible() };
dhtmlXLayoutObject.prototype.setImagePath = function() {};
dhtmlXLayoutCell.prototype.getIndex = function() { return this.conf.index };