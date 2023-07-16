export class Accordion {
  private items: NodeListOf<Element>;
  private toggleItemBound: (event: Event) => void;

  /**
 * Class representing an accordion component.
 * Allows for initializing, opening, closing, and destroying accordion elements while maintaining accessibility of the components.
 */
  constructor() {
    this.items = document.querySelectorAll('.c-accordion');
    this.toggleItemBound = this.toggleItem.bind(this);

    this.items.forEach((item, index) => {
      const button = item.querySelector('.c-accordion__button') as HTMLButtonElement;
      const content = item.querySelector('.c-accordion__content') as HTMLElement;
      const contentId = content.getAttribute('data-id') || index;
      const contentInner = document.createElement('div');
      const contentHtml = content.innerHTML;

      content.innerHTML = '';
      contentInner.classList.add('c-accordion__content-wrapper');
      contentInner.innerHTML = contentHtml;
      content.appendChild(contentInner);
      
      button.setAttribute('aria-expanded', 'false');
      button.setAttribute('aria-controls', `accordion-content-${contentId}`);
      button.setAttribute('id', `accordion-button-${contentId}`);

      content.setAttribute('id', `accordion-content-${contentId}`);
      content.setAttribute('aria-hidden', 'true');
      content.setAttribute('aria-labelledby', `accordion-content-${contentId}`);

      button.addEventListener('click', this.toggleItemBound);
    });

    const urlParams = new URLSearchParams(window.location.search);
    const accordionId = urlParams.get('accordionId');

    if (!accordionId) {
      return;
    }

    const accordionToOpen = document.getElementById(`accordion-content-${accordionId}`);
    if (!accordionToOpen) {
      return;
    }

    const buttonToOpen = accordionToOpen.previousElementSibling as HTMLButtonElement;
    if (buttonToOpen) {
      this.openAccordion(buttonToOpen);
    }

  }

  /**
 * Toggles the state of an accordion item (open/closed) in response to a click event on the button.
 * @param event The click event on the accordion button.
 */
  private toggleItem(event: Event) {
    const button = event.target as HTMLButtonElement;
    const item = button.closest('.c-accordion') as Element;
    const content = item.querySelector('.c-accordion__content') as HTMLElement;
    const isExpanded = item.classList.contains('is-active');

    item.classList.toggle('is-active');
    button.setAttribute('aria-expanded', (!isExpanded).toString());
    content.setAttribute('aria-hidden', isExpanded.toString());
  }

  /**
 * Opens a specified accordion item by changing its state to "open".
 * @param button The button of the accordion item to open.
 */
  private openAccordion(button: HTMLButtonElement) {
    const item = button.closest('.c-accordion') as Element;
    const content = item.querySelector('.c-accordion__content') as HTMLElement;

    item.classList.add('is-active');
    button.setAttribute('aria-expanded', 'true');
    content.setAttribute('aria-hidden', 'false');
  }

  /**
 * Closes all accordion items by changing their states to "closed".
 */
  public closeAll() {
    this.items.forEach((item) => {
      const button = item.querySelector('.c-accordion__button') as HTMLButtonElement;
      const content = item.querySelector('.c-accordion__content') as HTMLElement;

      item.classList.remove('is-active');
      button.setAttribute('aria-expanded', 'false');
      content.setAttribute('aria-hidden', 'true');
    });
  }

  /**
 * Opens all accordion items by changing their states to "open".
 */
  public openAll() {
    this.items.forEach((item) => {
      const button = item.querySelector('.c-accordion__button') as HTMLButtonElement;
      const content = item.querySelector('.c-accordion__content') as HTMLElement;

      item.classList.add('is-active');
      button.setAttribute('aria-expanded', 'true');
      content.setAttribute('aria-hidden', 'false');
    });
  }

  /**
 * Removes event listeners from the accordion buttons, effectively destroying the accordion component.
 */
  public destroy() {
    this.items.forEach((item) => {
      const button = item.querySelector('.c-accordion__button') as HTMLButtonElement;
      button.removeEventListener('click', this.toggleItemBound);
    });
  }
}
