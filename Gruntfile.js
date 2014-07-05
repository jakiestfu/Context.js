module.exports = function(grunt) {

    var fs = require('fs'),
        pkg = grunt.file.readJSON('package.json');

    var dynamicWrites = function(){

        // Update Readme Version
        var readme = grunt.file.read('README.md');
        grunt.file.write('README.md', readme.replace(/v(.*?) /, 'v'+pkg.version+' '));
        grunt.log.writeln("Updated Readme version number to "+pkg.version);

    };

    grunt.initConfig({

        pkg: pkg,

        sass: {
            dist: {
                options: {
                    bundleExec: true,
                    style: 'compressed',
                    banner: "/* Context.css v<%= pkg.version %> */"
                },
                files: {
                    'dist/context.min.css': 'src/context.scss'
                }
            }
        },

        uglify: {
            options: {
                banner: "/*! Context.js v<%= pkg.version %> */\n",
                preserveComments: 'some'
            },
            main: {
                files: {
                    'dist/context.min.js': ['src/context.js']
                }
            }
        },

        jshint: {
            all: ['src/context.js']
        },

        watch: {
            css: {
                files: 'src/*.scss',
                tasks: ['sass', 'dynamicWrites']
            },
            scripts: {
                files: 'src/*.js',
                tasks: ['jshint', 'uglify', 'dynamicWrites']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // Register Everything
    grunt.registerTask('dynamicWrites', 'Writes variables to static files', dynamicWrites);

    grunt.registerTask('default', ['jshint', 'sass', 'uglify', 'dynamicWrites']);
    grunt.registerTask('develop', ['jshint', 'sass', 'uglify', 'dynamicWrites', 'watch']);
};
