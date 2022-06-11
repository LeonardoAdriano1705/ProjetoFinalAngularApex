import { Animal } from './../../interfaces/Animals';
import { ListService } from './../../services/list.service';
import { Component, OnInit } from '@angular/core';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css']
})
export class ListPageComponent implements OnInit {
  animals: Animal[] = [];

  id?: number;
  name: string = '';
  age!: number;
  type!: string;


  constructor(private ListService: ListService) {
    this.getAllAnimals()
  }


  ngOnInit(): void {
  }


  getAllAnimals() {
    this.ListService.ServiceGetAllAnimals().subscribe((animals) => {
      this.animals = animals
    })
  }
  submitForm() {

    if (this.id) {
      this.updateAnimal();

    } else {
      this.addAnimal();

    }

  }
  limparCampos(event?: Event) {
    event?.preventDefault()
    this.id = undefined;
    this.name = '';
    this.age = 0;
    this.type = 'dog';

  }
  addAnimal() {

    if (this.name.length == 0 || this.age == 0) {
      alert('Preencha os Campos')
      return;

    }
    const animal: Animal = {

      name: this.name,
      age: this.age,
      type: this.type
    };
    this.ListService.ServiceAddAnimal(animal).subscribe(() => {
      this.getAllAnimals()
      this.limparCampos()
    })


  }

  preencherCampos(animal: Animal) {
    this.id = animal.id;
    this.name = animal.name;
    this.age = animal.age;
    this.type = animal.type;
  }

  updateAnimal() {
    const animal: Animal = {
      id: this.id,
      name: this.name,
      age: this.age,
      type: this.type
    };
    this.ListService.ServiceUpDateAnimal(animal).subscribe(() => {
      this.getAllAnimals();
      this.limparCampos();
    });
  }
  deletarAnimals(id?: number) {
    this.ListService.ServiceDeletarAnimals(id).subscribe(() => {
      this.getAllAnimals();
      this.limparCampos();
    })

  }
}
