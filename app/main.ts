import {bootstrap}  from 'angular2/platform/browser';
import {RedditFeed} from './components/reddit_feed';
import {HTTP_PROVIDERS} from 'angular2/http';
// import { enableProdMode } from '@angular/core';
// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import 'rxjs/add/operator/map';

bootstrap(RedditFeed, [...HTTP_PROVIDERS]).catch(err => console.error(err));
