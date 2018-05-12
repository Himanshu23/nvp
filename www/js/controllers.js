  angular.module('starter.controllers', ['starter.services'])

      .controller('AppCtrl', function($scope, $ionicModal, $timeout, $rootScope, $ionicSideMenuDelegate, $ionicNavBarDelegate) {

          $scope.loginData = {};

          $scope.openLink = function() {
              navigator.notification.activityStop("Please Wait", "Loading....");
              var ref = window.open('http://www.nvpfence.com', '_system', 'location=yes');
              ref.addEventListener('loadstop', function() {
                  navigator.notification.activityStop("Please Wait", "Loading....");
              });
              ref.addEventListener('loadstart', function() {
                  inc++;
                  if (inc == 1)
                      navigator.notification.activityStart("Please Wait", "Loading....");
              });
          }
          $ionicSideMenuDelegate.canDragContent(false)

      })

      .controller('HomeCtrl', function($scope, $ionicSideMenuDelegate, $rootScope, $state) {
        $scope.groups = [];
        $scope.groups[0] = {
          name: 0,
            items: [
                'Privacy Fence','Semi-Privacy','Picket Fence','Ranch Rail'
            ],
    show: false
  };

  $scope.toggleGroup = function(group) {
    if ($scope.isGroupShown(group)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = group;
    }
  };
  $scope.isGroupShown = function(group) {
    return $scope.shownGroup === group;
  };

   $scope.showJobListing = function(type,group){
      $ionicSideMenuDelegate.toggleLeft();
      switch(type){
        case "Privacy Fence":
        $state.go("chooseFence",{"catId":1});
        break;

        case "Semi-Privacy":
          $state.go("chooseFence",{"catId":2});
          break;

        case "Picket Fence":
          $state.go("chooseFence",{"catId":3});
          break;
        case "Ranch Rail":
          $state.go("chooseFence",{"catId":4});
          break;  

        break;
   }
 }     

      })
      .controller('viewCtrl', function($scope, $stateParams, $rootScope) {
          $scope.img = $stateParams.img;
          $scope.imageSlider = {};
          $scope.imageSlider[0] = {}
           $scope.imageSlider[0]['image'] = $stateParams.img;
           $scope.imageSlider[0]['text'] = "";
          for (i = 0; i < $rootScope.imgcar.length; i++) {

              if ($rootScope.imgcar[i].Product.image != $scope.img) {
                  j = i + 1;
                  $scope.imageSlider[j] = {}
                  $scope.imageSlider[j]['image'] = $rootScope.imgcar[i].Product.image;
                  $scope.imageSlider[j]['text'] = $rootScope.imgcar[i].Product.name;
              }
              else if($rootScope.imgcar[i].Product.image == $scope.img){
                $scope.imageSlider[0]['text'] = $rootScope.imgcar[i].Product.name;
              }
          }

          console.log(JSON.stringify($scope.imageSlider));

      })
      .controller('chooseFence', function($scope, $state, $stateParams, $ionicModal, npvFactory, $rootScope) {

          if (typeof $stateParams.catId != undefined) {

              npvFactory.getProducts($stateParams.catId).success(function(response) {
                      if (response.status == "success") {
                          $scope.poductData = response.productData.Product;
                          $scope.catData = response.productData.Category;
                          $rootScope.imgcar = response.productData.Product;
                      }
                  })
                  .error(function() {
                      console.log('error in password updation');
                  });

                  npvFactory.getDesigns($stateParams.catId).success(function(response) {
                      if (response.status == "success") {
                          $scope.designData = response.categoryDesigns;
                      }
                  })
                  .error(function() {
                      console.log('error in password updation');
                  });

          }

      })
      .controller('categoriesCtrl', function($scope, $state, $stateParams, $ionicModal, $rootScope, npvFactory, $http) {

          npvFactory.getCategories().success(function(response) {

                  if (response.status == "success") {
                      $scope.categoryData = response.categoryData;
                  }
              })
              .error(function() {
                  console.log('error in password updation');
              });

      }).controller('videoCtrl', function($scope, npvFactory, $state,$rootScope,$ionicHistory) {

            $rootScope.goBackState = function(){
            // $ionicViewSwitcher.nextDirection('back');
             // $ionicHistory.goBack(); 
              $state.go("app.home");
            }
          npvFactory.getVideos().success(function(response) {
                  $scope.videoData = [];

                  if (response.status == "success") {
                      $scope.videoData = response.videoData;
                      $scope.npvHistory =response.nvpHistory;

                      $rootScope.videoData = $scope.videoData;
                      $rootScope.npvHistory =$scope.npvHistory;

                      console.log($rootScope.videoData);
                      console.log($rootScope.npvHistory);
                  }
              })
              .error(function() {
                  console.log('error in password updation');
              });

    //       $scope.onPlay = function(fileName) {
    //            console.log(fileName);
    //           var options = {
    //     successCallback: function () {
    //         console.log("Video was closed without error.");
    //     },
    //     errorCallback: function (errMsg) {
    //         console.log("Error! " + errMsg);
    //     },
    //     orientation: 'landscape'
    // };
    // window.plugins.streamingMedia.playVideo(fileName, options);
    //       }

          $scope.plasyHistoryVideo = function(){
          //$scope.onPlay($scope.npvHistory.video);
            $scope.onPlay('file://img/History.mp4');

          }

      }).controller('playCtrl', function($scope, npvFactory, $state,$stateParams,$rootScope,video) {
       video.resetSource();
          if($stateParams.video!=100)
           video.addSource('mp4', $rootScope.videoData[$stateParams.video].link);
           else
             video.addSource('mp4', "img/Manufacturingandrecycling.mp4");
      })
