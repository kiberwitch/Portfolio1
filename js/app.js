document.addEventListener("DOMContentLoaded", function () {
    // Инициализация вертикального Swiper
    const verticalSwiper = new Swiper(".vertical-swiper", {
        direction: "vertical",
        slidesPerView: 1,
        mousewheel: true,
        keyboard: {
            enabled: true,
            onlyInViewport: true,
            pageUpDown: true,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        speed: 800,
        effect: "slide",
        allowTouchMove: false,
        on: {
            init: function () {
                animateSlideElements(this.slides[this.activeIndex]);
            },
            slideChange: function () {
                animateSlideElements(this.slides[this.activeIndex]);
                playSoundWithCooldown(slideSound);
            },
        },
    });

    // Инициализация горизонтального Swiper для проектов
    const horizontalSwiper = new Swiper(".horizontal-swiper", {
        direction: "horizontal",
        slidesPerView: 1,
        spaceBetween: 30,
        centeredSlides: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        keyboard: {
            enabled: true,
        },
        effect: "slide",
        speed: 600,
        on: {
            init: function () {
                // Анимация стрелок при инициализации
                animateArrows();
            },
            slideChange: function () {
                // Анимация стрелок при смене слайда
                animateArrows();
                playSoundWithCooldown(iconSound);
            },
        },
    });

    // Функция для анимации стрелок
    function animateArrows() {
        const prevArrow = document.querySelector(".swiper-button-prev");
        const nextArrow = document.querySelector(".swiper-button-next");

        if (prevArrow && nextArrow) {
            prevArrow.style.transform = "scale(0.9)";
            nextArrow.style.transform = "scale(0.9)";

            setTimeout(() => {
                prevArrow.style.transform = "scale(1)";
                nextArrow.style.transform = "scale(1)";
            }, 200);
        }
    }

    // Добавляем обработчики событий для кастомных стрелок
    const prevArrow = document.querySelector(".swiper-button-prev");
    const nextArrow = document.querySelector(".swiper-button-next");

    if (prevArrow) {
        prevArrow.addEventListener("mouseenter", function () {
            this.style.opacity = "1";
            this.style.transform = "scale(1.1)";
            playSoundWithCooldown(iconSound);
        });

        prevArrow.addEventListener("mouseleave", function () {
            this.style.opacity = "0.7";
            this.style.transform = "scale(1)";
        });
    }

    if (nextArrow) {
        nextArrow.addEventListener("mouseenter", function () {
            this.style.opacity = "1";
            this.style.transform = "scale(1.1)";
            playSoundWithCooldown(iconSound);
        });

        nextArrow.addEventListener("mouseleave", function () {
            this.style.opacity = "0.7";
            this.style.transform = "scale(1)";
        });
    }

    const iconSound = document.getElementById("icon-sound");
    const slideSound = document.getElementById("slide-sound");
    const skillSound = document.getElementById("skill-sound");
    let lastSoundTime = 0;
    const soundCooldown = 500;

    function playSoundWithCooldown(soundElement) {
        const now = Date.now();
        if (now - lastSoundTime > soundCooldown) {
            try {
                soundElement.currentTime = 0;
                soundElement
                    .play()
                    .catch((e) => console.log("Автовоспроизведение заблокировано:", e));
                lastSoundTime = now;
            } catch (e) {
                console.error("Ошибка воспроизведения звука:", e);
            }
        }
    }

    function animateSlideElements(slide) {
        const elements = slide.querySelectorAll(
            ".planet-group, .neon-text, .skills-container, .icon, .projects-container"
        );

        elements.forEach((el) => {
            el.style.animation = "none";
            void el.offsetWidth;

            if (el.classList.contains("planet-group")) {
                el.style.animation = `riseUp 1.5s ease-out forwards, groupFloat 3s ease-in-out infinite`;
                el.style.animationDelay = "0.5s";
            } else if (el.classList.contains("neon-text")) {
                if (el.classList.contains("intro-text")) {
                    el.style.animation = "slideIn 1.5s ease-out 0.5s forwards";
                } else if (el.classList.contains("name-text")) {
                    el.style.animation = "slideIn 1.5s ease-out 3s forwards";
                }
            } else if (
                el.classList.contains("skills-container") ||
                el.classList.contains("projects-container")
            ) {
                el.style.animation = "fadeInUp 1s ease-out 0.5s forwards";
            } else if (el.classList.contains("icon")) {
                if (el.classList.contains("left-icon")) {
                    el.style.animation = "fadeInSlide 1.5s ease-out 2s forwards";
                } else if (el.classList.contains("right-icon")) {
                    el.style.animation = "fadeInSlide 1.5s ease-out 2.5s forwards";
                }
            }
        });
    }

    function animateButton(button) {
        button.style.top = "50%";
        button.style.transform = "translate(-50%, -50%)";

        const buttonText = document.getElementById("button-text");
        if (buttonText) {
            buttonText.innerHTML =
                "Добро пожаловать в мое портфолио!<br>Я веб-разработчик с опытом создания современных интерактивных интерфейсов.";
        }

        button.style.transform = "translate(-50%, -50%) scale(0.95)";
        setTimeout(() => {
            button.style.transform = "translate(-50%, -50%) scale(1)";
        }, 100);
    }

    // Обработка клавиши Enter
    document.addEventListener("keydown", function (e) {
        if (e.key === "Enter" && verticalSwiper.activeIndex === 0) {
            e.preventDefault();
            const mainButton = document.getElementById("main-button");
            if (mainButton) {
                animateButton(mainButton);
                playSoundWithCooldown(iconSound);
            }
        }

        if (e.code === "Space") {
            e.preventDefault();
            verticalSwiper.slideNext();
        }
    });

    // Обработка клика на кнопку
    const mainButton = document.getElementById("main-button");
    if (mainButton) {
        mainButton.addEventListener("click", function () {
            animateButton(this);
            playSoundWithCooldown(iconSound);
        });
    }

    // Обработка контактов
    const contactsButton = document.getElementById("contacts-button");
    if (contactsButton) {
        let isContactsHovered = false;

        contactsButton.addEventListener("mouseenter", function () {
            if (!isContactsHovered) {
                playSoundWithCooldown(iconSound);
                isContactsHovered = true;
            }
        });

        contactsButton.addEventListener("mouseleave", function () {
            isContactsHovered = false;
        });

        contactsButton.addEventListener("click", function () {
            playSoundWithCooldown(iconSound);
            alert("Контакты:\nEmail: example@mail.com\nТелефон: +7 (123) 456-78-90");
        });
    }

    // Обработка наведения на навыки
    const skillCards = document.querySelectorAll(".skill-card");
    skillCards.forEach((card) => {
        let isHovered = false;

        card.addEventListener("mouseenter", function () {
            if (!isHovered) {
                playSoundWithCooldown(skillSound);
                isHovered = true;
            }
        });

        card.addEventListener("mouseleave", function () {
            isHovered = false;
        });
    });

    // Обработка кнопок проектов
    const projectButtons = document.querySelectorAll(".project-details-btn");
    projectButtons.forEach((button) => {
        let isHovered = false;

        button.addEventListener("mouseenter", function () {
            if (!isHovered) {
                playSoundWithCooldown(iconSound);
                isHovered = true;
            }
        });

        button.addEventListener("mouseleave", function () {
            isHovered = false;
        });

        button.addEventListener("click", function () {
            playSoundWithCooldown(iconSound);

            const projectNumber =
                this.parentElement.querySelector(".project-number").textContent;
            const projectName =
                this.parentElement.querySelector(".project-name").textContent;

            const modal = document.createElement("div");
            modal.className = "project-modal";

            let description = "";
            let technologies = "HTML, CSS, JavaScript";

            if (projectNumber === "Проект-1") {
                description = `
                    🌐 Platton - Адаптивный лендинг для логистической платформы <br>
HTML5 CSS3 JavaScript Responsive Design Pixel Perfect <br> <br>

Профессиональный адаптивный лендинг для логистической платформы Platton с фокусом на пользовательском опыте и конверсии. Полностью адаптивный дизайн с продуманной семантической структурой.
<br> <br>
👉 Живая демонстрация
<br> <br>
💡 Ключевые характеристики <br> <br> 
Полностью адаптивный дизайн (Mobile First) <br> <br>
Семантическая вёрстка с акцентом на доступность <br> <br>
Оптимизированная производительность <br> <br>
Кастомные SVG-графики для карт и инфографики <br>  <br> 
Современные CSS-эффекты (плавные переходы, анимации) <br> <br> 
 <a href="https://kiberwitch.github.io/Angular/">Ссылка на проект</a>
                `;
                technologies = "HTML5, CSS3,";
            } else if (projectNumber === "Проект-2") {
                description = `
                  Описание
Статическая верстка многостраничного сайта для школы английского языка. Проект выполнен с использованием HTML и CSS без адаптивной верстки (desktop-only).
 <br><br>
Сайт включает несколько связанных страниц с общей стилизацией и навигацией между ними.
 <br><br>
Структура сайта <br><br>
Главная страница - информация о школе, преимущества <br><br>
О нас - миссия, преподаватели <br><br>
Курсы - список программ обучения <br><br>
Цены - таблица тарифов <br><br>
Контакты - форма обратной связи, карта <br><br>
Блог - статьи об изучении языка <br><br>

 <a href="https://kiberwitch.github.io/English-courses-website/">Ссылка на проект</a>

                `;
                technologies = "HTML5, CSS3";
            } else if (projectNumber === "Проект-3") {
                description = `
                  Статический  сайт цветочной мастерской Petalia,  
                   выполненный с использованием HTML и CSS. Проект представляет собой элегантную верстку 
                    для цветочного бутика с акцентом на эстетику и атмосферность. <br> <br> 
               
                     <a href="https://kiberwitch.github.io/Petalia-flower-shop/">Ссылка на проект</a>
                `;
                technologies = "HTML5, CSS3, JS";
            } else if (projectNumber === "Проект-4") {
                description = `
                    Верстка учебного проекта для доработки продажи билетов. Основные функции:
                    <br><br>
                    • Поиск и выбор рейсов<br>
                    • Система бронирования мест<br> <br>
                     <a href="https://kiberwitch.github.io/Train-booking-seats/">Ссылка на проект</a>
                `;
                technologies = "HTML5, CSS3";
            } else if (projectNumber === "Проект-5") {
                description = `
                    Верстка интерфейса на Vue.js с использованием Tailwind CSS. Особенности:
                    <br><br>
                    • Компонентный подход<br>
                    • Адаптивный дизайн<br>
                    • Интерактивные элементы<br>
                    • Поп-ап формы <br>
                    • Слайдер циклический <br>
                    • Оптимизация производительности  <br> <br>
                              <a href="https://kiberwitch.github.io/Vue-Tailwind/">Ссылка на проект</a>
                `;
                technologies = "HTML5, CSS3, JavaScript, Vue.js, Tailwind CSS";
            } else if (projectNumber === "Проект-6") {
                description = `
                    Создание интернет-меню для немецкой кофейни с нуля. Функционал:
                    <br><br>
                    • Категории блюд<br>
                    • Фильтрация по параметрам<br>
                    • Корзина заказов<br>
                    • Отправка данных о заказах<br>
                    • Оставление чаевых <br>
                    • Выбор допиннгов <br>
                    • Адаптация под мобильные устройства <br> <br>
 <a href="   https://metimee.tilda.ws">Ссылка на проект</a>
                 
                `;
                technologies = "HTML5, CSS3, JavaScript";
            } else if (projectNumber === "Проект-7") {
                description = `
                    Внесение изменений в HTML-письмо для email-рассылки. Работа включала:
                    <br><br>
                    • Адаптацию под почтовые клиенты<br>
                    • Оптимизацию табличной верстки<br>
                    • Тестирование на различных устройствах<br>
                    • Исправление проблем с отображением <br> <br>
 <a href="https://kiberwitch.github.io/HTML_SMS/">Ссылка на проект</a>
                
                `;
                technologies = "HTML, CSS (inline styles), Email templates";
            } else if (projectNumber === "Проект-8") {
                description = `
                    Создание кастомного слайдера для платформы Tilda. Особенности:
                    <br><br>
                    • Адаптация под нужды клиента<br>
                    • Плавные анимации<br>
                    • Настройка управления<br> 
                    • Интеграция с существующим кодом
                `;
                technologies = "HTML5, CSS3, JavaScript, Tilda API";
            } else if (projectNumber === "Проект-9") {
                description = `
                    Создание продуктового лендинга с формой и слайдером. Функционал:
                    <br><br>
                    • Интерактивный слайдер товаров<br>
                    • Форма обратной связи<br>
                    • Анимации при скролле<br>
                    • Адаптация под мобильные устройства <br>  <br> 

                    <a href="https://kiberwitch.github.io/SAMOKAT/">Ссылка на проект</a>
                `;
                technologies = "HTML5, CSS3, JavaScript, Swiper.js, PHP";
            } else if (projectNumber === "Проект-10") {
                description = `
                    Доработка существующего лендинга. Выполненные задачи:
                    <br><br>
                    • Оптимизация скорости загрузки<br>
                    • Добавление новых секций<br>
                    • Исправление ошибок верстки<br>
                    • Улучшение адаптивности
 <br> <br>
                       <a href="https://kiberwitch.github.io/Vitaliti_Website/ ">Ссылка на проект</a>

                `;
                technologies = "HTML5, CSS3, JavaScript";
            } else if (projectNumber === "Проект-11") {
                description = `
                    Верстка интернет-магазина книг. Особенности проекта:
                    <br><br>
                    • Каталог с фильтрацией<br>
                    • Страница товара<br>
                    • Корзина покупок<br> <br> 
                     <a href="https://kiberwitch.github.io/Book_store/">Ссылка на проект</a>
                `;
                technologies = "HTML5, CSS3, JavaScript";
            } else if (projectNumber === "Проект-12") {
                description = `
                    Верстка сайта-визитки для юриста. Основные элементы:
                    <br><br>
                    • Информация о специалисте<br>
                    • Услуги и цены<br>
                    • Форма записи на консультацию<br>
                    • Адаптивный дизайн <br>  <br> 
                     <a href="https://kiberwitch.github.io/Site_business_ard_lawyer_Michelson/">Ссылка на проект</a>
                `;
                technologies = "HTML5, CSS3, JavaScript, Swiper.js";
            } else if (projectNumber === "Проект-13") {
                description = `
                    Лендинг для персонального астролога. Особенности:
                    <br><br>
                    • Анимированные элементы<br>
                    • Форма заказа гороскопа<br>
                    • Галерея отзывов<br>
                    • Адаптация под мобильные устройства
                `;
                technologies = "HTML5, CSS3, JavaScript";
            }

            modal.innerHTML = `
                <div class="modal-content">
                    <span class="modal-close">&times;</span>
                    <h2 class="modal-title">${projectName}</h2>
                    <p class="modal-tech"><strong>Использованные технологии:</strong> ${technologies}</p>
                    <p class="modal-description">${description}</p>
                </div>
            `;

            document.body.appendChild(modal);

            setTimeout(() => {
                modal.style.display = "flex";
                setTimeout(() => {
                    modal.style.opacity = "1";
                }, 10);
            }, 10);

            const closeBtn = modal.querySelector(".modal-close");
            closeBtn.addEventListener("click", function () {
                modal.style.opacity = "0";
                setTimeout(() => {
                    modal.style.display = "none";
                    modal.remove();
                }, 300);
            });

            modal.addEventListener("click", function (e) {
                if (e.target === modal) {
                    modal.style.opacity = "0";
                    setTimeout(() => {
                        modal.style.display = "none";
                        modal.remove();
                    }, 300);
                }
            });
        });
    });

    // Разблокировка аудио при первом клике
    document.body.addEventListener(
        "click",
        function unlockAudio() {
            iconSound
                .play()
                .then(() => {
                    document.body.removeEventListener("click", unlockAudio);
                })
                .catch((e) => {
                    console.log("Не удалось разблокировать аудио:", e);
                });
        },
        { once: true }
    );
});
