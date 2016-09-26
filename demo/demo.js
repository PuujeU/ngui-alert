angular.module('alert-demo', ['ngRoute', 'ngui-alert-component'])
      .config(function ($routeProvider, $locationProvider) {
            $routeProvider
            .when('/alert', {
              templateUrl: '/demo/alert/view.html',
              controller: AlertCtrl,
              page:'alert'
            })
      })

      .run(['$rootScope', '$route', function ($rootScope, $route) {
            $rootScope.$on('$routeChangeSuccess', function () {
              $rootScope.$pageName = document.title = $route.current.page;
            });
      }])
;

angular.module('ngui-alert-component', [
        'ngui-alert'
])
.config(function ($nguiAlertConfigProvider) {
        $nguiAlertConfigProvider.setBaseTemplateUrl('/template');
})
;
