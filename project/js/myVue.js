let socialMediaComponent = {
    template: '#social-media'
};

let blockNumberScrollComponent = {
    template: '#block-number-and-button-scroll'
};

let lotosLogoPhoneComponent = {
    template: '#lotos-logo-phone'
};

let mainNavComponent = {
    template: '#main-nav'
};

let social = new Vue ({
    el: '#vue-app',
    components: {
        'social-media' : socialMediaComponent,
        'block-number-and-button-scroll' : blockNumberScrollComponent,
        'lotos-logo-phone' : lotosLogoPhoneComponent,
        'main-nav' : mainNavComponent
    }
});
