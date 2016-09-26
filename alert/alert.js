(function () {
    'use strict';
    /* global angular */
    var app = angular.module('ngui-alert', []);


    app.factory('$nguiAlert', ['$nguiAlertConfig',
        function ($nguiAlertConfig) {
            return function (options) {
                options = options || {};
                var type = options.type || $nguiAlertConfig.type;

                var icons = angular.extend({}, $nguiAlertConfig.icons, options.icons || {});
                var types = angular.extend({}, $nguiAlertConfig.types, options.types || {});

                var openListeners = [], closeListeners = [];
                var emit = function (listeners) {
                    listeners.forEach(function (cb) {
                        cb(self);
                    });
                };

                var _msg = {},

                    self = {
                        onOpen: function (handle) {
                            openListeners.push(handle);
                        },
                        onClose: function (handle) {
                            closeListeners.push(handle);
                        },
                        open: function (params) {
                            var _t = params.type || type;
                            if (_t in types) {
                                _msg.type = _t;
                                _msg.message = params.message;
                                _msg.icon = params.icon || icons[_t];
                                _msg.showing = true;
                            } else {
                                throw new TypeError("not supporting type. type = `" + _t + "`. allowed types :" + Object.keys(types).join(', '));
                            }
                            emit(openListeners);
                        },
                        close: function () {
                            _msg.showing = false;
                            emit(closeListeners);
                        },

                        show: function (message) {
                            self.open({message: message});
                        },
                        success: function (message) {
                            self.open({type: 'success', message: message});
                        },
                        info: function (message) {
                            self.open({type: 'info', message: message});
                        },
                        error: function (message) {
                            self.open({type: 'error', message: message});
                        },
                        warning: function (message) {
                            self.open({type: 'warning', message: message});
                        },

                        get showing() {
                            return _msg.showing;
                        },
                        get type() {
                            return _msg.type;
                        },
                        get typeCss() {
                            return types[_msg.type];
                        },
                        get icon() {
                            return _msg.icon;
                        },
                        get iconCss() {
                            return icons[_msg.icon];
                        },
                        get message() {
                            return _msg.message;
                        }
                    };
                return self;
            };
        }
    ]);

    app.directive('nguiAlert', ['$nguiAlertConfig',
        function ($nguiAlertConfig) {
            return {
                restrict: 'A',
                scope: {
                    $alert: '=nguiAlert'
                },
                templateUrl: function (elem, attrs) {
                    return attrs.templateUrl || $nguiAlertConfig.baseTemplateUrl + '/alert.htm';
                }
            };
        }
    ]);

    app.provider("$nguiAlertConfig", function () {
        var _type = 'info';
        var baseTemplateUrl = "/ngui-alert";
        var _icons = {
            success: 'glyphicon glyphicon-ok-sign',
            info: 'glyphicon glyphicon-info-sign',
            warning: 'glyphicon glyphicon-question-sign',
            error: 'glyphicon glyphicon-remove-sign'
        };
        var _types = {
            success: 'alert alert-success',
            info: 'alert alert-info',
            warning: 'alert alert-warning',
            error: 'alert alert-danger'
        };

        return {
            setBaseTemplateUrl: function (url) {
                baseTemplateUrl = url;
            },
            setDefaultType: function (type) {
                _type = type;
            },
            setIcons: function (icons) {
                if (icons.success) _icons.success = icons.success;
                if (icons.info) _icons.info = icons.info;
                if (icons.warning) _icons.info = icons.warning;
                if (icons.error) _icons.info = icons.error;
            },
            setTypes: function (types) {
                if (types.success) _types.success = types.success;
                if (types.info) _types.info = types.info;
                if (types.warning) _types.info = types.warning;
                if (types.error) _types.info = types.error;
            },
            $get: function () {
                return {
                    get baseTemplateUrl() {
                        return baseTemplateUrl;
                    },
                    get type() {
                        return _type;
                    },
                    get icons() {
                        return _icons;
                    },
                    get types() {
                        return _types;
                    },
                    icon: function (type) {
                        if (type in _icons) {
                            return _icons[type];
                        }
                        return _icons[_type];
                    }
                };
            }
        };
    });

})();
