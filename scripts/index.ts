$(document).ready(() => {
    console.log('Hello world');
    // updateSliderImage();
});

function updateSliderImage() {
    let img_ctr = 0;

    setInterval(() => {
        img_ctr = (img_ctr % 4) + 1;
        let img_url = '../assets/sliderimg/slide' + img_ctr + '.jpg';
        
        $('#slider-img').addClass('animated fadeOut slow')
        $("#slider-img").attr("src", img_url);
        $('#slider-img').removeClass('animated fadeOut slow')
        $('#slider-img').addClass('animated fadeIn slow')
        console.log('hello world');
    }, 5000);
}