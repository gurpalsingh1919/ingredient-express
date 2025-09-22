$(document).ready(function() {

    $("#add-e").click(function(event) {
        event.preventDefault();
        var inputField = $("#write-e");
        var inputValue = $("#write-e").val();            
        var html = '<div class=\'fc-event fc-new\' data-color=\'fc-new\'>'+inputValue+'</div>';
        $(html).appendTo(".add-event").hide().slideDown();
        $(inputField).val('');
        initializeExternalEvents();
    });

    initializeExternalEvents();
    function initializeExternalEvents() {

        /* initialize the external events
        -----------------------------------------------------------------*/

        $('#external-events .fc-event').each(function() {

            // store data so the calendar knows to render an event upon drop
            $(this).data('event', {
                title: $.trim($(this).text()), // use the element's text as the event title
                className: $(this).data('color'),
                stick: true // maintain when user navigates (see docs on the renderEvent method)
            });

            // make the event draggable using jQuery UI
            $(this).draggable({
                zIndex: 999,
                revert: true,      // will cause the event to go back to its
                revertDuration: 0  //  original position after the drag
            });

        });
    }



    /* initialize the calendar
    -----------------------------------------------------------------*/

    $('#calendar').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        events: [
            {
                title: 'All Day Event',
                start: '2019-02-01T14:30:00',
                className: "bg-danger"
            },
            {
                title: 'Long Event',
                start: '2019-02-07T19:30:00',
                end: '2019-02-10T14:30:00',
                className: "bg-info"
            },
            {
                title: 'Conference',
                start: '2019-02-17T14:30:00',
                end: '2019-02-13T14:30:00',
                className: "bg-warning"
            },
            {
                title: 'Meeting',
                start: '2019-02-12T10:30:00',
                end: '2019-02-12T12:30:00'
            },
            {
                title: 'Lunch',
                start: '2019-02-12T15:00:00',
                className: "bg-secondary"
            },
            {
                title: 'Meeting',
                start: '2019-02-12T21:30:00',
                className: "bg-success"
            },
            {
                title: 'Happy Hour',
                start: '2019-02-12T05:30:00',
                className: "bg-warning"
            },
            {
                title: 'Dinner',
                start: '2019-02-12T20:00:00',
                className: "bg-dark"
            },
            {
                title: 'Click for Google',
                url: 'http://google.com/',
                start: '2019-02-28',
                className: "bg-success"
            }
        ],
        editable: true,
        droppable: true, // this allows things to be dropped onto the calendar
        eventLimit: true,
        drop: function() {
            // is the "remove after drop" checkbox checked?
            if ($('#drop-remove').is(':checked')) {
                // if so, remove the element from the "Draggable Events" list
                $(this).remove();
            }
        }
    });


    // NOTE:  Event marker are updated automatically with respect to current date. You can modify these event markers according to your need.
var attend=$('#markedattendance').data('attendance');
var newarr=[];
$.each( attend, function( key, value ) {
      //console.log( key + ": " + value['attendance_date'] );
      var newattenace=[];
      newattenace['title']="Present";
      newattenace['start']=value['attendance_date'];
      newattenace['className']="fc-event--green";
     newarr.push(newattenace);
     });
//console.log(attend);
//console.log(newarr);

    var today = new Date();
    var y = today.getFullYear();
    var m = today.getMonth();
    var d = today.getDate();
    //console.log(new Date(y, m, d - 12));
    //console.log(new Date(y, m, d));
    $('#c').fullCalendar({
        header: {
            left: "prev,next",
            center: "title",
            right: "month,agendaWeek,agendaDay"
        },
        editable: true,
        droppable: true, // this allows things to be dropped onto the calendar
        eventLimit: true,
        dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        timeFormat: "hh:mm a",
        events: newarr
    });


var nutritions=$('#markenutritions').data('nutrition');
var newnutrition=[];
console.log(nutritions);
$.each( nutritions, function( key, value ) {
   var nutri="";
   console.log(value['nutritions']);
      JSON.parse(value['nutritions'], (keys, values) => {
        if(keys){
          console.log(keys+'-----'+values);
          nutri +=keys+":"+values +"\n";
      }
        });
      var newnut=[];

      newnut['title']=nutri;
      newnut['start']=value['start_date'];
      newnut['end']=value['end_date'];
      newnut['className']="bg-info";
     newnutrition.push(newnut);
     });



    $('#nutritions').fullCalendar({
        header: {
            left: "prev,next",
            center: "title",
            //right: "month"
        },
        editable: true,
        droppable: true, // this allows things to be dropped onto the calendar
        eventLimit: true,
        dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        timeFormat: "hh:mm a",
        events: newnutrition
    });





});