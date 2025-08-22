
// --- Lightweight self-integrity check (best-effort) ---
(async function selfIntegrity() {
  try {
    const GAS_URL = "https://script.google.com/macros/s/AKfycbzo4obkd_i5YRnMI0r8breZbww0NkbsQB4prTR_NXls9zif4Mh5VycKvjdKHcY-VojFTA/exec"; // твой URL

async function loginWithToken(token, username="") {
  try {
    const resp = await fetch(GAS_URL, {
      method: "POST",
      body: new URLSearchParams({
        action: "login",
        token: token,
        username: username
      })
    });
    const data = await resp.json();
    console.log("Ответ от GAS:", data);
    if (data.status === "valid") {
      localStorage.setItem("sessionId", data.sessionId);
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.error("Ошибка соединения:", err);
    return false;
  }
}

    const meta = document.querySelector('meta[name="x-app-code-sha256"]');
    if (!meta) return;
    const expected = meta.getAttribute('content');
    const current = document.currentScript && document.currentScript.src;
    if (!current || !expected) return;
    const res = await fetch(current, { cache: 'no-store' });
    const buf = await res.arrayBuffer();
    const digest = await crypto.subtle.digest('SHA-256', buf);
    const hashArray = Array.from(new Uint8Array(digest));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2,'0')).join('');
    if (hashHex !== expected) {
      alert('Обнаружено изменение кода приложения. Работа остановлена.');
      throw new Error('Integrity check failed');
    }
  } catch (e) {
    console.error(e);
  }
})();


// --- Simple runtime gate to prevent actions without server-validated session ---
function requireAuth() {
  try {
    const ok = sessionStorage.getItem('ticket_access_granted') === 'true';
    if (!ok) {
      alert('Сначала выполните вход по токену.');
      throw new Error('Not authorized');
    }
  } catch (e) {
    throw e;
  }
}


    // Получаем элементы для управления
    const inputScreen = document.getElementById('inputScreen');
    const mainScreen = document.getElementById('mainScreen');
    const countdownEl = document.getElementById('countdown');
    const dateOutput = document.getElementById('dateOutput');
    const timeOutput = document.getElementById('timeOutput');
    const closeButton = document.getElementById('closeButton');

    // Выводы для билета
    const carrierOutput = document.getElementById('carrierOutput');
    const routeOutput = document.getElementById('routeOutput');
    const plateOutput = document.getElementById('plateOutput');
    const fareOutput = document.getElementById('fareOutput');

    // Вкладки и экраны
    const tabs = document.querySelectorAll('.tab-item');
    const screens = document.querySelectorAll('#mainScreen > .screen');

    // Дефолтные данные, если что-то не введено
    const defaultData = {
      carrier: 'КПАТП-5',
      route: '3-я Дальневосточная - Молодежная',
      plate: 'в447рр124',
      fare: '44.00',
      count: '1',
    };

    let countdownInterval;

    // Функция переключения вкладок
    function switchTab(tabName, event) {
      tabs.forEach(tab => {
        if (tab.textContent.trim() === 'Контроль' && tabName === 'control') {
          tab.classList.add('active');
        } else if (tab.textContent.trim() !== 'Контроль' && tabName === 'ticket') {
          tab.classList.add('active');
        } else {
          tab.classList.remove('active');
        }
      });
      // Показываем/скрываем экраны по имени вкладки
      if (tabName === 'ticket') {
        document.getElementById('ticket').classList.add('active');
        document.getElementById('control').classList.remove('active');
      } else {
        document.getElementById('ticket').classList.remove('active');
        document.getElementById('control').classList.add('active');
      }
      if (tabName === 'control') {
    // Всегда показываем overlay при заходе на вкладку Контроль
    document.getElementById('qrBlockOverlay').style.display = 'flex';
} else {
    // Если ушли с вкладки Контроль, можно скрыть overlay (если нужно)
    document.getElementById('qrBlockOverlay').style.display = 'none';
}

    }

   function startCountdown() {
  let time = 15;
  countdownEl.textContent = time;

  const closeBtn = document.getElementById('closeButton');
  if (closeBtn) {
    closeBtn.classList.add('disabled'); // блокируем через CSS
    closeBtn.onclick = null; // временно убираем действие
  }

  countdownInterval = setInterval(() => {
    time--;
    if (time <= 0) {
      clearInterval(countdownInterval);
      countdownEl.textContent = '0';

      if (closeBtn) {
        closeBtn.classList.remove('disabled'); 
        closeBtn.onclick = closeApp; // возвращаем функцию
      }
    } else {
      countdownEl.textContent = time;
    }
  }, 1000);
}




    async function submitForm() {
  // Считываем значения из инпутов
  const carrier = document.getElementById('inputCarrier').value.trim() || defaultData.carrier;
  const route = document.getElementById('inputRoute').value.trim() || defaultData.route;
  const plate = document.getElementById('inputPlate').value.trim() || defaultData.plate;
  const count = parseInt(document.getElementById('inputCount').value, 10) || defaultData.count;

  // Определяем тариф
  const selectedType = document.getElementById('transportType').value;
  const pricePerTicket = selectedType === 'bus' ? 44 : 40;
  const fare = count * pricePerTicket;

  // Заполняем данные на основном экране
  carrierOutput.textContent = carrier;
  routeOutput.textContent = route;
  plateOutput.textContent = plate;
  fareOutput.textContent = `${count} шт., Полный, ${fare} ₽`;

  // Устанавливаем текущие дату и время
  const now = new Date();
  dateOutput.textContent = now.toLocaleDateString('ru-RU');
  timeOutput.textContent = now.toLocaleTimeString('ru-RU', {hour: '2-digit', minute: '2-digit'});

  // Скрываем экран ввода, показываем основной
  inputScreen.classList.remove('active');
  mainScreen.classList.add('active');

  // Запускаем таймер
  startCountdown();
}



    // Функция "Закрыть" - просто сбрасывает к экрану ввода
    function closeApp() {
      clearInterval(countdownInterval);
      inputScreen.classList.add('active');
      mainScreen.classList.remove('active');

      // Очищаем инпуты
      ['inputCarrier','inputRoute','inputPlate','inputFare','inputCount'].forEach(id => {
        document.getElementById(id).value = '';
      });

      // Сброс вкладок к первой
      switchTab('ticket');
    }

    // Инициализация: отображаем вкладку "1 070 004 271" и активируем кнопку "ЗАКРЫТЬ"
    switchTab('ticket');

    // Кнопка "ЗАКРЫТЬ" всегда видна только на основном экране
    function updateCloseButtonVisibility() {
      if (mainScreen.classList.contains('active')) {
        closeButton.style.display = 'block';
      } else {
        closeButton.style.display = 'none';
      }
    }

    // Следим за сменой экранов и обновляем видимость кнопки
    const observer = new MutationObserver(updateCloseButtonVisibility);
    observer.observe(mainScreen, { attributes: true, attributeFilter: ['class'] });

    // Изначальный вызов
    updateCloseButtonVisibility();

    function highlightField(id, isValid) {
  const el = document.getElementById(id);
  if (!el) return;
  if (isValid) {
    el.classList.remove('input-invalid');
  } else {
    el.classList.add('input-invalid');
  }
}


function recognizeFromPhoto() {
  const fileInput = document.getElementById('photoInput');
  const file = fileInput.files[0];
  document.getElementById('loadingOverlay').style.display = 'flex';

  if (!file) {
    alert("Пожалуйста, выберите фото.");
    document.getElementById('loadingOverlay').style.display = 'none';
    return;
  }

  const img = new Image();
  img.src = URL.createObjectURL(file);

  img.onload = async () => {
    const BASE_WIDTH = 1080;
    const DEBUG = false;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    const scale = img.width / BASE_WIDTH;

    // Шаблон координат — оригинальные (для BASE_WIDTH), масштабируем
    const zones = {
      inputCarrier: [
        { x: 203, y: 942, width: 769, height: 94 },
        { x: 203, y: 942, width: 769, height: 94 }
      ],
      inputRoute: [
        { x: 218, y: 1106, width: 586, height: 136 },
        { x: 217, y: 1107, width: 759, height: 61 }
      ],
      inputPlate: [
        { x: 229, y: 1244, width: 371, height: 103 },
        { x: 230, y: 1174, width: 389, height: 75 }
      ],
      inputFare: [
        { x: 588, y: 2195, width: 50, height: 54 }
      ]
    };

    // Улучшенный OCR с фильтрами и масштабом
    async function extractTextFromZone(zone, label = '') {
      const { x, y, width, height } = zone;
      const sx = x * scale;
      const sy = y * scale;
      const sw = width * scale;
      const sh = height * scale;

      const regionCanvas = document.createElement('canvas');
      regionCanvas.width = sw;
      regionCanvas.height = sh;
      const regionCtx = regionCanvas.getContext('2d');

      // Улучшаем визуальное качество
      regionCtx.filter = 'grayscale(100%) contrast(150%) brightness(110%)';
      regionCtx.drawImage(img, sx, sy, sw, sh, 0, 0, sw, sh);

      // Отладка — показать вырезку
      if (DEBUG) {
        const debugImg = document.createElement('img');
        debugImg.src = regionCanvas.toDataURL();
        debugImg.style.border = '1px solid red';
        debugImg.style.margin = '4px';
        debugImg.title = label;
        document.body.appendChild(debugImg);
      }

      const { data: { text } } = await Tesseract.recognize(regionCanvas, 'rus+eng');
      return text.trim().replace(/\s+/g, ' ');
    }

    // Пытаемся получить текст из основной зоны, иначе — из запасной
    async function getTextWithFallback(field) {
      const primary = await extractTextFromZone(zones[field][0], `${field}-main`);
      if ((!primary || primary.length < 4) && zones[field].length > 1) {
        const fallback = await extractTextFromZone(zones[field][1], `${field}-fallback`);
        return fallback;
      }
      return primary;
    }

    function normalizeRecognizedData(carrier, route, plate, fare) {
  // carrier: ничего не трогаем, кроме пробелов
  carrier = carrier.trim().replace(/\s+/g, ' ');

  // route: кириллица + тире, только один тире между двумя точками
  route = route
    .replace(/[^\p{Script=Cyrillic}\- ]+/gu, '') // убрать всё, кроме кириллицы, пробелов, тире
    .replace(/—/g, '-')                          // длинное тире → обычное
    .replace(/\s*-\s*/g, ' - ')                  // нормализовать тире между точками
    .replace(/\s+/g, ' ')                        // убрать двойные пробелы
    .trim();

  // plate: только маленькие русские буквы из ГОСТа + цифры
  const validPlateLetters = ['а','в','е','к','м','н','о','р','с','т','у','х'];
  // plate: английские буквы → русские, фильтр, валидация
const latinToCyrillicMap = {
  a: 'а', b: 'в', c: 'с', e: 'е', h: 'н', k: 'к', m: 'м',
  n: 'н', o: 'о', p: 'р', r: 'р', s: 'с', t: 'т', u: 'у', x: 'х'
};

plate = plate
  .toLowerCase()
  .replace(/[^a-zа-я0-9]/g, '') // убрать всё лишнее, кроме латиницы, кириллицы, цифр
  .split('')
  .map(ch => {
    if (latinToCyrillicMap[ch]) return latinToCyrillicMap[ch]; // латинская → русская
    return ch; // оставить цифры и кириллицу
  })
  .join('');

// Теперь проверим два допустимых варианта:
const isStandard = /^[авекмнорстух]\d{3}[авекмнорстух]{2}\d{2,3}$/.test(plate);
const isTrolley = /^\d{4}$/.test(plate);
plate = (isStandard || isTrolley) ? plate : '';

  // fare: оставить только допустимый формат (например: 2.00 или 25)
  fare = fare.replace(/[^\d.,]/g, '');

  // Проверка формата: одно число, возможно с точкой/запятой
  const match = fare.match(/^\d{1,3}([.,]\d{1,2})?$/);
  fare = match ? match[0].replace(',', '.') : ''; // если невалидно — пусто

  return { carrier, route, plate, fare };
}

    try {
      const carrierText = await getTextWithFallback('inputCarrier');
      let routeTextRaw = await getTextWithFallback('inputRoute');
      const plateText = await getTextWithFallback('inputPlate');
      const fareText = await extractTextFromZone(zones.inputFare[0], 'fare');

      const matchRoute = routeTextRaw.match(/(?:\d+[,.:])?\s*(.+)/);
      const routeText = matchRoute ? matchRoute[1] : routeTextRaw;
      
      const cleaned = normalizeRecognizedData(carrierText, routeText, plateText, fareText);

      document.getElementById('inputCarrier').value = cleaned.carrier;
      document.getElementById('inputRoute').value = cleaned.route;
      document.getElementById('inputPlate').value = cleaned.plate;
      document.getElementById('inputFare').value = cleaned.fare;

      highlightField('inputCarrier', cleaned.carrier.length >= 4);
      highlightField('inputRoute', cleaned.route.includes(' - '));
      highlightField('inputPlate', cleaned.plate.length >= 4); // или 4 для троллейбуса
      highlightField('inputFare', /^\d+(\.\d{1,2})?$/.test(cleaned.fare));



      alert("Распознавание завершено. Проверьте данные.");
    } catch (error) {
      alert("Ошибка распознавания: " + error.message);
    } finally {
      document.getElementById('loadingOverlay').style.display = 'none';
    }
  };

  img.onerror = () => {
    alert("Не удалось загрузить изображение.");
    document.getElementById('loadingOverlay').style.display = 'none';
  };
}
    
    function updateCountLabel(value) {
  document.getElementById('sliderValue').textContent = value;
  document.getElementById('inputCount').value = value;
}

    window.addEventListener('DOMContentLoaded', () => {
  const accessGranted = sessionStorage.getItem('ticket_access_granted');
  if (accessGranted === 'true') {
    document.getElementById('authScreen').style.display = 'none';
    document.getElementById('inputScreen').classList.add('active');

    // 👇 Важно: показываем админ-кнопку если надо
    if (sessionStorage.getItem('is_admin') === 'true') {
      document.getElementById('adminButton').style.display = 'inline-block';
    }
  }
});

async function checkAccess() {
  const token = document.getElementById('authToken').value.trim();
  if (!token) return alert('Введите токен');

  // Показываем лоадер, у тебя есть overlay с id loadingOverlay
  document.getElementById('loadingOverlay').style.display = 'flex';

  try {
    const res = await fetch(GAS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        action: 'login',
        token: token,
        username: navigator.userAgent.slice(0, 80) // опционально
      })
    });

    const text = await res.text();
    let data;
    try { data = JSON.parse(text); } catch { /* не JSON — старый ответ */ }

    if (data && data.status === 'valid' && data.sessionId) {
      // сохраняем сессию — «запомнить пользователя»
      localStorage.setItem('sessionId', data.sessionId);

      // показываем приложение
      document.getElementById('authScreen').style.display = 'none';
      document.getElementById('inputScreen').classList.add('active');

      // админ-кнопку теперь можно показывать всегда — действия в ней всё равно защищены adminKey
      const btn = document.getElementById('adminButton');
      if (btn) btn.style.display = 'inline-block';

    } else if (text === 'already_used') {
      alert('Токен уже был использован.');
    } else {
      alert('Доступ запрещён. Неверный токен.');
    }
  } catch (e) {
    console.error(e);
    alert('Ошибка соединения. Попробуйте позже.');
  } finally {
    document.getElementById('loadingOverlay').style.display = 'none';
  }
}

    async function addToken() {
  const adminKey = document.getElementById('adminKeyInput').value.trim();
  const token = document.getElementById('newTokenInput').value.trim();
  if (!adminKey) return alert('Введите Admin ключ');
  if (!token) return alert('Введите токен');

  try {
    const res = await fetch(GAS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ action: 'add', token, adminKey })
    });
    const result = await res.text();
    if (result === 'added') {
      alert('Токен добавлен');
      document.getElementById('newTokenInput').value = '';
      loadTokens(); // обновим список
    } else if (result === 'forbidden') {
      alert('Неверный Admin ключ');
    } else {
      alert('Ошибка: ' + result);
    }
  } catch (e) {
    alert('Ошибка подключения');
  }
}

async function removeToken() {
  const adminKey = document.getElementById('adminKeyInput').value.trim();
  const token = document.getElementById('removeTokenInput').value.trim();
  if (!adminKey) return alert('Введите Admin ключ');
  if (!token) return alert('Введите токен для удаления');

  try {
    const res = await fetch(GAS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ action: 'remove', token, adminKey })
    });
    const result = await res.text();
    if (result === 'removed') {
      alert('Токен удалён');
      document.getElementById('removeTokenInput').value = '';
      loadTokens();
    } else if (result === 'not_found') {
      alert('Токен не найден');
    } else if (result === 'forbidden') {
      alert('Неверный Admin ключ');
    } else {
      alert('Ошибка: ' + result);
    }
  } catch (e) {
    alert('Ошибка подключения');
  }
}

async function loadTokens() {
  const adminKey = document.getElementById('adminKeyInput').value.trim();
  if (!adminKey) return alert('Введите Admin ключ');

  try {
    const res = await fetch(GAS_URL + '?action=list&adminKey=' + encodeURIComponent(adminKey));
    const data = await res.json();
    const list = document.getElementById('tokenList');
    list.innerHTML = '';
    data.forEach(row => {
      const li = document.createElement('li');
      li.textContent = `🔑 ${row.token} — ${row.status || 'unknown'}`;
      list.appendChild(li);
    });
  } catch (e) {
    alert('Не удалось загрузить список токенов');
  }
}


    function toggleAdminMenu() {
  const panel = document.getElementById('adminPanel');
  panel.style.display = panel.style.display === 'none' ? 'flex' : 'none';
}

async function loadTokens() {
  const url = 'https://script.google.com/macros/s/AKfycbzo4obkd_i5YRnMI0r8breZbww0NkbsQB4prTR_NXls9zif4Mh5VycKvjdKHcY-VojFTA/exec?action=list';

  try {
    const res = await fetch(url);
    const data = await res.json();

    const list = document.getElementById('tokenList');
    list.innerHTML = ''; // очищаем список

    data.forEach(row => {
      const li = document.createElement('li');
      li.textContent = `🔑 ${row.token} — ${row.status || 'unknown'}`;
      list.appendChild(li);
    });
  } catch (err) {
    console.error(err);
    alert('Не удалось загрузить список токенов.');
  }
}
    /* === Локальные данные маршрутов === */
const routesData = {
  buses: [
    { number: "2",  carrier: "ИП Багаев Д.Б.", route: "Автовокзал \"Восточный\" - Дом Учёных" },
    { number: "3",  carrier: "ООО \"СТК\"", route: "Академгородок - Автовокзал «Восточный»" },
    { number: "5",  carrier: "ИП Долгушина Г.И.", route: "Спорткомплекс «Радуга» - ОАО «Красфарма»" },
    { number: "6",  carrier: "ИП Тагачаков В.Г.", route: "ДК «Кировский» - Кардиоцентр" },
    { number: "7",  carrier: "ООО «Экипаж-ГО»", route: "ДК \"Кировский\" - Агротерминал" },
    { number: "8",  carrier: "ООО \"Перевозчик\"", route: "пос. Водников - Кардиоцентр" },
    { number: "9",  carrier: "ООО \"СКАД\"", route: "Верхняя Базаиха - Междугородный автовокзал" },
    { number: "10", carrier: "КПАТП-7", route: "пос. Энергетиков - ОАО «Красфарма»" },
    { number: "11", carrier: "КПАТП-5", route: "ул. 3-я Дальневосточная - Молодежная" },
    { number: "12", carrier: "КПАТП-7", route: "совхоз Удачный - ст.Красноярск-Северный" },
    { number: "14", carrier: "КПАТП-5", route: "пос. Овинный - Железнодорожная больница" },
    { number: "18", carrier: "КПАТП-7", route: "мкрн. Верхние Черемушки - Техникум транспорта и сервиса" },
    { number: "18c",carrier: "КПАТП-7", route: "мкрн. Верхние Черемушки - ОАО «Красфарма»" },
    { number: "19", carrier: "КПАТП-7", route: "Причал - Стела" },
    { number: "21", carrier: "ООО \"СТК\"", route: "Парк «Прищепка» - Спортзал" },
    { number: "22", carrier: "КПАТП-7", route: "ИТК - Жилой комплекс «Ясный»" },
    { number: "23", carrier: "ООО \"Ветеран\"", route: "ЛДК - мкрн. Солнечный" },
    { number: "26", carrier: "КПАТП-5", route: "Плодово-ягодная станция - Железнодорожная больница" },
    { number: "27", carrier: "ИП Ялтонский А.М.", route: "мкрн. Преображенский - Полигон" },
    { number: "30", carrier: "КПАТП-5", route: "мкрн. Тихие зори - Спортзал" },
    { number: "31", carrier: "КПАТП-7", route: "Академия биатлона - ЛДК" },
    { number: "37", carrier: "КПАТП-7", route: "Оздоровительный комплекс «Гренада» - Железнодорожный вокзал" },
    { number: "38", carrier: "АО \"СТК\"", route: "Дом ученых - пос. Таймыр" },
    { number: "40", carrier: "КПАТП-7", route: "Полигон - Техникум транспорта и сервиса" },
    { number: "40a",carrier: "КПАТП-7", route: "Полигон - Автовокзал «Восточный»" },
    { number: "40с",carrier: "КПАТП-7", route: "Полигон - ул. Московская, 32/2" },
    { number: "43", carrier: "ООО \"Вавулин-К\"", route: "Сельхозкомплекс - Автовокзал «Восточный»" },
    { number: "49", carrier: "КПАТП-5", route: "Спорткомплекс «Радуга» - Кардиоцентр" },
    { number: "50", carrier: "ИП Читашвили Н. С.", route: "мкрн. Солнечный - Стела" },
    { number: "52", carrier: "КПАТП-5", route: "Озеро-парк - мкрн. Тихие зори" },
    { number: "55", carrier: "КПАТП-7", route: "Железнодорожный вокзал - пос. Цементников" },
    { number: "56", carrier: "КПАТП-7", route: "Железнодорожный вокзал - пос. Шинников" },
    { number: "58", carrier: "ИП Кривоногов И. Г.", route: "Спортзал - Поликлиника" },
    { number: "60", carrier: "ИП Цугленок М.М.", route: "мкрн. Солнечный - Автовокзал «Восточный»" },
    { number: "61", carrier: "КПАТП", route: "пос. Шинников - мкрн. Солнечный" },
    { number: "63", carrier: "КПАТП", route: "Академгородок - мкрн. Солнечный" },
    { number: "64", carrier: "КПАТП-5", route: "мкрн. Солнечный - мкрн. Тихие зори" },
    { number: "65", carrier: "ИП Ялтонский А.М.", route: "ДК «Кировский» - Агротерминал" },
    { number: "69", carrier: "КПАТП-7", route: "ИТК - мкрн. Солнечный" },
    { number: "71", carrier: "ООО \"Экипаж-ГО\"", route: "пос. Таймыр - Спортзал" },
    { number: "77", carrier: "ООО \"Практик\"", route: "Железнодорожная больница - д. Песчанка" },
    { number: "78", carrier: "ИП Бронников А. И.", route: "Стела - Контейнерный двор" },
    { number: "80", carrier: "ИП Долгушин Д.Г.", route: "мкрн. Тихие зори - пос. Таймыр" },
    { number: "81", carrier: "ООО \"Сирена\"", route: "ОАО «РУСАЛ» - Железнодорожная больница" },
    { number: "83", carrier: "ИП Цугленок М.М.", route: "Дом ученых - Профилакторий з-да КраМЗ" },
    { number: "85", carrier: "ООО \"СКАД\"", route: "Даурская - Сельхозкомплекс" },
    { number: "87", carrier: "КПАТП-5", route: "Молодежная - мкрн. Солнечный" },
    { number: "88", carrier: "ИП Тагачаков В.Г.", route: "Академия биатлона - Спортзал" },
    { number: "90", carrier: "ИП Патрин Н.Н.", route: "мкрн Верхняя Базаиха - Академия биатлона" },
    { number: "92", carrier: "ИП Патрин Н.Н.", route: "Химкомбинат «Енисей» - ОАО «Красфарма»" },
    { number: "94", carrier: "ООО \"Практик\"", route: "ТЭЦ-3 - ЛДК" },
    { number: "95", carrier: "КПАТП-7", route: "мкрн. Верхние Черемушки - ЛДК" },
    { number: "98", carrier: "ИП Гнетов Ю. Н.", route: "ОАО «РУСАЛ» - ЛДК" },
    { number: "99", carrier: "ООО \"СТК\"", route: "ул. Цимлянская - ст.Красноярск-Северный" }
  ],
  trolleybuses: [
    { number: "4т",  carrier: "МП Городской транспорт", route: "Северо-западный район - Железнодорожный вокзал" },
    { number: "5т",  carrier: "МП Городской транспорт", route: "ст.Красноярск-Северный - Экопарк Гремячая грива" },
    { number: "6т",  carrier: "МП Городской транспорт", route: "Утиный плёс - Студгородок" },
    { number: "13т", carrier: "МП Городской транспорт", route: "Северо-западный район - Железнодорожный вокзал" },
    { number: "15т", carrier: "МП Городской транспорт", route: "ОАО «РУСАЛ» - Сельхозкомплекс" }
  ],
  trams: [
    { number: "2тр", carrier: "МП \"Гортранс\"", route: "пос. Энергетиков - КрасТЭЦ" },
    { number: "4тр", carrier: "МП \"Горэлектротранс\"", route: "Предмостная площадь - КрасТЭЦ" },
    { number: "5тр", carrier: "МП \"Горэлектротранс\"", route: "пос. Энергетиков - Предмостная площадь" },
    { number: "6тр", carrier: "МП \"Горэлектротранс\"", route: "пос. Энергетиков - Предмостная площадь" },
    { number: "7тр", carrier: "МП \"Горэлектротранс\"", route: "Предмостная площадь - КрасТЭЦ" }
  ],
  eBuses: [
    { number: "1", carrier: "МП \"Городской транспорт\"", route: "мкрн. Тихие зори - ст.Красноярск-Северный" }
  ]
};

/* Служебные элементы */
const transportMenuOverlay = document.getElementById('transportMenuOverlay');
const routesButtonsEl       = document.getElementById('routesButtons');

/* Открыть / закрыть меню */
function openTransportMenu() {
  renderRouteButtons('buses');
  setActiveTab('buses');
  transportMenuOverlay.style.display = 'flex';
}

function closeTransportMenu() {
  transportMenuOverlay.style.display = 'none';
}

/* Переключение вкладки */
function switchTransportTab(type) {
  renderRouteButtons(type);
  setActiveTab(type);
}

function setActiveTab(type) {
  ['buses','trolleybuses','trams','eBuses'].forEach(t => {
    const btn = document.getElementById('tab-' + t);
    if (btn) btn.classList.toggle('active', t === type);
  });
}

/* Рендер кнопок с номерами */
function renderRouteButtons(type) {
  const list = routesData[type] || [];
  routesButtonsEl.innerHTML = list.map((r, idx) => {
    // data- атрибуты для быстрого выбора
    return `<button type="button" data-type="${type}" data-index="${idx}" onclick="selectRoute('${type}', ${idx})">${r.number}</button>`;
  }).join('');
}

/* Подстановка значений в поля */
function selectRoute(type, index) {
  const item = (routesData[type] || [])[index];
  if (!item) return;

  const carrierInput = document.getElementById('inputCarrier');
  const routeInput   = document.getElementById('inputRoute');

  carrierInput.value = item.carrier;
  routeInput.value   = item.route;

  // Подсветка валидности, если у тебя уже есть функция highlightField
  if (typeof highlightField === 'function') {
    highlightField('inputCarrier', carrierInput.value.length >= 4);
    highlightField('inputRoute', routeInput.value.includes(' - '));
  }

  closeTransportMenu();
}
  // Переключение вручную

// Автоподстановка и блокировка при выборе маршрута
function selectRoute(type, index) {
  let selectedRoute;
  switch(type) {
    case 'buses': selectedRoute = routesData.buses[index]; break;
    case 'trolleybuses': selectedRoute = routesData.trolleybuses[index]; break;
    case 'trams': selectedRoute = routesData.trams[index]; break;
    case 'eBuses': selectedRoute = routesData.eBuses[index]; break;
  }

  if (selectedRoute) {
    document.getElementById('inputCarrier').value = selectedRoute.carrier;
    document.getElementById('inputRoute').value = selectedRoute.route;

    // Автоустановка типа
    if (type === 'buses') {
      setTransportType('bus');
    } else {
      setTransportType('other');
    }
  }

  closeTransportMenu();
}
    // Переключение вручную
document.querySelectorAll('.transport-option').forEach(btn => {
  btn.addEventListener('click', () => {
    if (btn.disabled) return; // если заблокировано, ничего не делаем
    document.querySelectorAll('.transport-option').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('transportType').value = btn.dataset.type;
  });
});

// Автоподстановка и блокировка при выборе маршрута
function selectRoute(type, index) {
  let selectedRoute;
  switch(type) {
    case 'buses': selectedRoute = routesData.buses[index]; break;
    case 'trolleybuses': selectedRoute = routesData.trolleybuses[index]; break;
    case 'trams': selectedRoute = routesData.trams[index]; break;
    case 'eBuses': selectedRoute = routesData.eBuses[index]; break;
  }

  if (selectedRoute) {
    document.getElementById('inputCarrier').value = selectedRoute.carrier;
    document.getElementById('inputRoute').value = selectedRoute.route;

    // Автоустановка и блокировка выбора транспорта
    if (type === 'buses') {
      setTransportType('bus');
    } else {
      setTransportType('other');
    }
  }

  closeTransportMenu();
}


function setTransportType(type) {
  const buttons = document.querySelectorAll('.transport-option');
  buttons.forEach(b => {
    b.classList.remove('active');
    if (b.dataset.type === type) {
      b.classList.add('active');
    }
    b.disabled = true; // блокируем выбор
  });
  document.getElementById('transportType').value = type;
}
window.addEventListener('DOMContentLoaded', async () => {
  const sessionId = localStorage.getItem('sessionId');
  if (!sessionId) return;

  try {
    const res = await fetch(GAS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ action: 'verify_session', sessionId })
    });
    const data = await res.json();

    if (data.ok) {
      // авто-вход
      document.getElementById('authScreen').style.display = 'none';
      document.getElementById('inputScreen').classList.add('active');
      const btn = document.getElementById('adminButton');
      if (btn) btn.style.display = 'inline-block';
    } else {
      // сессия невалидна — очищаем
      localStorage.removeItem('sessionId');
    }
  } catch (e) {
    console.warn('Verify failed', e);
  }
});


// Вызывай это из selectRoute, чтобы автоустановить тип и заблокировать выбор
function setTransportType(type){
  const buttons = document.querySelectorAll('.transport-option');
  buttons.forEach(b => {
    b.classList.toggle('active', b.dataset.type === type);
    // блокируем обе, чтобы было понятно, что выбор сделан
    b.disabled = true;
  });
  document.getElementById('transportType').value = type;
}

    
  
