function maybeOpenDrawer (carousel, drawer){
  if($(drawer).is(":visible")){
  }
  else{
    $(drawer).show();
  }
  $('html,body').animate({scrollTop: $(carousel).offset().top}, "slow");
}

function closeDrawer (target){
  $(target).hide();
  $(target).find('.content').html("");
}

function loadVideoContent (target, title, url, width, height){
  target.html($('<div></div>', { class: 'embed-responsive embed-responsive-16by9' })
              .append($('<iframe></iframe>', { class: 'media-embed embed-responsive-item',
                                               src: url })
                      .attr('webkitallowfullscreen','')
                      .attr('mozallowfullscreen','')
                      .attr('allowfullscreen','')));
}

function loadImageContent (target, title, url, width, height){
  target.html($('<img />', { class: 'img-responsive', src: url, alt: title }));
}

function loadHTMLContent (target, title, url, width, height){
  target.load(url.concat(" .container-fluid"));
}

function loadButtons (target, content){
  target.empty();
  for (var i=0; i<content.length; i++){
    var button = content[i];
    target.append($('<a></a>')
                  .html(button.title)
                  .attr("href", button.url));
  }
}

$(document).ready(function(){
  $('.slick-carousel').slick(
    {
      slidesToShow: 5,
      slidesToScroll: 5,
      dots: true,
      prevArrow: "<div class='carousel-prev'><span class='glyphicon glyphicon-chevron-left carousel-prev-icon' aria-hidden='true'></span></div>",
      nextArrow: "<div class='carousel-next'><span class='glyphicon glyphicon-chevron-right carousel-next-icon' aria-hidden='true'></span></div>",
      responsive: [
        {
          breakpoint: 1300,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4
          }
        },
        {
          breakpoint: 1000,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3
          }
        },
        {
          breakpoint: 700,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    }
  );

  $(".carousel").each(
    function (event) {
      var carousel = $(this);
      var buttons  = carousel.find(".slick-carousel .thumb a");
      var drawer   = carousel.find(".drawer");
      var close    = drawer.find(".close-button");
      var target   = drawer.find('.content');
      var button_target = drawer.find('.buttons');

      buttons.each(function (){

        var button = $(this);
        var title  = button.data('title');
        var url    = button.data('url');
        var width  = button.data('width');
        var height = button.data('height');

        // This is a hack, because I couldn't figure out how to pass
        // an array via data attributes.
        var button_data = [];
        for(var i=1; i<20; i++){
          var button_title = button.data('button-' + i + '-title');
          var button_url = button.data('button-' + i + '-url');
          if( button_title && button_url ){
            button_data.push({title: button_title, url: button_url});
          }
        }

        switch (button.data('type')) {
        case "video":
          button.click(function(){
            loadVideoContent(target, title, url, width, height);
            loadButtons(button_target, button_data);
            $(drawer).css('max-width', width);
            maybeOpenDrawer(carousel, drawer);
            return false;
          });
          break;
        case "image":
          button.click(function(){
            loadImageContent(target, title, url, width, height);
            loadButtons(button_target, button_data);
            $(drawer).css('max-width', '50%');
            maybeOpenDrawer(carousel, drawer);
            return false;
          });
          break;
        case "html":
          button.click(function(){
            loadHTMLContent(target, title, url, width, height);
            loadButtons(button_target, button_data);
            $(drawer).css('max-width', '100%');
            maybeOpenDrawer(carousel, drawer);
            return false;
          });
          break;
        }
      });

      close.click(function(){
        closeDrawer(drawer);
        return false;
      });
    }
  );
});
