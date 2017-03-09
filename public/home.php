<!doctype html>
<html class="no-js" lang="fr">
  <head>
    <meta charset="UTF-8">
    <!--[if IE]><meta http-equiv="X-UA-Compatible" content="IE=edge"><![endif]-->
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <title>Titre du document</title>
    <link rel="stylesheet" href="public/css/styles.css" media="all">
    <style>
		ul { list-style-type: none;	}
		.moyDown { color: rgba(75,192,192,1); }
		.moyUp { color: rgba(214,25,25,1); }
	</style>
  </head>
  <body>
        <nav>
            <ul>
                <?php $graphs->renderMenu(); ?>
            </ul>
        </nav>
        <h1>GraphDébit</h1>
        <section class="w75 center">
            <h2>Mois en cours</h2>
            <canvas id="chartMoisEnCours" width="400" height="400"></canvas>
            <div class="moyennes plm">
                <p class="small"><strong>Moyennes</strong></p>
                <ul class="small ma0 pa0">
                    <li>Débit descendant : <span id="moy<?php echo date('m'); ?>D" class="moyDown"></span></li>
                    <li>Débit montant : <span id="moy<?php echo date('m'); ?>U" class="moyUp"></span></li>
                </ul>
            </div>
        </section>

        <script>
            var date = new Date()
            var annee = date.getFullYear()
            var debitsJson = 'ressources/graphdebits-' + annee + '.json'
        </script>
        <script src="./bower_components/chart.js/dist/Chart.min.js"></script>
        <script src="public/js/scripts.js"></script>
  </body>
</html>
