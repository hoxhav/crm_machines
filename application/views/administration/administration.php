<div class="w-50 mx-auto mt-5 mb-5 avail-machines-bck">
	<h1 class="pt-5 text-white text-center">UNAVAILABLE MACHINES</h1>
	<h4 class="pb-5 text-white text-center">(Hover over for actions)</h4>
</div>

<div id="machine-grid" class="row mx-auto">

</div>


<div class="modal" id="info-machine-modal" role="dialog">
	<div class="modal-dialog modal-lg" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title">Machine Information</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body">
				<table id="info-machine-table" class="table">

				</table>
			</div>
		</div>
	</div>
</div>

<div class="modal" id="add-quantity-modal" role="dialog">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title">Add Quantity for machine <span id="quantity-span"></span></h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body">
				<form id="add-quantity-form" method="POST" >
					<div class="form-group">
						<label for="quantity_machine">Quantity:</label>
						<input id="quantity_machine" name="quantity_machine" class="form-control" type="number" required>
					</div>

					<div style="float: right !important;" id="buttons_add_client">
						<button type="submit" id="submit_quantity_machine" class="btn btn-primary">Submit</button>
						<button type="reset" id="clear_quantity_machine" class="btn btn-secondary">Clear</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>

<div class="modal" id="add-operator-modal" role="dialog">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title">Add Quantity for machine <span id="quantity-span"></span></h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body">
				<form id="add-operator-form" method="POST" >
					<div class="form-group">
						<label for="username">Username</label>
						<input id="username" name="username" class="form-control" type="text" required>
					</div>

					<div class="form-group">
						<label for="password">Password</label>
						<input id="password" name="password" class="form-control" type="password" required>
					</div>

					<div class="form-group">
						<label for="email">Email</label>
						<input id="email" name="email" class="form-control" type="email" required>
					</div>

					<div class="form-group">
						<label for="first_name">First Name</label>
						<input id="first_name" name="first_name" class="form-control" type="text" required>
					</div>

					<div class="form-group">
						<label for="last_name">Last Name</label>
						<input id="last_name" name="last_name" class="form-control" type="text" required>
					</div>

					<div style="float: right !important;" id="buttons_operator">
						<button type="submit" id="submit_operator" class="btn btn-primary">Submit</button>
						<button type="reset" id="clear_operator" class="btn btn-secondary">Clear</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
