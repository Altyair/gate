define('Gate', ['CustomEventTarget'], function (CustomEventTarget) {
   
   /**
    * Creates an instance Gate.
    *
    * @constructor
    * @extends {CustomEventTarget}
    * @this {Gate}
    * @param {Object} options Settings.
    */
   function Gate (options) {
      this.constructor.Super.call(this);
      
      /**
       * Type of exchange.
       * 
       * @private
       * @type {boolean}
       */
      this._crossDomain = options.crossDomain;
      
      /**
       * Attrubute src or iframe.
       * 
       * @private
       * @type {string}
       */
      this._src = options.serviceFile;
      
      /**
       * Local storage key.
       * @type {string}
       * @private
       */
      this._keyStorage = options.keyLocalStorage;
      
      /**
       * Iframe element.
       *
       * @private
       * @type {Object}
       */
      this._iframe = this._createIframe();
      
      /**
       * Initialization functions.
       * 
       * @private
       */
      this._initializeEvents();
      
      /**
      * Settings for frame.html.
      * 
      * @private
      * @type  {Object} this._settings - Settings.
      * @property {string} this._settings.sender - Sender.
      * @property {string} this._settings.type - Type.
      * @property {object} this._settings.settings - Settings.
      * @property {string} this._settings.settings.localStorageKey - Local storage key.
      */
      this._settings = {
         sender: 'Gate.js',
         type: 'settings',
         settings: {
            localStorageKey: options.keyLocalStorage
         }
      };
   }
   
   /**
    * The name of the message event.
    * 
    * @constant
    * @type {string}
    */
   Gate.EVENT_MESSAGE = 'message';
   
   /**
    * The name of the ready event.
    * 
    * @type {string}
    * @constant
    */
   Gate.EVENT_READY = 'ready';
   
   /**
    * The name of the error event.
    * @type {string}
    * @constant
    */
   Gate.EVENT_ERROR = 'error';
   
   /**
    * The text error if service file load failed.
    * 
    * @type {string}
    * @constant
    */
   Gate.ERROR_SERVICE_FILE_LOAD_FAILED = 'приемник еще не загружен для получения данных. Попробуйте позже либо выполняйте передачу данных по событию ready';
   
   /**
    * The text error if local storage not available.
    * 
    * @type {string}
    * @constant
    */
   Gate.ERROR_LOCAL_STORAGE_NOT_AVAILABLE = 'local Storage не доступен';
   
   Gate.prototype = Object.create(CustomEventTarget.prototype);
   Gate.prototype.constructor = Gate;
   Gate.Super = CustomEventTarget;
   
   /**
    * Defaulst data for frame.html.
    * 
    * @private
    * @type  {Object} this._data - Settings.
    * @property {string} this._data.sender - Sender.
    * @property {string} this._data.type - Type.
    * @property {Object} this._data.data - Data.
   */
   Gate.prototype._data = {
      sender: 'Gate.js',
      type: 'message',
      data: null,
   };
   
   /**
    * Assigning handlers.
    * 
    * @private
    * @this {Gate}
    */
   Gate.prototype._initializeEvents = function () {
      this._iframe.addEventListener('load', this._onCanPostMessage.bind(this));
      window.addEventListener("message", this._onMessage.bind(this), false);
      window.addEventListener('storage', this._onStorage.bind(this), false);
   };
   
   /**
    * Create and hide iframe.
    * 
    * @private
    * @this {Gate}
    * @return {Object} The iframe element.
    */
   Gate.prototype._createIframe = function () {
      var iframe = document.createElement('iframe');
      iframe.src = this._src;
      document.body.appendChild(iframe);
      
      return iframe;
   };
   
   /**
    * The event handler: 'load'.
    * 
    * @private
    * @this {Gate}
    */
   Gate.prototype._onCanPostMessage = function () {
      this._iframe.contentWindow.postMessage(
         this._settings,
         this._src
      );
      this._ready = true;
      this._fire(Gate.EVENT_READY, {result: true});
   };
   
   /**
    * Sends data.
    * 
    * @this {Gate}
    * @param {Object} data The data to transfer.
    */
   Gate.prototype.postMessage = function (data) {
      if(this._crossDomain && this._src != 'about:blank') {
         this._data.data = data;
         try {
            if ( !this._ready ) {
               throw new Error(Gate.ERROR_SERVICE_FILE_LOAD_FAILED);
            }
            this._iframe.contentWindow.postMessage(
               this._data,
               this._src
            );
         } catch(error) {
            this._fire(Gate.EVENT_ERROR, error);
         }
         return;
      }
      this._pushDataToStorage(data);
   };
   
   /**
    * The event handler: 'message'.
    * 
    * @private
    * @this {Gate}
    */
   Gate.prototype._onMessage = function () {
      //if (event.origin != this._src)
      //   return;
      this._pushDataToStorage(event.data);
      
      this._fire(Gate.EVENT_MESSAGE, event.data);
   };
   
   /**
    * Puts data to local storage.
    *
    * @private
    * @this {Gate}
    * @param {Object} data The data to transfer.
    */
   Gate.prototype._pushDataToStorage = function (data) {
      try {
         if(window.localStorage) {
            localStorage.setItem(this._keyStorage, JSON.stringify({
               crossDomain: this._crossDomain,
               rnd: Math.random(),
               data: data
            }));
         } else {
            throw new Error(Gate.ERROR_LOCAL_STORAGE_NOT_AVAILABLE);
         }
      } catch (error) {
         this._fire(Gate.EVENT_ERROR, error);
      }
   };
   
   /**
    * The event handler: 'storage'.
    *
    * @private 
    * @this
    */
   Gate.prototype._onStorage = function (event) {
      if(event.key == this._keyStorage) {
         try {
            var data = JSON.parse(event.newValue);
            // оповещаем
            this._fire(Gate.EVENT_MESSAGE, data.data);
         } catch (error) {
            this._fire(Gate.EVENT_ERROR, error);
         }
      }
   };
   
   Gate.prototype.destroy = function () {
      /**
       * Remove iframe
       */
      document.body.removeChild( this._iframe );
   };
   return Gate;
});
//-----------------------------------------------------------------------------------------------------


