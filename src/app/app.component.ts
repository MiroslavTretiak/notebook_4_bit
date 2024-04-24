import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Note } from './note';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
 public notes:Note[]=[];
 public newNote:string;

  constructor() { 
    let s=localStorage.getItem("notes");
    if (s!=null){
      this.notes=JSON.parse(s);
    }
  }
  
  saveNote(){
    if(this.newNote) {
      let note = new Note()
      note.name = this.newNote;
      note.isCompleted = true;
      this.notes.push(note);
      this.newNote = '';
      this.save();
    } else {
      alert("Please Enter Note")
    }
  }

  done (id:number) {
    this.notes[id].isCompleted = !this.notes[id].isCompleted;
    this.save();
  }

  remove(id:number) {
    this.notes = this.notes.filter((v,i)=> i !==id)
    this.save();
  }
  private save(){
    localStorage.setItem("notes",JSON.stringify(this.notes));
  }

}
