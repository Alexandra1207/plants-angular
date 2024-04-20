import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PasswordRepeatDirective} from "./directives/password-repeat.directive";
import { ProductCardComponent } from './components/product-card/product-card.component';
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import { CategoryFilterComponent } from './components/category-filter/category-filter.component';
import { CountSelectorComponent } from './components/count-selector/count-selector.component';
import { LoaderComponent } from './components/loader/loader.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { CatalogSortingComponent } from './components/catalog-sorting/catalog-sorting.component';



@NgModule({
  declarations: [PasswordRepeatDirective, ProductCardComponent, CategoryFilterComponent, CountSelectorComponent, LoaderComponent, CatalogSortingComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatProgressSpinnerModule,
    FormsModule
  ],
    exports: [PasswordRepeatDirective, ProductCardComponent, CategoryFilterComponent, CountSelectorComponent, LoaderComponent, CatalogSortingComponent],

})
export class SharedModule { }
