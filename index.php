<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Addi-Grille 2.0</title>
    <meta name="description"
        content="Travailler le calcul à l'école primaire en réalisant des Addi-Grilles en ligne.">
    <meta name="keywords"
        content="maths, mathématiques, école, primaire, nombre, calcul, addi-grille" />
    <meta name="author"
        content="Frédéric MISERY - Version du 17/04/2017" />
    <link rel="stylesheet" href="../css-vendor/bootstrap.css">
    <link rel="stylesheet" href="./style/style.css?t=<?php echo time(); ?>">
  </head>
  <body>
    <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div class="container">
            <div class="navbar-header">
                <a class="navbar-brand" href="#">
                    Addi-Grille
                </a>
            </div>
            <div class="navbar-inner navbar-right">
                <div class="collapse navbar-collapse">
                    <a href=".." class="btn btn-default navbar-btn" id="accueil" type="button">
                        MiCetF
                        <span class="glyphicon glyphicon-home"></span>
                    </a>
                    <a class="btn btn-default navbar-btn" id="contact" type="button">
                        Contact
                        <span class="glyphicon glyphicon-envelope"></span>
                    </a>
                </div>
            </div>
        </div>
    </nav>
    <div class="container" id="app"></div>
  </body>
  <script src="./bundle.js?t=<?php echo time(); ?>"></script>
  <script src="../js-micetf/paypal.js"></script>
  <script src="../js-micetf/contact.js"></script>
</html>
