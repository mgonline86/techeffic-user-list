import {
  Component,
  DestroyRef,
  type OnInit,
  inject,
  signal,
} from '@angular/core';
import { UserListItemComponent } from './user-list-item/user-list-item.component';
import type { User } from './user.model';
import { UsersService } from './users.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [UserListItemComponent, FormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  users = signal<User[] | undefined>(undefined);
  isFetching = signal(false);
  error = signal('');
  searchTerm = signal('');

  get filteredUsers() {
    return this.users()?.filter((user) =>
      user.name.toLowerCase().includes(this.searchTerm().toLowerCase())
    );
  }

  private usersService = inject(UsersService);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.isFetching.set(true);
    const subscription = this.usersService.loadUsers().subscribe({
      next: (users) => {
        this.users.set(users);
      },
      error: (error: Error) => {
        this.error.set(error.message);
      },
      complete: () => {
        this.isFetching.set(false);
      },
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
