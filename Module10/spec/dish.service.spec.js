describe('testFavirteItemExists', function () {

    var service;
    var $httpBackend;
    var ApiPath;
  
    beforeEach(function () {
      module('common');
  
      inject(function ($injector) {
        console.log($injector)
        service = $injector.get('MenuService');
        $httpBackend = $injector.get('$httpBackend');
        ApiPath = $injector.get('ApiPath')
      });
    });
  
    it('should return a User Info with favarite dish', function() {
      // mock the api call
      $httpBackend.whenGET(ApiPath + '/menu_items/L1.json').respond({"id":193,"short_name":"L1","name":"Orange Chicken"});
      // mock the registration
      service.userInfo = { lastname: 'aaa', firstname: 'aaa', phone: '111-222-3333', email: 'a@a.a', dish: 'L1' }
      // test get getMenuItem to make sure it is returning the data from api, and this is a step of getUserInfo()
      service.getMenuItem().then(function(response) {
        expect(response.data).toEqual({"id":193,"short_name":"L1","name":"Orange Chicken"});
      });
      // after we made sure api returns correct data, now we test the function is returning the expected user info
      var result = service.getUserInfo()
      expect(result).toEqual(service.userInfo);

      $httpBackend.flush();
    });
  
  });
  