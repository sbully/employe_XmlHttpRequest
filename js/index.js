let xmlrequest = new XMLHttpRequest();
let tab = document.getElementById("table");

let totalSalary = new Number(0);
let nbmEmployee;

xmlrequest.addEventListener("progress", updateProgress, false);
xmlrequest.addEventListener("load", transferComplete, false);
xmlrequest.addEventListener("error", transferFailed, false);
xmlrequest.addEventListener("abort", transferCancel, false);


xmlrequest.responseType = "json";
xmlrequest.open("GET", "http://dummy.restapiexample.com/api/v1/employees");
xmlrequest.send();

function updateProgress(event) {
    if (event.lengthComputabe) {
        let percent = event.loaded / event.total;
    }
}

function transferComplete(event) {

    let json = xmlrequest.response;
    tablePopulate(json.data);
}

function transferFailed(event) {
    alert("transfert échoué");
}

function transferCancel(event) {
    alert("transfert annulé");
}

function tablePopulate(json) {
    let tabkey = Object.keys(json[0]);
    nbmEmployee = Object.keys(json).length;

    createHeaderTab(tabkey);

    let tBody = document.createElement('tbody');
    tBody.id = "tbody";
    tab.appendChild(tBody);
    json.forEach(function(employee) {
        addRow(employee, tBody);
    });

    createLastRow();
}

function addRow(employee, tbody) {

    let tr = document.createElement('tr');

    Object.entries(employee).forEach(([key, value]) => {
        switch (key) {
            case "id":
                let tdid = document.createElement('td');
                tdid.innerHTML = value;
                tr.appendChild(tdid);
                break;

            case "employee_name":

                let tdname = document.createElement('td');
                tdname.innerHTML = value;
                tr.appendChild(tdname);
                let tabName = new String(value).split(" ");
                let Email = tabName[0][0].toLowerCase() + "." + tabName[1].toLowerCase() + "@email.com";
                console.log(Email);

                let tdMail = document.createElement('td');
                tdMail.innerHTML = Email;
                tr.appendChild(tdMail);

                break;
            case "employee_age":
                let tdAge = document.createElement('td');
                let date = new Date().getFullYear() - value;
                tdAge.innerHTML = date;
                tr.appendChild(tdAge);


                break;

            case "employee_salary":
                let tdSalary = document.createElement('td');
                let salary = (value / 12).toFixed(2);
                tdSalary.innerHTML = salary + " €";
                totalSalary += new Number(salary);
                tr.appendChild(tdSalary);
                break;
            default:
                break;
        }


    });
    let tdAction = document.createElement('td');
    let DuplicateBut = document.createElement('button');
    DuplicateBut.id = "DuplicateBut";
    DuplicateBut.innerHTML = "Duplicate"

    tdAction.appendChild(DuplicateBut);

    let DeleteteBut = document.createElement('button');
    DeleteteBut.id = "DeleteteBut";
    DeleteteBut.innerHTML = "Delete";
    tdAction.appendChild(DeleteteBut);


    tr.appendChild(tdAction);


    tbody.appendChild(tr);
}

function createHeaderTab(tabkey) {
    let thead = document.createElement('thead')
    thead.id = "thead";
    tab.appendChild(thead);

    let tr = document.createElement('tr');

    let thid = document.createElement('th');
    thid.innerHTML = "EID";
    tr.appendChild(thid);

    let thname = document.createElement('th');
    thname.innerHTML = "Full Name";
    tr.appendChild(thname);

    let thEmail = document.createElement('th');
    thEmail.innerHTML = "Email";
    tr.appendChild(thEmail);

    let thSamary = document.createElement('th');
    thSamary.innerHTML = "Monthly Salary";
    tr.appendChild(thSamary);

    let thYear = document.createElement('th');
    thYear.innerHTML = "Year of Birth";
    tr.appendChild(thYear);

    let thAction = document.createElement('th');
    thAction.innerHTML = "Action";
    tr.appendChild(thAction);


    thead.appendChild(tr);
}

function createLastRow() {

    let tfoot = document.createElement('tfoot');
    tfoot.id = "tfoot";
    tab.appendChild(tfoot);

    let tr = document.createElement('tr');

    let tdid = document.createElement('td');
    tdid.innerHTML = document.getElementById("table").rows.length - 1;
    tr.appendChild(tdid);

    let td1 = document.createElement('td');
    td1.id = "td1";
    td1.style.colspan = "2";
    tr.appendChild(td1);


    let td2 = document.createElement('td');
    tr.appendChild(td2);

    let tdTotal = document.createElement('td');
    tdTotal.innerHTML = totalSalary.toFixed(2) + " €";
    tr.appendChild(tdTotal);

    let td3 = document.createElement('td');
    tr.appendChild(td3);
    let td4 = document.createElement('td');
    tr.appendChild(td4);

    tfoot.appendChild(tr);


}