```mermaid
sequenceDiagram
  participant browser
  participant server

  Note right of browser: javascript contains note object from form adds it to client side  notes array and re-renders the clients view. it creates a POST request to new_note_spa url containing the new note as JSON data

  browser->> server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
  activate server

  Note left of server: server creates a new note object, and adds it to an array called notes, which is represented as data.json


 server-->> browser: 201 created
 deactivate server
 ```