import Navbar = require('./Navbar');
import Footer = require('./Footer');

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
    new Navbar('../assets/logo.png', 1, false, false).addToContainer($('body'));
    
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