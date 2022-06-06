const headElem = document.getElementById("head");
const buttonsElem = document.getElementById("buttons");
const pagesElem = document.getElementById("pages");

//Класс, который представляет сам тест
class Quiz
{
    constructor(type, questions, results)
    {
        //Тип теста: 1 - классический тест с правильными ответами, 2 - тест без правильных ответов
        this.type = type;

        //Массив с вопросами
        this.questions = questions;

        //Массив с возможными результатами
        this.results = results;

        //Количество набранных очков
        this.score = 0;

        //Номер результата из массива
        this.result = 0;

        //Номер текущего вопроса
        this.current = 0;
    }

    Click(index)
    {
        //Добавляем очки
        let value = this.questions[this.current].Click(index);
        this.score += value;

        let correct = -1;

        //Если было добавлено хотя одно очко, то считаем, что ответ верный
        if(value >= 1)
        {
            correct = index;
        }
        else
        {
            //Иначе ищем, какой ответ может быть правильным
            for(let i = 0; i < this.questions[this.current].answers.length; i++)
            {
                if(this.questions[this.current].answers[i].value >= 1)
                {
                    correct = i;
                    break;
                }
            }
        }

        this.Next();
        return correct;
    }

    //Переход к следующему вопросу
    Next()
    {
        this.current++;

        if(this.current >= this.questions.length)
        {
            this.End();
        }
    }

    //Если вопросы кончились, этот метод проверит, какой результат получил пользователь
    End()
    {
        for(let i = 0; i < this.results.length; i++)
        {
            if(this.results[i].Check(this.score))
            {
                this.result = i;
            }
        }
    }
}

//Класс, представляющий вопрос
class Question
{
    constructor(text, answers)
    {
        this.text = text;
        this.answers = answers;
    }

    Click(index)
    {
        return this.answers[index].value;
    }
}

//Класс, представляющий ответ
class Answer
{
    constructor(text, value)
    {
        this.text = text;
        this.value = value;
    }
}

//Класс, представляющий результат
class Result
{
    constructor(text, value)
    {
        this.text = text;
        this.value = value;
    }

    //Этот метод проверяет, достаточно ли очков набрал пользователь
    Check(value)
    {
        if(this.value <= value)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
}

//Массив с результатами
const results =
    [
        new Result("Не хорошо, но и не ужасно!", 4),
        new Result("А вы чертовски хороши!", 7),
        new Result("Феноменальный результат!", 10),
    ];

//Массив с вопросами
const questions =
    [
        new Question("На выставке в каком городе был отмечен медалью лист режевского железа?",
            [
                new Answer("Париж", 1),
                new Answer("Москва", 0),
                new Answer("Санкт-Петербург", 0),
                new Answer("Сочи", 0)
            ]),

        new Question("К бассейну какого моря относится река Реж?",
            [
                new Answer("Баренцева", 0),
                new Answer("Берингова", 0),
                new Answer("Карского", 1),
                new Answer("Охотского", 0)
            ]),

        new Question("Какой великий ученый возглавил экспедицию по изучению уральского железнодорожного производства?",
            [
                new Answer("М.В. Ломоносов", 0),
                new Answer("Д.И. Менделеев", 1),
                new Answer("Н.М. Пржевальский", 0),
                new Answer("А.Г Столетов", 0)
            ]),

        new Question("Правда ли, что именно педагог из города Реж стала прототипом главной героини фильма «Сельская учительница»?",
            [
                new Answer("Верно", 1),
                new Answer("Не верно", 0),
            ]),

        new Question("Кто является первооткрывателем дороги на Сибирь?",
            [
                new Answer("М.П. Лазарев", 0),
                new Answer("Е.В. Путятин", 0),
                new Answer("И.Ф. Крузенштерн", 0),
                new Answer("А.С. Бабинов", 1)
            ]),

        new Question("Кто выступал перед рабочими Режевского завода в 1906 году?",
            [
                new Answer("А.Х. Бусыгин", 0),
                new Answer("Я.М. Свердлов", 1),
                new Answer("Н.Г. Кичигин", 0),
                new Answer("В.И. Ульянов", 0)
            ]),

        new Question("По какой причине было прекращено железоделательное производство?",
            [
                new Answer("Из-за нехватки ресурсов", 0),
                new Answer("Из-за отсутствия квалифицированных рабочих", 0),
                new Answer("Из-за кризиса", 1),
                new Answer("Нет верного ответа", 0)
            ]),

        new Question("В каком году Реж получил статус города?",
            [
                new Answer("1940", 0),
                new Answer("1945", 0),
                new Answer("1890", 0),
                new Answer("1943", 1)
            ]),
        new Question("Какое месторождение было открыто около Режа в 1985 году?",
            [
                new Answer("Михеевское", 0),
                new Answer("Быстринское", 0),
                new Answer("Учалинское", 0),
                new Answer("Сафьяновское", 1)
            ]),
        new Question("С чего началось зарождение города?",
            [
                new Answer("С городского поселения", 0),
                new Answer("С деревни", 0),
                new Answer("С заводов", 0),
                new Answer("Нет верного ответа", 1)
            ])
    ];

//Сам тест
const quiz = new Quiz(1, questions, results);

Update();

//Обновление теста
function Update()
{
    //Проверяем, есть ли ещё вопросы
    if(quiz.current < quiz.questions.length)
    {
        //Если есть, меняем вопрос в заголовке
        headElem.innerHTML = quiz.questions[quiz.current].text;

        //Удаляем старые варианты ответов
        buttonsElem.innerHTML = "";


        //Создаём кнопки для новых вариантов ответов
        for(let i = 0; i < quiz.questions[quiz.current].answers.length; i++)
        {
            let btn = document.createElement("button");
            btn.className = "button";

            btn.innerHTML = quiz.questions[quiz.current].answers[i].text;

            btn.setAttribute("index", i);

            buttonsElem.appendChild(btn);
        }

        //Выводим номер текущего вопроса
        pagesElem.innerHTML = (quiz.current + 1) + " / " + quiz.questions.length;

        //Вызываем функцию, которая прикрепит события к новым кнопкам
        Init();
    }
    else
    {
        //Если это конец, то выводим результат
        buttonsElem.innerHTML = "";
        headElem.innerHTML = quiz.results[quiz.result].text;
        pagesElem.innerHTML = "Очки: " + quiz.score;
    }
}

function Init()
{
    //Находим все кнопки
    let btns = document.getElementsByClassName("button");

    for(let i = 0; i < btns.length; i++)
    {
        //Прикрепляем событие для каждой отдельной кнопки
        //При нажатии на кнопку будет вызываться функция Click()
        btns[i].addEventListener("click", function (e) { Click(e.target.getAttribute("index")); });
    }
}

function Click(index)
{
    //Получаем номер правильного ответа
    let correct = quiz.Click(index);

    //Находим все кнопки
    let btns = document.getElementsByClassName("button");

    //Делаем кнопки серыми
    for(let i = 0; i < btns.length; i++)
    {
        btns[i].className = "button button_passive";
    }

    //Если это тест с правильными ответами, то мы подсвечиваем правильный ответ зелёным, а неправильный - красным
    if(quiz.type == 1)
    {
        if(correct >= 0)
        {
            btns[correct].className = "button button_correct";
        }

        if(index != correct)
        {
            btns[index].className = "button button_wrong";
        }
    }
    else
    {
        //Иначе просто подсвечиваем зелёным ответ пользователя
        btns[index].className = "button button_correct";
    }

    //Ждём секунду и обновляем тест
    setTimeout(hintsHT, 500);
    setTimeout(Update, 2500);
    setTimeout(imgsrc, 2500);
    setTimeout(() => {
        hint.innerHTML = ""
    },2500);
}
var i=0;
var image=document.getElementById("image");
// Добавте свои картинки через запятую
var imgs=new Array('../../../media/баден.jpg','баден 2.jpg','башня.jpg','Гефест-м.jpg',
    'Дом_заводуп.jpg','Монумент трс.jpg','Памятник рабочим 2.jpg','Хлеб_2.jpg','церковь нч.jpg','школа 1.jpg','');
function imgsrc() {
    i++;
    image.src=imgs[i];
}

var k=0;
var hint=document.getElementById("hint");
// Добавьте свои картинки через запятую
var hints=new Array(
    'В 1878 году на Всемирной выставке Парижа, именно лист режевского железа был отмечен медалью.',
    'К бассейну Карского моря, самого холодного на земле',
    'В 1899 году учёный-химик  Д.И. Менделеев возглавил эту экспедицию нарисовал схему прокладки дороги из Екатеринбурга в сторону Тавды через Реж, Егоршино и Ирбит',
    'Верно, педагог Екатерина Васильевна Мартьянова из Режа стала прототипом главной героини Варвары Васильевны Мартыновой  из фильма «Сельская учительница»',
    'Режевлянин Артемий Бабинов, прозванный «вождём Сибирской дороги», является открывателем дороги на Сибирь',
    'В 1906 году перед рабочими Режевского завода выступал лидер уральских социал-демократов Я. М. Свердлов.',
    'Из-за разразившегося экономического кризиса в начале XX века',
    'В 1943 году',
    'Было открыто медное Сафьяновское месторождение',
    'Зарождение города началось со строительства на реке Реж чугуноплавильного и железоделательного заводов');
function hintsHT() {
    k++;
    hint.innerHTML=hints[i];
}