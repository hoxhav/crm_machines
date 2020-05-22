<div id="panel-2" class="down container group">
	<div class="row">
		<div class="col-sm">
			<form id="edit-label-form" method="post">
				<div class="card">
					<div class="card-body">
						<h2 class="mb-2">Uredi label</h2>
					</div>
				</div>
				<div class="card mt-3">
					<div class="card-body">
						<h2 class="mb-2">Label - <span id="old-edit-label-name" class="mb-2"></span></h2>
						<!--<div class="input-group mb-3">
							<div class="input-group-prepend">
								<label class="input-group-text">Panel</label>
							</div>
							<select class="custom-select" id="panel_select" name="panel_select">
								<option value="-1">Choose your panel</option>
							</select>
						</div> -->
						<div class="form-group">
							<label for="label_name">Ime Labela</label>
							<input type="text" class="form-control" name="edit_label_name" id="edit_label_name" required>
							<input type="hidden" value="" class="form-control" name="edit_label_id" id="edit_label_id" required>
						</div>
					</div>
				</div>
				<button type="submit" class="btn btn-primary mt-3 mb-5">Završi</button>
				<button type="reset" class="btn btn-danger mt-3 mb-5">Očisti</button>
			</form>
		</div>
	</div>
</div>
