AFRAME.registerComponent('turn-on-click', {
    schema: {
        to: {default: "0 90 0"},
    },
    init: function () {
        data = this.data;
        element = this.el;
        this.el.addEventListener('click', function () {
            this.setAttribute('rotation', data.to);
        });
    }
});


AFRAME.registerComponent('scale-on-click', {
    schema: {
        to: {default: '2 2 2'}
          
    },
    init: function () {
        var data = this.data;
        this.el.addEventListener('click', function () {
            this.setAttribute('scale', data.to);
                
        });
          
    }

});
