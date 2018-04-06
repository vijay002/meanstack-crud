import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { JsonSchemaFormService } from '@lib/src/json-schema-form.service';
import { buildTitleMap } from '@lib/src/shared';

@Component({
  selector: 'radios-widget',
  template: `
    <label *ngIf="options?.title"
      [attr.for]="'control' + layoutNode?._id"
      [class]="options?.labelHtmlClass"
      [style.display]="options?.notitle ? 'none' : ''"
      [innerHTML]="options?.title"></label>
      <div [ngSwitch]="layoutOrientation">

        <!-- 'horizontal' = radios-inline or radiobuttons -->
        <div *ngSwitchCase="'horizontal'"
          [class]="options?.htmlClass">
          <label *ngFor="let radioItem of radiosList"
            [attr.for]="'control' + layoutNode?._id + '/' + radioItem?.value"
            [class]="options?.itemLabelHtmlClass +
              ((controlValue + '' === radioItem?.value + '') ?
              (' ' + options?.activeClass + ' ' + options?.style?.selected) :
              (' ' + options?.style?.unselected))">
            <input type="radio"
              [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
              [attr.readonly]="options?.readonly ? 'readonly' : null"
              [attr.required]="options?.required"
              [checked]="radioItem?.value === controlValue"
              [class]="options?.fieldHtmlClass"
              [disabled]="controlDisabled"
              [id]="'control' + layoutNode?._id + '/' + radioItem?.value"
              [name]="controlName"
              [value]="radioItem?.value"
              (change)="updateValue($event)">
            <span [innerHTML]="radioItem?.name"></span>
          </label>
        </div>

        <!-- 'vertical' = regular radios -->
        <div *ngSwitchDefault>
          <div *ngFor="let radioItem of radiosList"
            [class]="options?.htmlClass">
            <label
              [attr.for]="'control' + layoutNode?._id + '/' + radioItem?.value"
              [class]="options?.itemLabelHtmlClass +
                ((controlValue + '' === radioItem?.value + '') ?
                (' ' + options?.activeClass + ' ' + options?.style?.selected) :
                (' ' + options?.style?.unselected))">
              <input type="radio"
                [attr.aria-describedby]="'control' + layoutNode?._id + 'Status'"
                [attr.readonly]="options?.readonly ? 'readonly' : null"
                [attr.required]="options?.required"
                [checked]="radioItem?.value === controlValue"
                [class]="options?.fieldHtmlClass"
                [disabled]="controlDisabled"
                [id]="'control' + layoutNode?._id + '/' + radioItem?.value"
                [name]="controlName"
                [value]="radioItem?.value"
                (change)="updateValue($event)">
              <span [innerHTML]="radioItem?.name"></span>
            </label>
          </div>
        </div>

      </div>`,
})
export class RadiosComponent implements OnInit {
  formControl: AbstractControl;
  controlName: string;
  controlValue: any;
  controlDisabled: boolean = false;
  boundControl: boolean = false;
  options: any;
  layoutOrientation: string = 'vertical';
  radiosList: any[] = [];
  @Input() formID: number;
  @Input() layoutNode: any;
  @Input() layoutIndex: number[];
  @Input() dataIndex: number[];

  constructor(
    private jsf: JsonSchemaFormService
  ) { }

  ngOnInit() {
    this.options = this.layoutNode.options || {};
    if (this.layoutNode.type === 'radios-inline' ||
      this.layoutNode.type === 'radiobuttons'
    ) {
      this.layoutOrientation = 'horizontal';
    }
    this.radiosList = buildTitleMap(
      this.options.titleMap || this.options.enumNames,
      this.options.enum, true
    );
    this.jsf.initializeControl(this);
  }

  updateValue(event) {
    this.jsf.updateValue(this, event.target.value);
  }
}
