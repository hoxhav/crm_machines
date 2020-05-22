<div id="panel-2" class="down container group">
	<div class="row">
		<div class="col-sm">
			<form id="edit-question-form" method="post">
				<div class="card">
					<div class="card-body">
						<h2 class="mb-2">Uredi pitanje</h2>
					</div>
				</div>
				<div class="card mt-3">
					<div class="card-body">
                        <h2 class="mb-2 question_label">Pitanje - </h2>
						<div class="form-group">
                            <label for="question_text">Tekst pitanja</label>
                            <input type="text" class="form-control" name="question_text" id="question_text" required>
                            <input type="hidden" class="form-control" name="question_id" id="question_id">
                        </div>
					</div>
				</div>
				<button type="submit" class="btn btn-primary mt-3 mb-5">Zavrsi</button>
				<button type="reset" class="btn btn-danger mt-3 mb-5">Ocisti</button>
			</form>
		</div>
	</div>
</div>
