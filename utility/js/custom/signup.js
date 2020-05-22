$(document).on("mouseover", "#terms-of-user", function reportIssue() {

	$("#terms-of-user-modal").modal();

});

$(document).ready(function () {
	$.ajax({
		url: domain + "ajax/login_ajax/getPharmacy",
		success: function (d) {
			var j_data = JSON.parse(d);
			let opt = '';
			for(let i = 0; i < j_data.length; i++) {
					opt += '<option value="'+j_data[i].id+'">'+j_data[i].name + '-' + j_data[i].location+'</option>';
			}

			$("#pharmacy_select").append(opt);
		}
	});
});

(function($) {
	"use strict";

	/*==================================================================
	[ Focus Contact2 ]*/
	$('.input100').each(function() {
		$(this).on('blur', function() {
			if ($(this).val().trim() != "") {
				$(this).addClass('has-val');
			} else {
				$(this).removeClass('has-val');
			}
		})
	})


	/*==================================================================
	[ Validate after type ]*/
	$('.validate-input .input100').each(function() {
		$(this).on('blur', function() {
			if (validate(this) == false) {
				showValidate(this);
			} else {
				$(this).parent().addClass('true-validate');
			}
		})
	})

	/*==================================================================
	[ Validate ]*/
	var input = $('.validate-input .input100');

	$('#signup-form').on('submit', function(e) {
		var check = true;

		for (var i = 0; i < input.length; i++) {
			if (validate(input[i]) == false) {
				showValidate(input[i]);
				check = false;
			}
		}

		if (!$("#ckb1").prop("checked")) {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'You need to agree to our terms.',
				showConfirmButton: false,
				timer: 2000
			})
			check = false;
		}

		let validationPass = validatePassword();

		if (!validationPass) {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Password does not match.',
				showConfirmButton: false,
				timer: 2000
			})

			check = false;
		}

		// end of validations

		if(check) {
			e.preventDefault();
			var form = $(this);
			$.ajax({
				type: "POST",
				url: domain + 'ajax/signupUser',
				data: form.serialize(),
				success: function (data) {
				}
			}).done(function () {
				Swal.fire({
					icon: 'success',
					title: 'Your registration has been successful.',
					showConfirmButton: false,
					timer: 3000
				});
				setTimeout(function () {
					window.location = domain;
				}, 3000);

			});
		}
		return check;
	});


	$('.validate-form .input100').each(function() {
		$(this).focus(function() {
			hideValidate(this);
			$(this).parent().removeClass('true-validate');
		});
	});

	function validate(input) {
		if ($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
			if ($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
				return false;
			}
		} else if ($(input).attr('type') == 'password') {
			if ($(input).val().length < 6) {
				return false;
			}
		} else {
			if ($(input).val().trim() == '') {
				return false;
			}
		}
	}

	function showValidate(input) {
		var thisAlert = $(input).parent();

		$(thisAlert).addClass('alert-validate');
	}

	function hideValidate(input) {
		var thisAlert = $(input).parent();

		$(thisAlert).removeClass('alert-validate');
	}

	function validatePassword() {
		let pass = $("#password");
		let rPss = $("#repeat-password");

		if (pass.val().length != rPss.val().length) {
			return false;
		} else if (pass.val() !== rPss.val()) {
			return false;
		}

		return true;
	}

})(jQuery);
