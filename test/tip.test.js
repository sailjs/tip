define(['tip'],
function(Tip) {

  describe("tip", function() {
    
    it('should export constructor', function() {
      expect(Tip).to.exist;
      expect(Tip).to.be.a('function');
    });
    
  });
  
  return { name: "test.tip" }
});
