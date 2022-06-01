import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.css'],
})
export class RegisterComponent implements OnInit {
  public formSubmited = false;

  public registerForm = this.fb.group(
    {
      nombre: ['Carlos', [Validators.required, Validators.minLength(3)]],
      email: [
        'delacruzrodriguez.16@nlsa.teleperformance.com',
        [Validators.required, Validators.minLength(3), Validators.email],
      ],
      password: ['12345', [Validators.required, Validators.minLength(3)]],
      password2: ['12345', [Validators.required, Validators.minLength(3)]],
      terminos: [true, [Validators.required]],
    },
    {
      validators: this.passwordsIguales('password', 'password2'),
    }
  );

  passwordsIguales(pass1Name: string, pass2Name: string) {
    return (formgroup: FormGroup) => {
      const pass1Control = formgroup.get(pass1Name);
      const pass2Control = formgroup.get(pass2Name);
      if (pass1Control?.value === pass2Control?.value) {
        pass2Control?.setErrors(null);
      } else {
        pass2Control?.setErrors({ noEsIgual: true });
      }
    };
  }

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  crearusuario() {
    this.formSubmited = true;
    console.log(this.registerForm.value);
    if (!this.registerForm.valid) {
      return;
    }
    this.usuarioService.crearUsuario(this.registerForm.value).subscribe(
      (resp) => {
       //
       this.router.navigateByUrl('/');
      },
      (err) => {
        Swal.fire('Error', err.error.msg,'error');
      }
    );
    // realizar el posteo
  }

  campoNoValido(campo: string): boolean {
    if (this.registerForm.get(campo)?.invalid && this.formSubmited == true) {
      return true;
    } else {
      return false;
    }
  }

  contrasenasNoValidas(): boolean {
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;
    if (pass1 !== pass2 && this.formSubmited) {
      return true;
    } else {
      return false;
    }
  }

  aceptaTerminos(): boolean {
    return !this.registerForm.get('terminos')?.value && this.formSubmited;
  }

  ngOnInit(): void {}
}
