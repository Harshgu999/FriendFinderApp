import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';

@Component({
  imports: [],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App implements OnInit {

  private http = inject(HttpClient);
  protected readonly title = 'Friend Finder App';
  protected members = signal<any>([]);

  async ngOnInit(){
    this.members.set(await this.getMembers())
  }

  getMembers() {
    try
    {
      return lastValueFrom(this.http.get('https://localhost:5001/api/members'));
    }
    catch(error)
    {
      console.error(error);
      throw error;
    }

  }
}
