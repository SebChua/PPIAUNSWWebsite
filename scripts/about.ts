let team = {
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

$(document).ready(() => {
    new Navbar().addToContainer($('body'));
    
    new MeetTheTeam(team).addToContainer($('#team'));

    new Footer().addToContainer($('footer'));
});

class MeetTheTeam {
    private _team: Team;
    private _container: JQuery;
    
    constructor(team: Team) {
        this._team = team;
        this._container = $('<div>').attr('id', 'meet-the-team');

        $('<h1>').text('Meet The Team').appendTo(this._container);
    }

    addToContainer(container: JQuery) {
        let divisions = Object.keys(this._team);

        for (let division of divisions) {
            let division_container = $('<div>').addClass('division row').appendTo(this._container);
            let division_name = $('<div>').addClass('division-name col-md-3');
            $('<h2>').text(division).appendTo(division_name);

            let division_team = $('<div>').addClass('division-team d-flex flex-wrap col-md');

            for (let committee of this._team[division]) {
                this._buildProfile(committee).appendTo(division_team);
            }

            division_container.append(division_name, division_team);
            this._container.append(division_container);
        }

        container.append(this._container);
    }

    private _buildProfile(committee: Committee): JQuery {
        let profile = $('<div>').addClass('profile');
        $('<div>').css({
            'height': '180px',
            'width': '180px',
            'background-color': 'gray',
            'border-radius': '5px 5px 0 0'
        }).appendTo(profile);
        $('<h3>').text(committee.firstName + ' ' + committee.lastName).appendTo(profile);
        $('<h4>').text(committee.role).appendTo(profile);

        return profile
    }
}

interface Team {
    [key: string]: Committee[];
}

interface Committee {
    firstName: string;
    lastName: string;
    role: string;
}

class Navbar {
    private _navbar: JQuery;

    constructor() {
        this._navbar = $('<nav>').addClass('navbar navbar-expand-xl navbar-light');
        this._navbar.append(
            '<a class="navbar-brand" href="#"><img id="logo" alt="Brand" src="../assets/logo.png"></a>\
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