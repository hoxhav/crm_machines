<?php
defined('BASEPATH') OR exit('No direct script access allowed');
?><!DOCTYPE html>
<html lang="en">

<head>
	<title><?php echo $title?></title>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<?php
	foreach ($css_ar as $css) {
		css($css);
	}

	foreach($fonts_ar as $font ) {
		font_css($font);
	}
	?>
</head>

<body>
<div class="loader-wrapper" style="display: none;">
		<img src="<?php echo images_url() . "spinner.gif"; ?>" class="loader">
</div>
<?php
echo $navigation;
echo $container;
?>



<?php

foreach ($js_ar as $js) {
	js($js);
}

?>

</body>

<!-- Footer -->
<footer class="page-footer font-small black mt-5">

	<!-- Copyright -->
	<div class="footer-copyright text-center py-3">© 2020 Copyright:
		<a href="https://vjorihoxha.com"> vjorihoxha.com</a>
	</div>
	<!-- Copyright -->

</footer>
<!-- Footer -->

</html>
