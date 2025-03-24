import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'] 
})
export class RegisterComponent {

  public formSubmitted = false;

  public registerForm = this.fb.group({
    nombre: ['asasasaa', Validators.required],
    email: ['asasa@asavg.com', [Validators.required, Validators.email]],
    password: ['123', Validators.required],
    password2: ['123', Validators.required],
    terminos: [true, Validators.required]
  }, {
    validators: this.comparePasswords('password', 'password2')
  });


  constructor( private fb: FormBuilder,
               private usuarioService: UsuarioService ){ }

  crearUsuario() {

    this.formSubmitted = true;
    console.log( this.registerForm.value );

    if( this.registerForm.invalid) {
      console.log('ko')
      return;
    }

    this.usuarioService.crearUsuario( this.registerForm.value )
        .subscribe({
          next: resp => console.log('usuario creado', resp),
          error: err => {
            
            Swal.fire('Error', err.error.msg, 'error');
            //console.warn('Error', err);
          },

          complete: () => console.log('Peticion completada')

        });
  }

  campoNoValido( campo: string): boolean{

    if( this.registerForm.get(campo).invalid && this.formSubmitted ){
      return true;
    } else {
      return false;
    }
  }

  aceptaTerminos() {
    
    return !this.registerForm.get('terminos').value && this.formSubmitted;

  }

  contrasenasNoValidas(){

    const pass1 = this.registerForm.get('password').value
    const pass2 = this.registerForm.get('password2').value
    
    if( ( pass1 !== pass2) && this.formSubmitted ){
      return true;
    } else {
      return false;
    }

  }

  comparePasswords(pass1: string, pass2: string){

    return ( formGroup: FormGroup) => {

      const pass1Control = formGroup.get(pass1);
      const pass2Control = formGroup.get(pass2);

      if( pass1Control.value === pass2Control.value ){
        pass2Control.setErrors(null);
      }else {
        pass2Control.setErrors({ notEqual: true})
      }
    }
  }

}
