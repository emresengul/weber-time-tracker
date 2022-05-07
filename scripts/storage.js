class Storage {
    set(key,value){
        chrome.storage.local.set({[key]: value}, function() {
        });
    }
    async add(tab){
        try {
            let website = new Website()
            website = website.create(tab)
            if(!website){
                return null
            }
            let storageData = await this.get('weberTabs')
            if(!storageData) {
                storageData = []
                storageData.push(website)
            }
            else {
                storageData = JSON.parse(storageData)
                const index = storageData.findIndex((d) => d.url == website.url)
                if(index === -1) {
                    storageData.push(website)
                }
            }
            this.set('weberTabs',JSON.stringify(storageData))
        }
        catch{
        }

    }
    async update(tab) {
        let website = new Website()
        website = website.create(tab)
        if(!website){
            return null
        }
        let tabs = await this.get('weberTabs') || []
        tabs = JSON.parse(tabs)
        const existTabIndex = tabs.findIndex(t => t.url == website.url)
        if(existTabIndex > 0){
            tabs[existTabIndex] = {...website,duration:tabs[existTabIndex].duration || website.duration}
            this.set('weberTabs',JSON.stringify(tabs))
        }
    }
    async get(key){
        return new Promise(async (resolve,reject) => {
            await chrome.storage.local.get([key], function(result) {
                return resolve(result[key])
            });
        })
    }
    async updateInterval(tab){
        let website = new Website()
        website = website.create(tab)
        if(!website) {
            return null
        }
        let tabs = await this.get('weberTabs') || []
        tabs = JSON.parse(tabs)
        const existTabIndex = tabs.findIndex(t => t.url == website.url)
        const diffTime = Math.abs(new Date(tab.intervalEndDate) - new Date(tab.intervalStartDate));
        const duration = ((diffTime % 60000) / 1000).toFixed(0);
        website = {
            ...website,
            duration: tabs[existTabIndex]?.duration ? (parseInt(tabs[existTabIndex].duration) + parseInt(duration)) : parseInt(duration)
        }
        tabs[existTabIndex] = website
        this.set('weberTabs',JSON.stringify(tabs))
    }
}