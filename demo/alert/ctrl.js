function AlertCtrl($scope, $nguiAlert,$log) {
    var $alert = $scope.$alert = $nguiAlert({
        type: 'error'
    });

    $alert.onClose(function () {
        $log.debug('onClose :',$alert.message);
    });
    $alert.onOpen(function () {
        $log.info('onOpen :',$alert.message);
    });

    var $custom = $scope.$custom = $nguiAlert({
        type: 'valid',
        types: {
            valid: 'alert alert-warning'
        },
        icons: {
            valid: 'glyphicon glyphicon-asterisk',
            star: 'glyphicon glyphicon-star'
        }
    });

    $scope.alertShow = function () {
        $alert.show("alert message");
    };

    $scope.customShow = function () {
        $custom.show("custom message");
    };
    $scope.customShowIcon = function () {
        $custom.open({
            type: 'success',
            icon: 'star',
            message: 'custom icon'
        });
    };
}
