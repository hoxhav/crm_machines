<div class="limiter">
	<div class="container-login100">
		<div class="login100-more" style="background-image: url('<?php echo images_url() . "nurse.jpg"; ?>');"></div>
		<div class="wrap-login100 p-l-50 p-r-50 p-t-72 p-b-50">
			<form id="login-form" class="login100-form validate-form">
                    <span class="login100-form-title p-b-59">
						Prijava
					</span>

				<div class="wrap-input100 validate-input" data-validate="Username is required">
					<span class="label-input100">Korisničko ime</span>
					<input class="input100" type="text" name="username" placeholder="Username...">
					<span class="focus-input100"></span>
				</div>

				<div class="wrap-input100 validate-input" data-validate="Password is required 6 or more characters">
					<span class="label-input100">Lozinka</span>
					<input class="input100" type="password" name="password" placeholder="*************">
					<span class="focus-input100"></span>
				</div>


				<div class="container-login100-form-btn">
					<div class="wrap-login100-form-btn">
						<div class="login100-form-bgbtn"></div>
						<button class="login100-form-btn">
							Prijava
						</button>
					</div>

					<a href="<?php echo base_url("signup");?>" class="dis-block txt3 hov1 p-r-30 p-t-10 p-b-10 p-l-30">
						Registracija
						<i class="fa fa-long-arrow-right m-l-5"></i>
					</a>
				</div>
			</form>
		</div>
	</div>
</div>
