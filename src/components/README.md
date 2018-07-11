# Includes

Commonly Used Components

## Folders / Files

### Tree

+ComponentExample1  
  +__tests__  
    index.js  
  +components  
  index.js  
  messages.js (optional)  
+ComponentExample2  
  ...  

### Files Description

Every component has a root folder with the exact component name (ie. ComponentExample1)  
`__tests__` is for testing files. Folder name should be __tests__ to be considered by test engine.  
`components` is a folder to keep the sub components which are used to render the main component.  
`index.js` has a main component engine.  
`messages.js` is to keep the pairs of id and defaultMessage for multilingual titles/subheadings/descriptions/captions/...  
