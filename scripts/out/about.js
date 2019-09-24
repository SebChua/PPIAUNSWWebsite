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
define("about", ["require", "exports", "Navbar", "Footer"], function (require, exports, Navbar, Footer) {
    "use strict";
    exports.__esModule = true;
    var team = {
        "Executive": [
            {
                "firstName": "Carina",
                "lastName": "Sulianto",
                "role": "President"
            },
            {
                "firstName": "Cornelius",
                "lastName": "Eldwinata",
                "role": "Vice-President"
            },
            {
                "firstName": "Meta",
                "lastName": "Agustina",
                "role": "Treasurer"
            },
            {
                "firstName": "Vienetta",
                "lastName": "Christina",
                "role": "Secretary & Arc Delegate"
            }
        ],
        "Events": [
            {
                "firstName": "Felicia",
                "lastName": "Cindyagatha",
                "role": "Director"
            },
            {
                "firstName": "Shannen",
                "lastName": "Anabella",
                "role": "Committee"
            },
            {
                "firstName": "Febian",
                "lastName": "Mario",
                "role": "Committee"
            },
            {
                "firstName": "Viola",
                "lastName": "Sutandi",
                "role": "Committee"
            },
            {
                "firstName": "Lionel",
                "lastName": "Lie",
                "role": "Committee"
            },
            {
                "firstName": "Amelie",
                "lastName": "Christabella",
                "role": "Committee"
            },
            {
                "firstName": "Natasha",
                "lastName": "Michaela",
                "role": "Committee"
            }
        ],
        "Education": [
            {
                "firstName": "Kaori",
                "lastName": "Hartanto",
                "role": "Director"
            },
            {
                "firstName": "Caroline",
                "lastName": "Leonita",
                "role": "Committee"
            },
            {
                "firstName": "Niko",
                "lastName": "Santoso",
                "role": "Committee"
            },
            {
                "firstName": "Livia",
                "lastName": "Wijayanti",
                "role": "Committee"
            },
            {
                "firstName": "Shania",
                "lastName": "Negara",
                "role": "Committee"
            }
        ],
        "Design & Marketing": [
            {
                "firstName": "Shannen",
                "lastName": "Patricia",
                "role": "Director"
            },
            {
                "firstName": "Christopher",
                "lastName": "Wijaya",
                "role": "Committee"
            },
            {
                "firstName": "Aurelia",
                "lastName": "Josceline",
                "role": "Committee"
            },
            {
                "firstName": "Stephanie",
                "lastName": "Liunardoes",
                "role": "Committee"
            }
        ],
        "Sponsorship & Fundraising": [
            {
                "firstName": "Hanif",
                "lastName": "Nugroho",
                "role": "Director"
            },
            {
                "firstName": "Astu",
                "lastName": "Graito",
                "role": "Committee"
            },
            {
                "firstName": "Edward",
                "lastName": "Santoso",
                "role": "Committee"
            }
        ]
    };
    $(document).ready(function () {
        new Navbar('../assets/logo.png', 1, false, false).addToContainer($('body'));
        new MeetTheTeam(team).addToContainer($('#team'));
        new Footer().addToContainer($('footer'));
    });
    var MeetTheTeam = /** @class */ (function () {
        function MeetTheTeam(team) {
            this._team = team;
            this._container = $('<div>').attr('id', 'meet-the-team');
            $('<h1>').text('Meet The Team').appendTo(this._container);
        }
        MeetTheTeam.prototype.addToContainer = function (container) {
            var divisions = Object.keys(this._team);
            for (var _i = 0, divisions_1 = divisions; _i < divisions_1.length; _i++) {
                var division = divisions_1[_i];
                var division_container = $('<div>').addClass('division row').appendTo(this._container);
                var division_name = $('<div>').addClass('division-name col-md-3');
                $('<h2>').text(division).appendTo(division_name);
                var division_team = $('<div>').addClass('division-team d-flex flex-wrap col-md');
                for (var _a = 0, _b = this._team[division]; _a < _b.length; _a++) {
                    var committee = _b[_a];
                    this._buildProfile(committee).appendTo(division_team);
                }
                division_container.append(division_name, division_team);
                this._container.append(division_container);
            }
            container.append(this._container);
        };
        MeetTheTeam.prototype._buildProfile = function (committee) {
            var profile = $('<div>').addClass('profile');
            $('<div>').css({
                'height': '180px',
                'width': '180px',
                'background-color': 'gray',
                'border-radius': '5px 5px 0 0'
            }).appendTo(profile);
            $('<h3>').text(committee.firstName + ' ' + committee.lastName).appendTo(profile);
            $('<h4>').text(committee.role).appendTo(profile);
            return profile;
        };
        return MeetTheTeam;
    }());
});
