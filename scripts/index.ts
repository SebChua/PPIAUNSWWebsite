import InstaGallery = require('./InstaGallery');
import BootstrapCarousel = require('./BootstrapCarousel');
import Navbar = require('./Navbar');
import Footer = require('./Footer');

$(document).ready(() => {
    new Navbar('../assets/logowhite.png', 0, true, true).addToContainer($('body'));
    new InstaGallery(9).addToContainer($('#insta-container'));
    new BootstrapCarousel([
        '../assets/sliderimg/slide1.jpg', 
        '../assets/sliderimg/slide2.jpg',
        '../assets/sliderimg/slide3.jpg',
        '../assets/sliderimg/slide4.jpg'
    ]).addToContainer($('#welcome-gallery'));
    new Footer().addToContainer($('footer'));
});
