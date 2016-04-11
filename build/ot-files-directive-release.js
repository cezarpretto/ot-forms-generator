(function (module) {

  /**
  *  Module
  *
  * Description
  */
  module
  	.run(['$templateCache', function($templateCache) {
	$templateCache.put('ot-files-view.html', '<div class=row><div class=col-sm-12><div class="panel panel-default"><form name=frmSearch><div class=panel-body><div class=row><div class="{{field.columnClass || \'col-lg-4 col-sm-6 col-xs-12\'}}" ng-repeat="field in config.fields"><div class=input-group><span class=input-group-addon>{{field.name}}:</span><input class="{{field.inputClass || \'form-control\'}}" type={{field.type}} ng-model=config.models[field.model] ng-if=isTypeText(field.type) required><input class="{{field.inputClass || \'form-control\'}}" type=phone ng-model=config.models[field.model] ng-if="field.type === \'date\'" required ot-date-mask=""><select class="{{field.inputClass || \'form-control\'}}" ng-options="option as option.{{field.labelName}} for option in field.options" ng-model=config.models[field.model] ng-if="field.type === \'options\'" required></select><textarea class="{{field.inputClass || \'form-control\'}}" type={{field.type}} ng-model=config.models[field.model] ng-if="field.type === \'textArea\'" required></textarea><input class=checkbox type={{field.type}} ng-model=config.models[field.model] ng-if="field.type === \'checkbox\'"></div><br></div></div><div class=row><div class="col-lg-12 col-sm-12 col-xs-12"><button class="btn btn-primary btn-sm pull-right" ng-click=config.search.function() ng-disabled=frmSearch.$invalid>{{config.search.label}}</button></div></div><div class=row><ng-transclude></ng-transclude></div></div></form></div></div></div>');
}])

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


}) (angular.module ('ot-forms-generator', []));


