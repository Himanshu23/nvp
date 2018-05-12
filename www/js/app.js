
angular.module('starter', ['ionic', 'starter.controllers', 'slick','ngVideo'])

.run(function($ionicPlatform, $rootScope, $ionicLoading) {
  
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova) {
            setTimeout(function() {
                navigator.splashscreen.hide();
            }, 1000);
            /*cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
*/
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
            //StatusBar.backgroundColorByHexString('#375FA7');
        }



    });

    $rootScope.$on('loading:show', function() {
        $ionicLoading.show({
            template: '<ion-spinner icon="dots" class="spinner-energized"></ion-spinner>'
        });
    });

    $rootScope.$on('loading:hide', function() {
        $ionicLoading.hide();
    });
})

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

        // $ionicNativeTransitionsProvider.setDefaultOptions({
        //     duration: 400, // in milliseconds (ms), default 400,
        //     slowdownfactor: 4, // overlap views (higher number is more) or no overlap (1), default 4
        //     iosdelay: -1, // ms to wait for the iOS webview to update before animation kicks in, default -1
        //     androiddelay: -1, // same as above but for Android, default -1
        //     winphonedelay: -1, // same as above but for Windows Phone, default -1,
        //     fixedPixelsTop: 0, // the number of pixels of your fixed header, default 0 (iOS and Android)
        //     fixedPixelsBottom: 0, // the number of pixels of your fixed footer (f.i. a tab bar), default 0 (iOS and Android)
        //     triggerTransitionEvent: '$ionicView.afterEnter', // internal ionic-native-transitions option
        //     backInOppositeDirection: false // Takes over default back transition and state back transition to use the opposite direction transition to go back
        // });

        $stateProvider
        .state('view', {
            url: '/view/:img',
            params: {
                img: {},
                hiddenParam: 'YES',
            },
            templateUrl: 'templates/view.html',
            controller: 'viewCtrl'
        })
        $stateProvider
        .state('app', {
            url: "/app",
            abstract: true,
            templateUrl: "templates/menu.html",
            controller: 'HomeCtrl',
            
        })


        .state('chooseFence', {
                url: '/chooseFence/:catId',
                templateUrl: 'templates/chooseFence.html',
                controller: 'chooseFence',
                params: {
                    obj: ''
                }
            })
        .state('app.home', {

            url: "/home",
            views: {
                'menuContent': {
                    templateUrl: "templates/home.html",
                    controller: 'HomeCtrl'
                }
            },

        })
            // .state('app.home', {
            //     url: '/home',
            //     templateUrl: 'templates/home.html',
            //     controller: 'HomeCtrl'

            // })
        .state('categories', {
                url: '/categories',
                templateUrl: 'templates/categories.html',
                controller: 'categoriesCtrl'

            }).state('videos', {
                url: '/videos',
                templateUrl: 'templates/videos.html',
                controller: 'videoCtrl'
            }).state('play', {
                  url: '/play/:video',
                templateUrl: 'templates/play.html',
                controller: 'playCtrl'
            })
            .state('contactus', {
                url: '/contactus',
                templateUrl: 'templates/contactus.html',
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('app/home');
        $httpProvider.interceptors.push(function($rootScope) {


            return {
                request: function(config) {

                    $rootScope.$broadcast('loading:show');
                    return config;
                },
                response: function(response) {
                    $rootScope.$broadcast('loading:hide');
                    return response;
                },
                responseError: function(response, error) {
                    $rootScope.$broadcast('loading:hide');
                    $rootScope.$broadcast('response:error');
                    return response
                },
                requestError: function(response) {
                    $rootScope.$broadcast('loading:hide');
                    $rootScope.$broadcast('response:error');
                    return response
                }
            }
        });
    })
    .constant('APP_CONSTANTS', {
        //'API_ENDPOINT': 'http://52.221.67.26/ionic/Api',
        'API_ENDPOINT': 'http://nvpfenceapp.com/Api',
    });
