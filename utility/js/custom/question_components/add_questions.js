let url = window.location.href.split("/");
let label_id = url[url.length - 1];


$(document).ready(function () {
    $('#answers_div').show();
	$.ajax({
		url: domain + "ajax/questions_list/question_category",
		success: function (data) {
			j_data = JSON.parse(data);
            appendCategories(j_data);
            try{
                
			} catch (e) {
				//TODO: Some logger solution
			}
		},
	});

    $('#category_select').change(function() {
        let selected_id = $(this).val();
        if(needsAnswer(selected_id)){
            $('#answers_div').attr('class', 'form-group');
        } else {
            $('#answers_div').attr('class', 'd-none form-group');
        }

    })

}); //end of document.ready

$('#add-new-question-form').submit(function(e){
	e.preventDefault();
	var form = $(this);
	var form_data = form.serialize();
    let form_array = form.serializeArray();

    let answers = [];
    let values = [];
    $.each(form_array, (i, input) => {
        if(input.name.includes('answer_') && input.value != ""){
            answers[input.name] = input.value;
        } else {
            if(!input.name.includes('answer_')){
                values[input.name] = input.value;
            }
        }
    })
    if(Object.keys(answers).length > 0){
        values['answers'] = answers;
    }
	$.ajax({
		type: "POST",
		url: domain + 'ajax/questions_list/create_question/' + label_id,
        data: form_data,
		success: function (d) {
			var submission = JSON.parse(d);
			if(submission === "success") {
				Swal.fire({
					icon: 'success',
					title: 'Pitanje je uspješno napravljeno!',
					showConfirmButton: false,
					timer: 3000
				});
				setTimeout(function () {
					window.location = domain + 'questions_list/' + label_id;
				}, 2000);
			} else {
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'Nešto nije u redu. Pitanje nije napravljeno.',
					showConfirmButton: false,
					timer: 2000
				})
			}
		}
	});
});

function add() {
    var new_chq_no = parseInt($('#total_chq').val()) + 1;
    var new_input = "<input type='text' placeholder='"+new_chq_no+". odgovor' class='form-control add-top-space mb-1' name='answer_" + new_chq_no + "' id='answer_" + new_chq_no + "'>";
    $('#new_chq').append(new_input);
    $('#total_chq').val(new_chq_no)
}


function remove() {
    var last_chq_no = $('#total_chq').val();
    if (last_chq_no > 1) {
        $('#answer_' + last_chq_no).remove();
        $('#total_chq').val(last_chq_no - 1);
    }
}

function needsAnswer(id){
    if(id == 8 || id == 2 || id == 4 || id == 9 || id == 10 ){
        return true;
    }
    return false;
}

function appendCategories(data){
	let options = '';
	data.forEach(category => {
		options += '<option name=' + category.id + ' value='+ category.id +'>'+ category.category_name +'</option>'
	});
	$('#category_select').append(options);
}
