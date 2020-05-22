<div id="panel-2" class="down container group">
	<div class="row">
		<div class="col-sm">
			<form id="add-new-question-form" method="post">
				<div class="card">
					<div class="card-body">
						<h2 class="mb-2">Novo pitanje</h2>
					</div>
				</div>
				<div class="card mt-3">
					<div class="card-body">
                        <h2 class="mb-2">Pitanje</h2>
						<div class="form-group">
                            <label for="question_text">Tekst pitanja</label>
							<input type="text" class="form-control" name="question_text" id="question_text" required>
                        </div>
                        <div class="form-group mb-3">
                            <label for="category_select">Kategorija pitanja</label>
                            <select class="form-control" name="category_select" id="category_select">
                                <option value="-1">Odaberi kategoriju</option>
                            </select>
                        </div>
                        <div class="d-none form-group" id="answers_div">
                            <label for="answers">Odgovori</label>
                            <div></div>
                            <input type="text" placeholder="1. odgovor" class="form-control add-top-space mb-1" name="answer_1" id="answer_1">
                            <div id="new_chq"></div>
                            <input type="hidden" value="1" id="total_chq">
                            <button class="btn-sm btn-primary" onclick="add(); return false;">Dodaj polje za odgovor</button>
                            <button class="btn-sm btn-danger" onclick="remove(); return false;">Izbrisi polje za odgovor</button>
                        </div>
					</div>
				</div>
				<button type="submit" class="btn btn-primary mt-3 mb-5">Završi</button>
				<button type="reset" class="btn btn-danger mt-3 mb-5">Očisti</button>
			</form>
		</div>
	</div>
</div>
