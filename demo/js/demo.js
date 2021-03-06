var GUI;
(function (GUI) {
    var WUtil = WUX.WUtil;
    function getPageComponent() {
        var l = window.location.href;
        if (WUtil.ends(l, 'index')) {
            return new GUI.GUIDemo();
        }
        else if (WUtil.ends(l, 'map')) {
            return new GUI.GUIMap();
        }
        return new GUI.GUIDemo();
    }
    GUI.getPageComponent = getPageComponent;
})(GUI || (GUI = {}));
var GUI;
(function (GUI) {
    var GUIDemo = (function (_super) {
        __extends(GUIDemo, _super);
        function GUIDemo() {
            return _super.call(this, 'app-demo', 'GUIDemo') || this;
        }
        GUIDemo.prototype.render = function () {
            var _this = this;
            var options = new Array();
            options.push({ id: 0, text: '(None)' });
            options.push({ id: 1, text: 'Option 1' });
            options.push({ id: 2, text: 'Option 2' });
            this.frmFilter = new WUX.WFormPanel('frmFilter', 'Filtro');
            this.frmFilter.addRow();
            this.frmFilter.addCurrency5Field('c', 'Codice');
            this.frmFilter.addOptionsField('o', 'Opzioni', options);
            this.frmFilter.addRow();
            this.frmFilter.addTextField('d', 'Descrizione');
            this.frmFilter.addDateField('t', 'Data', false);
            this.frmFilter.setValue('t', WUX.WUtil.getCurrDate());
            this.frmFilter.on('statechange', function (e) {
                console.log('WFormPanel:statechange', _this.frmFilter.getState());
                _this.btnRefresh.trigger('click');
            });
            this.btnRefresh = new WUX.WButton('btnRefresh', 'Find items', WUX.WIcon.REFRESH, WUX.BTN.PRIMARY, 'width: 180px');
            this.btnRefresh.tooltip = 'Button example';
            this.btnRefresh.on('click', function (e) {
                console.log('btnRefresh:click', _this.frmFilter.getState());
                var result = [];
                for (var i = 0; i < 5; i++) {
                    result.push([i, 'ITEM ' + i, new Date(), (i % 2) == 0]);
                }
                _this.tabTest.setState(result);
                WUX.showSuccess(result.length + ' items found');
            });
            this.btnDialog = new WUX.WButton('btnDialog', 'Show Dialog', WUX.WIcon.SHARE_SQUARE_O, WUX.BTN.SECONDARY, 'width: 180px');
            this.btnDialog.on('click', function (e) {
                console.log('btnDialog:click');
                WUX.confirm('Si vuole mostrare la dialog?', function (res) {
                    if (!res)
                        return;
                    _this.dlgTest.show();
                });
            });
            this.btnWindow = new WUX.WButton('btnWindow', 'Show Window', WUX.WIcon.EDIT, WUX.BTN.INFO, 'width: 180px');
            this.btnWindow.on('click', function (e) {
                console.log('btnWindow:click');
                _this.winTest.show();
            });
            this.tabTest = new WUX.WDXTable('tabTest', ['Id', 'Description', 'DateTime', 'Flag']);
            this.tabTest.filter = true;
            this.tabTest.exportFile = 'export';
            this.tabTest.css({ h: 200 });
            this.tabTest.onSelectionChanged(function (e) {
                console.log('WTable:selectionchange ' + e.element.wuxComponent().id);
            });
            this.tabTest.onDoubleClick(function (e) {
                WUX.showWarning('WTable onDoubleClick');
            });
            this.tabTest.onRowPrepared(function (e) {
                var id = WUX.WUtil.getNumber(e.data, 'i', 0);
                switch (id) {
                    case 1:
                        WUX.setCss(e.rowElement, WUX.CSS.WARNING);
                        break;
                    case 3:
                        WUX.setCss(e.rowElement, WUX.CSS.ERROR);
                        break;
                }
            });
            this.dlgTest = new WUX.WDialog('dlgTest');
            this.dlgTest.header.add('<h4>Test dialog</h4>');
            this.dlgTest.body.add('<p>Example of dialog</p>');
            this.dlgTest.onShownModal(function (e) {
                console.log('WDialog:shownmodal', e.target);
            });
            this.dlgTest.onHiddenModal(function (e) {
                console.log('WDialog:hiddenmodal ok=' + _this.dlgTest.ok);
            });
            this.winTest = new WUX.WWindow('winTest');
            this.winTest.width = 300;
            this.winTest.background = '#ffffaa';
            this.winTest.body.add('<p>Example of window</p>');
            this.winTest.onShow(function (e) {
                console.log('WWindow:show');
            });
            this.winTest.onHide(function (e) {
                console.log('WWindow:hide');
            });
            this.tcoTest = new WUX.WTab('tcoTest');
            this.tcoTest.addTab('First tab', WUX.WIcon.CALENDAR).add('<h1>First tab</h1>');
            this.tcoTest.addTab('Second tab', WUX.WIcon.ADDRESS_CARD).add('<h1>Second tab</h1>');
            this.tcoTest.addTab('Third tab', WUX.WIcon.CALCULATOR).add('<h1>Third tab</h1>');
            this.tcoTest.setState(1);
            this.tcoTest.on('statechange', function (e) {
                console.log('WTab:statechange', _this.tcoTest.getState());
            });
            this.boxTest = new WUX.WBox('boxTest', 'Box title');
            this.boxTest.content.add('<h1>Box content</h1>');
            this.boxTest.footer.add('<p>Footer example</p>');
            this.container = new WUX.WContainer();
            this.container.legend = 'Demo';
            this.container
                .addRow()
                .addCol('col-md-10', 'padding-left: 0')
                .addBox('Filtro', 'ibox-filter')
                .add(this.frmFilter)
                .addCol('col-md-2')
                .addStack({ p: '4px' }, this.btnRefresh, this.btnDialog, this.btnWindow)
                .addRow()
                .addCol('col-md-12')
                .add(this.tabTest)
                .addRow()
                .addDiv(8)
                .addCol('col-md-6')
                .add(this.tcoTest)
                .addCol('col-md-6')
                .add(this.boxTest);
            WUX.debug = false;
            this.tcoTest.debug = true;
            return this.container;
        };
        return GUIDemo;
    }(WUX.WComponent));
    GUI.GUIDemo = GUIDemo;
})(GUI || (GUI = {}));
var GUI;
(function (GUI) {
    var WUtil = WUX.WUtil;
    var GUIMap = (function (_super) {
        __extends(GUIMap, _super);
        function GUIMap() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        GUIMap.prototype.render = function () {
            var _this = this;
            this.btnCancel = new WUX.WButton('btc', 'Clear', WUX.WIcon.UNDO, WUX.BTN.SECONDARY, 'width: 130px');
            this.btnCancel.tooltip = 'Clear';
            this.btnCancel.on('click', function (e) {
                _this.cancel();
            });
            this.btnFind = new WUX.WButton('btf', 'Markers', WUX.WIcon.SEARCH, WUX.BTN.PRIMARY, 'width: 130px');
            this.btnFind.tooltip = 'Markers';
            this.btnFind.on('click', function (e) {
                _this.find();
            });
            this.btnCenter = new WUX.WButton('btx', 'Zoom', WUX.WIcon.BOOKMARK, WUX.BTN.INFO, 'width: 130px');
            this.btnCenter.tooltip = 'Zoom';
            this.btnCenter.on('click', function (e) {
                _this.map.centerOn(0);
            });
            this.btnInflate = new WUX.WButton('bti', 'Inflate', WUX.WIcon.ARROW_CIRCLE_O_UP, WUX.BTN.DANGER, 'width: 130px');
            this.btnInflate.tooltip = 'Inflate';
            this.btnInflate.on('click', function (e) {
                if (_this.inflated) {
                    _this.map.deflate(0);
                    _this.inflated = false;
                }
                else {
                    _this.map.inflate(0);
                    _this.inflated = true;
                }
            });
            this.btnPolygon = new WUX.WButton('btp', 'Polygon', WUX.WIcon.EDIT, WUX.BTN.INFO, 'width: 130px');
            this.btnPolygon.tooltip = 'Polygon';
            this.btnPolygon.on('click', function (e) {
                _this.map.clearPolygons();
                var s = "{\"type\":\"MultiPolygon\",\"coordinates\":[[[[12.6116,41.9209],[12.7406,41.9267],[12.8047,41.8230],[12.5990,41.8531]]]]}";
                var g = JSON.parse(s);
                var t = WUtil.getString(g, "type");
                var c = WUtil.getArray(g, "coordinates");
                _this.map.addPolygon(t, c, 'Test Polygon', '#ff0000', null, function (e) { console.log("polygon click ", e); _this.map.showPopup(e, 'top'); });
                _this.map.addPolygon('LineString', [[12.4241, 41.9766], [12.3770, 42.0274], [12.2440, 42.0523], [12.2682, 42.0916]], 'Test line', '#0000aa');
            });
            this.map = new GUI.OLMap(this.subId('map'));
            this.map.cfg = { lon: 12.4846, lat: 41.8977, zoom: 9 };
            this.container = new WUX.WContainer();
            this.container
                .addRow(null, 'padding-top:8px;')
                .addCol('col-md-6')
                .section('Map')
                .add(this.map)
                .addCol('col-md-6')
                .section('Actions')
                .addStack(WUX.CSS.STACK_BTNS, this.btnCancel, this.btnFind, this.btnCenter, this.btnInflate, this.btnPolygon);
            return this.container;
        };
        GUIMap.prototype.cancel = function () {
            this.map.clear();
            this.map.center(12.4846, 41.8977, 9);
        };
        GUIMap.prototype.find = function () {
            this.map.clearMarkers();
            var on_hover = this.onMarkerHover.bind(this);
            var on_click = this.onMarkerClick.bind(this);
            this.map.addMarker(12.2497, 41.7981, 'Fiumicino Airport', 'blue', on_hover, on_click);
            this.map.addMarker(12.5945, 41.7978, 'Ciampino Airport', 'red', on_hover, on_click);
        };
        GUIMap.prototype.onMarkerHover = function (e) {
            console.log("marker hover ", e);
            this.map.showPopup(e, 'left');
        };
        GUIMap.prototype.onMarkerClick = function (e) {
            console.log("marker click ", e);
            this.map.centerOn(e);
        };
        return GUIMap;
    }(WUX.WComponent));
    GUI.GUIMap = GUIMap;
})(GUI || (GUI = {}));
var GUI;
(function (GUI) {
    var WUtil = WUX.WUtil;
    var OLMap = (function (_super) {
        __extends(OLMap, _super);
        function OLMap(id, classStyle, style, attributes) {
            var _this = _super.call(this, id ? id : '*', 'OLMap', null, classStyle, style ? style : 'width:100%;height:600px', attributes) || this;
            _this._cfg = {};
            _this.markers = [];
            _this.mrkFea = [];
            _this.polygons = [];
            _this.polFea = [];
            return _this;
        }
        Object.defineProperty(OLMap.prototype, "cfg", {
            get: function () {
                return this._cfg;
            },
            set: function (c) {
                this._cfg = c;
            },
            enumerable: false,
            configurable: true
        });
        OLMap.prototype.clear = function () {
            this.clearMarkers();
            this.clearPolygons();
        };
        OLMap.prototype.clearMarkers = function () {
            this.markers = [];
            this.mrkFea = [];
            if (this.mounted && this.mrkLay) {
                this.map.removeLayer(this.mrkLay);
                this.mrkSrc = null;
                this.mrkLay = null;
                this.hidePopup();
            }
        };
        OLMap.prototype.clearPolygons = function () {
            this.polygons = [];
            this.polFea = [];
            if (this.mounted && this.polLay) {
                this.map.removeLayer(this.polLay);
                this.polSrc = null;
                this.polLay = null;
                this.hidePopup();
            }
        };
        OLMap.prototype.addMarker = function (lon, lat, name, color, onhover, onclick) {
            this.markers.push([lon, lat, name, color, onhover, onclick]);
            if (this.mounted) {
                this.hidePopup(false);
                this._addMarker(lon, lat, name, color);
            }
        };
        OLMap.prototype.addPolygon = function (type, coordinates, name, color, onhover, onclick) {
            this.polygons.push([type, coordinates, name, color, onhover, onclick]);
            if (this.mounted) {
                this.hidePopup(false);
                this._addPolygon(type, coordinates, name, color);
            }
        };
        OLMap.prototype.inflate = function (i) {
            if (i < 0 && i >= this.mrkFea.length)
                return;
            var mi = this.markers[i];
            var mf = this.mrkFea[i];
            var c = mi[3];
            if (!c)
                c = 'blue';
            mf.setStyle(new ol.style.Style({
                image: new ol.style.Icon({
                    anchor: [0.5, 46],
                    anchorXUnits: 'fraction',
                    anchorYUnits: 'pixels',
                    src: '/modules/sira/img/marker-' + c + '.png',
                    scale: 1,
                })
            }));
        };
        OLMap.prototype.deflate = function (i) {
            if (i < 0 && i >= this.mrkFea.length)
                return;
            var mi = this.markers[i];
            var mf = this.mrkFea[i];
            var c = mi[3];
            if (!c)
                c = 'blue';
            mf.setStyle(new ol.style.Style({
                image: new ol.style.Icon({
                    anchor: [0.5, 46],
                    anchorXUnits: 'fraction',
                    anchorYUnits: 'pixels',
                    src: '/modules/sira/img/marker-' + c + '.png',
                    scale: 0.6,
                })
            }));
        };
        OLMap.prototype.center = function (lon, lat, zoom) {
            this.hidePopup();
            if (!lon && !lat)
                return;
            if (this.view) {
                this.view.setCenter(ol.proj.fromLonLat([lon, lat]));
                this.view.setZoom(zoom);
            }
            else {
                this._cfg.lon = lon;
                this._cfg.lat = lat;
                this._cfg.zoom = zoom;
            }
        };
        OLMap.prototype.centerOn = function (o, zoom) {
            if (zoom === void 0) { zoom = 16; }
            var lon = 0;
            var lat = 0;
            if (typeof o == 'number') {
                if (!this.markers)
                    return;
                if (o < 0 || o >= this.markers.length)
                    return;
                var m = this.markers[o];
                lon = m[0];
                lat = m[1];
            }
            else {
                lon = WUtil.getNumber(o, "lon");
                lat = WUtil.getNumber(o, "lat");
            }
            if (!lon && !lat)
                return;
            this.center(lon, lat, zoom);
        };
        OLMap.prototype.hidePopup = function (hard) {
            this.$popup.popover('hide');
            this.popupn = '';
            if (hard) {
                this.map.removeOverlay(this.popup);
                this.$popup.remove();
                this.$popup = $('<div id="' + this.subId('man-popup') + '"></div>').appendTo('body');
                this.popup = new ol.Overlay({
                    element: this.$popup.get(0),
                    positioning: 'bottom-center',
                    stopEvent: false,
                });
                this.map.addOverlay(this.popup);
            }
        };
        OLMap.prototype.showPopup = function (e, p) {
            if (p === void 0) { p = 'top'; }
            var n = '';
            var f = e ? this.map.forEachFeatureAtPixel(e.pixel, function (f) { return f; }) : null;
            if (f) {
                n = f.get('name');
                if (n == this.popupn)
                    return;
            }
            if (this.popupn)
                this.hidePopup(true);
            this.popupn = n;
            if (n) {
                this.popup.setPosition(e.coordinate);
                this.$popup.popover({
                    placement: p,
                    html: true,
                    content: n,
                });
                this.$popup.popover('show');
            }
        };
        OLMap.prototype.hexToRgba = function (hex, a) {
            var res = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            if (!res)
                return '';
            var r = parseInt(res[1], 16);
            var g = parseInt(res[2], 16);
            var b = parseInt(res[3], 16);
            if (!a)
                a = '1.0';
            return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
        };
        OLMap.prototype.componentDidMount = function () {
            var _this = this;
            if (!this._cfg.lon)
                this._cfg.lon = 12.4846;
            if (!this._cfg.lat)
                this._cfg.lat = 41.8977;
            if (!this._cfg.zoom)
                this._cfg.zoom = 9;
            this.view = new ol.View({
                center: ol.proj.fromLonLat([this._cfg.lon, this._cfg.lat]),
                zoom: this._cfg.zoom
            });
            if (this._cfg.controls) {
                this.controls = ol.control.defaults(this._cfg.controls);
            }
            if (this._cfg.interactions) {
                this.interactions = ol.interaction.defaults(this._cfg.interactions);
            }
            this.map = new ol.Map({
                target: this.id,
                layers: [
                    new ol.layer.Tile({
                        source: new ol.source.OSM()
                    })
                ],
                view: this.view,
                controls: this.controls,
                interactions: this.interactions
            });
            this.$popup = $('#' + this.subId('man-popup'));
            if (!this.$popup.length) {
                this.$popup = $('<div id="' + this.subId('man-popup') + '"></div>').appendTo('body');
            }
            this.popup = new ol.Overlay({
                element: this.$popup.get(0),
                positioning: 'bottom-center',
                stopEvent: false,
            });
            this.map.addOverlay(this.popup);
            this.map.on('click', function (e) {
                _this.hidePopup(true);
                var f = _this.map.forEachFeatureAtPixel(e.pixel, function (f) { return f; });
                var m = _this.getMarker(f);
                if (m) {
                    var h = m[5];
                    if (h) {
                        e["lon"] = m[0];
                        e["lat"] = m[1];
                        h(e);
                    }
                }
                var p = _this.getPolygon(f);
                if (p) {
                    var h = p[5];
                    if (h)
                        h(e);
                }
            });
            this.map.on('pointermove', function (e) {
                var f = _this.map.forEachFeatureAtPixel(e.pixel, function (f) { return f; });
                var m = _this.getMarker(f);
                if (m) {
                    var h = m[4];
                    if (h) {
                        e["lon"] = m[0];
                        e["lat"] = m[1];
                        h(e);
                    }
                }
                var p = _this.getPolygon(f);
                if (p) {
                    var h = p[4];
                    if (h)
                        h(e);
                }
            });
            if (this.markers) {
                for (var _i = 0, _a = this.markers; _i < _a.length; _i++) {
                    var m = _a[_i];
                    this._addMarker(m[0], m[1], m[2], m[3]);
                }
            }
            if (this.polygons) {
                for (var _b = 0, _c = this.polygons; _b < _c.length; _b++) {
                    var p = _c[_b];
                    this._addPolygon(p[0], p[1], p[2], p[3]);
                }
            }
        };
        OLMap.prototype.getMarker = function (f) {
            if (f && this.markers) {
                var name_1 = f.get('name');
                var idx = WUtil.indexOf(this.markers, 2, name_1);
                if (idx >= 0)
                    return this.markers[idx];
            }
            return null;
        };
        OLMap.prototype.getPolygon = function (f) {
            if (f && this.polygons) {
                var name_2 = f.get('name');
                var idx = WUtil.indexOf(this.polygons, 2, name_2);
                if (idx >= 0)
                    return this.polygons[idx];
            }
            return null;
        };
        OLMap.prototype._addMarker = function (lon, lat, name, color) {
            var mf = new ol.Feature({
                geometry: new ol.geom.Point(ol.proj.fromLonLat([lon, lat])),
                name: name,
            });
            if (!color)
                color = 'blue';
            mf.setStyle(new ol.style.Style({
                image: new ol.style.Icon({
                    anchor: [0.5, 46],
                    anchorXUnits: 'fraction',
                    anchorYUnits: 'pixels',
                    src: '/modules/sira/img/marker-' + color + '.png',
                    scale: 0.6,
                })
            }));
            this.mrkFea.push(mf);
            if (this.mrkSrc && this.mrkLay) {
                this.mrkSrc.addFeature(mf);
            }
            else {
                this.mrkSrc = new ol.source.Vector({
                    features: this.mrkFea
                });
                this.mrkLay = new ol.layer.Vector({
                    source: this.mrkSrc
                });
                this.map.addLayer(this.mrkLay);
            }
        };
        OLMap.prototype._addPolygon = function (type, coordinates, name, color) {
            if (!type)
                type = 'MultiPolygon';
            if (!color)
                color = '#ff0000';
            var pf;
            if (type == 'Polygon') {
                if (WUtil.starts(color, '#')) {
                    color = this.hexToRgba(color, '0.4');
                }
                coordinates = this.fromLonLat(coordinates, 3);
                pf = new ol.Feature({
                    geometry: new ol.geom.Polygon(coordinates),
                    name: name,
                });
                pf.setStyle(new ol.style.Style({
                    stroke: new ol.style.Stroke({
                        color: 'black',
                        width: 1,
                    }),
                    fill: new ol.style.Fill({
                        color: color,
                    })
                }));
            }
            else if (type == 'LineString') {
                coordinates = this.fromLonLat(coordinates, 2);
                pf = new ol.Feature({
                    geometry: new ol.geom.LineString(coordinates),
                    name: name,
                });
                pf.setStyle(new ol.style.Style({
                    stroke: new ol.style.Stroke({
                        color: color,
                        width: 3,
                    })
                }));
            }
            else if (type == 'MultiLineString') {
                coordinates = this.fromLonLat(coordinates, 3);
                pf = new ol.Feature({
                    geometry: new ol.geom.MultiLineString(coordinates),
                    name: name,
                });
                pf.setStyle(new ol.style.Style({
                    stroke: new ol.style.Stroke({
                        color: color,
                        width: 3,
                    })
                }));
            }
            else {
                if (WUtil.starts(color, '#')) {
                    color = this.hexToRgba(color, '0.4');
                }
                coordinates = this.fromLonLat(coordinates, 4);
                pf = new ol.Feature({
                    geometry: new ol.geom.MultiPolygon(coordinates),
                    name: name,
                });
                pf.setStyle(new ol.style.Style({
                    stroke: new ol.style.Stroke({
                        color: 'black',
                        width: 1,
                    }),
                    fill: new ol.style.Fill({
                        color: color,
                    })
                }));
            }
            this.polFea.push(pf);
            if (this.polSrc && this.polLay) {
                this.polSrc.addFeature(pf);
            }
            else {
                this.polSrc = new ol.source.Vector({
                    features: this.polFea
                });
                this.polLay = new ol.layer.Vector({
                    source: this.polSrc
                });
                this.map.addLayer(this.polLay);
            }
        };
        OLMap.prototype.fromLonLat = function (c, d) {
            if (d === void 0) { d = 1; }
            if (d == 1) {
                var ll = ol.proj.fromLonLat(c);
                c[0] = ll[0];
                c[1] = ll[1];
            }
            else if (d == 2) {
                for (var _i = 0, c_1 = c; _i < c_1.length; _i++) {
                    var c0 = c_1[_i];
                    var ll = ol.proj.fromLonLat(c0);
                    c0[0] = ll[0];
                    c0[1] = ll[1];
                }
            }
            else if (d == 3) {
                for (var _a = 0, c_2 = c; _a < c_2.length; _a++) {
                    var c0 = c_2[_a];
                    for (var _b = 0, c0_1 = c0; _b < c0_1.length; _b++) {
                        var c1 = c0_1[_b];
                        var ll = ol.proj.fromLonLat(c1);
                        c1[0] = ll[0];
                        c1[1] = ll[1];
                    }
                }
            }
            else if (d == 4) {
                for (var _c = 0, c_3 = c; _c < c_3.length; _c++) {
                    var c0 = c_3[_c];
                    for (var _d = 0, c0_2 = c0; _d < c0_2.length; _d++) {
                        var c1 = c0_2[_d];
                        for (var _e = 0, c1_1 = c1; _e < c1_1.length; _e++) {
                            var c2 = c1_1[_e];
                            var ll = ol.proj.fromLonLat(c2);
                            c2[0] = ll[0];
                            c2[1] = ll[1];
                        }
                    }
                }
            }
            return c;
        };
        return OLMap;
    }(WUX.WComponent));
    GUI.OLMap = OLMap;
})(GUI || (GUI = {}));
//# sourceMappingURL=demo.js.map