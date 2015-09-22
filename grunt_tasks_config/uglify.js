module.exports = function () {
    return {
        options: {
            compress: true,
            report: false
        },
        engine: {
            'src': 'dist/jsfile-wcbff.js',
            'dest': 'dist/jsfile-wcbff.min.js'
        }
    };
};