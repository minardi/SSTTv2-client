'use strict';
var LIVERELOAD_PORT = 35729;
var SERVER_PORT = 9000;
var lrSnippet = require('connect-livereload')({
    port: LIVERELOAD_PORT
});
var mountFolder = function(connect, dir) {
    return connect.static(require('path').resolve(dir));
};

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to match all subfolders:
// 'test/spec/**/*.js'
// templateFramework: 'lodash'

module.exports = function(grunt) {

    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    // configurable paths
    var yeomanConfig = {
        app: 'app',

        dist: '../../server/SSTTv2/public/app',
        view: '../../server/SSTTv2/app/views/layouts'

    };

    grunt.initConfig({
        yeoman: yeomanConfig,
        watch: {
            options: {
                nospawn: true,
                livereload: true
            },
            coffee: {
                files: ['<%= yeoman.app %>/scripts/{,*/}*.coffee'],
                tasks: ['coffee:dist']
            },
            coffeeTest: {
                files: ['test/spec/{,*/}*.coffee'],
                tasks: ['coffee:test']
            },
            compass: {
                files: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
                tasks: ['compass']
            },
            livereload: {
                options: {
                    livereload: LIVERELOAD_PORT
                },
                files: [
                    '<%= yeoman.app %>/*.html.erb',
                    '{.tmp,<%= yeoman.app %>}/styles/{,*/}*.css',
                    '{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js',
                    '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
                    '<%= yeoman.app %>/scripts/*/*.{ejs,mustache,hbs}',
                    'test/spec/**/*.js'
                ]
            },
            jst: {
                files: [
                    '<%= yeoman.app %>/scripts/*/*.ejs'
                ],
                tasks: ['jst']
            },
            test: {
                files: ['<%= yeoman.app %>/scripts/{,*/}*.js', 'test/spec/**/*.js'],
                tasks: ['test:true']
            }
        },
        connect: {
            options: {
                port: SERVER_PORT,
                // change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {

                    middleware: function(connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, yeomanConfig.app)
                        ];
                    }
                }
            },
            test: {
                options: {
                    port: 9001,
                    middleware: function(connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, 'test'),
                            mountFolder(connect, yeomanConfig.app)
                        ];
                    }
                }
            },
            dist: {
                options: {
                    middleware: function(connect) {
                        return [
                            mountFolder(connect, yeomanConfig.dist)
                        ];
                    }
                }
            }
        },
        open: {
            server: {
                path: 'http://localhost:<%= connect.options.port %>'
            },
            test: {
                path: 'http://localhost:<%= connect.test.options.port %>'
            }
        },
        clean: {
            dist: ['.tmp', '<%= yeoman.dist %>/*'],
            server: '.tmp'
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%= yeoman.app %>/scripts/{,*/}*.js',
                '!<%= yeoman.app %>/scripts/vendor/*',
                'test/spec/{,*/}*.js'
            ]
        },
        mocha: {
            all: {
                options: {
                    run: true,
                    urls: ['http://localhost:<%= connect.test.options.port %>/application.html.erb']
                }
            }
        },
        coffee: {
            dist: {
                files: [{
                    // rather than compiling multiple files here you should
                    // require them into your main .coffee file
                    expand: true,
                    cwd: '<%= yeoman.app %>/scripts',
                    src: '{,*/}*.coffee',
                    dest: '.tmp/scripts',
                    ext: '.js'
                }]
            },
            test: {
                files: [{
                    expand: true,
                    cwd: 'test/spec',
                    src: '{,*/}*.coffee',
                    dest: '.tmp/spec',
                    ext: '.js'
                }]
            }
        },
        compass: {
            options: {
                sassDir: '<%= yeoman.app %>/styles',
                cssDir: '.tmp/styles',
                imagesDir: '<%= yeoman.app %>/images',
                javascriptsDir: '<%= yeoman.app %>/scripts',
                fontsDir: '<%= yeoman.app %>/styles/fonts',
                importPath: '<%= yeoman.app %>/bower_components',
                relativeAssets: true
            },
            dist: {},
            server: {
                options: {
                    debugInfo: true
                }
            }
        },
        // not enabled since usemin task does concat and uglify
        // check index.html to edit your build targets
        // enable this task if you prefer defining your build targets here
        /*uglify: {
            dist: {}
        },*/


        replace: {
            useapp: {
                src: ['<%= yeoman.dist %>/application.html.erb'],
                overwrite: true,
                replacements: [{
                    from: 'scripts/',
                    to: 'app/scripts/'
                    /*CHANGE CSS PATH*/
                }, {
                    from: 'styles/',
                    to: 'app/styles/'
                }]
            }
        },

        useminPrepare: {
            html: '<%= yeoman.app %>/application.html.erb',
            options: {
                dest: '<%= yeoman.dist %>'
            }
        },
        usemin: {
            html: ['<%= yeoman.dist %>/{,*/}*.html.erb'],
            css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
            options: {
                dirs: ['<%= yeoman.dist %>']
            }
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },
        cssmin: {
            dist: {
                files: {
                    '<%= yeoman.dist %>/styles/main.css': [
                        '.tmp/styles/{,*/}*.css',
                        /* ADD BOOTSTRAP*/
                        '<%= yeoman.app %>/bower_components/sass-bootstrap/dist/css/bootstrap.min.css',

                        '<%= yeoman.app %>/styles/{,*/}*.css'
                    ]
                }
            }
        },
        htmlmin: {
            dist: {
                options: {
                    /*removeCommentsFromCDATA: true,
                    // https://github.com/yeoman/grunt-usemin/issues/44
                    //collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeAttributeQuotes: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true*/
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>',
                    src: 'application.html.erb',
                    dest: '<%= yeoman.dist %>'
                }]
            }
        },
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        'images/{,*/}*.{webp,gif}',
                        'styles/fonts/{,*/}*.*',
                    ]
                }, {
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>/bower_components/sass-bootstrap/',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        'fonts/*.*'
                    ]
                }]
            },
            view: {

                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.dist %>',
                    dest: '<%= yeoman.view %>',
                    src: 'application.html.erb'
                }]

            }

        },
        jst: {
            compile: {
                files: {
                    '.tmp/scripts/templates.js': ['<%= yeoman.app %>/scripts/*/*.ejs']
                }
            }
        },
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= yeoman.dist %>/scripts/{,*/}*.js',
                        '<%= yeoman.dist %>/styles/{,*/}*.css',
                        '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
                        '/styles/fonts/{,*/}*.*',
                        'bower_components/sass-bootstrap/fonts/*.*'
                    ]
                }
            }
        }
    });

    grunt.registerTask('createDefaultTemplate', function() {
        grunt.file.write('.tmp/scripts/templates.js', 'this.JST = this.JST || {};');
    });

    grunt.registerTask('server', function() {

        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run(['serve:' + target]);
    });


    grunt.registerTask('serve', function(target) {

        if (target === 'dist') {
            return grunt.task.run(['build', 'open:server', 'connect:dist:keepalive']);
        }

        if (target === 'test') {
            return grunt.task.run([
                'clean:server',
                'coffee',
                'createDefaultTemplate',
                'jst',
                'compass:server',
                'connect:test',
                'open:test',
                'watch:livereload'
            ]);
        }

        grunt.task.run([
            'clean:server',
            'coffee:dist',
            'createDefaultTemplate',
            'jst',
            'compass:server',
            'connect:livereload',
            'open:server',
            'watch'
        ]);
    });

    grunt.registerTask('test', function(isConnected) {
        isConnected = Boolean(isConnected);
        var testTasks = [
            'clean:server',
            'coffee',
            'createDefaultTemplate',
            'jst',
            'compass',
            'connect:test',
            'mocha',
            'watch:test'
        ];

        if (!isConnected) {

            return grunt.task.run(testTasks);
        } else {
            // already connected so not going to connect again, remove the connect:test task
            testTasks.splice(testTasks.indexOf('connect:test'), 1);
            return grunt.task.run(testTasks);
        }
    });

    grunt.registerTask('build', [
        'coffee',
        'clean',
        'createDefaultTemplate',
        'jst',
        'compass:dist',
        'useminPrepare',
        'imagemin',
        'htmlmin',
        'concat',
        'cssmin',
        'uglify',
        'copy',
        'rev',
        'usemin',
        'replace',
        'copy:view'
    ]);

    grunt.registerTask('debug', [
        //'coffee',// ??
        'clean', // чистит наш public/app
        'createDefaultTemplate', // создает будущую заготовку для наших JST вставок
        'jst', // вставляет в templates.js все наши .ejs темплейты, которые в будущем будет добавлены в наш main.js
        //'compass:dist', // ничего не делает, т.к. :dist пустой
        'useminPrepare', // SCRIPTS/***.js
        'imagemin', // немного сжимает картикни + копирует папку на сервер
        'htmlmin', // сжимает applictation.html.erb (убирает пробелы и тому подобное)  + копирует на сервер
        'concat', // таска вообще не описана - без нее папка /scripts не создается
        'cssmin', // cжимает CSS (делает из файла 1 строку убирает лишнии пробелы) + копирует на сервер
        'copy', //копирует папку с шрифтами для бутстрапа \bower_components\sass-bootstrap\fonts
        'rev',  // делает: main.js -> 02as22as.main.js
        'usemin', // редактирует application.html.erb (изменяет ссылки скриптов на новосгенерированные и объеденные)
        'replace', // редактирует application.html.erb (корректирует путь к нашим script-ам, а кокнертно дописывает в пути папку app/)
        'copy:view' // копирует application.html.erb из public/app/.. в app/views/layouts

    ]);

    grunt.registerTask('default', [
        'jshint',
        'test',
        'build'
    ]);
};
