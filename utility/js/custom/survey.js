let url = window.location.href.split('/');
let patient_id = url[url.length-1];
$(document).ready(function() {
	$.ajax({
		type: 'post',
		url: domain + "ajax/survey/survey_questionarie",
		data: {"id":patient_id},
		beforeSend: function () {
			n_loader = -1;
		},
		success: function (d) {
			var j_data = JSON.parse(d);
			parseUserInfo(j_data.users_info);
			parsePanelsInfo(j_data.panels);
		},
		complete: function () {
			n_loader = 1;
		}
	});

	$("#panel_select").change(function() {
		let panel_id = $(this).val();
		$("#survey-div").empty();
		$.ajax({
			type: 'post',
			url: domain + "ajax/survey/panel_questions",
			data: {"id":panel_id},
			beforeSend: function () {
				n_loader = -1;
			},
			success: function (d) {
				var j_data = JSON.parse(d);
				let labels = parseLabels(j_data, panel_id);
				$("#survey-div").append(labels);
			},
			complete: function () {
				n_loader = 1;
			}
		});

	});


});

$('#survey-div').submit(function(e){

	e.preventDefault();
	var form = $(this);

	var form_data = form.serialize();
	$.ajax({
		type: "POST",
		url: domain + 'ajax/survey/submitForm',
		data: form.serialize(),
		beforeSend: function () {
			n_loader = -1;
		},
		success: function (data) {
			var submission = JSON.parse(data);

			if(submission == 'success') {
				Swal.fire({
					icon: 'success',
					title: 'Zapis uspješno napravljen.',
					showConfirmButton: false,
					timer: 3000
				});
				setTimeout(function () {
					window.location = domain + 'patient_list';
				}, 2000);
			}
		},
		complete: function () {
			n_loader = 1;
		}
	});


});


function getDateOrTime(question, id, flag = true, cls) {
	let type = '';
	(!flag) ? type = 'time' : type = 'date';

	return '<div class="form-group mt-3 '+ cls +'">\n' +
		'                                <label for="' + id + '">'+question+'</label>\n' +
		'                                <input type="'+type+'" class="form-control" name="'+id+'" id="'+id+'">\n' +
		'                            </div>';
}


function getInput(question,id, cls, number = true, flag = true) {
	let disabled = '';
	let num = '';

	(flag) ? '' : (disabled = 'readonly');
	(number) ? (num = 'number') : (num = 'text');
	if(number){
		return '<div class="form-group">\n' +
		'                                <label for="'+ cls +'">'+question+'</label>\n' +
		'                                <input type="'+num+'" class="'+ cls +' form-control" step=".01" name="'+id+'" id="'+id+'"  '+disabled+'>\n' +
		'                            </div>';
	}
	return '<div class="form-group">\n' +
		'                                <label for="'+ cls +'">'+question+'</label>\n' +
		'                                <input type="'+num+'" class="'+ cls +' form-control" name="'+id+'" id="'+id+'"  '+disabled+'>\n' +
		'                            </div>';
}


function getSlashFunction(question, id) {

	return '  <div class="form-group">\n' +
		'                                <label for="'+ id +'">'+question+'\n' +
		'                                    (mmHg)</label>\n' +
		'                                <div class="input-group">\n' +
		'                                    <input type="number" name="'+id+'" id="'+id+'" class="form-control">\n' +
		'                                    <div class="input-group-prepend">\n' +
		'                                        <span class="input-group-text">/</span>\n' +
		'                                    </div>\n' +
		'                                    <input type="number" name="'+id+ '_2' + '" id="'+id+ '_2' + '" class="form-control">\n' +
		'                                </div>\n' +
		'                            </div>';
}


function getSingleCheckBox(question, id, cls) {
	return '<div class="form-check">\n' +
		'                                <input class="form-check-input '+ cls +'" type="checkbox" name="'+id+'" id="'+id+'">\n' +
		'                                <label class="form-check-label" for="'+ id +'">\n' +
		'                                    '+question+'\n' +
		'                                </label>\n' +
		'                            </div>';
}


function getDropDown(question, id, answers, cls) {
	let dropdown = '<div class="form-group">\n' +
		'                                <label for="'+ cls +'">'+question+'</label>\n' +
		'                                <select class="form-control '+ cls +'" id="'+id+'" name="'+id+'">\n' +
		'                                    <option value=""> </option>'+answers+'\n' +
		'                                </select>\n' +
		'                            </div>';


	return dropdown;
}


function getTextArea(question, id) {
	return ' <div class="form-group">\n' +
		'                                    <label for="'+ id +'">'+question+'</label>\n' +
		'                                    <textarea class="form-control rounded-0" name="'+id+'" id="'+id+'" rows="3"></textarea>\n' +
		'                                </div>';
}

function getRadiobutton(question,id, answers, cls) {
	let arr = question.split(" ");
	let radiobutton = '<label class="'+ arr[0] +'">\n' +
		'                                <label class="mb-2">'+question+'</label>\n' + answers+' </label></br>';

	return radiobutton;
}

function getWeekDays(question, id) {
	return ' <div class="form-group">\n' +
		'                                    <label for="' + id + '">'+question+'</label>\n' +
		'                                    <input placeholder="Ponedjeljak" type="number" class="ml-4 uzimanje" id="tjedno_uzimanja_1" name="tjedno_uzimanja_1">\n' +
		'                                    <input placeholder="Utorak" type="number" class="uzimanje" id="tjedno_uzimanja_2" name="tjedno_uzimanja_2">\n' +
		'                                    <input placeholder="Srijeda" type="number" class="uzimanje" id="tjedno_uzimanja_3" name="tjedno_uzimanja_3">\n' +
		'                                    <input placeholder="Četvrtak" type="number" class="uzimanje" id="tjedno_uzimanja_4" name="tjedno_uzimanja_4">\n' +
		'                                    <input placeholder="Petak" type="number" class="uzimanje" id="tjedno_uzimanja_5" name="tjedno_uzimanja_5">\n' +
		'                                    <input placeholder="Subota" type="number" class="uzimanje" id="tjedno_uzimanja_6" name="tjedno_uzimanja_6">\n' +
		'                                    <input placeholder="Nedjelja" type="number" class="uzimanje" id="tjedno_uzimanja_7" name="tjedno_uzimanja_7">\n' +
		'                                </div>';
}


function getMultipleCheckBoxWithOtherText(question, id, answers) {
	let txt = '<fieldset class="form-group mt-3">\n' +
		'                                <div class="row">\n' +
		'                                    <div class="col-2">'+question+'</div>\n' +
		'                                    <div class="col-10">\n' +
		answers+
		'                                        <div class="form-group">\n' +
		'                                            <input type="text" placeholder="Ostalo" name="'+id+'" class="form-controll-small" id="ostalo_'+id+'">\n' +
		'                                        </div>\n' +
		'                                    </div>\n' +
		'                                </div>\n' +
		'                            </fieldset>';

	return txt;

}

function getCheckbox(question, id, answers) {

	let txt = '<fieldset class="form-group mt-3">\n' +
		'                                <div class="row">\n' +
		'                                    <div class="col-2">'+question+'</div>\n' +
		'                                    <div class="col-10">\n' +
		answers+
		'                                    </div>\n' +
		'                                </div>\n' +
		'                            </fieldset>';

	return txt;

}


function getRadioButtonOtherText(question, id, answers) {
	let radio = '';

	radio = ' <fieldset class="form-group mt-3">\n' +
		'                                <div class="row">\n' +
		'                                    <div class="col-2">'+question+'</div>\n' +
		'                                    <div class="col-10">\n' +
		answers+
		'                                        <div class="form-group">\n' +
		'                                            <input type="text" placeholder="Ostalo" class="form-controll-small" name="ostalo_'+id+'" id="ostalo_'+id+'">\n' +
		'                                        </div>\n' +
		'                                    </div>\n' +
		'                                </div>\n' +
		'                            </fieldset>';
	return radio;
}


const CHECKBOX = 1;
const RADIOBUTTON = 2;
const DATE = 3;
const DROPDOWN = 4;
const TEXT = 5;
const TIME = 6;
const NUMBER = 7;
const SINGLE_CB = 8;
const CB_OTHER = 9;
const RB_OTHER = 10;
const DISABLED_TEXT = 12;
const SLASH_QUESTION = 13;
const TEXTAREA = 14;

function parseLabels(j_data, panel_id) {
	answers = j_data.answers;
	questions = j_data.questions;
	j_data = j_data.labels;

	let labels  = '<div class="card">';
	for(let i = 0; i < j_data.length; i++) {
		labels += '<div class="card mt-3">\n' +
			'                        <div class="card-body">\n' +
			'                            <h2 class="mb-2">'+j_data[i].label_title+'</h2><div></div>\n' ;


		for(let j = 0; j < questions.length; j++) {
			if(questions[j].label_id == j_data[i].id) {
				var inp_id = $("#panel_select").val() + "_" + questions[j].label_id + "_" + questions[j].question_id + "_" + patient_id + "_" + $("#record-num").text();
				var cb_id = questions[j].question_id;
				let inp_c = "";
				//CONDITIONAL IDS

				if(questions[j].question_text == "Visina"){
					inp_c = "visina_id";
				} else if(questions[j].question_text == "Težina"){
					inp_c = "tezina_id";
				} else if(questions[j].question_text == "ITM"){
					inp_c = "itm_id";
				} else if(questions[j].question_text == "Opseg struka"){
					inp_c = "struk_id";
				} else if(questions[j].question_text == "Opseg bokova"){
					inp_c = "bokovi_id";
				} else if(questions[j].question_text == "Omjer struk/bokovi"){
					inp_c = "omjer_id";
				} else if(questions[j].question_text == "Pušenje"){
					inp_c = "pusenje_select";
				} else if(questions[j].question_text == "Pusi"){
					inp_c = "pusi_select";
				} else if(questions[j].question_text == "Kolicina"){
					inp_c = "kolicina_id";
				} else if(questions[j].question_text == "Broj godina nepušenja"){
					inp_c = "br_nepusenje_id";
				} else if(questions[j].question_text == "Staž u godinama"){
					inp_c = "staz_g_id";
				} else if(questions[j].question_text.includes("(hodanje)")){
					inp_c = "umjerena_akt_id";
				} else if(questions[j].question_text.includes("(trcanje,plivanje, vožnja bicikla)")){
					inp_c = "zustra_akt_id";
				} else if(questions[j].question_text == "Tjelesna aktivnost"){
					inp_c = "tjelesna_akt_id";
				} else if(questions[j].question_text == "Klinicki pregled stopala"){
					inp_c = "klinicki_pr_stopala";
				} else if(questions[j].question_text == "Nalaz pregleda stopala"){
					inp_c = "nalaz_pr_stopala";
				} else if(questions[j].question_text == "FVC (% prediktivne vrijednosti)"){
					inp_c = "fvc_id";
				} else if(questions[j].question_text == "Cijepljenje protiv gripe") {
					inp_c = "gripa_id"
				} else if(questions[j].question_text == "Datum cijepljenja protiv gripe") {
					inp_c = "datum_gripa_id"
				} else if(questions[j].question_text == "Cijepljenje protiv pneumokoka") {
					inp_c = "pneumo_id"
				} else if(questions[j].question_text == "Datum cijepljenja protiv pneumokoka") {
					inp_c = "datum_pneumo_id"
				} else if(questions[j].question_text == "Akutne egzacerbacija uz antibiotsku terapiju") {
					inp_c = "egzacer_id"
				} else if(questions[j].question_text == "Datum akutnih egzacerbacija") {
					inp_c = "datum_egzacer_id"
				} else if(questions[j].question_text == "Hospitalizacija zbog KOPB-a") {
					inp_c = "hospitalizacija_id"
				} else if(questions[j].question_text == "Datum hospitalizacije") {
					inp_c = "datum_hospitalizacija_id"
				} else if(questions[j].question_text == "Tjedno uzimanja"){
					inp_c = "tjedno_id";
				}


				//END OF CONDITIONAL IDS
				if(questions[j].question_category_id == NUMBER) {
					if(questions[j].question_details == '/') {
						labels += getSlashFunction(questions[j].question_text, inp_id);
					}  else {
						labels += getInput(questions[j].question_text, inp_id, inp_c);
					}
				} else if(questions[j].question_category_id == TEXT) {
					if(questions[j].question_details == 'textarea') {
						labels += getTextArea(questions[j].question_text, inp_id);
					} else if(questions[j].question_details == 'days_of_week') {
						labels += getWeekDays(questions[j].question_text, inp_id);
					}
					else {
						var dis_flag = true;
						(questions[j].question_details == 'disabled') ? dis_flag = false : dis_flag = true;
						labels += getInput(questions[j].question_text, inp_id, inp_c, false,dis_flag);
					}
				} else if(questions[j].question_category_id == CHECKBOX) {
					if((questions[j].question_details == 'single')) {
						labels += getSingleCheckBox(questions[j].question_text, inp_id, inp_c);
					} else if(questions[j].question_details == "multiple,other") {
						var ar_answer_chb_multi = '';
						for(let z = 0; z < answers.length; z++) {
							if(answers[z].question_id == questions[j].question_id) {
								ar_answer_chb_multi += 		'    <div class="form-check">\n' +
									'           <input class="form-check-input" type="checkbox"  name="'+cb_id+'[]" value="' + inp_id + "_" +answers[z].answer_id+ '_' + answers[z].answer + '" id="'+answers[z].answer_id+'">\n' +
									'     <label class="form-check-label" for="vrat_lokalizacija">\n' +
									'               '+answers[z].answer+'\n' +
									'           </label>\n' +
									'           </div>\n';
							}
						}

						labels += getMultipleCheckBoxWithOtherText(questions[j].question_text, inp_id, ar_answer_chb_multi);
					} else {
						labels += getSingleCheckBox(questions[j].question_text, inp_id, inp_c);
					}


				} else if(questions[j].question_category_id == TIME) {
					labels += getDateOrTime(questions[j].question_text, inp_id, false, inp_c);
				} else if(questions[j].question_category_id == DATE) {
					labels += getDateOrTime(questions[j].question_text, inp_id, true, inp_c);
				} else if(questions[j].question_category_id == DROPDOWN) {
					let ar_answers = '';
					for(let z = 0; z < answers.length; z++) {
						if(answers[z].question_id == questions[j].question_id) {
							ar_answers += '<option value="'+answers[z].answer_id+ '$$' + answers[z].answer+ '">'+answers[z].answer+'</option>' ;
						}
					}
					labels += getDropDown(questions[j].question_text, inp_id, ar_answers, inp_c);
				} else if(questions[j].question_category_id == RADIOBUTTON) {

					if(questions[j].question_details == "other") {
						var ar_answer_chb_multi = '';
						for(let z = 0; z < answers.length; z++) {
							if(answers[z].question_id == questions[j].question_id) {
								ar_answer_chb_multi += 		'    <div class="form-check">\n' +
									'           <input class="form-check-input" type="radio" name="'+inp_id+'" value="'+answers[z].answer_id+ '$$' + answers[z].answer +'" id="'+answers[z].answer_id+'">\n' +
									'     <label class="form-check-label" for="vrat_lokalizacija">\n' +
									'               '+answers[z].answer+'\n' +
									'           </label>\n' +
									'           </div>\n';
							}
						}

						labels += getRadioButtonOtherText(questions[j].question_text, inp_id, ar_answer_chb_multi);
					} else {

						var ar_answer_radio = '';
						for(let z = 0; z < answers.length; z++) {
							if(answers[z].question_id == questions[j].question_id) {
								ar_answer_radio += 		'                                <div class="form-check form-check-inline">\n' +
									'                                    <input class="form-check-input '+ inp_c +'" type="radio" name="'+inp_id+ '" id="'+answers[z].answer_id+'" value="'+answers[z].answer_id+ '$$' +answers[z].answer + '">\n' +
									'                                    <label class="form-check-label" for="'+answers[z].answer_id+'">'+answers[z].answer+'</label>\n' +
									'                                </div>\n';
							}
						}
						labels += getRadiobutton(questions[j].question_text, inp_id, ar_answer_radio);
					}
				} else if (questions[j].question_category_id == SINGLE_CB) {
					//this id is multiple now
					var ar_answer_chb_multi = '';
					for(let z = 0; z < answers.length; z++) {
						if(answers[z].question_id == questions[j].question_id) {
							ar_answer_chb_multi += 		'    <div class="form-check">\n' +
								'           <input class="form-check-input" type="checkbox" name="'+cb_id+'[]" value="' + inp_id + "_" +answers[z].answer_id+ '_' + answers[z].answer + '" id="'+answers[z].answer_id+'">\n' +
								'     <label class="form-check-label" for="vrat_lokalizacija">\n' +
								'               '+answers[z].answer+'\n' +
								'           </label>\n' +
								'           </div>\n';
						}
					}

					labels += getCheckbox(questions[j].question_text, inp_id, ar_answer_chb_multi);
				} else if (questions[j].question_category_id == CB_OTHER) {
					var ar_answer_chb_multi = '';
					for(let z = 0; z < answers.length; z++) {
						if(answers[z].question_id == questions[j].question_id) {
							ar_answer_chb_multi += 		'    <div class="form-check">\n' +
								'           <input class="form-check-input" type="checkbox"  name="'+cb_id+'[]"  value="' + inp_id + "_" +answers[z].answer_id+ '_' + answers[z].answer + '" id="'+answers[z].answer_id+'">\n' +
								'     <label class="form-check-label" for="vrat_lokalizacija">\n' +
								'               '+answers[z].answer+'\n' +
								'           </label>\n' +
								'           </div>\n';
						}
					}

					labels += getMultipleCheckBoxWithOtherText(questions[j].question_text, inp_id, ar_answer_chb_multi);
				}else if (questions[j].question_category_id == RB_OTHER) {
					var ar_answer_chb_multi = '';
					for(let z = 0; z < answers.length; z++) {
						if(answers[z].question_id == questions[j].question_id) {
							ar_answer_chb_multi += 		'    <div class="form-check">\n' +
								'           <input class="form-check-input" type="radio" name="'+inp_id+'" value="'+answers[z].answer_id+ '$$' + answers[z].answer +'" id="'+answers[z].answer_id+'">\n' +
								'     <label class="form-check-label" for="vrat_lokalizacija">\n' +
								'               '+answers[z].answer+'\n' +
								'           </label>\n' +
								'           </div>\n';
						}
					}

					labels += getRadioButtonOtherText(questions[j].question_text, inp_id, ar_answer_chb_multi);
				}else if (questions[j].question_category_id == DISABLED_TEXT) {
					labels += getInput(questions[j].question_text, inp_id,inp_c, false,false);

				}else if (questions[j].question_category_id == SLASH_QUESTION) {
					labels += getSlashFunction(questions[j].question_text, inp_id);
				} else if(questions[j].question_category_id == TEXTAREA) {
					labels += getTextArea(questions[j].question_text, inp_id);
				}

			}
		}



		labels +='                        </div>\n' +
			'                    </div>';
	}


	labels +=  '     </div>\n' +
		'                    <button type="submit" id="submit" class="btn btn-success mt-3 mb-5">Submit</button>\n' +
		'                    <button type="reset" id="reset" class="btn btn-primary mt-3 mb-5">Reset</button>\n'

	return labels;
}


function parseUserInfo(j_data) {
	$("#pharma-patient-info").append("Pharmacist " + j_data[0].pharmacist_name + " is adding record number " + "<span id='record-num'>" + j_data[0].patient_record_history_id + "</span> "+ "for patient " + j_data[0].patient_firstName + ' ' + j_data[0].patient_lastName);
}

function parsePanelsInfo(j_data) {
	let txt = '';
	let results = j_data;
	for (let i = 0; i < results.length; i++) {
		txt += '<option value="' + results[i].id + '">' + results[i].panel_name + '</option>';
	}
	$('#panel_select').append(txt);
}
