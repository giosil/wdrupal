namespace GUI {

	import WUtil = WUX.WUtil;

	export function getPageComponent(): WUX.WComponent {
		let l = window.location.href;
		
		if(WUtil.ends(l, 'index')) {
			return new GUIDemo();
		}

		return new GUIDemo();
	}
}
