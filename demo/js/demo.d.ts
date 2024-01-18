declare namespace GUI {
    function getPageComponent(): WUX.WComponent;
    function getUserLogged(): string;
    interface AppFolder {
        message?: string;
        baseurl?: string;
        dir?: string;
        folders?: string[];
        files?: string[];
    }
}
declare namespace GUI {
    export interface ChartData {
        series?: string;
        values?: string;
        arguments?: string;
        argType?: string;
        data?: any[];
    }
    type CharType = 'area' | 'bar' | 'bubble' | 'candlestick' | 'fullstackedarea' | 'fullstackedbar' | 'fullstackedline' | 'fullstackedspline' | 'fullstackedsplinearea' | 'line' | 'rangearea' | 'rangebar' | 'scatter' | 'spline' | 'splinearea' | 'stackedarea' | 'stackedbar' | 'stackedline' | 'stackedspline' | 'stackedsplinearea' | 'steparea' | 'stepline' | 'stock';
    export class Chart extends WUX.WComponent<CharType, ChartData> {
        title: string;
        subTitle: string;
        palette: any;
        source: any[];
        series: Array<DevExpress.viz.ChartSeries>;
        labels: boolean;
        legend: boolean;
        rotated: boolean;
        xTitle: string;
        xRotate: number;
        yTitle: string;
        sTitle: string;
        pSymbol: 'circle' | 'cross' | 'polygon' | 'square' | 'triangleDown' | 'triangleUp';
        pSize: number;
        pVisible: boolean;
        color: string;
        constructor(id?: string, type?: CharType, classStyle?: string, style?: string | WUX.WStyle, attributes?: string | object);
        protected updateState(nextState: ChartData): void;
        protected componentDidMount(): void;
        getInstance(copt?: DevExpress.viz.dxChartOptions): DevExpress.viz.dxChart;
    }
    export class PieChart extends WUX.WComponent<'donut' | 'doughnut' | 'pie', ChartData> {
        title: string;
        subTitle: string;
        palette: any;
        source: any[];
        series: Array<DevExpress.viz.PieChartSeries>;
        labels: boolean;
        constructor(id?: string, type?: 'donut' | 'doughnut' | 'pie', classStyle?: string, style?: string | WUX.WStyle, attributes?: string | object);
        protected updateState(nextState: ChartData): void;
        protected componentDidMount(): void;
        getInstance(copt?: DevExpress.viz.dxPieChartOptions): DevExpress.viz.dxPieChart;
    }
    export {};
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
    export interface OLMapCon {
        attribution?: boolean;
        zoom?: boolean;
    }
    export interface OLMapInt {
        doubleClickZoom?: boolean;
        dragAndDrop?: boolean;
        dragPan?: boolean;
        keyboardPan?: boolean;
        keyboardZoom?: boolean;
        mouseWheelZoom?: boolean;
        pointer?: boolean;
        select?: boolean;
    }
    export interface OLMapCfg {
        lon?: number;
        lat?: number;
        zoom?: number;
        controls?: OLMapCon;
        interactions?: OLMapInt;
    }
    export interface OLMapShare {
        view?: ol.View;
    }
    type OLMarkerColor = 'blue' | 'green' | 'orange' | 'purple' | 'red' | 'yellow' | 'gray';
    export class OLMap extends WUX.WComponent<any, string> {
        _cfg: OLMapCfg;
        imgs: string;
        map: ol.Map;
        view: ol.View;
        controls: ol.Collection<ol.control.Control>;
        interactions: ol.Collection<ol.interaction.Interaction>;
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
        pdx: number;
        pdy: number;
        share: OLMapShare;
        constructor(id?: string, classStyle?: string, style?: string | WUX.WStyle, attributes?: string | object);
        get cfg(): OLMapCfg;
        set cfg(c: OLMapCfg);
        clear(): void;
        clearMarkers(): void;
        clearPolygons(): void;
        addMarker(lon: number, lat: number, name?: string, color?: OLMarkerColor, onhover?: (e: any) => any, onclick?: (e: any) => any): void;
        addPolygon(type: string, coordinates: any[], name?: string, color?: string, onhover?: (e: any) => any, onclick?: (e: any) => any): void;
        addGeometry(json: string, name: string, color?: string, onhover?: (e: any) => any, onclick?: (e: any) => any): void;
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
declare namespace GUI {
    class ListFiles extends WUX.WComponent<string, string[]> {
        protected path: string;
        protected rmurl: string;
        protected files: string[];
        protected astyle: string;
        constructor(id?: string, classStyle?: string, style?: string | WUX.WStyle, attributes?: string | object);
        load(path: string): void;
        protected render(): string;
        protected componentDidMount(): void;
        protected getIcon(file: string): "" | "fa-file-pdf-o" | "fa-file-excel-o" | "fa-file-word-o" | "fa-file-powerpoint-o" | "fa-file-text-o" | "fa-file-image-o" | "fa-file-o" | "fa-file-code-o" | "fa-file-video-o" | "fa-file-audio-o" | "fa-file-archive-o";
    }
}
