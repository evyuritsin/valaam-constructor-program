(function( $ ){
  function getDaysInMonth(month, year) {
    var date = new Date(year, month, 1);
    var days = [];
    while (date.getMonth() === month) {
      var newDate = new Date(date);
      var fDate = [];
      var fMonth = newDate.getMonth() + 1;
      if (newDate.getDate() <= 9) {
        fDate[0] = '0' + newDate.getDate();
      } else {
        fDate[0] = newDate.getDate();
      }
      if (fMonth <= 9) {
        fDate[1] = '0' + fMonth;
      } else {
        fDate[1] = fMonth;
      }
      fDate[2] = newDate.getFullYear();   
      days.push(fDate[1] + '.' + fDate[0] + '.' + fDate[2]);
      //days.push(date.getMonth() + '.' + date.getDate() + '.' + date.getFullYear());
      date.setDate(date.getDate() + 1);
    }
    return days;
  }

  function getFullMonth(month, year) {
    var dateList = getDaysInMonth(month, year);
    var firstDate = new Date(dateList[0]);
    var lastDate = new Date(dateList[dateList.length - 1]);
    var nDate = lastDate;
    if (lastDate.getDay() != 0) {
      for (var i = 0; i <= 6 - lastDate.getDay(); i++) {
        var nextDate = new Date(nDate);
        nextDate.setDate(nextDate.getDate() + 1);
        var lDate = [];
        var fMonth = nextDate.getMonth() + 1;
          if (nextDate.getDate() <= 9) {
            lDate[0] = '0' + nextDate.getDate();
          } else {
            lDate[0] = nextDate.getDate();
          }
          if (fMonth <= 9) {
            lDate[1] = '0' + fMonth;
          } else {
            lDate[1] = fMonth;
          }
          lDate[2] = nextDate.getFullYear(); 
        dateList.push(lDate[1] + '.' + lDate[0] + '.' + lDate[2]);
        nDate = nextDate;
      }
    }
    nDate = firstDate;
    if (firstDate.getDay() != 0) {
      for (var i = 1; i <= firstDate.getDay() - 1; i++) {
        var prevDate = new Date(nDate);
        prevDate.setDate(prevDate.getDate() - 1);
        var fDate = [];
        var fMonth = prevDate.getMonth() + 1;
          if (prevDate.getDate() <= 9) {
            fDate[0] = '0' + prevDate.getDate();
          } else {
            fDate[0] = prevDate.getDate();
          }
          if (fMonth <= 9) {
            fDate[1] = '0' + fMonth;
          } else {
            fDate[1] = fMonth;
          }
          fDate[2] = prevDate.getFullYear(); 
          dateList.unshift(fDate[1] + '.' + fDate[0] + '.' + fDate[2]);
        nDate = prevDate;
      }
    } else {
      for (var i = 1; i <= 6; i++) {
        var prevDate = new Date(nDate);
        prevDate.setDate(prevDate.getDate() - 1);
        var fDate = [];
        var fMonth = prevDate.getMonth() + 1;
          if (prevDate.getDate() <= 9) {
            fDate[0] = '0' + prevDate.getDate();
          } else {
            fDate[0] = prevDate.getDate();
          }
          if (fMonth <= 9) {
            fDate[1] = '0' + fMonth;
          } else {
            fDate[1] = fMonth;
          }
          fDate[2] = prevDate.getFullYear(); 
          dateList.unshift(fDate[1] + '.' + fDate[0] + '.' + fDate[2]);
        nDate = prevDate;
      }     
    }
    var output = [];
    dateList.forEach(function(item, i, dateList) {
      var cDate = new Date(item);
      if (cDate.getMonth() === month) {
        output.push('<div class="datepicker__date" date="' + item + '">' + cDate.getDate() + '</div>');
      } else {
        output.push('<div class="datepicker__date datepicker_another-month" date="' + item + '">' + cDate.getDate() + '</div>');
      }
    });
    return output.join('');
  }
  var methods = {
    init : function( options ) { 
      var settings = $.extend( {
        btnPrev: '.datepicker__prev-btn',
        btnNext: '.datepicker__next-btn',
        body: '.datepicker__body',
        dateLabel: '.datepicker__header-label'
      }, options);
      this.find(settings.btnPrev).click(function() {
        var months = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
        var label = $(this).parent().find(settings.dateLabel);
        var month = label.attr('month');
        var year = label.attr('year');
        if (Number(month) === 0) {
          var prevYear = Number(year) - 1;
          label.text(months[11] + ' ' + String(prevYear));
          label.attr('month', '11');
          label.attr('year', prevYear);     
        } else {
          var prevMonth = Number(month) - 1;
          label.text(months[prevMonth] + ' ' + year);
          label.attr('month', prevMonth);
          label.attr('year', year);     
        }
        var days = getFullMonth(Number(label.attr('month')), Number(label.attr('year')));
        $(this).closest('.datepicker').find(settings.body).html(days);
      });
      this.find(settings.btnNext).click(function() {
        var months = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
        var label = $(this).parent().find(settings.dateLabel);
        var month = label.attr('month');
        var year = label.attr('year');
        if (Number(month) === 11) {
          var nextYear = Number(year) + 1;
          label.text(months[0] + ' ' + nextYear);
          label.attr('month', '0');
          label.attr('year', nextYear);
        } else {
          var nextMonth = Number(month) + 1;
          label.text(months[nextMonth] + ' ' + year);
          label.attr('month', nextMonth);
          label.attr('year', year);     
        }
        var days = getFullMonth(Number(label.attr('month')), Number(label.attr('year')));
        $(this).closest('.datepicker').find(settings.body).html(days);
      });
    },
    show : function( ) {
      this.show();
    },
    hide : function( ) {
      this.hide();
    },
    update : function( content ) {
      // !!!
    }
  };

  $.fn.vpdatepicker = function( method ) {
    //----
  };

})( jQuery );