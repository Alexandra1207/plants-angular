import {Component, ElementRef, HostListener, OnInit} from '@angular/core';
import {ActiveParamsType} from "../../../../types/active-params.type";
import {Router} from "@angular/router";

@Component({
  selector: 'catalog-sorting',
  templateUrl: './catalog-sorting.component.html',
  styleUrls: ['./catalog-sorting.component.scss']
})
export class CatalogSortingComponent implements OnInit {

  sortingOpen = false;
  sortingOptions: { name: string, value: string }[] = [
    {name: 'От А до Я', value: 'az-asc'},
    {name: 'От Я до А', value: 'az-desc'},
    {name: 'По возрастанию цены', value: 'price-asc'},
    {name: 'По убыванию цены', value: 'price-desc'},
  ];
  activeParams: ActiveParamsType = {types: []};

  constructor(private elementRef: ElementRef,private router: Router) { }

  ngOnInit(): void {
  }

  toggleSorting() {
    this.sortingOpen = !this.sortingOpen;
  }


  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.sortingOpen = false;
    }
  }

  sort(value: string) {
    this.activeParams.sort = value;
    this.router.navigate(['/catalog'], {
      queryParams: this.activeParams
    })
  }

}
