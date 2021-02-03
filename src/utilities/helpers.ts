export const  setIntoView = (id:string):void => {

  const element = document.getElementById(id);
  if(element !== null && element !== undefined){
    
    element.scrollIntoView({behavior: "smooth"})

    

    const headerOffset = 70;
    const elementPosition = element.getBoundingClientRect().top;
    let offsetPosition = elementPosition + headerOffset;

    console.log('elementPosition',elementPosition,'offsetPosition',offsetPosition)

    if(offsetPosition===0)return
    if(offsetPosition<0)
      offsetPosition = element.getBoundingClientRect().height;

    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
  }
  //document.body.scrollTop
}

export const myCustomLocaleSpanish = {
  months: [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
  ],

  // week days by order
  weekDays: [
    {
      name: 'Lunes',
      short: 'Lu',
    },
    {
      name: 'Martes',
      short: 'Ma',
    },
    {
      name: 'Miércoles',
      short: 'Mi',
    },
    {
      name: 'Jueves',
      short: 'Ju',
    },
    {
      name: 'Viernes',
      short: 'Vi',
    },
    {
      name: 'Sábado',
      short: 'Sá',
      isWeekend: true,
    },
    {
      name: 'Domingo', // used for accessibility 
      short: 'Do', // displayed at the top of days' rows
      isWeekend: true, // is it a formal weekend or not?
    }
  ],

  // just play around with this number between 0 and 6
  weekStartingIndex: 6,

  // return a { year: number, month: number, day: number } object
  getToday(gregorainTodayObject:any) {
    return gregorainTodayObject;
  },

  // return a native JavaScript date here
  toNativeDate(date:any) {
    return new Date(date.year, date.month - 1, date.day);
  },

  // return a number for date's month length
  getMonthLength(date:any) {
    return new Date(date.year, date.month, 0).getDate();
  },

  // return a transformed digit to your locale
  transformDigit(digit:any) {
    return digit;
  },

  // texts in the date picker
  nextMonth: 'Mes siguiente',
  previousMonth: 'Mes Anterior',
  openMonthSelector: 'Mostrar selector de mes',
  openYearSelector: 'Mostrar selector de año',
  closeMonthSelector: 'Cerrar selector de mes',
  closeYearSelector: 'Cerrar selector de año',
  defaultPlaceholder: '',

  // for input range value
  from: 'desde',
  to: 'hasta',


  // used for input value when multi dates are selected
  digitSeparator: ',',

  // if your provide -2 for example, year will be 2 digited
  yearLetterSkip: 0,

  // is your language rtl or ltr?
  isRtl: false,
}