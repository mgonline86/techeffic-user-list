import {
  Component,
  DestroyRef,
  type OnInit,
  inject,
  input,
  signal,
} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import {
  ChevronLeft,
  LucideAngularModule,
  Mail,
  MapPin,
  Phone,
} from 'lucide-angular';
import { UserAvatarComponent } from '../user-avatar/user-avatar.component';
import type { User } from '../user.model';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [UserAvatarComponent, LucideAngularModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent implements OnInit {
  id = input.required<User['id']>();

  isFetching = signal(false);
  error = signal('');

  readonly Mail = Mail;
  readonly MapPin = MapPin;
  readonly Phone = Phone;
  readonly ChevronLeft = ChevronLeft;

  user = signal<User | undefined>(undefined);

  private usersService = inject(UsersService);
  private destroyRef = inject(DestroyRef);

  private meta = inject(Meta);
  private title = inject(Title);

  ngOnInit(): void {
    this.isFetching.set(true);
    const subscription = this.usersService.fetchUser(this.id()).subscribe({
      next: (user) => {
        this.user.set(user);
        this.title.setTitle(`${user?.name} | Simple User List`);
        this.meta.addTags([
          {
            name: 'description',
            content: `User profile of ${user?.name || 'Person'}`,
          },
          {
            name: 'og:title',
            content: `${user?.name || 'Person'}`,
          },
          {
            name: 'og:description',
            content: `User profile of ${user?.name || 'Person'}`,
          },
          {
            name: 'og:image',
            content: `https://ui-avatars.com/api?name=${encodeURIComponent(
              user?.name
            )}`,
          },
          {
            name: 'twitter:title',
            content: `${user?.name || 'Person'}`,
          },
          {
            name: 'twitter:description',
            content: `User profile of ${user?.name || 'Person'}`,
          },
          {
            name: 'twitter:image',
            content: `https://ui-avatars.com/api?name=${encodeURIComponent(
              user?.name
            )}`,
          },
        ]);
      },
      error: (error: Error) => {
        this.error.set(error.message);
      },
      complete: () => {
        this.isFetching.set(false);
      },
    });
  }
}
