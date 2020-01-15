import { NgxUiLoaderConfig } from 'ngx-ui-loader';

var colors: any = ["#fa7c30", "#fdcd3b", "#53e3a6", "#28c3d4"]

let randomColor = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var ngxUiLoaderConfig: NgxUiLoaderConfig = {

    // "bgsColor": colors[randomColor(0, colors.length - 1)],
    "bgsColor": "#007bff",
    "bgsOpacity": 0.9,
    "bgsPosition": "center-center",
    "bgsSize": 100,
    "bgsType": "three-bounce",
    "blur": 15,
    "fgsColor": "#fff",
    "fgsPosition": "center-center",
    "fgsSize": 100,
    "fgsType": "fading-circle",
    "gap": 24,
    "logoPosition": "center-center",
    "logoSize": 120,
    // "overlayColor": colors[randomColor(0, colors.length)],
    "overlayColor": "#007bff",
    "pbColor": "#fff",
    "pbDirection": "ltr",
    "pbThickness": 5,
    "hasProgressBar": false,
    "text": "Please Hold on...",
    "textColor": "#ffffff",
    "textPosition": "center-center"
}

export { ngxUiLoaderConfig, randomColor }