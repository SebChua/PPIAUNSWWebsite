$(document).ready(function () {
    console.log('Hello world');
    // updateSliderImage();
});
function updateSliderImage() {
    var img_ctr = 0;
    setInterval(function () {
        img_ctr = (img_ctr % 4) + 1;
        var img_url = '../assets/sliderimg/slide' + img_ctr + '.jpg';
        $('#slider-img').addClass('animated fadeOut slow');
        $("#slider-img").attr("src", img_url);
        $('#slider-img').removeClass('animated fadeOut slow');
        $('#slider-img').addClass('animated fadeIn slow');
        console.log('hello world');
    }, 5000);
}
