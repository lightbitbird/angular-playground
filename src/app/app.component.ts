import {Component, OnInit} from '@angular/core';
import {range, of, interval, zip} from 'rxjs';
import {map, mergeMap} from 'rxjs/operators';
import {NotificationService} from './utility/notification.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-playground';
  public zoom = 0.8;
  public translate = {x: -3, y: 5};

  constructor(private notifyService: NotificationService, private toastr: ToastrService) {

  }

  ngOnInit(): void {
  }

  showToaster() {
    this.notifyService.showSuccess('Data shown successfully !!', 'Notification');
  }

  showToasterWithTimeout() {
    this.notifyService.showSuccessWithTimeout('Data shown successfully !!', 'Notification', 1000);
  }

  showHtmlToaster() {
    this.notifyService.showHTMLMessage('<h2>Data shown successfully !!</h2>', 'Notification');
  }

  onClick(): void {
    // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    // Add 'implements OnInit' to the class.
    of(5).pipe(mergeMap(value => {
      return zip(range(1, value).pipe(() => interval(500)));
    }))
      .pipe(map(values => values[0]))
      .subscribe(value => console.log(value));
  }

  public svgTransform(): string {
    // @link https://www.safaribooksonline.com/library/view/svg-essentials/0596002238/ch05s06.html
    const centerX = 50;
    const centerY = 0;

    const offX = -centerX * (this.zoom - 1);
    const offY = -centerY * (this.zoom - 1);
    const trsl = `translate(${offX}, ${offY})`;

    return `${trsl} translate(${this.translate.x}, ${this.translate.y}) scale(${this.zoom}, ${this.zoom})`;
  }

  public plus() {
    this.zoom += 0.2;
    this.svgTransform();
  }

  public minus() {
    this.zoom -= 0.2;
    this.svgTransform();
  }
}

