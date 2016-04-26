angular.module('ot-forms-generator')
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
