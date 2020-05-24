<div class="row">
	<div class="col">
		<div class="col-md">
			<div class="card text-center text-white  mb-3" id="total-orders">
				<div class="card-header">
					<h5 class="card-title">Available Machines</h5>
				</div>
				<div class="card-body">
					<h3 id="avail-machine-num" class="card-title"></h3>
				</div>
			</div>
		</div>
	</div>

	<div class="col">
		<div class="col-md">
			<div class="card text-center text-white  mb-3" id="orders-delivered">
				<div class="card-header">
					<h5 class="card-title">Number of Sales</h5>
				</div>
				<div class="card-body">
					<h3 id="num-of-sales-num" class="card-title"></h3>
				</div>
			</div>
		</div>
	</div>

	<div class="col">
		<div class="col-md">
			<div class="card text-center text-white  mb-3" id="orders-pending">
				<div class="card-header">
					<h5 class="card-title">Unavailable Machines</h5>
				</div>
				<div class="card-body">
					<h3 id="unavail-machines-num" class="card-title"></h3>
				</div>
			</div>
		</div>
	</div>

	<div class="col">
		<div class="col-md">
			<div class="card text-center text-white  mb-3" id="actions">
				<div class="card-header">
					<h5 class="card-title">Actions</h5>
				</div>
				<div class="card-body pb-4">
					<div class="row mt-2">
						<div class="col-sm">
							<button id="add-machine" class="btn btn-primary btn-sm btn-block">Add Machine</button>
						</div>
						<div class="col-sm">
							<div class="btn-group">
								<button type="button" class="btn btn-primary btn-sm btn-block dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
									Clients
								</button>
								<div class="dropdown-menu">
									<a class="dropdown-item" id="add-client">Add Client</a>
									<a class="dropdown-item" id="modify-client">See + Edit Clients</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<div class="w-50 mx-auto mt-5 mb-5 avail-machines-bck">
	<h1 class="pt-5 text-white text-center">AVAILABLE MACHINES</h1>
	<h4 class="pb-5 text-white text-center">(Hover over for actions)</h4>
</div>

<div id="machine-grid" class="row mx-auto">

</div>


<div class="modal" id="edit-client-modal" role="dialog">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title">Edit Client</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body">
				<form id="edit-client-form" method="POST" >
					<div class="form-group">
						<label for="new_company_name_add_client">New Company Name for <span id="company-id-for-edit"></span></label>
						<input id="new_company_name_add_client" name="new_company_name_add_client" class="form-control" type="text" required>
					</div>

					<div style="float: right !important;" id="buttons_add_client">
						<button type="submit" id="submit_edit_client" class="btn btn-primary">Submit</button>
						<button type="reset" id="clear_edit_client" class="btn btn-secondary">Clear</button>
					</div>
				</form>
			</div>
		</div>
	</div>
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

<div class="modal" id="modify-clients-modal" role="dialog">
	<div class="modal-dialog modal-lg" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title">Modify Client</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body">
				<table id="modify-client-table" class="table">

				</table>
			</div>
		</div>
	</div>
</div>


<div class="modal" id="sell-machine-modal" role="dialog">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title">Sell Machine with serial num <span id="serial-num-sell-machine"></span> and id <span id="id-sell-machine-span"></span></h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body">
				<form id="sell-machine-form" method="POST" >
					<div class="form-group">
						<label for="client_sell_machine">Client:</label>
						<select class="form-control" name="client_sell_machine" id="client_sell_machine">
							<option value="-1"></option>
						</select>
					</div>

					<div style="float: right !important;" id="buttons_sell_machines">
						<button type="submit" id="submit_sell_machine" class="btn btn-primary">Submit</button>
						<button type="reset" id="clear_sell_machine" class="btn btn-secondary">Clear</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>

<div class="modal" id="add-client-modal" role="dialog">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title">Add Client</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body">
				<form id="add-client-form" method="POST" >
					<div class="form-group">
						<label for="company_name_add_client">Company Name</label>
						<input id="company_name_add_client" name="company_name_add_client" class="form-control" type="text" required>
					</div>

					<div style="float: right !important;" id="buttons_add_client">
						<button type="submit" id="submit_add_client" class="btn btn-primary">Submit</button>
						<button type="reset" id="clear_add_client" class="btn btn-secondary">Clear</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>

<div class="modal" id="add-machine-modal" role="dialog">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title">Add Machine</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body">
				<form id="add-machine-form" method="POST"  enctype="multipart/form-data">
					<div class="form-group">
						<label for="machine_code_add_machine">Machine Code</label>
						<input id="machine_code_add_machine" name="machine_code_add_machine" class="form-control" type="text" required>
					</div>
					<div class="form-group">
						<label for="serial_number_add_machine">Serial Number</label>
						<input type="text" name="serial_number_add_machine" class="form-control dontClear" id="serial_number_add_machine"	required   >
					</div>
					<div class="form-group">
						<label for="price_add_machine">Price</label>
						<input type="number" name="price_add_machine" class="form-control" id="price_add_machine" required>
					</div>
					<div class="form-group">
						<label for="quantity_add_machine">Quantity</label>
						<input type="number" name="quantity_add_machine" class="form-control" id="quantity_add_machine" required>
					</div>
					<div class="form-group">
						<label for="picture_add_machine">Picture </label>
						<input type="file" class="form-control-file" name="picture_add_machine" id="picture_add_machine" required>
					</div>
					<div class="form-group">
						<label for="description_add_machine">Description</label>
						<textarea class="form-control" name="description_add_machine" id="description_add_machine"
								  rows="4" required></textarea>
					</div>

					<div style="float: right !important;" id="buttons_add_machine">
						<button type="submit" id="submit_add_machine" class="btn btn-primary">Submit</button>
						<button type="reset" id="clear_add_machine" class="btn btn-secondary">Clear</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>

<div class="modal" id="edit-machine-modal" role="dialog">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title">Edit Machine - <span id="edit-machine-id-span"></span></h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body">
				<p>You can modify what you need.</p>
				<form id="edit-machine-form" method="POST"  enctype="multipart/form-data">
					<div class="form-group">
						<label for="machine_code_edit_machine">Machine Code</label>
						<input id="machine_code_edit_machine" name="machine_code_edit_machine" class="form-control" type="text" >
					</div>
					<div class="form-group">
						<label for="serial_number_edit_machine">Serial Number</label>
						<input type="text" name="serial_number_edit_machine" class="form-control dontClear" id="serial_number_edit_machine" >
					</div>
					<div class="form-group">
						<label for="price_edit_machine">Price</label>
						<input type="number" name="price_edit_machine" class="form-control" id="price_edit_machine">
					</div>
					<div class="form-group">
						<label for="quantity_edit_machine">Quantity</label>
						<input type="number" name="quantity_edit_machine" class="form-control" id="quantity_edit_machine">
					</div>
					<div class="form-group">
						<label for="picture_edit_machine">Picture </label>
						<input type="file" class="form-control-file" name="picture_edit_machine" id="picture_edit_machine">
					</div>
					<div class="form-group">
						<label for="description_edit_machine">Description</label>
						<textarea class="form-control" name="description_edit_machine" id="description_edit_machine"
								  rows="4" ></textarea>
					</div>

					<div style="float: right !important;" id="buttons_edit_machine">
						<button type="submit" id="submit_edit_machine" class="btn btn-primary">Submit</button>
						<button type="reset" id="clear_edit_machine" class="btn btn-secondary">Clear</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>


