import * as $ from 'jquery';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public selectedIndex : number = 0;
  public title = 'ScrapActionList';
  public shown : boolean = true;
  public user : User | undefined = Object.create(null);
  public dropdwonMenu : [];
  public sidebar : [];

  constructor(private router  : Router,
              private login   : AuthService) { }

  ngOnInit(): void {
    this.selectedIndex = Number(sessionStorage.getItem('index')) || 0;

    $("#menu-toggle").click((e:any)=> {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });

    this.user = this.login.getLoggedUser();

    this.title = window.location.origin.includes('localhost')? 'Test server' : 'ScrapActionList';
    // this.getMode();
  }

  public goTo(route : string[],index : number) : void{
    this.selectedIndex = index;
    sessionStorage.setItem('index',String(index));
    this.router.navigate(route);
  }

  public logout() : void {
    this.login.logout();
    this.router.navigate(['auth','login']);
  }

  public handleClick(event : string){
    switch(event){
      case 'logout':
        this.logout();
        break;
      default:
        console.log('Not yet implemented');
    }
  }

  // private getMode() : void{
  //   let opt = this.publicDropdown.filter(p => p.listener == 'dark')[0];
  //   if (!opt){
  //     return;
  //   }
  //   if( this.isDarkMode() ){
  //     opt.title = 'Modo día';
  //     opt.icon = 'fas fa-sun';
  //   }else{
  //     opt.title = 'Modo noche';
  //     opt.icon = 'fas fa-moon';
  //   }
  // }

  // public isDarkMode() : boolean{
  //   const darkMode = localStorage.getItem('dark') || 'false';
  //   return darkMode == 'true';
  // }

  // private toggleDarkMode() : void{
  //   const html = document.getElementsByTagName('html')[0];

  //   if(this.isDarkMode() ){
  //     localStorage.setItem('dark', 'false');
  //     html.dataset.theme = '';
  //   } else { 
  //     localStorage.setItem('dark', 'true');
  //     html.dataset.theme = 'dark-mode';
  //   }

  //   this.getMode();
  // }

  public getTitle(){
    return 'Title';
    // if(this.router.url.includes('usuarios')){
    //   return 'Configuración';
    // }
    // return this.sidebar[this.selectedIndex].detail;
  }

}
