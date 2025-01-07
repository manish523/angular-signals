import {
  Component,
  computed,
  effect,
  inject,
  Injector,
  signal,
} from '@angular/core';
import { CoursesService } from '../services/courses.service';
import { Course, sortCoursesBySeqNo } from '../models/course.model';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { CoursesCardListComponent } from '../courses-card-list/courses-card-list.component';
import { MatDialog } from '@angular/material/dialog';
import { MessagesService } from '../messages/messages.service';
import { catchError, from, single, throwError } from 'rxjs';
import {
  toObservable,
  toSignal,
  outputToObservable,
  outputFromObservable,
} from '@angular/core/rxjs-interop';

type Counter = {
  value: number;
};

@Component({
  selector: 'home',
  imports: [MatTabGroup, MatTab, CoursesCardListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  counterSimple = signal(0); // Simple Signal

  counter = signal<Counter>({ value: 100 }); // Object Signal

  values = signal<number[]>([0]); // Array Signal

  counterReadOnly = signal(0).asReadonly(); // ReadOnly Signal
  // readonly signals cant be updated

  tenXCounter = computed(() => {
    const val = this.counterSimple();
    return val * 10;
  });

  hundredXCounter = computed(() => {
    const val = this.tenXCounter();
    return val * 10;
  });

  incrementSimpleSignal() {
    this.counterSimple.set(this.counterSimple() + 1);
    // another way tos set value to a signal
    // this.counter.update((counter) => counter + 1);
  }

  incrementObjectSignal() {
    this.counter.update((counter) => ({
      ...counter,
      value: counter.value + 1,
    }));
  }

  appendArraySignal() {
    // WRONG WAY TO DO IT (Only will work with angular default change detection)

    // const values = this.values();
    // const last = values[values.length - 1];
    // values.push(last + 1);

    // RIGHT WAY TO DO IT (That will work with Signal Change Detection)

    this.values.update((values) => [...values, values[values.length - 1] + 1]);
  }
}
