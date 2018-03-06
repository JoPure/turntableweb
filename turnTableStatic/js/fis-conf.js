// 设置图片合并的最小间隔
fis.config.set('settings.spriter.csssprites.margin', 20);

// 取消下面的注释开启simple插件，注意需要先进行插件安装 npm install -g fis-postpackager-simple
fis.config.set('modules.postpackager', 'simple');

// 取消下面的注释设置打包规则
        fis.config.set('pack', {
                '/pkg/lib.js': [
//         'js/lib/jquery.js',
//         'js/lib/underscore.js',
//         'js/lib/backbone.js',
//         'js/lib/backbone.localStorage.js',
        'js/jquery-2.0.3.js',      //要按照加载顺序写
        'js/swfobject.js',
        'js/video.js',
        'js/main.js'

    ],
    // 取消下面的注释设置CSS打包规则，CSS打包的同时会进行图片合并
    // '/pkg/aio.css': '**.css'
});

// 取消下面的注释可以开启simple对零散资源的自动合并
// fis.config.set('settings.postpackager.simple.autoCombine', true);

fis.config.merge({
    roadmap : {
        path : [

            {
                //所有的js文件
                reg : '**.js',
                //发布到/static/js/xxx目录下
                url : '$&',
                release : '/static/$&'
            },
            {
                //所有的js文件
                reg : '**.css',
                //发布到/static/js/xxx目录下
                url : '$&',
                release : '/static/$&'
            },
            {
                //所有image目录下的.png，.gif文件
                reg : /^\/images\/(.*\.(?:png|gif|jpg|swf))/i,
                //访问这些图片的url是 '/m/xxxx?log_id=123'
                url : '$1',
                //发布到/static/pic/xxx目录下
                release : '/images/$1'
            },
            {
                //所有的ico文件
                reg : '**.ico',
                //发布的时候即使加了--md5参数也不要生成带md5戳的文件
                useHash : false,
                //发布到/static/xxx目录下
                release : '/static$&'
            }
//          ,
//          {
//              //前面规则未匹配到的其他文件
//              reg : /.*/,
//              //编译的时候不要产出了
//              release : false
//          }
        ]
    }
});

fis.config.merge({
    roadmap : {
        domain : {
            "image":["http://images-sg-cdn.pocketgamesol.com/dw/"],
            "**.js":["http://static.dw.pocketgamesol.com"],
            "**.css":["http://static.dw.pocketgamesol.com"]
        }
    }
});