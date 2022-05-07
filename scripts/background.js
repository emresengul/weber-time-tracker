var process = new Process()
var storage = new Storage()

const inital = function() {
    events()
}
// inital()
setTimeout(() => {
    inital()
    
}, 70);


const events = function(){

    chrome.tabs.onActivated.addListener(function(info) {
        chrome.tabs.get(info.tabId, function(tab) {
            storage.add(tab)
            process.setActiveTab(tab)
        });
    });

    chrome.webNavigation.onCompleted.addListener(function(details) {
        chrome.tabs.get(details.tabId, function(tab) {
            storage.update(tab)
            process.setActiveTab(tab)
        });
    });
    chrome.tabs.onRemoved.addListener(async function(tabId,removed) {
        process.setActiveTab(null)
    })
    chrome.windows.onRemoved.addListener(function(windowid) {
        process.setActiveTab(null)
    })
}