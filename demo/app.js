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
					name: 'Post ID', type: 'text', model: 'postId', columnClass: 'col-lg-2 col-sm-6 col-xs-12', inputClass: 'form-control input-sm', required: 'required'
				},
				{
					name: 'Título', type: 'text', model: 'title', columnClass: 'col-lg-4 col-sm-6 col-xs-12', inputClass: 'form-control input-sm'
				},
				{
					name: 'Data', type: 'date', model: 'dtIni', columnClass: 'col-lg-6 col-sm-6 col-xs-12', inputClass: 'form-control input-sm'
				},
				// {
				// 	name: 'Checar', type: 'checkbox', model: 'checked', columnClass: 'col-lg-1 col-sm-6 col-xs-12', inputClass: 'form-control input-sm'
				// },
				// {
				// 	name: 'Tipo', type: 'options', model: 'tipo', labelName: 'title', columnClass: 'col-lg-5 col-sm-6 col-xs-12', inputClass: 'form-control input-sm', options: []
				// }
			],
			search: {label: 'Pesquisar', function: teste},
			delete: {label: 'Deletar', function: teste},
			download: {label: 'Download', function: teste},
			preview: {label: 'Visualizar', function: teste}
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
			$http.get('http://jsonplaceholder.typicode.com/posts/' + $scope.config.models.postId).then(function (data) {
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
