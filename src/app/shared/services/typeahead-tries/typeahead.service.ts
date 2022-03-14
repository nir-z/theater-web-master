import { Injectable } from '@angular/core';
import { TrieNode} from '../../models/trie'
import { LocalStorageService} from '../../services/local-storage/local-storage.service'
import { LOCAL_STORAGE_KEYS} from '../../data'

@Injectable({
  providedIn: 'root'
})
export class TypeaheadService {

  head: TrieNode;

  constructor(private storage: LocalStorageService)
  { 


    this.head = this.storage.getFromStorage<TrieNode>(LOCAL_STORAGE_KEYS.typeaheads.typeaheadTrie, true);
    debugger;
    if(this.head == null)
    {
        //head node
        this.head = new TrieNode("");
        //construct first level trie with all letters in alphabet
        for (let i = 0; i < 26; i++) { 

          let c = (i+10).toString(36);
          this.head.children[c]=  new TrieNode(c);

        }

        this.storage.setToStorage(LOCAL_STORAGE_KEYS.typeaheads.typeaheadTrie, this.head);
    }
  }



  searchNodeByPrefix(prefix: string)
  {

    debugger;
    let node = this.head;

    for (var i = 0; i < prefix.length; i++) 
    {
    
        if(node.children[prefix[i]])
        {

          node = node.children[prefix[i]];
      
        }
        else
        {
          let newChildNode = new TrieNode(prefix[i].toLowerCase());
          node.children[prefix[i]] = newChildNode;
          return newChildNode;
        }

    }



    return node;

  }


  InsertWordsToTrie(searchTerm: string, topResultsWords: string[])
  {

    let node = this.head;

    for (var i = 0; i < searchTerm.length; i++) 
    {
    
        if(node.children[searchTerm[i]])
        {

          node = node.children[searchTerm[i]];
      
        }
        else
        {
          let newChildNode = new TrieNode(searchTerm[i].toLowerCase());
          node.children[searchTerm[i]] = newChildNode;
          node = newChildNode;
        }

    }

    debugger;
    this.storage.setToStorage(LOCAL_STORAGE_KEYS.typeaheads.typeaheadTrie, this.head);
    node.topWords  = topResultsWords;

  }



}
