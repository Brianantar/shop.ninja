$(function(){
    $(document).on( 'scroll', function(){
    var large = $('.largeNavbar');
    var small = $('.small');
    var container = $('#container');
    var windowWidth = window.innerWidth;
    var scrollToTop = $('.scroll-top-wrapper');

        if ($(window).scrollTop() > 200 && (windowWidth > 750)) {
            large.hide();
            small.show();
            container.css('margin-top', '262px');
            scrollToTop.addClass('show');

        } else if (windowWidth < 750){
            small.show();
            large.hide();
            // small.hide();
            // large.show();
            container.css('margin-top', '60px');
            scrollToTop.addClass('show');

        } else {
            small.hide();
            large.show();
            container.css('margin-top', '0');
             scrollToTop.removeClass('show');
        }
    });

        $('.scroll-top-wrapper').on('click', scrollToTop);

});

   function scrollToTop() {
    $('html, body').animate({scrollTop: 0}, 500, 'linear');
}

// back to top scroller 

// $(function(){
 
//     $(document).on( 'scroll', function(){
 
//         if ($(window).scrollTop() > 100) {
//             $('.scroll-top-wrapper').addClass('show');
//         } else {
//             $('.scroll-top-wrapper').removeClass('show');
//         }
//     });
 
//     $('.scroll-top-wrapper').on('click', scrollToTop);
// });

// function scrollToTop() {
//     $('html, body').animate({scrollTop: 0}, 500, 'linear');
// }

 

//search bar small
(function(window){

    // get vars
    var searchEl = document.querySelector("#input");
    var labelEl = document.querySelector("#label");

    // register clicks and toggle classes
    labelEl.addEventListener("click",function(){
        if (classie.has(searchEl,"focus")) {
            classie.remove(searchEl,"focus");
            classie.remove(labelEl,"active");
        } else {
            classie.add(searchEl,"focus");
            classie.add(labelEl,"active");
        }
    });

    // register clicks outisde search box, and toggle correct classes
    document.addEventListener("click",function(e){
        var clickedID = e.target.id;
        if (clickedID != "search-terms" && clickedID != "search-label") {
            if (classie.has(searchEl,"focus")) {
                classie.remove(searchEl,"focus");
                classie.remove(labelEl,"active");
            }
        }
    });
}(window));

//search bar large
(function(window){

    // get vars
    var searchEl = document.querySelector("#input1");
    var labelEl = document.querySelector("#label1");

    // register clicks and toggle classes
    labelEl.addEventListener("click",function(){
        if (classie.has(searchEl,"focus")) {
            classie.remove(searchEl,"focus");
            classie.remove(labelEl,"active");
        } else {
            classie.add(searchEl,"focus");
            classie.add(labelEl,"active");
        }
    });

    // register clicks outisde search box, and toggle correct classes
    document.addEventListener("click",function(e){
        var clickedID = e.target.id;
        if (clickedID != "search-terms" && clickedID != "search-label") {
            if (classie.has(searchEl,"focus")) {
                classie.remove(searchEl,"focus");
                classie.remove(labelEl,"active");
            }
        }
    });
}(window));

//hamburger menu

    $('.menu-btn').click(function(){
        $('.responsive-menu').slideToggle({duration: 400});
        $('.responsive-menu').addClass('expand');
    });

    $('#container').click(function(){
        $('.responsive-menu').removeClass('expand');
    });

//masonry
var $container = $('#container');
// initialize
$container.masonry({
  columnWidth: 20,
  gutter: 7,
  itemSelector: '.item',
  containerStyle: null
});

// var msnry = new Masonry( container, {
// });

// eventie.bind( container, 'click', function( event ) {
//   // don't proceed if item was not clicked on
//   if ( !classie.has( event.target, 'item' ) ) {
//     return;
//   }
//   // add clicked element
//   msnry.add( event.target );
//   // layout remaining item elements
//   msnry.layout();
// });

//twitter share
window.twttr=(function(d,s,id){var t,js,fjs=d.getElementsByTagName(s)[0];if(d.getElementById(id)){return}js=d.createElement(s);js.id=id;js.src="https://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);return window.twttr||(t={_e:[],ready:function(f){t._e.push(f)}})}(document,"script","twitter-wjs"));


//item expander
    $('.productimage').click(function(){
        $('.itemExpander').slideToggle({duration: 200});
        $('.itemExpander').addClass('itemExpander-inner');
        $('.itemExpander').removeClass('itemExpander-inner');
    });

    $('.og-close').click(function(){
        $('.itemExpander').slideToggle({duration: 200});
        $('.itemExpander').removeClass('itemExpander-inner');
    });

