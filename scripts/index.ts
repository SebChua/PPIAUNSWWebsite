import InstaGallery = require('./InstaGallery');

$(document).ready(() => {
    new Navbar().addToContainer($('body'));
    new InstaGallery(9).addToContainer($('#insta-container'));
    new BootstrapCarousel([
        '../assets/sliderimg/slide1.jpg', 
        '../assets/sliderimg/slide2.jpg',
        '../assets/sliderimg/slide3.jpg',
        '../assets/sliderimg/slide4.jpg'
    ]).addToContainer($('#welcome-gallery'));
    new Footer().addToContainer($('footer'));
});

// Scroll Effects on Header Navigation
$(window).scroll(() => {
    let distanceFromTop = $(window).height() - 600;
    if ($(this).scrollTop() > distanceFromTop - $('nav').height()) {
        $('nav').css('background-color', 'rgba(0, 0, 0, 0.8)');
    } else {
        $('nav').css('background-color', 'rgba(0, 0, 0, 0.0)');
    }
});

// function updateSliderImage() {
//     let img_ctr = 0;

//     setInterval(() => {
//         img_ctr = (img_ctr % 4) + 1;
//         let img_url = '../assets/sliderimg/slide' + img_ctr + '.jpg';
        
//         $('#slider-img').addClass('animated fadeOut slow')
//         $("#slider-img").attr("src", img_url);
//         $('#slider-img').removeClass('animated fadeOut slow')
//         $('#slider-img').addClass('animated fadeIn slow')
//         console.log('hello world');
//     }, 5000);
// }



class BootstrapCarousel {
    private _imgUrls: string[];
    
    constructor(imgUrls: string[]) {
        this._imgUrls = imgUrls;
    }

    addToContainer(container: JQuery) {
        let carousel_container = $('<div>').attr({
            'id': 'img-gallery',
            'data-ride': 'carousel'
        }).addClass('carousel slide carousel-fade');
        let carousel_content = $('<div>').addClass('carousel-inner').appendTo(carousel_container);

        for (let i = 0; i < this._imgUrls.length; i++) {
            let imgDiv = $('<div>').addClass('carousel-item');
            if (i == 0) {
                imgDiv.addClass('active');
            }

            $('<img>').attr({
                'src': this._imgUrls[i],
                'alt': 'Image ' + (i + 1)
            }).addClass('d-block w-100').appendTo(imgDiv);

            carousel_content.append(imgDiv);
        }
        container.append(carousel_container);
    }
}

class Navbar {
    private _navbar: JQuery;

    constructor() {
        this._navbar = $('<nav>').addClass('navbar fixed-top navbar-expand-xl navbar-dark');
        this._navbar.append(
            '<a class="navbar-brand" href="#"><img id="logo" alt="Brand" src="../assets/logowhite.png"></a>\
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive">\
              <span class="navbar-toggler-icon"></span>\
            </button>\
          \
            <div class="collapse navbar-collapse" id="navbarResponsive">\
              <ul class="navbar-nav ml-auto">\
                <li class="nav-item active">\
                  <a class="nav-link" href="#">HOME <span class="sr-only">(current)</span></a>\
                </li>\
      \
                <li class="nav-item">\
                  <a class="nav-link" href="#">ABOUT US</a>\
                </li>\
      \
                <li class="nav-item">\
                  <a class="nav-link" href="#">MEMBERS BENEFITS</a>\
                </li>\
      \
                <li class="nav-item">\
                  <a class="nav-link" href="#">CAREERS</a>\
                </li>\
      \
                <li class="nav-item">\
                  <a class="nav-link" href="#">NEWSLETTER</a>\
                </li>\
      \
                <li class="nav-item">\
                  <a class="nav-link" href="#">ICON</a>\
                </li>\
      \
                <li class="nav-item">\
                  <a class="nav-link" href="#">CONTACT US</a>\
                </li>\
              </ul>\
            </div>'
        )
    }

    addToContainer(container: JQuery) {
        container.prepend(this._navbar);
    }
}

class Footer {
    private _footer: JQuery;

    constructor() {
        this._footer = $('<div>').attr('id', 'footer-row').addClass('row');

        let branding = $('<div>').attr('id', 'footer-branding').addClass('col-lg-3');
        branding.append(
            '<img id="footer-logo" class="img-fluid" alt="Brand" src="../assets/logo_red.png">\
            <h2>PPIA <span style="color: #CA242B;">UNSW</span></h2>\
            <p>UNSW Sydney,<br>Kensington, NSW<br>2052</p>\
            <p style="font-size: 9px;"><i class="fas fa-copyright"></i> 2019 PPIA UNSW. All Rights Reserved.</p>'
        );

        let nav = $('<div>').attr('id', 'footer-nav').addClass('col-lg-3');
        nav.append(
            '<ul>\
                <li><a class="nav-link active" href="#">Home</a></li>\
                <li><a class="nav-link" href="#">About Us</a></li>\
                <li><a class="nav-link" href="#">Members Benefits</a></li>\
                <li><a class="nav-link" href="#">Careers</a></li>\
                <li><a class="nav-link" href="#">Newsletter</a></li>\
                <li><a class="nav-link" href="#">ICON</a></li>\
                <li><a class="nav-link" href="#">Contact Us</a></li>\
            </ul>'
        );

        let contact = $('<div>').attr('id', 'footer-contact').addClass('col-lg-6')
        contact.append(
            '<div id="partner-logos">\
                <img src="../assets/garuda.png" class="img-fluid" alt="KJRI Logo">\
                <img src="../assets/unsw.png" class="img-fluid" alt="UNSW Logo">\
                <img src="../assets/arc.jpg" class="img-fluid" alt="Arc Logo" style="height: 60px;">\
                <img src="../assets/ppia-nsw-new.png" class="img-fluid" alt="PPIA NSW Logo">\
                <img src="../assets/ppia-logo.png" class="img-fluid" alt="PPIA Logo">\
            </div>\
            <div id="quick-links">\
                <a href="mailto:unsw.ppia@gmail.com" class="fas fa-envelope"></a>\
                <a href="https://www.facebook.com/groups/ppia.unsw/" class="fab fa-facebook-f"></a>\
                <a href="https://www.instagram.com/ppiaunsw/" class="fab fa-instagram"></a>\
                <a href="https://www.youtube.com/user/ppiaunsw" class="fab fa-youtube"></a>\
            </div>'
        );

        this._footer.append(branding, nav, contact);
    }
    
    addToContainer(container: JQuery) {
        container.append(this._footer);
    }
}