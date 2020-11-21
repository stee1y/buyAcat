const catAll = []

let catAllMax = ((max = 50) => Math.floor(Math.random() * Math.floor(max)))()

function declOfNum(n, arr) {
  n = Math.abs(n) % 100 // фу-ия склонения

  const n1 = n % 10

  if (n > 10 && n < 20) {
    return arr[3]
  }
  if (n1 > 1 && n1 < 5) {
    return arr[2]
  }
  if (n1 == 1) {
    return arr[1]
  }
  if (n1 == 0) {
    return arr[0]
  }
  return arr[3]
}

const quantityDeclination =
  catAllMax +
  1 +
  ' ' +
  declOfNum(catAllMax + 1, ['котов', 'кот', 'кота', 'котов'])

document.querySelector(
  '.found-cats'
).innerHTML = `Найдено ${quantityDeclination}`

for (let index = 0; index <= catAllMax; index++) {
  catAll.push(
    Object.create(
      {},
      {
        id: {
          value: index + 1, // id кота
        },
        photo: {
          value: gen(1, 3), // фото кота
        },
        discount: {
          value: gen(0, 5) * 10, // скидка
        },
        hasDiscount: {
          get() {
            return this.discount !== 0 ? true : false // есть ли скидка
          },
        },
        price: {
          value: gen(10000, 30000), // цена
        },
        discountPrice: {
          get() {
            return Math.round(this.price - (this.price / 100) * this.discount) // получаем цену со скидкой в зависимости от скидки в поле discount
          },
        },
        catAge: {
          value: gen(1, 12), // возраст
        },
        like: {
          value: false, // подписка
          writable: true,
        },
        availability: {
          value: gen(1, 10) <= 7 ? true : false, // доступен ли для продажи
          writable: true,
        },
      }
    )
  )
}

let count = 0

function catShow(val, obj) {
  for (let i = val; i > 0; i--) {
    if (count <= catAllMax) {
      const div = document.createElement('div')

      const id = catAll[count].id
      const photo = catAll[count].photo
      const discount = catAll[count].discount
      const hasDiscount = catAll[count].hasDiscount
      const price = catAll[count].price
      const discountPrice = catAll[count].discountPrice
      const catAge = catAll[count].catAge
      const like = catAll[count].like
      const availability = catAll[count].availability

      count++

      div.classList.add('card')
      div.setAttribute('data-id', id)
      hasDiscount
        ? div.setAttribute('data-price', discountPrice)
        : div.setAttribute('data-price', price)
      div.setAttribute('data-months', catAge)
      div.innerHTML = `
              ${
                hasDiscount
                  ? `<div class="card__discount">-${discount}%</div>`
                  : ''
              }
              <a class="card__liked">
                liked
              </a>
              <img src="./img/cat-${photo}.jpg" alt="Фотография котика" />
              <div class="card__wrap">
                <div class="card__breed">Кот полосатый</div>
                <div class="card__info">
                  <div class="card__color">Коричневый окрас</div>
                  <div class="card__age"><span>${catAge} мес.</span>Возраст</div>
                  <div class="card__paws"><span>${4} </span>Кол-во лап</div>
                </div>
                ${
                  hasDiscount
                    ? `<div class="card__price">${discountPrice} руб.</div>`
                    : `<div class="card__price">${price} руб.</div>`
                }
                
              </div>
              ${
                availability
                  ? `<a data-btn='0' class="btn btn--card btn--disabled">Продан</a>`
                  : `<a data-btn='1' class="btn btn--card">Купить</a>`
              }
              
            `
      // console.log(hasDiscount)
      hasDiscount ? div.append(``) : false
      document.querySelector('.main__content').append(div)
    } else {
      return false
    }
  }
}

function gen(min, max, discount = 0) {
  return (
    Math.round(Math.random() * (max - min) + min) -
    (Math.round(Math.random() * (max - min) + min) / 100) * discount
  )
}

window.onload = function () {
  // console.log('max при загруэке', catAllMax)
  catShow(6, catAll)
}

const btnMore = document.querySelector('.btn--more')

btnMore.addEventListener('click', (e) => {
  e.preventDefault()

  if (catAllMax != 0) {
    catShow(20, catAll)
  }
})

// console.log()

function anim(duration) {
  let temp
  return function (sel) {
    cancelAnimationFrame(temp)
    let start = performance.now()
    let from = window.pageYOffset || document.documentElement.scrollTop,
      to = document.querySelector(sel).getBoundingClientRect().top
    requestAnimationFrame(function step(timestamp) {
      let progress = (timestamp - start) / duration
      1 <= progress && (progress = 1)
      window.scrollTo(0, (from + to * progress) | 0)
      1 > progress && (temp = requestAnimationFrame(step))
    })
  }
}
let scrollMenu = anim(3000)

const content = document.querySelector('.main__content')

document.querySelector('.sort__price').addEventListener('click', toggle)
document.querySelector('.sort__age').addEventListener('click', toggle)

function toggle(e) {
  e.preventDefault()
  this.classList.toggle('active')
  if (e.target.classList.contains('sort__price')) {
    if (this.classList.contains('active')) {
      sortPriceUp()
    } else {
      sortPriceDown()
    }
  } else {
    if (this.classList.contains('active')) {
      sortAgeDown()
    } else {
      sortAgeUp()
    }
  }
}

function sortPriceUp(e) {
  const cards = document.querySelectorAll('.card')
  const arr = []
  cards.forEach((e) => arr.push(e))
  content.innerHTML = ''

  arr
    .sort((a, b) => b.getAttribute('data-price') - a.getAttribute('data-price'))
    .forEach((e) => content.append(e))
}

function sortPriceDown(e) {
  const cards = document.querySelectorAll('.card')
  const arr = []
  cards.forEach((e) => arr.push(e))
  content.innerHTML = ''
  arr
    .sort((a, b) => a.getAttribute('data-price') - b.getAttribute('data-price'))
    .forEach((e) => content.append(e))
}

function sortAgeUp(e) {
  const cards = document.querySelectorAll('.card')
  const arr = []
  cards.forEach((e) => arr.push(e))
  content.innerHTML = ''

  arr
    .sort(
      (a, b) => b.getAttribute('data-months') - a.getAttribute('data-months')
    )
    .forEach((e) => content.append(e))
}

function sortAgeDown(e) {
  const cards = document.querySelectorAll('.card')
  const arr = []
  cards.forEach((e) => arr.push(e))
  content.innerHTML = ''
  arr
    .sort(
      (a, b) => a.getAttribute('data-months') - b.getAttribute('data-months')
    )
    .forEach((e) => content.append(e))
}

content.addEventListener('click', (e) => {
  // обработка лайка
  e.preventDefault()

  if (e.target.classList.contains('card__liked')) {
    if (!e.target.classList.contains('card__liked--true')) {
      e.target.classList.add('card__liked--true')
      catAll[e.target.closest('div').getAttribute('data-id') - 1].like = true
      modal('Мне понравился этот котик')
    } else {
      e.target.classList.remove('card__liked--true')
      catAll[e.target.closest('div').getAttribute('data-id') - 1].like = true
      modal('Мне больше не нравится этот котик')
    }
  } else if (e.target.getAttribute('data-btn')) {
    if (e.target.getAttribute('data-btn') == true) {
      modal('Дальнейшие действия...')
    } else {
      modal('У этого котика уже есть дом')
    }
  }
  return false
})

// меню

const menu = document.querySelector('input[id=menu__toggle]')
menu.addEventListener('change', (e) => {
  if (e.target.checked) {
    document.querySelector('body').style.overflow = 'hidden'
  } else {
    document.querySelector('body').style.overflow = 'visible'
  }
})

const linkNav = document.querySelectorAll('[href^="#"]'),
  V = 0.2
for (let i = 0; i < linkNav.length; i++) {
  linkNav[i].addEventListener(
    'click',
    function (e) {
      e.preventDefault()

      let w = window.pageYOffset,
        hash = this.href.replace(/[^#]*(.*)/, '$1')
      ;(t = document.querySelector(hash).getBoundingClientRect().top),
        (start = null)
      requestAnimationFrame(step)
      function step(time) {
        if (start === null) start = time
        let progress = time - start,
          r =
            t < 0
              ? Math.max(w - progress / V, w + t)
              : Math.min(w + progress / V, w + t)
        window.scrollTo(0, r)
        if (r != w + t) {
          requestAnimationFrame(step)
          document.querySelector('body').style.overflow = 'visible'
          menu.checked = false
        } else {
          location.hash = hash
        }
      }
    },
    false
  )
}

// форма

const form = document.querySelector('form')
form.addEventListener('submit', validateEmail)

// const infoArr = []

function modal(item) {
  const div = document.createElement('div')
  div.classList.add('info-popap')
  div.innerHTML = `<div class="info-popap__text">${item}</div>`
  document.querySelector('.info').append(div)
  setTimeout(() => {
    div.parentNode.removeChild(div)
  }, 3000)
}

function validateEmail(e) {
  e.preventDefault()
  const reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  const address = e.target.elements['email'].value
  const subscription = e.target.elements['subscription'].checked

  if (reg.test(address) == false) {
    modal('Введите корректный e-mail')
    e.target.reset()
    return false
  } else if (!subscription) {
    modal('Вы не подтвердили подписку')
    return false
  } else {
    modal('Вы подписались на наших котиков!')
    e.target.reset()
  }
}
