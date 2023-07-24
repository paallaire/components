// tabs.ts (fichier du module)

export class Tabs {
  private container: HTMLElement;
  private tabs: NodeListOf<HTMLButtonElement>;
  private tabList: HTMLElement;
  private tabsContent: NodeListOf<HTMLButtonElement>;
  private activeTab: number;

  constructor(containerElement: HTMLElement) {
    this.container = containerElement as HTMLElement;

    if (!this.container) {
      throw new Error(`Tabs container element (${containerElement}) not found in the DOM.`);
    }

    this.tabs = this.container.querySelectorAll('.tab');
    this.tabList = this.container.querySelector('.tab-list') as HTMLElement;
    this.tabsContent = this.container.querySelectorAll('.tab-content');

    const initialTabAttr = this.container.getAttribute('data-initial-tab');
    let initialTab = initialTabAttr ? parseInt(initialTabAttr, 10) : 0;

    if (initialTab >= this.tabs.length) {
      initialTab = 0;
    }

    this.activeTab = initialTab;

    this.tabList.addEventListener('keydown', (event: KeyboardEvent) => {
      const { key } = event;
    
      switch (key) {
        case 'ArrowRight':
        case 'ArrowLeft':
        case 'Home':
        case 'End':
          event.preventDefault();
          this.handleTabListNavigation(key);
          break;
    
        case 'Enter':
        case ' ':
          event.preventDefault();
          this.activateTab(this.activeTab);
          break;
    
        default:
          break;
      }
    });
    
    this.tabs.forEach((tab, index) => {
      this.setupTabAttributes(tab, index);
      tab.addEventListener('click', () => {
        this.activateTab(index);
      });
    });

    this.tabsContent.forEach((tabContent, index) => {
      tabContent.setAttribute('id', `${this.container.id}-content-${index}`);
      tabContent.setAttribute('role', 'tabpanel');
      tabContent.setAttribute('aria-labelledby', `${this.container.id}-button-${index}`);
      tabContent.classList.toggle('is-active', this.activeTab === index);
    });
  }

  private setupTabAttributes(tab: HTMLButtonElement, index: number) {
    tab.setAttribute('id', `${this.container.id}-button-${index}`);
    tab.setAttribute('role', 'tab');
    this.updateTabAttributes(tab, index);
  }

  private updateTabAttributes(tab: HTMLButtonElement, index: number) {
    const isSelected = this.activeTab === index;

    tab.setAttribute('aria-selected', isSelected.toString());
    tab.setAttribute('tabindex', isSelected ? '0' : '-1');
    tab.setAttribute('aria-controls', `${this.container.id}-content-${index}`);
  }

  private handleTabListNavigation(key: string) {
    if (key === 'ArrowRight') {
      this.activeTab = (this.activeTab + 1) % this.tabs.length;
    } else if (key === 'ArrowLeft') {
      this.activeTab = (this.activeTab - 1 + this.tabs.length) % this.tabs.length;
    } else if (key === 'Home') {
      this.activeTab = 0;
    } else if (key === 'End') {
      this.activeTab = this.tabs.length - 1;
    }
    this.tabs[this.activeTab].focus();
  }

  private activateTab(index: number) {
    for (let i = 0; i < this.tabs.length; i++) {
      const tabButton = this.tabs[i];
      const isSelected = i === index;

      this.updateTabAttributes(tabButton, i);

      const panelId = tabButton.getAttribute('aria-controls');
      const panel = document.getElementById(panelId || '');

      if (panel) {
        panel.classList.toggle('is-active', isSelected);
      }
    }
  }
}
