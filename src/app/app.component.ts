import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent implements OnInit {
  users: User[] = [];
  selectedUser: User | null = null;
  userIds: string = ''; // To hold the input from the user

  constructor(private userService: UserService) {}

  ngOnInit() {
    // Optionally, you can fetch default users here
  }

  fetchUsers() {
    // Split the input string into an array of numbers
    const ids = this.userIds
      .split(',')
      .map((id) => parseInt(id.trim(), 10))
      .filter((id) => !isNaN(id));

    // Fetch users by the entered IDs
    if (ids.length > 0) {
      this.userService.getUsersByIds(ids).subscribe((data) => {
        this.users = data;
      });
    }
  }

  getUser(id: number) {
    this.userService.getUserById(id).subscribe((data) => {
      this.selectedUser = data;
    });
  }
}
