$(function(){
  PageEvent();  
});

//GENERAL EVENTS
function PageEvent() {  
  $("#remove").on('click', showHideInfoRow);
  $('.dropdown button').on('click', dropDownNavBar);
  $('#myTable th').on('click', displayingHidingArrows);
  initTableSorter();
  resetTable();
  getTickets(populateTickets); // ADDING FUNCTION AS PARAMETER TO LINK AJAX, GET TICKETS() AND POPULATE TICKETS()
  $('.pagination > a').on('click', paginationEvent);
  window.currentPage = 1;
};

//PAGINATION EVENTS
function paginationEvent(event) {
  displayTicketsPagination(event);
  updateHighlight(event);
  disablePrevNextButton();
}

// INFO BOX HIDE AND SHOW  
function showHideInfoRow() {
  let element = '.tickets .info p:first-child';

  $(element).toggle("slow", function(){
    $(element).css('display') === 'none' ?
      $(".info").css({ 'width': 'fit-content' }) :
      $(".info").css({ 'width': '' });
  });
}

// DROPDOWN NAVBAR
function dropDownNavBar() {
  $('.dropdown ul').toggleClass('active');
};

//TABLESORTER TO SORT THE TABLE IN DASHBOARD
function initTableSorter() {
  $('#myTable').tablesorter();
}

//HIDE AND SHOW SORTING ARROWS IN TABLE
function displayingHidingArrows(e) {
  const $element = $(e.currentTarget);
  let doubleArrow = $element.find('.fa-sort');
  let arrowAscending = $element.find('.fa-sort-asc');
  let arrowDescending = $element.find('.fa-sort-desc');

  resetTable();
  doubleArrow.hide();
  arrowAscending.hide();
  arrowDescending.hide();

  if ($(this).attr('aria-sort') === 'descending') {
    arrowDescending.show();
  } else if ($(this).attr('aria-sort') === 'ascending') {
     arrowAscending.show();
  } else {
    doubleArrow.show();
    }
}

//RESET ARROWS WHEN PAGE LOAD, SHOW DOUBLE ARROW
function resetTable() {
  let upDownArrow = $('#myTable .fa-sort');
  let allArrows = $('#myTable i');

  allArrows.hide();
  upDownArrow.show();
}
  
//POPULATE TICKETS TABLE WITH PAGINATION
function populateTickets(tickets) {
  const tableBody = $('#myTable tbody');
  let ticketsTemplate = '';
  tableBody.html('');
  
  tickets.map((ticket) => { 
    const ticketRow = `<tr><td>${ticket.id}</td><td>${ticket.updatedBy}</td><td>${ticket.datetime}</td><td>${ticket.status}</td></tr>`;
    ticketsTemplate = ticketsTemplate + ticketRow;
  });
  
  tableBody.html(ticketsTemplate);
  $('#myTable').trigger('update'); // LET TABLESORTER PLUGIN KNOW ABOUT NEW DATA IN TABLE HAS BEEN UPDATED
}

//DISPLAY TICKETS IN PAGINATION  
function displayTicketsPagination(event) {
  event.preventDefault(); // PREVENT DEFAULT IS CALLED TO AVOID SCROLL UP THE PAGE.
  let pageNumber = $(event.currentTarget).data('page'); //PASSING EVENT AS PARAMETER DUE TO DINAMIC ELEMENTS IN PAGINATION
  
  if (pageNumber === 'next') {
    pageNumber = Math.min(window.currentPage + 1, 5);
  } else if (pageNumber === 'prev') {
    pageNumber = Math.max(window.currentPage - 1, 1);
  }
  window.currentPage = pageNumber;
  getTickets(populateTickets, pageNumber);
}

//ACTIVE CLASS PAGINATION
function updateHighlight(event) {
  event.preventDefault();

  $('.pagination > a').removeClass('active');
  $('.pagination > a').filter(function (index, element) {
  
    return $(element).data('page') === window.currentPage;
  }).addClass('active');
}

//DISABLE PREV AND NEXT ELEMENT IN PAGINATION
function disablePrevNextButton() {
  let lastElement = $('.pagination a:nth-child(6)');
  let firstElement = $('.pagination a:nth-child(2)');

  lastElement.hasClass('active') ?
    $('.nextButton').addClass('disable') :
    $('.nextButton').removeClass('disable');
  firstElement.hasClass('active') ?
    $('.previousButton').addClass('disable') :
    $('.previousButton').removeClass('disable');
}




