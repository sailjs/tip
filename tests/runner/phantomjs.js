require.config({
  paths:{
    'tip': '../../',
    'view': '../../vendor/view',
    'sail': '../../vendor/sail',
    'class': '../../vendor/class',
    'selector': '../../vendor/selector',
    'dom': '../../vendor/dom',
    'events': '../../vendor/events',
    'mocha': '../vendor/mocha/mocha',
    'chai': '../vendor/chai/chai',
    'phantomjs-mocha': '../vendor/phantomjs-mocha'
  }
});

require(['require',
         'mocha',
         'chai',
         'phantomjs-mocha/reporter'],
function(require, _mocha, _chai, Reporter) {
  mocha.setup({ ui: 'bdd', reporter: Reporter });
  
  require(['../suite'],
  function() {
    mocha.run();
  });
});
