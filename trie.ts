/**
* 
* @author Pujan Srivastava
*/
class Trie {
    children: any;
    value: string;
    terminal: boolean = false;

    constructor(value?: string) {
        this.value = value;
        this.children = new Map<string, Trie>();
    }

    add(c: string) {
        let val:string;
        if (this.value == null) {
            val = c;
        } else {
            val = this.value + c;
        }
        this.children.set(c, new Trie(val));
    }

    insert(word:string) {
        let node:Trie = this;
        for (let i= 0; i < word.length;i++){
            let c = word.charAt(i);
            if (!node.children.has(c)) {
                node.add(c);
            }
            node = node.children.get(c);
        }
        node.terminal = true;
    }

    autoComplete(prefix:string) {
        let node:Trie = this;
        let ret = [];
        for (let i = 0; i < prefix.length; i++) {
            let c = prefix.charAt(i);

            if (!node.children.has(c)) {
                return [];
            }
            node = node.children.get(c);
        }
        return this.flatten(node.allPrefixes());
    }

    allPrefixes() {
        let results = [];

        if (this.terminal) {
            results.push(this.value);
        }

        this.children.forEach((value, key) => {
            let child:Trie = value;
            let childPrefixes = child.allPrefixes();
            results = [...results, childPrefixes];  
        });

        return results;
    }

    flatten(arr) {
        const flat = [].concat(...arr);
        return flat.some(Array.isArray) ? this.flatten(flat) : flat;
    }
}