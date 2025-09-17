import { Component } from '@angular/core';
import { Login } from "./pages/login/login";
import { Header } from "./components/header/header";
import { Products } from "./pages/products/products";
import { EditProduct } from "./pages/edit-product/edit-product";

@Component({
  selector: 'app-root',
  imports: [Login, Header, Products, EditProduct],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  
}
