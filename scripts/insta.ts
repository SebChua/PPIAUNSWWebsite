$(document).ready(() => {
    let count = 9;
    let display_from = 0;
    let insta = new InstaGallery(count);
    
    insta.displayPhotos(display_from);

    $('#prev-btn').on('click', () => {
        display_from = (display_from - count < 0) ? 0 : display_from - count
        $('#content-section').empty();
        insta.displayPhotos(display_from);
    });

    $('#next-btn').on('click', () => {
        display_from += count;
        $('#content-section').empty();
        insta.displayPhotos(display_from);
    });
});

// Class Representing the Gallery Displaying Insta Posts
class InstaGallery {
    private _images_loaded: string[];
    private _api_url: string;
    private _next_url: string;
    private _count: number;
    
    constructor(count: number) {
        let config = {
            client_id: '71f50f8d337443099d335a66e4ba8265',
            client_secret: '5e5336a144e446aa8bcae5105b73f99d',
            redirect_uri: 'http://ppia-unsw.org/',
            response_type: 'code',
            access_token: '1161706668.71f50f8.4acfb1cd60eb47ccbfadcf26c34f0e84'
        };

        this._images_loaded = [];
        this._api_url = 'https://api.instagram.com/v1/users/self/media/recent/?access_token=' + config.access_token + '&=count=' + count;
        this._next_url = undefined;
        this._count = count;
    }

    private _getPhotos() {
        let request_url = this._next_url ? this._next_url : this._api_url;
    
        return fetch(request_url).then(response => {
            return response.json();
        }).then((responseJSON => {
            // Got a Successful Response
            for (let data of responseJSON.data) {
                this._images_loaded.push(data.images.standard_resolution.url);
            }
            this._next_url = responseJSON.pagination.next_url;
        })).catch(err => {
            // Error Retrieving Response
            $('<p>').text(JSON.stringify(err)).appendTo($('#content-section'));
        });
    }

    // Pre-condition: startIndex >= 0
    displayPhotos(startIndex: number) {
        // Only request for more photos when we need them
        if (startIndex + this._count > this._images_loaded.length) {
            this._getPhotos()
            .then(() => {
                for (let i = startIndex; i < Math.min(this._images_loaded.length, startIndex + this._count); i++) {
                    $('<img>').attr('src', this._images_loaded[i]).attr('style', 'max-width: 200px;').appendTo($('#content-section'));
                    $('<br>').appendTo($('body'));
                }
            });
        } else {
            for (let i = startIndex; i < startIndex + this._count; i++) {
                $('<img>').attr('src', this._images_loaded[i]).attr('style', 'max-width: 200px;').appendTo($('#content-section'));
                $('<br>').appendTo($('body'));
            }
        }
    }
}