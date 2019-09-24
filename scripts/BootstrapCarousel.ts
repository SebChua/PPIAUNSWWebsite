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

export = BootstrapCarousel;