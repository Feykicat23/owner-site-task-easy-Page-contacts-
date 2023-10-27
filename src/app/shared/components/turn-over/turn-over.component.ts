import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
    selector: 'owner-turn-over',
    templateUrl: './turn-over.component.html',
    styleUrls: ['./turn-over.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TurnOverComponent {
    @HostBinding('class.is-mobile-device') public isMobileDevice = false;

    public constructor(
        private _deviceService: DeviceDetectorService,
    ) {
        this.isMobileDevice = this._deviceService.getDeviceInfo().deviceType === 'mobile';
    }
}
