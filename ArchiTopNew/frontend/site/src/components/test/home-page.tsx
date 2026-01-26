'use client';
import './home-page.css';

const MainPage = () => {
  return (
    <div className="main-page">
      {/* Header */}
      <header className="header">
        <button className="list-property-btn">Разместить объект</button>

        <div className="logo">
          <svg width="78" height="74" viewBox="0 0 78 74" fill="none">
            <path
              d="M9.98117 29.7757C7.99609 30.081 6.46783 30.4907 5.36317 31.2058C4.35817 31.8486 3.65218 32.8127 3.20367 34.2589C2.70533 35.8497 2.94619 37.4888 3.73524 38.8626C4.53259 40.2446 5.89474 41.3533 7.62234 41.8595C13.561 43.5949 18.3368 41.3614 22.9631 39.2001C26.9332 37.3441 30.8037 35.5364 35.3885 35.906L36.1111 35.9622C31.4931 33.6885 29.101 29.8882 26.6924 26.0638C24.0677 21.9019 21.4265 17.6999 15.6789 16.0207C13.9513 15.5145 12.1822 15.7074 10.7204 16.4385C9.27518 17.1536 8.13729 18.3989 7.63894 19.9817C7.19043 21.4279 7.22366 22.6009 7.68878 23.6775C8.20374 24.8586 9.23365 26.0156 10.7204 27.3412L12.9463 29.3257L9.95625 29.7837L9.98117 29.7757ZM3.74355 28.8437C4.63226 28.2732 5.65387 27.8554 6.84159 27.526C6.04424 26.6262 5.42962 25.7263 5.01433 24.7702C4.26681 23.0589 4.18375 21.2752 4.84821 19.1541C5.57912 16.8 7.26519 14.9682 9.39146 13.9157C11.5011 12.8632 14.051 12.5739 16.5344 13.3051C19.8733 14.2772 22.2737 15.8921 24.2006 17.8284C22.8136 15.4985 21.875 12.815 21.8252 9.44851L21.8169 9.43245H21.8252C21.792 6.9257 22.7803 4.64391 24.4083 2.98078C26.0445 1.30158 28.3286 0.241034 30.8785 0.208896L30.8951 0.200861V0.208896C33.1792 0.184792 34.9234 0.747204 36.4101 1.90416C37.2407 2.55496 37.9716 3.37447 38.6443 4.37074C39.2922 3.3584 39.9982 2.51478 40.8121 1.84792C42.2657 0.65079 44.0016 0.0401723 46.294 0.00803445L46.3106 0V0.00803445C48.8438 -0.0160689 51.1528 0.980203 52.8306 2.6112C54.5 4.24219 55.5549 6.50791 55.5881 9.01466L55.5964 9.03072H55.5881C55.6047 10.5894 55.4552 11.9151 55.1728 13.0721C56.2526 12.2927 57.4569 11.6098 58.819 11.0554C61.2111 10.0913 63.7776 10.1234 65.9869 10.959C68.2129 11.8026 70.0817 13.4577 71.0617 15.7315C71.9421 17.7722 72.0501 19.5559 71.4853 21.3315C71.1697 22.3197 70.6547 23.2758 69.9488 24.256C71.1614 24.4649 72.2328 24.7782 73.1714 25.2603C74.8658 26.12 76.1033 27.4537 76.9837 29.5025C77.9638 31.7682 77.8641 34.2187 76.9173 36.3398C75.9787 38.4449 74.193 40.2365 71.8009 41.2007C68.6032 42.4942 65.6962 42.7272 62.947 42.4219C65.5218 43.37 67.9803 44.8563 70.2062 47.4033C71.884 49.3235 72.6232 51.7017 72.4654 53.9915C72.3076 56.2974 71.2362 58.5229 69.2926 60.1057C67.5401 61.5359 65.8125 62.1706 63.8939 62.1867C62.8224 62.1947 61.7261 62.0099 60.5549 61.6564C60.7211 62.8374 60.7294 63.9141 60.5383 64.9344C60.1978 66.7583 59.2675 68.3009 57.515 69.731C55.5715 71.3138 53.1296 71.9646 50.7541 71.7316C48.387 71.4986 46.0863 70.3979 44.4169 68.4857C42.2657 66.0271 41.1444 63.5123 40.5796 60.9815C40.3304 63.4802 39.5746 66.0593 37.8968 68.7669C36.5347 70.9603 34.4084 72.4306 32.0828 73.0332C29.7323 73.6438 27.1741 73.3706 24.9565 72.0851C22.9548 70.9201 21.7504 69.5221 21.1026 67.7465C20.7371 66.7422 20.5627 65.6415 20.5295 64.4122C19.3916 64.9666 18.3035 65.3362 17.2155 65.4968C15.2969 65.7781 13.4613 65.4085 11.4513 64.2515C9.23365 62.966 7.78014 60.9011 7.23196 58.6033C6.68378 56.3295 7.03263 53.8308 8.38646 51.6374C10.6373 48.0058 13.6191 45.9892 16.8583 44.6474C13.835 45.4509 10.5543 45.6598 6.76684 44.551C4.28342 43.8279 2.33156 42.221 1.16876 40.2124C0.00595025 38.1877 -0.351195 35.7613 0.379712 33.4153C1.04417 31.2942 2.13223 29.848 3.72693 28.8276L3.74355 28.8437Z"
              fill="white"
            />
          </svg>
          <div className="logo-text">
            <div className="logo-title">TRAVEL GRANDE</div>
            <div className="logo-subtitle">Unique Houses & Apartments</div>
          </div>
        </div>

        <button className="menu-btn">
          <svg width="72" height="40" viewBox="0 0 72 40" fill="none">
            <rect x="0.5" y="0.5" width="71" height="39" rx="19.5" stroke="white" />
            <path d="M24 12.5H33" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M24 17.5H33" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M15 22.5H33" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M15 27.5H33" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path
              d="M48 20C50.7614 20 53 17.7614 53 15C53 12.2386 50.7614 10 48 10C45.2386 10 43 12.2386 43 15C43 17.7614 45.2386 20 48 20Z"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M56.59 30C56.59 26.13 52.74 23 48 23C43.26 23 39.41 26.13 39.41 30" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <img src="https://api.builder.io/api/v1/image/assets/TEMP/1111384dd34c5a57d28a525904e797d1c617afd8?width=3840" alt="" className="hero-bg" />

        <div className="hero-overlay">
          <nav className="main-nav">
            <div className="nav-item active">Главная</div>
            <div className="nav-item">Объекты</div>
            <div className="nav-item">Города</div>
            <div className="nav-underline-container">
              <div className="nav-underline-full"></div>
              <div className="nav-underline-active"></div>
            </div>
          </nav>

          <h1 className="hero-title">
            Только избранные дома для вашего <span className="highlight">идеального</span> путешествия
          </h1>

          <p className="hero-subtitle">Каждый дом отобран вручную. Мы оставили только лучшее — для вас.</p>

          <div className="search-form">
            <div className="search-field">
              <div className="search-label">Город</div>
              <svg className="dropdown-icon" width="17" height="9" viewBox="0 0 17 9" fill="none">
                <path
                  d="M16.28 0.966667L11.933 5.31333C11.42 5.82667 10.58 5.82667 10.067 5.31333L5.72 0.966667"
                  stroke="#2B2A29"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="search-field">
              <div className="search-label">Дата</div>
              <svg className="dropdown-icon" width="17" height="9" viewBox="0 0 17 9" fill="none">
                <path
                  d="M16.28 0.966667L11.933 5.31333C11.42 5.82667 10.58 5.82667 10.067 5.31333L5.72 0.966667"
                  stroke="#2B2A29"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="search-field">
              <div className="search-label">Гости</div>
              <svg className="dropdown-icon" width="17" height="9" viewBox="0 0 17 9" fill="none">
                <path
                  d="M16.28 0.966667L11.933 5.31333C11.42 5.82667 10.58 5.82667 10.067 5.31333L5.72 0.966667"
                  stroke="#2B2A29"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <button className="search-btn">Найти</button>
          </div>
        </div>
      </section>

      {/* Why TravelGrande Section */}
      <section className="why-section">
        <h2 className="section-title">
          Почему <span className="highlight">TravelGrande</span>
        </h2>

        <div className="features-grid">
          <div className="feature-card">
            <img src="https://api.builder.io/api/v1/image/assets/TEMP/2d70add9fe8aa42ffdceaf59cd301a5585caf331?width=44" alt="" className="feature-icon" />
            <div className="feature-text">Только проверенные объекты</div>
          </div>

          <div className="feature-card">
            <img src="https://api.builder.io/api/v1/image/assets/TEMP/ae0637a2e0f7ddabfb4f76500e8ea8b0d0ad8a67?width=56" alt="" className="feature-icon" />
            <div className="feature-text">Без посредников</div>
          </div>

          <div className="feature-card">
            <img src="https://api.builder.io/api/v1/image/assets/TEMP/e6db59ce58437c8662e81c8540e31ad7a2104695?width=58" alt="" className="feature-icon" />
            <div className="feature-text">Эксклюзивные объекты</div>
          </div>

          <div className="feature-card">
            <img src="https://api.builder.io/api/v1/image/assets/TEMP/464f40e1bf39d86bba664f6acf4ffe55e2d6845b?width=58" alt="" className="feature-icon" />
            <div className="feature-text">Красивее, чем в Instagram</div>
          </div>
        </div>
      </section>

      {/* Destinations Section */}
      <section className="destinations-section">
        <h2 className="section-title">выберите направление</h2>

        <div className="destinations-navigation">
          <button className="nav-arrow nav-arrow-left">
            <svg width="42" height="40" viewBox="0 0 42 40" fill="none">
              <rect x="41.5" y="39.5" width="41" height="39" rx="19.5" transform="rotate(180 41.5 39.5)" stroke="#C8AC71" />
              <path
                d="M23.0333 25.28L18.6867 20.9333C18.1733 20.42 18.1733 19.58 18.6867 19.0666L23.0333 14.72"
                stroke="#C8AC71"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button className="nav-arrow nav-arrow-right">
            <svg width="42" height="40" viewBox="0 0 42 40" fill="none">
              <rect width="42" height="40" rx="20" fill="#C8AC71" />
              <path
                d="M18.9667 14.72L23.3133 19.0667C23.8267 19.58 23.8267 20.42 23.3133 20.9334L18.9667 25.28"
                stroke="white"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className="destinations-grid">
          <div className="destination-card">
            <img src="https://api.builder.io/api/v1/image/assets/TEMP/b0a0066006c3ba6a49cce8d04fe6e12b2ebd7294?width=650" alt="Горный воздух республики Алтай" />
            <div className="destination-name">Горный воздух республики Алтай</div>
          </div>

          <div className="destination-card">
            <img src="https://api.builder.io/api/v1/image/assets/TEMP/80e54d9c11be4b2c3837061293396e8c76447973?width=650" alt="Уникальное жильё в Санкт-Петербурге" />
            <div className="destination-name">Уникальное жильё в Санкт-Петербурге</div>
          </div>

          <div className="destination-card">
            <img src="https://api.builder.io/api/v1/image/assets/TEMP/9cf4cf4d382ddc563f600a5f57bd416afd06f870?width=650" alt="Найдите вдохновение на Байкале" />
            <div className="destination-name">Найдите вдохновение на Байкале</div>
          </div>

          <div className="destination-card">
            <img src="https://api.builder.io/api/v1/image/assets/TEMP/15975635b1135515fccad37f0468929ec088fcf9?width=650" alt="Дома на побережье Калининграда" />
            <div className="destination-name">Дома на побережье Калининграда</div>
          </div>
        </div>
      </section>

      {/* New Houses Section */}
      <section className="new-houses-section">
        <h2 className="section-title">
          <span className="highlight">Новые дома</span> в TravelGrande
        </h2>
        <p className="section-description">Подборка свежих объектов, которые уже прошли нашу проверку и готовы принять гостей</p>

        <div className="houses-grid">
          {[1, 2, 3, 4].map(item => (
            <div key={item} className="house-card">
              <div className="house-image-container">
                <img src="https://api.builder.io/api/v1/image/assets/TEMP/834383aa22ba469db34201ba3cc0f3b708659262?width=650" alt="Дом у моря в Сочи" />
                <div className="image-dots">
                  <span className="dot active"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
                <button className="image-nav image-nav-left">
                  <svg width="42" height="40" viewBox="0 0 42 40" fill="none">
                    <rect x="42" y="40" width="42" height="40" rx="20" transform="rotate(180 42 40)" fill="white" fillOpacity="0.5" />
                    <path
                      d="M23.0333 25.28L18.6867 20.9333C18.1733 20.42 18.1733 19.58 18.6867 19.0666L23.0333 14.72"
                      stroke="#2B2A29"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <button className="image-nav image-nav-right">
                  <svg width="42" height="40" viewBox="0 0 42 40" fill="none">
                    <rect width="42" height="40" rx="20" fill="white" />
                    <path
                      d="M18.9667 14.72L23.3133 19.0667C23.8267 19.58 23.8267 20.42 23.3133 20.9334L18.9667 25.28"
                      stroke="#2B2A29"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>

              <div className="house-content">
                <div className="house-badge">NEW</div>
                <button className="favorite-btn">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12.0074 21.2275L2.62281 12.7269C-2.47755 7.62659 5.01996 -2.16608 12.0074 5.75645C18.9949 -2.16608 26.4585 7.6606 21.3921 12.7269L12.0074 21.2275Z"
                      stroke="#2B2A29"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                <h3 className="house-title">Дом у моря в Сочи</h3>

                <div className="house-location">
                  <svg width="12" height="16" viewBox="0 0 12 16" fill="none">
                    <path
                      d="M12 6.54545C12 10.9091 6 16 6 16C6 16 0 10.9091 0 6.54545C0 2.98036 2.732 0 6 0C9.268 0 12 2.98036 12 6.54545Z"
                      stroke="#BE8817"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6 8.72741C7.10457 8.72741 8 7.75058 8 6.54559C8 5.3406 7.10457 4.36377 6 4.36377C4.89543 4.36377 4 5.3406 4 6.54559C4 7.75058 4.89543 8.72741 6 8.72741Z"
                      stroke="#BE8817"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>Сочи, Адлер</span>
                </div>

                <p className="house-description">Современная вилла с бассейном, террасой и панорамным видом на Черное море. 3 спальни, до 6 гостей.</p>

                <div className="house-price">
                  от 40 500 ₽ <span className="price-period">/ ночь</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="view-more-btn">Смотреть больше</button>
      </section>

      {/* How We Choose Section */}
      <section className="how-we-choose-section">
        <h2 className="section-title">
          Как мы выбираем <span className="highlight">жильё</span>
        </h2>
        <p className="section-description">TravelGrande — здесь только лучшее.</p>

        <div className="steps-grid">
          <div className="step-card">
            <div className="step-header">
              <div className="step-number">01</div>
              <div className="step-title">Проверено экспертами</div>
            </div>
            <div className="step-divider"></div>
            <p className="step-description">Наши кураторы вручную отобрали лучшие варианты и отсеяли тысячи неподходящих. Мы сделали это за вас — чтобы избежать случайностей и разочарований.</p>
          </div>

          <div className="step-card">
            <div className="step-header">
              <div className="step-number">02</div>
              <div className="step-title">Забота в каждой детали</div>
            </div>
            <div className="step-divider"></div>
            <p className="step-description">Опытные специалисты по дому отвечают за чистоту, порядок и комфорт, чтобы ваше пребывание было действительно особенным.</p>
          </div>

          <div className="step-card">
            <div className="step-header">
              <div className="step-number">03</div>
              <div className="step-title">Полная уверенность</div>
            </div>
            <div className="step-divider"></div>
            <p className="step-description">В редких случаях, если что-то идёт не по плану, мы оперативно решим ситуацию и подберём достойную замену — с выгодными условиями и вниманием к деталям.</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="about-content">
          <svg className="about-icon" width="55" height="53" viewBox="0 0 55 53" fill="none">
            <path
              d="M7.0675 21.5164C5.6619 21.7371 4.57977 22.0331 3.79757 22.5499C3.08595 23.0143 2.58605 23.711 2.26847 24.7561C1.9156 25.9056 2.08615 27.09 2.64486 28.0828C3.20945 29.0814 4.17397 29.8826 5.39725 30.2484C9.60229 31.5025 12.984 29.8884 16.2598 28.3267C19.071 26.9855 21.8116 25.6792 25.058 25.9463L25.5697 25.9869C22.2997 24.3439 20.606 21.5977 18.9004 18.8341C17.042 15.8267 15.1718 12.7903 11.102 11.5768C9.8787 11.2111 8.62601 11.3504 7.59092 11.8787C6.5676 12.3955 5.76188 13.2954 5.40901 14.4391C5.09143 15.4842 5.11495 16.3318 5.4443 17.1098C5.80893 17.9633 6.53819 18.7993 7.59092 19.7573L9.16708 21.1913L7.04986 21.5222L7.0675 21.5164ZM2.65074 20.843C3.28003 20.4307 4.00341 20.1288 4.84442 19.8908C4.27983 19.2405 3.84462 18.5903 3.55056 17.8994C3.02126 16.6627 2.96244 15.3739 3.43294 13.8411C3.95048 12.14 5.14436 10.8163 6.64994 10.0557C8.14376 9.29514 9.94928 9.08613 11.7077 9.61446C14.072 10.317 15.7716 11.4839 17.1361 12.8832C16.1539 11.1995 15.4893 9.26031 15.4541 6.82766L15.4482 6.81605H15.4541C15.4305 5.00463 16.1304 3.35577 17.2831 2.15396C18.4417 0.940545 20.059 0.174175 21.8645 0.150952L21.8763 0.145146V0.150952C23.4936 0.133534 24.7287 0.539943 25.7814 1.37598C26.3695 1.84626 26.887 2.43845 27.3634 3.15837C27.8222 2.42684 28.3221 1.81723 28.8984 1.33534C29.9276 0.470273 31.1568 0.0290292 32.78 0.00580584L32.7917 0V0.00580584C34.5855 -0.0116117 36.2205 0.708312 37.4085 1.8869C38.5906 3.06548 39.3375 4.70273 39.361 6.51415L39.3669 6.52576H39.361C39.3728 7.65209 39.2669 8.61005 39.067 9.4461C39.8315 8.88293 40.6843 8.38943 41.6488 7.98883C43.3426 7.29213 45.1599 7.31535 46.7242 7.91916C48.3004 8.52877 49.6237 9.72477 50.3176 11.3678C50.941 12.8425 51.0175 14.1314 50.6176 15.4145C50.3941 16.1286 50.0295 16.8195 49.5296 17.5278C50.3882 17.6788 51.1469 17.9052 51.8115 18.2535C53.0112 18.8748 53.8875 19.8385 54.5109 21.319C55.2049 22.9563 55.1343 24.7271 54.4639 26.2598C53.7993 27.7809 52.5348 29.0756 50.8411 29.7723C48.5768 30.7071 46.5184 30.8754 44.5717 30.6548C46.3949 31.3399 48.1357 32.414 49.7119 34.2544C50.8999 35.642 51.4233 37.3605 51.3116 39.0152C51.1998 40.6815 50.4411 42.2897 49.0649 43.4335C47.824 44.4669 46.6007 44.9256 45.2422 44.9372C44.4835 44.943 43.7072 44.8094 42.878 44.554C42.9956 45.4074 43.0015 46.1854 42.8662 46.9228C42.6251 48.2407 41.9664 49.3554 40.7254 50.3889C39.3493 51.5326 37.6202 52.0029 35.9382 51.8345C34.262 51.6661 32.633 50.8707 31.4508 49.4889C29.9276 47.7124 29.1337 45.8951 28.7337 44.0663C28.5573 45.8719 28.0221 47.7356 26.8341 49.6922C25.8696 51.2771 24.364 52.3396 22.7173 52.775C21.0529 53.2163 19.2415 53.0189 17.6713 52.09C16.2539 51.2481 15.4011 50.2379 14.9424 48.9548C14.6836 48.2291 14.5601 47.4337 14.5366 46.5454C13.7309 46.946 12.9604 47.2131 12.19 47.3292C10.8315 47.5324 9.53171 47.2653 8.10847 46.4293C6.5382 45.5003 5.50899 44.0082 5.12083 42.3478C4.73268 40.7047 4.97969 38.8991 5.93832 37.3141C7.53211 34.6899 9.64345 33.2326 11.9371 32.263C9.79636 32.8436 7.4733 32.9946 4.79149 32.1934C3.03302 31.6708 1.65094 30.5097 0.827577 29.0582C0.00421327 27.5951 -0.248675 25.8418 0.268868 24.1465C0.739362 22.6137 1.50979 21.5687 2.63898 20.8313L2.65074 20.843Z"
              fill="#C8AC71"
            />
          </svg>

          <h2 className="about-title">
            TravelGrande —<br />
            это не просто каталог домов.
          </h2>

          <p className="about-text">Мы верим, что дом для путешествия должен вдохновлять.Он должен быть уютным, красивым, с характером — таким, чтобы туда хотелось вернуться.</p>

          <p className="about-text">
            Мы лично отбираем каждый объект: по стилю, комфорту, атмосфере и деталям.Никаких случайных квартир, посредников или компромиссов. Только дома, в которые мы бы поехали сами.
          </p>
        </div>

        <div className="about-image">
          <img src="https://api.builder.io/api/v1/image/assets/TEMP/ea86c87a953f5dbf8cafa30bb70c44b2813a22e2?width=1010" alt="" />
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <img src="https://api.builder.io/api/v1/image/assets/TEMP/7013eb241b7f5564164a865ca9ee51658dc4a406?width=3840" alt="" className="cta-bg" />

        <div className="cta-content">
          <h2 className="cta-title">
            Начните планировать идеальное путешествие <span className="highlight">уже сегодня</span>
          </h2>

          <p className="cta-text">Найдите дом, который станет частью вашего отдыха. Проверенные варианты, ручной отбор, только лучшее.</p>

          <button className="cta-btn">К объектам</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <svg width="67" height="66" viewBox="0 0 67 66" fill="none">
              <path
                d="M8.6095 26.794C6.89722 27.0688 5.57899 27.4375 4.62613 28.081C3.75925 28.6594 3.15028 29.5269 2.76341 30.8283C2.33355 32.2599 2.54131 33.7348 3.22192 34.9711C3.9097 36.2146 5.08465 37.2123 6.57483 37.6678C11.6973 39.2295 15.8168 37.2196 19.8074 35.2747C23.2319 33.6046 26.5705 31.9779 30.5252 32.3105L31.1485 32.3611C27.1651 30.315 25.1018 26.8953 23.0241 23.4538C20.7602 19.7087 18.482 15.9275 13.5242 14.4164C12.0341 13.961 10.508 14.1345 9.24713 14.7924C8.00053 15.4359 7.01902 16.5565 6.58916 17.9808C6.20228 19.2822 6.23095 20.3377 6.63215 21.3065C7.07634 22.3693 7.96471 23.4104 9.24713 24.6034L11.1672 26.3892L8.58801 26.8013L8.6095 26.794Z"
                fill="#C8AC71"
              />
            </svg>

            <div className="footer-logo-text">
              <div className="footer-logo-title">TRAVEL GRANDE</div>
              <div className="footer-logo-subtitle">Unique Houses & Apartments</div>
            </div>
          </div>

          <div className="footer-links">
            <div className="footer-column">
              <a href="#" className="footer-link">
                Объекты
              </a>
              <a href="#" className="footer-link">
                Города
              </a>
              <a href="#" className="footer-link">
                О нас
              </a>
              <a href="#" className="footer-link">
                FAQ
              </a>
              <a href="#" className="footer-link">
                Контакты
              </a>
            </div>

            <div className="footer-column">
              <a href="#" className="footer-link">
                Для собственников
              </a>
              <a href="#" className="footer-link">
                Как забронировать
              </a>
              <a href="#" className="footer-link">
                Политика конфиденциальности
              </a>
              <a href="#" className="footer-link">
                Пользовательское соглашение
              </a>
              <a href="#" className="footer-link">
                Контакты
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainPage;
