var reservations = [];

var selectedYear1 = (new Date()).getYear() + 1900;
var selectedYear2 = (new Date()).getYear() + 1900;
var selectedMonth1 = (new Date()).getMonth();
var selectedMonth2 = (new Date()).getMonth();
var dates = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

$(document).ready(function() {
    $('#calClockInDatePicker_peers').datepicker('option', 'onChangeMonthYear', function(year, month) { selectedMonth1 = month; selectedYear1 = year; });
    $('#calClockInDatePicker_peers2').datepicker('option', 'onChangeMonthYear', function(year, month) { selectedMonth2 = month; selectedYear2 = year; });
});


function saveEvent() {
           
    var getcol;
    var length = document.getElementById("table1").rows[1].cells.length;
    
    var x = document.getElementById("calClockInDatePicker_peers").value;

    var d = new Date();
    var n = d.getMonth();
    var thisYear = d.getYear() + 1900;

    if (selectedYear1 > thisYear) {
        alert("Invalid date");
        return;
    }
    else if (selectedYear1 < thisYear || (selectedYear1 == thisYear && selectedMonth1 < n) ) {
        getcol = 0;
    }
    else {
        for (col = 1; col < length; col++) {
            var x1 = document.getElementById("table1").rows[1].cells[col].innerHTML;
            x1 = (d.getMonth() + 1) + "/" + x1 + "/" + (d.getYear() + 1900);
            
            if(x==x1)
            {
                getcol = col;
                break;

            }
        }
    }


    /// second coloumn

    var secondx = document.getElementById("calClockInDatePicker_peers2").value;
    
    var getcol2;

    if (selectedYear2 < thisYear) {
        alert("Invalid date");
        return;
    }
    else if (selectedYear2 > thisYear || (selectedYear2 == thisYear && selectedMonth2 > n)) {
        if (d.getMonth() == 1) {
            if (thisYear % 4 == 0) {
                getcol2 = 29;
            }
            else {
                getcol2 = 28;
            }
        }
        else {
            getcol2 = dates[d.getMonth()] - 1;
        }
    }
    else {
        for (col2 = 1; col2 < length; col2++) {
            var second = document.getElementById("table1").rows[1].cells[col2].innerHTML;
            second = (d.getMonth() + 1) + "/" + second + "/" + (d.getYear() + 1900);
            if (secondx == second) {
                getcol2 = col2;
               break;

           }
        }
    }
    
    getcol2 = getcol2 + 3;
    getcol = getcol + 3;
    
    var getrow;
    var lengthrow = document.getElementById("table1").rows.length;
    
    var rowget = document.getElementById("sel1").value;
  
    for (row = 1; row < lengthrow; row++) {
        var row2 = document.getElementById("table1").rows[row].cells[0].innerHTML;
        
        if (rowget == row2) {
            getrow = row;
            break;

        }
    }
    var checkedValue = $("#checkbox_id").is(":checked");
    var name = document.getElementById("name").value;
    var statu = document.querySelector('input[name="gender"]:checked').value;
    
  //  alert("new or confirmed" + statu)

    var i = getcol;
     for (i=getcol ;i <= getcol2; i++)
    {
         if (checkedValue == true) {
             if (statu == "New")
             {
                 document.getElementById("table1").rows[getrow].cells[i].style.backgroundColor = "Yellow";

             }
             if (statu == "Confirmed") {
                 document.getElementById("table1").rows[getrow].cells[i].style.backgroundColor = "lightblue";

             }
             if (statu == "Arrived") {
                 document.getElementById("table1").rows[getrow].cells[i].style.backgroundColor = "green";

             }
             if (statu == "Checked Out") {
                 document.getElementById("table1").rows[getrow].cells[i].style.backgroundColor = "blue";

             }
             
             //document.getElementById("table1").rows[getrow].cells[getcol].innerHTML = name + " " + "Paid";
             //document.getElementById("table1").rows[getrow].cells[getcol2].innerHTML = statu;

    }
         else {


             
                 if (statu == "New")
                 {
                     document.getElementById("table1").rows[getrow].cells[i].style.backgroundColor = "Yellow";

                 }
                 if (statu == "Confirmed") {
                     document.getElementById("table1").rows[getrow].cells[i].style.backgroundColor = "lightblue";

                 }
                 if (statu == "Arrived") {
                     document.getElementById("table1").rows[getrow].cells[i].style.backgroundColor = "green";

                 }
                 if (statu == "Checked Out") {
                     document.getElementById("table1").rows[getrow].cells[i].style.backgroundColor = "blue";

                 }


              //document.getElementById("table1").rows[getrow].cells[getcol].innerHTML = name+" "+" Not Paid";
             //document.getElementById("table1").rows[getrow].cells[getcol2].innerHTML = statu;

        }
    }
     var status = document.getElementById("calClockInDatePicker_peers2").value;
     var paid = document.getElementById("checkbox_id").value;
    
    var paidString = "Unpaid";
    if (checkedValue == true)
        paidString = "Paid";
     
    $('#myModal').modal('hide');

    if (selectedReservation == null)
        reservations.push({startDate: new Date(x), endDate: new Date(secondx), room: rowget, text: name, status: statu, paid: paidString});
    else
        reservations[selectedRsvtIndex] = {startDate: new Date(x), endDate: new Date(secondx), room: rowget, text: name, status: statu, paid: paidString};
}

$("body").on("click", ".tabbody > tr > td:nth-child(n + 4)", function() {

    var col_index = $(this).index();
    var row_index = $(this).parent().index();
    var rowget = document.getElementById("sel1").value;


    selectedYear1 = (new Date()).getYear() + 1900;
    selectedYear2 = (new Date()).getYear() + 1900;
    selectedMonth1 = (new Date()).getMonth();
    selectedMonth2 = (new Date()).getMonth();


    clickedDate.setDate(col_index - 2);
    clickedDate.setHours(0);
    clickedDate.setMinutes(0);
    clickedDate.setSeconds(0);
    clickedDate.setMilliseconds(0);

    var date = clickedDate;

    $('#myModal').modal('show');

    selectedReservation = null;
    selectedRsvtIndex = -1;

    for (i = 0; i < reservations.length; i++) {

        var rsvt = reservations[i];
        var rowget = document.getElementById("sel1").value;

        if (rsvt.room == rowget && date >= rsvt.startDate && date <= rsvt.endDate) {
            selectedReservation = rsvt;
            selectedRsvtIndex = i;
        }
    }

    $(".tag").css("display", "none");
});

$("body").on("mouseover", ".tabbody > tr > td:nth-child(n + 4)", function() {

    var col_index = $(this).index();
    var row_index = $(this).parent().index();

    console.log(col_index);
    console.log(row_index);
    var rowget = document.getElementById("sel1").value;


    selectedYear1 = (new Date()).getYear() + 1900;
    selectedYear2 = (new Date()).getYear() + 1900;
    selectedMonth1 = (new Date()).getMonth();
    selectedMonth2 = (new Date()).getMonth();


    clickedDate.setDate(col_index - 2);
    clickedDate.setHours(0);
    clickedDate.setMinutes(0);
    clickedDate.setSeconds(0);
    clickedDate.setMilliseconds(0);

    var date = clickedDate;

    selectedReservation = null;
    selectedRsvtIndex = -1;

    var rooms = ["101", "103", "110", "111", "125", "126", "127"];
    var rowget = rooms[row_index];

    for (i = 0; i < reservations.length; i++) {

        var rsvt = reservations[i];

        if (rsvt.room == rowget && date >= rsvt.startDate && date <= rsvt.endDate) {
            selectedReservation = rsvt;
            selectedRsvtIndex = i;
        }
    }

    if (selectedReservation != null) {
        $(".reservation_name").text(selectedReservation.text);
        $(".reservation_room").text("Room: " + selectedReservation.room);
        $(".reservation_stat").text("Status: " + selectedReservation.status);
        $(".reservation_paid").text(selectedReservation.paid);

        $(".tag").css("position", "fixed");
        $(".tag").css("display", "block");
        $(".tag").css("left", $(this).position().left + $(this).width() * 3 + "px");
        $(".tag").css("top", $(this).position().top + $(this).height() + 130  + "px");
    }
    else {
        $(".tag").css("display", "none");
    }
});

function deleteEvent() {

    if (selectedRsvtIndex != -1) {
        reservations.splice(selectedRsvtIndex, 1);
    }

    for (i = 0; i < reservations.length; i++) {
        console.log(JSON.stringify(reservations[i]));
    }

    console.log(clickedDate.toString());

    showEvents();
    $('#myModalSmall').modal('hide');
    $('#myModal').modal('hide');
}

function showEvents() {

    var table = document.getElementById("table1");
    var rows = table.getElementsByTagName("tr");
   
    var countcolumns = 0;
    var cntn = 0;

    var rowtotal = document.getElementById("table1").rows.length;
    var arrcount = array.length;

    for (var rowst = 2; rowst < rowtotal; rowst++) {
        for (var column = 0; column < 31; column++) {
            document.getElementById("table1").rows[rowst].cells[column + 3].style.backgroundColor = "#ffffff";
        }
    }    

    for (var rowst = 2; rowst < rowtotal; rowst++) {
        for (var column = 0; column < 31; column++) {

            // has to be a - 1 as day row has first col missing due to rowspan of month
            if (rows[1].cells[column]) {

                for (var f = 0; f < arrcount; f++) {


                    var set = rows[1].cells[column].innerHTML;
                    if (set == array[f]) {

                        document.getElementById("table1").rows[rowst].cells[column + 3].style.backgroundColor = "#ffff99";
                        document.getElementById("table1").rows[rowst].cells[column + 2].style.backgroundColor = "#ffff99";

                    }

                    //document.getElementById("table1").rows[c].cells[column].style.backgroundColor = "Yellow";

                }

                for (i = 0; i < reservations.length; i++) {

                    var rsvt = reservations[i];
                    var room = document.getElementById("table1").rows[rowst].cells[0].innerHTML;
                    var date = new Date(clickedDate);
                    date.setDate(column + 1);

                    // console.log ("Current: " + clickedDate.toString());
                    // console.log(date.toString());

                    if (rsvt.room == room && date >= rsvt.startDate && date <= rsvt.endDate) {

                        var statu = rsvt.status;

                        if (statu == "New")
                        {
                            document.getElementById("table1").rows[rowst].cells[column + 3].style.backgroundColor = "Yellow";

                        }
                        if (statu == "Confirmed") {
                            document.getElementById("table1").rows[rowst].cells[column + 3].style.backgroundColor = "lightblue";

                        }
                        if (statu == "Arrived") {
                            document.getElementById("table1").rows[rowst].cells[column + 3].style.backgroundColor = "green";

                        }
                        if (statu == "Checked Out") {
                            document.getElementById("table1").rows[rowst].cells[column + 3].style.backgroundColor = "blue";

                        }

                        //document.getElementById("table1").rows[rowst].cells[column + 2].style.backgroundColor = "#ffff99";
                    }

                    // var rowget = document.getElementById("sel1").value;

                    // if (rsvt.room == rowget && date >= rsvt.startDate && date <= rsvt.endDate) {
                    //     selectedReservation = rsvt;
                    //     selectedRsvtIndex = i;
                    // }
                }

            }

        }
    }
}