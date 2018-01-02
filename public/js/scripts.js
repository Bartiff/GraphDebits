//http://www.xul.fr/ajax-format-json.html

//XMLHttpRequest
var debits = {};
var req = new XMLHttpRequest();
req.open("GET", debitsJson, true);
req.onreadystatechange = function () {
	if (req.readyState == 4 && req.status == 200) {
    	debits = JSON.parse(req.responseText);

    	//Fonctions
		var moisEnCours = function() {
			var numsMois = new Array("01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12");
			var maDate = new Date();
			var mois = maDate.getMonth();
			return numsMois[mois]
		}

		var recupNomMois = function(num) {
			var nomsMois = new Array("Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre");
			var numMois = parseInt(num) - 1;
			return nomsMois[numMois]
		}

		var debitMois = function(mois, annnee) {
			var debitsMoisDown = []
			var debitsMoisUp = []
			var debitsTime = []
			for (var i = 1; i < debits.length; i++) {
				if (debits[i].timestamp.indexOf(annee + '-' + mois) != -1) {
					debitsMoisDown.push(debits[i].download / 1000000);
					debitsMoisUp.push(debits[i].upload / 1000000);
					debitsTime.push(debits[i].timestamp);
				}
			}
			var tab = {
				time: debitsTime,
				down: debitsMoisDown,
				up: debitsMoisUp
			}
			return tab
		}

		var moyenneJour = function(mois, annnee) {
    		var tableau = debitMois(mois, annnee)
    		var tabTime = []
    		var tabDown = []
    		var tabUp = []
    		var j = 0
    		var kd = 0
    		var ku = 0

    		for (var i = 0; i < tableau.time.length; i++) { //Pour toutes les données du tableau
    			var djour = new Date(tableau.time[i]).getDate() //On récupère le numéro du jour du test
    			if (djour < 10) { djour = '0'+djour } //Si le numéro du jour est inférieur à 10 on rajoute un zéro devant
    			var dDown = tableau.down[i] //On récupère le débit descendant en Mo/s
    			var dUp = tableau.up[i] //On récupère le débit montant en Mo/s

    			if (tabTime.indexOf(djour) === -1) { //Si le numéro de jour n'est pas déjà dans le tableau tabTime
    				if (j > 1) { //Si le diviseur j est plus grand que 1
    					//On calcul la moyenne des débits (initial & supplémentaires) du jour
    					//et on met la nouvelle valeur dans le tableau tabDown et tabUp
    					tabDown[tabTime.length - 1] = (tabDown[tabTime.length - 1] + kd)/j
    					tabUp[tabTime.length - 1] = (tabUp[tabTime.length - 1] + ku)/j
    				}
    				j = 1 //On repasse j à 1
    				kd = 0 //On repasse kd à 0
    				ku = 0 //On repasse ku à 0

    				tabTime.push(djour) //On met la valeur du jour dans le tableau tabTime
    				tabDown.push(dDown) //On met la valeur du débit descendant dans le tableau tabDown
    				tabUp.push(dUp) //On met la valeur du débit montant dans le tableau tabUp

    			} else { //Sinon si le numéro de jour est déjà dans le tableau tabTime
    				j++ //On incrémente le diviseur j
    				kd = kd + dDown //On calcul la somme des débits descendant supplémentaires
    				ku = ku + dUp //On calcul la somme des débits montant supplémentaires
    			}
    		}
    		var tab = {
				time: tabTime,
				down: tabDown,
				up: tabUp
			}
			return tab
    	}

    	var moyenneMois = function(tab) {
    		var somme = 0
    		for (var i = 0; i < tab.length; i++) {
    			somme += tab[i]
    		}
    		return somme/tab.length
    	}

		//Affichage des Graphs Débits
		if (document.getElementById("chartMoisEnCours") != null) {

			document.getElementById('moy' + moisEnCours() + 'D').innerHTML = (moyenneMois(debitMois(moisEnCours()).down).toFixed(2) + ' Mbit/s')
			document.getElementById('moy' + moisEnCours() + 'U').innerHTML = (moyenneMois(debitMois(moisEnCours()).up).toFixed(2) + ' Mbit/s')

			//Chart.js
			var ctx = document.getElementById("chartMoisEnCours").getContext("2d");
			var myChart = new Chart(ctx, {
				type: 'line',
				data: {
					labels: moyenneJour(moisEnCours()).time,
					datasets: [{
						label: 'Débit descendant en Mbit/s',
						data: moyenneJour(moisEnCours()).down,
						fillColor: "rgba(151,187,205,0.5)",
						//backgroundColor: "rgba(75,192,192,0.4)",
						borderColor: "rgba(75,192,192,1)"
					}, {
						label: "Débit montant en Mbit/s",
						data: moyenneJour(moisEnCours()).up,
						fillColor: "rgba(151,187,205,0.5)",
						//backgroundColor: "rgba(211,69,69,0.8)",
						borderColor: "rgba(214,25,25,1)"
					}]
				},
				options: {
					title: {
						display: true,
						text: 'Évolution du débit du mois de ' + recupNomMois(moisEnCours()) + ' ' + annee
					},
					responsive: true,
					scales: {
						yAxes: [{
							ticks: {
								beginAtZero: true
							}
						}]
					}
				}
			});

		} else {

			for (var i = 01; i <= 12; i++) {
				if (i.toString().length == 1) { i = '0'+i }
				if (debitMois(i).time != '') {

			    	document.getElementById('moy' + i + 'D').innerHTML = (moyenneMois(debitMois(i).down).toFixed(2) + ' Mbit/s')
			    	document.getElementById('moy' + i + 'U').innerHTML = (moyenneMois(debitMois(i).up).toFixed(2) + ' Mbit/s')

					//Chart.js
					var ctx = document.getElementById('myChart' + i).getContext("2d");
					var myChart = new Chart(ctx, {
					    type: 'line',
					    data: {
					        labels: moyenneJour(i).time,
					        datasets: [{
					        	label: 'Débit descendant en Mbit/s',
					            data: moyenneJour(i).down,
					            fillColor: "rgba(151,187,205,0.5)",
					            //backgroundColor: "rgba(75,192,192,0.4)",
					            borderColor: "rgba(75,192,192,1)"
					        }, {
						        label: "Débit montant en Mbit/s",
						        data: moyenneJour(i).up,
						        fillColor: "rgba(151,187,205,0.5)",
						        //backgroundColor: "rgba(211,69,69,0.8)",
						        borderColor: "rgba(214,25,25,1)"
						    }]
					    },
					    options: {
					    	title: {
					            display: true,
								text: 'Évolution du débit du mois de ' + recupNomMois(i) + ' ' + annee
					        },
					    	responsive: true,
					        scales: {
					            yAxes: [{
					                ticks: {
					                    beginAtZero: true
					                }
					            }]
					        }
					    }
					});

				} else {
					console.log('NO DATA')
				}
			}
		}

	}
};
req.send(null);
