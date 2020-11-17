const catAll = {}

let catAllMax = ((max = 99) => Math.floor(Math.random() * Math.floor(max)))()

console.log(catAllMax)

function catShow(val) {
  for (val; val > 0; val--) {
    if (catAllMax--) {
      let div = document.createElement('div')
      const photo = catGen(1, 3)
      const price = catGen(10000, 30000)
      const catAge = catGen(1, 12)

      div.classList.add('card')
      div.setAttribute('data-price', price)
      div.setAttribute('data-months', catAge)
      div.innerHTML = `
              <div class="card__discount">-40%</div>
              <a href="#info-popap" class="card__liked">
                <svg
                  width="46"
                  height="42"
                  viewBox="0 0 46 42"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M33.7812 0.695312C31.2851 0.695312 28.9966 1.4863 26.9794 3.04634C25.0456 4.54197 23.758 6.44693 23 7.83214C22.242 6.44684 20.9544 4.54197 19.0206 3.04634C17.0034 1.4863 14.7149 0.695312 12.2188 0.695312C5.25298 0.695312 0 6.39293 0 13.9485C0 22.1112 6.55347 27.696 16.4746 36.1505C18.1593 37.5863 20.0689 39.2138 22.0538 40.9494C22.3154 41.1785 22.6514 41.3047 23 41.3047C23.3486 41.3047 23.6846 41.1785 23.9462 40.9495C25.9312 39.2136 27.8408 37.5862 29.5265 36.1496C39.4465 27.696 46 22.1112 46 13.9485C46 6.39293 40.747 0.695312 33.7812 0.695312Z"
                    fill="white"
                    fill-opacity="0.5"
                  />
                </svg>
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
                <div class="card__price">${price} руб.</div>
              </div>
              <a class="btn btn--card">Купить</a>
            `

      document.querySelector('.main__content').append(div)
    } else {
      return
    }
  }
}

function catGen(min, max) {
  return Math.round(Math.random() * (max - min) + min)
}

window.onload = function () {
  catShow(6)
  console.log(catAllMax)
}

const btnMore = document.querySelector('.btn--more ')

btnMore.addEventListener('click', (e) => {
  e.preventDefault()

  if (catAllMax != -1) {
    catShow(20)
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

// меню

const menu = document.querySelector('input[id=menu__toggle]')
menu.addEventListener('change', (e) => {
  if (e.target.checked) {
    document.querySelector('body').style.overflow = 'hidden'
  } else {
    document.querySelector('body').style.overflow = 'visible'
  }
})
const popupInfo = document.querySelector('.info-popap')

const linkNav = document.querySelectorAll('[href^="#"]'),
  V = 0.2
for (let i = 0; i < linkNav.length; i++) {
  linkNav[i].addEventListener(
    'click',
    function (e) {
      e.preventDefault()
      // обработка лайка
      if (e.path.find((e) => e.href).classList.contains('card__liked')) {
        if (
          !e.path.find((e) => e.href).classList.contains('card__liked--true')
        ) {
          e.path.find((e) => e.href).classList.add('card__liked--true')
          document.querySelector('.info-popap__text').innerHTML =
            'Вы добавили в избранное'
          popupInfo.classList.remove('hidden')
          setTimeout((e) => popupInfo.classList.add('hidden'), 2000)
        } else {
          e.path.find((e) => e.href).classList.remove('card__liked--true')
        }
      }

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

function validateEmail(e) {
  e.preventDefault()
  const reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  const address = e.target.elements['email'].value
  const subscription = e.target.elements['subscription'].checked
  if (reg.test(address) == false) {
    document.querySelector('.info-popap__text').innerHTML =
      'Введите корректный e-mail'
    popupInfo.classList.remove('hidden')
    setTimeout((e) => popupInfo.classList.add('hidden'), 3000)
    e.target.reset()
    return false
  } else if (!subscription) {
    document.querySelector('.info-popap__text').innerHTML =
      'Вы не подтвердили подписку'
    popupInfo.classList.remove('hidden')
    setTimeout((e) => popupInfo.classList.add('hidden'), 3000)
    return false
  } else {
    // отправка формы
    document.querySelector('.info-popap__text').innerHTML =
      'Вы подписались на наших котиков!'
    popupInfo.classList.remove('hidden')
    setTimeout((e) => popupInfo.classList.add('hidden'), 3000)
    e.target.reset()
  }
}
