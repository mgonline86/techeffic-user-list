import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import type { User } from '../user.model';
import { LucideAngularModule, Mail, MapPin, ChevronRight } from 'lucide-angular';
import { UserAvatarComponent } from "../user-avatar/user-avatar.component";

@Component({
  selector: 'app-user-list-item',
  standalone: true,
  imports: [RouterLink, LucideAngularModule, UserAvatarComponent],
  templateUrl: './user-list-item.component.html',
  styleUrl: './user-list-item.component.css',
})
export class UserListItemComponent {
  user = input.required<User>();

  readonly Mail = Mail;
  readonly MapPin = MapPin;
  readonly ChevronRight = ChevronRight;
}
