$(document).on('click', '#export-anchor', function () {
	var panel_id = $('#panel_select').val();
	exportExcel(panel_id);
});

function exportExcel(panel_id) {
	$.ajax({
		url: domain + 'excel/generateExcelExport/' + panel_id,
		beforeSend: function () {
			n_loader = -1;
		},
		success: function (data) {
			let file_name = JSON.parse(data);
			downloadURI(domain + "files/" + file_name, file_name);
			if(file_name.includes("Medic_Panels_Report")) {
				Swal.fire({
					icon: 'success',
					title: 'Vaša datoteka Excela preuzeta je.',
					showConfirmButton: false,
					timer: 3000
				});
			} else {
				Swal.fire({
					icon: 'error',
					title: 'Something wrong occurred.',
					showConfirmButton: false,
					timer: 3000
				});
			}
		},
		complete: function () {
			n_loader = 1;
		}
	});

}


function downloadURI(uri, name)
{
	var link = document.createElement("a");
	link.download = name;
	link.href = uri;
	link.click();
}


$("#panel_select").change(function() {
	Swal.fire({
		icon: 'success',
		title: 'Sada možete kliknuti Izvezi na vrhu.',
		showConfirmButton: false,
		timer: 3000
	});
	$("#export-button-nav").css("display", "block");
});

$(document).ready(function() {
	$.ajax({
		url: domain + "ajax/statistics/getPanels",
		success: function (d) {
			var j_data = JSON.parse(d);
			let txt = '';
			let results = j_data;
			for (let i = 0; i < results.length; i++) {
				txt += '<option value="' + results[i].id + '">' + results[i].panel_name + '</option>';
			}
			$('#panel_select').append(txt);
		}
	});
});
