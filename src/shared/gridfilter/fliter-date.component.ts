import { OnInit, ViewChild, Component, Output, Input, forwardRef , EventEmitter, 
    ApplicationRef, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { FormGroup, FormControl , FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuItem, TieredMenu, DataTable  } from 'primeng/primeng';
import { Observable } from "rxjs/Observable";



// creates an ngModel accessor to be used in components providers
const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FilterDateComponent),
  multi: true
};


@Component({
  selector: '<filter-datecomponent></filter-datecomponent>',
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR ],
  template: `<div  class="filter-block">
            
            <span style="width:80% !important" class="filter-textbox">
                <input type='date' [(ngModel)]="value" (ngModelChange)="emitValue($event)" [formControl]="filterInput" class="ui-column-filter">
            </span>
            <div class="" style="display:inline-flex;">
                         <a (click)="myClick($event)" class="dropdown-toggle">
                                <span class="Riw-filter"></span>
                         </a>
            </div>
            <p-tieredMenu styleClass="dropdown-menu"  #option [model]="optionitems" [popup]="true" appendTo="body"></p-tieredMenu>
          
          </div>`  

})


// <span style="width:80% !important" class="filter-textbox">
// <input type='text' [(ngModel)]="value" (ngModelChange)="emitValue($event)" [formControl]="filterInput" class="ui-column-filter" >
// <button type="button" class="Riw-document-with-two-columns-of-text-lines icon update" data-toggle="tooltip" title="Mass Update"></button>
// </span>


export class FilterDateComponent  implements OnInit {
    @ViewChild('option') filteroptionmenu : TieredMenu;
    public optionitems: MenuItem[];
  // value: string = '';
  // a private variable to store the value of input in our component
  private _value: any = '';
  
  
  @Input() public searchfield: any;
  //@Input() table : DataTable;
  @Output() myValue = new EventEmitter();
  @Output() optionClickCompleted: EventEmitter<any> = new EventEmitter<any>();
  
  public filterInput = new FormControl();
  
  //@Output() filterChange: EventEmitter<Array<any> = new EventEmitter<Array<any>();

  ngOnInit() 
  {
    this.optionitems  = [
            { label: 'Equal', icon: 'fa-plus', command: (event) => this.optionClick(event, 'on')  },
            { label: 'Before',icon: 'fa-angle-up', command: (event) => this.optionClick(event, 'before')  },
            { label: 'After', icon: 'fa-angle-down', command: (event) => this.optionClick(event,  'after') },
            { label: 'Clear', icon: 'fa-eraser', command:(event) => this.optionClick(event, 'clear') }
        ];
 }

  emitValue($event) {
    this.myValue.emit($event);
  }

  

  myClick($event)
  {
      this.filteroptionmenu.toggle($event);
      $event.stopPropagation();
  }

  optionClick(event:any, matchmode)
  {
    console.log('selected option' + matchmode);
    console.log(this.searchfield); //barcode column

    var colFilter =[];
    if(matchmode ==='clear')
        this.filterInput.value =='';

    colFilter.push(this.filterInput.value);
    colFilter.push(this.searchfield);
    colFilter.push(matchmode);
    this.optionClickCompleted.emit(colFilter);
    this.emitValue(event);
    this.filteroptionmenu.hide();
  }


  // get value for component from private variable
  get value(): any { return this._value; };

  // set the value (emit) to the parent model
  set value(v: any) {
    if (v !== this._value) {
      this._value = v;
      this.onChange(v);
    }
  }

  // write the value to the input
  writeValue(value: any) {
    this._value = value;
    console.log('Write value'+ this._value); 
    this.onChange(value);
  }

  onChange = (_) => {};
  onTouched = () => {};
  registerOnChange(fn: (_: any) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }

}

export class CustomTableColumnDefinition {
  public name: string = '';
  public value: string = '';
  public binding: string = '';
  public filter: string = '';
  public computedClass: any;
  public isComputed: boolean = false;
  public isAnchor: boolean = false;
  public srefBinding: string = '';
}

export class CustomTableOptions {
  public records : Observable<Array<any>>;
  public columns: Array<CustomTableColumnDefinition>;
  public rowDefns: Array<any>;
  public config: CustomTableConfig;
  public callbacks: any;
}

  export class CustomTableConfig {
    public sortBy: string = '';
    public sortDirection: string = 'desc';
    public pageSize: number = 100;
    public pageNumber: number = 1;
    public totalCount: number = 0;
    public totalPages: number = 0;
    public maxSize: number = 10;
    public showSelectCheckbox: boolean = true;
    public showSelectAll: boolean = true;
    public showSort: boolean = true;
    public clientSort: boolean = false;
    public clientPaging: boolean = false;
    public stickyHeader: boolean = true;
    public stickyHeaderOffset: number = 0;
    public stickyContainer: string = '';
  }


