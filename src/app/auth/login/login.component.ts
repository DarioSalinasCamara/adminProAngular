import { Component } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import { LoginForm } from '../../interfaces/login-form.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] 
})
export class LoginComponent {

  public loginForm = this.fb.group({
      email: ['asasa@asavg.com', [Validators.required, Validators.email]],
      password: ['asasasaa', Validators.required],
      remember: [ false ]
    });

  constructor(private router: Router,
              private fb: FormBuilder,
              private usuarioService: UsuarioService 
  ){}
  
  login(){
    
    this.usuarioService.login(this.loginForm.value as LoginForm)
        .subscribe({ 
          next: resp => console.log(resp),
          error: err => console.log(Swal.fire('Error', err.error.msg, 'error')),
          complete: () => console.log('Login realizado correctamente')
        });

    console.log(this.loginForm.value);
    //this.router.navigateByUrl('/');
  }
}
