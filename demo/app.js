/**
*  Module
*
* Description
*/
angular.module('demo-app', ['ot-forms-generator'])
	.controller('mainCtrl', ['$scope', '$http', function($scope, $http){
		$scope.posts = [];
		$scope.config = {
			fields: [
        {
					name: 'Emitente', type: 'options', model: 'emitente', labelName: 'descricao', columnClass: 'col-lg-4 col-sm-6 col-xs-12', inputClass: 'form-control input-sm', options: [
            {descricao: 'Emissão Própria', value: '0'},
            {descricao: 'Emissão de Terceiros', value: '1'}
          ]
				},
				{
					name: 'Numeração Inicial', type: 'text', model: 'nrIni', columnClass: 'col-lg-4 col-sm-6 col-xs-12', inputClass: 'form-control input-sm', required: 'required'
				},
        {
					name: 'Numeração Final', type: 'text', model: 'nrFin', columnClass: 'col-lg-4 col-sm-6 col-xs-12', inputClass: 'form-control input-sm', required: 'required'
				},
				{
					name: 'Emissão de', type: 'date', model: 'dtIni', columnClass: 'col-lg-3 col-sm-6 col-xs-12', inputClass: 'form-control input-sm', required: 'required'
				},
        {
					name: 'Até', type: 'date', model: 'dtFin', columnClass: 'col-lg-3 col-sm-6 col-xs-12', inputClass: 'form-control input-sm', required: 'required'
				},
        {
					name: 'Série/ECF', type: 'text', model: 'serie', columnClass: 'col-lg-3 col-sm-6 col-xs-12', inputClass: 'form-control input-sm', required: 'required'
				},
        {
					name: 'Valor', type: 'currency', model: 'valor', columnClass: 'col-lg-3 col-sm-6 col-xs-12', inputClass: 'form-control input-sm', required: 'required'
				}
			],
			submit: {label: 'Pesquisar', function: teste}
		};

		// (function(){
		// 	$http.get('http://jsonplaceholder.typicode.com/posts').then(function (data) {
		// 		 // console.log(data);
		// 		 $scope.config.fields[4].options = data.data;
		// 	}).catch(function (err) {
		// 		 console.error(err);
		// 	})
		// }());

		function teste () {
			console.log('Carregando. Aguarde...')
			$http.get('http://jsonplaceholder.typicode.com/posts/').then(function (data) {
			 if(Array.isArray(data.data)){
			 	$scope.posts = data.data;
			 }else{
			 	$scope.posts.push(data.data);
			 }
			}).catch(function (err) {
			 console.error(err);
			})
		};

		function teste2 () {
			console.log('André')
			$http.defaults.headers.common['Token'] = 'fde05d7b-fd9e-11e5-a3cc-641c6764c83b';
			$http.get('http://192.168.0.106:5000/usuarios/niveis').then(function (data) {
			 console.log(data);
			}).catch(function (err) {
			 console.error(err);
			})
		};
	}]);
