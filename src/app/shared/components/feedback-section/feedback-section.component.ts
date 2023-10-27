import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { BaseComponent } from '@app/core/classes/base-component';
import { ThemeService } from '@app/core/services/theme.service';
import { takeUntil } from 'rxjs';
import Typed from 'typed.js';

interface IRoleOption {
    label: string;
    value: string;
    icon: string;
    description: string;
}

@Component({
    selector: 'owner-feedback-section',
    templateUrl: './feedback-section.component.html',
    styleUrls: ['./feedback-section.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackSectionComponent extends BaseComponent {
    public isLight = this._themeService.isLight;

    public roleOptions: IRoleOption[] = [
        {
            label: 'Член команды',
            value: 'team_member',
            icon: 'teamMemberIcon',
            description:
            // eslint-disable-next-line quotes
                'It\'s designed in the shape of a blue monster and there is only one available. This NFT is a great opportunity to establish a unique place in the digital art world.',
        },
        {
            label: 'Представитель региона',
            value: 'regional_representative',
            icon: 'partnerIcon',
            description:
                'Ipsum in conubia quam mollis blandit tempor maecenas orci mi aliquet, convallis placerat lorem hac bibendum ridiculus massa metus imperdiet, purus ex etiam tristique dis tortor fermentum turpis aptent.',
        },
        {
            label: 'Инвестор',
            value: 'investor',
            icon: 'investorIcon',
            description:
                'Quisque enim nulla himenaeos scelerisque tempor amet curae, sodales rutrum sed diam sociosqu vitae malesuada dignissim.',
        },
    ];
    public selectedRoleIcon: IRoleOption['icon'] | null = null;
    public selectedRoleDescription: IRoleOption['description'] | null = null;
    public modalVisible = false;
    public selectOpen = false;
    private _descriptionTyped: Typed | null = null;
    public feedbackForm!: UntypedFormGroup;

    public constructor(
        private _themeService: ThemeService,
        private _changeDetector: ChangeDetectorRef,
        private _fb: UntypedFormBuilder,
    ) {
        super();

        this._themeService.currentTheme$.pipe(takeUntil(this._onDestroy$)).subscribe(_ => {
            this.isLight = this._themeService.isLight;
            this._changeDetector.markForCheck();
        });
    }

    private _showModal(): void {
        this.modalVisible = true;
    }

    public handleOpenChange(open: boolean): void {
        this.selectOpen = open;
    }

    public handleRoleSelect(value: IRoleOption['value']): void {
        const option = this.roleOptions?.find(el => el.value === value) || null;
        if (!option) return;

        this.selectedRoleIcon = option.icon;
        this.selectedRoleDescription = option?.description || null;

        if (this._descriptionTyped) {
            if (this._descriptionTyped.cursor) this._descriptionTyped.cursor.remove();
            this._descriptionTyped.stop();
        }

        this._descriptionTyped = new Typed('#role-description', {
            strings: [option.description],
            typeSpeed: 20,
            backSpeed: 4,
            showCursor: true,
            smartBackspace: true,
            onComplete: (self): (() => void) => {
                const timeout = setTimeout(() => {
                    self.cursor.remove();
                }, 3000);
                return () => clearTimeout(timeout);
            },
        });
    }

    public handleSubmit(): void {
        if (this.feedbackForm.valid) {
            this._sendFormData(this.feedbackForm.value).then(() => {
                this._showModal();
            });
        } else {
            Object.values(this.feedbackForm.controls).forEach(control => {
                if (control.invalid) {
                    control.markAsDirty();
                    control.updateValueAndValidity({ onlySelf: true });
                }
            });
        }
    }

    private async _sendFormData(data: any): Promise<void> {
        return new Promise((resolve): void => {
            // await fetch('https://httpbin.org/get');
            // console.log('Data sent', data);
            resolve(data);
        });
    }

    private _resetForm(): void {
        const onComplete = (): void => {
            this.feedbackForm.reset();
            this.selectedRoleDescription = null;
        };
        if (this._descriptionTyped) {
            this._descriptionTyped.stop();
            this._descriptionTyped = new Typed('#role-description', {
                strings: [''],
                typeSpeed: 20,
                backSpeed: 10,
                showCursor: false,
                smartBackspace: true,
                onComplete,
            });
        }
    }

    private _closeModal(): void {
        this.modalVisible = false;
        this._resetForm();
    }

    public handleOk(): void {
        this._closeModal();
    }

    public handleCancel(): void {
        this._closeModal();
    }

    private _initForm(): void {
        this.feedbackForm = this._fb.group({
            userName: [null, [Validators.required]],
            phone: [null, [Validators.required]],
            role: [null, [Validators.required]],
        });
    }

    public ngOnInit(): void {
        this._initForm();

        if (typeof document === 'undefined') return;

        /* const typed = new Typed('#title', {
            strings: ['Создадим<br>будущее вместе'],
            typeSpeed: 70,
            autoInsertCss: true,
            showCursor: false,
        }); */
    }
}
