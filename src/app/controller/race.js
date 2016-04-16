(function() {
  'use strict';

  angular
    .module('horseAdmin')
    .controller('RaceController', RaceController);

  /** @ngInject */
  function RaceController($http,$scope,$rootScope,toastr,AuthService) {

var backendURL='http://racingprohk.ap-southeast-1.elasticbeanstalk.com';//a seperate link
$scope.selectText='Select Race';
$scope.resetText='Reset';
$scope.saveText='Save';

function getRaces(){
    

      $http.get(backendURL+'/fetchRace').then(function(res){
          $scope.races=res.data;
      },function(err){

      })

  }

getRaces();




function selectRace(){
   
  $scope.selectText='Loading...';
   $scope.resetText='Reset';
         $http({
  method: 'POST',
  url: backendURL+'/',
 data:{link:$scope.selectedlink,lang:'chinese'}
}).then(function(res){
       
        $scope.selectedRace=res.data;
         var horseList=$scope.race.hl;
          if(horseList && horseList.length==0)
           {
               toastr.error('Failed to get any data!')
$scope.selectText='Select Race';

           
           return;
           }
          
$scope.selectText='Select Race';

      },function(err){ toastr.error('Failed!'+err)
$scope.selectText='Select Race';
})
    
        
    
    
    
    
     
}


 $scope.selectRace=selectRace;

      
$scope.saveRace=function(){
   
    

    console.log('saving race'+$scope.selectedRace.length)
    if(!$scope.selectedRace){
         toastr.error('No race to save!');
        $scope.saveText='Saving';
        return;
        
    }
    $scope.saveText='Saving';
     $http({
  method: 'POST',
  url: backendURL+'/saveRace',
 data:{race:$scope.selectedRace}
}).then(function(res){
       $scope.saveText='Save';
          console.log(res)
          $scope.selectedRace=res.data.race;
          toastr.success('Race has been updated ')
      },function(err){$scope.saveText='Save'; toastr.error('Failed!'+err)})

     
}      
      


$scope.resetRace=function(link){
    $scope.resetText='Resetting';
 
     $http({
  method: 'POST',
  url: backendURL+'/resetRace/',
data:{raceLink:$scope.selectedRace.raceLink}
}).then(function(res){
       
         selectRace();
          
      },function(err){ toastr.error('Failed!'+err)})
    
    
}

  }
})();
