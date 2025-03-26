import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import { LoginForm } from '../../interfaces/login-form.interface';
import Swal from 'sweetalert2';

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] 
})
export class LoginComponent implements OnInit, AfterViewInit {

  @ViewChild('googleBtn') googleBtn: ElementRef;

  public loginForm = this.fb.group({
      email: [ localStorage.getItem('email') || '', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      remember: [ false ]
    });

  constructor(private router: Router,
              private fb: FormBuilder,
              private usuarioService: UsuarioService 
  ){}

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
  this.googleInit();
  }
  

  googleInit(){
    google.accounts.id.initialize({
      client_id: "1049599238392-9a1eh46naj8as9ltmj99utcosr1061fs.apps.googleusercontent.com",
      callback: this.handleCredentialResponse
    });
    google.accounts.id.renderButton(
      ///document.getElementById("buttonDiv"),
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );

  }

  handleCredentialResponse( response: any ){
    console.log("Encoded JWT ID token: " + response.credential);
  }


  login(){
    
    this.usuarioService.login(this.loginForm.value as LoginForm)
        .subscribe({
          
          next: resp => {
            if(this.loginForm.get('remember').value) {
              localStorage.setItem('email', this.loginForm.get('email').value);
            }else {
              localStorage.removeItem('email');
            }
          },
          error: err => console.log(Swal.fire('Error', err.error.msg, 'error')),
          complete: () => console.log('Login realizado correctamente')
        });

    console.log(this.loginForm.value);
    //this.router.navigateByUrl('/');
  }
}
