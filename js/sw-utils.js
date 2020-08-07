function actualizarCacheDinacmi(dynamiCache, req, res) {
    if (res.ok) {
        return caches.open(dynamiCache).then(cache => {
            cache.put(req, res.clone());
            return res.clone();
        })
    } else {
        return res;
    }
}