;
(function () {
    "use strict";

    const switchButtons = document.querySelectorAll('.ba-btn-switcher');
    const eventTmpl = document.getElementById('timetable-tmpl').innerHTML;
    var activeDate = '14';
    const timeTableDiv = document.querySelector('.ba-timetable');
    dataUploader(activeDate);


    switchButtons.forEach(function (button) {
        if (button.dataset.day == activeDate) {
            button.style.color = "var(--purple)";
        }
        button.addEventListener('click', isActive);
    })


    function isActive(e) {
        e.preventDefault();
        activeDate = this.dataset.day;
        dataUploader(activeDate);
        switchButtons.forEach(function (button) {
            if (button != this) button.style.color = "var(--grey)";
        })

        this.style.color = "var(--purple)";

    }


    function dataUploader(x_activeDate) {
        console.log('we were in a func', x_activeDate);
        var timetableEvents = '';
        var xhr = new XMLHttpRequest();
        xhr.open('GET', './data/timetable.json', true);
        xhr.send();
        xhr.onload = (function () {
            const jsonData = JSON.parse(this.response);
            jsonData.forEach(function (timetableEvent) {
                if (timetableEvent.day == x_activeDate) {
                    console.log('day', timetableEvent.day);
                    timetableEvents += eventTmpl
                        .replace(/{{time}}/, timetableEvent.time)
                        .replace(/{{event}}/, timetableEvent.event)
                        .replace(/{{description}}/, timetableEvent.description)
                }

            })
            console.log('we were here');

            timeTableDiv.innerHTML = timetableEvents;


        });
    };




})();