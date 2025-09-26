
/*------------------------- Banner Slider -------------------------
(function ($) {
  $(document).ready(function () {
    $('.hero-slider').owlCarousel({
      animateOut: 'slideOutUp',
      animateIn: 'slideDown',
      items: 1,
      loop: true,
      nav: true,
      dots: true,
      autoplay: true,
      autoplayTimeout: 5000,
      autoplayHoverPause: true,
      navigation: true
    })
  });
})(jQuery);

/*------------------------- Search Input Slide -------------------------*/
$(document).ready(function () {
  $("#searchBtn").on("click", function (e) {
    e.preventDefault(); 

    const $input = $("#searchInput");

    if (!$input.hasClass("show")) {
      
      $input.addClass("show").focus();
    } else {
     
      const query = $input.val().trim();
      if (query) {
       
        window.location.href = `/search-products?query=${encodeURIComponent(query)}`;
      }
    }
  });

  // $("#searchInput").on("click", function(e){
  //   e.stopPropagation();
  // });

  // $(document).on("click", function(){
  //   if ($("#searchInput").hasClass("show")) {
  //     $("#searchInput").removeClass("show").val("");
  //   }
  // });
});

/*------------------------- My Account Dropdown -------------------------*/
$(document).ready(function () {
  // Toggle dropdown on icon click
  $('#accountIcon').click(function (e) {
    e.stopPropagation();
    $('#myAccountdropdownMenu').toggle();
  });

  // Close dropdown on outside click
  $(document).click(function (e) {
    if (!$(e.target).closest('.myAccount').length) {
      $('#myAccountdropdownMenu').hide();
    }
  });
});


/*--------------------------------- Nav Dropdown -------------------------*/
$(document).ready(function () {
  // Toggle only the clicked dropdown
  $('.icon').click(function (e) {
    e.stopPropagation();
    // Close other dropdowns
    $('.subMenu').not($(this).next('.subMenu')).slideUp();
    // Toggle current dropdown
    $(this).next('.subMenu').slideToggle();
  });

  // Close when clicking outside
  $(document).click(function () {
    $('.subMenu').slideUp();
  });
});

/*--------------------------------- Image Modal -------------------------*/

$(document).ready(function () {
  // Thumbnail click changes main image
  $('.thumbs img').click(function () {
    let newSrc = $(this).attr('src');
    $('#mainImg').attr('src', newSrc);
    $('.thumbs img').removeClass('active');
    $(this).addClass('active');
  });

  // Click main image to open modal with display:flex
  $('#mainImg').click(function () {
    let src = $(this).attr('src');
    $('#modalImg').attr('src', src);
    $('#imgModal').css('display', 'flex').hide().fadeIn();
  });

  // Close modal
  $('.close, #imgModal').click(function (e) {
    if (e.target !== $('#modalImg')[0]) {
      $('#imgModal').fadeOut(function () {
        $(this).css('display', 'none');
      });
    }
  });
});

/*--------------------------------- Quantity Counter -------------------------*/

$(document).ready(function () {
  $(".plus").click(function () {
    let input = $(this).siblings(".quantity-input");
    input.val(parseInt(input.val()) + 1);
  });

  $(".minus").click(function () {
    let input = $(this).siblings(".quantity-input");
    let value = parseInt(input.val());
    if (value > 1) {
      input.val(value - 1);
    }
  });
});

