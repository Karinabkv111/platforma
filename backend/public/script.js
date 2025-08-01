뿃뻃// Функция для обработки входа 

document.getElementById('loginForm').addEventListener('submit', function(event) {

  event.preventDefault();



  const email = document.getElementById('email').value;

  const password = document.getElementById('password').value;



  // Получаем сохраненные данные из LocalStorage

  const storedEmail = localStorage.getItem('email');

  const storedPassword = localStorage.getItem('password');



  // Проверка, совпадает ли введенный email и password с сохраненными

  if (email === storedEmail && password === storedPassword) {

    // Если данные совпали, перенаправляем на личный кабинет

    window.location.href = "dashboard.html"; // Убедись, что у тебя есть страница dashboard.html

  } else {

    alert('Неверный логин или пароль');

  }

});



// Обработчик для регистрации

document.getElementById('registerForm').addEventListener('submit', function(event) {

  event.preventDefault();



  const name = document.getElementById('name').value;

  const email = document.getElementById('email').value;

  const password = document.getElementById('password').value;



  // Сохраняем данные в localStorage

  localStorage.setItem('name', name);

  localStorage.setItem('email', email);

  localStorage.setItem('password', password);



  alert('Регистрация успешна! Теперь вы можете войти.');



  // Перенаправляем на страницу входа

  window.location.href = "login.html";

});



// Загрузка данных профиля, включая аватар

function loadProfile() {

  const name = localStorage.getItem('name');

  const email = localStorage.getItem('email');

  const avatar = localStorage.getItem('avatar');



  if (name && email) {

    document.getElementById('user-name').textContent = name || '';

    document.getElementById('email').textContent = email || '';

  }



  const userAvatar = document.getElementById('user-avatar');

  if (avatar) {

    userAvatar.src = avatar;

    userAvatar.style.display = 'block';

    document.getElementById('user-name').style.display = 'none';

  } else {

    userAvatar.style.display = 'none';

  }

}



// Сохранение данных профиля в LocalStorage

function saveProfile() {

  const name = document.getElementById('name').value;

  const email = document.getElementById('email').value;

  const avatar = document.getElementById('avatar').files[0];



  // Сохраняем данные в LocalStorage

  localStorage.setItem('name', name);

  localStorage.setItem('email', email);



  if (avatar) {

    const reader = new FileReader();

    reader.onload = function(e) {

      localStorage.setItem('avatar', e.target.result);

      document.getElementById('avatar-preview').src = e.target.result;

      document.getElementById('avatar-preview').style.display = 'block';

    };

    reader.readAsDataURL(avatar);

  }



  alert('Профиль сохранён!');

  loadProfile(); // Загружаем данные после сохранения

}



// Функция для отображения уроков в расписании

const lessons = {

  "2025-01-13": {

    title: "Генетика",

    zoom: "https://zoom.us/j/1234567890",

    file: "files/genetika.pdf",

    hwLink: "#homework"

  },

  "2025-01-15": {

    title: "Клетка и её строение",

    zoom: "https://zoom.us/j/9876543210",

    file: "files/kletochnaya_struktura.pdf",

    hwLink: "#homework"

  },

  "2025-01-17": {

    title: "Экология",

    zoom: "https://zoom.us/j/1112223330",

    file: "files/ecology.pdf",

    hwLink: "#homework"

  }

};



// Функция для генерации календаря

function generateCalendar(year, month) {

  const calendar = document.getElementById("calendar");

  calendar.innerHTML = "";



  const date = new Date(year, month, 1);

  const monthName = date.toLocaleString("ru-RU", { month: "long" });

  const firstDay = date.getDay() || 7;



  const daysInMonth = new Date(year, month + 1, 0).getDate();



  const header = document.createElement("h3");

  header.textContent = `${monthName.charAt(0).toUpperCase() + monthName.slice(1)} ${year}`;

  calendar.appendChild(header);



  const nav = document.createElement("div");

  nav.innerHTML = `

    <button onclick="changeMonth(-1)">郂㰡⼀戀甀琀琀漀渀㸀਀਀    㰀戀甀琀琀漀渀 漀渀挀氀椀挀欀㴀∀挀栀愀渀最攀䴀漀渀琀栀⠀㄀⤀∀㸀숀→</button>

  `;

  calendar.appendChild(nav);



  const table = document.createElement("table");

  table.innerHTML = `

    <tr>

      <th>Пн</th><th>Вт</th><th>Ср</th><th>Чт</th><th>Пт</th><th>Сб</th><th>Вс</th>

    </tr>

  `;

  let row = document.createElement("tr");



  for (let i = 1; i < firstDay; i++) {

    row.appendChild(document.createElement("td"));

  }



  for (let day = 1; day <= daysInMonth; day++) {

    const td = document.createElement("td");

    td.textContent = day;



    const thisDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;



    if (lessons[thisDate]) {

      td.classList.add("highlight");

      td.setAttribute("data-tooltip", lessons[thisDate].title);

      td.addEventListener("click", () => showLessonDetails(thisDate));

    }



    row.appendChild(td);

    if ((day + firstDay - 1) % 7 === 0 || day === daysInMonth) {

      table.appendChild(row);

      row = document.createElement("tr");

    }

  }



  calendar.appendChild(table);

}



let currentYear = 2025;

let currentMonth = 0;



// Функция для смены месяца в календаре

function changeMonth(offset) {

  currentMonth += offset;

  if (currentMonth > 11) {

    currentMonth = 0;

    currentYear++;

  }

  if (currentMonth < 0) {

    currentMonth = 11;

    currentYear--;

  }

  generateCalendar(currentYear, currentMonth);

}



generateCalendar(currentYear, currentMonth);



// Показ подробностей занятия

function showLessonDetails(date) {

  const details = document.getElementById("lesson-details");

  const lesson = lessons[date];

  if (!lesson) return;



  details.innerHTML = `

    <h3>${lesson.title} — ${date}</h3>

    <p><a href="${lesson.zoom}" target="_blank">쌽ម鷃 Перейти на Zoom</a></p>

    <p><a href="${lesson.file}" download>쌽쎘쎄ₜ℀㨄〄䜄〄䈄䰄 㨀㸄㴄䄄㼄㔄㨄䈄㰄⼀愀㸀㰀⼀瀀㸀਀਀    㰀瀀㸀㰀愀 栀爀攀昀㴀∀␀笀氀攀猀猀漀渀⸀栀眀䰀椀渀欀紀∀㸀㴀飃飃鳃 Перейти к домашнему заданию</a></p>

    <label>

      <input type="checkbox" id="attended-${date}" onchange="saveAttendance('${date}')"> Я присутствовал

    </label>

  `;

  details.style.display = "block";

}



function saveAttendance(date) {

  const checkbox = document.getElementById(`attended-${date}`);

  localStorage.setItem(`attended-${date}`, checkbox.checked ? "yes" : "no");

}



function loadAttendance(date) {

  const checkbox = document.getElementById(`attended-${date}`);

  if (checkbox && localStorage.getItem(`attended-${date}`) === "yes") {

    checkbox.checked = true;

  }

}



// Записать посещение

function recordVisit() {

  const visits = JSON.parse(localStorage.getItem('visits')) || [];

  visits.push(new Date().toISOString());

  localStorage.setItem('visits', JSON.stringify(visits));

}



window.onload = function () {

  loadProfile();

  recordVisit(); // Записываем посещение при загрузке

};

