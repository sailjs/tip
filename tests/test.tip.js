define(['tip/tip',
        'chai'],
function(Tip, chai) {
  var expect = chai.expect;

  describe("tip", function() {
    
    it('should export constructor', function() {
      expect(Tip).to.exist;
      expect(Tip).to.be.a('function');
    });
    
  });
  
  return { name: "test.tip" }
});
