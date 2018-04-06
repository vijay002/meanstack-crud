import { NgModule }                         from '@angular/core';
import { CommonModule }                     from '@angular/common';

import { WidgetLibraryModule }              from '@lib/src/widget-library/widget-library.module';
//import { MaterialDesignFrameworkModule }    from './material-design-framework/material-design-framework.module';

import { WidgetLibraryService }             from '@lib/src/widget-library/widget-library.service';
import { FrameworkLibraryService }          from './framework-library.service';

import { FRAMEWORK_COMPONENTS }             from './index';

//FlexLayoutSectionComponent
//import { FlexLayoutRootComponent }          from '@lib/src/framework-library/material-design-framework/flex-layout-root.component';

//import { MaterialModule, MdDatepickerModule, MdNativeDateModule } from '@angular/material';
//MaterialModule, MdDatepickerModule, MdNativeDateModule
//MaterialDesignFrameworkModule

@NgModule({
  imports:         [ CommonModule, WidgetLibraryModule 
    
     ],
  declarations:    [ ...FRAMEWORK_COMPONENTS ],
  exports:         [ ...FRAMEWORK_COMPONENTS ],
  entryComponents: [ ...FRAMEWORK_COMPONENTS ],
  providers:       [ WidgetLibraryService, FrameworkLibraryService ]
})
export class FrameworkLibraryModule { }
