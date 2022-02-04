const button = document.querySelector('.button');
const userWord = document.querySelector('.user-word');
const cases = document.querySelectorAll('.list__item');
const choice = document.querySelector('.user-choice');
const description = document.querySelector('.description');
const descriptionChoice = document.querySelector('.description-choice');

button.addEventListener("click", function () {
    checker(userWord.value.toLowerCase());
    description.innerHTML = "Выберите один из вариантов:";
    choice.innerHTML = '';
});

for (let casesItem of cases) {
    casesItem.addEventListener("click", function () {
        choice.innerHTML = casesItem.innerHTML;
        descriptionChoice.innerHTML = "Ваш выбор:";
    })
}


let words = {
    regular : [
        "чь",
        "жь",
        "шь",
        "щь",
        "ость",
        "бь",
        "вь",
        "дь",
        "зь",
        "сь",
        "ть",
        "ль",
        "нь",
        "рь",
        "пь",
    ],
    exception : {
        female : [
            "метель",
        ],
        male : [
            "гость",
            "голубь",
            "лебедь",
            "дождь",
            "гвоздь",
            "арь",
            "тель",
            "ноль",
            "конь",
            "тюлень",
            "олень",
            "январь",
            "февраль",
            "март",
            "апрель",
            "май",
            "июнь",
            "июль",
            "август",
            "сентябрь",
            "октябрь",
            "ноябрь",
            "декабрь",
            "огонь",
        ],
    },
}

function checker(target) {
    if (/а$|я$/i.test(target)) {
        display(target, casesFirst);
    } else if (/о$|е$|ё$/i.test(target)) {
        display(target, casesSecond);
    } else if (/ь$/i.test(target)) {
        if (checkGender(target)) {
            display(target, casesThird);
        } else {
            display(target, casesFifth);
        }
    } else {
        display(target, casesFourth);
    }
}

// проверяет массив на совпадения в конце строки
function checkAnding(arr, target) {
    for(let arrItem of arr) {
        if (target.endsWith(arrItem)) {
           return true;
        }
    } 
    return false;
}
// проверяет на совпадения в конце строки

// женский true
function checkGender(target) {
    if (checkAnding(words.regular, target) && !checkAnding(words.exception.male, target)) {
        return true;
    } else if (checkAnding(words.exception.female, target)) {
        return true;
    }
    return false; 
}
// женский true

let key = [
    "nominative",
    "genitive",
    "dative",
    "accusative",
    "instrumental",
    "prepositional",
]


let casesFirst = {
    nominative(target) {
        return target;
    },
    genitive(target) {
        if (/а$/i.test(target) && !/га$|ка$|ха$|жа$|ша$|ща$|ча$/i.test(target)) {
            return changeAnding(target, 1, 'ы');
        } 
        return changeAnding(target, 1, 'и'); 
    },
    dative(target) {
        if (/ия$/i.test(target)) {
            return changeAnding(target, 1, 'и');
        } 
        return changeAnding(target, 1, 'е');
    },
    accusative(target) {
        if (/а$/i.test(target)) {
            return changeAnding(target, 1, 'у');
        } 
        return changeAnding(target, 1, 'ю');
    },
    instrumental(target) {
        if (/а$/i.test(target)) {
            return changeAnding(target, 1, 'ой');
        }
        return changeAnding(target, 1, 'ей');
    },
    prepositional(target) {
        if (/ия$/i.test(target)) {
            return changeAnding(target, 1, 'и');
        } 
        return changeAnding(target, 1, 'е');
    },
}

let casesSecond = {
    nominative(target) {
        return target;
    },
    genitive(target) {
        if (/о$/i.test(target)) {
            return changeAnding(target, 1, 'а');
        } 
        return changeAnding(target, 1, 'я'); 
    },
    dative(target) {
        if (/о$/i.test(target)) {
            return changeAnding(target, 1, 'у');
        } 
        return changeAnding(target, 1, 'ю'); 
    },
    accusative(target) {
        if (/о$/i.test(target)) {
            return changeAnding(target, 1, 'о');
        } 
        return changeAnding(target, 1, 'е');
    },
    instrumental(target) {
        if (/о$/i.test(target)) {
            return changeAnding(target, 1, 'ом');
        }
        return changeAnding(target, 1, 'ем');
    },
    prepositional(target) {
        if (/ие$/i.test(target)) {
            return changeAnding(target, 1, 'и');
        }
        return changeAnding(target, 1, 'е');
    },
}

let casesThird = {
    nominative(target) {
        return target;
    },
    genitive(target) {
        return changeAnding(target, 1, 'и'); 
    },
    dative(target) {
        return changeAnding(target, 1, 'и'); 
    },
    accusative(target) {
        return changeAnding(target, 0, '');
    },
    instrumental(target) {
        return changeAnding(target, 0, 'ю');
    },
    prepositional(target) {
        return changeAnding(target, 1, 'и');
    },
}

let casesFourth = {
    nominative(target) {
        return target;
    },
    genitive(target) {
        if (/й$/i.test(target)) {
            return changeAnding(target, 1, 'я');
        }
        return changeAnding(target, 0, 'а'); 
    },
    dative(target) {
        if (/й$/i.test(target)) {
            return changeAnding(target, 1, 'ю');
        }
        return changeAnding(target, 0, 'у'); 
    },
    accusative(target) {
        if (/й$/i.test(target)) {
            return changeAnding(target, 1, 'я');
        }
        return changeAnding(target, 0, '');
    },
    instrumental(target) {
        if (/й$/i.test(target)) {
            return changeAnding(target, 1, 'ем');
        }
        return changeAnding(target, 0, 'ом');
    },
    prepositional(target) {
        if (/ий$/i.test(target)) {
            return changeAnding(target, 1, 'и');
        } else if ((/й$/i.test(target))) {
            return changeAnding(target, 1, 'е');
        }
        return changeAnding(target, 0, 'е');
    },
}

let casesFifth = {
    nominative(target) {
        return target;
    },
    genitive(target) {
        return changeAnding(target, 1, 'я'); 
    },
    dative(target) {
        return changeAnding(target, 1, 'ю'); 
    },
    accusative(target) {
        return changeAnding(target, 1, 'я');
    },
    instrumental(target) {
        return changeAnding(target, 1, 'ем');
    },
    prepositional(target) {
        return changeAnding(target, 1, 'е');
    },
}

// добавляет в li (cases) готовые падежи (method[key[i]](target))
function display(target, method) {
    let i = 0;
    for(let casesItem of cases) {
        casesItem.innerHTML = method[key[i]](target);
        i++;
    }  
}
// добавляет в li (cases) готовые падежи (method[key[i]](target))


// заменяет для target n количество букв, на заданное anding
function changeAnding(target, n, anding) {
    let a = replaceNArr(target, n);
    a.push(anding);
    return replaceCommasStr(a);
}
// заменяет для target n количество букв, на заданное anding

// удаляет запятые возвращает строку
function replaceCommasStr(arr) {
    return target = arr.join().replace(/,/gi,'');
}
// удаляет запятые возвращает строку

// преобразовует строку слово в массив и удаляет n последних символов
function replaceNArr(target, n) {
    let arr = [];
    for (let i = 0; i < target.length - n; i++) {
        arr.push(target[i]);
    }
    return arr
}
// преобразовует в массив и удаляет n последних символов

