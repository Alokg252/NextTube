
export class VideoSet {
    constructor() {
        this.uniqueObjects = new Map();
    }

    generateKey(obj) {
        // Create a unique key using specific properties (avoid full JSON.stringify)
        return `${obj.vid}-${obj.pid}`; 
    }

    add(obj) {
        const key = this.generateKey(obj);
        if (!this.uniqueObjects.has(key)) {
            this.uniqueObjects.set(key, obj);
        }
    }

    getValues() {
        return [...this.uniqueObjects.values()];
    }
}

export class PlaylistSet {
    constructor() {
        this.uniqueObjects = new Map();
    }

    generateKey(obj) {
        // Create a unique key using specific properties (avoid full JSON.stringify)
        return `$${obj.pid}`; 
    }

    add(obj) {
        const key = this.generateKey(obj);
        if (!this.uniqueObjects.has(key)) {
            this.uniqueObjects.set(key, obj);
        }
    }

    getValues() {
        return [...this.uniqueObjects.values()];
    }
}