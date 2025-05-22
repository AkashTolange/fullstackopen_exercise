title spa-new-note

note over browser:
JavaScript creates note object from form
adds it to client side notes array
and re-renders the client view.
It creates a POST request to new_note_spa url
containing the new note as JSON-data
end note

browser->server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa

note over server:
server creates a new note object,
and adds it to an array called notes,
which is represented as data.json
end note 

server-->browser: 201 created
