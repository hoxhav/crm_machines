<nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
	<a class="navbar-brand" href="#">CRM</a>
	<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
		<span class="navbar-toggler-icon"></span>
	</button>
	<div class="collapse navbar-collapse" id="navbarText">
		<ul class="navbar-nav mr-auto">
			<?php if($user_role === 'operator') {
				echo "<li class='nav-item active'>
				<a class='nav-item nav-link active' href='" . base_url('dashboard') . "'>DASHBOARD <span class='sr-only'>(current)</span></a>
			</li>";
			}?>

			<?php if($user_role === 'administrator') {
				echo "<li class='nav-item active'>
				<a class='nav-item nav-link active' href='" .base_url('administration'). "'>ADMINISTRATION <span class='sr-only'>(current)</span></a>
			</li>
			
			<li class='ml-3 nav-item active'>
				<a id='add-operator' class='nav-item nav-link '>ADD OPERATOR</a>
			</li>
			
			";

			}?>
		</ul>
		<span class="navbar-text">Welcome, <?php echo $profile_name;?> </span>
		<button style="margin-left: 10px;" class="btn btn-danger" id="logout">Logout</button>
	</div>
</nav>
