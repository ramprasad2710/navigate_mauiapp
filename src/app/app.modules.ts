import { CUSTOM_ELEMENTS_SCHEMA, NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }  from './app.component';
import { MatTableModule } from '@angular/material/table';
import { PeopleListComponent } from './pages/general/people/people-list.component'
import { PersonEditComponent } from './pages/general/people/person-edit.component';
import { TabComponent } from './pages/general/tabs/tab.component';
import { TabsComponent } from './pages/general/tabs/tabs.component';
import { DynamicTabsDirective } from './pages/general/tabs/dynamic-tabs.directive';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    TabsComponent,
    TabComponent,
    DynamicTabsDirective,
    PersonEditComponent,
    PeopleListComponent,
  ],
  imports: [ MatTableModule, CommonModule,FormsModule, MatFormFieldModule, MatTableModule, 
    ReactiveFormsModule ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  exports: [TabsComponent, TabComponent, PeopleListComponent, PersonEditComponent],
  providers: [DynamicTabsDirective]
})
export class AppModule { }