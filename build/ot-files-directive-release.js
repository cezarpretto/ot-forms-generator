(function (module) {

  /**
   *  Module
   *
   * Description
   */
  module
    .run(['$templateCache', function($templateCache) {
	$templateCache.put('ot-files-view.html', '<div class=row><div class=col-sm-12><div class="panel panel-default"><form name=frmSearch ng-submit=config.submit.function()><div class=panel-body><div class=row><div class="{{field.columnClass || \'col-lg-4 col-sm-6 col-xs-12\'}}" ng-repeat="field in config.fields"><div class=input-group><span class=input-group-addon>{{field.name}}:</span><input class="{{field.inputClass || \'form-control\'}}" type={{field.type}} ng-model=config.models[field.model] ng-if=isTypeText(field.type) ng-required={{field.required}}><input class="{{field.inputClass || \'form-control\'}}" type=phone ng-model=config.models[field.model] ng-if="field.type === \'date\'" ng-required={{field.required}} fd-date-mask=""><input class="{{field.inputClass || \'form-control\'}}" type=phone ng-model=config.models[field.model] ng-if="field.type === \'currency\'" ng-required={{field.required}} money-mask=""><input class="{{field.inputClass || \'form-control\'}}" type={{field.type}} ng-model=config.models[field.model] ng-if="field.type === \'file\'" ng-required={{field.required}} ot-file-upload="" accept={{field.accept}} otf-multiple={{field.multiple}} file-size={{field.fileSize}}><select class="{{field.inputClass || \'form-control\'}}" ng-options="option as option.{{field.labelName}} for option in field.options" ng-model=config.models[field.model] ng-if="field.type === \'options\'" ng-required={{field.required}}></select><textarea class="{{field.inputClass || \'form-control\'}}" type={{field.type}} ng-model=config.models[field.model] ng-if="field.type === \'textArea\'" ng-required={{field.required}}></textarea><input class=checkbox type={{field.type}} ng-model=config.models[field.model] ng-if="field.type === \'checkbox\'"></div><span ng-if="field.type === \'file\'">Tamanho m\xE1ximo do arquivo: {{field.fileSize / 1024}} KB</span><br></div></div><div class=row><div class="col-lg-12 col-sm-12 col-xs-12"><button class="btn btn-primary btn-sm pull-right" ng-disabled=frmSearch.$invalid>{{config.submit.label}}</button></div></div><div class=row><ng-transclude></ng-transclude></div></div></form></div></div></div>');
}])

    .directive('otForm', ['$templateCache', function($templateCache) {
      return {
        restrict: 'E',
        template: $templateCache.get('ot-files-view.html'),
        // templateUrl: '../src/ot-files-view.html',
        transclude: true,
        scope: {
          config: '='
        },
        link: function postLink(scope, element, attrs, controller) {
          scope.config.models = {};
          scope.isTypeText = function(type) {
            if (type !== 'options' && type !== 'textArea' && type !== 'checkbox' && type !== 'date' && type !== 'currency' && type !== 'file') {
              return true;
            } else {
              return false;
            }
          };
        }
      };
    }])
    .directive('fdDateMask', ['$filter', function($filter) {
      return {
        require: "ngModel",
        link: function(scope, element, attrs, ctrl) {
          var _formatDate = function(date) {
            if (date != undefined) {
              date = date.replace(/[^0-9]+/g, "");
              if (date.length > 2) {
                date = date.substring(0, 2) + "/" + date.substring(2);
              }
              if (date.length > 5) {
                date = date.substring(0, 5) + "/" + date.substring(5, 9);
              }
              return date;
            }
          };

          element.bind("keyup", function() {
            ctrl.$setViewValue(_formatDate(ctrl.$viewValue));
            ctrl.$render();
          });

          ctrl.$parsers.push(function(value) {
            if (value.length === 10) {
              var dateArray = value.split("/");
              return new Date(dateArray[2], dateArray[1] - 1, dateArray[0]);
            }
          });

          ctrl.$formatters.push(function(value) {
            return $filter("date")(value, "dd/MM/yyyy");
          });
        }
      };
    }])
  	.directive('moneyMask', CurrencyMaskDirective)
  	.filter('currencyMask', CurrencyMaskFilter)
  	.provider('$masker', $MaskerProvider);



  	function $MaskerProvider() {
  	  var defaults = this.defaults = {
  	    maskMatches: [{
  	        'replace': /(\.[0-9])(?=[0-9]{0}$)/g,
  	        'with': '$10'
  	      }, // Converts XXXX.X to XXXX.X0
  	      {
  	        'replace': /^(\d)*(?=(\d{0,})$)/g,
  	        'with': '$&,00'
  	      }, // Converts XXXX to XXXX,00
  	      {
  	        'replace': /^(\d{1})$/,
  	        'with': '0,0$1'
  	      }, // Converts X to 0,0X
  	      {
  	        'replace': /(\d{2})$/,
  	        'with': ',$1'
  	      }, // Converts XX to 0,XX
  	      {
  	        'replace': /,(\d{3,})$/,
  	        'with': '$1,00'
  	      }, // Converts X,XXX to X,XX
  	      {
  	        'replace': /^,(\d{2})$/,
  	        'with': "0,$1"
  	      }, // Converts ,XX to 0,XX
  	      {
  	        'replace': /(?:\,{2,})+/g,
  	        'with': ","
  	      }, // Converts all duplicated comma for just one
  	      {
  	        'replace': /[A-z{}\[\]_!\.]/g,
  	        'with': ""
  	      }, // Converts all non-digit numbers to ''
  	      {
  	        'replace': /(\d)(?=(\d{3})+(?!\d))/g,
  	        'with': "$1."
  	      }, // Converts XXXXXX to XXX.XXX
  	    ],

  	    unmaskMatches: [{
  	        'replace': /\D/g,
  	        'with': ""
  	      }, // Converts  all non-digit numbers to ''
  	      {
  	        'replace': /^(\d{1})$/,
  	        'with': '0.0$1'
  	      }, // Converts X to X.0X
  	      {
  	        'replace': /(\d{2})$/,
  	        'with': '.$1'
  	      }, // Converts XX to .XX
  	      {
  	        'replace': /(,00|\.00$)/g,
  	        'with': ''
  	      }, // Converts all ,XX and .XX to nothing
  	      {
  	        'replace': /^(0{1,})/,
  	        'with': ''
  	      }, // Converts zeros at the start of the string to nothing
  	      {
  	        'replace': /^\.(\d{2})$/,
  	        'with': "0.$1"
  	      }, // Converts .XX to 0.XX

  	      /**
  	       * Clean the end of the string from
  	       * unsignificant numbers converting
  	       * XXX.30XXXX to XXX.30
  	       */
  	      {
  	        'replace': function(value) {
  	          if (!value) return '';

  	          var regex = new RegExp('\.(\d{3,})$'),
  	            match = value.match(regex);

  	          if (match instanceof Array && match[1]) {
  	            value = value.replace(match, match.toString().substr(0, 2));
  	          }

  	          return value;
  	        }
  	      }
  	    ]
  	  };

  	  this.setCurrency = function(currency) {
  	    this.currency = currency;

  	    return this;
  	  };

  	  /**
  	   * Add a new match task to $masker.unmaskMatches.
  	   */
  	  this.addUnmaskMatch = function(replace, value) {
  	    this.unmaskMatches.unshift({
  	      'replace': replace,
  	      'with': value
  	    });

  	    return this;
  	  };

  	  /**
  	   * Add a new match task to $masker.maskMatches.
  	   */
  	  this.addMaskMatch = function(replace, value) {
  	    var match = {};

  	    if (!value) {
  	      match.replace = replace;
  	    } else {
  	      match.replace = replace;
  	      match.with = value;
  	    }

  	    this.maskMatches.unshift(match);

  	    return this;
  	  };

  	  this.$get = function($locale) {
  	    var $masker = {
  	      options: {}
  	    };

  	    var options = $masker.options = angular.extend({}, $masker.options, defaults);

  	    options.currency = options.currency || $locale.NUMBER_FORMATS.CURRENCY_SYM;

  	    function addCurrency(value, currency) {
  	      if (!value) return value;

  	      /**
  	       * Converts @value to a String instance, for Number
  	       * instances doesn't have .replace() prototype.
  	       */
  	      var newValue = value.toString();

  	      // Implements the currency at @newValue
  	      newValue = newValue.replace(/^/, (currency ? currency : options.currency));

  	      return newValue;
  	    }

  	    /**
  	     * Mask @value matching it contents.
  	     */
  	    $masker.maskValue = function(value, currency) {
  	      var maskedValue = value ? value.toString() : '',
  	        matches = options.maskMatches;

  	      matches.forEach(function(key) {
  	        if (key.replace instanceof Function) {
  	          maskedValue = key.replace(maskedValue);
  	        } else {
  	          maskedValue = maskedValue.replace(key.replace, key.with);
  	        }
  	      });

  	      maskedValue = addCurrency(maskedValue, currency);

  	      return maskedValue;
  	    };

  	    /**
  	     * Return @value to it real value.
  	     */
  	    $masker.unmaskValue = function(value) {
  	      var unmaskedValue = value ? value.toString() : '',
  	        matches = options.unmaskMatches;

  	      matches.forEach(function(key) {
  	        if (key.replace instanceof Function) {
  	          unmaskedValue = key.replace(unmaskedValue);
  	        } else {
  	          unmaskedValue = unmaskedValue.replace(key.replace, key.with);
  	        }
  	      });

  	      return unmaskedValue;
  	    };

  	    return $masker;
  	  };
  	}

  	function CurrencyMaskFilter($masker) {
  	  var getDigestMode = function(mode) {
  	    switch (mode) {
  	      case 'mask':
  	        return 1;
  	        break;
  	      case 'unmask':
  	        return 2;
  	        break;
  	    }
  	  };

  	  var digestCurrency = function(currency) {
  	    if (currency === null || currency === 'default') {
  	      return null;
  	    } else {
  	      return currency;
  	    };
  	  };

  	  return function(input, mode, currency) {
  	    if (!input) {
  	      return '';
  	    }

  	    input = input.toString();

  	    // If there is no 'mode' defined. Mask the input.
  	    var mode = mode ? getDigestMode(mode) : getDigestMode('mask'),
  	      digestedCurrency = currency ? digestCurrency(currency) : digestCurrency(null);

  	    if (mode === 1) {
  	      var maskedValue = $masker.maskValue(input, digestedCurrency);

  	      return maskedValue;
  	    } else if (mode === 2) {
  	      return $masker.unmaskValue(input);
  	    };
  	  };
  	}

  	function CurrencyMaskDirective($masker) {
  	  return {
  	    restrict: 'A',
  	    require: ['?ngModel'],
  	    link: function(scope, element, attrs, controllers) {
  	      var ngModel = controllers[0],
  	        currency = !attrs.currency ? null : attrs.currency;

  	      /**
  	       * Mask @value matching it contents.
  	       */
  	      function maskValue(value) {
  	        return $masker.maskValue(value, currency);
  	      }

  	      /**
  	       * Return @value to it real value.
  	       */
  	      function unmaskValue(value) {
  	        return $masker.unmaskValue(value);
  	      }

  	      /**
  	       * Parser who will be applied to the ngModel
  	       * before the goes to DOM. That is the real ngModel value.
  	       */
  	      ngModel.$parsers.push(function(value) {
  	        return unmaskValue(value);
  	      });

  	      /**
  	       * Everytime the input suffer a change,
  	       * the directive will update it and mask
  	       * all the typed content.
  	       */
  	      scope.$watch(attrs.ngModel, function(value) {
  	        if (!value || value.length < 1) {
  	          return;
  	        }

  	        var maskedValue = maskValue(value);

  	        if (maskedValue != value) {
  	          ngModel.$setViewValue(maskedValue);
  	          ngModel.$render();
  	        }
  	      });

  	      element.bind('paste', function(evt) {
  	        var clipboardData = evt.clipboardData || evt.originalEvent.clipboardData || window.clipboardData;
  	        var pastedData = clipboardData.getData('text');

  	        if (isNaN(pastedData)) {
  	          evt.preventDefault();
  	        }
  	      });

  	      element.bind('keypress', function(evt) {
  	        var charCode = evt.charCode;
  	        var keyCode = evt.which || evt.keyCode;

  	        if ((evt.ctrlKey && keyCode == 118) || charCode == 0) {
  	          return;
  	        }

  	        if (keyCode < 48 || keyCode > 57) {
  	          evt.preventDefault();
  	        }
  	      });
  	    }
  	  };
  	}

  module
    .directive('otFileUpload', function($compile){
      return{
        require: "ngModel",
        restrict: 'A',
        // template: template,
        link: function(scope, element, attrs, ctrl){
          if(attrs.otfMultiple){
            element[0].setAttribute('multiple', '');
          }
          var types = attrs.accept.split(',');
          element.bind('change', function(){
            for (var j = 0; j < element[0].files.length; j++) {
              var aux = false;
              var retorno = element[0].files;
              for (var i = 0; i < types.length; i++) {
                if(types[i] === element[0].files[j].type && element[0].files[j].size <= attrs.fileSize){
                  aux = true;
                }
              }
              if(!aux){
                element[0].value = null;
                retorno = undefined;
              }
            }
            ctrl.$setViewValue(retorno);
            ctrl.$render();
          });
        }
      }
    });


}) (angular.module ('ot-forms-generator', []));


