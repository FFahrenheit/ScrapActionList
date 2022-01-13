import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/shared/alert';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form : FormGroup;
  public showPassword = false;

  constructor(private fb      : FormBuilder,
              private login   : AuthService,
              private alert   : AlertService,
              private router  : Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: [localStorage.getItem('remember-user')||'', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])]
    });
  }

  public get(ctrl : string) : AbstractControl{
    return this.form.controls[ctrl];
  }

  public getClass(controlName : string) : string{
    let control = this.get(controlName);
    if(!control.touched){
      return '';
    };
    return control.hasError('required') ? 'is-invalid' : 'is-valid';
  }

  public checkLogin(resp){
    this.alert.clear();
    if(resp){
      this.alert.success('Successful authentication');
      setTimeout(() => {
        this.router.navigate(['create', 'details']); //VERIFY!!!
      }, 2000);
    }else{
      this.alert.error('Failed to authenticate');
      this.get('password').setValue('');
    }
  }

  public ADLogin(){
    this.alert.info('Authenticating account...', { 
      autoClose: false, loading: true 
    });

    this.login.loginWithSSO().subscribe(resp=> {
      this.checkLogin(resp);
    }, error=> {
      this.alert.clear();
      this.alert.error(this.login.getMessage());
    });
  }

  public loginAs(username : string, password : string){
    username = username.split('@')[0]; //in case they type the domain
    this.login.loginWithCredentials(username, password)
        .subscribe(resp=> {
          this.checkLogin(resp);
        }, error => {
          this.alert.clear();
          this.alert.error(this.login.getMessage());
        });
  }

  public onSubmit(){
    this.alert.clear();
    this.form.markAllAsTouched();
    
    if(this.form.valid){
      this.alert.info('Authenticating account...', { 
        autoClose: false, loading: true 
      });
      
      this.loginAs(this.get('username').value, this.get('password').value);  
    }
  }

  public byPass(){
    this.login.byPass(this.form.controls['username'].value)
        .subscribe(resp=>{
          this.checkLogin(resp);
        });
  }
}
