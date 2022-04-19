$(document).ready(function () {
    if (location.hash){
      $(location.hash).collapse('show');
      $(location.hash).parents('.accordion-body').collapse('show');
    }
  });
