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

### .htaccess for angular deep links
When deploying the .htaccess may get deleted.
Copy the following content to the .htaccess file (same level as index.html)

```
RewriteEngine on
RewriteCond %{REQUEST_FILENAME} -s [OR]
RewriteCond %{REQUEST_FILENAME} -l [OR]
RewriteCond %{REQUEST_FILENAME} -d
RewriteRule ^.*$ - [NC,L]

RewriteRule ^(.*) /index.html [NC,L]
```

### How to add a new trail with counter to the system
1. Copy the EUI from the TTN App and my give the device a name to remember
2. Go to GCP Firestore: Create an entry in the collection 'internal-deviceId-trail-ct' (use: add similar document)
3. Go to GCP Firestore: Add entry to the collection 'internal-recent-status'  (use: add similar document)
4. Go to GCP Firestore: Optional: Add new collection for the new trail e.g. 'my-new-trail-xy'
5. In this repository: Add new entry in the `Trails.ts` file.
6. Set visibility of trail to roles. Hidden true means, that only "admin" role can see this trail and "user" role not.

