$(document).ready(function() {
    
    smoothScroll();
    console.log("smoothScroll called!");
    
    
    /* Use scrollspy to highlight links as the user scrolls down the page
     * NOTE: set the body element positioning to relative */
    $('body').scrollspy({ target: '#navbarText'});
    
    
    /*
     * Disable form submission if there are invalid fields
     */
    $(".needs-validation").submit        (function(event) {
        var form = $(".needs-validation");
        
        if (form[0].checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        form.addClass('was-validated');
    });
    
});

/*function smoothScroll() {
    console.log("smoothScroll called!");
    $('a[href*=\\#]').each(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
                && location.hostname == this.hostname
                && this.hash.replace(/#/, '')) {
            var $targetId = $(this.hash), $targetAnchor = $('[name=' + this.hash.slice(1) + ']');
            var $target = $targetId.length ? $targetId : $targetAnchor.length ? $targetAnchor : false;
            if ($target) {
                var $targetOffset = $target.offset().top;
                console.log($targetOffset);
                $(this).click(function () {
                    $("nav li a").removeClass("active");
                    $(this).addClass('active');
                    $('html, body').animate({scrollTop: $targetOffset}, 1000);
                    return false;
                });
            }
        }
    });
} */

function smoothScroll() {

    $('a[href*=#]:not([href=#])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            console.log(target.offset().top);
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });
}

$("#get-directions").on('click', function () {
    smoothScroll();
});
    

$('#nav-toggle').click(function() {
  $('nav ul').toggle();
});

/**
 * Example starter JavaScript for disabling form submissions if there are invalid fields.
 * 
 */
/*(function() {
    'use strict';
    window.addEventListener('load', function() {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function(form) {
            form.addEventListener('submit', function(event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();*/




/**
 * Replace the file input label with the chosen filename.
 */
$('#coverLetter, #resume').change(function(event){
    //get the file name without the full path.
    var fileName = event.target.files[0].name;
    
    // Make sure the fileName exists
    if (fileName != undefined || fileName != "") {
    // Replace the "Choose a file..." label with the filename.
        $(this).next('.custom-file-label').html(fileName);
    }
});
