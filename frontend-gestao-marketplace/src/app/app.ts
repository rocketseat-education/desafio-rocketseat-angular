import { Component } from '@angular/core';
import { Login } from "./pages/login/login";
import { Header } from "./pages/header/header";

@Component({
  selector: 'app-root',
  imports: [Login, Header],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  
}
