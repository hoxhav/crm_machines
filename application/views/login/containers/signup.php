<div class="limiter">
	<div class="container-login100">
		<div class="login100-more" style="background-image: url('<?php echo images_url() . "nurse.jpg"; ?>');"></div>

		<div class="wrap-login100 p-l-50 p-r-50 p-t-72 p-b-50">
			<form id="signup-form" method="POST" class="login100-form validate-form">
                    <span class="login100-form-title p-b-59">
						Prijavite se
					</span>

				<div class="row">
					<div class="col-md-6">
						<div class="wrap-input100 validate-input" data-validate="First Name is required">
							<span class="label-input100">Ime</span>
							<input class="input100" type="text" name="firstname" placeholder="Ime...">
							<span class="focus-input100"></span>
						</div>
					</div>
					<div class="col-md-6">
						<div class=" wrap-input100 validate-input" data-validate="Last Name is required">
							<span class="label-input100">Prezime</span>
							<input class="input100" type="text" name="lastname" placeholder="Prezime...">
							<span class="focus-input100"></span>
						</div>
					</div>
				</div>
				<div class="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
					<span class="label-input100">Email</span>
					<input class="input100" type="text" name="email" placeholder="Email address...">
					<span class="focus-input100"></span>
				</div>

				<div class="wrap-input100 validate-input" data-validate="Ljekarna is required">
					<div class="form-group">
						<label class="label-input100" for="sel1">Ljekarna:</label>
						<select class="form-control" name="pharmacy" id="pharmacy_select">
						</select>
					</div>

					<span class="focus-input100"></span>
				</div>

				<div class="wrap-input100 validate-input" data-validate="Username is required">
					<span class="label-input100">Korisničko ime</span>
					<input class="input100" type="text" name="username" placeholder="Korisničko ime...">
					<span class="focus-input100"></span>
				</div>

				<div class="wrap-input100 validate-input" data-validate="Lozinka is required">
					<span class="label-input100">Lozinka</span>
					<input id="password" class="input100" type="password" name="pass" placeholder="*************">
					<span class="focus-input100"></span>
				</div>

				<div class="wrap-input100 validate-input" data-validate="Ponovi lozinku is required">
					<span class="label-input100">Ponovi lozinku</span>
					<input id="repeat-password" class="input100" type="password" name="repeat-pass" placeholder="*************">
					<span class="focus-input100"></span>
				</div>

				<div class="flex-m w-full p-b-33">
					<div class="contact100-form-checkbox" data-validate="You need to agree on terms">
						<input class="input-checkbox100" id="ckb1" type="checkbox" name="remember-me">
						<label class="label-checkbox100" for="ckb1">
								<span class="txt1">
									Slažem se s
									<a id="terms-of-user" class="txt2 hov1">
										Uvjetima korisnika
									</a>
								</span>
						</label>
					</div>


				</div>

				<div class="container-login100-form-btn">
					<div class="wrap-login100-form-btn">
						<div class="login100-form-bgbtn"></div>
						<button class="login100-form-btn">
							Prijavite se
						</button>
					</div>

					<a href="<?php echo base_url("login");?>" class="dis-block txt3 hov1 p-r-30 p-t-10 p-b-10 p-l-30">
						Prijaviti se
						<i class="fa fa-long-arrow-right m-l-5"></i>
					</a>
				</div>
			</form>
		</div>
	</div>
</div>
<div class="modal fade" id="terms-of-user-modal" tabindex="-1" role="dialog">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title">Terms of User</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body">
				What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type
				specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
				and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Why do we use it? It is a long established fact that a reader will be distracted by the readable content of a page when looking
				at its layout. The point of using Lorem Ipsum is that it has.
			</div>
		</div>
	</div>
</div>
