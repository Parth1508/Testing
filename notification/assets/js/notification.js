
jQuery(document).ready(function () {



  jQuery('.layout').hide();
  var div_layout_array = ["layout-1", "layout-2", "layout-3", "layout-4", "layout-5", "layout-6", "layout-7", "layout-8", "layout-9", "layout-10", "layout-11", "layout-12", "layout-13", "layout-14"];

  // for desktop view
  if (jQuery(window).width() > 992) {
    jQuery(".notification-wrapper__link").on('click', function () {

      var layout_value = jQuery(this).attr('data-layout_name');
      jQuery('#' + layout_value).addClass('active_class');
      jQuery('#' + layout_value).siblings('div').removeClass('active_class');
      jQuery(".noti-section-one").removeClass("noti-hide");
      jQuery(".noti-section-two").removeClass("noti-hide");

      // for design-one
      jQuery(".noti-design-one").addClass("rotateInDownLeft");
      jQuery(".noti-design-one").removeClass("rotateOutUpLeft");


      // for design-two
      jQuery(".noti-design-two").addClass("rotateInUpLeft");
      jQuery(".noti-design-two").removeClass("rotateOutDownLeft");

      // for design-three
      jQuery(".noti-design-three").addClass("fadeInDown");
      jQuery(".noti-design-three").removeClass("fadeOutUp");

      // for design-four
      jQuery(".noti-design-four").addClass("fadeInUp");
      jQuery(".noti-design-four").removeClass("fadeOutDown");

      // for design-five
      jQuery(".noti-design-five").addClass("fadeInLeft");
      jQuery(".noti-design-five").removeClass("fadeOutLeft");

      // for design-six
      jQuery(".noti-design-six").addClass("fadeInRight");
      jQuery(".noti-design-six").removeClass("fadeOutRight");

      // for design-seven
      jQuery(".noti-design-seven").addClass("slideInDown");
      jQuery(".noti-design-seven").removeClass("slideOutUp");

      // for design-eight
      jQuery(".noti-design-eight").addClass("slideInUp");
      jQuery(".noti-design-eight").removeClass("slideOutDown");

      // for design-nine
      jQuery(".noti-design-nine").addClass("flipInX");
      jQuery(".noti-design-nine").removeClass("flipOutX");

      // for design-ten
      jQuery(".noti-design-ten").addClass("flipInX");
      jQuery(".noti-design-ten").removeClass("flipOutX");


      // for design-eleven
      jQuery(".noti-design-eleven").addClass("jackInTheBox");
      jQuery(".noti-design-eleven").removeClass("zoomOutLeft");


      // for design-twelve
      jQuery(".noti-design-twelve").addClass("jackInTheBox");
      jQuery(".noti-design-twelve").removeClass("zoomOutRight");


      // for design-thirteen
      jQuery(".noti-design-thirteen").addClass("bounceInDown");
      jQuery(".noti-design-thirteen").removeClass("bounceOutUp");


      // for design-fourteen
      jQuery(".noti-design-fourteen").addClass("bounceInUp");
      jQuery(".noti-design-fourteen").removeClass("bounceOutDown");


      // for design-fifteen
      jQuery(".noti-design-fifteen").addClass("rotateInDownLeft");
      jQuery(".noti-design-fifteen").removeClass("rotateOutUpLeft");


      // for design-sixteen
      jQuery(".noti-design-sixteen").addClass("rotateInUpLeft");
      jQuery(".noti-design-sixteen").removeClass("rotateOutDownLeft");


      // for design-seventeen
      jQuery(".noti-design-seventeen").addClass("fadeInLeft");
      jQuery(".noti-design-seventeen").removeClass("fadeOutLeft");

      // for design-eighteen
      jQuery(".noti-design-eighteen").addClass("fadeInRight");
      jQuery(".noti-design-eighteen").removeClass("fadeOutRight");

      // for Design-nineteen
      jQuery(".noti-design-nineteen").addClass("jackInTheBox");
      jQuery(".noti-design-nineteen").removeClass("flipOutY");


      // for Design-twenty
      jQuery(".noti-design-twenty").addClass("jackInTheBox");
      jQuery(".noti-design-twenty").removeClass("flipOutY");

      // for Design-twenty-one
      jQuery('.noti-design-twenty-one').addClass('animate__zoomInDown');
      jQuery('.noti-design-twenty-one').removeClass('animate__zoomOutDown');

      // for Design-twenty-two
      jQuery(".noti-design-twenty-two").addClass("animate__zoomInDown");
      jQuery(".noti-design-twenty-two").removeClass("animate__zoomOutDown");

      // for Design-twenty-three 
      jQuery(".noti-design-twenty-three").addClass("animate__zoomInLeft");
      jQuery(".noti-design-twenty-three").removeClass("animate__zoomOutLeft");

      // for Design-twenty-four 
      jQuery(".noti-design-twenty-four").addClass("animate__zoomInRight");
      jQuery(".noti-design-twenty-four").removeClass("animate__zoomOutRight");

      // for Design-twenty-five
      jQuery(".noti-design-twenty-five").addClass("animate__backInDown");
      jQuery(".noti-design-twenty-five").removeClass("animate__backOutDown");

      // for Design-twenty-six
      jQuery(".noti-design-twenty-six").addClass("animate__backInUp");
      jQuery(".noti-design-twenty-six").removeClass("animate__backOutUp");

      // for Design-twenty-seven
      jQuery(".noti-design-twenty-seven").addClass("animate__fadeInTopLeft");
      jQuery(".noti-design-twenty-seven").removeClass("animate__fadeOutTopLeft");

      // for Design-twenty-eight
      jQuery(".noti-design-twenty-eight").addClass("animate__fadeInTopRight");
      jQuery(".noti-design-twenty-eight").removeClass("animate__fadeOutTopRight");
    });
  }

  else {
    // for mobile view

    jQuery("#mobile-view-sidebar").on('change', function () {

      var layout_value = jQuery(this).val();
      jQuery('#' + layout_value).addClass('active_class');
      jQuery('#' + layout_value).siblings('div').removeClass('active_class');

    });
  }

  // add active class in anchor tag

  jQuery('a.notification-wrapper__link').on('click', function () {
    jQuery('a.notification-wrapper__link').removeClass('active');
    jQuery(this).addClass('active');
  });

  // removing notification with animation

  // for left side
  jQuery(".close-one").click(function () {
    setTimeout(function () { jQuery(".noti-section-one").addClass("noti-hide"); }, 1000);

    // for design-one
    jQuery(".noti-design-one").removeClass("rotateInDownLeft");
    jQuery(".noti-design-one").addClass("rotateOutUpLeft");

    // for design-three
    jQuery(".noti-design-three").removeClass("fadeInDown");
    jQuery(".noti-design-three").addClass("fadeOutUp");

    // for design-five
    jQuery(".noti-design-five").removeClass("fadeInLeft");
    jQuery(".noti-design-five").addClass("fadeOutLeft");

    // for design-seven
    jQuery(".noti-design-seven").removeClass("slideInDown");
    jQuery(".noti-design-seven").addClass("slideOutUp");

    // for design-nine
    jQuery(".noti-design-nine").removeClass("flipInX");
    jQuery(".noti-design-nine").addClass("flipOutX");

    // for design-eleven
    jQuery(".noti-design-eleven").removeClass("jackInTheBox");
    jQuery(".noti-design-eleven").addClass("zoomOutLeft");

    // for design-thirteen
    jQuery(".noti-design-thirteen").removeClass("bounceInDown");
    jQuery(".noti-design-thirteen").addClass("bounceOutUp");

    // for design-fifteen
    jQuery(".noti-design-fifteen").removeClass("rotateInDownLeft");
    jQuery(".noti-design-fifteen").addClass("rotateOutUpLeft");

    // for design-seventeen
    jQuery(".noti-design-seventeen").removeClass("fadeInLeft");
    jQuery(".noti-design-seventeen").addClass("fadeOutLeft");

    // for Design-nineteen
    jQuery(".noti-design-nineteen").removeClass("jackInTheBox");
    jQuery(".noti-design-nineteen").addClass("flipOutY");

    // for Design-twenty-one
    jQuery(".noti-design-twenty-one").removeClass("animate__zoomInDown");
    jQuery(".noti-design-twenty-one").addClass("animate__zoomOutDown");

    // for Design-twenty-three
    jQuery(".noti-design-twenty-three").removeClass("animate__zoomInLeft");
    jQuery(".noti-design-twenty-three").addClass("animate__zoomOutLeft");

    // for Design-twenty-five
    jQuery(".noti-design-twenty-five").addClass("animate__backOutDown");
    jQuery(".noti-design-twenty-five").removeClass("animate__backInDown");

    // for Design-twenty-seven
    jQuery(".noti-design-twenty-seven").addClass("animate__fadeOutTopLeft");
    jQuery(".noti-design-twenty-seven").removeClass("animate__fadeInTopLeft");

  });

  // for right side
  jQuery(".close-two").click(function () {
    setTimeout(function () { jQuery(".noti-section-two").addClass("noti-hide"); }, 1000);

    // for design-two	
    jQuery(".noti-design-two").removeClass("rotateInUpLeft");
    jQuery(".noti-design-two").addClass("rotateOutDownLeft");

    // for design-four
    jQuery(".noti-design-four").removeClass("fadeInUp");
    jQuery(".noti-design-four").addClass("fadeOutDown");

    // for design-six
    jQuery(".noti-design-six").removeClass("fadeInRight");
    jQuery(".noti-design-six").addClass("fadeOutRight");

    // for design-eight
    jQuery(".noti-design-eight").removeClass("slideInUp");
    jQuery(".noti-design-eight").addClass("slideOutDown");

    // for design-ten
    jQuery(".noti-design-ten").removeClass("flipInX");
    jQuery(".noti-design-ten").addClass("flipOutX");

    // for design-twelve
    jQuery(".noti-design-twelve").removeClass("jackInTheBox");
    jQuery(".noti-design-twelve").addClass("zoomOutRight");


    // for design-fourteen
    jQuery(".noti-design-fourteen").removeClass("bounceInUp");
    jQuery(".noti-design-fourteen").addClass("bounceOutDown");


    // for design-sixteen
    jQuery(".noti-design-sixteen").removeClass("rotateInUpLeft");
    jQuery(".noti-design-sixteen").addClass("rotateOutDownLeft");


    // for design-eighteen
    jQuery(".noti-design-eighteen").removeClass("fadeInRight");
    jQuery(".noti-design-eighteen").addClass("fadeOutRight");


    // for design-twenty
    jQuery(".noti-design-twenty").removeClass("jackInTheBox");
    jQuery(".noti-design-twenty").addClass("flipOutY");

    // for Design-twenty-two
    jQuery(".noti-design-twenty-two").removeClass("animate__zoomInDown");
    jQuery(".noti-design-twenty-two").addClass("animate__zoomOutDown");

    // for Design-twenty-four
    jQuery(".noti-design-twenty-four").removeClass("animate__zoomInRight");
    jQuery(".noti-design-twenty-four").addClass("animate__zoomOutRight");

    // for Design-twenty-six
    jQuery(".noti-design-twenty-six").addClass("animate__backOutUp");
    jQuery(".noti-design-twenty-six").removeClass("animate__backInUp");

    // for Design-twenty-eight
    jQuery(".noti-design-twenty-eight").addClass("animate__fadeOutTopRight");
    jQuery(".noti-design-twenty-eight").removeClass("animate__fadeInTopRight");

  });
});


