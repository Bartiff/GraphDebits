<!doctype html>
<html class="no-js" lang="fr">
  <head>
    <meta charset="UTF-8">
    <!--[if IE]><meta http-equiv="X-UA-Compatible" content="IE=edge"><![endif]-->
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <title>GraphDébit</title>
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
        <h1>GraphDébit - Année <?php echo $page; ?></h1>
        <?php for ($i=1; $i <= 12; $i++) { ?>
            <?php if ($page < date('Y') || $graphs->setZeroNum($i) <= date('m')) {?>
                <section class="w75 center">
                    <h2><?php echo $graphs->getMonths($i); ?></h2>
                    <canvas id="myChart<?php echo $graphs->setZeroNum($i); ?>" width="400" height="400"></canvas>
                    <div class="moyennes plm">
                        <p class="small"><strong>Moyennes</strong></p>
                        <ul class="small ma0 pa0">
                            <li>Débit descendant : <span id="moy<?php echo $graphs->setZeroNum($i); ?>D" class="moyDown"></span></li>
                            <li>Débit montant : <span id="moy<?php echo $graphs->setZeroNum($i); ?>U" class="moyUp"></span></li>
                        </ul>
                    </div>
                </section>
            <?php } ?>
        <?php } ?>
        <script>
            function $_GET(param) {
            	var vars = {};
            	window.location.href.replace( location.hash, '' ).replace(
            		/[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
            		function( m, key, value ) { // callback
            			vars[key] = value !== undefined ? value : '';
            		}
            	);

            	if ( param ) {
            		return vars[param] ? vars[param] : null;
            	}
            	return vars;
            }
            var annee = $_GET('p')
            var debitsJson = 'ressources/graphdebits-' + annee + '.json'
        </script>
        <script src="./bower_components/chart.js/dist/Chart.min.js"></script>
        <script src="public/js/scripts.js"></script>
  </body>
</html>
