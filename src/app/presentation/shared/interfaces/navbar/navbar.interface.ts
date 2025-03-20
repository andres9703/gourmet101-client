export interface MenuItem {
  label: string;
  icon: string;
  routerLink?: string;
  styleClass?: string;
  severity?: string;
  class?: string;
  command?: () => void;
}