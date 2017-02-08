<?php
	/**
	 * Class graphDebits
	 * Contient les méthodes spécifiques du module graphDebits
	 */
	class GraphDebits {

		private $years = [];
		private $months = Array('', 'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre');

		public function __construct($dir, $type_file) {
			if (is_dir($dir)) {
				$json = scandir($dir);
				foreach ($json as &$file) {
					if ($file[0] == ".") {
						array_shift($json);
					}
					$file = substr(basename($file, '.'.$type_file), -4);
				}
				$this->years = $json;
			} else {
				echo 'Attention ! Le dossier "ressources" n\'éxiste pas.';
			}
		}

		public function getMonths($num) {
			return $this->months[intval($num)];
		}

		public function setZeroNum($num) {
			if (strlen($num) == 1) {
				return '0'.$num;
			} else {
				return $num;
			}
		}

		public function renderTabYears() {
			return $this->years;
		}

		public function renderMenu() {
			echo '<li><a href="./">Acceuil</a></li>';
			foreach ($this->years as $year) {
				echo '<li><a href="./?p='.$year.'">'.$year.'</a></li>';
			}
		}

		public function renderResYears() {

		}

		public function render404() {
			header('HTTP/1.0 404 Not Found');
			require "public/404.php";
		}

	}
