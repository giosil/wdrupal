namespace GUI {
	
	import WUtil = WUX.WUtil;

	export class GUIUpload extends WUX.WComponent {

		protected render() {
			let r = '<h3 class="arpa-title">Upload File</h3><br>';
			r += '<div id="divUpl">'
			r += '<form id="frmUpl" action="/demo/upload" method="post" enctype="multipart/form-data">';
			r += '<input type="file" name="datafile" id="datafile">';
			r += '<input type="hidden" name="addtime" id="addtime" value="0">';
			r += '<hr>'
			r += '<input type="submit" value="Upload">';
			r += '</form>';
			r += '</div>';
			return r;
		}

		protected componentDidMount(): void {
			$("#frmUpl").on("submit", (e: JQueryEventObject) => {
				e.preventDefault();

				var file = ($("#datafile")[0] as any).files[0];
				if(!file) {
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
					success: (response) => {
						console.log('response:', response);
						WUX.showSuccess('File uploaded.');
						let fileName = WUX.WUtil.getString(response, "filename");
						$("#divUpl").html('<p>File uploaded: ' + fileName + '</p>')
					},
					error: (jqXHR: JQueryXHR, textStatus: string, errorThrow: string) => {
						console.error(textStatus);
						console.error(errorThrow);
						WUX.showError('Error during upload file.');
					}
				});
			});
		}
	}

	export class ListFiles extends WUX.WComponent<string, string[]> {
		protected path: string;
		protected rmurl: string;
		protected files: string[];
		protected astyle: string;

		constructor(id?: string, classStyle?: string, style?: string | WUX.WStyle, attributes?: string | object) {
			super(id ? id : '*', 'ListFiles', '', classStyle, style, attributes);
			this.astyle = 'text-decoration: none;font-size: 1.4rem;cursor: pointer;';
			// Ricostruisce il componente ogni volta che cambia stato
			this.forceOnChange = true;
		}

		load(path: string): void {
			this.path = path;
			if(!this.path) this.path = 'doc';
			this.props = '/demo/files/' + this.path;
			this.rmurl = '/demo/del/' + this.path;
			$.ajax({
				type: 'GET',
				url: '/demo/list-files/' + path
			}).done((res: AppFolder) => {
				if(!res || res.message) {
					this.setState([]);
				}
				else {
					this.setState(res.files);
				}
			}).fail((jqxhr: JQueryXHR, status: string, error: any) => {
				console.log('response: ' + jqxhr.responseText + ', status: ' + status + ', error: ' + error);
				WUX.showError('Errore nel caricamento della cartella.');
			});
		}

		protected render() {
			this.files = [];
			if(!this.path) this.path = 'doc';
			if(!this.props) this.props = '/demo/files/' + this.path;
			if(!this.rmurl) this.rmurl = '/demo/del/' + this.path;
			if(!this.astyle) this.astyle = '';
			let r = '';
			let isAdmin = false;
			let u = getUserLogged();
			if(u) {
				isAdmin = $('body').hasClass('role--administrator');
				if(isAdmin) {
					r += '<form id="' + this.subId('frm') + '" action="/demo/upload" method="post" enctype="multipart/form-data"><div class="row">';
					r += '<div class="form-group col-md-5"><input class="form-control" type="file" name="datafile" id="datafile" required></div>'
					r += '<input type="hidden" name="subfolder" id="subfolder" value="' + this.path + '">';
					r += '<input type="hidden" name="addtime" id="addtime" value="0">';
					r += '<div class="form-group col-md-7">'
					r += '<button type="submit" class="btn btn-primary">Carica il file</button> &nbsp;&nbsp;';
					r += '<button type="reset" class="btn btn-secondary">Annulla</button>';
					r += '</div></div></form>';
				}
			}
			if(this.state && this.state.length) {
				this.state.sort();
				for(let item of this.state) {
					let ico = WUX.buildIcon(this.getIcon(item));
					if(!ico) continue;
					this.files.push(item);
					r += '<a href="' + this.props + '/' + item + '" target="_blank" style="' + this.astyle + '" title="Vedi file ' + item + '">' + ico + ' ' + item + '</a>';
					if(isAdmin) {
						let i = this.files.length - 1;
						let d = '<a id="del_' + i + '" style="' + this.astyle + 'color:#800000;">' + WUX.buildIcon('fa-trash') + ' Elimina</a>';
						r += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + d + '<br>';
					}
					else {
						r += '<br>';
					}
				}
			}
			else {
				r += '<h4>Nessun file disponibile al momento.</h4>'
			}
			return this.buildRoot(this.rootTag, r);
		}

		protected componentDidMount(): void {
			this.root.on('click', 'a', (e: JQueryEventObject) => {
				let id = WUX.getId(e.currentTarget);
				if (!id) return;
				let r = id.indexOf('_');
				if(r < 0) return;
				if(id.substring(0, r) != 'del') return;
				let x = WUtil.toNumber(id.substring(r + 1));
				if(!this.files || this.files.length <= x) return;
				let f = this.files[x];
				WUX.confirm('Si vuole eliminare il file ' + f + '?', (cnf) => {
					if(!cnf) return;
					$.ajax({
						type: 'GET',
						url: this.rmurl + '/' + this.files[x]
					}).done((res: object) => {
						this.load(this.path);
					}).fail((jqxhr: JQueryXHR, status: string, error: any) => {
						console.log('response: ' + jqxhr.responseText + ', status: ' + status + ', error: ' + error);
						WUX.showError('Errore durante la cancellazione del file.');
					});
				});
			});

			let frm = document.getElementById(this.subId('frm'));
			if(!frm) return;

			frm.addEventListener("submit", (e: SubmitEvent) => {
				e.preventDefault();
				const xhr = new XMLHttpRequest();
				xhr.open("POST", "/demo/upload", true);
				xhr.onload = () => {
					if (xhr.status == 200) {
						console.log(xhr.responseText);
						WUX.showSuccess('File caricato.');
						this.load(this.path);
					}
					else {
						WUX.showError('Errore durante l\'upload del file.');
					}
				};
				const data = new FormData(frm as HTMLFormElement);
				xhr.send(data);
			});
		}

		protected getIcon(file: string) {
			if(!file) return '';
			let s = file.lastIndexOf('.');
			if(s < 0) return '';
			if(s[0] == '.') return '';
			let e = file.substring(s + 1).toLowerCase();
			if(e == 'pdf') return 'fa-file-pdf-o';
			if(e == 'xls' || e == 'xlsx') return 'fa-file-excel-o';
			if(e == 'doc' || e == 'docx') return 'fa-file-word-o';
			if(e == 'ppt' || e == 'pptx') return 'fa-file-powerpoint-o';
			if(e == 'txt' || e == 'dat' || e == 'csv') return 'fa-file-text-o';
			if(e == 'png' || e == 'jpeg' || e == 'jpg' || e == 'bmp' || e == 'gif' || e == 'tiff' || e == 'webp') return 'fa-file-image-o';
			if(e == 'xps') return 'fa-file-o';
			if(e == 'gpkg' || e == 'json' || e == 'xml' || e == 'html' || e == 'htm') return 'fa-file-code-o';
			if(e == 'mp4' || e == 'avi') return 'fa-file-video-o';
			if(e == 'mp3' || e == 'wav' || e == 'aac') return 'fa-file-audio-o';
			if(e == 'zip' || e == 'tar' || e == 'gz') return 'fa-file-archive-o';
			// return 'fa-file-o';
			// File non "riconosciuti" non vengono riportati 
			return '';
		}
	}
}