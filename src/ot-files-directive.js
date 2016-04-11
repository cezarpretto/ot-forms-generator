/**
*  Module
*
* Description
*/
angular.module('ot-forms-generator', [])
	/* grunt-angular-inline-templates */
	.directive('otForm', ['$templateCache', function($templateCache){
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
				scope.isTypeText = function(type){
					if(type !== 'options' && type !== 'textArea' && type !== 'checkbox' && type !== 'date'){
						return true;
					}else{
						return false;
					}
				};
			}
		};
	}]).directive('otDateMask', ['$filter', function($filter) {
    return {
      require: "ngModel",
      link: function(scope, element, attrs, ctrl) {
        var _formatDate = function(date) {
          if(date != undefined){
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
  }]);
