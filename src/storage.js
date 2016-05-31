   import CustomEventTarget from '../node_modules/custom-event-target/CustomEventTarget';
   
    function Storage (options) {
      this.constructor.Super.call(this);
      /**
       * keyStorageName
       */
      this._keyStorageName = options.keyLocalStorage;
      
      /**
       * Start scan storage
       */
      try {
        if(window.localStorage) {
          this._scanStorage();
        } else {
          throw new Error(Storage.ERROR_LOCAL_STORAGE_NOT_AVAILABLE);
        }
      } catch (error) {
        this._fire(error);
      }
    }
    
    /**
     * The text error if local storage not available.
     * 
     * @type {string}
     * @constant
     */
    Storage.ERROR_LOCAL_STORAGE_NOT_AVAILABLE = 'local Storage не доступен';
    
    /**
     * Name event storage
     */
    Storage.EVENT_STORAGE = 'storage';

    Storage.prototype = Object.create(CustomEventTarget.prototype);
    Storage.prototype.constructor = Storage;
    Storage.Super = CustomEventTarget;
    
    /**
     * Get value storage by key
     *
     */
    Storage.prototype._getValueStorageByKey = function () {
      return localStorage.getItem(this._keyStorageName);
    };
    
    /**
     * Function for scan storage with delay
     *
     */
    Storage.prototype._scanStorage = function () {
      var me = this;
      var value = this._getValueStorageByKey();

      var timerId = setTimeout(function scan() {
        var nextValue = me._getValueStorageByKey();

        if(nextValue != value) {
            var event = {
               key: me._keyStorageName,
               type: 'storage',
               newValue: nextValue,
               oldValue: value
            };
            
            me._fire(Storage.EVENT_STORAGE, event);
             
            value = nextValue;
        }
        
        timerId = setTimeout(scan, 3000);
      }, 3000);
  };
  
  export default Storage;
