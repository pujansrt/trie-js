# trie-js
Trie Data Structure Implementation for Autocomplete, Dictionary Search

# How to use
Include trie.js file

```
var trie = new Trie();
trie.insert('ant');
trie.insert('and');
trie.insert('antique');
console.log(trie.autoComplete('ant')); //['ant','antique']
```

# Performance
Trie of 100,000 Unique words, it took 23 ms to retrieve one.