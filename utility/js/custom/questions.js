let url = window.location.href.split("/");
let label_id = url[url.length - 1];

$(document).ready(function () {
	$.ajax({
		url: domain + "ajax/questions_list/questions_list/" + label_id,
		beforeSend: function () {
			n_loader = -1;
		},
		success: function (data) {
			j_data = null;
			try {
				label_data = JSON.parse(data);
				$("#old-edit-label-name").text(label_data[0].label_title);
				$("#edit_label_id").attr("value", label_id);
				$("#panel_select")
					.find("option[value=" + label_data[0].surv_survey_panels_id + "]")
					.attr("selected", true);
			} catch (e) {
				//TODO: Some logger solution
			}
		}		,
		complete: function () {
			n_loader = 1;
		}
	});

}); //end of document.ready

$(document).ready(function() {
	$.ajax({
		url: domain + "ajax/questions_list/questions_list/" + label_id,
		beforeSend: function () {
			n_loader = -1;
		},
		success: function (data) {
			j_data = null;
			try {
				j_data = JSON.parse(data);
				let table = '<thead>\n' +
					'\t\t\t\t<tr>\n' +
					'\t\t\t\t<th>#</th>\n' +
					'\t\t\t\t<th>Tekst pitanja</th>\n' +
					'\t\t\t\t<th>Vrsta pitanja</th>\n' +
					'\t\t\t\t<th>Odgovori</th>\n' +
					'\t\t\t\t<th>Opcije</th>\n' +
					'\t\t\t\t</tr>\n' +
					'\t\t\t\t</thead><tbody>';
				for(let i = 0; i < j_data.length; i++) {
					table += '<tr>';
					table += '<td>'+ (parseInt(i) + 1) +'</td>'
					table += '<td>' + j_data[i].question_text + '</td>';
					table += '<td>' + findQuestionType(j_data[i].question_category_id) + '</td>';
					if(questionNeedsAnswers(j_data[i].question_category_id)){
						table += '<td><button name="'+ j_data[i].id +'" data-toggle="modal" data-target="#answers_modal" class="btn btn-success see_answers">Vidi odgovore</button></td>'
					} else {
						table += '<td>Nema odgovora</td>'
					}
					table += '<td>' +  getOptionButtons(j_data[i].id) + '</td>';
					table += '</tr>';
				}
				table += '\t\t<tbody>';

				$("#questions").append(table);
				$('#add_question').removeAttr('hidden');
				$('#add_question').attr('href', "questions_list/add_question/" + label_id);

			} catch (e) {
				//TODO: Some logger solution
			}

		},
		complete: function () {
			$('#questions').DataTable();
			n_loader = 1;
		}
	});

});
$(document).on('click', '.see_answers', function(){
	let question_id = $(this).attr('name');
	$("#modal_append").empty();
	$.ajax({
		url: domain + "ajax/answers_list/get_answers/" + question_id,
		type: 'post',
		beforeSend: function () {
			n_loader = -1;
		},
		success: function(data) {
			j_data = JSON.parse(data);
			let answers_table = '<table id="answers" class="display" style="width:100%"><thead>\n' +
				'\t\t\t\t<tr>\n' +
				'\t\t\t\t<th>Odgovor</th>\n' +
				'\t\t\t\t<th>Opcije</th>\n' +
				'\t\t\t\t</tr>\n' +
				'\t\t\t\t</thead><tbody>';
			for(let i = 0; i < j_data.length; i++) {
				answers_table += '<tr>';
				answers_table += '<td>' + j_data[i].text + '</td>';
				answers_table += '<td>' +  getAnswerOptions(j_data[i].id) + '</td>';
				answers_table += '</tr>';
			}
			answers_table += '\t\t<tbody></table>';
			answers_table += '<a href="" hidden class="btn btn-primary" id="add_question">Add new answer</a>'
			$("#modal_append").append(answers_table);
		},
		complete: function () {
			$('#answers').DataTable();
			n_loader = 1;
		}
	});
});

$(document).on('click', '.edit_answer', function(){
	let answer_id = $(this).attr('name');
	let form = '<form id="edit-answer-form" method="post">'
	form += '<div class="card"><div class="card-body"><h2 class="mb-2">Uredi Odgovor</h2></div></div>';
	form += '<div class="card mt-3">';// card
	form += '<div class="card-body">';// card body
	form += '<h2 class="mb-2 question_label">Odgovor</h2>';
	form += '<div class="form-group"><label for="answer_text">Tekst odgovora</label>';
	form += '<input type="text" class="form-control" name="answer_text" id="answer_text" required>';
	form += '<input value="' + answer_id + '" type="hidden" class="form-control" name="answer_id" id="answer_id">';
	form += '</div></div>'; //end form-group and card body
	form += '</div>'; //end card
	form += '</form>';
	form += '<button type="submit" class="btn btn-primary mt-3 mb-5" id="submit_edit_answer">Završi</button><button type="reset" class="btn btn-danger mt-3 mb-5">Ocisti</button>'
	$("#modal_append").empty();
	$("#modal_append").append(form);

});


$(document).on('click', '.delete_answer', function(){
	let answer_id = $(this).attr('name');
	$.ajax({
		url: domain + "ajax/answers_list/delete_answer/" + answer_id,
		type: 'post',
		beforeSend: function () {
			n_loader = -1;
		},
		success: function (data) {
			var submission = JSON.parse(data);
			try {
				if(submission == "success"){
					Swal.fire({
						icon: 'success',
						title: 'Odgovor je uspješno izbrisan!',
						showConfirmButton: false,
						timer: 2000
					});
					setTimeout(function () {
						window.location = domain + 'questions_list/' + label_id;
					}, 2000);
				} else {
					Swal.fire({
						icon: 'error',
						title: 'Oops...',
						text: 'Odgovor nije obrisan.',
						showConfirmButton: false,
						timer: 2000
					})
				}

			}catch(e) {
				//TODO: Some logger solution

			}
		},complete: function () {
			n_loader = 1;
		}
	});
})

$(document).on('click', '.delete_question', function () {
	var question_id = $(this).attr('name');
	$.ajax({
		url: domain + "ajax/questions_list/delete_question/" + question_id,
		type: 'post',
		beforeSend: function () {
			n_loader = -1;
		},
		success: function (result) {
			var submission = JSON.parse(result);
			try {
				if(submission == "success"){
					Swal.fire({
						icon: 'success',
						title: 'Pitanje je uspješno izbrisano.',
						showConfirmButton: false,
						timer: 2000
					});
					setTimeout(function () {
						window.location = domain + 'questions_list/' + label_id;
					}, 2000);
				} else {
					Swal.fire({
						icon: 'error',
						title: 'Oops...',
						text: 'Pitanje nije izbrisano. Nešto nije u redu.',
						showConfirmButton: false,
						timer: 2000
					})
				}

			}catch(e) {
				//TODO: Some logger solution

			}
		},complete: function () {
			n_loader = 1;
		}
	});
});

$(document).on('click', '#submit_edit_answer', function () {
	$.ajax({
		type: "POST",
		url: domain + "ajax/answers_list/update_answer",
		data: {
			answer_text: $('#answer_text').val(),
			answer_id: $('#answer_id').val()
		},
		beforeSend: function () {
			n_loader = -1;
		},
		success: function(data){
			var submission = JSON.parse(data);

			if (submission == "success") {
				Swal.fire({
					icon: "success",
					title: "Odgovor je uspješno promijenjen!",
					showConfirmButton: false,
					timer: 3000,
				});
			} else {
				Swal.fire({
					icon: "error",
					title: "Oops...",
					text: "Odgovor nije uspješno promijenjen.",
					showConfirmButton: false,
					timer: 2000,
				});
			}
			$("#modal_append").empty();
			$('#answers_modal').modal('toggle')
		},
		complete: function () {
			n_loader = 1;
		}
	});
});

function getAnswerOptions(id) {
	return '<div class="btn-group" role="group" aria-label="options">\n' +
		'\t\t\t\t\t<button name="'+id+'" type="button" class="btn btn-primary edit_answer">Uredi odgovor</button>\n' +
		'\t\t\t\t\t<button name="'+id+'" type="button" class="btn btn-danger delete_answer">Izbriši</button>\n' +
		'\t\t\t\t</div>';
}


function getOptionButtons(id) {
	return '<div class="btn-group" role="group" aria-label="options">\n' +
		'\t\t\t\t\t<a href="edit_question/' + id + '" name="'+id+'" type="button" class="btn btn-primary edit_question">Uredi pitanje</a>\n' +
		'\t\t\t\t\t<button name="'+id+'" type="button" class="btn btn-danger delete_question">Izbriši</button>\n' +
		'\t\t\t\t</div>';
}
function questionNeedsAnswers(id){
	let result = findQuestionType(id);
	if(result == "Radio" || result == "Padajući izbornik" || result == "Checkbox + tekst" || result == "Radio + tekst" || result == "Više checkboxova"){
		return true;
	} else {
		return false;
	}
}

function findQuestionType(id) {
	switch (id) {
		case "1":
			return "Checkbox"
			break;
		case "2":
			return "Radio"
			break;
		case "3":
			return "Datum"
			break;
		case "4":
			return "Padajući izbornik"
			break;
		case "5":
			return "Tekst"
			break;
		case "6":
			return "Vrijeme"
			break;
		case "7":
			return "Broj"
			break;
		case "8":
			return "Više checkboxova"
			break;
		case "9":
			return "Checkbox + tekst"
			break;
		case "10":
			return "Radio + tekst"
			break;
		case "12":
			return "Onemogućen tekst"
			break;
		case "13":
			return "Tekst/Tekst"
			break;
		case "14":
			return "Polje za upis više teksta"
			break;
		default:
			return "";
			break;
	}
}
