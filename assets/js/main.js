/*
  Read Only by HTML5 UP
  html5up.net | @ajlkn
  Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($, d3) {

  var $window = $(window),
    $body = $('body'),
    $header = $('#header'),
    $titleBar = null,
    $nav = $('#nav'),
    $wrapper = $('#wrapper'),
    $fn = $('#animated-fn');

  // Breakpoints.
  breakpoints({
    xlarge:   [ '1281px',  '1680px' ],
    large:    [ '1025px',  '1280px' ],
    medium:   [ '737px',   '1024px' ],
    small:    [ '481px',   '736px'  ],
    xsmall:   [ null,      '480px'  ],
  });

  // Play initial animations on page load.
  $window.on('load', function() {
    window.setTimeout(function() {
      $body.removeClass('is-preload');
    }, 100);
  });

  // Tweaks/fixes.

  // Polyfill: Object fit.
  if (!browser.canUse('object-fit')) {

    $('.image[data-position]').each(function() {

      var $this = $(this),
        $img = $this.children('img');

      // Apply img as background.
        $this
          .css('background-image', 'url("' + $img.attr('src') + '")')
          .css('background-position', $this.data('position'))
          .css('background-size', 'cover')
          .css('background-repeat', 'no-repeat');

      // Hide img.
        $img
          .css('opacity', '0');

    });

  }

  // Header Panel.

  // Nav.
    var $nav_a = $nav.find('a');

    $nav_a
      .addClass('scrolly')
      .on('click', function() {

        var $this = $(this);

        // External link? Bail.
          if ($this.attr('href').charAt(0) != '#')
            return;

        // Deactivate all links.
          $nav_a.removeClass('active');

        // Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
          $this
            .addClass('active')
            .addClass('active-locked');

      })
      .each(function() {

        var $this = $(this),
          id = $this.attr('href'),
          $section = $(id);

        // No section for this link? Bail.
          if ($section.length < 1)
            return;

        // Scrollex.
          $section.scrollex({
            mode: 'middle',
            top: '5vh',
            bottom: '5vh',
            initialize: function() {

              // Deactivate section.
                $section.addClass('inactive');

            },
            enter: function() {

              // Activate section.
                $section.removeClass('inactive');

              // No locked links? Deactivate all links and activate this section's one.
                if ($nav_a.filter('.active-locked').length == 0) {

                  $nav_a.removeClass('active');
                  $this.addClass('active');

                }

              // Otherwise, if this section's link is the one that's locked, unlock it.
                else if ($this.hasClass('active-locked'))
                  $this.removeClass('active-locked');

            }
          });

      });

    // Title Bar.
    $titleBar = $(
      '<div id="titleBar">' +
        '<a href="#header" class="toggle"></a>' +
        '<span class="title">' + $('#logo').html() + '</span>' +
      '</div>'
    )
      .appendTo($body);

    // Panel.
    $header
      .panel({
        delay: 500,
        hideOnClick: true,
        hideOnSwipe: true,
        resetScroll: true,
        resetForms: true,
        side: 'right',
        target: $body,
        visibleClass: 'header-visible'
      });

  // Scrolly.
  $('.scrolly').scrolly({
    speed: 1000,
    offset: function() {

      if (breakpoints.active('<=medium'))
        return $titleBar.height();

      return 0;

    }
  });

  ;(function() {

    //The data for our line
    var lineData = [ { "x": 1,   "y": 5},  { "x": 20,  "y": 20},
                    { "x": 40,  "y": 10}, { "x": 60,  "y": 40},
                    { "x": 80,  "y": 5},  { "x": 100, "y": 60}];

    var width = $fn.width();
    var height = $fn.height();

    var x = d3.scaleLinear()
              .domain([0, 100])
              .range([0, width]);

    var y = d3.scaleLinear()
              .domain([-1, 65])
              .range([1, height]);

    var t = d3.transition()
              .duration(5000)
              .ease(d3.easeLinear);

    var randHeight = function() {
      return Math.floor(Math.random()*60) + 1;
    };

    //This is the accessor function we talked about above
    var lineFunction = d3.line()
                        .x(function(d) { return x(d.x); })
                        .y(function(d) { return y(randHeight()); })
                        .curve(d3.curveNatural);

    var svgContainer = d3.select('#animated-fn').append('svg')
                                              .attr('width', width)
                                              .attr('height', height);


    //The line SVG Path we draw
    var lineGraph = svgContainer.append("path")
                                .attr("d", lineFunction(lineData))
                                .attr("stroke", "rgb(74, 202, 168)")
                                .attr("stroke-width", 2)
                                .attr("fill", "none");

    var updateFn = function() {
      var newData = lineData.map(function(d) {
        d.y = randHeight();
        return d;
      });

      lineGraph.transition().duration(5000)
                            .attr('d', lineFunction(newData));
    }

    updateFn();
    setInterval(updateFn, 10000);
  })();

  ;(function() {
    var pictures = [
      '1.jpg',
      '2.jpg',
      '3.jpg',
      '4.jpg',
      '5.jpg',
      '6.jpg',
      '7.jpg'
    ];

    $avatar = $('.image.avatar');

    var cacheBuster = Math.floor(Math.random()*1000000);

    pictures.forEach(function(file, i) {
      var url = 'images/cats/'+file+'?version='+cacheBuster;

      $avatar.append($('<img src="'+url+'" class="avatar-hide"></img>'));
    });

    var $mainAvatar = $('.main-avatar');

    var randomAvatar = function() {
      var rand = Math.floor(Math.random() * pictures.length - 1);
      var current = $('.image.avatar img:not(.avatar-hide)')[0];
      $avatar.children().addClass('avatar-hide');
      $avatar.children().filter(function() {
        return this != current;
      }).eq(rand).removeClass('avatar-hide');

      setTimeout(function() {
        $avatar.children().addClass('avatar-hide');
        $mainAvatar.removeClass('avatar-hide');
      }, 2000);
    };

    setInterval(randomAvatar, 10000);

  })();
})(jQuery, d3);
