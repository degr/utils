Loader.objects['uncommon/color.triangle.js'] = {
    propName: null,
    input: null,
    output: null,
    strategies: ['equal_triangle', 'long_trinagle', 'square', 'quad'],
    createGui: function(){
        var name = 'uncommon/color.triangle.js';

        var output = Forms.createElement('textarea', {label: 'Your output is here:'});
        var propName = Forms.createElement('input', {label: 'Insert property container name here:'});

        var submit = Forms.createElement('submit', {attr: {value: 'Press to process'}});
/*
        this.input = input.get('textarea');
        this.output = output.get('textarea');
        this.propName = propName.get('input');*/

        return newElement('form', {onsubmit: "Loader.objects['"+name+"'].onsubmit(); return false;"}, [/*input, */propName, submit, output]);
    },
    onsubmit: function(){
        var strategy = this.strategies[Math.floor(Math.random() * this.strategies.length)];
        console.log(strategy);
    }
};