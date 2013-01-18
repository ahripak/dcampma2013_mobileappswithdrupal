(function($) {

  // Our api endpoint
  var url = 'http://todo4u.dev/';
  var uri = 'http://todo4u.dev/todoapi';


  // Wait for the device to be ready
  $(document).bind('deviceready', device_ready);

  function device_ready() {

    // Check if already logged in
    $.post(uri + "/system/connect.json", function(data) {
      if(data.user.uid != 0) {
	$.mobile.changePage("index.html#main", "slide");
      }
    }, 'json');

    // Login form handler
    $('#login_submit').click(function() {
      var user = {
	username : $('#username').val(),
	password : $('#password').val()
      };

      $.ajax({
	url : uri + "/user/login.json",
	type : 'post',
	data : $.param(user),
	dataType : 'json',
	error : function() {
	  alert("Not logged in");
	},
	success : function(data) {
	  // Change the page to our main list
	  $.mobile.changePage("index.html#main", "slide");
	}
      });

      return false;
    });

    // Rebuild the list view on page load
    $('#main').live('pagebeforeshow', function(event, ui) {
      refresh_list();
    });

    function refresh_list() {
      $.getJSON(url + '/todoview', function(data) {
	// Remove any old rows
	$('#main_list').html('');

	// Loop through data
	var nodes = data.nodes;
	$.each(nodes, function(index, node_container) {
	  var node = node_container.node;
	  var check_icon = (node.field_complete != "0") ? "check" : "false";
	  console.log(node);
	  $('#main_list').append(
	    $("<li></li>").attr({'data-icon' : check_icon})
	      .html("<a  class='todo-item " + data.field_complete + "' data-nid='" + node.nid + "' href='/#'>" + node.title + "</a>")
	  );
	});

	// Rebuild the listview
	$('#main_list').listview('destroy').listview();

	// Asign click listeners
	$('#main_list li').click(function() {

	  // Prepare the node object
	  var node = { node : {
	    field_complete : { und : [{value : "1"}]},
	    type : 'todo',
	    title : $(this).find('.todo-item').text(),
	    language : 'und'
	  }};

	  // Send it off
	  $.ajax({
	    url : uri + "/node/" + $(this).find('.todo-item').attr('data-nid'),
	    type : 'put',
	    data : JSON.stringify(node),
	    dataType : 'json',
	    contentType : 'application/json',
	    error : function() {
	      alert("Did not save");
	    },
	    success : function(data) {
	      refresh_list();
	    }
	  });
	});
      });
    }

  }

}) (jQuery);