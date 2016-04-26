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
					name: 'Emitente', type: 'options', model: 'emitente', labelName: 'descricao', columnClass: 'col-lg-4 col-sm-6 col-xs-12', inputClass: 'form-control input-sm', required: 'true', options: [
            {descricao: 'Emissão Própria', value: '0'},
            {descricao: 'Emissão de Terceiros', value: '1'}
          ]
				},
				{
					name: 'Numeração Inicial', type: 'text', model: 'nrIni', columnClass: 'col-lg-4 col-sm-6 col-xs-12', inputClass: 'form-control input-sm', required: 'true'
				},
        {
					name: 'Numeração Final', type: 'text', model: 'nrFin', columnClass: 'col-lg-4 col-sm-6 col-xs-12', inputClass: 'form-control input-sm', required: 'true'
				},
				{
					name: 'Emissão de', type: 'date', model: 'dtIni', columnClass: 'col-lg-3 col-sm-6 col-xs-12', inputClass: 'form-control input-sm', required: 'true'
				},
        {
					name: 'Até', type: 'date', model: 'dtFin', columnClass: 'col-lg-3 col-sm-6 col-xs-12', inputClass: 'form-control input-sm', required: 'true'
				},
        {
					name: 'Série/ECF', type: 'text', model: 'serie', columnClass: 'col-lg-3 col-sm-6 col-xs-12', inputClass: 'form-control input-sm', required: 'true'
				},
        {
					name: 'Valor', type: 'currency', model: 'valor', columnClass: 'col-lg-3 col-sm-6 col-xs-12', inputClass: 'form-control input-sm', required: 'true'
				}
			],
			submit: {label: 'Pesquisar', function: teste}
		};

		$scope.configUpload = {
			fields: [
				{
					name: 'Arquivo', type: 'file', fileSize: '61440', multiple: 'true', accept:'application/pdf, application/xml', model: 'file', columnClass: 'col-lg-3 col-sm-6 col-xs-12', inputClass: 'form-control input-sm', required: 'true'
				}
			],
			submit: {label: 'Upload', function: upload}
		};

		// (function(){
		// 	$http.get('http://jsonplaceholder.typicode.com/posts').then(function (data) {
		// 		 // console.log(data);
		// 		 $scope.config.fields[4].options = data.data;
		// 	}).catch(function (err) {
		// 		 console.error(err);
		// 	})
		// }());

		function upload(){
			console.log($scope.configUpload.models.file);
		};

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
