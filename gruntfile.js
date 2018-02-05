'use strict';
module.exports = function(grunt) {

    grunt.initConfig({

        sass: {
            dist: {
                files: {
                    'sass/styles.full.css': 'sass/styles.scss'
                }
            }
        },


        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'sass/',
                    src: ['styles.full.css'],
                    dest: 'project-folder/',
                    ext: '.css'
                }]
            }
        },


        imagemin: {
            dynamic: {
                options: {
                    optimizationLevel: 7

                },
                files: [{
                    expand: true,
                    cwd: 'images-uncompressed/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'project-folder/images/'
                }]
            }
        },

        'http-server': {

            'dev': {
                root: ".",
                host: "localhost",
                port: 8080,

                cache: 100,
                showDir: true,
                autoIndex: true,

                // server default file extension
                ext: "html",

                // run in parallel with other tasks
                runInBackground: true

                // Tell grunt task to open the browser
                // openBrowser: true
            }
        },


        watch: {
            // reload gruntfile.js if it changes while running
            configFiles: {
                files: ['gruntfile.js'],
                options: {
                    reload: true
                }
            },
            options: {
                livereload: true,
            },
            sass: {
                files: ['sass/*.scss'],
                tasks: ['sass', 'cssmin'],

            },
            imagemin: {
                files: ['images-uncompressed/*.{png,jpg,gif}'],
                options: {
                    event: ['all'],
                },
                tasks: ['imagemin']
            }
        },




    });


    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-http-server');

    grunt.registerTask('default', ['http-server:dev', 'sass', 'cssmin', 'imagemin', 'watch']);
};
