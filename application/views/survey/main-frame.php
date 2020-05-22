<?php
defined('BASEPATH') OR exit('No direct script access allowed');
?><!DOCTYPE html>
<html lang="en">

<head>
	<title>Dobrodošli</title>
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

<?php
echo $panels;
echo $container;
?>



<?php

foreach ($js_ar as $js) {
	js($js);
}

?>

</body>

</html>
