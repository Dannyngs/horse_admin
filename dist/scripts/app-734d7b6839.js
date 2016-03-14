!function(){"use strict";angular.module("horseAdmin",["ngResource","ui.router","ui.bootstrap","toastr"]).factory("AuthService",function(){var e=null,t=null,o={login:function(o,a){e=o,t=a},logout:function(){e=null,t=null},isLogined:function(){return t?!0:!1},getCurrentUser:function(){return e},getCurentToken:function(){return t}};return o}).factory("authInterceptor",["$rootScope","$q","$window","AuthService",function(e,t,o,a){return{request:function(e){return e.headers=e.headers||{},a.getCurentToken()&&(e.headers.token=a.getCurentToken()),e}}}])}(),function(){"use strict";function e(e,t,o,a,n,r,l,s){t.update={},t.update._id=s._id,t.update.note=s.note,t.update.salePrice=s.salePrice,t.update.password=s.password,t.updateMember=function(t){return""==t.password?a.warning("Password cannot be empty","Warning"):void e.put(o.backendURL+"/api/users/"+t._id,t).then(function(e){o.users=e.data,a.success("Success"),l.close()},function(e){a.error(e.data,"Error")})},t.closeModel=function(){l.dismiss("cancel")}}e.$inject=["$http","$scope","$rootScope","toastr","AuthService","$location","$uibModalInstance","selected_user"],angular.module("horseAdmin").controller("UpdateController",e)}(),function(){"use strict";function e(){function e(e,t,o,a,n){t.navText=e.navText,t.logout=function(){confirm("Sure to Log out?")&&(a.success("Log out Successfully!!"),o.logout(),n.path("/login"))}}e.$inject=["$rootScope","$scope","AuthService","toastr","$location"];var t={restrict:"E",templateUrl:"app/view/navbar.html",scope:{creationDate:"="},controller:e,controllerAs:"vm",bindToController:!0};return t}angular.module("horseAdmin").directive("acmeNavbar",e)}(),function(){"use strict";function e(e,t,o,a){function n(){e.get(t.backendURL+"/api/multiplelogin").then(function(e){for(var t=null,a=[],n=0;n<e.data.length;n++){var r=e.data[n];r.username!=t?(r.count=1,t=r.username,a.push(r)):(a[a.length-1].count++,a[a.length-1].date=r.date)}o.multiplelogin=a},function(e){a.error(e.data)})}n(),o.emptyRecords=function(){e["delete"](t.backendURL+"/api/multiplelogin/").then(function(e){a.success(e.data,"Success"),n(),console.log("empty!")},function(e){})}}e.$inject=["$http","$rootScope","$scope","toastr"],angular.module("horseAdmin").controller("MultipleController",e)}(),function(){"use strict";function e(e,t,o,a,n){t.user={},t.showpassword=!1,t.showpass=function(){t.showpassword=!t.showpassword},o.getMembers=function(){e.get(o.backendURL+"/api/users").then(function(e){var a=0,n=0,r=new Date;console.log("todayis :"+r.getDate());for(var l=0;l<e.data.length;l++){var s=e.data[l];if(s.registeredOn&&s.salePrice){var i=new Date(s.registeredOn);i.getFullYear()==r.getFullYear()&&i.getMonth()==r.getMonth()&&(n+=parseInt(s.salePrice),i.getDate()==r.getDate()&&(a+=parseInt(s.salePrice)))}}o.users=e.data,t.monthlyIncome=n,t.dailyIncome=a},function(){})},o.getMembers(),t.deleteMember=function(t){confirm("Sure to delete?")&&e["delete"](o.backendURL+"/api/users/"+t).then(function(e){a.success("Success"),console.log(e.data),o.users=e.data},function(e){})},t.showAddMember=function(e){$("#addModel").modal("show"),t.addMember={},t.addMember.role="member",t.roles=[{label:"Member",value:"member"},{label:"Admin",value:"admin"}],console.log(t.roles)},t.showUpdateMember=function(e){$("#updateModel").modal("show"),t.update={},t.update._id=e._id,t.update.note=e.note,t.update.salePrice=e.salePrice,t.update.password=e.password},t.openUpdate=function(e){n.open({animation:!0,templateUrl:"app/view/updateModel.html",controller:"UpdateController",resolve:{selected_user:function(){return e}}})},t.openCreate=function(){n.open({animation:!0,templateUrl:"app/view/createModel.html",controller:"CreateController",resolve:{items:function(){return t.items}}})}}e.$inject=["$http","$scope","$rootScope","toastr","$uibModal"],angular.module("horseAdmin").controller("MemberController",e)}(),function(){"use strict";function e(e,t,o,a,n,r){o.user={},o.platform="Dream Project",t.navText="Admin Panel",o.adminLogin=function(l){"Racing Pro"==o.platform?(t.navText="Racing Pro ",t.backendURL="http://racingprohk.ap-southeast-1.elasticbeanstalk.com/admin"):(t.backendURL="http://football-back-dev.ap-southeast-1.elasticbeanstalk.com/admin",t.navText="Dream Project "),e.post(t.backendURL+"/api/login",{id:l.id,password:l.password}).then(function(e){a.success("Login Successfully!!"),n.login(l,e.data.token),r.path("/")},function(e){console.log(e),a.error("Auth Failed!")})}}e.$inject=["$http","$rootScope","$scope","toastr","AuthService","$location"],angular.module("horseAdmin").controller("LoginController",e)}(),function(){"use strict";function e(e,t,o,a,n){function r(){e.get(o.backendURL+"/api/onlineusers").then(function(e){t.onlineusers=e.data},function(){})}r(),t.refreshOnlineMembers=r,t.takeoffline=function(t){e["delete"](o.backendURL+"/api/onlineusers/"+t).then(function(e){a.success(e.data),r()},function(e){})}}e.$inject=["$http","$scope","$rootScope","toastr","AuthService"],angular.module("horseAdmin").controller("CurrentController",e)}(),function(){"use strict";function e(e,t,o,a,n,r,l){t.addMember={},t.addMember.role="member",t.roles=[{label:"Member",value:"member"},{label:"Admin",value:"admin"}],t.saveMember=function(t){return""==t.password||""==t.username?o.warning("Username or Password cannot be empty","Warning"):void e.post(l.backendURL+"/api/users",t).then(function(e){o.success("Success"),l.users=e.data,t={}},function(e){o.error(e.data,"Error")})},t.closeModel=function(){r.dismiss("cancel")}}e.$inject=["$http","$scope","toastr","AuthService","$location","$uibModalInstance","$rootScope"],angular.module("horseAdmin").controller("CreateController",e)}(),function(){"use strict";function e(e,t,o,a,n,r){function l(){e.get(o.backendURL+"/api/daytotal").then(function(e){t.daytotal=e.data.daytotal},function(e){console.log(e),a.error("Auth Failed!")}),e.get(o.backendURL+"/api/monthtotal").then(function(e){t.monthtotal=e.data.monthtotal},function(e){console.log(e),a.error("Auth Failed!")})}t.open1=function(){t.popup1.opened=!0},t.open2=function(){t.popup2.opened=!0},t.setDate=function(e,o,a){t.dt=new Date(e,o,a)},t.dateOptions={formatYear:"yy",startingDay:1},t.popup1={opened:!1},t.popup2={opened:!1},t.adminLogin=function(t){e.post(o.backendURL+"/api/login",{id:t.id,password:t.password}).then(function(e){a.success("Login Successfully!!"),n.login(t,e.data.token),r.path("/")},function(e){console.log(e),a.error("Auth Failed!")})},t.getRange=function(n,r){return n&&r?void e.get(o.backendURL+"/api/rangetotal/"+n+"/"+r).then(function(e){t.rangetotal=e.data.totalcost,t.totalusers=e.data.users},function(e){console.log(e),a.error("Auth Failed!")}):a.error("Please select a date range first.")},l()}e.$inject=["$http","$scope","$rootScope","toastr","AuthService","$location"],angular.module("horseAdmin").controller("AccountController",e)}(),function(){"use strict";function e(e,t,o,a){e.debug("runBlock end"),t.$on("$stateChangeStart",function(e,t,n,r,l){return t.authRequired&&!o.isLogined()?a.path("/login"):void("app/view/login.html"===t.templateUrl&&o.isLogined()&&a.path("/home"))})}e.$inject=["$log","$rootScope","AuthService","$location"],angular.module("horseAdmin").run(e)}(),function(){"use strict";function e(e,t){e.state("current",{url:"/current",templateUrl:"app/view/current.html",controller:"CurrentController",controllerAs:"current",authRequired:!0}).state("login",{url:"/login",templateUrl:"app/view/login.html",controller:"LoginController",controllerAs:"login",authRequired:!1}).state("member",{url:"/",templateUrl:"app/view/member.html",controller:"MemberController",controllerAs:"member",authRequired:!0}).state("multiple",{url:"/multiple",templateUrl:"app/view/multiple.html",controller:"MultipleController",controllerAs:"multiple",authRequired:!0}).state("account",{url:"/accounting",templateUrl:"app/view/account.html",controller:"AccountController",controllerAs:"account",authRequired:!0}),t.otherwise("/")}e.$inject=["$stateProvider","$urlRouterProvider"],angular.module("horseAdmin").config(e)}(),function(){"use strict";function e(e,t,o){e.debugEnabled(!0),t.allowHtml=!0,t.timeOut=2e3,t.positionClass="toast-top-right",o.interceptors.push("authInterceptor")}e.$inject=["$logProvider","toastrConfig","$httpProvider"],angular.module("horseAdmin").config(e)}(),angular.module("horseAdmin").run(["$templateCache",function(e){e.put("app/view/account.html",'<acme-navbar creation-date="main.creationDate"></acme-navbar><div class="container"><h3>Accounting</h3><div class="row pad10"><div class="col-md-3"><label>From</label><p class="input-group"><input type="text" class="form-control" uib-datepicker-popup="" ng-model="fromDate" is-open="popup1.opened" min-date="minDate" max-date="maxDate" datepicker-options="dateOptions" date-disabled="disabled(date, mode)" ng-required="true" close-text="Close" alt-input-formats="altInputFormats"> <span class="input-group-btn"><button type="button" class="btn btn-default" ng-click="open1()"><i class="glyphicon glyphicon-calendar"></i></button></span></p></div><div class="col-md-3"><label>To</label><p class="input-group"><input type="text" class="form-control" uib-datepicker-popup="" ng-model="toDate" is-open="popup2.opened" min-date="minDate" max-date="maxDate" datepicker-options="dateOptions" date-disabled="disabled(date, mode)" ng-required="true" close-text="Close"> <span class="input-group-btn"><button type="button" class="btn btn-default" ng-click="open2()"><i class="glyphicon glyphicon-calendar"></i></button></span></p></div><div class="col-md-3 col-md-offset-3 pad10"><button ng-click="getRange(fromDate,toDate)" type="button" class="btn btn-primary">Confirm</button></div></div><div class="row"><div class="table-responsive"><table class="table table-hover table-bordered"><thead></thead><td><strong>Monthly Income</strong></td><td><strong>Daily Income</strong></td><tr><td>{{ monthtotal | currency }}</td><td>{{ daytotal | currency }}</td></tr></table></div></div><div class="row"><div class="table-responsive"><table class="table table-hover table-bordered"><thead></thead><td><strong>From:</strong> {{fromDate|date : \'yyyy-MM-dd\'}} <strong>To:</strong> {{toDate|date : \'yyyy-MM-dd\'}}</td><tr><td>{{ rangetotal | currency }}</td></tr></table></div></div><div class="row pad10"><div class="table-responsive"><table class="table table-hover table-bordered"><thead></thead><td>Username ($ = admin)</td><td>Sale Price</td><td>Date</td><tr ng-repeat="u in totalusers | filter:search |orderBy:\'-registeredOn\'"><td><span ng-show="u.role==\'admin\'">$</span>{{u.username}}</td><td>{{u.salePrice|currency}}</td><td>{{u.registeredOn|date:\'yyyy-MM-dd\'}}</td></tr></table></div></div></div>'),e.put("app/view/createModel.html",'<div class="modal-header"><h4 class="modal-title" id="myModalLabel">Add Member</h4></div><div class="modal-body"><form><div class="form-group"><label for="exampleInputEmail1">Username</label> <input type="username" ng-model="addMember.username" class="form-control" placeholder="Username"></div><div class="form-group"><label for="exampleInputPassword1">Password</label> <input type="password" ng-model="addMember.password" class="form-control" placeholder="Password"></div><div class="form-group"><label for="exampleInputPassword1">Role</label><select class="form-control" ng-model="addMember.role" ng-options="r.value as r.label for r in roles"></select></div><div class="form-group"><label for="exampleInputEmail1">Sale Price</label> <input type="number" ng-model="addMember.salePrice" class="form-control" placeholder="salePrice"></div><div class="form-group"><label for="exampleInputPassword1">Note</label> <input type="text" ng-model="addMember.note" class="form-control" placeholder="Note"></div></form></div><div class="modal-footer"><button type="button" class="btn btn-default" ng-click="closeModel()">Close</button> <button ng-click="saveMember(addMember)" type="button" class="btn btn-primary">Save</button></div>'),e.put("app/view/current.html",'<acme-navbar creation-date="main.creationDate"></acme-navbar><div class="container"><h3>Current Online Member</h3>{{isLogined()}}<div class="row"><div class="col-sm-8 col-md-8 col-md-offset-2"><table class="table table-hover"><thead></thead><td>Member</td><td>Login Date</td><td>Take it offline</td><tr ng-repeat="u in onlineusers"><td>{{u.userkey}}</td><td>{{u.date | date:\'yyyy-MM-dd HH:mm:ss\'}}</td><td><button ng-click="takeoffline(u._id)" type="button" class="pull-right btn btn-sm btn-info">Offline</button></td></tr></table><button ng-click="refreshOnlineMembers()" type="button" class="pull-right btn btn-sm btn-primary">Refresh</button></div></div></div>'),e.put("app/view/login.html",'<div class="container" style="padding:20px;"><div class="row"><div class="col-md-6 col-md-offset-3"><div class="jumbotron text-center"><h2 style="font-family: fantasy;">DREAM PROJECT & RACING PRO</h2><form class="pad20"><div class="form-group"><div class="btn-group"><label class="btn btn-success" ng-click="doit()" ng-model="platform" uib-btn-radio="\'Dream Project\'">Dream Project</label> <label class="btn btn-danger" ng-click="doit()" ng-model="platform" uib-btn-radio="\'Racing Pro\'">Racing Pro</label></div></div><div class="form-group"><input type="text" class="form-control" id="exampleInputEmail1" placeholder="ID" ng-model="user.id"></div><div class="form-group"><input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" ng-model="user.password"></div><button type="submit" class="btn btn-primary" ng-click="adminLogin(user)">Login</button></form></div></div></div></div>'),e.put("app/view/member.html",'<acme-navbar creation-date="main.creationDate"></acme-navbar><div class="container"><h3>Member Manager</h3><div class="row pad10"><div class="col-md-3 pad10"><div class="input-group"><input type="text" class="form-control" id="exampleInputAmount" placeholder="Username" ng-model="search.username"> <span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span></div></div><div class="col-md-3 col-md-offset-6 pad10"><button ng-click="showpass()" type="button" class="btn btn-info">Password</button> <button ng-click="openCreate()" type="button" class="btn btn-primary">Add Member</button></div></div><div class="row pad10"><div class="table-responsive"><table class="table table-hover table-bordered"><thead></thead><td>Username ($ = admin)</td><td>Password</td><td>Role</td><td>Sale Price</td><td>Note</td><td>Date</td><td>Delete/Update</td><tr ng-repeat="u in users | filter:search |orderBy:\'-username\'"><td><span ng-show="u.role==\'admin\'">$</span>{{u.username}}</td><td><span ng-show="showpassword">{{u.password}}</span><span ng-hide="showpassword">***</span></td><td>{{u.role}}</td><td>{{u.salePrice|currency}}</td><td>{{u.note}}</td><td>{{u.registeredOn|date:\'yyyy-MM-dd\'}}</td><td><div class="btn-group" role="group" aria-label="..."><button class="btn btn-danger" type="button" ng-click="deleteMember(u._id)">Delete</button> <button class="btn btn-primary" type="button" ng-click="openUpdate(u)">Update</button></div></td></tr></table></div></div></div>'),e.put("app/view/multiple.html",'<acme-navbar creation-date="main.creationDate"></acme-navbar><div class="container"><h3>Multiple Online Member</h3><div class="row"><div class="form-inline"><div style="margin:20px;" class="pull-right form-group"><div class="input-group"><input type="text" class="form-control" id="exampleInputAmount" placeholder="Account" ng-model="searchacc.username"> <span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span></div></div></div><table class="table table-hover"><thead></thead><td>Count(s)</td><td>Account</td><td>Date</td><tr ng-repeat="rc in multiplelogin |filter:searchacc"><td>{{rc.count}}</td><td>{{rc.username}}</td><td>{{rc.date | date:\'yyyy-MM-dd HH:mm:ss\'}}</td></tr></table><button ng-click="emptyRecords()" type="button" class="pull-right btn btn-sm btn-danger">Empty Records</button></div></div>'),e.put("app/view/navbar.html",'<nav class="navbar navbar-static-top navbar-inverse"><div class="container"><div class="navbar-header"><button type="button" class="navbar-toggle" ng-init="navCollapsed = true" ng-click="navCollapsed = !navCollapsed"><span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span></button> <a class="navbar-brand" href="#">{{navText}}</a></div><div class="collapse navbar-collapse" ng-class="!navCollapsed && \'in\'"><ul class="nav navbar-nav"><li><a ng-href="#">Member</a></li><li><a ng-href="#current">Online User</a></li><li><a ng-href="#multiple">Multiple Login</a></li><li><a ng-href="#accounting">Accounting</a></li><li><a href="#" ng-click="logout()">Log out</a></li></ul></div></div></nav>'),e.put("app/view/updateModel.html",'<div class="modal-header"><h4 class="modal-title" id="myModalLabel">Update</h4></div><div class="modal-body"><form><div class="form-group"><label for="exampleInputPassword1">Password</label> <input type="password" ng-model="update.password" class="form-control" placeholder="Password"></div><div class="form-group"><label for="exampleInputEmail1">Sale Price</label> <input type="number" ng-model="update.salePrice" class="form-control" placeholder="salePrice"></div><div class="form-group"><label for="exampleInputPassword1">Note</label> <input type="text" ng-model="update.note" class="form-control" placeholder="Note"></div></form></div><div class="modal-footer"><button type="button" class="btn btn-default" ng-click="closeModel()">Close</button> <button ng-click="updateMember(update)" type="button" class="btn btn-primary">Update</button></div>')}]);
//# sourceMappingURL=../maps/scripts/app-734d7b6839.js.map
