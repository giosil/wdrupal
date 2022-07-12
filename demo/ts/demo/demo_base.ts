namespace GUI {

	import WUtil = WUX.WUtil;

	export function getPageComponent(): WUX.WComponent {
		let l = window.location.href;
		
		if(WUtil.ends(l, 'index')) {
			return new GUIDemo();
		}
		else if(WUtil.ends(l, 'map')) {
			return new GUIMap();
		}

		return new GUIDemo();
	}
}
