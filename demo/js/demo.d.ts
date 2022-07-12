declare namespace GUI {
    function getPageComponent(): WUX.WComponent;
}
declare namespace GUI {
    class GUIDemo extends WUX.WComponent {
        protected frmFilter: WUX.WFormPanel;
        protected btnRefresh: WUX.WButton;
        protected btnDialog: WUX.WButton;
        protected btnWindow: WUX.WButton;
        protected tabTest: WUX.WDXTable;
        protected dlgTest: WUX.WDialog;
        protected winTest: WUX.WWindow;
        protected tcoTest: WUX.WTab;
        protected boxTest: WUX.WBox;
        protected container: WUX.WContainer;
        constructor();
        protected render(): WUX.WContainer;
    }
}
declare namespace GUI {
    class GUIMap extends WUX.WComponent {
        protected container: WUX.WContainer;
        protected btnCancel: WUX.WButton;
        protected btnFind: WUX.WButton;
        protected btnCenter: WUX.WButton;
        protected btnInflate: WUX.WButton;
        protected btnPolygon: WUX.WButton;
        protected map: OLMap;
        protected inflated: boolean;
        protected render(): WUX.WContainer;
        cancel(): void;
        find(): void;
        onMarkerHover(e: any): void;
        onMarkerClick(e: any): void;
    }
}
declare namespace GUI {
    export interface OLMapCfg {
        lon?: number;
        lat?: number;
        zoom?: number;
    }
    type OLMarkerColor = 'blue' | 'green' | 'orange' | 'purple' | 'red' | 'yellow';
    export class OLMap extends WUX.WComponent<any, string> {
        _cfg: OLMapCfg;
        map: ol.Map;
        view: ol.View;
        markers: any[][];
        mrkSrc: ol.source.Vector;
        mrkLay: ol.layer.Vector;
        mrkFea: ol.Feature[];
        polygons: any[][];
        polSrc: ol.source.Vector;
        polLay: ol.layer.Vector;
        polFea: ol.Feature[];
        $popup: JQuery;
        popup: ol.Overlay;
        popupn: string;
        constructor(id?: string, classStyle?: string, style?: string | WUX.WStyle, attributes?: string | object);
        get cfg(): OLMapCfg;
        set cfg(c: OLMapCfg);
        clear(): void;
        clearMarkers(): void;
        clearPolygons(): void;
        addMarker(lon: number, lat: number, name?: string, color?: OLMarkerColor, onhover?: (e: any) => any, onclick?: (e: any) => any): void;
        addPolygon(type: string, coordinates: any[], name?: string, color?: string, onhover?: (e: any) => any, onclick?: (e: any) => any): void;
        inflate(i: number): void;
        deflate(i: number): void;
        center(lon: number, lat: number, zoom: number): void;
        centerOn(o: any, zoom?: number): void;
        hidePopup(hard?: boolean): void;
        showPopup(e: any, p?: 'top' | 'bottom' | 'left' | 'right'): void;
        protected hexToRgba(hex: string, a: string): string;
        protected componentDidMount(): void;
        protected getMarker(f: ol.Feature | ol.render.Feature): any[];
        protected getPolygon(f: ol.Feature | ol.render.Feature): any[];
        protected _addMarker(lon: number, lat: number, name?: string, color?: OLMarkerColor): void;
        protected _addPolygon(type: string, coordinates: any[], name?: string, color?: string): void;
        protected fromLonLat(c: any[], d?: number): any[];
    }
    export {};
}
