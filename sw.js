importScripts('js/sw-utils.js');

const CACHE_STATIC_NAME = 'static-v3';
const CACHE_DYNAMIC_NAME = 'dynamic-v1';
const CACHE_INMUTABLE_NAME = 'inmutable-v1';

const APPCHELL = [
    //  '/',
    '/index.html',
    '/css/style.css',
    '/img/favicon.ico',
    '/img/avatars/spiderman.jpg',
    '/img/avatars/ironman.jpg',
    '/img/avatars/wolverine.jpg',
    '/img/avatars/thor.jpg',
    '/img/avatars/hulk.jpg',
    '/js/app.js',
    'js/sw-utils.js'
];

const APP_SHELL_IMMUTABLE = [
    'https://fonts.googleapis.com/css?family=Quicksand:300,400',
    'https://fonts.googleapis.com/css?family=Lato:400,300',
    'https://use.fontawesome.com/releases/v5.3.1/css/all.css',
    '/css/animate.css',
    '/js/libs/jquery.js'
];

self.addEventListener('install', e => {

    const cachestatic = caches.open(CACHE_STATIC_NAME)
        .then(cache => {
            return cache.addAll([
                // '/',
                'index.html',
                'css/style.css',
                'img/favicon.ico',
                'img/avatars/spiderman.jpg',
                'img/avatars/ironman.jpg',
                'img/avatars/wolverine.jpg',
                'img/avatars/thor.jpg',
                'img/avatars/hulk.jpg',
                'js/app.js',
                'js/sw-utils.js'
            ]);
        });

    const cacheInmutable = caches.open(CACHE_INMUTABLE_NAME)
        .then(cache => cache.add([
            'https://fonts.googleapis.com/css?family=Quicksand:300,400',
            'https://fonts.googleapis.com/css?family=Lato:400,300',
            'https://use.fontawesome.com/releases/v5.3.1/css/all.css',
            'css/animate.css',
            'js/libs/jquery.js'
        ]));


    e.waitUntil(Promise.all([cachestatic, cacheInmutable]));

});


self.addEventListener('activate', e => {
    const respuesta = caches.keys().then(keys => {
        keys.forEach(key => {

            if (key !== CACHE_STATIC_NAME && key.includes('static')) {
                return caches.delete(key);
            }
        });
    });
    e.waitUntil(respuesta);
});

self.addEventListener('fetch', e => {
    const respuesta = caches.match(e.request).then(res => {
        if (res) {
            return res;
        } else {
            return fetch(e.request).then(Newres => {
                return actualizarCacheDinacmi(CACHE_DYNAMIC_NAME, e.request, Newres);
            })
        }

    });

    e.respondWith(respuesta)
})