$(function() {

    // Basic editors
    // ------------------------------

    // Default initialization
    //$('.summernote').summernote();
$('.summernote').summernote({
         fontSizes: ['8', '9', '10', '11', '12', '13', '14', '15', '16', '18','19', '20','21', '22','23', '24','25','26','27', '28','30', '32','34', '36','38', '40','44', '48'],

     toolbar: [
    // [groupName, [list of button]]
    ['font', ['bold', 'italic', 'underline', 'clear']],

    ['font', ['strikethrough', 'superscript', 'subscript']],
    ['fontsize', ['fontsize']],
    ['color', ['color']],
    ['para', ['ul', 'ol', 'paragraph']],
    ['height', ['height']]
    ['style', ['style']],
    ['fontname', ['fontname']],
    ['table', ['table']],
    ['insert', ['link', 'picture', 'video']],
    ['view', ['fullscreen', 'codeview', 'help']],
  ]


});

    // Control editor height
    $('.summernote-height').summernote({
        height: 400
    });


    // Click to edit
    // ------------------------------

    // Edit
    $('#edit').on('click', function() {
        $('.click2edit').summernote({focus: true});
    })

    // Save
    $('#save').on('click', function() {
        var aHTML = $('.click2edit').summernote('code'); //save HTML If you need(aHTML: array).
        //console.log(aHTML);
        var content=$(".summernote").summernote("code");
        console.log(content);
        $('#description').val(content);
        $('.click2edit').summernote('destroy');
    })
     var content=$('#description').val();
    var content=$(".summernote").summernote("code",content);

    /***************** frontend *************************/
  var jobdetail=$('#jobdetail').summernote('code');
   $('.summernote').val(jobdetail);

});
