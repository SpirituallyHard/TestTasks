ymaps.ready(init);
var myMap;
var div = document.createElement('div');
document.body.append(div);
function init () {
    myMap = new ymaps.Map("map", {
        center: [54.1931, 37.6172], // Тула
        zoom: 11
    }, {
        balloonMaxWidth: 200,
        searchControlProvider: 'yandex#search'
    });
    var myPlacemark = false;
    // Слушаем клик на карте.
    myMap.events.add('click', function (e) {
        var coords = e.get('coords');

        // Если метка уже создана – просто передвигаем ее.
        if (myPlacemark) {
            myPlacemark.geometry.setCoordinates(coords);
        }
        // Если нет – создаем.
        else {
            myPlacemark = createPlacemark(coords);
            myMap.geoObjects.add(myPlacemark);
            // Слушаем событие окончания перетаскивания на метке.
            myPlacemark.events.add('dragend', function () {
                getAddress(myPlacemark.geometry.getCoordinates());
            });
        }
        getAddress(coords);
    });

    // Создание метки.
    function createPlacemark(coords) {
        return new ymaps.Placemark(coords, {
            iconCaption: 'поиск...'
        }, {
            preset: 'islands#violetDotIconWithCaption',
            draggable: true
        });
    }

    // Определяем адрес по координатам (обратное геокодирование).
    function getAddress(coords) {
        myPlacemark.properties.set('iconCaption', 'поиск...');
        ymaps.geocode(coords).then(function (res) {
            var firstGeoObject = res.geoObjects.get(0);

            myPlacemark.properties
                .set({
                    // Формируем строку с данными об объекте.
                    iconCaption: [
                        // Название населенного пункта или вышестоящее административно-территориальное образование.
                        firstGeoObject.getLocalities().length ? firstGeoObject.getLocalities() : firstGeoObject.getAdministrativeAreas(),
                        // Получаем путь до топонима, если метод вернул null, запрашиваем наименование здания.
                        firstGeoObject.getThoroughfare() || firstGeoObject.getPremise()
                    ].filter(Boolean).join(', '),
                    // В качестве контента балуна задаем строку с адресом объекта.
                    balloonContent:'<p>Координаты точки доставки: ' + [
                        coords[0].toPrecision(6),
                        coords[1].toPrecision(6)
                    ].join(', ') + '</p>',
                        balloonContentFooter:'<sup>Щелкните еще раз</sup>'
                });
        });
    }
    // Обработка события, возникающего при щелчке
    // правой кнопки мыши в любой точке карты.
    // При возникновении такого события покажем всплывающую подсказку
    // в точке щелчка.
    myMap.events.add('contextmenu', function (e) {
        myMap.hint.open(e.get('coords'), 'Кто-то щелкнул правой кнопкой');
    });
    // Скрываем хинт при открытии балуна.
    myMap.events.add('balloonopen', function (e) {
        myMap.hint.close();
    });
    const formElement = document.getElementById('Checkout');
    formElement.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(formElement);
        const FIO = formData.get('FIO');
        const Telephone = formData.get('Telephone');
        console.log(FIO);
        if (!FIO){
            div.style.color = "red";
            div.style.position = "relative";
            div.style.left = "28%";
            div.style.transform = "translate(-50%, 0);";
            div.innerHTML = "Не заполнено поле ФИО";
        }
        if (!Telephone){
            div.style.color = "red";
            div.style.position = "relative";
            div.style.left = "28%";
            div.style.transform = "translate(-50%, 0);";
            div.innerHTML = "Не указан номер телефона";
        }
        if (!myPlacemark) {
            div.style.color = "red";
            div.style.position = "relative";
            div.style.left = "26%";
            div.style.transform = "translate(-50%, 0);";
            div.innerHTML = "Не отмечен адрес доставки";
        }
        if (myPlacemark && Telephone && FIO)
        {
            div.style.color = "black";
            div.style.position = "relative";
            div.style.left = "35.5%";
            div.style.transform = "translate(-50%, 0);";
            div.innerHTML = "Заказ оформлен!";
        }
    })
}
