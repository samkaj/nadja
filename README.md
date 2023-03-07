# Nadja

Nadja is a web application which fills some holes in Spotify's current functionality. I will start by creating the backend as a CLI to avoid unnecessary dependencies between back- and frontend. One goal is to make the CLI robust as an API, making it usable outside of this application.

## Features

- Create custom playlist based on parameters within Spotify's API.
- Image generator for sharing on social media.
- More powerful tools for customizing playlists.
- Reorder a playlist based on clustering similar BPMs.

## Backend

Language:
- Typescript or Go

Technology:
- API
    - Send requests with credentials as parameter
    - Return JSON with:
        - URL
        - Array with songs
        - Length
        - Name
        - Description
    - A model of how the data will look in Go, with json syntax

## Frontend

Language:
- Typescript

Technology:
- React (maybe next?)
- Tailwind
- Redux (or alternative with support for global state, this is where we save creds)

Avoid dependencies:
- Thin hook components with only knowledge of the current state.
- Write everythng when the backend is done - this needs a detailed backlog, which is a goal as well.
