$(function() {
  eventLoaded();  
});

function eventLoaded() {
  $("#submit").on('click', submitTickets);
};

//SUBMITTING TICKET CREATION FORM TO A JSON FILE
function submitTickets() {
  const data = { element: $("#formid").serialize() };
  const object = {
    url: 'http://localhost:3000/tickets', //ADD NEW LOCALHOST CREATED BY YOUR JSON SERVER
    type: "POST",
    data: data.element,
    success: 'Tickets have been created!!',
    error: 'Please try again!!'
  };
  api(object);
}

//SHOW TICKETS IN TABLE FROM JSON TABLEDATA FILE
function getTickets(success, pageNumber) {
  const object = {
    url: `http://localhost:3000/tableData?_page=${pageNumber}&_limit=3`, //ADD NEW LOCALHOST CREATED BY YOUR JSON SERVER
    type: 'GET',
    success: success,
  }
  api(object);
}

//DINAMIC FUNCTION TO HANDLE DATA JSON IN DASHBOARD
function api(object) { 
  $.ajax({
    url: object.url,
    type: object.type,
    dataType: 'json',
    data: object.data,
    success: function (data) {
      if (object.success && typeof object.success === 'function') object.success(data);
      alert(object.success);
    },
    error: function (xhr, resp, text) {
      if (object.error && typeof object.success === 'function') object.error(data);
      console.log(xhr, resp, text);
      alert(object.error);
    }
  });
}

