/*
        Задание 1:
        Используя функцию downloadImage и создав необходимые функции обратного вызова, реализуйте скачивание изображения
        по пути https://images-assets.nasa.gov/image/PIA16239/PIA16239~orig.jpg 
        при нажатии на кнопку Скачать, и вывод скаченного изображения в элемент #output
        */

// function downloadImage(url, success, error) {
//     let image = new Image(500);
//     image.src = url;

//     image.onload = function () {
//         // Запускаем callback функцию success в случае успешной загрузки изображения
//         if (success && typeof success == "function")
//             success(image);
//     };

//     image.onerror = function (e) {
//         // Запускаем callback функцию error в случае успешной загрузки изображения
//         if (error && typeof error == "function")
//             error(new Error("Не удалось загрузить изображение: " + this.src));
//     }
// }

// let output = document.querySelector('#output');
// function onSuccess(image){
//     output.append(image);
// };

// function onError(message){
//     alert(message);
// };

// document.querySelector('button').addEventListener('click', function(){
//     let imageUrl = 'https://images-assets.nasa.gov/image/PIA16239/PIA16239~orig.jp';
//     downloadImage(imageUrl, onSuccess, onError);
// })

////////////////////////////////////////////

/*
        Задание 2:
        Внесите правки в функцию asyncOperation. Эта функция представляет абстрактную асинхронную операцию, выполнение которой
        занимает 2 секунды. Результатом асинхронной операции является случайное значение от 0 до 5000 (записывается в переменную 
        result).
        Необходимо внести правки в функцию asyncOperation и реализовать использование функций обратного вызова для того
        чтобы код, вызвавший asyncOperation, мог получить результат работы асинхронной операции. Добавьте обработчик на нажатие по
        кнопке Запустить, вызовите асинхронную операцию и используя функцию обратного вызова обработайте результат, отобразив его 
        через alert
        */

// function asyncOperation() {
//     return new Promise(function (resolve, reject) {
//         setTimeout(function () {
//             let result = Math.floor(Math.random() * 5001);
//             if (result) {
//                 resolve(result);
//             } else {
//                 reject(new Error("Error!!!"));
//             }
//         }, 2000);
//     });
// }

// document.querySelector("button").addEventListener("click", function () {
//     asyncOperation()
//     .then((result) => alert(result))
//     .catch((error) => alert(error.message));
// });

//////////////////////////////////////////

/*
        Задание 3:
        Внесите правки в функцию asyncOperation. Эта функция представляет абстрактную асинхронную операцию, выполнение которой
        занимает 2 секунды. Результатом асинхронной операции является случайное значение от 0 до 5000 (записывается в переменную 
        result).
        Необходимо внести правки в функцию asyncOperation и реализовать использование Promise для того
        чтобы код, вызвавший asyncOperation, мог получить результат работы асинхронной операции. Добавьте обработчик на нажатие по
        кнопке Запустить, вызовите асинхронную операцию и, используя Promise, обработайте результат, отобразив его 
        через alert
        */

// function asyncOperation(callback) {
//     setTimeout(function () {
//         let result = Math.floor(Math.random() * 5001);
//         if(callback) callback(result);
//     }, 2000)
// }

// document.querySelector('button').addEventListener('click', function(){
//     asyncOperation(result => alert(result));
// })

////////////////////////////////////////////////

/*
        Задание 4:
        Функция download имитирует асинхронную операцию, которая скачивает данные с сервера. На выполнение асинхронной 
        операции затрачивается до 5 секунд времени. 
        При нажатии на кнопку "Скачать" запустите метод download 5 раз и сделайте так чтобы в момент, когда все промисы перейдут
        в состояние fulfilled, выведите сообщение "Всей файлы скачаны"
        */

// let isClick = false;
// let value = 0;
// let downoloadInputElement = document.querySelector('#downloadInput');
// let downloadedDataElement = document.querySelector('#downloadedData');
// let errorDownoladElement = document.querySelector('#errorDownolad');

// function download() {
//         return new Promise(function (resolve, reject) {
//         let random = Math.floor(Math.random() * 5001);
//         setTimeout(() => resolve("downloaded data"), random);
//         });
// }

// document.querySelector('button').addEventListener('click', function(){
//         let promises = [];
//         let parallelOperationCount = 5;
//         if(value == 0){
//                 if(!isClick){
//                         downloadedDataElement.style.display = 'none'
//                         downoloadInputElement.style.display = 'block';

//                         for(let i = 0; i < parallelOperationCount; i++){
//                                 promises.push(download());
//                         }

//                         Promise.all(promises)
//                         .then(() => downloadedDataElement.style.display = 'block')
//                         .finally(() => downoloadInputElement.style.display = 'none')
//                         .finally(() => value++)
//                 }
//         } else{
//                 downloadedDataElement.style.display = 'none'
//                 errorDownoladElement.style.display = 'block';
//         }
// });

/////////////////////////////////////////////////////////

/*
        Задание 5:
        Добавьте обработку исключений для цепочки промисов, которая создается на 27 строке.
        Обрабатывая исключения, выведите информацию о нем в alert
        */

document.querySelector("button").addEventListener("click", function () {
    let url1 = "https://images-assets.nasa.gov/image/PIA16239/PIA16239~orig.jpg";
    let url2 = "https://images-assets.nasa.gov/image/PIA22312/PIA22312~orig.jpg-Ошибка";
    let url3 = "https://images-assets.nasa.gov/image/PIA04591/PIA04591~orig.jpg";

    downloadImage(url1)
        .then((image) => {
            document.body.append(image);
            return downloadImage(url2);
        })
        .then((image) => {
            document.body.append(image);
            return downloadImage(url3);
        })
        .then((image) => {
            document.body.append(image);
        })
        .catch((error) => alert(error.message))
});

function downloadImage(url) {
    let promise = new Promise(function (resolve, reject) {
        let image = new Image(500);
        image.src = url;

        image.onload = function () {
            resolve(image);
        };

        image.onerror = function (e) {
            reject(new Error("Не удалось загрузить изображение " + this.src));
        };
    });

    return promise;
}
