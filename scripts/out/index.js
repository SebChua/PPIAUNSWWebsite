define("InstaGallery", ["require", "exports"], function (require, exports) {
    "use strict";
    var InstaGallery = /** @class */ (function () {
        function InstaGallery(postsToDisplay) {
            var config = {
                client_id: '71f50f8d337443099d335a66e4ba8265',
                client_secret: '5e5336a144e446aa8bcae5105b73f99d',
                redirect_uri: 'http://ppia-unsw.org/',
                response_type: 'code',
                access_token: '1161706668.71f50f8.b022d5c8d1ee43678fcf45eb16968396'
            };
            this._prevButton = $('<button>').attr({
                'id': 'prev-btn',
                'type': 'button'
            }).append($('<i>').addClass('fas fa-chevron-left'));
            this._nextButton = $('<button>').attr({
                'id': 'next-btn',
                'type': 'button'
            }).append($('<i>').addClass('fas fa-chevron-right'));
            this._galleryContainer = $('<div>').attr('id', 'insta-gallery');
            this._imagesLoaded = [];
            this._postsToLoad = 18;
            this._apiUrl = 'https://api.instagram.com/v1/users/self/media/recent/?access_token=' + config.access_token + '&=count=' + this._postsToLoad;
            this._nextUrl = undefined;
            this._displayFrom = 0;
            this._displayQty = postsToDisplay;
            this._attachEventListeners();
        }
        InstaGallery.prototype._attachEventListeners = function () {
            var _this = this;
            this._prevButton.on('click', function () {
                _this._displayFrom = (_this._displayFrom - _this._displayQty < 0) ?
                    0 :
                    _this._displayFrom - _this._displayQty;
                _this._galleryContainer.empty();
                _this.displayPhotos(_this._displayFrom);
            });
            this._nextButton.on('click', function () {
                _this._displayFrom += _this._displayQty;
                _this._galleryContainer.empty();
                _this.displayPhotos(_this._displayFrom);
            });
        };
        InstaGallery.prototype._getPhotos = function () {
            var _this = this;
            var request_url = this._nextUrl ? this._nextUrl : this._apiUrl;
            return fetch(request_url).then(function (response) {
                return response.json();
            }).then((function (responseJSON) {
                // Got a Successful Response
                for (var _i = 0, _a = responseJSON.data; _i < _a.length; _i++) {
                    var data = _a[_i];
                    _this._imagesLoaded.push({
                        img_url: data.images.standard_resolution.url,
                        insta_url: data.link
                    });
                }
                _this._nextUrl = responseJSON.pagination.nextUrl;
            }))["catch"](function (err) {
                // Error Retrieving Response
                $('<p>').text(JSON.stringify(err)).appendTo(_this._galleryContainer);
            });
        };
        InstaGallery.prototype.addToContainer = function (container) {
            container.append(this._prevButton, this._nextButton, this._galleryContainer);
            this.displayPhotos(0);
        };
        InstaGallery.prototype._buildPostElem = function (post) {
            var post_elem = $('<a>').attr('href', post.insta_url).attr('target', '_blank');
            $('<img>').attr('src', post.img_url).addClass('insta-post animated fadeIn').appendTo(post_elem);
            return post_elem;
        };
        // Pre-condition: startIndex >= 0
        InstaGallery.prototype.displayPhotos = function (startIndex) {
            var _this = this;
            // Only request for more photos when we need them
            if (startIndex + this._displayQty > this._imagesLoaded.length) {
                this._getPhotos()
                    .then(function () {
                    for (var i = startIndex; i < Math.min(_this._imagesLoaded.length, startIndex + _this._displayQty); i++) {
                        _this._buildPostElem(_this._imagesLoaded[i]).appendTo(_this._galleryContainer);
                    }
                });
            }
            else {
                for (var i = startIndex; i < startIndex + this._displayQty; i++) {
                    this._buildPostElem(this._imagesLoaded[i]).appendTo(this._galleryContainer);
                }
            }
        };
        return InstaGallery;
    }());
    return InstaGallery;
});
define("BootstrapCarousel", ["require", "exports"], function (require, exports) {
    "use strict";
    var BootstrapCarousel = /** @class */ (function () {
        function BootstrapCarousel(imgUrls) {
            this._imgUrls = imgUrls;
        }
        BootstrapCarousel.prototype.addToContainer = function (container) {
            var carousel_container = $('<div>').attr({
                'id': 'img-gallery',
                'data-ride': 'carousel'
            }).addClass('carousel slide carousel-fade');
            var carousel_content = $('<div>').addClass('carousel-inner').appendTo(carousel_container);
            for (var i = 0; i < this._imgUrls.length; i++) {
                var imgDiv = $('<div>').addClass('carousel-item');
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
        };
        return BootstrapCarousel;
    }());
    return BootstrapCarousel;
});
define("Navbar", ["require", "exports"], function (require, exports) {
    "use strict";
    /**
     * Navbar.ts
     *  - Injects Navbar HTML
     *  - Styling should be edited in navbar.css
     */
    var Navbar = /** @class */ (function () {
        function Navbar(logoUrl, activeIndex, fixed_top, dark) {
            this._links = [
                {
                    title: 'Home',
                    url: '#'
                },
                {
                    title: 'About Us',
                    url: '#'
                },
                {
                    title: 'Member\'s Benefits',
                    url: '#'
                },
                {
                    title: 'Careers',
                    url: '#'
                },
                {
                    title: 'Newsletter',
                    url: '#'
                },
                {
                    title: 'ICON',
                    url: 'http://ppia-unsw.org/icon'
                },
                {
                    title: 'Contact Us',
                    url: '#'
                }
            ];
            this._logoUrl = logoUrl;
            this._activeIndex = activeIndex;
            this._navbar = $('<nav>').addClass('navbar navbar-expand-xl');
            if (fixed_top) {
                this._navbar.addClass('fixed-top');
                this._attachScrollEffect();
            }
            ;
            (dark) ? this._navbar.addClass('navbar-dark') : this._navbar.addClass('navbar-light');
            var brand = $('<a>').addClass('navbar-brand');
            $('<img>').attr({
                'id': 'logo',
                'alt': 'Brand',
                'src': this._logoUrl
            }).appendTo(brand);
            var toggleBtn = $('<button>').addClass('navbar-toggler').attr({
                'type': 'button',
                'data-toggle': 'collapse',
                'data-target': '#navbarResponsive'
            });
            $('<span>').addClass('navbar-toggler-icon').appendTo(toggleBtn);
            var list_container = $('<div>').attr('id', 'navbarResponsive').addClass('collapse navbar-collapse');
            list_container.append(this._buildNavList());
            this._navbar.append(brand, toggleBtn, list_container);
        }
        Navbar.prototype._buildNavList = function () {
            var container = $('<ul>').addClass('navbar-nav ml-auto');
            for (var i = 0; i < this._links.length; i++) {
                var link = $('<li>').addClass('nav-item');
                if (i == this._activeIndex) {
                    link.addClass('active');
                }
                $('<a>').attr('href', this._links[i].url)
                    .text(this._links[i].title)
                    .addClass('nav-link')
                    .appendTo(link);
                link.appendTo(container);
            }
            return container;
        };
        // Attaches scroll event listener and darkens header beyond a certain scroll position
        Navbar.prototype._attachScrollEffect = function () {
            var _this = this;
            $(window).scroll(function () {
                var distanceFromTop = $(window).height() - 600;
                if ($(window).scrollTop() > distanceFromTop - _this._navbar.height()) {
                    _this._navbar.css('background-color', 'rgba(0, 0, 0, 0.8)');
                }
                else {
                    _this._navbar.css('background-color', 'rgba(0, 0, 0, 0.0)');
                }
            });
        };
        Navbar.prototype.addToContainer = function (container) {
            container.prepend(this._navbar);
        };
        return Navbar;
    }());
    return Navbar;
});
define("Footer", ["require", "exports"], function (require, exports) {
    "use strict";
    /**
     * Footer.ts
     *  - Injects Footer HTML
     *  - Styling should be edited in footer.css
     */
    var Footer = /** @class */ (function () {
        function Footer() {
            this._footer = $('<div>').attr('id', 'footer-row').addClass('row');
            var branding = $('<div>').attr('id', 'footer-branding').addClass('col-lg-3');
            branding.append('<img id="footer-logo" class="img-fluid" alt="Brand" src="../assets/logo_red.png">\
            <h2>PPIA <span style="color: #CA242B;">UNSW</span></h2>\
            <p>UNSW Sydney,<br>Kensington, NSW<br>2052</p>\
            <p style="font-size: 9px;"><i class="fas fa-copyright"></i> 2019 PPIA UNSW. All Rights Reserved.</p>');
            var nav = $('<div>').attr('id', 'footer-nav').addClass('col-lg-3');
            nav.append('<ul>\
                <li><a class="nav-link active" href="#">Home</a></li>\
                <li><a class="nav-link" href="#">About Us</a></li>\
                <li><a class="nav-link" href="#">Members Benefits</a></li>\
                <li><a class="nav-link" href="#">Careers</a></li>\
                <li><a class="nav-link" href="#">Newsletter</a></li>\
                <li><a class="nav-link" href="#">ICON</a></li>\
                <li><a class="nav-link" href="#">Contact Us</a></li>\
            </ul>');
            var contact = $('<div>').attr('id', 'footer-contact').addClass('col-lg-6');
            contact.append('<div id="partner-logos">\
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
            </div>');
            this._footer.append(branding, nav, contact);
        }
        Footer.prototype.addToContainer = function (container) {
            container.append(this._footer);
        };
        return Footer;
    }());
    return Footer;
});
define("index", ["require", "exports", "InstaGallery", "BootstrapCarousel", "Navbar", "Footer"], function (require, exports, InstaGallery, BootstrapCarousel, Navbar, Footer) {
    "use strict";
    exports.__esModule = true;
    $(document).ready(function () {
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
});
