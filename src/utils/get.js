export default function get(obj, path = '') {
    const keys = path.split('.');
    let value = null;
    let current = obj;
    
    for (let currentKey of keys) {
        if (currentKey) {
            if (typeof current === 'object' && current[currentKey]) {
                current = current[currentKey];
            } else {
                return value;
            }
            } else {
                break;
            }
    }
    
    value = current;
    
    return value;
}