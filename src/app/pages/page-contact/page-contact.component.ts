/* eslint-disable @typescript-eslint/naming-convention */
import { ChangeDetectionStrategy, Component} from '@angular/core';
import { BasePageComponent } from '@core/classes/base-page-component';
import { CoreModule } from '@core/core.module';
import { SharedModule } from '@shared/shared.module';
import { ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'owner-page-contact',
    standalone: true,
    imports: [CoreModule, SharedModule],
    templateUrl: './page-contact.component.html',
    styleUrls: ['./page-contact.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class PageContactComponent extends BasePageComponent {
    public countries = [
      { name: 'РОССИЯ', isHighlighted: false, image: 'assets/images/page-conctact-images/Russia1.svg' },
      { name: 'АРГЕНТИНА', isHighlighted: false, image: 'assets/images/page-conctact-images/Turkey2.svg' },
      { name: 'ТУРЦИЯ', isHighlighted: false, image: 'assets/images/page-conctact-images/Thailand3.svg' },
      { name: 'ЧЕРНОГОРИЯ', isHighlighted: false, image: 'assets/images/page-conctact-images/Montenegro4.svg' },
      { name: 'КАМБОДЖА', isHighlighted: false, image: 'assets/images/page-conctact-images/Kambodga5.svg' },
      { name: 'ТАЙЛАНД', isHighlighted: false, image: 'assets/images/page-conctact-images/Argentina6.svg' }
    ];
  

    public constructor(private changeDetectorRef: ChangeDetectorRef) {
        super();
    }

    public animationGoesBy = true;
    public alreadyRunning = false;

    public outOfCountrySections(): void {
      if (this.alreadyRunning) {
        return; // Если функция уже выполняется, не вызывать её повторно
    }

        this.alreadyRunning = true;

        const interval = 3500; 
        let i = 0;
    
        const changeCountry = (): void => {
            if (!this.animationGoesBy) {
                return; 
            }
          
            this.countries.forEach(country => (country.isHighlighted = false));
            // console.log(this.countries[i]);

    
            const currentCountry = this.countries[i];
    
            currentCountry.isHighlighted = true;
            i = (i + 1) % this.countries.length; 
        this.changeDetectorRef.detectChanges();
        };
    
        // changeCountry();
        setInterval(changeCountry, interval);
    }
    
    public onMouseEnter(country: any): void {
      this.countries.forEach(country => (country.isHighlighted = false));
      country.isHighlighted = true;
      this.animationGoesBy = false;
      this.alreadyRunning = true;
    }
  
    public onMouseLeave(country: any): void {
      this.animationGoesBy = true;
      country.isHighlighted = false;
    }

}
  






