require.config({
  paths:{
    'tip': '../',
    'view': '../vendor/view',
    'sail': '../vendor/sail',
    'class': '../vendor/class',
    'selector': '../vendor/selector',
    'dom': '../vendor/dom',
    'events': '../vendor/events',
    'mocha': 'vendor/mocha/mocha',
    'chai': 'vendor/chai/chai'
  }
});

require(['require',
         'mocha',
         'chai'],
function(require, _mocha, _chai) {
  mocha.setup('bdd');
  
  require(['./suite'],
  function() {
    mocha.run();
  });
});
