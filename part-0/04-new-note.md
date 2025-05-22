sequenceDiagram
    participant browser
    participant server

    browser->>server: GET https://dogworld.com/home
    activate server
    server-->>browser: HTML document (Dog Infor Page)
    deactivate server

    browser->>server: GET https://dogworld.com/styles/dogstyle.css
    activate server
    server-->>browser: the css file (styling for dog inofo)
    deactivate server

    browser->>server: GET https://dogworld.com/scripts/dogscript.js
    activate server
    server-->>browser: the JavaScript file (fetch logic)
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server (about dog breeds

    browser->>server: GET https://dogworld.com/api/breeds.json
    activate server
    server-->>browser: [{ "breed": "Labrador Retriever", "origin":"Canada", { "breed": "Tinku", "origin": "Nepal" }, ... ]
    deactivate server

    Note right of browser: The browser executes the callback function that renders the dog breeds and origins on the page. 