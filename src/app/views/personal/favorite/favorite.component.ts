import {Component, Input, OnInit} from '@angular/core';
import {FavoriteService} from "../../../shared/services/favorite.service";
import {FavoriteType} from "../../../../types/favorite.type";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {environment} from "../../../../environments/environment";
import {CartType} from "../../../../types/cart.type";
import {CartService} from "../../../shared/services/cart.service";
import {ProductType} from "../../../../types/product.type";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit {
  count: number = 1;
  products: FavoriteType[] = [];
  serverStaticPath = environment.serverStaticPath;
  cart: CartType | null = null;
  @Input() countInCart: number | undefined = 0;
  @Input() product!: ProductType;
  @Input() isLight: boolean = false;


  constructor(private favoriteService: FavoriteService, private cartService: CartService, private activatedRouter: ActivatedRoute,) {
  }

  ngOnInit(): void {

    if (this.countInCart && this.countInCart > 1) {
      this.count = this.countInCart;
    }

    this.favoriteService.getFavorites()
      .subscribe((data: FavoriteType[] | DefaultResponseType) => {
        if ((data as DefaultResponseType).error !== undefined) {
          const error = (data as DefaultResponseType).message;
          throw new Error(error);
        }

        this.products = data as FavoriteType[];
        console.log(this.products);

      })

    this.cartService.getCart()
      .subscribe((data: CartType | DefaultResponseType) => {
        if ((data as DefaultResponseType).error !== undefined) {
          throw new Error((data as DefaultResponseType).message);
        }
        this.cart = data as CartType;
      })
  }


  getCount(productId: string): number {
    if (this.cart) {
      const item = this.cart.items.find((item) => item.product.id === productId);
      return item ? item.quantity : 1;
    }
    return 1;
  }

  isInCart(id: string): boolean {
    if (this.cart) {
      return this.cart.items.some(item => item.product.id === id);
    }
    return false;
  }

  removeFromFavorites(id: string) {
    this.favoriteService.removeFavorite(id)
      .subscribe((data: DefaultResponseType) => {
        if (data.error) {
          throw new Error(data.message);
        }
        this.products = this.products.filter(item => item.id !== id)
      })
  }


  addToCart(id: string) {
    this.cartService.updateCart(id, this.count)
      .subscribe((data: CartType | DefaultResponseType) => {
        this.cart = data as CartType;
      })
  }

  removeFromCart(id: string) {
    this.cartService.updateCart(id, 0)
      .subscribe((data: CartType | DefaultResponseType) => {
        this.cart = data as CartType;
      })
  }

  updateCount(id: string, value: number) {
    this.count = value;

    if (this.isInCart(id)) {
      this.cartService.updateCart(id, this.count)
        .subscribe((data: CartType | DefaultResponseType) => {
          if ((data as DefaultResponseType).error !== undefined) {
            throw new Error((data as DefaultResponseType).message);
          }

          this.cart = data as CartType;
        })
    }
  }

}
