document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var reservedDates = []; // Pour stocker les dates réservées

    var calendar = new FullCalendar.Calendar(calendarEl, {
        defaultView: 'dayGridMonth',
        dateClick: function(info) {
            // Réinitialiser la couleur des dates réservées
            reservedDates.forEach(function(date) {
                var reservedDateEl = calendar.getEventById(date); // Récupérer l'événement par date
                if (reservedDateEl) {
                    reservedDateEl.setProp('backgroundColor', 'lightgreen'); // Applique lightgreen
                }
            });

            // Appliquer lightblue à la date cliquée (en cours de réservation)
            info.dayEl.style.backgroundColor = 'lightblue';

            // Afficher la fenêtre modale de réservation
            document.getElementById('reservationModal').style.display = 'block';

            // Réinitialiser le formulaire de réservation
            document.getElementById('reservationForm').reset();

            // Stocker la date cliquée pour l'utiliser lors de la soumission
            var clickedDate = info.dateStr; // Date cliquée
            // Créer une fonction pour gérer la soumission du formulaire
            handleReservationSubmit(clickedDate);
        },
        // Ajouter les événements déjà réservés lors du rendu du calendrier
        events: function(fetchInfo, successCallback, failureCallback) {
            // Simuler la récupération des événements depuis le serveur
            // Remplace ceci par une requête AJAX réelle pour obtenir les réservations
            const events = [
            
            ];
            successCallback(events); // Appelle le callback de succès avec les événements
        },
        eventDidMount: function(info) {
            // Colorer les événements réservés en lightgreen
            info.el.style.backgroundColor = 'lightgreen';
        },
    });

    calendar.render();

    // Gérer le clic sur le bouton de fermeture de la fenêtre modale
    document.querySelector('.close').addEventListener('click', function() {
        document.getElementById('reservationModal').style.display = 'none';
        // Réinitialiser la couleur de la date cliquée
        if (previousClickedDateEl) {
            previousClickedDateEl.style.backgroundColor = '';
        }
    });

    // Fonction pour gérer la soumission du formulaire de réservation
    function handleReservationSubmit(clickedDate) {
        document.getElementById('reservationForm').addEventListener('submit', function(event) {
            event.preventDefault();

            // Récupérer le nom de l'utilisateur
            var userName = document.getElementById('userNameInput').value;

            // Créer un nouvel événement pour la réservation
            var newEvent = {
                title: userName, // Le titre de l'événement est le nom de l'utilisateur
                start: clickedDate, // La date sélectionnée
                allDay: true
            };

            // Ajouter l'événement au calendrier
            calendar.addEvent(newEvent);

            // Stocker la date réservée pour changer la couleur si nécessaire
            reservedDates.push(clickedDate);

            // Appliquer lightgreen aux dates réservées
            calendar.getEventById(clickedDate).setProp('backgroundColor', 'lightgreen'); // Applique lightgreen

            alert('Réservation confirmée pour ' + userName + ' !');
            document.getElementById('reservationModal').style.display = 'none';
        });
    }
});
