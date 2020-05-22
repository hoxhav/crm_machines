<nav class="navbar navbar-expand-lg navbar-light bg-light">
	<a class="navbar-brand" href="<?php echo base_url("patient_list"); ?>">Ljekarski paneli</a>
	<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
		<span class="navbar-toggler-icon"></span>
	</button>
	<div class="collapse navbar-collapse" id="navbarNav">
		<ul class="navbar-nav">
			<li class="nav-item active">
				<a class="nav-link" href="<?php echo base_url("patient_list"); ?>">Početna <span class="sr-only">(current)</span></a>
			</li>

			<li class="nav-item dropdown">
				<a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					Više
				</a>
				<div class="dropdown-menu" aria-labelledby="navbarDropdown">
					<a class="dropdown-item" href="<?php echo base_url("panels_list") ?>">Paneli</a>
					<a class="dropdown-item" href="<?php echo base_url("labels_list") ?>">Labeli</a>
					<a class="dropdown-item" href="<?php echo base_url("patient_list/new_patient"); ?>">Dodaj pacijenta</a>				</div>
			</li>
			<li class="nav-item">
				<a class="nav-link" href="<?php echo base_url("statistics"); ?>">Statistika</a>
			</li>

			<li id="export-button-nav" class="nav-item" style="display: none;">
				<button class="nav-link" id="export-anchor">Izvoz</button>
			</li>

		</ul>
	</div>
</nav>
