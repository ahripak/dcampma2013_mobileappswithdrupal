(function($) {
  /**
   * Super hacky solution to change a textfield into a checkbox.
   * The purpose of this is to workaround a services bug that
   * doesn't handle boolean fields properly.
   */
  Drupal.behaviors.todo4u = {
    attach: function(context) {
      // Target the textfields
      $('input[type="text"][name^="field_complete"]').each(function() {
	// Make a clone and hide the textfield
	$copy = $(this).clone();
	$(this).hide();

	// Modify some props and add a click listener
	$copy.addClass('faux_check').attr({
	  type : 'checkbox'
	}).click(function() {
	  // Need to fill in the proper value in the textfield
	  $(this).parent().find('input[type="text"]').val($(this).attr('checked') == true ? '1' : '0');
	  // Get the form selector before we remove the checkbox
	  var $form = $(this).parent().parent().parent().parent().parent().find('.form-submit');
	  // For validation purposes, remove the checkbox
	  $(this).remove();
	  $form.click();
	});

	// This is called on ajaxSuccess or dom.ready
	if($(this).val() == "1") {
	  $copy.attr({
	    checked : 'checked'
	  });
	}

	// Only append the checkbox if one doesn't already exist
	if($(this).parent().children().length == 1) {
	  $(this).parent().append($copy);
	}
      });
    }
  }
})(jQuery);