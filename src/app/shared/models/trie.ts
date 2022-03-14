export class TrieNode {

    char: string;
    children: {};
    topWords: string[];

    constructor(char: string) {
        
        this.char = char;
        this.children  =  new Map<string, TrieNode>();
    }
    
}