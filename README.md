# UI for the Züritrails Bikecounter app.

Dashboard for all devices that are in use to monitor mountain bike traffic on the trails round Zürich.

## ng serve (will start dev server on http://localhost:4200)
Make sure you set an alias to the ng command if not globally available.
`alias ng="./node_modules/@angular/cli/bin/ng.js"`

or just use it like this:
`./node_modules/@angular/cli/bin/ng.js generate component device-details`


## node version
run n to check or install a node version (or node version manager nvm)

e.g. `sudo n lts` --> will install the newest LTS version.

## Build and publish
ng build --output-path build
Push the changes to the repo and the webserver will pick it up automatically.

