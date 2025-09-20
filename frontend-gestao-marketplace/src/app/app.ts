import { Component } from '@angular/core';
import { Login } from "./pages/login/login";
import { Header } from "./components/header/header";
import { Products } from "./pages/products/products";
import { NewProduct } from "./pages/new-product/new-product";

@Component({
  selector: 'app-root',
  imports: [Login, Header, Products, NewProduct],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  
}
