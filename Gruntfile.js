/*global module:false*/
module.exports = function(grunt) {
  var rewriteRulesSnippet = require('grunt-connect-rewrite/lib/utils').rewriteRequest;

  var serverOptions = {
    base: 'src',
    debug: !!(process.env.DEBUG || process.env.DEBUG),
    hostname: '0.0.0.0',
    open: !!(process.env.OPEN || process.env.open),
    port: process.env.PORT || process.env.port || 9000
  };

  var developmentOptions = {};
  Object.keys(serverOptions).forEach(function(k) {
    developmentOptions[k] = serverOptions[k];
  });
  developmentOptions.middleware = function(connect, options) {
    return [
      // RewriteRules support
      rewriteRulesSnippet,
      // Mount filesystem
      connect.static(require('path').resolve(options.base))
    ];
  };

  grunt.initConfig({
    connect: {
      server: {
        options: {
          base: 'src',
          debug: !!(process.env.DEBUG || process.env.DEBUG),
          keepalive: true,
          open: !!(process.env.OPEN || process.env.open),
          port: process.env.PORT || process.env.port || 9000
        }
      }
    },
    jshint: {
      src: ['Gruntfile.js', 'src/**/*.js'],
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {
          require: true,
          define: true,
          requirejs: true,
          describe: true,
          expect: true,
          it: true
        }
      }
    },
    nunjucks: {
      precompile: {
        baseDir: 'src/templates/',
        src: 'src/templates/*',
        dest: 'src/templates.js',
      }
    },
    watch: {
      nunjucks: {
        files: '*',
        tasks: ['nunjucks']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadTasks('./node_modules/grunt-nunjucks/tasks');

  grunt.registerTask('server', ['configureRewriteRules', 'connect:development']);
  grunt.registerTask('default', ['server', 'watch:nunjucks']);
};
