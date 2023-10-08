
        /*
        Задание 1:
        Используя функцию downloadImage и создав необходимые функции обратного вызова, реализуйте скачивание изображения
        по пути https://images-assets.nasa.gov/image/PIA16239/PIA16239~orig.jpg 
        при нажатии на кнопку Скачать, и вывод скаченного изображения в элемент #output
        */
    
        function downloadImage(url, success, error) {
            let image = new Image(500);
            image.src = url;

            image.onload = function () {
                // Запускаем callback функцию success в случае успешной загрузки изображения
                if (success && typeof success == "function")
                    success(image);
            };

            image.onerror = function (e) {
                // Запускаем callback функцию error в случае успешной загрузки изображения
                if (error && typeof error == "function")
                    error(new Error("Не удалось загрузить изображение: " + this.src));
            }
        }

        let output = document.querySelector('#output');
        function onSuccess(image){
            output.append(image);
        };

        function onError(message){
            alert(message);
        };

        document.querySelector('button').addEventListener('click', function(){
            let imageUrl = 'https://images-assets.nasa.gov/image/PIA16239/PIA16239~orig.jp';
            downloadImage(imageUrl, onSuccess, onError);
        })
