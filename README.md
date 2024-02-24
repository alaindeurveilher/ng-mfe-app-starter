# Angular Micro Frontends Starter Application

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.2.0.
It uses [Native Federation](https://github.com/angular-architects/module-federation-plugin) to architect it with micro frontends.

The following explained how this project boiler plate was setup.

## Pre-requisites

Install Node.js LTS v20+, `enable corepack` in Node.js to enable __yarn__ and __pnpm__.

Install the Angular CLI version 17+ globally.

## Create the main project

To start creating this project for the first time, execute in the workspace folder of your choice in a Git Bash terminal:
- `ng new ng-mfe-app-starter --create-application false --package-manager yarn`
- Open the project in VS Code. All the commands in the next chapters are supposed to be executed in a bash terminal of VS Code in the root folder of the application, or specified otherwise.
- (or `cd ng-mfe-app-starter` in the same bash terminal)

## Create some micro frontends

We are going to use the `ng g app` to generate application micro front-ends with the Angular CLI

### Create the app

- `ng g app shell --style scss --ssr false`
- `ng g app mfe1 --style scss --ssr false`
- `ng g app mfe2 --style scss --ssr false`

### Add some components

- `ng g c navbar --project shell`
- `ng g c home --project shell`
- `ng g c not-found --project shell`

- `ng g c header --project mfe1`
- `ng g c feat1 --project mfe1`
- `ng g c feat2 --project mfe1`

- `ng g c navbar --project mfe2`
- `ng g c home --project mfe2`
- `ng g c page1 --project mfe2`
- `ng g c page2 --project mfe2`

### Add some routing in the shell

Edit `projects/shell/src/app/app.routes.ts`

```ts
import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
  // DO NOT insert routes after this one.
  // { path:'**', ...} needs to be the LAST one.
];

```

## Add some navigation

Edit the template of the navbar component in the shell (`projects/shell/src/app/navbar/navbar.component.html`) so that it is only:

```html
<nav [style]="{display: 'flex', gap: '0.5rem'}">
  <span>LOGO</span>
  <a routerLink="/">Home</a>
  <a routerLink="/mfe1">MFE1</a>
  <a routerLink="/mfe2">MFE2</a>
</nav>
```

Don't forget to import _RouterModule_ in the _navbar.component.ts_: `imports: [RouterModule],`.

Edit the template of the app component in the shell (`projects/shell/src/app/app.component.html`) so that it is only:

```html
<app-navbar />

<div [style]="{display: 'flex', flexDirection: 'column', padding: '1rem'}">
  <p>I am part of the host layout. All components are loaded in the dotted section below.</p>
  <div
    [style]="{padding: '1rem', borderRadius: '0.25rem', borderWidth: '2px', borderColor: 'rgb(14 165 233)', borderStyle: 'dashed'}">
    <router-outlet />
  </div>
  <p>I am part of the host layout.</p>
</div>
```

Don't forget to import _NavbarComponent_ in the _app.component.ts_: `imports: [RouterOutlet, NavbarComponent],`.

## Run and test the projects

Note: The port __4200__ will be reserved for the __shell__ application.

- `ng serve mfe1 -o --port 4201`
- `ng serve mfe2 -o --port 4202`
- `ng serve shell -o --port 4200`

## Add Native Federation

- `yarn add @angular-architects/native-federation@latest -D`

### Making an application a remote (Micro Frontend):

- `ng g @angular-architects/native-federation:init --project mfe1 --port 4201 --type remote`
- `ng g @angular-architects/native-federation:init --project mfe2 --port 4202 --type remote`

### Making an application a host (shell):

- `ng g @angular-architects/native-federation:init --project shell --port 4200 --type dynamic-host`

## Configuring the Host

`projects/shell/federation.config.js`

Nothing to modify here, the generated file looks like:

```js
const { withNativeFederation, shareAll } = require('@angular-architects/native-federation/config');

module.exports = withNativeFederation({

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

  skip: [
    'rxjs/ajax',
    'rxjs/fetch',
    'rxjs/testing',
    'rxjs/webSocket',
    // Add further packages you don't need at runtime
  ]
  
});
```

## Configuring the Remote

`projects/mfe1/federation.config.js`

Nothing to modify here, the generated file looks like:

```js
const { withNativeFederation, shareAll } = require('@angular-architects/native-federation/config');

module.exports = withNativeFederation({

  name: 'mfe1',

  exposes: {
    './Component': './projects/mfe1/src/app/app.component.ts',
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

  skip: [
    'rxjs/ajax',
    'rxjs/fetch',
    'rxjs/testing',
    'rxjs/webSocket',
    // Add further packages you don't need at runtime
  ]
  
});
```

## Initializing the Host

When bootstrapping the host (shell), Native Federation (`projects\shell\src\main.ts`) is initialized (automatically generated file):

```js
import { initFederation } from '@angular-architects/native-federation';

initFederation('/assets/federation.manifest.json')
  .catch(err => console.error(err))
  .then(_ => import('./bootstrap'))
  .catch(err => console.error(err));
```

The function points to a federation manifest. This manifest lists the individual remotes. It can be exchanged when deploying the solution. Hence, you can adapt the build to the respective environment.

This is what the (also generated) federation manifest (`projects\shell\src\assets\federation.manifest.json`) looks like:

```json
{
	"mfe1": "http://localhost:4201/remoteEntry.json",
	"mfe2": "http://localhost:4202/remoteEntry.json"
}
```

Native Federation generates the `remoteEntry.json`. It contains metadata about the individual remote.

If you follow this tutorial, ensure this entry points to port `4201` for mfe1 and port `4202` for mfe2 (!).

## Initializing the Remote

When bootstrapping your remote (`projects\mfe1\src\main.ts`), Native Federation is initialized too:

```ts
import { initFederation } from '@angular-architects/native-federation';

initFederation()
  .catch((err) => console.error(err))
  .then((_) => import('./bootstrap'))
  .catch((err) => console.error(err));
```

After the initialization, it loads the file `bootstrap.ts` starting your Angular application.

## Loading the Remote

For loading a component (or any other building block) exposed by a remote into the host, use Native Federation's `loadRemoteModule` function together with lazy loading (`projects\shell\src\app\app.routes.ts`):

```ts
import { Routes } from '@angular/router';
// Add this import:
import { loadRemoteModule } from '@angular-architects/native-federation';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  // Add these routes:
  { path: 'mfe1', loadComponent: () => loadRemoteModule('mfe1', './Component').then((m) => m.AppComponent) },
  { path: 'mfe2', loadComponent: () => loadRemoteModule('mfe2', './Component').then((m) => m.AppComponent) },
  { path: '**', component: NotFoundComponent },
  // DO NOT insert routes after this one.
  // { path:'**', ...} needs to be the LAST one.
];
```

## Add "concurrently"

- Install concurrently: `yarn add concurrently@latest -D`
- Add the script in package.json: `"start:all": "concurrently \"ng serve mfe1\" \"ng serve mfe2\" \"ng serve shell\"",` 

## Starting the application

- run `yarn start:all`,
- or start first the micro front-ends then start the shell:
  - start the remotes: `ng serve mfe1 -o`, then `ng serve mfe2 -o`
  - once the remotes have started, start the shell: `ng serve shell -o`

Now, by clicking at the menu items MFE1 and MFE2 in the navigation, you can load the remote directly into the host.
