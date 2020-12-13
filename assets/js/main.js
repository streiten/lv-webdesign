$(document).ready(function ($) {
    console.log('ready...');

    var controller = new ScrollMagic.Controller();

    // section video
    new ScrollMagic.Scene({
        triggerElement: ".section--video",
        duration: '500px'
    })
        .on("enter", function (event) {
            $('.video--scanimate')[0].play();
            $('.section--video').addClass('triggered');
        })
        .on("leave", function (event) {
            $('.video--scanimate')[0].pause();
        })
        .on("progress", function (event) {
            // bind rotation from -10 to +10 degress
            var val =  (event.progress * 20 ) - 10 + 'deg';
            document.documentElement.style.setProperty('--video-rotation',val);
        })
        .addIndicators()
        .addTo(controller);

    // section p5
    var p5Animation = new p5(p5sketch, window.document.querySelector('.embed-container--p5'));
    new ScrollMagic.Scene({
        triggerElement: ".section--p5",
        duration: '500px'
    })
        .on("enter", function (event) {
            p5Animation.playing = true;
        })
        .on("leave", function (event) {
            p5Animation.playing = false;
        })
        .on("progress", function (event) {
            // do something with p5Animation.progress = event.progress ?
        })
        .setClassToggle(".section--p5", "active") // toggle active class on enter and leaveing the scene
        .addIndicators()
        .addTo(controller);

    // section lottie
    var lottieAnimation = lottie.loadAnimation({
        container: document.querySelector('.embed-container--lottie'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: './assets/media/40367-cirlce-loading-2.json'
    });

    lottieAnimation.addEventListener('data_ready', function () {
        console.log('lottie loaded...');
        var lottiePlayHead = 0; // Frame
        var lottieDuration = lottieAnimation.getDuration(true);
        var lottieFrameOffset = 0;
        var increment = 0;

        new ScrollMagic.Scene({
            triggerElement: ".section--lottie",
            duration: $('.section--lottie').outerHeight()
        })
            .on("enter", function (event) {
                lottieAnimation.pause();
                increment = 0;
                // get where we are in the animation
                lottieFrameOffset = lottieAnimation.currentFrame;
            })
            .on("leave", function (event) {
                lottieAnimation.play();
            })
            .on("progress", function (event) {
                // the only way is up: regardless of scrolldirection, always advance playhead.
                // for binding playback direction to scrolldirection use something like event.progress * lottieDuration instead.
                increment++;

                // wrap things around animation length 
                // to make sure to always have existing frame values 
                lottiePlayHead = (lottieFrameOffset + increment) % lottieDuration;
                lottieAnimation.goToAndStop(lottiePlayHead, true);
            })
            .addIndicators() // add indicators (requires plugin)
            .addTo(controller);
    });

    // section anime
    // no scroll interaction so far, just an anime timeline for some svg items
    var animeAnimation = anime.timeline({
        easing: 'easeOutExpo',
        duration: 1000,
        loop: true,
        autoplay: true,
        direction: 'alternate'
    });

    animeAnimation
        .add({
            targets: 'svg #Rectangle',
            translateX: 50,
            translateY: -25,
        })
        .add({
            targets: 'svg #Circle',
            translateX: -50,
            translateY: 20
        })
        .add({
            targets: 'svg #Triangle',
            translateX: -50,
            translateY: -20
        });

    // section draw
    var svgPath = document.querySelector('.embed-container--anime2 svg path')
    var animeAnimation2 = anime({
        targets: svgPath,
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutSine',
        duration: 1500,
        autoplay: false
      });

    new ScrollMagic.Scene({
        triggerElement: ".section--drawing",
        duration: '500px'
    })
    .setAnime(animeAnimation2)
    .addIndicators()
    .addTo(controller);

    // section parallax background
    var animation3 = anime({
        targets: '.section--parallax',
        backgroundPosition: ['0% 0%', '0% 100%'],
        duration: 3000,
        easing: 'linear',
      });

    new ScrollMagic.Scene({
        triggerElement: ".section--parallax",
        duration: '500px'
    })
    .setAnime(animation3)
    .addIndicators() 
    .addTo(controller);

});


