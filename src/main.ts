import './style.css';
import { resolveThemeOverride } from './theme';

const override = resolveThemeOverride(window.location.search);
if (override !== null) {
  document.documentElement.dataset.theme = override;
}
