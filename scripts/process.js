class Process {
    async setActiveTab(tab){
        let lastTab = await storage.get("weberLastTab")
        lastTab = lastTab && JSON.parse(lastTab)
        if(lastTab || !tab){
            this.stopActiveTab(lastTab)
        }
        if(tab){
            tab = {
                ...tab,
                intervalStartDate: new Date(Date.now()),
                intervalEndDate: null
            }
            storage.set('weberLastTab',JSON.stringify(tab))
        }
        else {
            storage.set('weberLastTab',null)
        }
    }
    stopActiveTab(tab){
        tab.intervalEndDate = new Date(Date.now())
        if(tab){
            storage.updateInterval(tab)
        }
    }
    
}