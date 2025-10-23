import { select } from '@ngneat/elf';
import { AppStateProps, appStateStore } from './app-state.store';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AppStateRepository {
  state$ = appStateStore.pipe(select(state => state));

  set(field: keyof AppStateProps, value: AppStateProps[keyof AppStateProps]) {
    appStateStore.update(state => ({ ...state, [field]: value }));
  }

  get(field: keyof AppStateProps) {
    return appStateStore.getValue()[field];
  }

  setState(state: Partial<AppStateProps>) {
    appStateStore.update(prev => ({ ...prev, ...state }));
  }

  getState() {
    return appStateStore.getValue();
  }
}
