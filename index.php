<?php

require 'app/class/GraphDebits.php';

// Initialisation des objets spécifiques
$graphs = new GraphDebits('ressources', 'json');

//Routing
$page = "home";
if(isset($_GET['p'])) { //Récupération de la variable en GET
	$page = $_GET['p'];
}

if($page === "home") {
	require 'public/home.php';
} else if(in_array($page, $graphs->renderTabYears())) {
	require 'public/year.php';
} else {
	$graphs->render404();
}
