export class DropdownMenu {
  private container: HTMLElement;
  private button: HTMLButtonElement;
  private menu: HTMLElement;
  private expanded: boolean;
  private id: string;

  constructor(container: HTMLElement) {
    this.container = container;
    this.expanded = false;

    if (!this.container) {
      throw new Error('DropdownMenu: The container element must have a valid selector.');
    }

    this.id = container.getAttribute('id')!;

    if (!this.id) {
      throw new Error('DropdownMenu: The container element must have a valid id attribute.');
    }

    this.button = this.container.querySelector('.c-dropdown-menu__button')!;
    this.button.setAttribute('id', `${this.id}__button`);
    this.button.setAttribute('aria-haspopup', 'true');
    this.button.setAttribute('aria-expanded', 'false');
    
    this.menu = this.container.querySelector('.c-dropdown-menu__menu')!;
    this.menu.setAttribute('id', `${this.id}__menu`);
    this.menu.setAttribute('aria-labelledby', this.button.getAttribute('id')!);

    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);

    this.button.addEventListener('click', this.toggleDropdown);
  }

  private toggleDropdown(): void {
    this.expanded = !this.expanded;
    this.button.setAttribute('aria-expanded', String(this.expanded));

    if (this.expanded) {
      this.container.classList.add('is-open');
      this.menu.querySelector('a')!.focus();
      document.addEventListener('keydown', this.handleKeyDown);
    } else {
      this.container.classList.remove('is-open');
      document.removeEventListener('keydown', this.handleKeyDown);
    }
  }

  private handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape') { // ESC key
      this.toggleDropdown();
      this.button.focus();
    }

    if (event.key === 'ArrowDown') { // Down arrow key
      event.preventDefault();
      const focusedLink = this.menu.querySelector('a:focus');
      if (focusedLink && focusedLink.parentElement && focusedLink.parentElement.nextElementSibling) {
        focusedLink.parentElement.nextElementSibling.querySelector('a')!.focus();
      }
    }

    if (event.key === 'ArrowUp') { // Up arrow key
      event.preventDefault();
      const focusedLink = this.menu.querySelector('a:focus');
      if (focusedLink && focusedLink.parentElement && focusedLink.parentElement.previousElementSibling) {
        focusedLink.parentElement.previousElementSibling.querySelector('a')!.focus();
      }
    }
  }
}
