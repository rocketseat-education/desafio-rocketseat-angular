import { Component } from '@angular/core';
import { Login } from "./pages/login/login";
import { Header } from "./pages/header/header";
import { Products } from "./pages/products/products";

@Component({
  selector: 'app-root',
  imports: [Login, Header, Products],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  
}
