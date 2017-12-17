import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Logger} from 'angular2-logger/core';
import {HttpService} from '../app.service';
import {Video} from '../globals';

@Component({
  selector: 'app-replay-page',
  templateUrl: './replay-page.component.html',
  styleUrls: ['./replay-page.component.css']
})
export class ReplayPageComponent implements OnInit {
  Video = Video;

  constructor(private activatedRoute: ActivatedRoute,
              private _http: HttpService,
              private _logger: Logger) {
    // this.video = {'type': 'none'};
  }

  ngOnInit() {
    let token: string;
    this.activatedRoute.params.subscribe((params: Params) => {
      token = params['token'];
    });
    this._http.get('/api/replay?' + token)
      .map(res => res.json())
      .subscribe(
        data => {
          this.Video = data;
        },
        err => {
          this._logger.error(err);
        },
      );

  }
}
