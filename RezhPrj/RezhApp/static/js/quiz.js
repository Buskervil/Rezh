const headElem = document.getElementById("head");
const buttonsElem = document.getElementById("buttons");
const pagesElem = document.getElementById("pages");
const reloadButton = document.getElementById("reload");

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
        new Result("Не хорошо, но и не ужасно!", 0),
        new Result("А вы чертовски хороши!", 5),
        new Result("Феноменальный результат!", 8),
    ];

//Массив с вопросами
const questions =
    [
        new Question("К бассейну какого моря относится река Реж?",//1
            [
                new Answer("Баренцева", 0),
                new Answer("Берингова", 0),
                new Answer("Карского", 1),
                new Answer("Охотского", 0)
            ]),

        new Question("Какой великий ученый возглавил экспедицию по изучению уральского железнодорожного производства?",//2
            [
                new Answer("М.В. Ломоносов", 0),
                new Answer("Д.И. Менделеев", 1),
                new Answer("Н.М. Пржевальский", 0),
                new Answer("А.Г Столетов", 0)
            ]),

        new Question("Правда ли, что именно педагог из города Реж стала прототипом главной героини фильма «Сельская учительница»?",//3
            [
                new Answer("Верно", 1),
                new Answer("Не верно", 0),
            ]),

        new Question("Кто является первооткрывателем дороги на Сибирь?",//4
            [
                new Answer("М.П. Лазарев", 0),
                new Answer("Е.В. Путятин", 0),
                new Answer("И.Ф. Крузенштерн", 0),
                new Answer("А.С. Бабинов", 1)
            ]),

        new Question("Кто выступал перед рабочими Режевского завода в 1906 году?",//5
            [
                new Answer("А.Х. Бусыгин", 0),
                new Answer("Я.М. Свердлов", 1),
                new Answer("Н.Г. Кичигин", 0),
                new Answer("В.И. Ульянов", 0)
            ]),

        new Question("С чего началось зарождение города?",//6
            [
                new Answer("С городского поселения", 0),
                new Answer("С деревни", 0),
                new Answer("С заводов", 1),
                new Answer("Нет верного ответа", 0)
            ]),

        new Question("На выставке в каком городе был отмечен медалью лист режевского железа?",//7
            [
                new Answer("Париж", 1),
                new Answer("Москва", 0),
                new Answer("Санкт-Петербург", 0),
                new Answer("Сочи", 0)
            ]),

        new Question("По какой причине было прекращено железоделательное производство?",//8
            [
                new Answer("Из-за нехватки ресурсов", 0),
                new Answer("Из-за отсутствия рабочих", 0),
                new Answer("Из-за кризиса", 1),
                new Answer("Нет верного ответа", 0)
            ]),

        new Question("В каком году Реж получил статус города?",//9
            [
                new Answer("1940", 0),
                new Answer("1945", 0),
                new Answer("1890", 0),
                new Answer("1943", 1)
            ]),
        new Question("Какое месторождение было открыто около Режа в 1985 году?",//10
            [
                new Answer("Михеевское", 0),
                new Answer("Быстринское", 0),
                new Answer("Учалинское", 0),
                new Answer("Сафьяновское", 1)
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
        let btns = document.querySelectorAll('.button')
        for (let i = 0; i < btns.length; i++){
            btns[i].onclick = () => {
                for (let j = 0; j < btns.length; j++){
                    btns[j].setAttribute('disabled', true)
                }
            }
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

        reloadButton.style = "display:block";
    }
}

reloadButton.onclick = function() {
    document.location.reload();
  };

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
    //Ждём и обновляем тест
    setTimeout(hintsHT, 500);
    setTimeout(Update, 4000);
    setTimeout(imgsrc, 4000);
    setTimeout(() => {
        hint.innerHTML = ""
    },4000);
}

var r=0;
var image=document.getElementById("image");
// Добавте свои картинки через запятую
function imgsrc() {
    r++;
    var imm=document.querySelectorAll(".quiz_image");
    for(var i = 0; i < imm.length; i++){
    imm[i].style = 'display:none'
    }
    var di=document.getElementById('image' + r);
    di.style='display:inline-block';
}

var k=0;
var hint=document.getElementById("hint");
// Добавьте свои картинки через запятую
var hints=new Array(
    'К бассейну Карского моря, самого холодного на земле',
    'В 1899 году учёный-химик  Д.И. Менделеев возглавил эту экспедицию нарисовал схему прокладки дороги из Екатеринбурга в сторону Тавды через Реж, Егоршино и Ирбит',
    'Верно, педагог Екатерина Васильевна Мартьянова из Режа стала прототипом главной героини Варвары Васильевны Мартыновой  из фильма «Сельская учительница»',
    'Режевлянин Артемий Бабинов, прозванный «вождём Сибирской дороги», является открывателем дороги на Сибирь',
    'В 1906 году перед рабочими Режевского завода выступал лидер уральских социал-демократов Я. М. Свердлов.',
    'Зарождение города началось со строительства на реке Реж чугуноплавильного и железоделательного заводов',
    'В 1878 году на Всемирной выставке Парижа, именно лист режевского железа был отмечен медалью.',
    'Из-за разразившегося экономического кризиса в начале XX века',
    'В 1943 году',
    'Было открыто медное Сафьяновское месторождение');
function hintsHT() {
    hint.innerHTML=hints[k];
    k++;
}
