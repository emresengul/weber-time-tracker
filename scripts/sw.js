try {
    importScripts(
        "website.js",
        "storage.js",
        "process.js",
        "background.js"
    )
}
catch(error){
    console.log(error)
}