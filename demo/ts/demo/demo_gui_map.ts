namespace GUI {

	import WUtil = WUX.WUtil;

	export class GUIMap extends WUX.WComponent {
		protected container: WUX.WContainer;
		protected btnCancel: WUX.WButton;
		protected btnFind: WUX.WButton;
		protected btnCenter: WUX.WButton;
		protected btnInflate: WUX.WButton;
		protected btnPolygon: WUX.WButton;
		protected map: OLMap;
		protected inflated: boolean;

		protected render() {
			this.btnCancel = new WUX.WButton('btc', 'Clear', WUX.WIcon.UNDO, WUX.BTN.SECONDARY, 'width: 130px');
			this.btnCancel.tooltip = 'Clear';
			this.btnCancel.on('click', (e: JQueryEventObject) => {
				this.cancel();
			});

			this.btnFind = new WUX.WButton('btf', 'Markers', WUX.WIcon.SEARCH, WUX.BTN.PRIMARY, 'width: 130px');
			this.btnFind.tooltip = 'Markers';
			this.btnFind.on('click', (e: JQueryEventObject) => {
				this.find();
			});

			this.btnCenter = new WUX.WButton('btx', 'Zoom', WUX.WIcon.BOOKMARK, WUX.BTN.INFO, 'width: 130px');
			this.btnCenter.tooltip = 'Zoom';
			this.btnCenter.on('click', (e: JQueryEventObject) => {
				this.map.centerOn(0);
			});

			this.btnInflate = new WUX.WButton('bti', 'Inflate', WUX.WIcon.ARROW_CIRCLE_O_UP, WUX.BTN.DANGER, 'width: 130px');
			this.btnInflate.tooltip = 'Inflate';
			this.btnInflate.on('click', (e: JQueryEventObject) => {
				if(this.inflated) {
					this.map.deflate(0);
					this.inflated = false;
				}
				else {
					this.map.inflate(0);
					this.inflated = true;
				}
			});

			this.btnPolygon = new WUX.WButton('btp', 'Polygon', WUX.WIcon.EDIT, WUX.BTN.INFO, 'width: 130px');
			this.btnPolygon.tooltip = 'Polygon';
			this.btnPolygon.on('click', (e: JQueryEventObject) => {
				this.map.clearPolygons();

				let s = "{\"type\":\"MultiPolygon\",\"coordinates\":[[[[12.6116,41.9209],[12.7406,41.9267],[12.8047,41.8230],[12.5990,41.8531]]]]}";
				let g = JSON.parse(s);
				let t = WUtil.getString(g, "type");
				let c = WUtil.getArray(g, "coordinates");
				this.map.addPolygon(t, c, 'Test Polygon', '#ff0000', null, (e) => {console.log("polygon click ", e); this.map.showPopup(e, 'top'); });

				this.map.addPolygon('LineString', [[12.4241, 41.9766],[12.3770, 42.0274],[12.2440, 42.0523],[12.2682, 42.0916]], 'Test line', '#0000aa');
			});

			this.map = new OLMap(this.subId('map'));
			this.map.cfg = {lon: 12.4846, lat: 41.8977, zoom: 9};

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
		}

		cancel(): void {
			this.map.clear();
			this.map.center(12.4846, 41.8977, 9);
		}

		find(): void {
			this.map.clearMarkers();

			let on_hover = this.onMarkerHover.bind(this);
			let on_click = this.onMarkerClick.bind(this);

			this.map.addMarker(12.2497, 41.7981, 'Fiumicino Airport', 'blue', on_hover, on_click);
			this.map.addMarker(12.5945, 41.7978, 'Ciampino Airport',  'red',  on_hover, on_click);
		}

		onMarkerHover(e: any) {
			console.log("marker hover ", e); 
			this.map.showPopup(e, 'left');
		}

		onMarkerClick(e: any) {
			console.log("marker click ", e); 
			this.map.centerOn(e);
		}
	}
	
}