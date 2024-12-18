document.addEventListener('DOMContentLoaded', function() {
    var openCalendarButton = document.getElementById('open-calendar-button');
    openCalendarButton.addEventListener('click', function() {
        var calendarWindow = window.open('/calendar/', 'Calendrier', 'width=800,height=600');
        calendarWindow.focus();

 
    });
});