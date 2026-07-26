let btnAge = document.getElementById("btn-age");
let days = document.querySelectorAll("input[type='text']")[0];
let year = document.querySelectorAll("input[type='text']")[1];
let selectMonth = document.getElementById("mon");
let resultYear = document.getElementById("years-result");
let resultMonth = document.getElementById("months-result");
let resultDay = document.getElementById("days-result");

function check(Now) {
  let flag = true;
  if (!selectMonth.value) {
    selectMonth.style.border = "2px solid red";
    flag = false;
  } else {
    selectMonth.style.border = "2px solid green";
  }
  if (days.disabled || days.value.trim() === "" || !days.checkValidity()) {
    days.style.border = "2px solid red";
    flag = false;
  } else {
    days.style.border = "2px solid green";
  }

  let currentYear = Now.getFullYear();
  let value = Number(year.value);

  if (
    year.value.trim() === "" ||
    !year.checkValidity() ||
    value < 1 ||
    value > currentYear
  ) {
    year.style.border = "2px solid red";
    flag = false;
  } else {
    year.style.border = "2px solid green";
  }

  return flag;
}

function CheckMonth(Now) {
  if (
    Number(year.value) === Now.getFullYear() &&
    Number(selectMonth.value) > Now.getMonth() + 1
  ) {
    selectMonth.style.border = "2px solid red";
    return false;
  }

  selectMonth.style.border = "2px solid green";
  return true;
}

function CheckDay(Now) {
  let daysInMonth = new Date(
    Number(year.value),
    Number(selectMonth.value),
    0,
  ).getDate();

  if (Number(days.value) > daysInMonth) {
    days.style.border = "2px solid red";
    return false;
  }
  if (
    Number(year.value) === Now.getFullYear() &&
    Number(selectMonth.value) === Now.getMonth() + 1 &&
    Number(days.value) > Now.getDate()
  ) {
    days.style.border = "2px solid red";
    return false;
  }
  days.style.border = "2px solid green";
  return true;
}

btnAge.addEventListener("click", function () {
  let Now = new Date();
  if (!(check(Now) && CheckMonth(Now) && CheckDay(Now))) {
    resultYear.textContent = 0;
    resultMonth.textContent = 0;
    resultDay.textContent = 0;
    return;
  } else {
    let ageYear = Now.getFullYear() - Number(year.value);
    let ageMonth = Now.getMonth() + 1 - Number(selectMonth.value);
    let ageDay = Now.getDate() - Number(days.value);

    if (ageDay < 0) {
      ageMonth--;
      let previousMonthDays = new Date(
        Now.getFullYear(),
        Now.getMonth(),
        0,
      ).getDate();
      ageDay += previousMonthDays;
    }
    if (ageMonth < 0) {
      ageYear--;
      ageMonth += 12;
    }
    resultYear.textContent = ageYear;
    resultMonth.textContent = ageMonth;
    resultDay.textContent = ageDay;
  }
});

selectMonth.addEventListener("change", function () {
  days.disabled = false;
  days.style.backgroundColor = year.style.backgroundColor;
  selectMonth.style.border = "";
});
