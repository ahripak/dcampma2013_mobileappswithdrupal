(function($) {
  Drupal.behaviors.todo4u = {
    attach: function(context) {
      // Use clicking on the checkbox as if it were the save button to trigger ajax
      $('.form-item-field-complete-und .form-checkbox').click(function() {
	$(this).parent().parent().parent().parent().parent().find('.form-submit').click();
      });
    }
  }
})(jQuery);