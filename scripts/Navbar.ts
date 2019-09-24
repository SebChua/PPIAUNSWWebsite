/**
 * Navbar.ts
 *  - Injects Navbar HTML
 *  - Styling should be edited in navbar.css
 */
class Navbar {
    private _navbar: JQuery;
    private _logoUrl: string;
    private _activeIndex: number;

    private _links: Link[] = [
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


    constructor(logoUrl: string, activeIndex: number, fixed_top: boolean, dark: boolean) {
        this._logoUrl = logoUrl;
        this._activeIndex = activeIndex;
        this._navbar = $('<nav>').addClass('navbar navbar-expand-xl');

        if (fixed_top){
            this._navbar.addClass('fixed-top');
            this._attachScrollEffect();
        };
        (dark) ? this._navbar.addClass('navbar-dark') : this._navbar.addClass('navbar-light');

        let brand = $('<a>').addClass('navbar-brand');
        $('<img>').attr({
            'id': 'logo',
            'alt': 'Brand',
            'src': this._logoUrl
        }).appendTo(brand);

        let toggleBtn = $('<button>').addClass('navbar-toggler').attr({
            'type': 'button',
            'data-toggle': 'collapse',
            'data-target': '#navbarResponsive'
        });
        $('<span>').addClass('navbar-toggler-icon').appendTo(toggleBtn);

        let list_container = $('<div>').attr('id', 'navbarResponsive').addClass('collapse navbar-collapse');
        list_container.append(this._buildNavList());

        this._navbar.append(brand, toggleBtn, list_container);
    }

    private _buildNavList(): JQuery {
        let container = $('<ul>').addClass('navbar-nav ml-auto');

        for (let i = 0; i < this._links.length; i++) {
            let link = $('<li>').addClass('nav-item');
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
    }

    // Attaches scroll event listener and darkens header beyond a certain scroll position
    private _attachScrollEffect() {
        $(window).scroll(() => {
            let distanceFromTop = $(window).height() - 600;
            if ($(window).scrollTop() > distanceFromTop - this._navbar.height()) {
                this._navbar.css('background-color', 'rgba(0, 0, 0, 0.8)');
            } else {
                this._navbar.css('background-color', 'rgba(0, 0, 0, 0.0)');
            }
        });
    }

    addToContainer(container: JQuery) {
        container.prepend(this._navbar);
    }
}

interface Link {
    title: string;
    url: string;
}

export = Navbar;