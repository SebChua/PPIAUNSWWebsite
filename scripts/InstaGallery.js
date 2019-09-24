define(["require", "exports"], function (require, exports) {
    "use strict";
    var InstaGallery = (function () {
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
                for (var _i = 0, _a = responseJSON.data; _i < _a.length; _i++) {
                    var data = _a[_i];
                    _this._imagesLoaded.push({
                        img_url: data.images.standard_resolution.url,
                        insta_url: data.link
                    });
                }
                _this._nextUrl = responseJSON.pagination.nextUrl;
            }))["catch"](function (err) {
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
        InstaGallery.prototype.displayPhotos = function (startIndex) {
            var _this = this;
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
//# sourceMappingURL=InstaGallery.js.map