# Gate

Gate — это библиотека для кросс-доменной или внутридоменной синхронизации данных между окнами и вкладками браузера.

## Описание

Бибилотека представляет собой набор методов, необходимых для организации обмена данными.

### создание объекта

В конструктор в качестве параметра передается объект с настройками:
*crossDomain - тип синхронизации. Если true, то обмен кросс-доменный, иначе внутридоменный;
*serviceFile - указываем путь к файлу frame.html, который лежит в корневой папке домена-приемника.
*keyLocalStorage - наименование ключа для хранения данных в local storage по ключу.

demo/application.js

```javascript
var gate = new Gate({
  crossDomain: false,
  serviceFile: 'http://domen2/frame.html',
  keyLocalStorage: 'storageKey',
});
```

### postMessage()

Функция postMessage отправляет данные получателю. В параметр функции передаются данные в виде объекта.

demo/application.js

```javascript
gate.postMessage({color: 'red'});
```
