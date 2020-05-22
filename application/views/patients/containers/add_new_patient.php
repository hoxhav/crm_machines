<div id="panel-2" class="down container group">
	<div class="row">
		<div class="col-sm">
			<form id="add-new-patient-form" method="post">
				<div class="card">
					<div class="card-body">
						<h2 class="mb-2">Novi pacijent</h2>
					</div>
				</div>
				<div class="card mt-3">
					<div class="card-body">
						<h2 class="mb-2">Osobni podatci</h2>
						<div class="form-group">
							<label for="name">Ime pacijenta</label>
							<input type="text" class="form-control" name="firstName" id="firstName" maxlength="255">
						</div>

						<div class="form-group">
							<label for="name">Prezime pacijenta</label>
							<input type="text" class="form-control" name="lastName" id="lastName" maxlength="255">
						</div>

						<div class="form-group">
							<label for="name">OIB pacijenta</label>
							<input type="number" class="form-control" name="oib" id="oib" maxlength = "11" required>
						</div>

						<div class="form-group">
							<label for="name">MBO pacijenta</label>
							<input type="number" class="form-control" name="mbo" id="mbo" maxlength = "9">
						</div>


						<div class="form-group">
							<label for="name">Dob pacijenta</label>
							<input type="number" class="form-control" name="age" id="age" maxlength="3" required>
						</div>


						<div class="form-group">
							<label for="name">Spol</label>
							<select class="form-control" id="gender-select" name="gender-select" required>
								<option name="-1" value="-1">Odaberi...</option>
								<option name="Male" value="Male">Musko</option>
								<option name="Female" value="Female">Zensko</option>
							</select>
						</div>


						<div class="form-group">
							<label for="name">Email adresa</label>
							<input type="email" class="form-control" name="email" id="email">
						</div>


						<div class="form-group">
							<label for="name">Broj telefona</label>
							<input type="text" class="form-control" name="phoneNumber" id="phoneNumber">
						</div>


						<div class="form-group">
							<label for="name">Grad</label>
							<input type="text" class="form-control" name="city" id="city" maxlength="255">
						</div>


						<div class="form-group">
							<label for="name">Adresa stanovanja</label>
							<input type="text" class="form-control" name="address" id="address" maxlength="255">
						</div>

						<div class="form-group">
							<label for="name">ZIP</label>
							<input type="number" class="form-control" name="zip" id="zip" maxlength="20">
						</div>
					</div>
				</div>
				<button type="submit" class="btn btn-primary mt-3 mb-5">Završi</button>
				<button type="reset" class="btn btn-danger mt-3 mb-5">Očisti</button>
			</form>
		</div>
	</div>
</div>
