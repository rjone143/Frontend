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
      $httpBackend.whenGET(ApiPath + '/menu_items/A1.json').respond({"id":1,"short_name":"A1","name":"Won Ton Soup with Chicken"});
      // mock the registration
      service.userInfo = { lastname: 'Smith', firstname: 'John', phone: '000-000-0000', email: 'china@pho.com', dish: 'A1' }
      // test get getMenuItem to make sure it is returning the data from api, and this is a step of getUserInfo()
      service.getMenuItem().then(function(response) {
        expect(response.data).toEqual({"id":1,"short_name":"A1","name":"Won Ton Soup with Chicken"});
      });
      // after we made sure api returns correct data, now we test the function is returning the expected user info
      var result = service.getUserInfo()
      expect(result).toEqual(service.userInfo);

      $httpBackend.flush();
    });
  
  });
  