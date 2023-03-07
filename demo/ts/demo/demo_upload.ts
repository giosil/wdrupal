namespace GUI {

	export class GUIUpload extends WUX.WComponent {

		protected render() {
			let r = '<h3 class="arpa-title">Upload File</h3><br>';
			r += '<div id="divUpl">'
			r += '<form id="frmUpl" action="/demo/upload" method="post" enctype="multipart/form-data">';
			r += '<input type="file" name="datafile" id="datafile">';
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

}