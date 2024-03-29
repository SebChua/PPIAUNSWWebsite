class InstaGallery {
    private _prevButton: JQuery;
    private _nextButton: JQuery;
    private _galleryContainer: JQuery;

    private _imagesLoaded: InstaPost[];
    private _apiUrl: string;
    private _nextUrl: string;
    private _postsToLoad: number;
    private _displayFrom: number;
    private _displayQty: number;
    
    constructor(postsToDisplay: number) {
        let config = {
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

    private _attachEventListeners() {
        this._prevButton.on('click', () => {
            this._displayFrom = (this._displayFrom - this._displayQty < 0) ? 
                                    0 : 
                                    this._displayFrom - this._displayQty;
            this._galleryContainer.empty();
            this.displayPhotos(this._displayFrom);
        });
    
        this._nextButton.on('click', () => {
            this._displayFrom += this._displayQty;
            this._galleryContainer.empty();
            this.displayPhotos(this._displayFrom);
        });
    }

    private _getPhotos() {
        let request_url = this._nextUrl ? this._nextUrl : this._apiUrl;


    
        return fetch(request_url).then(response => {
            return response.json();
        }).then((responseJSON => {
            // Got a Successful Response
            for (let data of responseJSON.data) {
                this._imagesLoaded.push({
                    img_url: data.images.standard_resolution.url,
                    insta_url: data.link
                });
            }
            this._nextUrl = responseJSON.pagination.nextUrl;
        })).catch(err => {
            // Error Retrieving Response
            $('<p>').text(JSON.stringify(err)).appendTo(this._galleryContainer);
        });
    }

    addToContainer(container: JQuery) {
        container.append(this._prevButton, this._nextButton, this._galleryContainer);
        this.displayPhotos(0);
    }

    private _buildPostElem(post: InstaPost): JQuery {
        let post_elem = $('<a>').attr('href', post.insta_url).attr('target', '_blank');
        $('<img>').attr('src', post.img_url).addClass('insta-post animated fadeIn').appendTo(post_elem);
        return post_elem;
    }

    // Pre-condition: startIndex >= 0
    displayPhotos(startIndex: number) {
        // Only request for more photos when we need them
        if (startIndex + this._displayQty > this._imagesLoaded.length) {
            this._getPhotos()
            .then(() => {
                for (let i = startIndex; i < Math.min(this._imagesLoaded.length, startIndex + this._displayQty); i++) {
                    this._buildPostElem(this._imagesLoaded[i]).appendTo(this._galleryContainer);
                }
            });
        } else {
            for (let i = startIndex; i < startIndex + this._displayQty; i++) {
                this._buildPostElem(this._imagesLoaded[i]).appendTo(this._galleryContainer);
            }
        }
    }
}

interface InstaPost {
    img_url: string;
    insta_url: string;
}

export = InstaGallery;