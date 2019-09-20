$(document).ready(function () {
    var count = 9;
    var display_from = 0;
    var insta = new InstaGallery(count);
    insta.displayPhotos(display_from);
    $('#prev-btn').on('click', function () {
        display_from = (display_from - count < 0) ? 0 : display_from - count;
        $('#content-section').empty();
        insta.displayPhotos(display_from);
    });
    $('#next-btn').on('click', function () {
        display_from += count;
        $('#content-section').empty();
        insta.displayPhotos(display_from);
    });
});
// Class Representing the Gallery Displaying Insta Posts
var InstaGallery = /** @class */ (function () {
    function InstaGallery(count) {
        var config = {
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
    InstaGallery.prototype._getPhotos = function () {
        var _this = this;
        var request_url = this._next_url ? this._next_url : this._api_url;
        return fetch(request_url).then(function (response) {
            return response.json();
        }).then((function (responseJSON) {
            // Got a Successful Response
            for (var _i = 0, _a = responseJSON.data; _i < _a.length; _i++) {
                var data = _a[_i];
                _this._images_loaded.push(data.images.standard_resolution.url);
            }
            _this._next_url = responseJSON.pagination.next_url;
        }))["catch"](function (err) {
            // Error Retrieving Response
            $('<p>').text(JSON.stringify(err)).appendTo($('#content-section'));
        });
    };
    // Pre-condition: startIndex >= 0
    InstaGallery.prototype.displayPhotos = function (startIndex) {
        var _this = this;
        // Only request for more photos when we need them
        if (startIndex + this._count > this._images_loaded.length) {
            this._getPhotos()
                .then(function () {
                for (var i = startIndex; i < Math.min(_this._images_loaded.length, startIndex + _this._count); i++) {
                    $('<img>').attr('src', _this._images_loaded[i]).attr('style', 'max-width: 200px;').appendTo($('#content-section'));
                    $('<br>').appendTo($('body'));
                }
            });
        }
        else {
            for (var i = startIndex; i < startIndex + this._count; i++) {
                $('<img>').attr('src', this._images_loaded[i]).attr('style', 'max-width: 200px;').appendTo($('#content-section'));
                $('<br>').appendTo($('body'));
            }
        }
    };
    return InstaGallery;
}());
