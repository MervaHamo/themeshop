class CartNotification extends HTMLElement {
  constructor() {
    super();

    // Hämta DOM-element och sätt upp händelselyssnare
    this.notification = this.querySelector('.cart-notification');
    this.closeButtons = this.querySelectorAll('button[type="button"]');
    this.handleBodyClick = this.handleBodyClick.bind(this);

    // Lägg till händelselyssnare för att stänga aviseringen
    this.notification.addEventListener('keyup', (evt) => {
      if (evt.key === 'Escape') this.close();
    });
    this.closeButtons.forEach(button =>
      button.addEventListener('click', this.close.bind(this))
    );
  }

  connectedCallback() {
    // Öppna aviseringen när elementet läggs till i DOM
    this.open();
  }

  open() {
    this.notification.classList.add('active');

    // Sätt fokus på aviseringen och begränsa tangenttryckningar till den
    this.notification.focus();
    trapFocus(this.notification);

    // Lyssna på klick utanför aviseringen för att stänga den
    document.body.addEventListener('click', this.handleBodyClick);
  }

  close() {
    this.notification.classList.remove('active');

    // Sluta lyssna på klick utanför aviseringen
    document.body.removeEventListener('click', this.handleBodyClick);

    // Avbryt fokus och tangentbordshändelserbegränsning
    removeTrapFocus(this.notification);
  }

  renderContents(parsedState) {
    // Rendera innehållet baserat på tillståndet
    this.cartItemKey = parsedState.key;
    this.getSectionsToRender().forEach((section) => {
      const sectionElement = this.querySelector(`#${section.id}`);
      sectionElement.innerHTML = this.getSectionInnerHTML(
        parsedState.sections[section.id],
        section.selector
      );
    });

    // Visa aviseringen
    this.open();
  }

  getSectionsToRender() {
    return [
      { id: 'cart-notification-product', selector: `[id="cart-notification-product-${this.cartItemKey}"]` },
      { id: 'cart-notification-button' },
      { id: 'cart-icon-bubble' }
    ];
  }

  getSectionInnerHTML(html, selector = '.shopify-section') {
    // Hämta HTML-innehåll för en sektion
    const parser = new DOMParser();
    const parsedHtml = parser.parseFromString(html, 'text/html');
    return parsedHtml.querySelector(selector).innerHTML;
  }

  handleBodyClick(evt) {
    // Stäng aviseringen om användaren klickar utanför den
    if (!evt.composedPath().includes(this)) {
      this.close();
    }
  }
}

// Registrera det anpassade HTML-elementet
customElements.define('cart-notification', CartNotification);
