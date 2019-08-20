import { Component, OnInit } from '@angular/core';
import {FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { User, enderecos } from '../models/users.model';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  newContatForm: FormGroup;
  startDate = new Date(1910, 0, 1);
  isLoadingResults = false;
  userId;
  statesArray = ["AC", "AL", "AM", "AP", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RO", "RS", "RR", "SC", "SE", "SP", "TO"]
  public telMask = ['(', /[0-9]/,/[0-9]/,')', ' ',/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/, /[0-9]/,/[0-9]/,/[0-9]/,/[0-9]/];
  public cpfMask = [/\d/,/\d/,/\d/,'.',/\d/,/\d/,/\d/,'.',/\d/,/\d/,/\d/,'-',/\d/,/\d/];
  public rgMask  = [/\d/,/\d/,'.',/\d/,/\d/,/\d/,'.',/\d/,/\d/,/\d/,'-',/\d/];
  public zipMask = [/\d/,/\d/,/\d/,/\d/,/\d/,'-',/\d/,/\d/,/\d/];

  constructor(
    private route: ActivatedRoute, 
    private formBuilder: FormBuilder,
    private router: Router,
    private api: ApiService
  ) {}

  ngOnInit() {
    this.newContatForm = this.formBuilder.group({
      id: [''],
      fullName :[''],
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      nascimento: ['', Validators.required],
      cpf: ['', Validators.required],
      rg: ['', Validators.required],
      facebook: [''],
      twitter: [''],
      linkedin: [''],
      instagram: [''],
      enderecos: this.formBuilder.array([
        this.initEnd([])
      ]),
      telefones: this.formBuilder.array([
        this.initTel([])
      ])
    })

    this.route.params.subscribe(params =>{
      this.userId = params.id;
      if(this.userId){
        this.api.getUser(this.userId)
        .subscribe(res => {
          const controlEnd = <FormArray> this.newContatForm.controls['enderecos'];
          const controlTel = <FormArray> this.newContatForm.controls['telefones'];
          res.enderecos.forEach(end => {
            controlEnd.push(this.initEnd(end));
          });
          controlEnd.removeAt(1);
          res.telefones.forEach(tel => {
            controlTel.push(this.initTel(tel));
          });
          controlTel.removeAt(1);
          this.newContatForm.setValue(res)
          console.log(res);
        }, err => {
          console.log(err);
        })
      }
    })
  }
  onSubmit(form: User){
    if(this.newContatForm.valid){
      form.fullName = form.fname + ' ' + form.lname;
      console.log(form);
      if(this.userId){
        this.api.updateUser(this.userId, form)
        .subscribe(res =>{
          console.log(res);
          this.router.navigate(['/list']);
        }, (err)=>{
          console.log(err);
        })
      }else{
        this.api.addUser(form)
        .subscribe(res=>{
          console.log(res);
          this.router.navigate(['/list']);
        }, (err) => {
          console.log(err);
        })
      }
      
    }
  }
  initTel(res){
    return this.formBuilder.group({
      telefone: [res.telefone, Validators.required],
      telefoneLocal: [res.telefoneLocal, Validators.required],
    })
  }
  addTel(){
    const control = <FormArray> this.newContatForm.controls['telefones'];
    if(control.valid){
      control.push(this.initTel([]));
    }
  }
  removeTel(i: number){
    const control = <FormArray> this.newContatForm.controls['telefones'];
    control.removeAt(i);
  }
  initEnd(end){
    return this.formBuilder.group({
      endereco: [end.endereco, Validators.required],
      numero: [end.numero, Validators.required],
      cep: [end.cep, Validators.required],
      bairro: [end.bairro, Validators.required],
      cidade: [end.cidade, Validators.required],
      estado: [],
    })
  }
  addEnd(){
    const control = <FormArray> this.newContatForm.controls['enderecos'];
    if(control.valid){
      control.push(this.initEnd([]));
    }
  }
  removeEnd(i: number){
    const control = <FormArray> this.newContatForm.controls['enderecos'];
    control.removeAt(i);
  }
}
