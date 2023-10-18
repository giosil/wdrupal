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
    function getUserLogged() {
        var t = $('#toolbar-item-user');
        if (!t.length)
            return '';
        return t.text();
    }
    GUI.getUserLogged = getUserLogged;
})(GUI || (GUI = {}));
var GUI;
(function (GUI) {
    var WUtil = WUX.WUtil;
    var Chart = (function (_super) {
        __extends(Chart, _super);
        function Chart(id, type, classStyle, style, attributes) {
            var _this = _super.call(this, id ? id : '*', 'Chart', type, classStyle, style, attributes) || this;
            _this.labels = false;
            _this.forceOnChange = true;
            return _this;
        }
        Chart.prototype.updateState = function (nextState) {
            _super.prototype.updateState.call(this, nextState);
            this.source = [];
            this.series = [];
            if (!this.state)
                return;
            var d = this.state.data;
            if (!d || !d.length)
                return;
            var s = this.state.series;
            var v = this.state.values;
            if (!v)
                return;
            var a = this.state.arguments;
            if (!a)
                return;
            var t = this.state.argType;
            var noS = !s || s == a;
            if (noS) {
                this.series.push({
                    "valueField": "s0", "name": this.sTitle ? this.sTitle : s
                });
            }
            var arrayS = [];
            var arrayA = [];
            for (var _i = 0, d_1 = d; _i < d_1.length; _i++) {
                var dr = d_1[_i];
                if (!noS) {
                    var serVal = dr[s];
                    if (serVal && arrayS.indexOf(serVal) < 0) {
                        var idx = arrayS.length;
                        arrayS.push(serVal);
                        this.series.push({
                            "valueField": "s" + idx, "name": serVal
                        });
                    }
                }
                var argVal = dr[a];
                if (argVal && arrayA.indexOf(argVal) < 0) {
                    arrayA.push(argVal);
                }
            }
            for (var _a = 0, arrayA_1 = arrayA; _a < arrayA_1.length; _a++) {
                var ai = arrayA_1[_a];
                var sr = {};
                if (t == 'd') {
                    var d_3 = WUtil.toDate(ai);
                    sr["a"] = d_3 ? WUX.formatDate(d_3) : ai;
                }
                else {
                    sr["a"] = ai;
                }
                for (var _b = 0, d_2 = d; _b < d_2.length; _b++) {
                    var dr = d_2[_b];
                    var argVal = dr[a];
                    if (argVal != ai)
                        continue;
                    var value = dr[v];
                    if (!value)
                        value = 0;
                    if (noS) {
                        sr["s0"] = value;
                    }
                    else {
                        var serVal = dr[s];
                        var idx = arrayS.indexOf(serVal);
                        if (idx < 0)
                            continue;
                        sr["s" + idx] = value;
                    }
                }
                this.source.push(sr);
            }
        };
        Chart.prototype.componentDidMount = function () {
            if (this._tooltip) {
                this.root.attr('title', this._tooltip);
            }
            if (!this.title)
                this.title = '';
            if (!this.source)
                this.source = [];
            if (!this.series)
                this.series = [];
            if (!this.props)
                this.props = 'bar';
            var opt = {
                dataSource: this.source,
                commonSeriesSettings: {
                    argumentField: 'a',
                    type: this.props,
                    label: {
                        visible: this.labels,
                    },
                    point: {
                        symbol: this.pSymbol,
                        size: this.pSize,
                        visible: this.pVisible
                    }
                },
                series: this.series,
                title: this.title,
                legend: {
                    verticalAlignment: 'bottom',
                    horizontalAlignment: 'center',
                },
                export: {
                    enabled: true,
                },
                tooltip: {
                    enabled: true,
                }
            };
            if (this.palette) {
                opt.palette = this.palette;
            }
            if (this.xRotate) {
                opt.argumentAxis = {
                    label: {
                        displayMode: "rotate",
                        rotationAngle: this.xRotate
                    }
                };
            }
            if (this.subTitle) {
                opt.title = {
                    text: this.title,
                    subtitle: {
                        text: this.subTitle
                    }
                };
            }
            if (this.xTitle) {
                opt.argumentAxis = {
                    title: {
                        text: this.xTitle
                    }
                };
            }
            if (this.yTitle) {
                opt.valueAxis = {
                    title: {
                        text: this.yTitle
                    }
                };
            }
            $('#' + this.id).dxChart(opt);
        };
        Chart.prototype.getInstance = function (copt) {
            if (!this.mounted)
                return null;
            if (copt)
                this.root.dxChart(copt);
            return this.root.dxChart('instance');
        };
        return Chart;
    }(WUX.WComponent));
    GUI.Chart = Chart;
    var PieChart = (function (_super) {
        __extends(PieChart, _super);
        function PieChart(id, type, classStyle, style, attributes) {
            var _this = _super.call(this, id ? id : '*', 'PieChart', type, classStyle, style, attributes) || this;
            _this.labels = false;
            _this.forceOnChange = true;
            return _this;
        }
        PieChart.prototype.updateState = function (nextState) {
            _super.prototype.updateState.call(this, nextState);
            this.source = [];
            this.series = [];
            if (!this.state)
                return;
            var d = this.state.data;
            if (!d || !d.length)
                return;
            var v = this.state.values;
            if (!v)
                return;
            var a = this.state.arguments;
            if (!a)
                this.state.series;
            if (!a)
                return;
            var arrayA = [];
            var mapAV = {};
            var tot = 0;
            for (var _i = 0, d_4 = d; _i < d_4.length; _i++) {
                var r = d_4[_i];
                var val = WUtil.getNumber(r, v);
                tot += val;
                var arg = WUtil.getString(r, a);
                if (!arg)
                    continue;
                if (arrayA.indexOf(arg) < 0) {
                    arrayA.push(arg);
                }
                var pv = WUtil.getNumber(mapAV, arg);
                mapAV[arg] = pv + val;
            }
            for (var _a = 0, arrayA_2 = arrayA; _a < arrayA_2.length; _a++) {
                var arg = arrayA_2[_a];
                var val = WUtil.getNumber(mapAV, arg);
                var prc = tot ? val * 100 / tot : 0;
                this.source.push({ "a": arg, "v": WUtil.round2(prc) });
            }
            this.series.push({
                argumentField: "a",
                valueField: "v",
                label: {
                    visible: this.labels,
                    connector: {
                        visible: this.labels,
                        width: 1
                    }
                }
            });
        };
        PieChart.prototype.componentDidMount = function () {
            if (this._tooltip) {
                this.root.attr('title', this._tooltip);
            }
            if (!this.title)
                this.title = '';
            if (!this.source)
                this.source = [];
            if (!this.series)
                this.series = [];
            if (!this.props)
                this.props = 'pie';
            var opt = {
                dataSource: this.source,
                series: this.series,
                title: this.title,
                legend: {
                    verticalAlignment: 'bottom',
                    horizontalAlignment: 'center',
                },
                export: {
                    enabled: true,
                },
                tooltip: {
                    enabled: true,
                }
            };
            if (this.palette) {
                opt.palette = this.palette;
            }
            if (this.subTitle) {
                opt.title = {
                    text: this.title,
                    subtitle: {
                        text: this.subTitle
                    }
                };
            }
            $('#' + this.id).dxPieChart(opt);
        };
        PieChart.prototype.getInstance = function (copt) {
            if (!this.mounted)
                return null;
            if (copt)
                this.root.dxPieChart(copt);
            return this.root.dxPieChart('instance');
        };
        return PieChart;
    }(WUX.WComponent));
    GUI.PieChart = PieChart;
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
            _this.imgs = '/modules/demo/img/';
            _this.pdx = 0;
            _this.pdy = 0;
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
        OLMap.prototype.addGeometry = function (json, name, color, onhover, onclick) {
            if (!json)
                return;
            try {
                var g = JSON.parse(json);
                if (!g)
                    return;
                var t = WUtil.getString(g, "type");
                if (!t)
                    return;
                var c = WUtil.getArray(g, "coordinates");
                if (!c || !c.length)
                    return;
                if (t == 'Point') {
                    this.addMarker(c[0], c[1], name, color, onhover, onclick);
                }
                else {
                    this.addPolygon(t, c, name, color, onhover, onclick);
                }
            }
            catch (err) {
                console.error(err + ' in addGeometry ' + json);
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
                    src: this.imgs + 'marker-' + c + '.png',
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
                    src: this.imgs + 'marker-' + c + '.png',
                    scale: 0.6,
                })
            }));
        };
        OLMap.prototype.center = function (lon, lat, zoom) {
            this.hidePopup(true);
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
                var s = '';
                if (this.pdx)
                    s += 'margin-left:' + this.pdx + 'px;';
                if (this.pdy)
                    s += 'margin-top:' + this.pdy + 'px;';
                if (s)
                    s = ' style="' + s + '"';
                this.$popup = $('<div id="' + this.subId('man-popup') + '"' + s + '></div>').appendTo('body');
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
            if (this.share) {
                if (this.share.view) {
                    this.view = this.share.view;
                }
                else {
                    this.view = new ol.View({
                        center: ol.proj.fromLonLat([this._cfg.lon, this._cfg.lat]),
                        zoom: this._cfg.zoom
                    });
                    this.share.view = this.view;
                }
            }
            else {
                this.view = new ol.View({
                    center: ol.proj.fromLonLat([this._cfg.lon, this._cfg.lat]),
                    zoom: this._cfg.zoom
                });
            }
            if (this._cfg.controls) {
                this.controls = ol.control.defaults.defaults(this._cfg.controls);
            }
            if (this._cfg.interactions) {
                this.interactions = ol.interaction.defaults.defaults(this._cfg.interactions);
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
                var s = '';
                if (this.pdx)
                    s += 'margin-left:' + this.pdx + 'px;';
                if (this.pdy)
                    s += 'margin-top:' + this.pdy + 'px;';
                if (s)
                    s = ' style="' + s + '"';
                this.$popup = $('<div id="' + this.subId('man-popup') + '"' + s + '></div>').appendTo('body');
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
                var x = document.getElementById(_this.map.getTarget());
                var f = _this.map.forEachFeatureAtPixel(e.pixel, function (f) { return f; });
                var m = _this.getMarker(f);
                var c = false;
                if (m) {
                    var h = m[4];
                    if (m[5])
                        c = true;
                    if (h) {
                        e["lon"] = m[0];
                        e["lat"] = m[1];
                        h(e);
                    }
                }
                var p = _this.getPolygon(f);
                if (p) {
                    var h = p[4];
                    if (p[5])
                        c = true;
                    if (h)
                        h(e);
                }
                x.style.cursor = c ? 'pointer' : '';
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
                    src: this.imgs + 'marker-' + color + '.png',
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
var GUI;
(function (GUI) {
    var WUtil = WUX.WUtil;
    var GUIUpload = (function (_super) {
        __extends(GUIUpload, _super);
        function GUIUpload() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        GUIUpload.prototype.render = function () {
            var r = '<h3 class="arpa-title">Upload File</h3><br>';
            r += '<div id="divUpl">';
            r += '<form id="frmUpl" action="/demo/upload" method="post" enctype="multipart/form-data">';
            r += '<input type="file" name="datafile" id="datafile">';
            r += '<input type="hidden" name="addtime" id="addtime" value="0">';
            r += '<hr>';
            r += '<input type="submit" value="Upload">';
            r += '</form>';
            r += '</div>';
            return r;
        };
        GUIUpload.prototype.componentDidMount = function () {
            $("#frmUpl").on("submit", function (e) {
                e.preventDefault();
                var file = $("#datafile")[0].files[0];
                if (!file) {
                    WUX.showWarning('Select a file');
                    return;
                }
                var formData = new FormData();
                formData.append("datafile", file);
                $.ajax({
                    url: "/demo/upload",
                    type: "POST",
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function (response) {
                        console.log('response:', response);
                        WUX.showSuccess('File uploaded.');
                        var fileName = WUX.WUtil.getString(response, "filename");
                        $("#divUpl").html('<p>File uploaded: ' + fileName + '</p>');
                    },
                    error: function (jqXHR, textStatus, errorThrow) {
                        console.error(textStatus);
                        console.error(errorThrow);
                        WUX.showError('Error during upload file.');
                    }
                });
            });
        };
        return GUIUpload;
    }(WUX.WComponent));
    GUI.GUIUpload = GUIUpload;
    var ListFiles = (function (_super) {
        __extends(ListFiles, _super);
        function ListFiles(id, classStyle, style, attributes) {
            var _this = _super.call(this, id ? id : '*', 'ListFiles', '', classStyle, style, attributes) || this;
            _this.astyle = 'text-decoration: none;font-size: 1.4rem;cursor: pointer;';
            _this.forceOnChange = true;
            return _this;
        }
        ListFiles.prototype.load = function (path) {
            var _this = this;
            this.path = path;
            if (!this.path)
                this.path = 'doc';
            this.props = '/demo/files/' + this.path;
            this.rmurl = '/demo/del/' + this.path;
            $.ajax({
                type: 'GET',
                url: '/demo/list-files/' + path
            }).done(function (res) {
                if (!res || res.message) {
                    _this.setState([]);
                }
                else {
                    _this.setState(res.files);
                }
            }).fail(function (jqxhr, status, error) {
                console.log('response: ' + jqxhr.responseText + ', status: ' + status + ', error: ' + error);
                WUX.showError('Errore nel caricamento della cartella.');
            });
        };
        ListFiles.prototype.render = function () {
            this.files = [];
            if (!this.path)
                this.path = 'doc';
            if (!this.props)
                this.props = '/demo/files/' + this.path;
            if (!this.rmurl)
                this.rmurl = '/demo/del/' + this.path;
            if (!this.astyle)
                this.astyle = '';
            var r = '';
            var isAdmin = false;
            var u = GUI.getUserLogged();
            if (u) {
                isAdmin = $('body').hasClass('role--administrator');
                if (isAdmin) {
                    r += '<form id="' + this.subId('frm') + '" action="/demo/upload" method="post" enctype="multipart/form-data"><div class="row">';
                    r += '<div class="form-group col-md-5"><input class="form-control" type="file" name="datafile" id="datafile" required></div>';
                    r += '<input type="hidden" name="subfolder" id="subfolder" value="' + this.path + '">';
                    r += '<input type="hidden" name="addtime" id="addtime" value="0">';
                    r += '<div class="form-group col-md-7">';
                    r += '<button type="submit" class="btn btn-primary">Carica il file</button> &nbsp;&nbsp;';
                    r += '<button type="reset" class="btn btn-secondary">Annulla</button>';
                    r += '</div></div></form>';
                }
            }
            if (this.state && this.state.length) {
                this.state.sort();
                for (var _i = 0, _a = this.state; _i < _a.length; _i++) {
                    var item = _a[_i];
                    var ico = WUX.buildIcon(this.getIcon(item));
                    if (!ico)
                        continue;
                    this.files.push(item);
                    r += '<a href="' + this.props + '/' + item + '" target="_blank" style="' + this.astyle + '" title="Vedi file ' + item + '">' + ico + ' ' + item + '</a>';
                    if (isAdmin) {
                        var i = this.files.length - 1;
                        var d = '<a id="del_' + i + '" style="' + this.astyle + 'color:#800000;">' + WUX.buildIcon('fa-trash') + ' Elimina</a>';
                        r += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + d + '<br>';
                    }
                    else {
                        r += '<br>';
                    }
                }
            }
            else {
                r += '<h4>Nessun file disponibile al momento.</h4>';
            }
            return this.buildRoot(this.rootTag, r);
        };
        ListFiles.prototype.componentDidMount = function () {
            var _this = this;
            this.root.on('click', 'a', function (e) {
                var id = WUX.getId(e.currentTarget);
                if (!id)
                    return;
                var r = id.indexOf('_');
                if (r < 0)
                    return;
                if (id.substring(0, r) != 'del')
                    return;
                var x = WUtil.toNumber(id.substring(r + 1));
                if (!_this.files || _this.files.length <= x)
                    return;
                var f = _this.files[x];
                WUX.confirm('Si vuole eliminare il file ' + f + '?', function (cnf) {
                    if (!cnf)
                        return;
                    $.ajax({
                        type: 'GET',
                        url: _this.rmurl + '/' + _this.files[x]
                    }).done(function (res) {
                        _this.load(_this.path);
                    }).fail(function (jqxhr, status, error) {
                        console.log('response: ' + jqxhr.responseText + ', status: ' + status + ', error: ' + error);
                        WUX.showError('Errore durante la cancellazione del file.');
                    });
                });
            });
            var frm = document.getElementById(this.subId('frm'));
            if (!frm)
                return;
            frm.addEventListener("submit", function (e) {
                e.preventDefault();
                var xhr = new XMLHttpRequest();
                xhr.open("POST", "/demo/upload", true);
                xhr.onload = function () {
                    if (xhr.status == 200) {
                        console.log(xhr.responseText);
                        WUX.showSuccess('File caricato.');
                        _this.load(_this.path);
                    }
                    else {
                        WUX.showError('Errore durante l\'upload del file.');
                    }
                };
                var data = new FormData(frm);
                xhr.send(data);
            });
        };
        ListFiles.prototype.getIcon = function (file) {
            if (!file)
                return '';
            var s = file.lastIndexOf('.');
            if (s < 0)
                return '';
            if (s[0] == '.')
                return '';
            var e = file.substring(s + 1).toLowerCase();
            if (e == 'pdf')
                return 'fa-file-pdf-o';
            if (e == 'xls' || e == 'xlsx')
                return 'fa-file-excel-o';
            if (e == 'doc' || e == 'docx')
                return 'fa-file-word-o';
            if (e == 'ppt' || e == 'pptx')
                return 'fa-file-powerpoint-o';
            if (e == 'txt' || e == 'dat' || e == 'csv')
                return 'fa-file-text-o';
            if (e == 'png' || e == 'jpeg' || e == 'jpg' || e == 'bmp' || e == 'gif' || e == 'tiff' || e == 'webp')
                return 'fa-file-image-o';
            if (e == 'xps')
                return 'fa-file-o';
            if (e == 'gpkg' || e == 'json' || e == 'xml' || e == 'html' || e == 'htm')
                return 'fa-file-code-o';
            if (e == 'mp4' || e == 'avi')
                return 'fa-file-video-o';
            if (e == 'mp3' || e == 'wav' || e == 'aac')
                return 'fa-file-audio-o';
            if (e == 'zip' || e == 'tar' || e == 'gz')
                return 'fa-file-archive-o';
            return '';
        };
        return ListFiles;
    }(WUX.WComponent));
    GUI.ListFiles = ListFiles;
})(GUI || (GUI = {}));
//# sourceMappingURL=demo.js.map