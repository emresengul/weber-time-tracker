
class Website {
    icon(url){
        return `https://s2.googleusercontent.com/s2/favicons?domain=${url}`
    }
    hostName(url){
        try {
            const { hostname } = new URL(url);
            return hostname
        }
        catch{
            return url
        }
    }
    isValidUrl(url){        
        try {
            url = new URL(url);
        } catch(err){
            return false;  
        }
        return url.protocol === "http:" || url.protocol === "https:";
    }
    create({url,favIconUrl}){
        if(!this.isValidUrl(url)){
            return null
        }
        url = this.hostName(url)
        return {
            url,
            icon: favIconUrl || this.icon(url) || null,
            duration: 0,
        }
    }
}