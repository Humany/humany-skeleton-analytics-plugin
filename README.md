# humany-skeleton-analytics-plugin

This project will setup a skeleton plugin to display the usage of the Tracking plugin.

## Building the code

1. Ensure NodeJS and Git is installed.
2. Clone or fork this repository.
3. From the root folder, execute the following command to install the dependencies:
```
npm install
```
4. From the root folder, execute one of the following commands to generate the bundle.
```
npm run build
```
```
npm run build-dev
```
5. To watch the plugin in action
```
npm run start-dev
```

This will launch your browser and redirect you to a simple server where you can see your plugin in action.

## Legacy Support

This skeleton supports legacy versions. To use the tracking plugin on a legacy implementation simply use the following commands in your terminal:

Build:
```
npm run build-legacy
```

Dev build:
```
npm run build-dev-legacy
```

Run plugin in watch mode
```
npm run start-dev-legacy
```

When using one of the legacy commands the `src/index.legacy.js` with `public/index.legacy.html` is used, otherwise `src/index.js` and `public/index.html` is used to initialize the plugin.
