let url = window.location.href.split("/");
let question_id = url[url.length - 1];

//document ready
$(document).ready(function () {
	$.ajax({
		url: domain + 'ajax/questions_list/get_question/' + question_id,
		success: function (data) {
            let j_data = JSON.parse(data);
			$('.question_label').append(j_data[0]['question_text']);
            $('#question_id').attr('value', question_id);
		},
	});
}); //end of document.ready


$("#edit-question-form").submit(function (e) {
	e.preventDefault();
	var form = $(this);
	var form_data = form.serialize();

	$.ajax({
		type: "POST",
		url: domain + "ajax/questions_list/update_question",
		data: form.serialize(),
		success: function (data) {
			var submission = JSON.parse(data);
			if (submission == "success") {
				Swal.fire({
					icon: "success",
					title: "Pitanje je uspješno promijenjeno!",
					showConfirmButton: false,
					timer: 3000,
				});
				setTimeout(function () {
					window.location = domain + "labels_list";
				}, 2000);
			} else {
				Swal.fire({
					icon: "error",
					title: "Oops...",
					text: "Nešto nije u redu. Pitanje nije promijenjeno.",
					showConfirmButton: false,
					timer: 2000,
				});
			}
		},
	});
}); //end of submit form