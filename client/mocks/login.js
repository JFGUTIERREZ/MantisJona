'use strict';
window.mocks = window.mocks || {};
window.mocks.login = window.mocks.login || {};
window.mocks.login.submit = function ($scope, params, app) {
    if (window.plugins && window.plugins.touchid) {
        window.plugins.touchid.save('credentials', JSON.stringify(params.data), function () {
            alert('logged in!');
        }, function (err) {
            alert(err);
        });
    }
};