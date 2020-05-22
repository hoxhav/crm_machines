<?php

function utility_url()
{
	return base_url() . 'utility/';
}

function js_url()
{
	return utility_url() . 'js/';
}

function css_url()
{
	return utility_url() . 'css/';
}

function font_css_url() {
	return utility_url() . 'fonts/';
}

function images_url()
{
	return utility_url() . 'images/';
}

function css($location)
{
	echo "<link href='" . auto_version(css_url() . $location) . "' rel='stylesheet'>";
}

function font_css($location) {
	echo "<link href='" . auto_version(font_css_url() . $location) . "' rel='stylesheet'>";
}

function js($location)
{
	echo "<script src='" . auto_version(js_url() . $location) . "'></script>";
}

function auto_version($file)
{
	if (strpos($file, '/') !== 0 || !file_exists($_SERVER['DOCUMENT_ROOT'] . $file))
		return $file;

	$mtime = filemtime($_SERVER['DOCUMENT_ROOT'] . $file);
	return $file . '?' . $mtime;
}

function check_file($file){
	return file_exists($_SERVER['DOCUMENT_ROOT'] . $file);
}




