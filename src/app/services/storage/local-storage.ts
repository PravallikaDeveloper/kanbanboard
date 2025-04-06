
export function setLocalStorage(key: string, value: any) {
    localStorage.removeItem(key);
    localStorage.setItem(key, JSON.stringify(value));
}

export function getLocalStorage(key: string): any {
    const d = localStorage.getItem(key);
    return d ? JSON.parse(d): null;
}

export const storage = {
    dispatch: (key: any, data: any) => {
        const event = new CustomEvent(key, {detail: data});
        window.dispatchEvent(event);
    },
    subscribe: (key: any, callback: any) => {
        window.addEventListener(key, (evt)=>{
            callback(evt);
        })

    }
}