import {Component, OnInit} from 'angular2/core';
import {Observable} from 'rxjs/Rx';
import {Http} from 'angular2/http';
import {ImageReddit} from './reddit_feed.models';
// import html from './reddit_feed.html';

// Creating RedditFeed Component
@Component({
  selector: 'reddit-feed',
  templateUrl: 'app/components/reddit_feed.html',
  styleUrls: ['app/components/reddit_feed.css'],
  providers: []
})
// Fetching data from Reddit
export class RedditFeed {

  private _reddits: Observable<Event[]>;
  private _reddittwo: Array<any>;
  private _redditDataUrl: string = 'http://www.reddit.com/r/9gag.json';

  constructor(private _http: Http) {

  }

  ngOnInit() {
    this._reddits = this._initFeed();
    this._reddits.subscribe(data => this._reddittwo.push(data));
    console.debug('data', this._reddittwo);
  }

  private _initFeed() {
    return this._http.get(this._redditDataUrl)
      .map(response => response.json())
      .map(json => <Array<any>>json.data.children)
      .map(children => children.filter(d => (
        ['png', 'jpg'].indexOf(d.data.url.split('.').pop()) != -1
      )))
      .map(children => children.map(d => new ImageReddit(d.data.id, d.data.title, d.data.url)));
  }
  private _logFeed() {
    this._reddits.subscribe(data => console.debug('data', data));
  }
}

  // this._reddits$ = this._http.get(this._redditDataUrl)
  // .map(response => {
  //   const reddit = response.json();
  //   return reddit.map((reddit) => new ImageReddit(reddit));
  // })
  // .catch(this.handleError);
  //log the stream
