# Gate

Gate — это библиотека для кросс-доменной или внутридоменной синхронизации данных между окнами и вкладками браузера.

## Описание

Бибилотека представляет собой набор методов, необходимых для организации обмена данными.

### создание объекта

В конструктор в качестве параметра передается объект с настройками:
* crossDomain - тип синхронизации. Если true, то обмен кросс-доменный, иначе внутридоменный;
* serviceFile - для одного домена указываем путь к файлу frame.html, который лежит в корневой папке другого домена (на другом домене в serviceFile указываем значение: 'about:blank').
* keyLocalStorage - наименование ключа для хранения данных в local storage по ключу.

demo/application.js

```javascript
/**
 * Создание объекта на первом домене
 */
var gate = new Gate({
  crossDomain: true,
  serviceFile: 'http://domen2/frame.html',
  keyLocalStorage: 'storageKey',
});

/**
 * Создание объекта на втором домене
 */
var gate = new Gate({
  crossDomain: true,
  serviceFile: 'about:blank',
  keyLocalStorage: 'storageKey',
});
```

### postMessage()

Функция postMessage отправляет данные получателю. В параметр функции передаются данные в виде объекта.

demo/application.js

```javascript
gate.postMessage({color: 'red'});
```

### destroy()

Функция destroy обрывает соединение между двумя доменами. 

```javascript
gate.destroy();
```

## Зависимости

Gate требует зависимость `custom_event_target` https://github.com/Altyair/custom_event_target  ([lib](https://github.com/Altyair/custom_event_target)).
