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
  isProductInCart = false;

  // isInCart: boolean = false;

  constructor(private favoriteService: FavoriteService, private cartService: CartService, private activatedRouter: ActivatedRoute,) {
  }

  ngOnInit(): void {

    // this.product.countInCart = this.count;
    if (this.countInCart && this.countInCart > 1) {
      // this.count = this.product.countInCart !== undefined ? this.product.countInCart : 1;
      // // this.count = this.product.countInCart;
      this.count = this.countInCart;
      // console.log(t)
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
        console.log(this.cart);
        // this.products.forEach(product => {
        //   if(this.cart) {
        //     const cartItem = this.cart.items.find(item => item.product.id === product.id);
        //     if (cartItem) {
        //       product.count = cartItem.quantity;
        //     }
        //   }
        // });
        // this.products = this.products.map(product => ({ ...product, count: 1 }));

      })
  }


  getCount(productId: string): number {
    if (this.cart) {
      const item = this.cart.items.find((item) => item.product.id === productId);
      // console.log(item);
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

  updateCartStatus(id: string) {
    if (this.cart) {
      const isInCart = this.cart.items.some(item => item.product.id === id);
      if (isInCart) {
        this.isProductInCart = true;
      } else {
        this.isProductInCart = false;
      }
    }
  }

  removeFromCart(id: string) {
    this.cartService.updateCart(id, 0)
      .subscribe((data: CartType | DefaultResponseType) => {
        this.cart = data as CartType;

        // if ((data as DefaultResponseType).error !== undefined) {
        //   throw new Error((data as DefaultResponseType).message);
        // }
        // this.countInCart = 0;
        // this.count = 1;
        this.products.forEach(product => {
          if(this.cart) {
            const cartItem = this.cart.items.find(item => item.product.id === product.id);
            if (cartItem) {
              product.count = cartItem.quantity;
            }
          }
        });
      })
  }

  updateCount(id: string, value: number) {
  // updateCount(value: number) {
    this.count = value;
  //   this.cartService.updateCart(this.product.id, this.count)
  //       .subscribe((data: CartType | DefaultResponseType) => {
  //         this.cart = data as CartType;
  //         // if ((data as DefaultResponseType).error !== undefined) {
  //         //   throw new Error((data as DefaultResponseType).message);
  //         // }
  //         //
  //         // this.cart = data as CartType;
  //
  //       })

    if (this.isInCart(id)) {
      this.cartService.updateCart(id, this.count)
        .subscribe((data: CartType | DefaultResponseType) => {
          if ((data as DefaultResponseType).error !== undefined) {
            throw new Error((data as DefaultResponseType).message);
          }

          this.cart = data as CartType;
          // this.count = this.countInCart(id);
        })
    }
  }

}
