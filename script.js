document.addEventListener("DOMContentLoaded", function() {
  const tgButtons = document.querySelectorAll("button.telegram_button");
  const tgLink = "https://t.me/brat_anton";

  tgButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      window.open(tgLink, "_blank");
    });
  });
});


//бурегр меню
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('menu__toggle');
  const menuBox = document.querySelector('.menu__box');
  const menuLabel = document.querySelector('.menu__btn[for="menu__toggle"]');

  if (!toggle || !menuBox) return;

  // если у вас фиксированный header — укажи селектор или оставь '' 
  const HEADER_SELECTOR = ''; 
  const headerEl = HEADER_SELECTOR ? document.querySelector(HEADER_SELECTOR) : null;
  function headerOffset() {
    if (!headerEl) return 0;
    const st = getComputedStyle(headerEl);
    if (/fixed|sticky/i.test(st.position)) return Math.ceil(headerEl.getBoundingClientRect().height);
    return 0;
  }

  function closeMenuNoJump() {
    // снимем чек и уберём фокус с активного элемента внутри меню
    toggle.checked = false;
    const a = document.activeElement;
    if (a && menuBox.contains(a)) a.blur();
    if (menuLabel) menuLabel.blur();
  }

  function smoothTo(target) {
    if (!target) return;
    const offset = headerOffset();
    const top = window.scrollY + target.getBoundingClientRect().top - offset;
    window.scrollTo({ top: Math.max(0, Math.round(top)), behavior: 'smooth' });
  }

  // Глобальный делегат: клики по ссылкам в меню
  menuBox.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (!a) return;
    const href = a.getAttribute('href') || '';

    // Если это внешняя ссылка (включая tel/mailto) — позволяем переход, но закрываем меню сразу
    if (/^(https?:|mailto:|tel:)/i.test(href)) {
      closeMenuNoJump();
      return;
    }

    // Пустой/декоративный хеш (#) — предотвращаем дефолт (он может прыгнуть наверх)
    if (href === '#' || href.trim() === '') {
      e.preventDefault();
      closeMenuNoJump();
      return;
    }

    // Якорь внутри страницы
    if (href.startsWith('#')) {
      e.preventDefault();
      const id = href.slice(1);
      const target = document.getElementById(id);
      if (!target) { closeMenuNoJump(); return; }

      // Закрываем меню и даём небольшой таймаут для CSS‑анимации (если есть)
      closeMenuNoJump();
      // Delay: даём время закрытию/перерисовке, чтобы не было конфликта с focus/hash
      const DELAY = 60;
      setTimeout(() => smoothTo(target), DELAY);
      return;
    }

    // Любые другие ссылки — закрываем меню и позволяем перейти
    closeMenuNoJump();
  });

  // Надёжная обработка клика по label (крестику) — предотвращаем нативные артефакты
  if (menuLabel) {
    menuLabel.addEventListener('click', function (e) {
      e.preventDefault();               // отменяем нативный toggle
      const newState = !toggle.checked; // инвертируем состояние вручную
      toggle.checked = newState;
      // Убираем фокус чтобы не дергать скролл
      menuLabel.blur();
      if (!newState) {
        // при закрытии уберём фокус из меню
        const a = document.activeElement;
        if (a && menuBox.contains(a)) a.blur();
      }
    });
    // предотвращаем дефолтный mousedown поведение (фокус)
    menuLabel.addEventListener('mousedown', e => e.preventDefault());
  }

  // ESC закрывает меню
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && toggle.checked) closeMenuNoJump();
  });

  // Если hash изменился извне — закрываем меню чтобы не перекрывать секцию
  window.addEventListener('hashchange', () => {
    if (toggle.checked) closeMenuNoJump();
  });
});


document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.services-grid');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (!grid || !prevBtn || !nextBtn) return;

    // Расчет шага прокрутки
    const getScrollStep = () => {
        const card = grid.querySelector('.service-card');
        const gap = parseInt(window.getComputedStyle(grid).gap) || 0;
        return card ? card.offsetWidth + gap : 300;
    };

    // Листаем вперед
    nextBtn.addEventListener('click', () => {
        const maxScrollLeft = grid.scrollWidth - grid.clientWidth;
        
        // Если мы уже в самом конце (с учетом небольшой погрешности в 1px)
        if (grid.scrollLeft >= maxScrollLeft - 1) {
            grid.scrollTo({ left: 0, behavior: 'smooth' }); // Возвращаемся в начало
        } else {
            grid.scrollBy({ left: getScrollStep(), behavior: 'smooth' });
        }
    });

    // Листаем назад
    prevBtn.addEventListener('click', () => {
        const maxScrollLeft = grid.scrollWidth - grid.clientWidth;

        // Если мы в самом начале
        if (grid.scrollLeft <= 0) {
            grid.scrollTo({ left: maxScrollLeft, behavior: 'smooth' }); // Прыгаем в конец
        } else {
            grid.scrollBy({ left: -getScrollStep(), behavior: 'smooth' });
        }
    });
});

// Блокировка скролла при открытом меню
document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('menu__toggle');
    const body = document.body;

    if (toggle) {
        toggle.addEventListener('change', () => {
            if (toggle.checked) {
                body.classList.add('menu-open');
            } else {
                body.classList.remove('menu-open');
            }
        });
    }
});

/*хедер цвет */
// Мобильный хедер: смена цвета при скролле
document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector("header");

    function updateHeader() {
        if (window.innerWidth <= 768) {
            if (window.scrollY > 10) {
                header.classList.add("header--white");
            } else {
                header.classList.remove("header--white");
            }
        }
    }

    updateHeader();
    window.addEventListener("scroll", updateHeader);
    window.addEventListener("resize", updateHeader);
});


//дЕСКТОПНЫЙ
document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector("header");

    function updateHeader() {
        if (window.innerWidth >= 769) {
            if (window.scrollY > 50) {
                header.classList.add("header--white");
            } else {
                header.classList.remove("header--white");
            }
        }
    }

    updateHeader();
    window.addEventListener("scroll", updateHeader);
    window.addEventListener("resize", updateHeader);
});