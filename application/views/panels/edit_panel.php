<div id="panel-2" class="down container group">
	<div class="row">
		<div class="col-sm">
			<form id="edit-panel-form" method="post">
				<div class="card">
					<div class="card-body">
						<h2 class="mb-2">Uredi panel</h2>
					</div>
				</div>
				<div class="card mt-3">
					<div class="card-body">
						<h2 class="mb-2">Panel - <span id="old-edit-panel-name" class="mb-2"></span></h2>

						<div class="form-group">
							<label for="name">Novo Ime Panela</label>
							<input type="text"  class="form-control" name="edit_panel_name" id="edit_panel_name" required>
							<input type="hidden" value="" class="form-control" name="edit_panel_id" id="edit_panel_id" required>
						</div>
					</div>
				</div>
				<button type="submit" class="btn btn-primary mt-3 mb-5">Zavrsi</button>
				<button type="reset" class="btn btn-danger mt-3 mb-5">Ocisti</button>
			</form>
		</div>
	</div>
</div>
