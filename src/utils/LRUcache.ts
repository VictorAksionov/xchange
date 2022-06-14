// creating generic type parameters `Key`, `Value` for the types of key and value
export class LRUCache<K, V> {
    private readonly target: number;
    private readonly max: number;
    // use `Map` to store our key-value cache
    private readonly map = new Map<K, V>();

    // this constructor takes two parameter `target` and `max`, setting target capacity and maximum tolerance
    constructor(target: number, max = target + Math.max(Math.round(target / 10), 1)) {
        if (max < target) {
            throw new Error(`Max must be higher or equal to target`);
        }
        this.target = target;
        this.max = max;
    }

    public set(key: K, value: V, update = true): void {
        if (this.map.has(key)) {
            if (update) {
                // delete the existing item then re-append it
                this.map.delete(key);
            }
            this.map.set(key, value);
        } else if (this.map.set(key, value).size > this.max) {
            // delete only if size over max
            for (const key of this.map.keys()) {
                // delete the oldest items from the top of Map
                this.map.delete(key);
                // stop if target is reached
                if (this.map.size === this.target) {
                    break;
                }
            }
        }
    }

    public get(key: K, update = true): V | undefined {
        if (update) {
            // check if Map has "key" not using "get" due to ambiguity
            if (this.map.has(key)) {
                const value = this.map.get(key) as V;
                // item to bottom
                this.map.delete(key);
                this.map.set(key, value);

                return value;
            }
            return;
        }
        return this.map.get(key);
    }

    public entries(): IterableIterator<[K, V]> {
        return this.map.entries();
    }
}