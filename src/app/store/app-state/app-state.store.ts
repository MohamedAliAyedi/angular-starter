import { LayoutConfig } from '../../components/layout/layout.types';
import { createStore, withProps } from '@ngneat/elf';
import { persistState, localStorageStrategy } from '@ngneat/elf-persist-state';

export interface AppStateProps extends LayoutConfig {
  language?: { code: string; name: string };
}

export const appStateStore = createStore(
  { name: 'app-theme' },
  withProps<AppStateProps>({
    primary: 'tia-primary',
    surface: 'zinc',
    preset: 'Lara',
    menuMode: 'static',
    darkTheme: false,
    language: undefined,
  })
);

export const persist = persistState(appStateStore, {
  key: 'app-state',
  storage: localStorageStrategy,
});
