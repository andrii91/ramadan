
/**
 * @name		jQuery Countdown Plugin
 * @author		Martin Angelov
 * @version 	1.0
 * @url			http://tutorialzine.com/2011/12/countdown-jquery/
 * @license		MIT License
 */

(function ($) {

  // Количество секунд в каждом временном отрезке
  var days = 24 * 60 * 60,
    hours = 60 * 60,
    minutes = 60;

  // Создаем плагин
  $.fn.countdown = function (prop) {

    var options = $.extend({
      callback: function () {},
      timestamp: 0
    }, prop);

    var left, d, h, m, s, positions;

    // инициализируем плагин
    init(this, options);

    positions = this.find('.position');

    (function tick() {

      // Осталось времени
      left = Math.floor((options.timestamp - (new Date())) / 1000);

      if (left < 0) {
        left = 0;
      }

      // Осталось дней
      d = Math.floor(left / days);
      updateDuo(0, 1, d);
      left -= d * days;

      // Осталось часов
      h = Math.floor(left / hours);
      updateDuo(2, 3, h);
      left -= h * hours;

      // Осталось минут
      m = Math.floor(left / minutes);
      updateDuo(4, 5, m);
      left -= m * minutes;

      // Осталось секунд
      s = left;
      updateDuo(6, 7, s);

      // Вызываем возвратную функцию пользователя
      options.callback(d, h, m, s);

      // Планируем следующий вызов данной функции через 1 секунду
      setTimeout(tick, 1000);
    })();

    // Данная функция обновляет две цифоровые позиции за один раз
    function updateDuo(minor, major, value) {
      switchDigit(positions.eq(minor), Math.floor(value / 10) % 10);
      switchDigit(positions.eq(major), value % 10);
    }

    return this;
  };


  function init(elem, options) {
    elem.addClass('countdownHolder');

    // Создаем разметку внутри контейнера
    $.each(['Days', 'Hours', 'Minutes', 'Seconds'], function (i) {
      $('<span class="count' + this + '">').html(
        '<span class="position">\
					<span class="digit static">0</span>\
				</span>\
				<span class="position">\
					<span class="digit static">0</span>\
				</span>'
      ).appendTo(elem);

      if (this != "Seconds") {
        elem.append('<span class="countDiv countDiv' + i + '"></span>');
      }
    });

  }

  // Создаем анимированный переход между двумя цифрами
  function switchDigit(position, number) {

    var digit = position.find('.digit')

    if (digit.is(':animated')) {
      return false;
    }

    if (position.data('digit') == number) {
      // Мы уже вывели данную цифру
      return false;
    }

    position.data('digit', number);

    var replacement = $('<span>', {
      'class': 'digit',
      css: {
        top: '-2.1em',
        opacity: 0
      },
      html: number
    });

    // Класс .static добавляется, когда завершается анимация.
    // Выполнение идет более плавно.

    digit
      .before(replacement)
      .removeClass('static')
      .animate({
        top: '2.5em',
        opacity: 0
      }, 'fast', function () {
        digit.remove();
      })

    replacement
      .delay(100)
      .animate({
        top: 0,
        opacity: 1
      }, 'fast', function () {
        replacement.addClass('static');
      });
  }
})(jQuery);


$(document).ready(function () {
  $('body').scrollspy({
    target: '#navbar',
    offset: 200
  });
//  var currentItem = $("#navbar li.active > a").attr('href').substring(1);
//  $('.navbar li[data-target="' + currentItem + '"]').addClass('active');

  $('#navbar').on('activate.bs.scrollspy', function () {
    currentItem = $("#navbar li.active > a").attr('href').substring(1);
    $('.navbar li[data-target]').removeClass('active');
    $('.navbar li[data-target="' + currentItem + '"]').addClass('active');
  });
  $(".scroll").click(function (e) {
    e.preventDefault();
    var destination = $("#" + $(this).attr('href').substring(1)).offset().top + 0;
    console.log(destination);
    $("body,html").animate({
      scrollTop: destination
    }, 500);
  });
  $(window).scroll(function () {
    return $('#navbar').toggleClass("fixed", $(window).scrollTop() > 0);
  });

  $('.programs-list li').viewportChecker({
    classToAdd: 'visible', // Class to add to the elements when they are visible,
    classToAddForFullView: 'full-visible', // Class to add when an item is completely visible in the viewport
    classToRemove: 'invisible', // Class to remove before adding 'classToAdd' to the elements
    removeClassAfterAnimation: true, // Remove added classes after animation has finished
    offset: '40%', // The offset of the elements (let them appear earlier or later). This can also be percentage based by adding a '%' at the end
    repeat: false, // Add the possibility to remove the class if the elements are not visible
    callbackFunction: function (elem, action) {},
  });


  $('.advertising-carousel').owlCarousel({
    center: true,
    loop: true,
    nav: true,
    responsive: {
      0: {
        items: 1,
        center: false,
      },
      768: {
        items: 2,
        center: false,
        
      },
      1000: {
        items: 3
      }
    }
  });

  $('.people-carousel').owlCarousel({
    loop: true,
    nav: true,
    margin: 35,
    responsive: {
      0: {
        items: 1,
        margin: 0,

      },
      768: {
        items: 3,
        
      },
      1000: {
        items: 4,

      }
    }
  });
  
  
  var note = $('#note'),
   ts = new Date(2018, 04, 15, 23, 59),
    // ts =dateEnd,
//    ts = new Date(2018, 02, 11),
    newYear = true;

  if ((new Date()) > ts) {
    // Задаем точку отсчета для примера. Пусть будет очередной Новый год или дата через 10 дней.
    // Обратите внимание на *1000 в конце - время должно задаваться в миллисекундах
    ts = (new Date()).getTime() + 10 * 24 * 60 * 60 * 1000;
    newYear = false;
  }

  $('#countdown').countdown({
    timestamp: ts,
    callback: function (days, hours, minutes, seconds) {

    }
  });
  $('.countDays').append('<span class="title">Days</span>');
  $('.countHours').append('<span class="title">Hours</span>');
  $('.countMinutes').append('<span class="title">Minuts</span>');
  $('.countSeconds').append('<span class="title">Seconds</span>');
  
  $('a[data-src="#interactive"]').click(function(){
    $("#interactive-href").attr('href', $(this).data('href'))
  });
  
 $('.corner-item').click(function(){
    $('#corner-img_1').attr('src', $(this).data('img_1'));
    $('#corner-img_2').attr('src', $(this).data('img_2'));
    $('.corner-title').text($(this).find('p').text());
    $('#info_1').text($(this).data('p_1'));
    $('#info_2').text($(this).data('p_2'));
  })

  $('.mob-btn').click(function(){
    $('.menu').slideToggle(200);
  })
  
  

});