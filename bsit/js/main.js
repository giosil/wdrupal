window.__PUBLIC_PATH__ = '/themes/bsit/bootstrap-italia/fonts';
bootstrap.loadFonts('/themes/bsit/bootstrap-italia/fonts');
window.BSIT={
notify:(n)=>{
	if(!n)return;
	const d=document.createElement('div');
	const i=Number($("[id*='api-notification-'").last().attr("data-id")) + 1 || 0;
	if(n.dismissable==null)n.dismissable=true;
	if(!n.title)n.title='';
	switch(n.state) {
		case 'error':
			n.icon="it-close-circle";
			break;
		case 'success':
			n.icon="it-check-circle";
			break;
		case 'warning':
			n.icon="it-error";
			break;
		default:
			n.icon="it-info-circle";
			break;
	}
	const h=`<div role="alert" class="notification with-icon mt-3 ${!n.dismissable ? '' : 'dismissable'} ${n.state || 'info'} show" style="display:block;z-index:1000;" id="api-notification-${i}" data-bs-toggle="notification" data-bs-target="#api-notification-${i}" data-id="${i}" data-bs-timeout="5000">
		<h5>${n.title}<svg class="icon"><use href="/themes/bsit/bootstrap-italia/svg/sprites.svg#${n.icon}" xlink:href="/themes/bsit/bootstrap-italia/svg/sprites.svg#${n.icon}"></use></svg></h5>
		<p>${n.message}</p><button type="button" class="notification-close btn btn- ${!n.dismissable ? 'd-none' : ''}">
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon" role="img"><path d="M12.7 12l3.7 3.6-.8.8-3.6-3.7-3.6 3.7-.8-.8 3.7-3.6-3.7-3.6.8-.8 3.6 3.7 3.6-3.7.8.8z"></path><path fill="none" d="M0 0h24v24H0z"></path></svg>
		<span class="sr-only">Chiudi notifica: ${n.title}</span></button></div>`;
	d.innerHTML=h;
	document.getElementById('notification-center').append(d.firstChild);
	setTimeout(()=>{document.getElementById('notification-center').innerHTML='';}, n.duration || 5000);
}};
var _bsitLogout=false;
function bsitCheckAuth(){
	var c=document.body.getAttribute('class');
	var a=document.getElementById('bsit-acc');
	var u=document.getElementById('bsit-usr');
	if(c && c.indexOf('role--authenticated') >= 0) {
		if(a){
			a.addEventListener('click',function(e){_bsitLogout=true;});
			a.setAttribute('href','/user/logout');
			a.setAttribute('target','_blank');
			a.setAttribute('title','Esci');
			a.innerText='Esci';
		}
		if(u)u.style.display='block';
		return true;
	}
	if(a){
		a.addEventListener('click',function(e){_bsitLogout=false;});
		a.setAttribute('href','/user/login');
		a.setAttribute('target','_self');
		a.setAttribute('title','Accedi');
		a.innerText='Accedi';
	};
	if(u)u.style.display='none';
	return false;
}
bsitCheckAuth();
window.addEventListener('focus',function(e){if(_bsitLogout)location.reload();});