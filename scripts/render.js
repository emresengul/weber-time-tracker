document.addEventListener('DOMContentLoaded', function () {
    new WebsiteRender().renderAll()
})

class WebsiteRender {
    async renderAll(){
        try {
        const storage = {
            get:async(key) =>{
                return new Promise(async (resolve,reject) => {
                    await chrome.storage.local.get([key], function(result) {
                        return resolve(result[key])
                    });
                })
            }
        }
        let data = await storage.get('weberTabs')
        data = data ? JSON.parse(data) : null
        data = data.sort((a,b) => {
            if(parseInt(a.duration || 0) > parseInt(b.duration || 0)) {
                return -1
            }
            else if(parseInt(a.duration || 0) == parseInt(b.duration || 0)){
                return 0
            }
            return 1
        })
        if(data){
            for (let index = 0; index < data.length; index++) {
                const website = data[index];
                this.create(website)                
            }
        }
        }
        catch{
        }

    }
    create(data){
        try {
            const element = this.element()
            element.key = data.url
            const orderEl = this.order()
            const iconEl = this.icon(data.icon)
            const infoEl = this.info(data)
            element.appendChild(orderEl)
            element.appendChild(iconEl)
            element.appendChild(infoEl)
            const websites = document.getElementsByClassName("weber-websites")[0]
            websites.appendChild(element)
        }
        catch{
        }
    }
    element(){
        const websiteElement = document.createElement("div")
        websiteElement.classList.add("weber-website")
        return websiteElement
    }
    order() {
        const orderElement = document.createElement("div")
        orderElement.classList.add("weber-website-order")
        const lengthEl = document.getElementsByClassName("weber-website")
        orderElement.textContent = (lengthEl.length + 1).toString()
        return orderElement
    }
    icon(url){
        const iconElement = document.createElement("div")
        iconElement.classList.add("weber-website-icon")
        const iconImgElement = document.createElement("img")
        iconImgElement.src = url 
        iconElement.appendChild(iconImgElement)
        return iconElement
    }
    durationModifier(duration){
        const date = new Date(null);
        date.setSeconds(duration);
        return date.toISOString().substr(11, 8)
    }
    info({url,duration}){
        const infoElement = document.createElement("div")
        infoElement.classList.add("weber-info")
        const info1 =  this.infoItem('Website',url)
        const info2 =  this.infoItem('Duration',this.durationModifier(duration))
        infoElement.appendChild(info1)
        infoElement.appendChild(info2)
        return infoElement
    }
    infoItem(key,value){
        const infoItemElement = document.createElement("div")
        infoItemElement.classList.add("weber-website-info-item")
        const infoKeyElement = document.createElement("span")
        infoKeyElement.classList.add("weber-website-info-key")
        infoKeyElement.textContent = key
        const infoValueElement = document.createElement("span")
        infoValueElement.classList.add("weber-website-info-value")
        infoValueElement.textContent = value
        infoItemElement.appendChild(infoKeyElement)
        infoItemElement.appendChild(infoValueElement)
        return infoItemElement
    }
}