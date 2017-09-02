var Trie = /** @class */ (function () {
    function Trie(value) {
        this.terminal = false;
        this.value = value;
        this.children = new Map();
    }
    Trie.prototype.add = function (c) {
        var val;
        if (this.value == null) {
            val = c;
        }
        else {
            val = this.value + c;
        }
        this.children.set(c, new Trie(val));
    };
    Trie.prototype.insert = function (word) {
        var node = this;
        for (var i = 0; i < word.length; i++) {
            var c = word.charAt(i);
            if (!node.children.has(c)) {
                node.add(c);
            }
            node = node.children.get(c);
        }
        node.terminal = true;
    };
    Trie.prototype.autoComplete = function (prefix) {
        var node = this;
        var ret = [];
        for (var i = 0; i < prefix.length; i++) {
            var c = prefix.charAt(i);
            if (!node.children.has(c)) {
                return [];
            }
            node = node.children.get(c);
        }
        return this.flatten(node.allPrefixes());
    };
    Trie.prototype.allPrefixes = function () {
        var results = [];
        if (this.terminal) {
            results.push(this.value);
        }
        this.children.forEach(function (value, key) {
            var child = value;
            var childPrefixes = child.allPrefixes();
            results = results.concat([childPrefixes]);
        });
        return results;
    };
    Trie.prototype.flatten = function (arr) {
        var flat = [].concat.apply([], arr);
        return flat.some(Array.isArray) ? this.flatten(flat) : flat;
    };
    return Trie;
}());
